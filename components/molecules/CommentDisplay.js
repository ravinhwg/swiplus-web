/* eslint-disable react/jsx-props-no-spreading */
import Link from "next/link";
import React, { useContext, useEffect, useRef, useState } from "react";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { useRouter } from "next/router";
import { InView } from "react-intersection-observer";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient, useInfiniteQuery } from "react-query";
import {
  deleteComments,
  getReply,
  placeCommentLike,
  replyComment,
} from "../../apiPlugs/deck";
import { AppUiContext } from "../../Context";
import { LikeOutline, LikeFill } from "../atoms/Icons";
import ReplyCommentDisplay from "./ReplyCommentDisplay";

export default function CommentDisplay({ comment }) {
  const router = useRouter();
  const [state] = useContext(AppUiContext);
  const pageNumber = useRef(0);
  const [showAll, setShowAll] = useState(false);
  const [showReplyTextBox, setShowReplyTextBox] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const queryClient = useQueryClient();
  const [commentText, setCommentText] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const likeComment = useMutation(placeCommentLike, {
    onSuccess: async () => {
      queryClient.invalidateQueries("comments");
      //    comment.userLiked = !comment.userLiked;
    },
  });
  const replyCommentMutation = useMutation(replyComment, {
    onSuccess: async () => {
      setReplyText("");
      queryClient.refetchQueries("commentReplies");
    },
  });

  const deleteCommentMutation = useMutation(deleteComments, {
    onSuccess: async () => {
      queryClient.invalidateQueries("comments");
    },
  });

  const getCommentReplies = useInfiniteQuery(
    ["commentReplies", comment.id, state?.user.accessToken],
    getReply,
    { enabled: false, onSuccess: async (data) => console.log(data) }
  );
  useEffect(() => {
    if (comment.comment_text.length > 70) {
      // Add the first 70 Cars into comment_text
      setCommentText(`${comment.comment_text.slice(0, 70)}`);
    } else {
      // Add the entire thing to comment_text
      setCommentText(comment.comment_text);
    }
    TimeAgo.addLocale(en);
    const timeAgo = new TimeAgo("en-US");
    setCreatedAt(
      timeAgo.format(
        Date.now() -
          (Date.now() - Math.floor(new Date(comment.created_at).getTime()))
      )
    );
  }, [comment]);
  const commentReply = () => {
    replyCommentMutation.mutate({
      commentId: comment.id,
      replyText,
      deckId: router.query.deckId,
      token: state?.user.accessToken,
    });
  };
  const commentLike = (active) => {
    if (!state.loggedIn) {
      router.push("/login");
    }
    likeComment.mutate({
      commentId: comment.id,
      active,
      token: state?.user.accessToken,
    });
  };
  const deleteComment = () => {
    deleteCommentMutation.mutate({
      commentId: comment.id,
      token: state?.user.accessToken,
    });
  };
  const showWholeComment = (status) => {
    setShowAll(status);
    setCommentText(comment.comment_text);
  };
  return (
    <div className="p-3 flex w-full justify-between">
      <div className="flex">
        {comment.profile_pic ? (
          <img
            src={comment.profile_pic}
            alt="profile-pic"
            className="rounded-full h-8 w-8 my-1"
          />
        ) : (
          <img
            src="https://storage.googleapis.com/swiplusimages/profile_pics/default.jpeg"
            alt="profile-pic"
            className="rounded-full h-8 w-8 my-1"
          />
        )}
        <div className="mx-2">
          <Link href={`/${comment.username}`}>
            <a>
              <p className="text-gray-50 text-sm m-1">{comment.display_name}</p>
            </a>
          </Link>
          <p
            className="text-gray-50 text-sm m-1"
            onClick={() =>
              comment.comment_text.length > 70
                ? showWholeComment(true)
                : undefined
            }
          >{`${commentText} ${
            comment.comment_text.length > 70 && !showAll ? "... Read more" : ""
          }`}</p>
          <p className="text-gray-500 text-xs m-1">{createdAt.toUpperCase()}</p>
          {+comment.user_id === state.user.userId ? (
            <button
              className="text-indigo-500 hover:text-indigo-500 text-xs font-bold mx-2"
              onClick={deleteComment}
              type="button"
            >
              DELETE
            </button>
          ) : (
            <></>
          )}
          <button
            className="text-indigo-500 hover:text-indigo-500 text-xs font-bold mx-2"
            onClick={() =>
              setShowReplyTextBox((showReplybox) => {
                if (!showReplybox) {
                  getCommentReplies.refetch();
                }
                return !showReplybox;
              })
            }
            type="button"
          >
            REPLY
          </button>
          {showReplyTextBox ? (
            <>
              {state.loggedIn ? (
                <form
                  className=" w-full flex flex-col justify-end"
                  onSubmit={handleSubmit(() => commentReply())}
                >
                  <div className=" text-red-500  p-2 rounded-md text-sm text-left w-full">
                    {errors.reply?.type === "required" &&
                      "Comment text is required"}
                    {errors.reply?.type === "minLength" &&
                      "Comment has to be more than one character long"}
                    {errors.reply?.type === "maxLength" &&
                      "Comment has to be less than 500 characters"}
                  </div>
                  <textarea
                    {...register("reply", {
                      required: true,
                      maxLength: 500,
                      minLength: 1,
                    })}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type a Reply"
                    className="bg-gray-600  h-full resize-y   border-2 border-transparent rounded-xl w-6/6 py-2 px-4 text-gray-100 font-inter leading-tight focus:outline-none  focus:border-blue-600"
                  />
                  <div className="flex justify-end">
                    <p className="m-4 text-right text-gray-500">
                      {replyText.length}/500
                    </p>
                    <button
                      type="submit"
                      className="bg-indigo-700 m-3 focus:outline-none  text-left p-1.5 px-8 rounded-lg text-white text-sm font-inter font-bold hover:bg-indigo-500"
                    >
                      Reply
                    </button>
                  </div>
                </form>
              ) : (
                <Link href="/login">
                  <button
                    type="button"
                    className="bg-indigo-700 m-3 focus:outline-none  text-left p-1.5 px-8 rounded-lg text-white text-sm font-inter font-bold hover:bg-indigo-500"
                  >
                    Login to reply
                  </button>
                </Link>
              )}
              {getCommentReplies.isLoading ? (
                <></>
              ) : (
                getCommentReplies.data.pages.map((page) => (
                  <React.Fragment key={page.nextId}>
                    {page.data.data.map((comment, index) => (
                      <ReplyCommentDisplay
                        key={`${comment.id}-${index.length}`}
                        comment={comment}
                      />
                    ))}
                  </React.Fragment>
                ))
              )}
              <InView
                as="div"
                onChange={(inView) => {
                  if (inView) {
                    // Check if data has all the decks
                    if (
                      getCommentReplies.data?.pages[
                        getCommentReplies.data.pages.length - 1
                      ].data.nextPage
                    ) {
                      pageNumber.current += 1;
                      console.log(pageNumber.current);
                      getCommentReplies.fetchNextPage({
                        pageParam: pageNumber.current,
                      });
                    }
                  }
                }}
              />{" "}
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="flex flex-col ">
        {comment?.userLiked ? (
          <LikeFill
            className="w-7 h-7 text-red-700"
            onClick={() => commentLike(false)}
          />
        ) : (
          <LikeOutline
            className="w-7 h-7 text-red-700"
            onClick={() => commentLike(true)}
          />
        )}
        <div className="text-center text-red-700">{comment.likes}</div>
      </div>
    </div>
  );
}

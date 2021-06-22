/* eslint-disable react/jsx-props-no-spreading */
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { useMutation, useQueryClient } from "react-query";
import { deleteComments, placeCommentLike } from "../../api/deck";
import { AppUiContext } from "../../Context";
import { LikeOutline, LikeFill } from "../atoms/Icons";
import { useRouter } from "next/router";

export default function ReplyCommentDisplay({ comment }) {
  const [state] = useContext(AppUiContext);
  const [showAll, setShowAll] = useState(false);
  const [createdAt, setCreatedAt] = useState("");
  const queryClient = useQueryClient();
  const router = useRouter();
  const [commentText, setCommentText] = useState("");
  const likeComment = useMutation(placeCommentLike, {
    onSuccess: async () => {
      queryClient.refetchQueries("commentReplies");
    },
  });

  const deleteCommentMutation = useMutation(deleteComments, {
    onSuccess: async () => {
      queryClient.refetchQueries("commentReplies");
    },
  });
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

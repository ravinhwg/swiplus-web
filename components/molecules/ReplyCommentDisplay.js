/* eslint-disable react/jsx-props-no-spreading */
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import TimeAgo from "javascript-time-ago";
import Image from "next/image";
import en from "javascript-time-ago/locale/en";
import { useMutation, useQueryClient } from "react-query";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { deleteComments, placeCommentLike } from "../../apiPlugs/deck";
import { AppUiContext } from "../../Context";
import { LikeOutline, LikeFill } from "../atoms/Icons";

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
    <div className="p-3 flex w-full justify-between my-2">
      <div className="flex">
        <div className="w-4/12">
          {comment.profile_pic ? (
            <Image
              height="30"
              width="30"
              src={comment.profile_pic}
              alt="profile-pic"
              className="rounded-full align-top"
            />
          ) : (
            <Image
              height="30"
              width="30"
              src="https://storage.googleapis.com/static.swiplus.com/profile_pics/default.jpeg"
              alt="profile-pic"
              className="rounded-full align-top"
            />
          )}
        </div>
        <div className="mx-2 w-8/12">
          <Link href={`/${comment.username}`}>
            <button type="button">
              <p className="text-gray-50 text-sm m-1 font-bold  text-left w-full">
                {comment.display_name}
              </p>
            </button>
          </Link>
          <button
            type="button"
            className="text-gray-50 text-left text-sm m-1 bg-gray-700 p-2 rounded-xl w-lg max-w-lg break-all"
            onClick={() =>
              comment.comment_text.length > 70
                ? showWholeComment(true)
                : undefined
            }
          >{`${commentText} ${
            comment.comment_text.length > 70 && !showAll ? "... Read more" : ""
          }`}</button>
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

ReplyCommentDisplay.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  comment: PropTypes.object,
};

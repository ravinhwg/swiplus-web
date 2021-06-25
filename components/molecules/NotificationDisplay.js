/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useState } from "react";
import Link from "next/link";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

export default function DisplayNotif({ notifData }) {
  const [createdAt, setCreatedAt] = useState("");
  let verb;
  switch (notifData.trigger_type) {
    case "reply_comment":
      verb = "has replied to your comment.";
      break;
    case "root_comment":
      verb = `commented on deck. ${
        notifData.action_data.deck_title
          ? `"${notifData.action_data.deck_title}"`
          : ""
      }`;
      break;
    case "follow":
      verb = "followed you.";
      break;
    case "comment_like":
      verb = "liked your comment.";
      break;
    case "deck_like":
      verb = `liked your deck. ${
        notifData.action_data.deck_title
          ? `"${notifData.action_data.deck_title}"`
          : ""
      }`;
      break;
    default:
      break;
  }
  useEffect(() => {
    TimeAgo.addLocale(en);
    const timeAgo = new TimeAgo("en-US");
    setCreatedAt(
      timeAgo.format(
        Date.now() -
          (Date.now() - Math.floor(new Date(notifData.created_at).getTime()))
      )
    );
  }, [notifData]);
  return (
    <div className="text-gray-200 flex m-5">
      <Link href={`/${notifData.trigger_id}`}>
        <a>
          {notifData.profile_pic === null ? (
            <img
              alt="profile-pic"
              className="h-10 w-10 rounded-full m-2"
              src="https://storage.googleapis.com/swiplusimages/profile_pics/default.jpeg"
            />
          ) : (
            <img
              className="h-10 w-10 rounded-full m-2"
              alt="profile-pic"
              src={notifData.profile_pic}
            />
          )}
        </a>
      </Link>
      <Link
        href={`/d/${
          notifData.action_data.deck_id
            ? notifData.action_data.deck_id
            : "notfound"
        }`}
      >
        <div className="m-2">
          {`${notifData.display_name} ${verb}`}
          <div className="text-gray-500">
            {notifData.action_data?.comment_text}
          </div>
          <div className="text-gray-600 text-xs">{createdAt.toUpperCase()}</div>
        </div>
      </Link>
    </div>
  );
}

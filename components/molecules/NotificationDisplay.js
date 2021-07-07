/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import PropTypes from "prop-types";
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
    <div className="text-gray-200 flex m-3">
      <div className="mr-1">
        <Link href={`/${notifData.trigger_id}`}>
          <button type="button">
            {notifData.profile_pic === null ? (
              <Image
                width="50"
                height="50"
                alt="profile-pic"
                className="h-10 w-10 rounded-full m-2"
                src="https://storage.googleapis.com/swiplusimages/profile_pics/default.jpeg"
              />
            ) : (
              <Image
                width="50"
                height="50"
                className="h-10 w-10 rounded-full m-2"
                alt="profile-pic"
                src={notifData.profile_pic}
              />
            )}
          </button>
        </Link>
      </div>
      <div className="ml-3">
        <Link
          href={`/d/${
            notifData.action_data.deck_id
              ? notifData.action_data.deck_id
              : "notfound"
          }`}
        >
          <div className="text-left max-w-md">
            {`${notifData.display_name} ${verb}`}
            <div className="text-gray-500">
              {notifData.action_data?.comment_text || " "}
            </div>
            <div className="text-gray-600 text-xs">
              {createdAt.toUpperCase()}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
DisplayNotif.propTypes = {
  notifData: PropTypes.shape({
    trigger_type: PropTypes.string,
    // eslint-disable-next-line react/forbid-prop-types
    action_data: PropTypes.object,
    created_at: PropTypes.string,
    trigger_id: PropTypes.string,
    profile_pic: PropTypes.string,
    display_name: PropTypes.string,
  }),
};

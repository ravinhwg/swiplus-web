import Link from "next/link";
import Image from "next/image";
import PropTypes from "prop-types";

export default function ProfileCard({ user }) {
  return (
    <div
      className={` bg-gray-800 h-44 w-64 mx-0.5 inline-block p-3 ${
        !user ? "animate-pulse" : ""
      }`}
    >
      {user ? (
        <Link href={`/${user.username}`}>
          <button type="button" className="focus:outline-none">
            <div className="flex">
              <div className="flex flex-1">
                {user.profile_pic === null ? (
                  <Image
                    height="200"
                    width="200"
                    src="https://storage.googleapis.com/swiplusimages/profile_pics/default.jpeg"
                    alt="profile-pic"
                    className="rounded-full"
                  />
                ) : (
                  <Image
                    height="200"
                    width="200"
                    src={user.profile_pic}
                    alt="profile-pic"
                    className="rounded-full"
                  />
                )}
              </div>
              <div className="ml-3">
                <p className=" text-gray-50 font-inter font-bold text-2xl text-left">
                  {user.display_name}
                </p>
                <p className=" text-gray-200 font-inter font-bold text-md text-left">
                  @{user.username}
                </p>
              </div>
            </div>
            <p className=" text-gray-500 font-inter text-md text-left">
              {user.bio?.substring(0, 60)}
            </p>
          </button>
        </Link>
      ) : (
        <></>
      )}
    </div>
  );
}

ProfileCard.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    profile_pic: PropTypes.string,
    display_name: PropTypes.string,
    bio: PropTypes.string,
  }),
};

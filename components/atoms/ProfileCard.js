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
            <div className="flex flex-col">
              <div className="flex">
                <div>
                  {user.profile_pic === null ? (
                    <Image
                      height="50"
                      width="50"
                      src="https://storage.googleapis.com/swiplusimages/profile_pics/default.jpeg"
                      alt="profile-pic"
                      className="rounded-full"
                    />
                  ) : (
                    <Image
                      height="50"
                      width="50"
                      src={user.profile_pic}
                      alt="profile-pic"
                      className="rounded-full"
                    />
                  )}
                </div>
                <div className="ml-3">
                  <p className=" text-gray-50 font-inter font-bold text-2xl text-left">
                    {user.display_name.slice(0, 15)}
                  </p>
                  <p className=" text-gray-200 font-inter font-bold text-md text-left">
                    @{user.username}
                  </p>
                </div>
              </div>
              <div className="mt-5">
                <p className=" text-gray-500 font-inter text-md text-left">
                  {user.bio?.substring(0, 60)}
                </p>
              </div>
            </div>
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

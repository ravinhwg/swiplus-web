import Image from "next/image";
import Link from "next/link";

export default function ProfileCard({ user }) {
  return (
    <div
      className={` bg-gray-800 h-44 w-64 mx-0.5 inline-block p-3 ${
        !user ? "animate-pulse" : ""
      }`}
    >
      {user ? (
        <Link href={`/${user.username}`}>
          <div>
            {user.profile_pic === null ? (
              <img
                src="https://storage.googleapis.com/swiplusimages/profile_pics/default.jpeg"
                alt="profile-pic"
                className="rounded-full h-12 w-12 my-1"
              />
            ) : (
              <img
                src={user.profile_pic}
                alt="profile-pic"
                className="rounded-full h-12 w-12 my-1"
              />
            )}
            <p className=" text-gray-50 font-inter font-bold text-2xl">
              {user.display_name}
            </p>
            <p className=" text-gray-200 font-inter font-bold text-md">
              @{user.username}
            </p>
            <p className=" text-gray-500 font-inter text-md">
              {user.bio?.substring(0, 60)}
            </p>
          </div>
        </Link>
      ) : (
        <></>
      )}
    </div>
  );
}

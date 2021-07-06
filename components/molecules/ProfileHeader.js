/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from "react";
import Link from "next/link";
import { useMutation, useQueryClient } from "react-query";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { AppUiContext } from "../../Context";
import { placeFollow } from "../../apiPlugs/user";

export default function ProfilePage({ user }) {
  const [state] = useContext(AppUiContext);
  const queryClient = useQueryClient();
  const router = useRouter();
  const followPersonMutation = useMutation(placeFollow, {
    onSuccess: async () => {
      queryClient.invalidateQueries("getProfile");
    },
  });
  const setFollow = (active) => {
    if (state.loggedIn) {
      followPersonMutation.mutate({
        id: user?.data.id,
        token: state.user.accessToken,
        active,
      });
    } else {
      router.push("/login");
    }
  };
  return (
    <div className="bg-gray-900 max-w-2xl md:justify-center md:flex md:flex-col w-full">
      <div className="flex">
        <div className="flex-col items-end p-2 m-3">
          {user?.data.profile_pic === null ? (
            <img
              alt="profile-pic"
              src="https://storage.googleapis.com/swiplusimages/profile_pics/default.jpeg"
              width="100"
              height="100"
              className="rounded-full"
            />
          ) : (
            <img
              alt="profile-pic"
              src={user?.data.profile_pic}
              width="100"
              height="100"
              className="rounded-full"
            />
          )}
        </div>
        <div className="flex-row items-start p-2 xl:items-center">
          <div className="text-gray-100 font-bold text-3xl">
            {user?.data.display_name}
          </div>
          <div className="flex-row">
            <div className="text-gray-100 font-bold text-sm">
              @{user?.data.username}
            </div>
          </div>
          <div className="self-center p-2 px-0">
            {state.user.userId === Number(user?.data.id) ? (
              <></>
            ) : (
              <button
                type="button"
                onClick={() =>
                  user?.data.me_follow_user ? setFollow(false) : setFollow(true)
                }
                className="bg-indigo-700 focus:outline-none  p-1.5 px-8 rounded-lg text-white text-sm font-inter font-bold hover:bg-indigo-500"
              >
                {user?.data.me_follow_user ? "Following" : "Follow"}
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="px-2 m-3">
        <div className="text-gray-100 font-medium text-sm overflow-ellipsis max-w-prose">
          {user?.data.bio}
        </div>
      </div>
      <a
        href={`https://${user?.data.link}`}
        target="_blank"
        rel="noreferrer noopener"
      >
        <div className=" text-purple-600 font-medium text-sm overflow-ellipsis mx-3 px-2 ">
          {user?.data.link}
        </div>
      </a>
      {state.user.userId === Number(user?.data.id) ? (
        <div className="items-stretch m-3 px-2 ">
          <div className="flex justify-around">
            <div className="flex flex-1 bg-indigo-700 h-9 w-full mr-3 rounded-xl justify-center hover:bg-indigo-600 text-white">
              <Link href="/settings">
                <button type="button">Edit Profile</button>
              </Link>
            </div>
            <div className="flex flex-1 bg-indigo-700 h-9 rounded-xl justify-center hover:bg-indigo-600 text-white">
              <Link href="/admin">
                <button type="button">Manage</button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}

      <div className="items-stretch m-3 px-2 ">
        <div className="flex justify-around">
          <div className="text-gray-100 font-bold text-sm overflow-ellipsis p-2.5 px-0 text-center ">
            {user?.data.number_of_followers}{" "}
            {+user?.data.number_of_followers === 1 ? "follower" : "followers"}
          </div>
          <div className="text-gray-100 font-bold text-sm overflow-ellipsis p-2.5 text-center">
            {user?.data.number_of_following} following
          </div>
          <div className="text-gray-100 font-bold text-sm overflow-ellipsis p-2.5 text-center">
            {user?.data.number_of_decks}{" "}
            {+user?.data.number_of_decks === 1 ? "deck" : "decks"}
          </div>
          <div className="text-gray-100 font-bold text-sm overflow-ellipsis p-2.5 text-center">
            {user?.data.number_of_likes}{" "}
            {+user?.data.number_of_likes === 1 ? "like" : "likes"}
          </div>
        </div>
      </div>
    </div>
  );
}
ProfilePage.propTypes = {
  user: PropTypes.shape({
    // eslint-disable-next-line react/forbid-prop-types
    data: PropTypes.object,
  }),
};

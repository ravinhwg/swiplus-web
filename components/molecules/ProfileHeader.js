/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from "react";
import Link from "next/link";
import { useMutation, useQueryClient } from "react-query";
import { useRouter } from "next/router";
import { Default, Mobile } from "../utils/Breakpoints";
import FollowButton from "../atoms/Button";
import { AppUiContext } from "../../Context";
import { placeFollow } from "../../apiPlugs/user";

export default function ProfilePage({ user }) {
  const [state, dispatch] = useContext(AppUiContext);
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
    <>
      <Mobile>
        <div className="bg-gray-900">
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
            <div className="flex-row items-start p-2">
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
                      user?.data.me_follow_user
                        ? setFollow(false)
                        : setFollow(true)
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
                <div className="flex flex-1 bg-indigo-700 w-full mr-3 rounded-xl justify-center">
                  <Link href="/settings">
                    <button type="button">
                      <FollowButton text="Edit Profile" />
                    </button>
                  </Link>
                </div>
                <div className="flex flex-1 bg-indigo-700 rounded-xl justify-center">
                  <Link href="/admin">
                    <button type="button">
                      <FollowButton text="Manage Decks" />
                    </button>
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
                {user?.data.number_of_followers} followers
              </div>
              <div className="text-gray-100 font-bold text-sm overflow-ellipsis p-2.5 text-center">
                {user?.data.number_of_following} following
              </div>
              <div className="text-gray-100 font-bold text-sm overflow-ellipsis p-2.5 text-center">
                {user?.data.number_of_decks} decks
              </div>
              <div className="text-gray-100 font-bold text-sm overflow-ellipsis p-2.5 text-center">
                {user?.data.number_of_likes} likes
              </div>
            </div>
          </div>
        </div>
      </Mobile>
      <Default>
        <div className="flex justify-center mt-10">
          <div className="place-items-center w-2/5">
            <div className="flex justify-left">
              <div className="items-end p-2 m-3 ">
                {user?.data.profile_pic === null ? (
                  <img
                    alt="profile-pic"
                    src="https://storage.googleapis.com/swiplusimages/profile_pics/default.jpeg"
                    width="200"
                    height="200"
                    className="rounded-full"
                  />
                ) : (
                  <img
                    alt="profile-pic"
                    src={user?.data.profile_pic}
                    width="200"
                    height="200"
                    className="rounded-full"
                  />
                )}

                <div className=" flex justify-center p-2 px-0  ">
                  {state.user.userId === Number(user?.data.id) ? (
                    <FollowButton text="Edit profile" />
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        user?.data.me_follow_user
                          ? setFollow(false)
                          : setFollow(true)
                      }
                      className="bg-indigo-700 focus:outline-none  p-1.5 px-8 rounded-lg text-white text-sm font-inter font-bold hover:bg-indigo-500"
                    >
                      {user?.data.me_follow_user ? "Following" : "Follow"}
                    </button>
                  )}
                </div>
              </div>
              <div className="flex-row items-start p-2">
                <div className="text-gray-100 font-bold text-3xl ">
                  {user?.data.display_name}
                </div>
                <div className="flex-row">
                  <div className="text-gray-100 font-bold text-sm">
                    @{user?.data.username}
                  </div>
                  <div className="items-stretch flex-row">
                    <div className="flex justify-evenly">
                      <div className="text-gray-100 font-bold text-sm overflow-ellipsis p-2.5 px-0 ">
                        {user?.data.number_of_followers} followers
                      </div>
                      <div className="text-gray-100 font-bold text-sm overflow-ellipsis p-2.5">
                        {user?.data.number_of_following} following
                      </div>
                      <div className="text-gray-100 font-bold text-sm overflow-ellipsis p-2.5">
                        {user?.data.number_of_decks} decks
                      </div>
                      <div className="text-gray-100 font-bold text-sm overflow-ellipsis p-2.5">
                        {user?.data.number_of_likes} likes
                      </div>
                    </div>
                  </div>
                  <div className="my-3">
                    <div className="text-gray-100 font-medium text-sm overflow-ellipsis">
                      {user?.data.bio}
                    </div>
                  </div>
                  <div className=" text-purple-600 font-medium text-sm overflow-ellipsis my-3">
                    {user?.data.link}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Default>
    </>
  );
}

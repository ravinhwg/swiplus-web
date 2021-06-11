import React from "react";
import Image from "next/image";
import { Default, Mobile } from "../utils/Breakpoints";
import FollowButton from "../atoms/Button";
export default function ProfilePage({}) {
  return (
    <>
      <Mobile>
        <div className="bg-gray-900">
          <div className="flex">
            <div className="flex-col items-end p-2 m-3">
              <Image
                src="https://picsum.photos/200"
                width="100"
                height="100"
                className="rounded-full"
              />
            </div>
            <div className="flex-row items-start p-2">
              <div className="text-gray-100 font-bold text-3xl">
                Profile Name
              </div>
              <div className="flex-row">
                <div className="text-gray-100 font-bold text-sm">@username</div>
              </div>
              <div className="self-center p-2 px-0">
                <FollowButton text="Follow" />
              </div>
            </div>
          </div>
          <div className="px-2 m-3">
            <div className="text-gray-100 font-medium text-sm overflow-ellipsis max-w-prose">
              One morning, when Gregor Samsa woke from troubled dreams, he found
              himself transformed in his bed into a horrible vermin. He lay on
              his armour-like ba
            </div>
          </div>
          <div className=" text-purple-600 font-medium text-sm overflow-ellipsis mx-3 px-2 ">
            google.com
          </div>
          <div className="items-stretch m-3 px-2 ">
            <div className="flex justify-around">
              <div className="text-gray-100 font-bold text-sm overflow-ellipsis p-2.5 px-0 ">
                100 followers
              </div>
              <div className="text-gray-100 font-bold text-sm overflow-ellipsis p-2.5">
                100 views
              </div>
              <div className="text-gray-100 font-bold text-sm overflow-ellipsis p-2.5">
                100 likes
              </div>
            </div>
          </div>
        </div>
      </Mobile>
      <Default>
        <div className="flex justify-center">
          <div className="bg-gray-900 place-items-center max-w-screen-md">
            <div className="flex  ">
              <div className="items-end p-2 m-3">
                <Image
                  src="https://picsum.photos/200"
                  width="100"
                  height="100"
                  className="rounded-full"
                />
                <div className="self-center p-2 px-0">
                  <FollowButton text="Follow" />
                </div>
              </div>
              <div className="flex-row items-start p-2">
                <div className="text-gray-100 font-bold text-3xl">
                  Profile name
                </div>
                <div className="flex-row">
                  <div className="text-gray-100 font-bold text-sm">
                    @username
                  </div>
                  <div className="my-3">
                    <div className="text-gray-100 font-medium text-sm overflow-ellipsis">
                      One morning, when Gregor Samsa woke from troubled dreams,
                      he found himself transformed in his bed into a horrible
                      vermin. He lay on his armour-like ba
                    </div>
                  </div>
                  <div className=" text-purple-600 font-medium text-sm overflow-ellipsis my-3">
                    google.com
                  </div>
                </div>
              </div>
            </div>
            <div className="items-stretch m-3 px-2 ">
              <div className="flex justify-around">
                <div className="text-gray-100 font-bold text-sm overflow-ellipsis p-2.5 px-0 ">
                  100 followers
                </div>
                <div className="text-gray-100 font-bold text-sm overflow-ellipsis p-2.5">
                  100 views
                </div>
                <div className="text-gray-100 font-bold text-sm overflow-ellipsis p-2.5">
                  100 likes
                </div>
              </div>
            </div>
          </div>
        </div>
      </Default>
    </>
  );
}

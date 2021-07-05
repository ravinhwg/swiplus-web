import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useMutation, useQueryClient } from "react-query";
import { refreshToken } from "../../apiPlugs/Auth";
import { AppUiContext } from "../../Context";
import { Default, Mobile } from "../utils/Breakpoints";
import Icon from "../atoms/SwiplusLogo";
import {
  HomeIcon,
  NotificationsIcon,
  ProfileIcon,
  GlobeIcon,
  SearchIcon,
  PlusIcon,
} from "../atoms/Icons";
import Search from "../atoms/SearchBar";
import Button from "../atoms/Button";

export default function ProfilePage({
  children,
  showTopBarMobile,
  showCopyrightNotice,
}) {
  const [state, dispatch] = useContext(AppUiContext);
  const { loggedIn } = state;
  const router = useRouter();
  const mutation = useMutation(refreshToken, {
    onSuccess: async ({ data }) => {
      dispatch({
        type: "refresh-token",
        payload: {
          token: data.accessToken,
          expiresIn: data.expiresIn,
        },
      });
      console.log("New access token set");
    },
    onError: async () => {
      router.reload(window.location.pathname);
    },
  });

  useEffect(() => {
    if (state.loggedIn && state.user.expiresIn < Date.now()) {
      mutation.mutate();
    }
    const interval = setInterval(() => {
      if (state.loggedIn && state.user.expiresIn < Date.now()) {
        mutation.mutate();
      }
    }, 300000);
    dispatch({ type: "focused-menu-icon", payload: router.asPath });
    return () => clearInterval(interval);
  }, []);
  const handleMobileNavigation = (navPage) => {
    switch (navPage) {
      case "home":
        return router.push("/");
      case "search":
        return router.push("/search");
      case "notifications":
        return router.push("/notifications");
      case "profile":
        return router.push(`/${state.user.userId}`);
      case "create":
        return router.push("/create");
      case "notifs":
        return router.push("/notifications");
      case "explorer":
        return router.push("/search");
      default:
        return undefined;
    }
  };
  return (
    <>
      <Mobile>
        {showTopBarMobile ? (
          <div className="bg-gray-900 inset-x-0 h-12 top-0 w-full sticky z-50 border-gray-500">
            <div className="flex justify-between flex-row">
              <Link href="/" passHref>
                <a>
                  <Icon />
                </a>
              </Link>
              {loggedIn ? (
                <div className="flex justify-around flex-row">
                  <ProfileIcon
                    onClick={() => handleMobileNavigation("profile")}
                    className={`h-8 w-8 flex self-center m-3 ${
                      state.focusedMenuItem === `/${state.user.userId}`
                        ? "text-indigo-800"
                        : "text-gray-200"
                    }`}
                  />
                  <PlusIcon
                    onClick={() => handleMobileNavigation("create")}
                    className="h-8 w-8 flex self-center m-3 text-gray-200"
                  />
                </div>
              ) : (
                <div className="flex self-center m-3">
                  <Link href="/login" passHref>
                    <a>
                      <Button text="Log in" />
                    </a>
                  </Link>{" "}
                </div>
              )}
            </div>
          </div>
        ) : (
          <></>
        )}
        {/* app body */}
        <div className="bg-gray-900">{children}</div>
        {showCopyrightNotice ? (
          <div className="bg-gray-900  inset-x-0 h-16 bottom-0 border-t-2 border-gray-900 mt-1 flex flex-col justify-center ">
            <div className="flex justify-center items-center">
              <div className=" justify-center flex mr-4 underline text-gray-900">
                about
              </div>
              <div className=" justify-center flex ml-4 underline text-gray-900">
                <a
                  href="https://www.notion.so/39ceb071ee834c5da854dcacf23cdf15?v=221881b95c71439b8e4abf242bf04037"
                  rel="noreferrer"
                  target="_blank"
                >
                  blog
                </a>
              </div>
            </div>
            <div className="text-gray-600 justify-center flex">
              © 2021 Swiplus.com
            </div>
          </div>
        ) : (
          <></>
        )}

        <div className="bg-gray-900  inset-x-0 h-12 bottom-0 border-t-2 border-gray-900 mt-1 flex flex-col justify-center " />
        <div className="bg-gray-900 fixed inset-x-0 h-12 bottom-0 border-t-2 border-gray-800 ">
          <div className="flex justify-around p-1.5">
            <HomeIcon
              onClick={() => handleMobileNavigation("home")}
              className={`h-8 w-8 flex self-center ${
                state.focusedMenuItem === "/"
                  ? "text-indigo-800"
                  : "text-gray-200"
              }`}
            />
            <SearchIcon
              onClick={() => handleMobileNavigation("search")}
              className={`h-8 w-8 flex self-center ${
                state.focusedMenuItem === "/search"
                  ? "text-indigo-800"
                  : "text-gray-200"
              }`}
            />
            {loggedIn ? (
              <NotificationsIcon
                onClick={() => handleMobileNavigation("notifs")}
                className={`h-8 w-8 flex self-center ${
                  state.focusedMenuItem === "/notifications"
                    ? "text-indigo-800"
                    : "text-gray-200"
                }`}
              />
            ) : (
              <> </>
            )}
          </div>
        </div>
      </Mobile>
      <Default>
        <div className="bg-gray-800 mb-3 inset-x-0 h-12 top-0 w-full sticky z-50 border-gray-800 items-center">
          <div className="flex flex-row justify-around items-center bg-gray-800">
            <Link href="/" passHref>
              <a>
                <Icon />
              </a>
            </Link>
            <div>
              <Search />
            </div>
            <div className="flex flex-row">
              {loggedIn ? (
                <>
                  <HomeIcon
                    className={`h-8 w-8 flex self-center m-3 ${
                      state.focusedMenuItem === "/"
                        ? "text-indigo-800"
                        : "text-gray-200"
                    }`}
                    onClick={() => handleMobileNavigation("home")}
                  />
                  <GlobeIcon
                    className={`h-8 w-8 flex self-center m-3 ${
                      state.focusedMenuItem === "/search"
                        ? "text-indigo-800"
                        : "text-gray-200"
                    }`}
                    onClick={() => handleMobileNavigation("explorer")}
                  />
                  <ProfileIcon
                    onClick={() => handleMobileNavigation("profile")}
                    className={`h-8 w-8 flex self-center m-3 ${
                      state.focusedMenuItem === `/${state.user.userId}`
                        ? "text-indigo-800"
                        : "text-gray-200"
                    }`}
                  />
                  <PlusIcon
                    onClick={() => handleMobileNavigation("create")}
                    className={`h-8 w-8 flex self-center m-3 ${
                      state.focusedMenuItem === "/create"
                        ? "text-indigo-800"
                        : "text-gray-200"
                    }`}
                  />
                  <NotificationsIcon
                    onClick={() => handleMobileNavigation("notifs")}
                    className={`h-8 w-8 flex self-center m-3 ${
                      state.focusedMenuItem === "/notifications"
                        ? "text-indigo-800"
                        : "text-gray-200"
                    }`}
                  />
                </>
              ) : (
                <>
                  <div className="flex self-center m-3">
                    <Link href="/login" passHref>
                      <a>
                        <Button text="Log in" />
                      </a>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        {/* app body */}
        <div className="bg-gray-900">{children}</div>
        {showCopyrightNotice ? (
          <div className="bg-gray-900  inset-x-0 h-16 bottom-0 border-t-2 border-gray-900 mt-1 flex flex-col justify-center ">
            <div className="flex justify-center items-center">
              <div className="text-gray-600 justify-center flex mr-4 underline">
                about
              </div>
              <div className="text-gray-600 justify-center flex ml-4 underline">
                <a
                  href="https://www.notion.so/39ceb071ee834c5da854dcacf23cdf15?v=221881b95c71439b8e4abf242bf04037"
                  rel="noreferrer"
                  target="_blank"
                >
                  blog
                </a>
              </div>
            </div>
            <div className="text-gray-600 justify-center flex">
              © 2021 Swiplus.com
            </div>
          </div>
        ) : (
          <></>
        )}
      </Default>
    </>
  );
}

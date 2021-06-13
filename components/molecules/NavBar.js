import React, { useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { AppUiContext } from "../../Context";
import { Default, Mobile } from "../utils/Breakpoints";
import Icon from "../atoms/SwiplusLogo";
import {
  HomeIcon,
  NotificationsIcon,
  ProfileIcon,
  SearchIcon,
  PlusIcon,
} from "../atoms/Icons";
import Search from "../atoms/SearchBar";
import Button from "../atoms/Button";

export default function ProfilePage({ children, showTopBarMobile }) {
  const [state, dispatch] = useContext(AppUiContext);
  const { loggedIn } = state;
  const router = useRouter();
  const handleMobileNavigation = (navPage) => {
    dispatch({ type: "focused-menu-icon", payload: navPage });
    switch (navPage) {
      case "home":
        return router.push("/");
      case "search":
        return router.push("/search");
      case "notifications":
        return router.push("/notifications");
      case "profile":
        return router.push("/hello");
      case "create":
        return router.push("/create");
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
              <Icon />
              {loggedIn ? (
                <div className="flex justify-around flex-row">
                  <ProfileIcon
                    onClick={() => handleMobileNavigation("profile")}
                    className={`h-8 w-8 flex self-center m-3 ${
                      state.focusedMenuItem === "profile"
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
        <div className="bg-gray-900 inset-x-0 h-12 bottom-0 border-t-2 border-gray-900 " />
        <div className="bg-gray-900 fixed inset-x-0 h-12 bottom-0 border-t-2 border-gray-800 ">
          <div className="flex justify-around p-1.5">
            <HomeIcon
              onClick={() => handleMobileNavigation("home")}
              className={`h-8 w-8 flex self-center ${
                state.focusedMenuItem === "home"
                  ? "text-indigo-800"
                  : "text-gray-200"
              }`}
            />
            <SearchIcon
              onClick={() => handleMobileNavigation("search")}
              className={`h-8 w-8 flex self-center ${
                state.focusedMenuItem === "search"
                  ? "text-indigo-800"
                  : "text-gray-200"
              }`}
            />
            {loggedIn ? (
              <NotificationsIcon className=" h-8 w-8 text-gray-200 self-center" />
            ) : (
              <> </>
            )}
          </div>
        </div>
      </Mobile>
      <Default>
        <div className="bg-gray-900 inset-x-0 h-12 top-0 w-full sticky z-50 border-gray-800">
          <div className="flex flex-row justify-between">
            <Icon />
            <Search />
            <div className="flex flex-row">
              {loggedIn ? (
                <>
                  <HomeIcon
                    className={`h-8 w-8 flex self-center m-3 ${
                      state.focusedMenuItem === "home"
                        ? "text-indigo-800"
                        : "text-gray-200"
                    }`}
                    onClick={() => handleMobileNavigation("home")}
                  />
                  <ProfileIcon
                    onClick={() => handleMobileNavigation("profile")}
                    className={`h-8 w-8 flex self-center m-3 ${
                      state.focusedMenuItem === "profile"
                        ? "text-indigo-800"
                        : "text-gray-200"
                    }`}
                  />
                  <NotificationsIcon className=" h-8 w-8 text-gray-200 self-center m-3" />
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
      </Default>
    </>
  );
}

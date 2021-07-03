import React, { useContext, useRef } from "react";
import Head from "next/head";
import { useInfiniteQuery } from "react-query";
import { InView } from "react-intersection-observer";
import { useRouter } from "next/router";
import { BackButton } from "../components/atoms/Icons";
import Navbar from "../components/molecules/NavBar";
import { AppUiContext } from "../Context";
import { grabNotifications } from "../apiPlugs/user";
import DisplayNotif from "../components/molecules/NotificationDisplay";

export default function Home() {
  const [state] = useContext(AppUiContext);
  const router = useRouter();
  const pageNumber = useRef(0);
  const query = useInfiniteQuery(
    ["grabNotifs", state.user.accessToken],
    grabNotifications,
    {}
  );
  return (
    <>
      <Head>
        <title>Notifications</title>
      </Head>
      <Navbar>
        <div className="sm:w-full sm:flex sm:justify-center ">
          <div className="lg:w-6/12 md:w-10/12 lg:bg-gray-800">
            <div className="flex fixed bg-gray-900 w-full p-2 -m-1">
              <button onClick={() => router.back()} type="button">
                <BackButton className="text-gray-100  font-inter font-bold h-10 w-10" />
              </button>
              <h3 className="text-gray-100 text-xl font-inter font-bold self-center ">
                Notifications
              </h3>
            </div>
            <div className="flex bg-gray-900 h-11 w-full p-2" />
            <div className="p-1">
              {query.isLoading && !query.error ? (
                <></>
              ) : (
                query.data.pages.map((page) => (
                  <React.Fragment key={page.nextId}>
                    {page.data.data.map((project) => (
                      <DisplayNotif notifData={project} />
                    ))}
                  </React.Fragment>
                ))
              )}
            </div>
            {query.isLoading && !query.error ? (
              <></>
            ) : (
              <InView
                as="div"
                onChange={(inView) => {
                  if (inView) {
                    // Check if data has all the decks
                    if (
                      query.data.pages[query.data.pages.length - 1].data
                        .nextPage
                    ) {
                      pageNumber.current += 1;
                      query.fetchNextPage({ pageParam: pageNumber.current });
                    }
                  }
                }}
              />
            )}
          </div>
        </div>
      </Navbar>
    </>
  );
}

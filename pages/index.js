/* eslint-disable no-nested-ternary */
import React, { useContext, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import { useInfiniteQuery } from "react-query";
import { InView } from "react-intersection-observer";
import Button from "../components/atoms/Button";
import Navbar from "../components/molecules/NavBar";
import { AppUiContext } from "../Context";
import { getChronologicalFeed, getExplorerFeed } from "../apiPlugs/deck";
import SingleCard from "../components/atoms/SingleCard";
import JoinSwiplusBanner from "../components/molecules/JoinSwiplusBanner";

export default function Home() {
  const [state] = useContext(AppUiContext);
  const pageNumber = useRef(0);
  const query = useInfiniteQuery(
    ["projects", state.user?.accessToken],
    state.loggedIn ? getChronologicalFeed : getExplorerFeed,
    {
      staleTime: 900000, // 15 minutes
    }
  );
  return (
    <>
      <Head>
        <title>Swiplus Home</title>
        <meta property="og:url" content="https://www.swiplus.com" />
        <meta property="og:title" content="Welcome to Swiplus" />
        <meta
          property="og:description"
          content="Log in or sign up! Swiplus is a visual blogging platform."
        />
        <meta
          property="og:image"
          content="https://storage.googleapis.com/static.swiplus.com/assets/og-icon.jpg"
        />
      </Head>
      <Navbar showTopBarMobile>
        <div className="sm:w-full sm:flex sm:justify-evenly ">
          <div className="lg:w-8/12 md:w-10/12">
            {state.loggedIn || !state.askToJoinBannerVisible ? (
              <></>
            ) : (
              <JoinSwiplusBanner />
            )}
            <div className="grid grid-flow-row-dense row-auto grid-cols-2 max-w-6xl md:self-center sm:grid-cols-3 md:grid-cols-3 md:mx-3 lg:grid-cols-4 gap-1 lg:gap-6 sm:my-8 m-2">
              {query.isLoading ? (
                <>
                  <SingleCard />
                  <SingleCard />
                  <SingleCard />
                  <SingleCard />
                  <SingleCard />
                  <SingleCard />
                  <SingleCard />
                  <SingleCard />
                  <SingleCard />
                  <SingleCard />
                  <SingleCard />
                  <SingleCard />
                </>
              ) : (
                query.data.pages.map((page) => (
                  <React.Fragment key={page.nextId}>
                    {page.data.data.map((project) => (
                      <SingleCard deck={project} />
                    ))}
                  </React.Fragment>
                ))
              )}
            </div>
            {!query.isLoading && query.data.pages[0].data.data.length === 0 ? (
              // Show list empty component if there is no data to  show to the user.
              <div className=" text-gray-100 flex flex-col justify-center h-96   items-center">
                <div className="text-6xl font-inter">👋</div>
                <div className="text-4xl font-inter max-w-xl text-center m-2">
                  Hello there! Welcome to Swiplus
                </div>
                <div className="text-xl font-normal max-w-lg text-center m-3">
                  {` Looks like you don't follow anybody yet. You can go to the
                  explore feed and find new decks and people there!`}
                </div>
                <div className="text-xl font-normal max-w-lg text-center m-3">
                  <Link href="/search">
                    {/* // eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <button type="button">
                      <Button text="Explore Feed" />
                    </button>
                  </Link>
                </div>
              </div>
            ) : (
              <></>
            )}
            {!query.isLoading && !query.isError ? (
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
            ) : (
              <></>
            )}
          </div>
        </div>
      </Navbar>
    </>
  );
}

import React, { useContext, useRef } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useInfiniteQuery } from "react-query";
import { InView } from "react-intersection-observer";
import Navbar from "../components/molecules/NavBar";
import SearchBar from "../components/atoms/SearchBar";
import SingleCard from "../components/atoms/SingleCard";
import { Mobile } from "../components/utils/Breakpoints";
import ProfileCard from "../components/atoms/ProfileCard";
import getSearchResults from "../apiPlugs/search";
import { AppUiContext } from "../Context";
import { getExplorerFeed } from "../apiPlugs/deck";

export default function Search() {
  const [state] = useContext(AppUiContext);
  const router = useRouter();
  const pageNumber = useRef(0);
  const pageNumberFeed = useRef(0);
  const query = useInfiniteQuery(
    ["searchResults", router.query.q],
    getSearchResults,
    {
      staleTime: 900000, // 15 minutes
    }
  );
  const goBackfromSearch = () => {
    router.back();
  };
  const getExplorerFeedQuery = useInfiniteQuery(
    "ExplorerFeedinSearch",
    getExplorerFeed,
    {
      staleTime: 900000, // 15 minutes
    }
  );

  return (
    <Navbar>
      <Head>
        <title>Search Swiplus</title>
        <meta property="og:url" content="https://www.swiplus.com" />
        <meta property="og:title" content="Welcome to Swiplus" />
        <meta
          property="og:description"
          content="Log in or sign up! Swiplus is a visual blogging platform."
        />
        <meta
          property="og:image"
          content="https://storage.googleapis.com/swiplusimages/assets/og-icon.jpg"
        />
      </Head>
      <Mobile>
        <div className="flex flex-row m-3 justify-start">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className=" h-8 text-gray-200 self-center w-auto"
            fill="none"
            onClick={goBackfromSearch}
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <div className="w-11/12">
            <SearchBar q={router.query.q} />
          </div>
        </div>
        {!router.query.q && state.loggedIn ? (
          <>
            <div className="grid row-auto grid-cols-2 lg:m-20  sm:grid-cols-2 md:grid-cols-3 md:mx-3 lg:grid-cols-4 xl:grid-cols-5 gap-1 sm:my-8">
              {getExplorerFeedQuery.isLoading ? (
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
                getExplorerFeedQuery.data.pages.map((page) => (
                  <React.Fragment key={page.nextId}>
                    {page.data.data.map((project) => (
                      <SingleCard deck={project} />
                    ))}
                  </React.Fragment>
                ))
              )}
            </div>
            <InView
              as="div"
              onChange={(inView) => {
                if (inView) {
                  // Check if data has all the decks
                  if (
                    getExplorerFeedQuery.data.pages[
                      getExplorerFeedQuery.data.pages.length - 1
                    ].data.nextPage
                  ) {
                    pageNumberFeed.current += 1;
                    query.fetchNextPage({ pageParam: pageNumberFeed.current });
                  }
                }
              }}
            />
          </>
        ) : (
          <div className="h-screen p-1">
            <div className="flex overflow-x-scroll pb-10">
              <div className="flex flex-nowrap">
                {query.isLoading ? (
                  <>
                    <ProfileCard key={0} />
                    <ProfileCard key={1} />
                    <ProfileCard key={2} />
                    <ProfileCard key={3} />
                  </>
                ) : (
                  query.data.pages.map((page) => (
                    <React.Fragment key={page.nextId}>
                      {page.data.users.users.map((user) => (
                        <ProfileCard user={user} />
                      ))}
                    </React.Fragment>
                  ))
                )}
                <InView
                  as="div"
                  onChange={(inView) => {
                    if (inView) {
                      // Check if data has all the decks
                      if (
                        query.data.pages[query.data.pages.length - 1].data.users
                          .nextPage
                      ) {
                        pageNumber.current += 1;
                        query.fetchNextPage({ pageParam: pageNumber.current });
                      }
                    }
                  }}
                />
              </div>
            </div>
            <div className="h-4/6">
              <div className="grid row-auto grid-cols-2 sm:grid-cols-3 md:grid-cols-3 md:mx-3 lg:grid-cols-4 xl:grid-cols-4 gap-1 sm:my-8">
                {query.isLoading ? (
                  <>
                    <SingleCard key={0} />
                    <SingleCard key={1} />
                    <SingleCard key={2} />
                    <SingleCard key={3} />
                    <SingleCard key={4} />
                    <SingleCard key={5} />
                  </>
                ) : (
                  query.data.pages.map((page) => (
                    <React.Fragment key={page.nextId}>
                      {page.data.decks.decks.map((deck) => (
                        <SingleCard deck={deck} key={`${deck.id}`} />
                      ))}
                    </React.Fragment>
                  ))
                )}
                <InView
                  as="div"
                  onChange={(inView) => {
                    if (inView) {
                      // Check if data has all the decks
                      if (
                        query.data.pages[query.data.pages.length - 1].data.decks
                          .nextPage
                      ) {
                        pageNumber.current += 1;
                        query.fetchNextPage({ pageParam: pageNumber.current });
                      }
                    }
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </Mobile>
    </Navbar>
  );
}

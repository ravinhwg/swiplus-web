import React, { useContext, useRef } from "react";
import Head from "next/head";
import { useInfiniteQuery } from "react-query";
import { InView } from "react-intersection-observer";
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
          content="https://storage.googleapis.com/swiplusimages/assets/og-icon.jpg"
        />
      </Head>
      <Navbar showTopBarMobile>
        {state.loggedIn || !state.askToJoinBannerVisible ? (
          <></>
        ) : (
          <JoinSwiplusBanner />
        )}
        <div className="grid row-auto grid-cols-2 lg:m-20  sm:grid-cols-2 md:grid-cols-3 md:mx-3 lg:grid-cols-4 xl:grid-cols-5 gap-1 sm:my-8">
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
        <InView
          as="div"
          onChange={(inView) => {
            if (inView) {
              // Check if data has all the decks
              if (query.data.pages[query.data.pages.length - 1].data.nextPage) {
                pageNumber.current += 1;
                query.fetchNextPage({ pageParam: pageNumber.current });
              }
            }
          }}
        />
      </Navbar>
    </>
  );
}

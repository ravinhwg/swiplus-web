/* eslint-disable no-nested-ternary */
import Head from "next/head";
import { isError, useInfiniteQuery, useQuery } from "react-query";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import Navbar from "../components/molecules/NavBar";
import SingleCard from "../components/atoms/SingleCard";
import { SpinnerBasic } from "../components/atoms/Icons";
import ProfileHeader from "../components/molecules/ProfileHeader";
import { getUser, getUserDecks } from "../apiPlugs/user";
import { AppUiContext } from "../Context";
import ErrorPage from "../components/molecules/ErrorPage";

export default function Home({ profile, metaData }) {
  const router = useRouter();
  const [state] = useContext(AppUiContext);
  const queryKey = "profile";
  const queryValue = router.query[queryKey] || profile;
  const query = useQuery(
    ["getProfile", queryValue, state.user?.accessToken],
    getUser,
    {
      retryOnMount: true,
    }
  );
  const userDecks = useInfiniteQuery(
    ["getUserDecks", queryValue],
    getUserDecks
  );

  return (
    <>
      <Head>
        <title>{`${metaData.display_name || "Not found"} (@${
          metaData.username || ""
        }) - Swiplus`}</title>
        <meta property="og:url" content={`${metaData.url}`} />
        <meta
          property="og:title"
          content={`${metaData.display_name} (@${metaData.username}) - Swiplus`}
        />
        <meta property="og:description" content={`${metaData.bio}`} />
        <meta property="og:image" content={`${metaData.profile_pic}`} />
      </Head>
      <Navbar showTopBarMobile>
        {!query.isLoading && !query.error ? (
          <>
            <ProfileHeader user={query.data} />
            <div className="grid row-auto grid-cols-2 lg:m-20 sm:grid-cols-3 md:grid-cols-3 md:mx-3 lg:grid-cols-3 gap-1 sm:my-8">
              {userDecks.isLoading ? (
                <>
                  <SingleCard key={0} />
                  <SingleCard key={1} />
                  <SingleCard key={2} />
                  <SingleCard key={3} />
                  <SingleCard key={4} />
                  <SingleCard key={5} />
                </>
              ) : (
                userDecks.data.pages.map((page) => (
                  <React.Fragment key={page.nextId}>
                    {page.data.decks.map((deck) => (
                      <SingleCard deck={deck} key={deck.id} />
                    ))}
                  </React.Fragment>
                ))
              )}
            </div>
          </>
        ) : query.isLoading ? (
          <div className="flex h-40">
            <div className="m-auto  items-center flex flex-col">
              <SpinnerBasic className="animate-spin -ml-1 mr-3 h-10 w-10 text-indigo-600" />
            </div>
          </div>
        ) : query.isError ? (
          <div className="p-3">
            <ErrorPage />
          </div>
        ) : (
          <></>
        )}
      </Navbar>
    </>
  );
}

export async function getServerSideProps(context) {
  const { profile } = context.params;
  const metaData = {};

  try {
    const response = await getUser({ queryKey: ["getUser", profile] });
    metaData.display_name = response.data.display_name;
    metaData.username = response.data.username;
    metaData.profile_pic =
      response.data.profile_pic ||
      "https://storage.googleapis.com/swiplusimages/profile_pics/default.jpeg";
    metaData.url = `https://swiplus.com/${username}`;
    metaData.bio = response.data.bio;
    return {
      props: {
        profile,
        metaData,
      },
    };
  } catch (e) {
    return {
      props: {
        profile,
        metaData,
      },
    };
  }
}

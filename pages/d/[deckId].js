/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
import { decode } from "blurhash";
import UPNG from "upng-js";
import Head from "next/head";
import { encode } from "base64-arraybuffer-es6";
import SwiperCore, { Mousewheel, Pagination, Navigation } from "swiper";
import { useForm } from "react-hook-form";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { InView } from "react-intersection-observer";
import { useRouter } from "next/router";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import Navbar from "../../components/molecules/NavBar";
import {
  getDeck,
  placeComment,
  getComments,
  placeLike,
  deleteDeck,
} from "../../apiPlugs/deck";
import { AppUiContext } from "../../Context";
import {
  BackButton,
  LikeOutline,
  TrashCan,
  SpinnerBasic,
  LikeFill,
  Eye,
  Share,
  FlagIcon,
} from "../../components/atoms/Icons";
import CommentDisplay from "../../components/molecules/CommentDisplay";
import abbreviateNumber from "../../components/utils/numberFormatter";
import ErrorPage from "../../components/molecules/ErrorPage";
import * as ga from "../../lib/ga";
import ReportDialogBox from "../../components/molecules/ReportDialog";
// import { getUserDecks } from "../../apiPlugs/user";

export default function DeckViewer({ deckId, blurhashImages, metaData }) {
  const router = useRouter();
  const pageNumber = useRef(0);
  const [showAll, setShowAll] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const queryClient = useQueryClient();
  const [comment, setComment] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [state] = useContext(AppUiContext);

  const deckQuery = useQuery(
    ["getDeck", router.query.deckId || deckId, state.user?.accessToken],
    getDeck,
    {
      refetchOnWindowFocus: false,
    }
  );

  const commentQuery = useInfiniteQuery(
    ["comments", router.query.deckId, state?.user.accessToken],
    getComments
  );
  const likeDeck = useMutation("likeDeck", placeLike);
  const deleteDeckMutation = useMutation("deleteDeck", deleteDeck, {
    onSuccess: async () => {
      queryClient.invalidateQueries();
      router.replace("/");
    },
  });
  const deleteDeckStart = () => {
    deleteDeckMutation.mutate({
      token: state.user.accessToken,
      id: router.query.deckId,
    });
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const goBackfromSearch = () => {
    router.back();
  };
  const commentMutation = useMutation(placeComment, {
    onSuccess: async () => {
      setComment("");
      queryClient.invalidateQueries("comments");
    },
  });
  const submitComment = () => {
    commentMutation.mutate({
      comment,
      deckId: router.query.deckId,
      token: state.user?.accessToken,
    });
  };
  // const userDecks = useInfiniteQuery(
  //   ["getUserDecks", metaData.username],
  //   getUserDecks,
  //   {
  //     enabled: true,
  //   }
  // );
  useEffect(() => {
    TimeAgo.addLocale(en);
    const timeAgo = new TimeAgo("en-US");
    setCreatedAt(
      timeAgo.format(
        Date.now() -
          (Date.now() -
            Math.floor(
              new Date(
                deckQuery.data?.data?.deck?.created_at || Date.now()
              ).getTime()
            ))
      )
    );
    // Deck view
    ga.event({
      action: "Deck View",
      params: {
        deck_title: deckQuery.data?.deck?.deck_title,
        deck_id: router.query.deckId,
        deck_author: deckQuery.data?.deck?.deck_author,
        deck_author_id: deckQuery.data?.deck?.username,
      },
    });
  }, [deckQuery.isLoading]);
  SwiperCore.use([Mousewheel, Pagination, Navigation]);
  const setLike = (active) => {
    if (state.loggedIn) {
      likeDeck.mutate(
        {
          active,
          deckId: router.query.deckId,
          token: state?.user.accessToken,
        },
        {
          onSuccess: async () => {
            if (active) {
              deckQuery.data.data.likes += 1;
              deckQuery.data.data.userLiked = true;
            } else {
              deckQuery.data.data.likes -= 1;
              deckQuery.data.data.userLiked = false;
            }
          },
        }
      );
    } else {
      router.replace("/login");
    }
  };
  const changeDialogState = () => {
    setShowReportDialog((currentDialogState) => !currentDialogState);
  };

  return (
    <>
      <Head>
        <title>{`${metaData.deck_title || "Not found"} | ${
          metaData.deck_author || ""
        } - Swiplus`}</title>
        <meta property="og:url" content={`${metaData.url}`} />
        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content={`${metaData.deck_title}| ${metaData.deck_author} - Swiplus`}
        />
        <meta
          property="og:description"
          content={`${metaData.deck_description}`}
        />
        <meta property="og:image" content={`${metaData.thumb}`} />
      </Head>
      <Navbar>
        <>
          <div className="flex justify-center ">
            {deckQuery.isLoading ? (
              <div className="flex h-screen">
                <div className="m-auto  items-center flex flex-col">
                  <SpinnerBasic className="animate-spin -ml-1 mr-3 h-16 w-16 text-indigo-600" />
                </div>
              </div>
            ) : !deckQuery.isLoading && !deckQuery.error ? (
              <>
                <div className="lg:flex w-full lg:w-8/12">
                  <div className="lg:w-6/12 lg:h-3/6">
                    <div className="flex flex-row m-3 justify-start">
                      <BackButton
                        className=" h-8 text-gray-200 self-center w-auto"
                        onClick={goBackfromSearch}
                      />
                      <div className="w-11/12 text-xl text-gray-200 self-center font-inter font-medium">
                        <div className="flex align-text-top">
                          {deckQuery.data.data.deck?.deck_title.slice(0, 27)}
                          {deckQuery.data.data.deck?.deck_title.length > 30
                            ? "..."
                            : ""}
                        </div>
                      </div>
                    </div>
                    <div className="w-full">
                      <Swiper
                        zoom={{ maxRatio: 5 }}
                        spaceBetween={1}
                        slidesPerView={1}
                        navigation
                        mousewheel
                        pagination={{ dynamicBullets: true }}
                      >
                        {deckQuery.data.data.deck?.card_order.map(
                          (item, index) => (
                            <SwiperSlide key={`${index.length}-${item}`}>
                              <Image
                                placeholder="blur"
                                blurDataURL={blurhashImages[index]}
                                src={item}
                                alt={index}
                                height="1350"
                                width="1080"
                              />
                            </SwiperSlide>
                          )
                        )}
                      </Swiper>
                    </div>
                    <div className="items-stretch m-3 px-2 ">
                      <div className="flex justify-around">
                        <div className="text-gray-100 font-bold text-sm overflow-ellipsis p-2.5 text-center">
                          {deckQuery.data.data.userLiked ? (
                            <LikeFill
                              className="h-8 w-8 text-red-600"
                              onClick={() => setLike(false)}
                            />
                          ) : (
                            <LikeOutline
                              className="h-8 w-8 text-red-600"
                              onClick={() => setLike(true)}
                            />
                          )}
                          {abbreviateNumber(+deckQuery.data.data.likes)}
                        </div>
                        <div className="text-gray-100 font-bold text-sm overflow-ellipsis p-2.5 text-center">
                          <Eye className="h-8 w-8 text-gray-300" />
                          {abbreviateNumber(deckQuery.data.data.views)}
                        </div>
                        <div className="text-gray-100 font-bold text-sm overflow-ellipsis p-2.5 text-center">
                          <Share className="h-8 w-8 text-gray-300" />
                          share
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* end card and three buttons */}
                  <div className="lg:w-6/12 lg:mt-7 lg:h-3/6 lg:max-w-md">
                    <div className="p-3 flex w-full justify-between">
                      <Link href={`/${deckQuery.data.data.deck?.username}`}>
                        <div className="flex">
                          {deckQuery.data.data.deck?.profile_pic ? (
                            <img
                              src={deckQuery.data.data?.deck.profile_pic}
                              alt="profile-pic"
                              className="rounded-full h-12 w-12 my-1"
                            />
                          ) : (
                            <img
                              src="https://storage.googleapis.com/swiplusimages/profile_pics/default.jpeg"
                              alt="profile-pic"
                              className="rounded-full h-12 w-12 my-1"
                            />
                          )}
                          <div className="mx-2">
                            <button type="button">
                              <p className="text-gray-50 text-left text-md m-1">
                                {deckQuery.data.data.deck?.display_name}
                              </p>
                              <p className="text-gray-300 text-xs m-1">
                                {`PUBLISHED ${createdAt.toUpperCase()}`}
                              </p>
                            </button>
                          </div>
                        </div>
                      </Link>

                      <button
                        type="button"
                        onClick={() =>
                          setShowAll((showAllState) => !showAllState)
                        }
                      >
                        <BackButton
                          className={`h-10 w-10  transform ${
                            showAll ? "rotate-90" : "-rotate-90"
                          } text-gray-400 `}
                        />
                      </button>
                    </div>
                    {showAll ? (
                      <div className="text-gray-300 self-center font-light font-inter text-sm p-3.5 ">
                        <p className="font-bold mb-4">
                          {deckQuery.data.data.deck?.deck_title}
                        </p>
                        {deckQuery.data.data.deck?.deck_description}
                        <div className="flex justify-evenly mt-7 ">
                          {state.user.userId ===
                          +deckQuery.data.data.deck.user_id ? (
                            <div className="flex items-center justify-left ">
                              <button
                                type="button"
                                onClick={() => deleteDeckStart()}
                                className="flex items-center font-regular"
                              >
                                <TrashCan className="h-8 w-8 text-gray-400 hover:text-gray-300 m-2" />
                                Delete Deck
                              </button>
                            </div>
                          ) : (
                            <></>
                          )}
                          <div className="flex items-center justify-left ">
                            <div className="flex items-center justify-left">
                              <button
                                type="button"
                                onClick={() => changeDialogState()}
                                className="flex items-center font-regular"
                              >
                                <FlagIcon className="h-8 w-8 text-gray-400 hover:text-gray-300 m-2" />
                                Report Deck
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                    {state.loggedIn && !deckQuery.error ? (
                      <form onSubmit={handleSubmit(() => submitComment())}>
                        <div className=" text-red-500  p-2 rounded-md text-sm text-left w-full">
                          {errors.comment?.type === "required" &&
                            "Comment text is required"}
                          {errors.comment?.type === "minLength" &&
                            "Comment has to be more than one character long"}
                          {errors.comment?.type === "maxLength" &&
                            "Comment has to be less than 500 characters"}
                        </div>
                        <div className="p-3 flex flex-col justify-end">
                          <textarea
                            value={comment}
                            {...register("comment", {
                              required: true,
                              minLength: 1,
                              maxLength: 500,
                            })}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Type a comment"
                            className="bg-gray-600  h-full resize-y   border-2 border-transparent rounded-xl w-full py-2 px-4 text-gray-100 font-inter leading-tight focus:outline-none  focus:border-blue-600"
                          />
                          <p className="mb-4 text-right text-gray-500">
                            {comment.length}/500
                          </p>
                          <button
                            type="submit"
                            className="bg-indigo-700 focus:outline-none  p-1.5 px-8 rounded-lg text-white text-sm font-inter font-bold hover:bg-indigo-500"
                          >
                            Comment
                          </button>
                        </div>
                      </form>
                    ) : !deckQuery.error ? (
                      <div className="flex justify-center">
                        <button
                          type="submit"
                          onClick={() => router.push("/login")}
                          className="bg-indigo-700 focus:outline-none w-8/12  self-center p-1.5 px-8 rounded-lg text-white text-sm font-inter font-bold hover:bg-indigo-500"
                        >
                          Login to comment
                        </button>
                      </div>
                    ) : (
                      <></>
                    )}
                    <div className="lg:overflow-scroll  lg:h-96 hide-scrollbar">
                      {!commentQuery.isLoading && !deckQuery.error ? (
                        commentQuery.data.pages.map((page) => (
                          <React.Fragment key={page.nextId}>
                            {page.data.data.map((singleComment) => (
                              <CommentDisplay
                                comment={singleComment}
                                key={comment.id}
                              />
                            ))}
                          </React.Fragment>
                        ))
                      ) : (
                        <></>
                      )}
                      <InView
                        as="div"
                        onChange={(inView) => {
                          if (inView) {
                            // Check if data has all the decks
                            if (
                              commentQuery.data?.pages[
                                commentQuery.data.pages.length - 1
                              ].data.nextPage
                            ) {
                              pageNumber.current += 1;
                              commentQuery.fetchNextPage({
                                pageParam: pageNumber.current,
                              });
                            }
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
                {/* <div className="lg:w-2/12 lg:mt-7 invisible lg:visible overflow-scroll p-2 lg:h-5/6">
                {!userDecks.isLoading && !userDecks.isError ? (
                  userDecks.data.pages.map((page) => (
                    <React.Fragment key={page.nextId}>
                      {page.data.decks.map((deck) => (
                        <>
                          <div className="m-2">
                            <SingleCard deck={deck} key={deck.id} />
                          </div>
                          <div className="m-2">
                            <SingleCard deck={deck} key={deck.id} />
                          </div>
                        </>
                      ))}
                    </React.Fragment>
                  ))
                ) : (
                  <>
                    <SingleCard key={0} />
                    <SingleCard key={1} />
                    <SingleCard key={2} />
                    <SingleCard key={3} />
                    <SingleCard key={4} />
                    <SingleCard key={5} />
                  </>
                )}
              </div> */}
              </>
            ) : (
              // Error page
              <ErrorPage />
            )}
            <div className="absolute">
              {showReportDialog ? (
                <ReportDialogBox
                  type="deck"
                  id={deckId}
                  dialogChanger={changeDialogState}
                />
              ) : (
                <></>
              )}
            </div>
          </div>
        </>
      </Navbar>
    </>
  );
}

export async function getServerSideProps(context) {
  const { deckId } = context.params;
  const blurhashImages = [];
  const metaData = {};

  const generatePlaceholderFromBlurhash = async (blurhashString) => {
    const pixels = decode(blurhashString, 108, 135);
    const png = await UPNG.encode([pixels], 108, 135, 64);
    return `data:image/png;base64,${encode(png)}`;
  };
  try {
    const response = await getDeck({ queryKey: ["getDeck", deckId] });
    // eslint-disable-next-line no-restricted-syntax
    for (const item of response.data.deck.blurhash_strings) {
      // eslint-disable-next-line no-await-in-loop
      const transformedImage = await generatePlaceholderFromBlurhash(item);
      blurhashImages.push(transformedImage);
    }
    metaData.deck_title = response.data.deck.deck_title || "Not Found";
    metaData.deck_author = response.data.deck.display_name || "Swiplus";
    // eslint-disable-next-line prefer-destructuring
    metaData.thumb = response.data.deck.card_order[0];
    metaData.deck_description = response.data.deck.deck_description;
    metaData.username = response.data.deck.username;
    metaData.url = `https://swiplus.com/d/${deckId}`;
    return {
      props: {
        deckId,
        blurhashImages,
        metaData,
      },
    };
  } catch (e) {
    return {
      props: {
        deckId,
        blurhashImages,
        metaData,
      },
    };
  }
}

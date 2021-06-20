/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import SwiperCore, { Mousewheel, Pagination } from "swiper";
import { useForm } from "react-hook-form";
import { InView } from "react-intersection-observer";
import { useRouter } from "next/router";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import Navbar from "../../components/molecules/NavBar";
import { getDeck, placeComment, getComments, placeLike } from "../../api/deck";
import { AppUiContext } from "../../Context";
import {
  BackButton,
  LikeOutline,
  LikeFill,
  Eye,
  Share,
} from "../../components/atoms/Icons";
import CommentDisplay from "../../components/molecules/CommentDisplay";
import { Mobile } from "../../components/utils/Breakpoints";

export default function Search() {
  const router = useRouter();
  const pageNumber = useRef(0);
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [state, dispatch] = useContext(AppUiContext);
  const [deckData, setDeckData] = useState({});
  const query = useQuery(
    ["getDeck", router.query.deckId, state.user?.accessToken],
    getDeck,
    {
      refetchOnWindowFocus: false,
      onSuccess: async ({ data }) => {
        setDeckData({ ...data });
      },
    }
  );

  const commentQuery = useInfiniteQuery(
    ["comments", router.query.deckId, state?.user.accessToken],
    getComments
  );
  const likeDeck = useMutation("likeDeck", placeLike, {
    onSuccess: async () => {
      queryClient.invalidateQueries("getDeck");
    },
  });
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
  SwiperCore.use([Mousewheel, Pagination]);
  const setLike = (active) => {
    if (state.loggedIn) {
      likeDeck.mutate({
        active,
        deckId: router.query.deckId,
        token: state?.user.accessToken,
      });
    } else {
      router.replace("/login");
    }
  };
  return (
    <Navbar>
      <div className="flex flex-row m-3 justify-start">
        <BackButton
          className=" h-8 text-gray-200 self-center w-auto"
          onClick={goBackfromSearch}
        />
        <div className="w-11/12 text-xl text-gray-200 self-center font-inter font-medium">
          <div className="flex align-text-top">{deckData.deck?.deck_title}</div>
        </div>
      </div>
      <div className="bg-gray-800 w-full ">
        <Swiper
          lazy="true"
          spaceBetween={1}
          slidesPerView={1}
          // mousewheel
          pagination={{ dynamicBullets: true }}
        >
          {deckData.deck?.card_order.map((item, index) => (
            <SwiperSlide key={`${index}-${item}`}>
              <img src={item} alt={index} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="items-stretch m-3 px-2 ">
        <div className="flex justify-around">
          <div className="text-gray-100 font-bold text-sm overflow-ellipsis p-2.5 text-center">
            {deckData?.userLiked ? (
              <LikeFill
                className="h-10 w-10 text-red-600"
                onClick={() => setLike(false)}
              />
            ) : (
              <LikeOutline
                className="h-10 w-10 text-red-600"
                onClick={() => setLike(true)}
              />
            )}
            {deckData?.likes}
          </div>
          <div className="text-gray-100 font-bold text-sm overflow-ellipsis p-2.5 text-center">
            <Eye className="h-10 w-10 text-gray-300" />
            {deckData?.views}
          </div>
          <div className="text-gray-100 font-bold text-sm overflow-ellipsis p-2.5 text-center">
            <Share className="h-10 w-10 text-gray-300" />
            share
          </div>
        </div>
      </div>
      <div className="p-3 flex w-full justify-between">
        <div className="flex">
          {deckData?.deck?.profile_pic ? (
            <img
              src={deckData?.deck.profile_pic}
              alt="profile-pic"
              className="rounded-full h-8 w-8 my-1"
            />
          ) : (
            <img
              src="https://storage.googleapis.com/swiplusimages/profile_pics/default.jpeg"
              alt="profile-pic"
              className="rounded-full h-8 w-8 my-1"
            />
          )}
          <div className="mx-2">
            <Link href={`/${deckData?.deck?.username}`}>
              <a>
                <p className="text-gray-50 text-md m-1">
                  {deckData?.deck?.display_name}
                </p>
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div
        className="text-gray-300 self-center font-light font-inter text-sm p-3.5 "
        onClick={() => setOpen(true)}
      >
        {deckData.deck?.deck_description.substr(0, 100)}... Read more
      </div>

      {state.loggedIn ? (
        <form onSubmit={handleSubmit(() => submitComment())}>
          <div className=" text-red-500  p-2 rounded-md text-sm text-left w-full">
            {errors.comment?.type === "required" && "Comment text is required"}
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
      ) : (
        "not logged in"
      )}
      {commentQuery.isLoading ? (
        <></>
      ) : (
        commentQuery.data.pages.map((page) => (
          <React.Fragment key={page.nextId}>
            {page.data.data.map((comment) => (
              <CommentDisplay comment={comment} />
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
              commentQuery.data?.pages[commentQuery.data.pages.length - 1].data
                .nextPage
            ) {
              pageNumber.current += 1;
              console.log(pageNumber.current);
              commentQuery.fetchNextPage({ pageParam: pageNumber.current });
            }
          }
        }}
      />
    </Navbar>
  );
}

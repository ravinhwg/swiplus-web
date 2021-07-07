/* eslint-disable react/jsx-props-no-spreading */
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { useQueryClient, useMutation } from "react-query";
import { editDecks, unpublishDecks } from "../../apiPlugs/deck";
import { AppUiContext } from "../../Context";

export default function EditDeckData({ deck }) {
  const [state] = useContext(AppUiContext);
  const [deckTitle, setDeckTitle] = useState("");
  const [done, setDone] = useState(false);
  const [serverError, setServerError] = useState(false);
  const queryClient = useQueryClient();
  const [published, setPublished] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [deckDescription, setDeckDescription] = useState();
  const deckEditMutation = useMutation("editDeck", editDecks, {
    onSuccess: async () => {
      setDone(true);
    },
    onError: async () => {
      setDone(false);
      setServerError(true);
    },
  });
  const deckUnpublishMutation = useMutation(["unpublishDeck"], unpublishDecks, {
    onSuccess: async ({ data }) => {
      if (data.message === "Unpublished") {
        setPublished(0);
      } else if (data.message === "Republished") {
        setPublished(1);
      }
      queryClient.invalidateQueries("grabDecksAsAdmin");
    },
  });
  useEffect(() => {
    setDeckTitle(deck.deck_title);
    setDeckDescription(deck.deck_description);
    setPublished(+deck.deck_status);
  }, [deck]);
  const unpublishDeck = (status) => {
    deckUnpublishMutation.mutate({
      id: deck.id,
      status,
      token: state.user.accessToken,
    });
  };
  const editDeckInitiate = () => {
    deckEditMutation.mutate({
      deckDescription,
      deckId: deck.id,
      token: state.user.accessToken,
      deckTitle,
      deckTags: "",
    });
  };
  return (
    <div className="p-1 flex flex-col sm:flex-row justify-center items-center">
      <div className="flex justify-center">
        {deck ? (
          <Link href={`/d/${deck.id}`}>
            <Image
              src={deck.card_order[0]}
              alt={deck.deck_title}
              height="250"
              width="200"
              className=" h-40 w-36 sm:aspect-w-4 mr-3"
            />
          </Link>
        ) : (
          <></>
        )}
      </div>
      <form onSubmit={handleSubmit(() => editDeckInitiate())}>
        <div
          className={`${
            !done ? "text-red-500" : "text-green-500"
          }  p-2 rounded-md text-sm w-full justify-center text-center `}
        >
          {errors.deckTitle?.type === "required" && "Deck title is required."}
          {errors.deckDescription?.type === "required" &&
            "Deck title is required."}
          {errors.deckTitle?.type === "maxLength" && "Deck title is too long."}
          {errors.deckDescription?.type === "maxLength" &&
            "Deck description is too long."}
          {done && !serverError ? "Done!" : ""}
        </div>
        <div className="flex m-2 flex-col w-11/12 justify-center">
          <input
            className="bg-gray-600 border-2 m-1  w-full border-transparent rounded-xl h-10 py-2 px-4 text-gray-100 font-inter leading-tight focus:outline-none  focus:border-blue-600"
            id="inline-deck-title"
            {...register("deckTitle", {
              required: true,
              maxLength: 140,
            })}
            type="text"
            value={deckTitle}
            onChange={(e) => setDeckTitle(e.target.value)}
            placeholder="Name"
          />
          <textarea
            rows="3"
            value={deckDescription}
            {...register("deckDescription", { maxLength: 1000, min: 0 })}
            onChange={(e) => setDeckDescription(e.target.value)}
            placeholder="A good description will make your deck more visible to search :)"
            className="bg-gray-600 border-2 m-1 w-full border-transparent rounded-xl py-2 px-4 text-gray-100 font-inter leading-tight focus:outline-none  focus:border-blue-600"
          />
          <div className="flex justify-around">
            <button
              type="submit"
              className="bg-indigo-700 focus:outline-none m-3  p-1.5 px-8 rounded-lg text-white text-sm font-inter font-bold hover:bg-indigo-500"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() =>
                +published === 1 ? unpublishDeck(0) : unpublishDeck(1)
              }
              className={`${
                +published === 1 ? "bg-red-700" : "bg-green-700"
              } focus:outline-none m-3  p-1.5 px-8 rounded-lg text-white text-sm font-inter font-bold `}
            >
              {+published === 1 ? "Unpublish" : "Publish"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

EditDeckData.propTypes = {
  deck: PropTypes.shape({
    deck_description: PropTypes.string,
    deck_title: PropTypes.string,
    deck_status: PropTypes.string,
    id: PropTypes.string,
    card_order: [PropTypes.string],
  }),
};

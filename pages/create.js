/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useContext, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { useForm } from "react-hook-form";
import Navbar from "../components/molecules/NavBar";
import { AppUiContext } from "../Context";
import {
  CloseIcon,
  PlusIcon,
  ArrowCircleLeft,
  BackButton,
  ArrowCircleRight,
  SpinnerBasic,
} from "../components/atoms/Icons";
import { uploadDeck } from "../apiPlugs/deck";

export default function Home() {
  const [state] = useContext(AppUiContext);
  const [title, setTitle] = useState("");
  const router = useRouter();
  const [description, setDescription] = useState("");
  const [serverError, setServerError] = useState(false);
  const mutation = useMutation(uploadDeck, {
    onError: async () => setServerError(true),
    onSuccess: async () => {
      router.replace("/");
    },
  });
  const [pics, setPics] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const addImages = (event) => {
    let imageFiles;
    if (event.target.files) {
      imageFiles = [...event.target.files].map((item) => {
        const itemURL = URL.createObjectURL(item);
        return { pic: itemURL, source: item };
      });
    }
    setPics((picsState) => picsState.concat(imageFiles));
  };
  const removePic = (index) => {
    const picsArray = [...pics];
    picsArray.splice(index, 1);
    setPics(picsArray);
  };
  const movePics = (index, toIndex) => {
    const picsArray = [...pics];
    const element = picsArray[index];
    picsArray.splice(index, 1);
    picsArray.splice(toIndex, 0, element);
    setPics(picsArray);
  };
  const uploadDecks = () => {
    const formdata = new FormData();
    formdata.append("deckTitle", title);
    formdata.append("deckDescription", description);
    formdata.append("deckTags", "");
    for (let i = 0; i < pics.length; i += 1) {
      formdata.append("image", pics[i].source);
    }
    mutation.mutate({
      formdata,
      token: state.user.accessToken,
      exp: state.user.expiresIn,
    });
  };
  return (
    <>
      <Head>
        <title>Create deck</title>
      </Head>
      <Navbar>
        <div className="flex justify-center ">
          <div className="flex md:w-5/12 flex-col">
            <div className="flex justify-center">
              <div className="flex flex-col w-full">
                <div className="flex items-center m-2">
                  <button
                    onClick={() => router.replace(`/${state.user.userId}`)}
                    type="button"
                  >
                    <BackButton className="text-gray-100 text-md font-inter font-bold h-10 w-10" />
                  </button>
                  <h3 className="text-gray-100 text-xl  font-inter font-bold w-full">
                    Create deck
                  </h3>
                </div>
                <form
                  onSubmit={handleSubmit(() => uploadDecks())}
                  className="w-11/12 self-center"
                >
                  <div className=" text-red-500  p-2 rounded-md text-sm text-left w-full">
                    {errors.deckTitle?.type === "required" &&
                      "Title is required"}
                  </div>
                  <div className=" text-red-500  p-2 rounded-md text-sm text-left w-full">
                    {serverError
                      ? "Server error. Don't fret. Give it another shot"
                      : ""}
                  </div>
                  <div className=" text-red-500  p-2 rounded-md text-sm text-left w-full">
                    {errors.files?.type === "required" &&
                      "One or more cards are required"}
                  </div>
                  <input
                    className="bg-gray-600 mb-4  border-2 border-transparent rounded-xl w-full h-14 py-2 px-4 text-gray-100 font-inter leading-tight focus:outline-none  focus:border-blue-600"
                    id="inline-deck-title"
                    {...register("deckTitle", { required: true })}
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Your catchy title"
                  />
                  {/* <input
                className="bg-gray-600 mb-4  border-2 border-transparent rounded-xl w-full h-14 py-2 px-4 text-gray-100 font-inter leading-tight focus:outline-none  focus:border-blue-600"
                id="inline-deck-tags"
                type="text"
                {...register("deckTags", { required: true })}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Tags (Seperate with spaces)"
              /> */}
                  <textarea
                    rows="5"
                    {...register("deckDescription")}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="A good description will make your deck more visible to search :)"
                    className="bg-gray-600 mb-4  border-2 border-transparent rounded-xl w-full py-2 px-4 text-gray-100 font-inter leading-tight focus:outline-none  focus:border-blue-600"
                  />
                  <div className="w-full flex self-end mb-4">
                    {mutation.isLoading ? (
                      <SpinnerBasic className="animate-spin -ml-1 mr-3 h-16 w-16 text-indigo-600" />
                    ) : (
                      <input
                        type="submit"
                        value="Submit"
                        className="bg-indigo-700 text-white text-sm font-inter font-bold  hover:bg-indigo-500 flex justify-center items-center border-2 mb-5 border-transparent rounded-full w-3/12 h-12 py-2 px-4 leading-tight focus:outline-none  focus:border-blue-600"
                      />
                    )}
                  </div>
                  <div className="grid grid-cols-2 overflow-x-auto sm:grid-cols-3 md:grid-cols-3 md:mx-3 lg:grid-cols-3 xl:grid-cols-3 gap-1">
                    {pics.map((item, index) => (
                      <div
                        className={` aspect-w-4 aspect-h-5 bg-black ${
                          index === 0 ? "border-red-500 border-2" : ""
                        }`}
                        id={index}
                      >
                        <img
                          alt={item.pic}
                          src={item.pic}
                          key={item.pic}
                          className=" object-scale-down"
                        />
                        <div className="bg-gray-900 h-11 bg-opacity-50">
                          <div
                            className="absolute h-8 w-8 text-gray-50 top-0 left-0 m-2"
                            onClick={() => removePic(index)}
                            onKeyUp={() => removePic(index)}
                          >
                            <CloseIcon />
                          </div>
                          <div
                            className="absolute h-8 w-8 text-gray-50 top-0 left-20 m-2"
                            onClick={() => movePics(index, index + 1)}
                          >
                            <ArrowCircleRight />
                          </div>
                          <div
                            className="absolute h-8 w-8 text-gray-50 top-0 left-10 m-2"
                            onClick={() => movePics(index, index - 1)}
                          >
                            <ArrowCircleLeft />
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="aspect-w-4 aspect-h-5 bg-gray-800 rounded">
                      <div className="flex h-full">
                        <div className="m-auto  items-center flex flex-col">
                          <label htmlFor="file-upload">
                            <PlusIcon className="text-gray-100 h-20 w-20" />
                          </label>
                          <input
                            {...register("files", { required: true })}
                            type="file"
                            id="file-upload"
                            onChange={addImages}
                            className="hidden"
                            multiple
                            accept="image/png, image/jpeg"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Navbar>
    </>
  );
}

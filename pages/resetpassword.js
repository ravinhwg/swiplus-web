/* eslint-disable react/jsx-props-no-spreading */
import { useContext, useState, useEffect } from "react";
import Head from "next/head";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { AppUiContext } from "../Context";
import { passwordResetInitiate } from "../apiPlugs/Auth";
import Icon from "../components/atoms/SwiplusLogo";

export default function Home() {
  const [state, dispatch] = useContext(AppUiContext);
  const [email, setEmail] = useState("");
  const router = useRouter();
  const [showServerLoginError, setShowServerLoginError] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  useEffect(() => {
    if (state.loggedIn) {
      return router.replace("/");
    }
    return undefined;
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const mutation = useMutation(passwordResetInitiate, {
    onError: async (data) => {
      setShowServerLoginError(true);
    },
    onSuccess: async ({ data }) => {
      setConfirmation(true);
    },
  });
  return (
    <>
      <Head>
        <title>Reset password | Swiplus</title>
      </Head>
      {!confirmation ? (
        <div className="flex justify-center">
          <div className="flex flex-col p-5 w-md max-w-md">
            <div className="mb-5">
              <Icon />
            </div>
            <p className="font-inter text-4xl mr-5 text-gray-100 font-bold">
              Forgot your password? Don't worry, That happens :)
            </p>
            <p className="font-inter text-xl mr-5 mt-8 text-gray-100 font-thin ">
              Enter the email you used to create your Swiplus account.
            </p>
            <form
              className="max-w-xl"
              onSubmit={handleSubmit(() => {
                mutation.mutate({
                  email,
                });
              })}
            >
              <div className="flex items-center mt-10 flex-col w-md">
                <div className=" text-red-500 rounded-md text-sm text-left w-full mb-3">
                  {showServerLoginError ? (
                    ` We couldn't find an account using this email address. If you used Google login please use it to log back in.`
                  ) : (
                    <> </>
                  )}
                  {errors.email?.type === "required" &&
                    " Please enter the email to continue"}
                </div>

                <input
                  className="bg-gray-600  border-2 border-transparent rounded-xl w-full h-14 py-2 px-4 text-gray-100 font-inter leading-tight focus:outline-none  focus:border-blue-600"
                  id="inline-full-name"
                  type="email"
                  {...register("email", { required: true })}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
                <button
                  type="submit"
                  className="bg-indigo-700 text-white text-sm font-inter m-3 font-bold  hover:bg-indigo-500 flex justify-center items-center border-2 mb-5 border-transparent rounded-full w-11/12 h-12 py-2 px-4 leading-tight focus:outline-none  focus:border-blue-600"
                >
                  Send password reset link
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="flex  flex-col justify-center h-96 items-center max-w-lg">
            <div className="text-3xl font-inter text-white">Done! 👍🏽</div>
            <div className="text-xl font-inter font-thin text-white text-center">
              Please check your email. We just sent you a password reset link.
              Make sure to check the Spam folder.
            </div>
            <Link href="/">
              <button
                type="button"
                className="bg-indigo-700 mt-5 text-white text-sm font-inter m-3 font-bold  hover:bg-indigo-500 flex justify-center items-center border-2 mb-5 border-transparent rounded-full w-10/12 h-12 py-2 px-4 leading-tight focus:outline-none  focus:border-blue-600"
              >
                Go to Homepage
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

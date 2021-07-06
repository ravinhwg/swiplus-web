/* eslint-disable react/jsx-props-no-spreading */
import { useContext, useState, useEffect } from "react";
import Head from "next/head";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { AppUiContext } from "../../../Context";
import { passwordResetFinish } from "../../../apiPlugs/Auth";
import Icon from "../../../components/atoms/SwiplusLogo";

export default function Home() {
  const [state] = useContext(AppUiContext);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
  const mutation = useMutation(passwordResetFinish, {
    onError: async () => {
      setShowServerLoginError(true);
    },
    onSuccess: async () => {
      setConfirmation(true);
    },
  });
  return (
    <>
      <Head>
        <title>Reset password | Swiplus</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!confirmation ? (
        <div className="flex justify-center">
          <div className="flex flex-col p-5 w-md max-w-md">
            <div className="mb-5">
              <Link href="/">
                <button type="button">
                  <Icon />
                </button>
              </Link>
            </div>
            <p className="font-inter text-4xl mr-5 text-gray-100 font-bold">
              Create a strong password
            </p>
            <form
              className="max-w-xl"
              onSubmit={handleSubmit(() => {
                mutation.mutate({
                  password,
                  token: router.query.index,
                });
              })}
            >
              <div className="flex items-center mt-10 flex-col w-md">
                <div className=" text-red-500  p-2 rounded-md text-sm text-left w-full">
                  {showServerLoginError && "Link is invalid. "}
                  {errors.password?.type === "required" &&
                    "Password is required. "}
                  {errors.password?.type === "minLength" &&
                    "Password has to be more than 10 characters. "}
                  {errors.password?.type === "maxLength" &&
                    "Password has to be less than 70 characters. "}
                  {errors.confirmpassword?.type === "validate" &&
                    "Passwords does not match"}
                </div>
                <input
                  className="bg-gray-600 m-3  border-2 border-transparent rounded-xl w-full h-14 py-2 px-4 text-gray-100 font-inter leading-tight focus:outline-none  focus:border-blue-600"
                  id="inline-password"
                  type="password"
                  {...register("password", {
                    required: true,
                    minLength: 10,
                    maxLength: 70,
                  })}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="New Password"
                />
                <input
                  className="bg-gray-600 m-3  border-2 border-transparent rounded-xl w-full h-14 py-2 px-4 text-gray-100 font-inter leading-tight focus:outline-none  focus:border-blue-600"
                  id="inline-password-confirm"
                  type="password"
                  {...register("confirmpassword", {
                    validate: (value) =>
                      value === password || "Passwords does not match",
                  })}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm New Password"
                />
                <button
                  type="submit"
                  className="bg-indigo-700 text-white text-sm font-inter m-3 font-bold  hover:bg-indigo-500 flex justify-center items-center border-2 mb-5 border-transparent rounded-full w-11/12 h-12 py-2 px-4 leading-tight focus:outline-none  focus:border-blue-600"
                >
                  Reset Password
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
              Password changed. Please log in now.
            </div>
            <Link href="/">
              <button
                type="button"
                className="bg-indigo-700 mt-5 text-white text-sm font-inter m-3 font-bold  hover:bg-indigo-500 flex justify-center items-center border-2 mb-5 border-transparent rounded-full w-10/12 h-12 py-2 px-4 leading-tight focus:outline-none  focus:border-blue-600"
              >
                Log in
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

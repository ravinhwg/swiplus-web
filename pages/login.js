/* eslint-disable react/jsx-props-no-spreading */
import { useContext, useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { AppUiContext } from "../Context";
import { login } from "../apiPlugs/Auth";
import Icon from "../components/atoms/SwiplusLogo";
import { GoogleLogo } from "../components/atoms/Icons";

export default function Home() {
  const [state, dispatch] = useContext(AppUiContext);
  const [email, setEmail] = useState("");
  const router = useRouter();
  const [showServerLoginError, setShowServerLoginError] = useState(false);
  const [password, setPassword] = useState("");
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
  const mutation = useMutation(login, {
    onError: async () => {
      setShowServerLoginError(true);
    },
    onSuccess: async ({ data }) => {
      dispatch({
        type: "login-user",
        payload: {
          token: data.accessToken,
          expiresIn: data.expiresIn,
          userId: data.userId,
        },
      });
      router.replace("/");
    },
  });
  return (
    <>
      <Head>
        <title>Login | Swiplus</title>
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
      <div className="flex justify-center">
        <div className="flex flex-col p-5 w-md max-w-md">
          <div className="mb-5">
            <Icon />
          </div>
          <p className="font-inter text-4xl mr-5 text-gray-100 font-bold">
            Log in to Swiplus
          </p>
          <form
            className="max-w-xl"
            onSubmit={handleSubmit(() => {
              mutation.mutate({
                email,
                password,
              });
            })}
          >
            <div className="flex items-center mt-10 flex-col w-md">
              {showServerLoginError ? (
                <div className=" text-red-500 rounded-md text-sm text-left w-full mb-3">
                  Whoops! Looks like your login details are incorrect. Give it
                  another shot or try resetting the password.
                </div>
              ) : (
                <> </>
              )}

              <input
                className="bg-gray-600  border-2 border-transparent rounded-xl w-full h-14 py-2 px-4 text-gray-100 font-inter leading-tight focus:outline-none  focus:border-blue-600"
                id="inline-full-name"
                type="text"
                {...register("email", { required: true })}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email or username"
              />
              <div className=" text-red-500  p-2 rounded-md text-sm text-left w-full">
                {errors.email?.type === "required" &&
                  "Email or username is required"}
              </div>
              <input
                className="bg-gray-600 border-2 border-transparent rounded-xl w-full h-14 py-2 px-4 text-gray-100 font-inter leading-tight focus:outline-none  focus:border-blue-600"
                id="inline-password"
                value={password}
                {...register("password", { required: true })}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
              />
              <div className=" text-red-500  p-2 rounded-md text-sm m-2 text-left w-full">
                {errors.password?.type === "required" && "Password is required"}
              </div>
              <button
                type="submit"
                className="bg-indigo-700 text-white text-sm font-inter font-bold  hover:bg-indigo-500 flex justify-center items-center border-2 mb-5 border-transparent rounded-full w-11/12 h-12 py-2 px-4 leading-tight focus:outline-none  focus:border-blue-600"
              >
                Log in
              </button>
              <Link href="https://accounts.google.com/o/oauth2/v2/auth?client_id=310683804890-fp1donhti2695qfni1qjcr6e5eihelvc.apps.googleusercontent.com&redirect_uri=https://www.swiplus.com/googlecallback&response_type=id_token&scope=email%20profile&nonce=2234">
                <button
                  type="button"
                  className="bg-indigo-700 text-white text-sm font-inter font-bold  hover:bg-indigo-500 flex justify-center items-center border-2 mb-5 border-transparent rounded-full w-11/12 h-12 py-2 px-4 leading-tight focus:outline-none  focus:border-blue-600"
                >
                  <GoogleLogo className="h-6 w-6 mr-2 text-gray-100 fill-current" />
                  Continue with Google
                </button>
              </Link>
              <div className="flex flex-row">
                <Link href="/register">
                  <button type="button">
                    <p className=" mr-2 text-indigo-400">Create new account</p>
                  </button>
                </Link>
                <Link href="/resetpassword">
                  <p className=" ml-2 text-indigo-400">Forgot password?</p>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

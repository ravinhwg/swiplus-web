/* eslint-disable react/jsx-props-no-spreading */
import { useContext, useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { AppUiContext } from "../Context";
import { registerUser } from "../apiPlugs/Auth";
import Icon from "../components/atoms/SwiplusLogo";
import { GoogleLogo, SpinnerBasic } from "../components/atoms/Icons";

export default function Home() {
  const [state] = useContext(AppUiContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [confirmPassword, setConfirmpassword] = useState("");
  const registerUserMutation = useMutation(registerUser, {
    onSuccess: async () => {
      setRegisterSuccess(true);
    },
    onError: async () => {
      setServerError(true);
    },
  });
  const router = useRouter();
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
  const createAccountInitiate = () => {
    window.grecaptcha.ready(() => {
      window.grecaptcha
        .execute("6Ldur2YbAAAAADDMSyYetW1GnPI78LDEApXtbewM", {
          action: "submit",
        })
        .then((token) => {
          // Add your logic to submit to your backend server here.
          registerUserMutation.mutate({
            email,
            password,
            recaptcha: token,
            displayName: name,
          });
        })
        .catch((e) => {
          throw new Error(`Recaptcha error: ${e}`);
        });
    });
  };
  return (
    <>
      <Head>
        <title>Join Swiplus</title>
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
        <div className="flex flex-col p-5 w-screen max-w-xl">
          <div className="mb-5">
            <Icon />
          </div>
          {registerSuccess ? (
            <>
              <div className="flex  flex-col justify-center h-96 items-center">
                <div className="text-3xl font-inter text-white">Done! 👍🏽</div>
                <div className="text-xl font-inter font-thin text-white text-center">
                  Please check your email. We just sent you a confirmation link.
                  Meanawhile you can,
                </div>
                <button
                  type="button"
                  onClick={() => router.replace("/login")}
                  className="bg-indigo-700 text-white m-2 text-sm font-inter font-bold  hover:bg-indigo-500 flex justify-center items-center border-2 mb-5 border-transparent rounded-full w-6/12 mt-6 h-12 py-2 px-4 leading-tight focus:outline-none  focus:border-blue-600"
                >
                  Sign in
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="font-inter text-4xl mr-5 text-gray-100 font-bold">
                Join Swiplus
              </p>
              <form
                className="max-w-xl"
                onSubmit={handleSubmit(() => createAccountInitiate())}
              >
                <div className="flex items-center mt-10 flex-col w-xl">
                  <div className=" text-red-500  p-2 rounded-md text-sm text-left w-full">
                    {serverError &&
                      "Whoops! looks like the email you entered is already in use. Please use a different email address to continue."}
                  </div>
                  <input
                    className="bg-gray-600  border-2 border-transparent rounded-xl w-full h-14 py-2 px-4 text-gray-100 font-inter leading-tight m-2 focus:outline-none  focus:border-blue-600"
                    id="inline-full-name"
                    type="text"
                    {...register("name", {
                      required: true,
                      minLength: 3,
                      maxLength: 60,
                    })}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                  />
                  <div className=" text-red-500  p-2 rounded-md text-sm text-left w-full">
                    {errors.name?.type === "required" && "Name is required"}
                  </div>
                  <input
                    className="bg-gray-600 border-2 border-transparent rounded-xl w-full h-14 py-2 px-4  m-2 text-gray-100 font-inter leading-tight focus:outline-none  focus:border-blue-600"
                    id="inline-email"
                    type="email"
                    value={email}
                    {...register("email", { required: true })}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                  />
                  <div className=" text-red-500  p-2 rounded-md text-sm text-left w-full">
                    {errors.email?.type === "required" && "Email is required"}
                  </div>
                  <input
                    className="bg-gray-600 border-2 border-transparent rounded-xl w-full h-14 py-2 px-4  m-2 text-gray-100 font-inter leading-tight focus:outline-none  focus:border-blue-600"
                    id="inline-password"
                    value={password}
                    {...register("password", {
                      required: true,
                      minLength: 10,
                      maxLength: 70,
                    })}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                  />
                  <div className=" text-red-500  p-2 rounded-md text-sm text-left w-full">
                    {errors.password?.type === "required" &&
                      "Password is required"}
                    {errors.password?.type === "minLength" &&
                      "Password has to be more than 10 characters"}
                    {errors.password?.type === "maxLength" &&
                      "Password has to be less than 70 characters"}
                  </div>
                  <input
                    className="bg-gray-600 border-2 border-transparent rounded-xl w-full h-14 py-2 px-4  text-gray-100 font-inter leading-tight focus:outline-none  focus:border-blue-600"
                    id="inline-password-confirm"
                    value={confirmPassword}
                    {...register("confirmpassword", {
                      validate: (value) =>
                        value === password || "Passwords does not match",
                    })}
                    onChange={(e) => setConfirmpassword(e.target.value)}
                    type="password"
                    placeholder="Confirm password"
                  />
                  <div className=" text-red-500  p-2 rounded-md text-sm text-left w-full">
                    {errors.confirmpassword?.type === "validate" &&
                      "Passwords does not match"}
                  </div>
                  <div className="text-gray-500">
                    This site is protected by reCAPTCHA and the Google{" "}
                    <a
                      href="https://policies.google.com/privacy"
                      className="text-indigo-500"
                    >
                      Privacy Policy
                    </a>{" "}
                    and{" "}
                    <a
                      href="https://policies.google.com/terms"
                      className="text-indigo-500"
                    >
                      Terms of Service
                    </a>{" "}
                    apply.
                  </div>
                  <button
                    type="submit"
                    disabled={registerUserMutation.isLoading}
                    className="bg-indigo-700 text-white m-2 text-sm font-inter font-bold  hover:bg-indigo-500 flex justify-center items-center border-2 mb-5 border-transparent rounded-full w-11/12 h-12 py-2 px-4 leading-tight focus:outline-none  focus:border-blue-600"
                  >
                    {registerUserMutation.isLoading ? (
                      <SpinnerBasic className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-200" />
                    ) : (
                      "Register"
                    )}
                  </button>
                  <Link href="https://accounts.google.com/o/oauth2/v2/auth?client_id=310683804890-fp1donhti2695qfni1qjcr6e5eihelvc.apps.googleusercontent.com&redirect_uri=http://localhost:3000/googlecallback&response_type=id_token&scope=email%20profile&nonce=2234">
                    <button
                      type="button"
                      className="bg-indigo-700 text-white text-sm font-inter font-bold  hover:bg-indigo-500 flex justify-center items-center border-2 mb-5 border-transparent rounded-full w-11/12 h-12 py-2 px-4 leading-tight focus:outline-none  focus:border-blue-600"
                    >
                      <GoogleLogo className="h-6 w-6 mr-2 text-gray-100 fill-current" />
                      Continue with Google
                    </button>
                  </Link>
                  <div className="flex flex-row">
                    <Link href="/login">
                      <button className=" ml-2 text-indigo-400" type="button">
                        Log in instead
                      </button>
                    </Link>
                  </div>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}

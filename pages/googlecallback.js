import { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { googleLogin } from "../apiPlugs/Auth";
import { AppUiContext } from "../Context";
import { SpinnerBasic } from "../components/atoms/Icons";

export default function GoogleCallback(props) {
  const router = useRouter();
  const [state, dispatch] = useContext(AppUiContext);
  const mutation = useMutation(googleLogin);
  let idToken;
  if (typeof window !== "undefined") {
    // eslint-disable-next-line prefer-destructuring
    idToken = window.location.hash.split("&authuser")[0].split("=")[1];
  }
  useEffect(() => {
    mutation.mutate(
      { token: idToken },
      {
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
        onError: async () => {
          router.replace("/");
        },
      }
    );
  }, []);
  return (
    <>
      <div className="flex h-screen">
        <div className="m-auto  items-center flex flex-col">
          <SpinnerBasic className="animate-spin -ml-1 mr-3 h-16 w-16 text-indigo-600" />
          <p className="text-gray-100 text-xl m-3">Wait a sec.</p>
        </div>
      </div>
    </>
  );
}

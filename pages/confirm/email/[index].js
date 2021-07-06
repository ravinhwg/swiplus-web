/* eslint-disable react/jsx-props-no-spreading */
import { useState, useEffect } from "react";
import Head from "next/head";
import { useMutation } from "react-query";
import Proptypes from "prop-types";
import Link from "next/link";
import { confirmAccount } from "../../../apiPlugs/Auth";
import Icon from "../../../components/atoms/SwiplusLogo";
import { SpinnerBasic } from "../../../components/atoms/Icons";

export default function ConfirmAccount({ index }) {
  const [confirmation, setConfirmation] = useState(false);
  const mutation = useMutation(confirmAccount, {
    onSuccess: async () => {
      setConfirmation(true);
    },
  });
  useEffect(() => {
    mutation.mutate({
      token: index,
    });
    return undefined;
  }, []);
  return (
    <>
      <Head>
        <title>Confirm Account| Swiplus</title>
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
            <div className="max-w-xl">
              <div className="flex items-center mt-10 flex-col w-md">
                {mutation.isError ? (
                  <div className="text-red-500 text-3xl">Token invalid.</div>
                ) : (
                  <>
                    <SpinnerBasic className="animate-spin -ml-1 mr-3 h-16 w-16 text-indigo-600" />
                    <div className="text-white text-3xl">
                      Checking your account!
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="flex  flex-col justify-center h-96 items-center max-w-lg">
            <div className="text-3xl font-inter text-white">Done! 👍🏽</div>
            <div className="text-xl font-inter font-thin text-white text-center">
              Account confirmed. Now you can create decks!
            </div>
            <Link href="/">
              <button
                type="button"
                className="bg-indigo-700 mt-5 text-white text-sm font-inter m-3 font-bold  hover:bg-indigo-500 flex justify-center items-center border-2 mb-5 border-transparent rounded-full w-10/12 h-12 py-2 px-4 leading-tight focus:outline-none  focus:border-blue-600"
              >
                Go to home
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
export async function getServerSideProps(context) {
  const { index } = context.params;
  return {
    props: {
      index,
    },
  };
}

ConfirmAccount.propTypes = {
  index: Proptypes.string,
};

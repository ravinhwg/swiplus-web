import { useContext } from "react";
import Link from "next/link";
import { AppUiContext } from "../../Context";
import Button from "../atoms/Button";
import { Default, Mobile } from "../utils/Breakpoints";
import { CloseIcon } from "../atoms/Icons";

const InnerBanner = ({ dispatch }) => {
  const hideBanner = () => {
    dispatch({ type: "ask-to-join-banner-visible", payload: false });
  };
  return (
    <div className="flex justify-center m-3 flex-col">
      <p className="text-gray-200 font-inter flex self-center font-regular text-sm text-center">
        Swiplus is a visual blogging platform. Join Swiplus today to create your
        own decks and follow other creators!
      </p>
      <div className="flex self-center mt-1 justify-center w-full">
        <Link href="/login">
          <a>
            <Button text="Join" />
          </a>
        </Link>

        <div className="flex flex-row">
          <CloseIcon className="h-4 w-4 flex ml-3 text-gray-200 self-center" />
          <button
            onClick={hideBanner}
            type="button"
            className="text-gray-300 font-inter flex self-center font-regular text-sm text-right underline ml-1"
          >
            close
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Banner() {
  const [state, dispatch] = useContext(AppUiContext);
  return (
    <>
      <Mobile>
        <div className="static rounded-md ">
          <InnerBanner dispatch={dispatch} state={state} />
        </div>
      </Mobile>
      <Default>
        <div className="fixed bottom-0 right-0 z-30 max-w-md bg-gray-700 rounded-md m-3">
          <InnerBanner dispatch={dispatch} state={state} />
        </div>
      </Default>
    </>
  );
}

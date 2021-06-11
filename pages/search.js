import { useContext } from "react";
import { useRouter } from "next/router";
import Navbar from "../components/molecules/NavBar";
import SearchBar from "../components/atoms/SearchBar";
import { AppUiContext } from "../Context";
import { Mobile } from "../components/utils/Breakpoints";

export default function Search() {
  const router = useRouter();
  const [state, dispatch] = useContext(AppUiContext);
  const goBackfromSearch = () => {
    router.back();
  };
  const toggleMobileSearchTab = (target) => {
    dispatch({ type: "focused-mobile-search-tab", payload: target });
  };
  return (
    <Navbar>
      <Mobile>
        <div className="flex flex-row m-3 justify-start">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className=" h-8 text-gray-200 self-center w-auto"
            fill="none"
            onClick={goBackfromSearch}
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <div className="w-11/12">
            <SearchBar />
          </div>
        </div>
        <div className="">
          {/* Mobile UI tabs */}
          <div className="flex justify-center flex-row">
            {/* Tab button group */}
            <div
              onClick={() => toggleMobileSearchTab("users")}
              className={`${
                state.selectedMobileTab === "users"
                  ? `bg-purple-900 text-purple-400`
                  : `bg-gray-600 text-gray-400`
              } px-4 rounded-lg m-3`}
            >
              Users
            </div>
            <div
              onClick={() => toggleMobileSearchTab("decks")}
              className={`${
                state.selectedMobileTab === "decks"
                  ? `bg-purple-900 text-purple-400`
                  : `bg-gray-600 text-gray-400`
              } px-4 rounded-lg m-3`}
            >
              Decks
            </div>
          </div>
          <div>
            <div />
            <div />
          </div>
        </div>
      </Mobile>
    </Navbar>
  );
}

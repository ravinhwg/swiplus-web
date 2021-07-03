import { useRouter } from "next/router";
import * as ga from "../../lib/ga";

export default function SrarchBar({ q }) {
  const router = useRouter();

  return (
    <div className=" flex self-center focus:outline-none">
      <input
        type="text"
        onFocus={() =>
          router.replace(
            {
              pathname: "/search",
              query: {},
            },
            undefined,
            { shallow: true }
          )
        }
        onChange={(e) => {
          if (!e.target.value) {
            return router.replace(
              {
                pathname: "/search",
                query: {},
              },
              undefined,
              { shallow: true }
            );
          }
          router.replace(
            {
              pathname: "/search",
              query: {
                q: e.target.value, // update the query param
              },
            },
            undefined,
            { shallow: true }
          );
          // Log the event in Google analytics
          ga.event({
            action: "Search",
            params: {
              search_term: e.target.value,
            },
          });
        }}
        value={q}
        placeholder="Search Swiplus"
        className=" w-96 px-4 py-3 h-9 placeholder-blueGray-300 text-white relative bg-gray-700 rounded text-sm border-0 shadow outline-none focus:outline-none focus:bg-gray-600 focus:ring "
      />
    </div>
  );
}

/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";
import NextNprogress from "nextjs-progressbar";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { useRouter } from "next/router";
import InitialStateTree from "../initialStateTrees/AppUiTree";
import appUiReducer from "../reducers/appUiReducer";
import useReducerWithLocalStorage from "../hooks/useReducerWithLocalStorage";
import { AppUiContext } from "../Context";
import * as ga from "../lib/ga";

const queryClient = new QueryClient();
function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [state, dispatch] = useReducerWithLocalStorage({
    initializerArg: InitialStateTree,
    key: "SWIPLUS_APP_STATE",
    reducer: appUiReducer,
  });
  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url);
    };
    // When the component is mounted, subscribe to router changes
    // and log those page views
    router.events.on("routeChangeComplete", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  return (
    <QueryClientProvider client={queryClient}>
      <AppUiContext.Provider value={[state, dispatch]}>
        <NextNprogress
          color="#fff"
          startPosition={0.3}
          stopDelayMs={200}
          height={3}
          options={{ showSpinner: false }}
          showOnShallow
        />
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </AppUiContext.Provider>
    </QueryClientProvider>
  );
}

export default MyApp;
MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object,
};

import { useReducer } from "react";
import appUiReducer from "../reducers/appUiReducer";
import { AppUiContext } from "../Context";
import "tailwindcss/tailwind.css";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import InitialStateTree from "../initialStateTrees/AppUiTree";

const queryClient = new QueryClient();
function MyApp({ Component, pageProps }) {
  const [state, dispatch] = useReducer(appUiReducer, InitialStateTree);
  return (
    <QueryClientProvider client={queryClient}>
      <AppUiContext.Provider value={[state, dispatch]}>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </AppUiContext.Provider>
    </QueryClientProvider>
  );
}

export default MyApp;

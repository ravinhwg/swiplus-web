import "tailwindcss/tailwind.css";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import InitialStateTree from "../initialStateTrees/AppUiTree";
import appUiReducer from "../reducers/appUiReducer";
import useReducerWithLocalStorage from "../hooks/useReducerWithLocalStorage";
import { AppUiContext } from "../Context";

const queryClient = new QueryClient();
function MyApp({ Component, pageProps }) {
  const [state, dispatch] = useReducerWithLocalStorage({
    initializerArg: InitialStateTree,
    key: "SWIPLUS_APP_STATE",
    reducer: appUiReducer,
  });
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

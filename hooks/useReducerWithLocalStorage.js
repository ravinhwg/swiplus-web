import { useReducer } from "react";
import useLocalStorage from "./useLocalStorage";

function useReducerWithLocalStorage({ initializerArg, key, reducer }) {
  const [localStorageState, setLocalStorageState] = useLocalStorage(
    key,
    initializerArg
  );

  return useReducer(
    (state, action) => {
      const newState = reducer(state, action);
      setLocalStorageState(newState);
      return newState;
    },
    { ...localStorageState }
  );
}

export default useReducerWithLocalStorage;

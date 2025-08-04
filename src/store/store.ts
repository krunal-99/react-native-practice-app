import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter.slice";
import coinReducer from "./coin.slice";
import ideaReducer from "./ideas.slice";
import postsReducer from "./posts.slice";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    coin: coinReducer,
    idea: ideaReducer,
    posts: postsReducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

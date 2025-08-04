import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Posts, PostsResponse } from "../constants/types";
import axios from "axios";

interface initialStateType {
  posts: PostsResponse;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: initialStateType = {
  posts: { posts: [], limit: 0, skip: 0, total: 0 },
  status: "idle",
  error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get("https://dummyjson.com/posts");
  return response.data;
});

const postsSlice = createSlice({
  name: "postsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchPosts.fulfilled,
        (state, action: PayloadAction<PostsResponse>) => {
          state.status = "succeeded";
          state.posts = action.payload;
        }
      )
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default postsSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

type CoinSide = "Heads!" | "Tails!";

interface CoinState {
  side: CoinSide;
}

const initialState: CoinState = {
  side: "Heads!",
};

const coinSlice = createSlice({
  name: "coin",
  initialState,
  reducers: {
    flip: (state) => {
      state.side = Math.random() < 0.5 ? "Heads!" : "Tails!";
    },
  },
});

export const { flip } = coinSlice.actions;
export default coinSlice.reducer;

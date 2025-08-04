import { createSlice } from "@reduxjs/toolkit";

interface initialStateType {
  idea: string[];
}

const initialState: initialStateType = {
  idea: [],
};

const ideaSlice = createSlice({
  name: "ideaSlice",
  initialState,
  reducers: {
    addIdea: (state, action) => {
      state.idea.push(action.payload);
    },
  },
});

export const { addIdea } = ideaSlice.actions;
export default ideaSlice.reducer;

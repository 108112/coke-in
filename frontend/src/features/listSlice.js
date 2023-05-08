import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  currentItem: "",
};

export const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = [...action.payload];
    },
    setCurrentItem: (state, action) => {
      state.currentItem = action.payload;
    },
    resetItems: (state) => {
      state.items = [];
    },
    resetCurrentItem: (state) => {
      state.currentItem = "";
    },
  },
});

export const { setItems, setCurrentItem, resetItems, resetCurrentItem } = listSlice.actions;
export default listSlice.reducer;

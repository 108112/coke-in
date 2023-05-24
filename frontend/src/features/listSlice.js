import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  locations: [],
  currentItem: "",
  currentSection: "",
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
    setLocations: (state, action) => {
      state.locations = [...action.payload];
    },
    setCurrentSection: (state, action) => {
      state.currentSection = action.payload;
    },
    resetList: () => initialState,
  },
});

export const {
  setItems,
  setCurrentItem,
  setLocations,
  setCurrentSection,
  resetList
} = listSlice.actions;
export default listSlice.reducer;

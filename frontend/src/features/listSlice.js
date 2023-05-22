import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  locations: [],
  currentItem: "",
  currentLocation: "",
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
    setCurrentLocation: (state, action) => {
      state.currentLocation = action.payload;
    },
    resetList: () => initialState,
  },
});

export const {
  setItems,
  setCurrentItem,
  setLocations,
  setCurrentLocation,
  resetList
} = listSlice.actions;
export default listSlice.reducer;

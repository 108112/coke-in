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
    resetItems: (state) => {
      state.items = [];
    },
    resetCurrentItem: (state) => {
      state.currentItem = "";
    },
    setLocations: (state, action) => {
      state.locations = [...action.payload];
    },
    setCurrentLocation: (state, action) => {
      state.currentLocation = action.payload;
    },
  },
});

export const {
  setItems,
  setCurrentItem,
  resetItems,
  resetCurrentItem,
  setLocations,
  setCurrentLocation,
} = listSlice.actions;
export default listSlice.reducer;

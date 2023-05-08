import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isVisible: false,
};

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    openSidebar: (state) => {
      state.isVisible = true;
    },
    closeSidebar: (state) => {
      state.isVisible = false;
    }
  },
});

export const { openSidebar, closeSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isVisible: false,
  component: null,
  pages: null
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    visibleModal: (state, action) => {
      state.isVisible = true;
      state.component = action.payload;
    },
    inVisibleModal: (state) => {
      state.isVisible = false;
      state.component = null;
    },
    setModalPages: (state, action) => {
      state.pages = action.payload;
    },
    resetModalPages: (state) => {
      state.pages = null;
    }
  },
});

export const { visibleModal, inVisibleModal, setModalPages, resetModalPages } = modalSlice.actions;
export default modalSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isVisible: false,
  component: null,
  pages: null,
  isLoading: false,
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
    },
    loading: (state) => {
      state.isLoading = !state.isLoading
    }
  },
});

export const { visibleModal, inVisibleModal, setModalPages, resetModalPages, loading } = modalSlice.actions;
export default modalSlice.reducer;

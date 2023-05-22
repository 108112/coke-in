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
    setModalPages: (state, action) => {
      state.pages = action.payload;
    },
    loading: (state) => {
      state.isLoading = !state.isLoading
    },
    resetModal: () => initialState,
  },
});

export const { visibleModal, setModalPages, loading, resetModal } = modalSlice.actions;
export default modalSlice.reducer;

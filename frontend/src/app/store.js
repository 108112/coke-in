import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "../features/modalSlice";
import formReducer from "../features/formSlice";
import listReducer from "../features/listSlice";
import sidebarReducer from "../features/sidebarSlice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    form: formReducer,
    list: listReducer,
    sidebar: sidebarReducer,
  },
});

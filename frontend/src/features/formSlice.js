import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  values: {},
  term: "",
  errors: null,
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setValues: (state, action) => {
      state.values = action.payload;
    },
    resetValues: (state) => {
      state.values = {};
    },
    setTerm: (state, action) => {
      state.term = action.payload;
    },
    resetTerm: (state) => {
      state.term = "";
    },
    setErrors: (state, action) => {
      state.errors = action.payload
    },
    resetErrors: (state) => {
      state.errors = null
    }
  },
});

export const { setValues, resetValues, setTerm, resetTerm, setErrors, resetErrors} = formSlice.actions;
export default formSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  values: {},
  term: "",
  errors: null,
  validate: false, 
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
    },
    setValidate: (state, action) => {
      state.validate = action.payload
    }
  },
});

export const { setValues, resetValues, setTerm, resetTerm, setErrors, resetErrors, setValidate } = formSlice.actions;
export default formSlice.reducer;
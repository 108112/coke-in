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
    setTerm: (state, action) => {
      state.term = action.payload;
    },
    setErrors: (state, action) => {
      state.errors = action.payload
    },
    setValidate: (state, action) => {
      state.validate = action.payload
    },
    resetForm: () => initialState,
  },
});

export const { setValues, setTerm, setErrors, setValidate, resetForm } = formSlice.actions;
export default formSlice.reducer;
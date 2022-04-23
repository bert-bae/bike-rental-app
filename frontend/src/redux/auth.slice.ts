import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    role: "",
    jwt: "",
  },
  reducers: {
    save: (state, action) => {
      console.log(action.payload);
      state.role = action.payload.role;
      state.jwt = action.payload.jwt;
    },
    reset: (state, action) => {
      state.role = "";
      state.jwt = "";
    },
  },
});

export const { save, reset } = authSlice.actions;

export default authSlice.reducer;

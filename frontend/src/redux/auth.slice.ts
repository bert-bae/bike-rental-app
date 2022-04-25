import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    role: "",
    username: "",
    userId: "",
    jwt: "",
  },
  reducers: {
    save: (state, action) => {
      state.role = action.payload.role;
      state.username = action.payload.username;
      state.userId = action.payload.userId;
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

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth.slice";

export type TStoreModel = {
  auth: {
    role: string;
    username: string;
    userId: string;
    jwt: string;
  };
};

export default configureStore({
  reducer: {
    auth: authReducer,
  },
});

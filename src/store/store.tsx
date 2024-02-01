import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import modalReducer from "./slice/modalSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;

export default store;

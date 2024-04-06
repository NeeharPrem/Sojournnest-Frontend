import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import bookingReducer from "./slice/bookingSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    booking: bookingReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
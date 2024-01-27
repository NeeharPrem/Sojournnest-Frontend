import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  userLoggedin: boolean | null;
  adminLoggedin: boolean | null;
}

const storedUserinfo = localStorage.getItem("userLoggedin");
const parsedUserinfo = storedUserinfo ? JSON.parse(storedUserinfo) : null;

const storedAdmininfo = localStorage.getItem("adminLoggedin");
const parsedAdmininfo = storedAdmininfo ? JSON.parse(storedAdmininfo) : null;

const initialState: AuthState = {
  userLoggedin: parsedUserinfo ?? null,
  adminLoggedin: parsedAdmininfo ?? null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.userLoggedin = action.payload;
      localStorage.setItem("userLoggedin", JSON.stringify(action.payload));
    },
    userLogout: (state) => {
      state.userLoggedin = false;
      localStorage.removeItem("userLoggedin");
    },
    adminLogin: (state, action) => {
      state.adminLoggedin = action.payload;
      localStorage.setItem("adminLoggedin", JSON.stringify(action.payload));
    },
    adminLogout: (state) => {
      state.adminLoggedin = false;
      localStorage.removeItem("adminLoggedin");
    },
  },
});

export const { setLogin, userLogout, adminLogin } = authSlice.actions;
export default authSlice.reducer;

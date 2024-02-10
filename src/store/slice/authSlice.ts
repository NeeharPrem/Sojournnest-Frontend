import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  userLoggedin: boolean | null;
  adminLoggedin: boolean | null;
  userId: string | null;
}

const storedUserinfo = localStorage.getItem("userLoggedin");
const parsedUserinfo = storedUserinfo ? JSON.parse(storedUserinfo) : null;

const storedAdmininfo = localStorage.getItem("adminLoggedin");
const parsedAdmininfo = storedAdmininfo ? JSON.parse(storedAdmininfo) : null;

const storedUserId = localStorage.getItem("userId");

const initialState: AuthState = {
  userLoggedin: parsedUserinfo ?? null,
  adminLoggedin: parsedAdmininfo ?? null,
  userId: storedUserId
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      const { userLoggedin, userId } = action.payload;
      state.userLoggedin = userLoggedin;
      localStorage.setItem("userId", userId)
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

export const { setLogin, userLogout, adminLogin,adminLogout } = authSlice.actions;
export default authSlice.reducer;

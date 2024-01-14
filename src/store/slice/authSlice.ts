import { createSlice } from '@reduxjs/toolkit';

interface initialState {
  userLoggedin: boolean | null;
}

const storedUserinfo = localStorage.getItem('userLoggedin');
const parsedUsernfo = storedUserinfo ? JSON.parse(storedUserinfo) : null;

const initialState: initialState = {
  userLoggedin:parsedUsernfo
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.userLoggedin = action.payload;
      localStorage.setItem('userLoggedin', JSON.stringify(action.payload));
    },
    userLogout: (state) => {
      state.userLoggedin = false;
      localStorage.removeItem('userLoggedin');
    },
  },
});

export const { setLogin, userLogout } = authSlice.actions;
export default authSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    deleteUser: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout, deleteUser } = authSlice.actions;

export default authSlice.reducer;
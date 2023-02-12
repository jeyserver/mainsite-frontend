import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isLoggedIn: false,
  },
  reducers: {},
  extraReducers: {},
});

export const {} = authSlice.actions;
export default authSlice.reducer;

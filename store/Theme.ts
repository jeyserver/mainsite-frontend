import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    current: 'light',
  },
  reducers: {
    toggleTheme(state, action) {
      if (state.current === 'light') {
        state.current = 'dark';
        document.querySelector('html').dataset.theme = 'dark';
      } else {
        state.current = 'light';
        document.querySelector('html').dataset.theme = 'light';
      }
    },
  },
  extraReducers: {},
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const languageSlice = createSlice({
  name: 'language',
  initialState: {
    locale: 'fa',
  },
  reducers: {
    setLanguage: (state, action) => {
      state.locale = action.payload;
    },
  }
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;

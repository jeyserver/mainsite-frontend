import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';

const currenciesSlice = createSlice({
  name: 'currencies',
  initialState: {
    items: null,
  },
  reducers: {
    setCurrencies: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: {},
});

export const { setCurrencies } = currenciesSlice.actions;
export default currenciesSlice.reducer;

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import backend from '../axios-config';
import { IHostPlan } from '../helper/types/products/Host/plan';
import ILicense from '../helper/types/products/License/plan';
import { IVPSPlan } from '../helper/types/products/VPS/plan';
import { ICurrency } from '../pages/_app';

export const deleteItem = createAsyncThunk(
  'deleteItem',
  async (id: string, thunkApi) => {
    return (await backend.post(`/order/cart/delete/${id}?ajax=1&`)).data as {
      status: boolean;
    };
  }
);

interface ICartItem {
  id: number | string;
  price: number;
  discount: number;
  number: number;
  currency: ICurrency;
  product: string;
  plan: any;
}

interface IState {
  id: string;
  items: ICartItem[];
}

const initialState: IState = {
  id: null,
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<ICartItem[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteItem.fulfilled, (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.meta.arg);
    });
  },
});

export const { setItems } = cartSlice.actions;
export default cartSlice.reducer;

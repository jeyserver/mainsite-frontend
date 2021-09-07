import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import backend from '../axios-config';
import IDomainProduct from '../helper/types/cart/domain';

export const deleteDomain = createAsyncThunk(
  'deleteDomain',
  async (arg: { id: string | number }) => {
    return await backend.post(`/order/cart/delete/${arg.id}?ajax=1`);
  }
);

interface ISelected {
  name: string | null;
  tld: number | null;
}

interface IState {
  selected: ISelected;
  forConfigure: IDomainProduct[];
}

const initialState: IState = {
  selected: null,
  forConfigure: [],
};

const domainSlice = createSlice({
  name: 'domain',
  initialState,
  reducers: {
    setSelectedDomain: (state, action: PayloadAction<ISelected>) => {
      state.selected = action.payload;
    },
    setDomainsForConfigure: (
      state,
      action: PayloadAction<IDomainProduct[]>
    ) => {
      state.forConfigure = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteDomain.fulfilled, (state, action) => {
      state.forConfigure = state.forConfigure.filter(
        (domain) => action.meta.arg.id !== domain.id
      );
    });
  },
});

export const { setSelectedDomain, setDomainsForConfigure } =
  domainSlice.actions;
export default domainSlice.reducer;

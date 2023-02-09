import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';
import backend from '../axios-config';
import { ITld } from '../pages/_app';

interface ICheckDomainArg {
  domainoption: 'register' | 'owndomain' | 'transfer';
  tld: number | string;
  name: string;
}

interface ICheckDomainRes {
  status: boolean;
  ordered: {
    name: string;
    tld: ITld;
    available: boolean;
  };
  recomendeds: {
    name: string;
    tld: ITld;
    available: boolean;
  };
}

export const checkDomain = createAsyncThunk(
  'checkDomain',
  async (arg: ICheckDomainArg, thunkApi) => {
    const store = thunkApi.getState() as RootState;
    return (await backend.post(
      `/${store.language.locale}/order/domain?ajax=1&domainoption=${arg.domainoption}&tld=${arg.tld}&name=${arg.name}`
    )) as ICheckDomainRes;
  }
);

interface ISelected {
  name: string;
  tld: number;
}

interface IState {
  selected: ISelected;
}

const initialState: IState = {
  selected: null,
};

const domainSlice = createSlice({
  name: 'domain',
  initialState,
  reducers: {
    setSelectedDomain: (state, action: PayloadAction<ISelected>) => {
      state.selected = action.payload;
    },
  },
  extraReducers: {},
});

export const { setSelectedDomain } = domainSlice.actions;
export default domainSlice.reducer;

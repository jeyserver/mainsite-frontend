import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';
import backend from '../axios-config';
import IDomainProduct from '../helper/types/cart/domain';
import { ICurrency, ITld } from '../pages/_app';

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
  forConfigure: IDomainProduct[];
}

const initialState: IState = {
  selected: {
    name: 'jsjssjjaja',
    tld: 4,
  },
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
    deleteFromForConfigure: (state, action: PayloadAction<string | number>) => {
      state.forConfigure = state.forConfigure.filter(
        (domain) => domain.id !== action.payload
      );
    },
  },
  extraReducers: {},
});

export const {
  setSelectedDomain,
  setDomainsForConfigure,
  deleteFromForConfigure,
} = domainSlice.actions;
export default domainSlice.reducer;

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';
import backend from '../axios-config';
import { ITld } from '../pages/_app';
import IDomainProduct from '../helper/types/cart/domain';

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
});

export const getForConfigureDomains = createAsyncThunk(
  'getDomains',
  async (arg, thunkApi) => {
    const store = thunkApi.getState() as RootState;
    return await backend(
      `/order/domain/configure?cart=${store.cart.id}&ajax=1`
    );
  }
);

export const deleteDomain = createAsyncThunk(
  'deleteDomain',
  async (arg: { id: string | number }, thunkApi) => {
    const store = thunkApi.getState() as RootState;
    return await backend(
      `/order/cart/delete/${arg.id}?cart=${store.cart.id}&ajax=1`
    );
  }
);

export interface IConfigDomain {
  [product: string]: string;
}

export const configureDomains = createAsyncThunk(
  'configureDomains',
  async (products: IConfigDomain, thunkApi) => {
    const store = thunkApi.getState() as RootState;
    const per = Object.entries(products).reduce((prev, cur) => {
      return `${prev}&${cur[0]}=${cur[1]}`;
    }, '');

    return await backend.post(
      `/order/domain/configure?cart=${store.cart.id}&ajax=1${per}`
    );
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
  selected: {
    name: null,
    tld: null,
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
  },
  extraReducers: (builder) => {
    builder.addCase(deleteDomain.fulfilled, (state, action) => {
      state.forConfigure = state.forConfigure.filter(
        (domain) => action.meta.arg.id !== domain.id
      );
    });
    builder.addCase(deleteDomain.rejected, (state, action) => {
      // console.log(action.payload);
    });
    builder.addCase(getForConfigureDomains.fulfilled, (state, action) => {
      state.forConfigure = action.payload.data.products;
    });
  },
});

export const { setSelectedDomain, setDomainsForConfigure } =
  domainSlice.actions;
export default domainSlice.reducer;

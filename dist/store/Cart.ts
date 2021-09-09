import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';
import backend from '../axios-config';
import { ICurrency } from '../pages/_app';

export const createCart = createAsyncThunk(
  'createCart',
  async (arg, thunkApi) => {
    return await backend('/order/cart/create?ajax=1');
  }
);

export interface IAddDomain {
  hostPlan?: string;
  domainoption: string;
  name?: string;
  tld?: number | string;
  domains?: any;
  period?: any;
}

export const addDomain = createAsyncThunk(
  'addDomain',
  async (arg: IAddDomain, thunkApi) => {
    const store = thunkApi.getState() as RootState;
    const period = Object.entries(arg.period)
      .map((i) => `&period[${i[0]}]=${i[1]}`)
      .join('');

    return await backend.post(
      `/order/domain?cart=${store.cart.id}${
        arg.hostPlan ? `&hostPlan=${arg.hostPlan}` : ''
      }&domainoption=${arg.domainoption}${arg.name ? `&name=${arg.name}` : ''}${
        arg.tld ? `&tld=${arg.tld}` : ''
      }${
        arg.domains
          ? arg.domains.map((i) => `&domains[${i}]=${i}`).join('')
          : ''
      }${arg.period ? period : ''}&ajax=1`
    );
  }
);

interface IAddLicence {
  id: number;
  period: number;
  hostname: string;
  os: number;
  ip: string;
}

export const addLicence = createAsyncThunk(
  'addLicense',
  async (arg: IAddLicence, thunkApi) => {
    const store = thunkApi.getState() as RootState;
    return await backend.post(
      `/order/licenses/${arg.id}?cart=${store.cart.id}&period=${arg.period}&hostname=${arg.hostname}&os=${arg.os}&ip=${arg.ip}&ajax=1`
    );
  }
);

export interface IAddVPS {
  id: number;
  period: string;
  license: string;
  backup: string;
  domain: string;
  ram: string;
  ip: string;
  hard: string;
  os: string;
}

export const addVPS = createAsyncThunk(
  'addVPS',
  async (arg: IAddVPS, thunkApi) => {
    const store = thunkApi.getState() as RootState;
    return await backend.post(
      `/order/server/vps/${arg.id}?cart=${store.cart.id}period=${arg.period}&license=${arg.license}&backup=${arg.backup}&domain=${arg.domain}&ram=${arg.ram}&os=${arg.os}&hard=${arg.hard}&ip=${arg.ip}&ajax=1`
    );
  }
);

export interface IAddDedicated {
  id: number;
  period: string;
  license: string;
  backup: string;
  domain: string;
  os: string;
  description: string;
}

export const addDedicated = createAsyncThunk(
  'addDedicated',
  async (arg: IAddDedicated, thunkApi) => {
    const store = thunkApi.getState() as RootState;
    return await backend.post(
      `/order/server/dedicated/${arg.id}?cart=${store.cart.id}&description=${arg.description}period=${arg.period}&license=${arg.license}&backup=${arg.backup}&domain=${arg.domain}&ajax=1`
    );
  }
);

export const setDiscount = createAsyncThunk(
  'setDiscount',
  async (code: string, thunkApi) => {
    const store = thunkApi.getState() as RootState;
    return await backend.post(
      `/order/cart?cart=${store.cart.id}?code=${code}&ajax=1`
    );
  }
);

export const deleteAll = createAsyncThunk('deleteAll', async (_, thunkApi) => {
  const store = thunkApi.getState() as RootState;
  return await backend.post(`/order/cart/delete?cart=${store.cart.id}&ajax=1&`);
});

export const deleteItem = createAsyncThunk(
  'deleteItem',
  async (id: number, thunkApi) => {
    const store = thunkApi.getState() as RootState;
    return (
      await backend.post(
        `/order/cart/deleteProduct/${id}?cart=${store.cart.id}&ajax=1`
      )
    ).data as {
      status: boolean;
    };
  }
);

export interface IConfigureHosting {
  period: string[];
  primary_domain: string[];
}

export const configureHosting = createAsyncThunk(
  'configureHosting',
  async (arg: IConfigureHosting, thunkApi) => {
    const store = thunkApi.getState() as RootState;
    return await backend.post(
      `/order/hosting/configure?cart=${store.cart.id}&period=${arg.period}&primary_domain=${arg.primary_domain}&ajax=1`
    );
  }
);

export interface ICompleteLogin {
  credential: { number: string; code: string } | string;
  password: string;
}

export const completeWithLogin = createAsyncThunk(
  'completeWithLogin',
  async (arg: ICompleteLogin, thunkApi) => {
    const store = thunkApi.getState() as RootState;
    return await backend.post(
      `/order/cart/complete?cart=${store.cart.id}?credential=${JSON.stringify(
        arg.credential
      )}?password=${arg.password}&ajax=1`
    );
  }
);

interface ICompleteRegister {
  name: string;
  lastname: string;
  email: string;
  cellphone: { number: string; code: string };
  password: string;
  password2: string;
}

export const completeWithRegister = createAsyncThunk(
  'completeWithRegister',
  async (arg: ICompleteRegister, thunkApi) => {
    const store = thunkApi.getState() as RootState;
    const per = `&dologin=register&name=${arg.name}&lastname=${
      arg.lastname
    }&email=${arg.email}&cellphone=${JSON.stringify(arg.cellphone)}&password=${
      arg.password
    }&password2=${arg.password2}`;

    return await backend.post(
      `/order/cart/complete?cart=${store.cart.id}${per}&ajax=1`
    );
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
  discount: number | null;
}

const initialState: IState = {
  id: null,
  items: [],
  discount: null,
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
    builder.addCase(createCart.fulfilled, (state, action) => {
      state.id = action.payload.data.cart_id;
    });

    builder.addCase(deleteAll.fulfilled, (state, action) => {
      state.items = [];
    });

    builder.addCase(deleteItem.fulfilled, (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.meta.arg);
    });

    builder.addCase(addLicence.fulfilled, (state, action) => {
      //
    });

    builder.addCase(setDiscount.fulfilled, (state, action) => {
      state.discount = action.payload;
    });

    builder.addCase(completeWithLogin.fulfilled, (state, action) => {
      //
    });
    builder.addCase(completeWithRegister.fulfilled, (state, action) => {
      //
    });
  },
});

export const { setItems } = cartSlice.actions;
export default cartSlice.reducer;

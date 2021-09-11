import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';
import { formatPrice } from '../components/helper/formatPrice';
import { ICurrency, RoundingBehaviour } from '../pages/_app';

const currenciesSlice = createSlice({
  name: 'currencies',
  initialState: {
    items: null,
    active: null,
  },
  reducers: {
    setCurrencies: (state, action) => {
      state.items = action.payload;
      state.active = action.payload.find((currency) => currency.active);
    },
  },
  extraReducers: {},
});

export const { setCurrencies } = currenciesSlice.actions;
export default currenciesSlice.reducer;

const round = (
  price: number,
  rounding_behaviour: number,
  rounding_precision: number
) => {
  switch (rounding_behaviour) {
    case RoundingBehaviour.CEIL: {
      let amount = price;
      const precision = Math.pow(10, rounding_precision);
      amount = Math.ceil(amount * precision);
      amount /= precision;
      return amount;
    }
    case RoundingBehaviour.ROUND: {
      return Math.round(price).toFixed(rounding_precision);
    }
    case RoundingBehaviour.FLOOR: {
      let amount = price;
      const precision = Math.pow(10, rounding_precision);
      amount = Math.floor(amount * precision);
      amount /= precision;
      return amount;
    }
  }
};

export const priceInActiveCurrency = (
  currencies: RootState['currencies'],
  base: number | ICurrency,
  price: number
) => {
  const activeCurrency = currencies.active;

  // base
  let baseCurrency;
  if (typeof base === 'number') {
    baseCurrency = currencies.items.find((currency) => currency.id === base);
  } else {
    baseCurrency = base;
  }
  const rate = baseCurrency.rates.find(
    (rate) => rate.changeTo === currencies.active.id
  );

  return Number(
    round(
      price * rate.price,
      activeCurrency.rounding_behaviour,
      activeCurrency.rounding_precision
    )
  );
};

export const formatPriceWithCurrency = (
  currencies: RootState['currencies'],
  base: number | ICurrency,
  price: number
) => {
  const activeCurrency = currencies.active;

  const formatedPrice = formatPrice(
    priceInActiveCurrency(currencies, base, price)
  );

  const prefix = activeCurrency.prefix || '';
  const postfix = activeCurrency.postfix || '';

  return (
    prefix +
    formatedPrice +
    postfix +
    (!prefix && !postfix ? ' ' + activeCurrency.title : '')
  );
};

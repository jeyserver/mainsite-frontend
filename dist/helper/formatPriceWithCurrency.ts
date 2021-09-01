import { Currency } from '../pages/_app';
import { formatPrice } from './formatPrice';

const formatPriceWithCurrency = (
  allCurrencies: Currency[],
  baseId,
  price: number
) => {
  const activeCurrency = allCurrencies.find((currency) => currency.active);
  const baseCurrency = allCurrencies.find((currency) => currency.id === baseId);
  const rate = baseCurrency.rates.find(
    (rate) => rate.changeTo === activeCurrency.id
  );
  return `${formatPrice(
    Number.parseInt(
      (price * rate.price).toFixed(baseCurrency.rounding_behaviour)
    )
  )} ${activeCurrency.title}`;
};

export default formatPriceWithCurrency;

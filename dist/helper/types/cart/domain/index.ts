import { ICurrency, ITld } from '../../../../pages/_app';

interface IDomainProduct {
  id: number | string;
  price: number;
  discount: number;
  number: number;
  currency: number | ICurrency;
  product: string;
  tld: ITld;
  domain: string;
  type: 'register' | 'owndomain' | 'transfer';
}

export default IDomainProduct;

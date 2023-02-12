import { ICurrency, ITld } from '../../../../pages/_app';
import IProduct from '../product';

interface IDomainProduct extends IProduct {
  tld: ITld;
  domain: string;
  type: 'register' | 'owndomain' | 'transfer';
}

export default IDomainProduct;

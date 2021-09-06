import { ICurrency } from '../../../pages/_app';

interface IProduct {
  id: number | string;
  price: number;
  discount: number;
  number: number;
  currency: ICurrency;
  product: 'license' | 'host' | 'server_vps';
}

export default IProduct;

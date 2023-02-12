import { ICurrency } from '../../../pages/_app';

interface IProduct {
  id: number;
  price: number;
  discount: number;
  number: number;
  currency: ICurrency;
  product: 'license' | 'host' | 'server_vps' | 'domain';
}

export default IProduct;

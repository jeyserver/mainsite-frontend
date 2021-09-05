import { ICurrency } from '../../../../pages/_app';
import { IHostPlan } from '../../products/Host/plan';

interface IHostProduct {
  id: number;
  price: number;
  discount: number;
  number: number;
  currency: ICurrency | number;
  product: string;
  plan: IHostPlan;
}

export default IHostProduct;

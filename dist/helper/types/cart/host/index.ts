import { IHostPlan } from '../../products/Host/plan';
import IProduct from '../product';

interface IPlan extends IHostPlan {
  domain: string;
}

interface IHostProduct extends IProduct {
  plan: IPlan;
}

export default IHostProduct;

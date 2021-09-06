import { IHostPlan } from '../../products/Host/plan';
import IProduct from '../product';

interface IHostProduct extends IProduct {
  plan: IHostPlan;
}

export default IHostProduct;

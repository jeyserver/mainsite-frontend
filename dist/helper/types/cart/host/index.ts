import { IHostPlan } from '../../products/Host/plan';
import IDomainProduct from '../domain';
import IProduct from '../product';

interface IHostProduct extends IProduct {
  plan: IHostPlan;
  domain: IDomainProduct;
}

export default IHostProduct;

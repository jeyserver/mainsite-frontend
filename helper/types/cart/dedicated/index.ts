import { IDedicatedPlan } from '../../products/Dedicated/plan';
import IProduct from '../product';

interface IPlan extends IDedicatedPlan {}

interface IDedicatedProduct extends IProduct {
  plan: IPlan;
}

export default IDedicatedProduct;

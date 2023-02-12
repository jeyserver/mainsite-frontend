import { IHostPlan } from '../../products/Host/plan';
import IAddon from '../../products/VPS/addon';
import IProduct from '../product';

interface IPlan extends IHostPlan {
  addons: {
    hard: IAddon | null;
    ip: string | null;
    ram: IAddon | null;
  };
}

interface IVPSProduct extends IProduct {
  plan: IPlan;
}

export default IVPSProduct;

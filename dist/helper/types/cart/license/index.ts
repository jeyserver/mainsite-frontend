import ILicense from '../../products/License/plan';
import IProduct from '../product';

interface ILicenseProduct extends IProduct {
  plan: ILicense;
}

export default ILicenseProduct;

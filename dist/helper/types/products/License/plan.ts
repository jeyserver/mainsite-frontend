import { ICurrency } from '../../../../pages/_app';

interface ILicense {
  id: number;
  registrar: number;
  title: string;
  price: number;
  setup: number;
  currency: ICurrency;
  pp: number;
  status: number;
  type?: string;
}

export default ILicense;

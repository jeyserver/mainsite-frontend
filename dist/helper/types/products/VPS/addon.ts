export enum AddonType {
  Hard = 1,
  Ram = 2,
}

interface IAddon {
  id: number;
  plan: number;
  addon: {
    type: AddonType;
    title: string;
  };
  price: number;
  currency: number;
  canupdate: number;
}

export default IAddon;

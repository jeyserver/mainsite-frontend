export interface IVPSPlan {
  id: number;
  title: string;
  country: {
    code: string;
    name: string;
  };
  price: number;
  penalty_ratio: number;
  virtualer: number;
  hard: number;
  hardtype: number;
  cpu: number;
  bandwidth: number | null;
  ram: number;
  setup: number;
  addonip: number;
  currency: any;
  status: number;
  sold_out: boolean;
  periods: number[];
  is_available: boolean;
}

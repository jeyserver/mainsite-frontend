export interface IHostPlan {
  id: number;
  title: string;
  price: number;
  setup: number;
  currency: number;
  country: {
    code: string;
    name: string;
  };
  space: number;
  bandwidth: number | null;
  email: number | null;
  ftp: number | null;
  addondomain: number;
  parkdomain: number;
  subdomain: number | null;
  dbs: number | null;
  reseller: number;
  cp: string;
  cpu: number;
  ram: number;
  IO: number;
  entryprocess: number;
  backups: number[];
  is_available: boolean;
  periods: number[];
}

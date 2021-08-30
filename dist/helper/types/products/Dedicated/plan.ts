import { ICurrency } from '../../../../pages/_app';

export interface IDedicatedPlan {
  id: number;
  title: string;
  price: number;
  datacenter: {
    title: string;
    country: {
      code: string;
      name: string;
    };
  };
  hard: {
    onsell: boolean;
    price: number;
    type: string;
    space: number;
  }[][];
  cpu: {
    title: string;
    num: number;
    cores: number;
    threads: number;
    speed: number;
  };
  bandwidth: number | null;
  port: number;
  ram: number;
  raid: number | null;
  setup: number;
  currency: number | ICurrency;
  sold_out: boolean;
  status: number;
}

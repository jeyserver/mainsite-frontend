import { ICurrency } from '../../../../pages/_app';

export interface ILocation {
  id: number;
  name: string;
  city: string;
  network_zone: string;
}

export interface ICountry {
  code: string;
  name: string;
}

export interface ILocationWithCountry extends ILocation {
  country: ICountry;
}

export interface IVPSPlan {
  id: number;
  title: string;
  country: ICountry;
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
  currency: number | ICurrency;
  status: number;
  sold_out: boolean;
  periods: number[];
  is_available: boolean;
  location: ILocation;
}


export function chunkedPlans(size: number, plans: IVPSPlan[]) {
  let chunked = [];
  for (let i = 0; i < plans.length; i += size) {
    chunked.push(plans.slice(i, i + size));
  }
  return chunked;
}

export function getPlans(plans: IVPSPlan[]) {
  let size = 5;
  let recalculate = true;
  let parts = [];

  do {
    parts = chunkedPlans(size, plans);
    const count = parts.length;

    if (count == 1) {
      recalculate = false;
    } else {
      const lastPart = parts.pop();
      parts.push(lastPart);
      const lastPartCount = lastPart.length;

      if (size - lastPartCount > 1) {
        if (count > 2) {
          size++;
        } else {
          if (size - lastPartCount > 2) {
            size--;
          } else {
            size = plans.length;
          }
        }
      } else {
        recalculate = false;
      }
    }

  } while (recalculate);

  return parts;
}

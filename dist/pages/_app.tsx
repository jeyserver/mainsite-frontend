import '../public/packages/leaflet/dist/leaflet.css';
import 'react-notifications/lib/notifications.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'select2/dist/css/select2.min.css';
import '../styles/rtl-bootstrap.scss';
import '../styles/globals.scss';
import { Provider } from 'react-redux';
import { NotificationContainer } from 'react-notifications';
import { store } from '../store/index';
import NProgress from '../components/NProgress/NProgress';
import { setCurrencies } from '../store/Currencies';

export default function App({
  Component,
  pageProps,
  domainsForNavbar,
  licensesForNavbar,
  postsForFooter,
  data,
}) {
  store.dispatch(setCurrencies(data.currencies));

  return (
    <Provider store={store}>
      <NotificationContainer />
      <NProgress
        color="#3dc4e4"
        startPosition={0.2}
        stopDelayMs={200}
        height={3}
      />
      <Component
        {...pageProps}
        domainsForNavbar={domainsForNavbar}
        licensesForNavbar={licensesForNavbar}
        postsForFooter={postsForFooter}
      />
    </Provider>
  );
}

export interface Currency {
  active?: boolean;
  id: number;
  prefix: null;
  title: string;
  postfix: null;
  update_at: number;
  rounding_behaviour: number;
  rounding_precision: number;
  rates: {
    id: number;
    currency: number;
    changeTo: number;
    price: number;
  }[];
}

export type Tlds = {
  id: number;
  new: number;
  renew: number;
  tld: string;
  transfer: number;
  currency: number;
}[];

export enum LicensePP {
  Lifetime,
  Daily,
  Monthly,
  Yearly,
}

export interface License {
  id: number;
  registrar: number;
  title: string;
  price: number;
  setup: number;
  currency: number;
  pp: LicensePP;
  status: 0 | 1;
}

export interface FooterPost {
  title: string;
  permalink: string;
}

export interface pageProps {
  domainsForNavbar: Tlds;
  licensesForNavbar: License[];
  postsForFooter: FooterPost[];
  currencies: Currency[];
}

App.getInitialProps = async ({ Component, ctx }) => {
  const locale = ctx.locale;

  const respone = await fetch(
    `${process.env.SCHEMA}://${process.env.DOMAIN}/${locale}?ajax=1`
  );
  const data = await respone.json();

  const licensesForNavbarRes = await fetch(
    'https://jsonblob.com/api/jsonBlob/4913d357-eba1-11eb-9eff-219764ad97b3'
  );
  const licensesForNavbar = await licensesForNavbarRes.json();

  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return {
    data,
    pageProps,
    domainsForNavbar: data.tlds,
    licensesForNavbar: data.licenses,
    postsForFooter: data.posts,
  };
};

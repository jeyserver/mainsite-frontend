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
import { setLanguage } from '../store/Language';

export default function App({
  Component,
  pageProps,
  domainsForNavbar,
  licensesForNavbar,
  postsForFooter,
  currencies,
  locale,
}) {
  store.dispatch(setCurrencies(currencies));
  store.dispatch(setLanguage(locale));

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

export enum RoundingBehaviour {
  CEIL = 1,
  ROUND = 2,
  FLOOR = 3,
}

export interface ICurrency {
  active?: boolean;
  id: number;
  prefix: null;
  title: string;
  postfix: null;
  update_at: number;
  rounding_behaviour: RoundingBehaviour;
  rounding_precision: number;
  rates: {
    id: number;
    currency: number;
    changeTo: number;
    price: number;
  }[];
}

export interface ITld {
  id: number;
  new: number;
  renew: number;
  tld: string;
  transfer: number;
  currency: number;
}

enum LicensePP {
  Lifetime,
  Daily,
  Monthly,
  Yearly,
}

export interface ILicense {
  id: number;
  registrar: number;
  title: string;
  price: number;
  setup: number;
  currency: number;
  pp: LicensePP;
  status: 0 | 1;
}

export interface IFooterPost {
  title: string;
  permalink: string;
}

export interface pageProps {
  domainsForNavbar: ITld[];
  licensesForNavbar: ILicense[];
  postsForFooter: IFooterPost[];
  currencies: ICurrency[];
}

export interface IPageProps {
  domainsForNavbar: ITld[];
  licensesForNavbar: ILicense[];
  postsForFooter: IFooterPost[];
  currencies: ICurrency[];
}

App.getInitialProps = async ({ Component, ctx }) => {
  const locale = ctx.locale;

  const respone = await fetch(
    `${process.env.SCHEMA}://${process.env.DOMAIN}/${locale}?ajax=1`
  );
  const data = await respone.json();

  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return {
    pageProps,
    domainsForNavbar: data.tlds,
    licensesForNavbar: data.licenses,
    postsForFooter: data.posts,
    currencies: data.currencies,
    locale,
  };
};

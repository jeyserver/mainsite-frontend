import '../public/packages/leaflet/dist/leaflet.css';
import 'react-notifications/lib/notifications.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'select2/dist/css/select2.min.css';
import '../styles/rtl-bootstrap.scss';
import '../styles/globals.scss';
import { Provider } from 'react-redux';
import { NotificationContainer } from 'react-notifications';
import { persistor, store } from '../store/index';
import NProgress from '../components/NProgress/NProgress';
import { PersistGate } from 'redux-persist/integration/react';

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NotificationContainer />
        <NProgress
          color="#3dc4e4"
          startPosition={0.2}
          stopDelayMs={200}
          height={3}
        />
        <Component {...pageProps} />
      </PersistGate>
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

export interface IPageProps {
  header: {
    currencies: ICurrency[];
    tlds: ITld[];
    licenses: ILicense[];
  };
  footer: {
    posts: IFooterPost[];
  };
}

App.getInitialProps = async ({ Component, ctx }) => {
  const locale = ctx.locale;
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return {
    pageProps,
  };
};

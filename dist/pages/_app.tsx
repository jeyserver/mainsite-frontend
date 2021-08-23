// import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../public/packages/leaflet/dist/leaflet.css';
import 'react-notifications/lib/notifications.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'select2/dist/css/select2.min.css';
import '../styles/rtl-bootstrap.scss';
import '../styles/globals.scss';
import { Provider } from 'react-redux';
import { NotificationContainer } from 'react-notifications';
import { useStore } from '../redux/store';
import NProgress from '../components/NProgress/NProgress';

export default function App({
  Component,
  pageProps,
  domainsForNavbar,
  licensesForNavbar,
  postsForFooter,
}) {
  const store = useStore(pageProps.initialReduxState);

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

export interface domainsForNavbarType {
  items: {
    id: number;
    new: number;
    renew: number;
    tld: string;
    transfer: number;
  }[];
  status: boolean;
  currency: {
    title: string;
  };
}

export interface pageProps {
  domainsForNavbar: any;
  licensesForNavbar: any;
  postsForFooter: any;
}

App.getInitialProps = async ({ Component, ctx }) => {
  const domainsForNavbarRes = await fetch(
    `https://jsonblob.com/api/jsonBlob/57cdd139-eaad-11eb-8813-950ac49ad40b`
  );
  const domainsForNavbar: domainsForNavbarType =
    await domainsForNavbarRes.json();

  const licensesForNavbarRes = await fetch(
    'https://jsonblob.com/api/jsonBlob/4913d357-eba1-11eb-9eff-219764ad97b3'
  );
  const licensesForNavbar = await licensesForNavbarRes.json();

  const postsForFooterRes = await fetch(
    'https://jsonblob.com/api/jsonBlob/ff048401-e7cd-11eb-971c-9ff88820de62'
  );
  const postsForFooter = await postsForFooterRes.json();

  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return {
    pageProps,
    domainsForNavbar,
    licensesForNavbar,
    postsForFooter,
  };
};

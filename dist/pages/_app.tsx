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

export default function App({ Component, pageProps, domainsForNavbar }) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <NotificationContainer />
      <Component {...pageProps} domainsForNavbar={domainsForNavbar} />
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
  domainsForNavbar: domainsForNavbarType;
}

App.getInitialProps = async ({ Component, ctx }) => {
  const domainsForNavbarRes = await fetch(
    `https://jsonblob.com/api/jsonBlob/57cdd139-eaad-11eb-8813-950ac49ad40b`
  );
  const domainsForNavbar: domainsForNavbarType =
    await domainsForNavbarRes.json();

  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps, domainsForNavbar };
};

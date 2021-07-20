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

export default function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <NotificationContainer />
      <Component {...pageProps} />
    </Provider>
  );
}

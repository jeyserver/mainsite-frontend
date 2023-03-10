import * as React from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { IPageProps } from '../../pages/_app';
import { connect } from 'react-redux';
import { setCurrencies } from '../../store/Currencies';
import { createCart } from '../../store/Cart';
import { RootState } from '../../store';

interface IProps extends IPageProps {
  children: React.ReactNode;
  appIsScrolling?: boolean;
  setCurrencies: typeof setCurrencies;
  theme: RootState['theme'];
  cart: RootState['cart'];
  createCart: typeof createCart;
}

class Layout extends React.Component<IProps> {
  constructor(props) {
    super(props);
    this.props.setCurrencies(this.props.header.currencies);
    if (!this.props.cart.id) {
      this.props.createCart();
    }
  }

  componentDidMount() {
    if (this.props.theme.current === 'dark') {
      document.querySelector('html').dataset.theme = 'dark';
    } else {
      document.querySelector('html').dataset.theme = 'light';
    }
  }

  render() {
    return (
      <React.Fragment>
        <Navbar
          appIsScrolling={this.props.appIsScrolling}
          tlds={this.props.header.tlds}
          licenses={this.props.header.licenses}
        />
        {this.props.children}
        <Footer posts={this.props.footer.posts} />
      </React.Fragment>
    );
  }
}

export default connect(
  (state: RootState) => {
    return {
      theme: state.theme,
      cart: state.cart,
    };
  },
  { setCurrencies, createCart }
)(Layout);

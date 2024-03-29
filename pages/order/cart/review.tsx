import * as React from 'react';
import Head from 'next/head';
import Review from '../../../components/Cart/Review/Review';
import Layout from '../../../components/Layout/Layout';
import { connect } from 'react-redux';
import { IPageProps } from './../../_app';
import { setCart as setCart } from '../../../store/Cart';
import { RootState } from '../../../store';
import backend from '../../../axios-config';
import { NextPageContext } from 'next';
import router from 'next/router';

interface IProps extends IPageProps {
  setCart: typeof setCart;
  cart: RootState['cart'];
}

class Index extends React.Component<IProps> {
  componentDidMount() {
    backend(`/order/cart/review?ajax=1&cart=${this.props.cart.id}`).then(
      (res) => {
        this.props.setCart({
          items: res.data.products,
          has_active_discount_code: res.data.has_active_discount_code,
        });
      }
    ).catch(() => {
      router.push('/');
    });
  }

  render() {
    return (
      <div dir="rtl">
        <Head>
          <title>پیش فاکتور | تایید سفارش</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Layout header={this.props.header} footer={this.props.footer}>
          <Review />
        </Layout>
      </div>
    );
  }
}

export async function getServerSideProps(context: NextPageContext) {
  const locale = context.locale;

  if (locale !== 'fa') {
    return {
      notFound: true,
    };
  }

  const respone = await fetch(`${process.env.SITE_URL}/${locale}?ajax=1`);
  const data = await respone.json();

  return {
    props: { ...data },
  };
}

export default connect(
  (state: RootState) => {
    return {
      cart: state.cart,
    };
  },
  { setCart }
)(Index);

import * as React from 'react';
import Head from 'next/head';
import OrderDomain from '../../../components/Order/OrderDomain';
import Layout from '../../../components/Layout/Layout';
import { ICurrency, IPageProps, ITld } from './../../_app';

interface IProps extends IPageProps {
  status: boolean;
  tlds: ITld[];
  currencies: ICurrency[];
}

const commercialDomains = [
  'com',
  'net',
  'org',
  'biz',
  'work',
  'agency',
  'bid',
  'company',
  'holdings',
  'institute',
  'limited',
  'money',
];

class Index extends React.Component<IProps> {
  render() {
    return (
      <div dir="rtl">
        <Head>
          <title>خرید دامنه</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Layout header={this.props.header} footer={this.props.footer}>
          <OrderDomain
            step="settings"
            data={{
              tlds: this.props.tlds,
              transferOption: false,
              cheepBorder: 200000,
              commercialDomains,
            }}
          />
        </Layout>
      </div>
    );
  }
}

export async function getServerSideProps(context) {
  const locale = context.locale;

  if (locale !== 'fa') {
    return {
      notFound: true,
    };
  }

  const respone = await fetch(
    `${process.env.SITE_URL}/${locale}/order/domain?ajax=1`
  );
  const data = await respone.json();

  return {
    props: {
      ...data,
    },
  };
}

export default Index;

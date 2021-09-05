import * as React from 'react';
import Head from 'next/head';
import OrderDomain from '../../../../components/Order/OrderDomain';
import Layout from '../../../../components/Layout/Layout';
import { ICurrency, IPageProps, ITld } from '../../../_app';

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

        <Layout
          postsForFooter={this.props.postsForFooter}
          domainsForNavbar={this.props.domainsForNavbar}
          licensesForNavbar={this.props.licensesForNavbar}
        >
          <OrderDomain
            step="settings"
            data={{
              tlds: this.props.tlds,
              orderHost: true,
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
  const id = context.query.id;

  if (locale !== 'fa') {
    return {
      notFound: true,
    };
  }

  const respone = await fetch(
    `${process.env.SCHEMA}://${process.env.DOMAIN}/${locale}/order/hosting/linux/${id}?ajax=1`
  );
  const data = await respone.json();

  return {
    props: {
      ...data,
    },
  };
}

export default Index;

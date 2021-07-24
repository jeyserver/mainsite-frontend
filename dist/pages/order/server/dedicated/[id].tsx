import * as React from 'react';
import Head from 'next/head';
import OrderDedicatedServer from '../../../../components/OrderDedicatedServer/OrderDedicatedServer';
import Layout from '../../../../components/Layout/Layout';
import { pageProps } from '../../../_app';

export interface IndexProps extends pageProps {
  serviceData: any;
}

export interface IndexState {}

class Index extends React.Component<IndexProps, IndexState> {
  constructor(props: IndexProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div dir="rtl">
        <Head>
          <title>خرید سرور اختصاصی</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Layout
          postsForFooter={this.props.postsForFooter}
          domainsForNavbar={this.props.domainsForNavbar}
          licensesForNavbar={this.props.licensesForNavbar}
        >
          <OrderDedicatedServer serviceData={this.props.serviceData} />
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

  const serviceDataRes = await fetch(
    'https://jsonblob.com/api/jsonBlob/d3196d4f-e2e1-11eb-b284-d50b7a049077'
  );
  const serviceData = await serviceDataRes.json();

  return {
    props: { serviceData },
  };
}

export default Index;

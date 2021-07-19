import * as React from 'react';
import Head from 'next/head';
import HostingConfigure from '../../../../components/OrderDomain/HostingConfigure/HostingConfigure';
import Layout from '../../../../components/Layout/Layout';

export interface IndexProps {
  hostingCartItems: any;
  postsForFooter: any;
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
          <title>پیکربندی هاست</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Layout postsForFooter={this.props.postsForFooter}>
          <HostingConfigure hostingCartItems={this.props.hostingCartItems} />
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

  const postsForFooterRes = await fetch(
    'https://jsonblob.com/api/jsonBlob/ff048401-e7cd-11eb-971c-9ff88820de62'
  );
  const postsForFooter = await postsForFooterRes.json();

  const hostingCartItemsRes = await fetch(
    `https://jsonblob.com/api/jsonBlob/6b49c8d2-e7b0-11eb-971c-85fdd4ff3087`
  );
  const hostingCartItems = await hostingCartItemsRes.json();

  return {
    props: { hostingCartItems, postsForFooter },
  };
}

export default Index;

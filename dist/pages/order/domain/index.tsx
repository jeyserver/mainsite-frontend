import * as React from 'react';
import Head from 'next/head';
import OrderDomain from '../../../components/OrderDomain';
import Layout from '../../../components/Layout/Layout';

export interface IndexProps {
  domains: any;
  cheapDomainBreakPrice: any;
  famousAndTrendyDomains: any;
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
          <title>خرید دامنه</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Layout postsForFooter={this.props.postsForFooter}>
          <OrderDomain
            step="settings"
            data={{
              domains: this.props.domains,
              transferOption: false,
              cheapDomainBreakPrice: this.props.cheapDomainBreakPrice,
              famousAndTrendyDomains: this.props.famousAndTrendyDomains,
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

  const postsForFooterRes = await fetch(
    'https://jsonblob.com/api/jsonBlob/ff048401-e7cd-11eb-971c-9ff88820de62'
  );
  const postsForFooter = await postsForFooterRes.json();

  const domainsRes = await fetch(
    `${process.env.SCHEMA}://${process.env.DOMAIN}/fa/domain?ajax=1`
  );
  const domains = await domainsRes.json();

  const famousAndTrendyDomainsRes = await fetch(
    'https://jsonblob.com/api/jsonBlob/964cc80e-e274-11eb-a96b-6b620e600ebe'
  );
  const famousAndTrendyDomains = await famousAndTrendyDomainsRes.json();

  return {
    props: {
      domains,
      cheapDomainBreakPrice: 200000,
      famousAndTrendyDomains,
      postsForFooter,
    },
  };
}

export default Index;
import * as React from 'react';
import Head from 'next/head';
import OrderDomain from '../../../../components/OrderDomain';
import { connect } from 'react-redux';
import { setOrderedDomains } from '../../../../redux/actions';
import Layout from '../../../../components/Layout/Layout';
import { pageProps } from '../../../_app';

export interface IndexProps extends pageProps {
  domains: any;
  nationalDomainsList: any;
  setOrderedDomains: (domains: any) => void;
  postsForFooter: any;
}

export interface IndexState {}

class Index extends React.Component<IndexProps, IndexState> {
  constructor(props: IndexProps) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.setOrderedDomains(this.props.domains);
  }

  render() {
    return (
      <div dir="rtl">
        <Head>
          <title>پیکربندی دامنه ها</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Layout
          postsForFooter={this.props.postsForFooter}
          domainsForNavbar={this.props.domainsForNavbar}
        >
          <OrderDomain
            step="configuration"
            data={{
              domains: this.props.domains,
              nationalDomainsList: this.props.nationalDomainsList,
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
    `https://jsonblob.com/api/jsonBlob/1a0f9102-e279-11eb-a96b-3311b2affb1f`
  );
  const domains = await domainsRes.json();

  return {
    props: { domains, nationalDomainsList: ['ir'], postsForFooter },
  };
}

export default connect(null, { setOrderedDomains })(Index);

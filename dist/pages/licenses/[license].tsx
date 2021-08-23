import * as React from 'react';
import Head from 'next/head';
import Layout from '../../components/Layout/Layout';
import { pageProps } from '../_app';
import License from '../../components/License/License';
import { renderPageTitle } from '../../components/License/helper/renderPageTitle';

export interface IndexProps extends pageProps {
  plans: any;
  license: 'cloudlinux' | 'cpanel' | 'directadmin' | 'litespeed' | 'whmcs';
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
          <title>لایسنس | {renderPageTitle(this.props.license)}</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Layout
          postsForFooter={this.props.postsForFooter}
          domainsForNavbar={this.props.domainsForNavbar}
          licensesForNavbar={this.props.licensesForNavbar}
        >
          <License license={this.props.license} plans={this.props.plans} />
        </Layout>
      </div>
    );
  }
}

export async function getServerSideProps(context) {
  const locale = context.locale;
  const license = context.query.license;

  if (locale !== 'fa') {
    return {
      notFound: true,
    };
  }

  const plansRes = await fetch(
    'https://jsonblob.com/api/jsonBlob/1c005f45-eaf7-11eb-8813-eb4dfe50e7ca'
  );
  const plans = await plansRes.json();

  return {
    props: { plans, license },
  };
}

export default Index;

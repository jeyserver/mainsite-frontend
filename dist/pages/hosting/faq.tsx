import * as React from 'react';
import Head from 'next/head';
import HostingFaq from '../../components/HostsPricing/HostingFaq/HostingFaq';
import Layout from '../../components/Layout/Layout';
import { IPageProps } from '../_app';

class Index extends React.Component<IPageProps> {
  render() {
    return (
      <div dir="rtl">
        <Head>
          <title>هاستینگ | سوالات متداول هاست های میزبانی</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Layout header={this.props.header} footer={this.props.footer}>
          <HostingFaq />
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
    `${process.env.SITE_URL}/${locale}/hosting/faq?ajax=1`
  );
  const data = await respone.json();

  return {
    props: { ...data },
  };
}

export default Index;

import * as React from 'react';
import Head from 'next/head';
import Terms from '../components/Terms/Terms';
import Layout from '../components/Layout/Layout';
import { IPageProps } from './_app';

class Index extends React.Component<IPageProps> {
  render() {
    return (
      <div dir="rtl">
        <Head>
          <title>شرایط و قوانین جی سرور</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Layout
          postsForFooter={this.props.postsForFooter}
          domainsForNavbar={this.props.domainsForNavbar}
          licensesForNavbar={this.props.licensesForNavbar}
        >
          <Terms />
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

  return {
    props: {},
  };
}

export default Index;

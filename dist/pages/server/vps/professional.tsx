import * as React from 'react';
import Head from 'next/head';
import VpsPricing from '../../../components/VpsPricing/VpsPricing';
import Layout from '../../../components/Layout/Layout';
import { pageProps } from '../../_app';

export interface IndexProps extends pageProps {
  vpsData: any;
  topNav: any;
}

export interface IndexState {
  appIsScrolling: boolean;
}

let appIsScrollingTimeout;

class Index extends React.Component<IndexProps, IndexState> {
  constructor(props: IndexProps) {
    super(props);
    this.state = {
      appIsScrolling: false,
    };
    this.switchAppIsScrolling = this.switchAppIsScrolling.bind(this);
  }

  switchAppIsScrolling() {
    clearTimeout(appIsScrollingTimeout);
    this.setState((prev) => {
      return { appIsScrolling: true };
    });

    appIsScrollingTimeout = setTimeout(() => {
      this.setState((prev) => {
        return { appIsScrolling: false };
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearTimeout(appIsScrollingTimeout);
  }

  render() {
    return (
      <div dir="rtl">
        <Head>
          <title>سرور مجازی حرفه ای</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Layout
          postsForFooter={this.props.postsForFooter}
          appIsScrolling={this.state.appIsScrolling}
          domainsForNavbar={this.props.domainsForNavbar}
          licensesForNavbar={this.props.licensesForNavbar}
        >
          <VpsPricing
            vpsData={this.props.vpsData}
            topNav={this.props.topNav}
            type="professional"
            appIsScrolling={this.state.appIsScrolling}
            switchAppIsScrolling={this.switchAppIsScrolling}
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

  // const data = await fetch(
  //   `${process.env.SCHEMA}://${process.env.DOMAIN}`
  // );

  const vpsDataRes = await fetch(
    'https://jsonblob.com/api/jsonBlob/5e968f2d-df13-11eb-b7ed-fbe0d5824189'
  );
  const vpsData = await vpsDataRes.json();

  const topNavRes = await fetch(
    'https://jsonblob.com/api/jsonBlob/3156ddcb-df56-11eb-b7ed-bd16078826a6'
  );
  const topNav = await topNavRes.json();

  return {
    props: { vpsData, topNav },
  };
}

export default Index;

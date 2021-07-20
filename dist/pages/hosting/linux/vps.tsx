import * as React from 'react';
import Head from 'next/head';
import VPSHosting from '../../../components/HostsPricing/VPSHosting/VPSHosting';
import Layout from '../../../components/Layout/Layout';

export interface IndexProps {
  VPSHosts: any;
  navData: any;
  postsForFooter: any;
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
          <title>هاستینگ | لینوکس | نیمه اختصاصی</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Layout
          postsForFooter={this.props.postsForFooter}
          appIsScrolling={this.state.appIsScrolling}
        >
          <VPSHosting
            VPSHosts={this.props.VPSHosts}
            navData={this.props.navData}
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

  const postsForFooterRes = await fetch(
    'https://jsonblob.com/api/jsonBlob/ff048401-e7cd-11eb-971c-9ff88820de62'
  );
  const postsForFooter = await postsForFooterRes.json();

  const VPSHostsRes = await fetch(
    `https://jsonblob.com/api/jsonBlob/874ffbe1-dfe6-11eb-a8ab-7d0108d78d09`
  );
  const VPSHosts = await VPSHostsRes.json();

  const navDataRes = await fetch(
    'https://jsonblob.com/api/jsonBlob/14b7037a-e155-11eb-9c37-51d866f9d6a7'
  );
  const navData = await navDataRes.json();

  return {
    props: {
      VPSHosts,
      navData,
      postsForFooter,
    },
  };
}

export default Index;
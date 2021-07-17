import * as React from 'react';
import Head from 'next/head';
import Footer from '../../../components/Footer/Footer';
import Navbar from '../../../components/Navbar/Navbar';
import SharedHosting from '../../../components/HostsPricing/SharedHosting/SharedHosting';

export interface IndexProps {
  sharedHosts: any;
  navData: any;
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
          <title>هاستینگ | لینوکس | معمولی</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Navbar appIsScrolling={this.state.appIsScrolling} />

        <SharedHosting
          sharedHosts={this.props.sharedHosts}
          navData={this.props.navData}
          page="linux_standard"
          appIsScrolling={this.state.appIsScrolling}
          switchAppIsScrolling={this.switchAppIsScrolling}
        />

        <Footer />
      </div>
    );
  }
}

export async function getServerSideProps(context) {
  const sharedHostsRes = await fetch(
    `https://jsonblob.com/api/jsonBlob/7278ac52-e1a0-11eb-9c37-87e17a3457b8`
  );
  const sharedHosts = await sharedHostsRes.json();

  const navDataRes = await fetch(
    'https://jsonblob.com/api/jsonBlob/14b7037a-e155-11eb-9c37-51d866f9d6a7'
  );
  const navData = await navDataRes.json();

  return {
    props: {
      sharedHosts,
      navData,
    },
  };
}

export default Index;

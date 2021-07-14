import * as React from 'react';
import Head from 'next/head';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import MainPage from '../components/MainPage/MainPage';
import Navbar from '../components/Navbar/Navbar';

export interface IndexProps {
  tablesData: { linuxHosts: any };
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
          <title>هاستینگ جی سرور | فروش هاست لینوکس با کیفیت</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Navbar />

        <Header />

        <MainPage tablesData={this.props.tablesData} />

        <Footer />
      </div>
    );
  }
}

export async function getServerSideProps(context) {
  const linuxHostsRes = await fetch(
    `https://jsonblob.com/api/jsonBlob/7278ac52-e1a0-11eb-9c37-87e17a3457b8`
  );
  const linuxHosts = await linuxHostsRes.json();

  const vpsDataRes = await fetch(
    'https://jsonblob.com/api/jsonBlob/3534965c-e4be-11eb-84d8-a31c8d45a9be'
  );
  const vpsData = await vpsDataRes.json();

  const navDataRes = await fetch(
    'https://jsonblob.com/api/jsonBlob/5402e9a0-e49c-11eb-84d8-39f7df0bb25d'
  );
  const navData = await navDataRes.json();

  const dedicatedServersRes = await fetch(
    'https://jsonblob.com/api/jsonBlob/ab0768a5-e4a8-11eb-84d8-e58710bba8f1'
  );
  const dedicatedServers = await dedicatedServersRes.json();

  return {
    props: {
      tablesData: {
        linuxHosts,
        vps: { navData, tableData: vpsData },
        dedicatedServers,
      },
    },
  };
}

export default Index;

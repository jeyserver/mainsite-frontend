import * as React from 'react';
import Head from 'next/head';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import VpsPricing from '../../components/VpsPricing/VpsPricing';

export interface IndexProps {
  vpsData: any;
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
          <title>سرور مجازی حرفه‌ای</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Navbar />

        <VpsPricing vpsData={this.props.vpsData} type="professional" />

        <Footer />
      </div>
    );
  }
}

export async function getServerSideProps(context) {
  // const data = await fetch(
  //   `${process.env.SCHEMA}://${process.env.DOMAIN}`
  // );

  const vpsDataRes = await fetch(
    'https://jsonblob.com/api/jsonBlob/5e968f2d-df13-11eb-b7ed-fbe0d5824189'
  );
  const vpsData = await vpsDataRes.json();

  return {
    props: { vpsData },
  };
}

export default Index;

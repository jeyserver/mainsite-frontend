import * as React from 'react';
import Head from 'next/head';
import CloudServers from '../../components/CloudServers/CloudServers';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';

export interface IndexProps {
  plans: any;
  countries: any;
  country: string;
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
          <title>cloud servers</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Navbar />

        <CloudServers
          countries={this.props.countries}
          plans={this.props.plans}
          country={this.props.country}
        />

        <Footer />
      </div>
    );
  }
}

export async function getServerSideProps(context) {
  // ${process.env.SCHEMA}://${process.env.DOMAIN}
  const country = context.query.country;

  const plansRes = await fetch(
    `https://jsonblob.com/api/jsonBlob/1bf11e18-d70f-11eb-861d-31dabfa01faa`
  );
  const palansData = await plansRes.json();

  const countriesRes = await fetch(
    `https://jsonblob.com/api/jsonBlob/703354f9-d711-11eb-861d-3905f2e29351`
  );
  const countriesData = await countriesRes.json();

  return {
    props: {
      plans: palansData.plans,
      countries: countriesData.countries,
      country: country,
    },
  };
}

export default Index;

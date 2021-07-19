import * as React from 'react';
import Head from 'next/head';
import ContactUs from '../components/ContactUs/ContactUs';
import Layout from '../components/Layout/Layout';

export interface IndexProps {
  postsForFooter: any;
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
          <title>تماس با ما</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Layout postsForFooter={this.props.postsForFooter}>
          <ContactUs />
        </Layout>
      </div>
    );
  }
}

export async function getServerSideProps(context) {
  const postsForFooterRes = await fetch(
    'https://jsonblob.com/api/jsonBlob/ff048401-e7cd-11eb-971c-9ff88820de62'
  );
  const postsForFooter = await postsForFooterRes.json();

  return {
    props: { postsForFooter },
  };
}

export default Index;

import * as React from 'react';
import Head from 'next/head';
import ServerStatus from '../components/ServerStatus/ServerStatus';
import Layout from '../components/Layout/Layout';
import { IPageProps } from './_app';

enum Status {
  ACTIVE = 1,
  DEACTIVE = 2,
}

export interface IServerStatus {
  title: string;
  hostname: string;
  status: Status;
  update_at: number;
  uptime: number;
  uptimes: number[];
}

interface IProps extends IPageProps {
  servers: IServerStatus[];
}

class Index extends React.Component<IProps> {
  render() {
    return (
      <div dir="rtl">
        <Head>
          <title>وضعیت سرورها</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Layout header={this.props.header} footer={this.props.footer}>
          <ServerStatus servers={this.props.servers} />
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
    `${process.env.SITE_URL}/${locale}/server-status?ajax=1`
  );
  const data = await respone.json();

  return {
    props: {
      ...data,
    },
  };
}

export default Index;
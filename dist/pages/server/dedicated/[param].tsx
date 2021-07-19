import * as React from 'react';
import Head from 'next/head';
import CountryServer from '../../../components/Dedicated/CountryServers/CountryServers';
import CountryPlan from '../../../components/Dedicated/CountryPlan/CountryPlan';
import { countries } from '../../../components/Dedicated/lib/countries';
import Layout from '../../../components/Layout/Layout';

export interface IndexProps {
  countryPlans: {
    status: boolean;
    recommended: [];
    plans: {
      id: number;
      title: string;
      price: number;
      datacenter: { title: string; country: { code: string; name: string } };
      hard: [
        [{ type: string; space: number; price: number; onsell?: boolean }],
        [{ type: string; space: number; price: number; onsell?: boolean }]
      ];
      cpu: {
        type: string;
        title: string;
        cores: number;
        threads: number;
        speed: number;
        num: number;
      };
      bandwidth: number;
      port: number;
      ram: number;
      raid: null;
      setup: number;
      currency: { id: number; title: string; update_at: number };
      sold_out: number;
      status: number;
    }[];
  } | null;
  country: string;
  countryPlan: any | null;
  param: string;
  postsForFooter: any;
}

export interface IndexState {}

class Index extends React.Component<IndexProps, IndexState> {
  constructor(props: IndexProps) {
    super(props);
    this.state = {};
  }
  render() {
    if (this.props.countryPlans) {
      return (
        <div dir="rtl">
          <Head>
            <title>
              سرور اختصاصی{' '}
              {
                countries[
                  this.props.countryPlans.plans[0].datacenter.country.code
                ].title_fa
              }
            </title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <Layout postsForFooter={this.props.postsForFooter}>
            <CountryServer countryPlans={this.props.countryPlans} />
          </Layout>
        </div>
      );
    } else {
      return (
        <div dir="rtl">
          <Head>
            <title> {this.props.countryPlan.title} سرور اختصاصی</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <Layout postsForFooter={this.props.postsForFooter}>
            <CountryPlan countryPlan={this.props.countryPlan} />
          </Layout>
        </div>
      );
    }
  }
}

export async function getServerSideProps(context) {
  const param = context.query.param;

  let countryPlans = null;
  let countryPlan = null;

  const postsForFooterRes = await fetch(
    'https://jsonblob.com/api/jsonBlob/ff048401-e7cd-11eb-971c-9ff88820de62'
  );
  const postsForFooter = await postsForFooterRes.json();

  if (Number(param)) {
    const countryPlanRes = await fetch(
      'https://jsonblob.com/api/jsonBlob/44b4192b-d7e8-11eb-9f33-29283d818ddf'
    );
    countryPlan = await countryPlanRes.json();

    if (!countryPlan.status) {
      return {
        notFound: true,
      };
    }
  } else {
    const countryPlansRes = await fetch(
      `${process.env.SCHEMA}://${process.env.DOMAIN}/fa/server/dedicated/${param}?ajax=1`
    );
    countryPlans = await countryPlansRes.json();

    if (!countryPlans.status) {
      return {
        notFound: true,
      };
    }
  }

  return {
    props: {
      countryPlans,
      countryPlan,
      param: param,
      postsForFooter,
    },
  };
}

export default Index;

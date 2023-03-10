import * as React from 'react';
import Head from 'next/head';
import Domain from '../components/Domain/Domain';
import Layout from '../components/Layout/Layout';
import { IPageProps, ITld, ICurrency } from './_app';

export interface IPost {
  id: number;
  permalink: string;
  title: string;
  date: number;
  description: string;
  author: {
    id: number;
    name: string;
    lastname: string;
    avatar: string;
  };
  content: string;
  image: string;
  view: number;
  status: number;
  comments_count: number;
  blog_relations_posts_categories: {
    post: number;
    category: number;
  };
}

export interface IRoundDomain {
  domain: string;
  tld: ITld;
}

export interface IOptions {
  cheep_border: number;
  start_time: number;
  blog_category: string;
}

interface IProps extends IPageProps {
  status: boolean;
  tlds: ITld[];
  currencies: ICurrency[];
  round_domains: IRoundDomain[];
  total_domain_registered: number;
  options: IOptions;
  blog_posts: IPost[];
  commercialDomains: string[];
}

class Index extends React.Component<IProps> {
  render() {
    return (
      <div dir="rtl">
        <Head>
          <title>خدمات دامنه | ثبت دامنه</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Layout header={this.props.header} footer={this.props.footer}>
          <Domain
            tlds={this.props.tlds}
            roundDomains={this.props.round_domains}
            totalDomainRegistered={this.props.total_domain_registered}
            options={this.props.options}
            posts={this.props.blog_posts}
            commercialDomains={this.props.commercialDomains}
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

  const respone = await fetch(
    `${process.env.SITE_URL}/${locale}/domain?ajax=1`
  );
  const data = await respone.json();

  const commercialDomains = [
    'com',
    'net',
    'org',
    'biz',
    'work',
    'agency',
    'bid',
    'company',
    'holdings',
    'institute',
    'limited',
    'money',
  ];

  return {
    props: {
      ...data,
      commercialDomains,
    },
  };
}

export default Index;

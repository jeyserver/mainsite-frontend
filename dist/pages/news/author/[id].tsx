import * as React from 'react';
import Head from 'next/head';
import News from '../../../components/News/News';
import Layout from '../../../components/Layout/Layout';
import { pageProps } from './../../_app';

export interface IndexProps extends pageProps {
  postsData: {
    status: boolean;
    user: {
      id: number;
      name: string;
    };
    items: {
      id: number;
      title: string;
      date: number;
      user: {
        id: number;
        name: string;
      };
      comments: number;
      description: string;
      author: number;
      content: string;
      image: string;
      view: number;
      status: number;
    }[];
    items_per_page: number;
    current_page: number;
    total_items: number;
  };
  mostViewedNews: any;
  newsArchive: number[];
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
          <title>نوشته های {this.props.postsData.user.name}</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Layout
          postsForFooter={this.props.postsForFooter}
          domainsForNavbar={this.props.domainsForNavbar}
          licensesForNavbar={this.props.licensesForNavbar}
        >
          <News
            headerTitle={`نوشته های ${this.props.postsData.user.name}`}
            postsData={this.props.postsData}
            mostViewedNews={this.props.mostViewedNews}
            newsArchive={this.props.newsArchive}
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

  const curPage = context.query.page ? context.query.page : 1;
  const ipp = context.query.ipp ? context.query.ipp : 10;

  // const postsDataRes = await fetch(
  //   `${process.env.SCHEMA}://${process.env.DOMAIN}/fa/news?page=${curPage}&ipp=${ipp}&ajax=1`
  // );
  // const postsData = await postsDataRes.json();

  const postsDataRes = await fetch(
    `https://jsonblob.com/api/jsobBlob/69e72cd5-e534-11eb-931c-e97e85a950b6`
  );
  const postsData = await postsDataRes.json();

  const mostViewedNewsRes = await fetch(
    'https://jsonblob.com/api/jsobBlob/922e55bb-de42-11eb-80f0-3966496a21f4'
  );
  const mostViewedNews = await mostViewedNewsRes.json();

  const newsArchiveRes = await fetch(
    'https://jsonblob.com/api/jsobBlob/32c9b931-de46-11eb-80f0-11e165911648'
  );
  const newsArchive = await newsArchiveRes.json();

  return {
    props: {
      postsData: { ...postsData, current_page: curPage },
      mostViewedNews,
      newsArchive,
    },
  };
}

export default Index;

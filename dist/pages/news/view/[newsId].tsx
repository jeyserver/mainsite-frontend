import * as React from 'react';
import Head from 'next/head';
import ViewNews from '../../../components/News/ViewNews/ViewNews';
import Layout from '../../../components/Layout/Layout';

export interface IndexProps {
  postData: {
    id: number;
    title: string;
    date: number;
    user: {
      id: number;
      name: string;
    };
    comments: any;
    description: string;
    author: number;
    content: string;
    image: string;
    view: number;
    status: number;
  };
  mostViewedNews: any;
  newsArchive: number[];
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
          <title>{this.props.postData.title}</title>
          <meta name="description" content={this.props.postData.description} />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Layout postsForFooter={this.props.postsForFooter}>
          <ViewNews
            postData={this.props.postData}
            mostViewedNews={this.props.mostViewedNews}
            newsArchive={this.props.newsArchive}
          />
        </Layout>
      </div>
    );
  }
}

export async function getServerSideProps(context) {
  const newsId = context.query.newsId;

  // const postDataRes = await fetch(
  //   `${process.env.SCHEMA}://${process.env.DOMAIN}/fa/news/view/${newsId}?ajax=1`
  // );
  // const postData = await postDataRes.json();

  // // 404
  // if (!postData.status) {
  //   return {
  //     notFound: true,
  //   };
  // }

  const postsForFooterRes = await fetch(
    'https://jsonblob.com/api/jsonBlob/ff048401-e7cd-11eb-971c-9ff88820de62'
  );
  const postsForFooter = await postsForFooterRes.json();

  const postDataRes = await fetch(
    `https://jsonblob.com/api/jsobBlob/ce905c51-de4c-11eb-80f0-81ce1174db56`
  );
  const postData = await postDataRes.json();

  const mostViewedNewsRes = await fetch(
    'https://jsonblob.com/api/jsobBlob/922e55bb-de42-11eb-80f0-3966496a21f4'
  );
  const mostViewedNews = await mostViewedNewsRes.json();

  const newsArchiveRes = await fetch(
    'https://jsonblob.com/api/jsobBlob/32c9b931-de46-11eb-80f0-11e165911648'
  );
  const newsArchive = await newsArchiveRes.json();

  return {
    props: { postData, mostViewedNews, newsArchive, postsForFooter },
  };
}

export default Index;

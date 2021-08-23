import * as React from 'react';
import Head from 'next/head';
import Posts from '../../../components/Blog/Posts/Posts';
import Layout from '../../../components/Layout/Layout';
import { pageProps } from '../../_app';

export interface IndexProps extends pageProps {
  posts: any;
  categories: any;
  page: { currentPage: number | null; all: number };
  param: { category?: string[]; tag?: string; search?: string };
  topNavTitle: string;
}

export interface IndexState {}

class Index extends React.Component<IndexProps, IndexState> {
  constructor(props: IndexProps) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div dir="rtl" id="blog-category">
        <Head>
          <title>جی بلاگ | {this.props.param.category}</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Layout
          postsForFooter={this.props.postsForFooter}
          domainsForNavbar={this.props.domainsForNavbar}
          licensesForNavbar={this.props.licensesForNavbar}
        >
          <Posts
            param={this.props.param}
            topNavTitle={this.props.topNavTitle}
            categories={this.props.categories}
            posts={this.props.posts}
            page={this.props.page}
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

  const category = context.query.category;
  const currentPage = context.query.page ? context.query.page : null;

  const postsRes = await fetch(
    'https://jsonblob.com/api/jsonBlob/d8eccd84-d821-11eb-9f33-07821a14b37b'
  );
  const postsData = await postsRes.json();

  const categoriesRes = await fetch(
    'https://jsonblob.com/api/jsonBlob/7bc3650b-d8c2-11eb-8f97-fba7e85c29a8'
  );
  const categoriesData = await categoriesRes.json();

  const topNavTitle = category;
  const param = { category: categoriesData.paths[category] };

  return {
    props: {
      posts: postsData,
      categories: categoriesData.categories,
      topNavTitle,
      param,
      page: { currentPage, all: 2 },
    },
  };
}

export default Index;

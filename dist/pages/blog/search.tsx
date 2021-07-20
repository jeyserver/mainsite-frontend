import * as React from 'react';
import Head from 'next/head';
import Footer from './../../components/Footer/Footer';
import Navbar from './../../components/Navbar/Navbar';
import Posts from '../../components/Blog/Posts/Posts';

export interface IndexProps {
  posts: any;
  categories: any;
  param: { category?: string[]; tag?: string; search?: string };
  topNavTitle: string;
  page: { currentPage: number | null; all: number };
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
          <title>
            جی بلاگ | جستجو | نتایج جستجوی {this.props.param.search}
          </title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Navbar />

        <Posts
          param={this.props.param}
          topNavTitle={this.props.topNavTitle}
          categories={this.props.categories}
          posts={this.props.posts}
          page={this.props.page}
        />

        <Footer />
      </div>
    );
  }
}

export async function getServerSideProps(context) {
  const word = context.query.word;

  // 404
  if (!word) {
    return {
      notFound: true,
    };
  }

  const topNavTitle = `نتایج جستجوی "${word}"`;
  const param = { search: word };
  const currentPage = context.query.page ? context.query.page : null;

  const postsRes = await fetch(
    'https://jsonblob.com/api/jsonBlob/d8eccd84-d821-11eb-9f33-07821a14b37b'
  );
  const postsData = await postsRes.json();

  const categoriesRes = await fetch(
    'https://jsonblob.com/api/jsonBlob/7bc3650b-d8c2-11eb-8f97-fba7e85c29a8'
  );
  const categoriesData = await categoriesRes.json();

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
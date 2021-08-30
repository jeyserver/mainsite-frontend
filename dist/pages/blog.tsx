import * as React from 'react';
import Head from 'next/head';
import MainPage from '../components/Blog/MainPage/MainPage';
import Layout from '../components/Layout/Layout';
import { IPageProps } from './_app';
import IPost from '../helper/types/blog/Post';
import ICategory from '../helper/types/blog/Category';
import IPopularPost from '../helper/types/blog/PopularPost';

interface IProps extends IPageProps {
  status: boolean;
  items: IPost[];
  items_per_page: number;
  current_page: number;
  total_items: number;
  categories: ICategory[];
  popular_posts: IPopularPost[];
  archives: { date: number; posts: number }[];
}

class Index extends React.Component<IProps> {
  render() {
    return (
      <div dir="rtl" id="blog">
        <Head>
          <title>جی بلاگ | آموزش ها و مقالات کاربردی برای وبمستران</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Layout
          postsForFooter={this.props.postsForFooter}
          domainsForNavbar={this.props.domainsForNavbar}
          licensesForNavbar={this.props.licensesForNavbar}
        >
          <MainPage
            recentPosts={this.props.items}
            popularPosts={this.props.popular_posts}
            categories={this.props.categories}
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
    `${process.env.SCHEMA}://${process.env.DOMAIN}/${locale}/blog?ajax=1`
  );
  const data = await respone.json();

  return {
    props: {
      ...data,
    },
  };
}

export default Index;

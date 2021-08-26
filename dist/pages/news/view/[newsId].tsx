import * as React from 'react';
import Head from 'next/head';
import ViewNews from '../../../components/News/ViewNews/ViewNews';
import Layout from '../../../components/Layout/Layout';
import { IPageProps } from './../../_app';
import IPost from '../../../helper/types/news/Post';
import IPopularPost from '../../../helper/types/news/PopularPost';
import IComment from '../../../helper/types/news/Comment';

interface IProps extends IPageProps {
  status: boolean;
  post: IPost;
  comments: IComment[];
  popular_posts: IPopularPost[];
  archives: { [T: string]: number };
}

class Index extends React.Component<IProps> {
  render() {
    return (
      <div dir="rtl">
        <Head>
          <title>{this.props.post.title}</title>
          <meta name="description" content={this.props.post.description} />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Layout
          postsForFooter={this.props.postsForFooter}
          domainsForNavbar={this.props.domainsForNavbar}
          licensesForNavbar={this.props.licensesForNavbar}
        >
          <ViewNews
            post={this.props.post}
            comments={this.props.comments}
            popular_posts={this.props.popular_posts}
            archives={this.props.archives}
          />
        </Layout>
      </div>
    );
  }
}

export async function getServerSideProps(context) {
  const locale = context.locale;
  const newsId = context.query.newsId;

  if (locale !== 'fa') {
    return {
      notFound: true,
    };
  }

  const respone = await fetch(
    `${process.env.SCHEMA}://${process.env.DOMAIN}/${locale}/news/view/${newsId}?ajax=1`
  );
  const data = await respone.json();

  // 404
  if (!data.status) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      ...data,
    },
  };
}

export default Index;

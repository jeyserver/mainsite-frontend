import * as React from 'react';
import Head from 'next/head';
import News from '../../../components/News/News';
import Layout from '../../../components/Layout/Layout';
import { IPageProps } from './../../_app';
import IPost from '../../../helper/types/news/Post';
import IPopularPost from '../../../helper/types/news/PopularPost';

interface IProps extends IPageProps {
  status: boolean;
  items: IPost[];
  items_per_page: number;
  current_page: number;
  total_items: number;
  popular_posts: IPopularPost[];
  archives: { [T: string]: number };
}

class Index extends React.Component<IProps> {
  render() {
    const author = `${this.props.items[0].author.name} ${this.props.items[0].author.lastname}`;

    return (
      <div dir="rtl">
        <Head>
          <title>نوشته های {author}</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Layout header={this.props.header} footer={this.props.footer}>
          <News
            headerTitle={`نوشته های ${author}`}
            items={this.props.items}
            itemsPerPage={this.props.items_per_page}
            currentPage={this.props.current_page}
            totalItems={this.props.total_items}
            popularPosts={this.props.popular_posts}
            archives={this.props.archives}
          />
        </Layout>
      </div>
    );
  }
}

export async function getServerSideProps(context) {
  const locale = context.locale;
  const curPage = context.query.page ? context.query.page : 1;
  const ipp = context.query.ipp ? context.query.ipp : 10;
  const authorId = context.query.id;

  if (locale !== 'fa') {
    return {
      notFound: true,
    };
  }

  const respone = await fetch(
    `${process.env.SITE_URL}/${locale}/news/author/${authorId}?page=${curPage}&ipp=${ipp}&ajax=1`
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

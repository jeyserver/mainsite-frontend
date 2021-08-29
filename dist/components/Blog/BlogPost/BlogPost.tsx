import * as React from 'react';
import TopNav from '../TopNav/TopNav';
import { Container, Row, Col } from 'react-bootstrap';
import Post from './Post/Post';
import MostViewedPosts from '../MostViewedPosts/MostViewedPosts';
import IPost from '../../../helper/types/blog/Post';
import ICategory from '../../../helper/types/blog/Category';
import IComment from '../../../helper/types/blog/Comment';
import moment from 'jalali-moment';
import styles from './BlogPost.module.scss';
import NewsletterForm from '../NewsletterForm/NewsletterForm';
import IPopularPost from '../../../helper/types/blog/PopularPost';

interface IProps {
  post: IPost;
  comments: IComment[];
  categories: ICategory[];
  popularPosts: IPopularPost[];
}

class BlogPost extends React.Component<IProps> {
  render() {
    return (
      <section className={styles.blogPost}>
        <TopNav
          nightMode={true}
          categories={this.props.categories}
          page="post"
          title="آموزش ها و مقالات کاربردی برای وبمستران"
        />

        <Container fluid>
          <Row>
            <Col xl={2} className="d-none d-xl-block"></Col>
            <Col md={12} lg={9} xl={7} className="px-0 px-md-5">
              <Post
                post={this.props.post}
                comments={
                  this.props.comments
                  //   [
                  //   {
                  //     id: 1,
                  //     avatar: 'https://randomuser.me/api/portraits/women/81.jpg',
                  //     name: 'test1',
                  //     text: 'body test 1',
                  //     reply: null,
                  //     date: moment() / 1000,
                  //     site: null,
                  //   },
                  //   {
                  //     id: 2,
                  //     avatar: 'https://randomuser.me/api/portraits/women/29.jpg',
                  //     name: 'test2',
                  //     text: 'body test 2',
                  //     reply: null,
                  //     date: moment() / 1000,
                  //     site: null,
                  //   },
                  //   {
                  //     id: 3,
                  //     avatar: 'https://randomuser.me/api/portraits/women/90.jpg',
                  //     name: 'test3',
                  //     text: 'body test 3',
                  //     reply: 1,
                  //     date: moment() / 1000,
                  //     site: null,
                  //   },
                  // ]
                }
              />
            </Col>
            <Col md={12} lg={3} xl={3} className="d-none d-lg-block">
              <NewsletterForm />
            </Col>
          </Row>
        </Container>

        <MostViewedPosts posts={this.props.popularPosts} />

        <Col className={styles.newslettersFormOnMobile}>
          <NewsletterForm />
        </Col>
      </section>
    );
  }
}

export default BlogPost;

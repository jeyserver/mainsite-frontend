import * as React from 'react';
import TopNav from '../TopNav/TopNav';
import { Container, Row, Col } from 'react-bootstrap';
import Post from './Post/Post';
import MostViewedPosts from '../MostViewedPosts/MostViewedPosts';
import ReactPaginate from 'react-paginate';
import { NextRouter, withRouter } from 'next/router';
import ICategory from '../../../helper/types/blog/Category';
import IPost from '../../../helper/types/blog/Post';
import IPopularPost from '../../../helper/types/blog/PopularPost';
import styles from './Posts.module.scss';
import { connect } from 'react-redux';
import { RootState } from '../../../store';
import classNames from 'classnames';
import NewsletterForm from '../NewsletterForm/NewsletterForm';

interface param {
  tag?: string;
  search?: string;
  category?: ICategory;
  breedcrumb?: ICategory[];
}

interface IProps {
  categories: ICategory[];
  posts: IPost[];
  popularPosts: IPopularPost[];
  router: NextRouter;
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  theme: RootState['theme'];
  topNavTitle: string;
  param: param;
  newsletterToken: string;
}

class BlogCategory extends React.Component<IProps> {
  changePage(page) {
    this.props.router.push({
      query: { ...this.props.router.query, page: page.selected + 1 },
    });
  }

  render() {
    return (
      <section
        className={classNames(styles.blogCategory, {
          [styles.dark]: this.props.theme.current === 'dark',
        })}
      >
        <TopNav
          nightMode={true}
          categories={this.props.categories}
          title={this.props.topNavTitle}
          param={this.props.param}
        />

        <Container fluid>
          <Row>
            <Col xl={2} className="d-none d-xl-block"></Col>
            <Col md={12} lg={9} xl={7}>
              <div className={styles.posts}>
                {this.props.posts.map((post, index) => {
                  if (index < 3) {
                    return <Post post={post} key={index} />;
                  }
                })}
              </div>

              <ReactPaginate
                previousLabel={<i className="fas fa-caret-right"></i>}
                nextLabel={<i className="fas fa-caret-left"></i>}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={this.props.totalItems / this.props.itemsPerPage}
                initialPage={this.props.currentPage - 1}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={(page) => this.changePage(page)}
                disableInitialCallback={true}
                containerClassName={styles.pagination}
                activeClassName={styles.active}
                previousClassName={styles.previous}
                nextClassName={styles.next}
              />
            </Col>
            <Col md={12} lg={3} xl={3} className="d-none d-lg-block">
              <NewsletterForm token={this.props.newsletterToken} />
            </Col>
          </Row>
        </Container>

        <MostViewedPosts posts={this.props.popularPosts} />

        <Col className={styles.newslettersFormOnMobile}>
          <NewsletterForm token={this.props.newsletterToken} />
        </Col>
      </section>
    );
  }
}

export default connect((state: RootState) => {
  return {
    theme: state.theme,
  };
})(withRouter(BlogCategory));

import * as React from 'react';
import { Container, Col, Row, Image } from 'react-bootstrap';
import Link from 'next/link';
import ReactPaginate from 'react-paginate';
import styles from './News.module.scss';
import moment from 'jalali-moment';
import { NextRouter, withRouter } from 'next/router';
import MostViewedNews from './MostViewedNews/MostViewedNews';
import NewsArchive from './NewsArchive/NewsArchive';
import IPopularPost from '../../helper/types/news/PopularPost';
import IPost from '../../helper/types/news/Post';
import PagesHeader from '../PagesHeader/PagesHeader';

interface IProps {
  items: IPost[];
  itemsPerPage: number;
  currentPage: number;
  totalItems: number;
  popularPosts: IPopularPost[];
  archives: { [T: string]: number };
  headerTitle: string;
  router: NextRouter;
}

class News extends React.Component<IProps> {
  render() {
    const lastPage = Math.round(
      this.props.totalItems / this.props.itemsPerPage
    );

    return (
      <section>
        <PagesHeader title={this.props.headerTitle} />

        <div className={styles.contentWrapper}>
          <Container>
            <Row>
              <Col lg={8}>
                <div className={styles.blogPosts}>
                  {this.props.items.map((post) => (
                    <div className={styles.mediaPost} key={post.id}>
                      <Row>
                        <Col md={3}>
                          <Image
                            src={post.image}
                            width="150px"
                            height="150px"
                            alt={post.title}
                          />
                        </Col>
                        <Col md={9}>
                          <div className={styles.mediaBody}>
                            <Link href={`/news/view/${post.id}`}>
                              <a>
                                <h4 className={styles.mediaHeading}>
                                  {post.title}
                                </h4>
                              </a>
                            </Link>
                            <ul className={styles.list}>
                              <li>
                                <Link href={`/news/author/${post.author.id}`}>
                                  <a>
                                    <i className="fa fa-user" />{' '}
                                    {`${post.author.name} ${post.author.lastname}`}{' '}
                                  </a>
                                </Link>
                              </li>
                              <li>|</li>
                              <li>
                                <Link
                                  href={`/news/archive/${moment(
                                    post.date * 1000
                                  )
                                    .locale('fa')
                                    .format('YYYY')}/${moment(post.date * 1000)
                                    .locale('fa')
                                    .format('DD')}`}
                                >
                                  <a>
                                    <i className="far fa-calendar-alt"></i>{' '}
                                    {moment(post.date * 1000)
                                      .locale('fa')
                                      .format('dddd DD MMM YYYY')}
                                  </a>
                                </Link>
                              </li>
                              <li>|</li>
                              <span>
                                <i className="far fa-comment" />{' '}
                                {post.comments_count
                                  ? `${post.comments_count} نظر`
                                  : 'بدون نظر'}
                              </span>
                            </ul>
                            <p />
                            <div
                              className={styles.content}
                              dangerouslySetInnerHTML={{ __html: post.content }}
                            ></div>
                            <p />
                            <div className={styles.postLinkWrapper}>
                              <Link href={`/news/view/${post.id}`}>
                                <a>ادامه خبر</a>
                              </Link>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  ))}
                </div>
                <hr className={styles.breakLine} />
                <div className="d-flex justify-content-center d-md-none">
                  <div className={styles.newsPaginateOnMobile}>
                    {this.props.currentPage !== 1 && (
                      <button className={styles.firstPage}>
                        <Link href={{ query: { ipp: 10, page: 1 } }}>
                          <a>
                            <i className="fas fa-angle-double-right"></i>
                            اولین
                          </a>
                        </Link>
                      </button>
                    )}

                    <button
                      disabled={this.props.currentPage === 1}
                      className={styles.prevBtn}
                    >
                      {this.props.currentPage === 1 ? (
                        <span>قبلی</span>
                      ) : (
                        <Link
                          href={{
                            pathname: '/news',
                            query: {
                              ipp: 10,
                              page: this.props.currentPage - 1,
                            },
                          }}
                        >
                          <a>قبلی</a>
                        </Link>
                      )}
                    </button>

                    <button className={styles.currentPage}>
                      <span>{this.props.currentPage}</span>
                    </button>

                    <button
                      disabled={this.props.currentPage === lastPage}
                      className={styles.nextBtn}
                    >
                      {this.props.currentPage === lastPage ? (
                        <span>بعدی</span>
                      ) : (
                        <Link
                          href={{
                            pathname: '/news',
                            query: {
                              ipp: 10,
                              page: this.props.currentPage + 1,
                            },
                          }}
                        >
                          <a>بعدی</a>
                        </Link>
                      )}
                    </button>

                    {this.props.currentPage !== lastPage && (
                      <button className={styles.lastPage}>
                        <Link
                          href={{
                            pathname: '/news',
                            query: { ipp: 10, page: lastPage },
                          }}
                        >
                          <a>
                            اخرین
                            <i className="fas fa-angle-double-left"></i>
                          </a>
                        </Link>
                      </button>
                    )}
                  </div>
                </div>

                <div className="d-none d-md-flex justify-content-md-end">
                  <div className="news-paginate">
                    <ReactPaginate
                      previousLabel={'قبلی'}
                      nextLabel={'بعدی'}
                      breakLabel={'...'}
                      breakClassName={'break-me'}
                      pageCount={lastPage}
                      initialPage={this.props.currentPage - 1}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={5}
                      onPageChange={(page) =>
                        this.props.router.push({
                          query: { page: page.selected + 1, ipp: 10 },
                        })
                      }
                      disableInitialCallback={true}
                      containerClassName={'pagination'}
                      activeClassName={'active'}
                    />
                  </div>
                </div>
              </Col>
              <Col lg={3}>
                <MostViewedNews popularPosts={this.props.popularPosts} />
                <NewsArchive archives={this.props.archives} />
              </Col>
            </Row>
          </Container>
        </div>
      </section>
    );
  }
}

export default withRouter(News);

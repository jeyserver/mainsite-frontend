import * as React from 'react';
import { Container, Col, Row, Image } from 'react-bootstrap';
import Link from 'next/link';
import ReactPaginate from 'react-paginate';
import styles from './News.module.scss';
import moment from 'jalali-moment';
import { NextRouter, withRouter } from 'next/router';
import MostViewedNews from './MostViewedNews/MostViewedNews';
import NewsArchive from './NewsArchive/NewsArchive';

export interface NewsProps {
  postsData: {
    status: boolean;
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
  router: NextRouter;
  mostViewedNews: any;
  newsArchive: number[];
  headerTitle: string;
}

export interface NewsState {}

class News extends React.Component<NewsProps, NewsState> {
  constructor(props: NewsProps) {
    super(props);
    this.state = {};
    this.changeCurPage = this.changeCurPage.bind(this);
  }

  changeCurPage(page) {
    this.props.router.push({ query: { page: page.selected + 1, ipp: 10 } });
  }

  render() {
    const lastPage = Math.round(
      this.props.postsData.total_items / this.props.postsData.items_per_page
    );

    const currentPage = Number(this.props.postsData.current_page);

    return (
      <section>
        <div className={styles.innerBanner}>
          <Container>
            <h2 className="text-center">{this.props.headerTitle}</h2>
          </Container>
        </div>

        <div className={styles.contentWrapper}>
          <Container>
            <Row>
              <Col lg={8}>
                <div className={styles.blogPosts}>
                  {this.props.postsData.items.map((post) => (
                    <div className={styles.mediaPost} key={post.id}>
                      <Row>
                        <Col md={3}>
                          <Image
                            src={
                              post.image
                                ? `${process.env.SCHEMA}://${process.env.DOMAIN}/packages/news/${post.image}`
                                : '/images/defaultimage.jpg'
                            }
                            width="150px"
                            height="150px"
                            alt={post.title}
                          />
                        </Col>
                        <Col md={9}>
                          <div className={styles.mediaBody}>
                            <Link href={`/fa/news/view/${post.id}`}>
                              <a>
                                <h4 className={styles.mediaHeading}>
                                  {post.title}
                                </h4>
                              </a>
                            </Link>
                            <ul className={styles.list}>
                              <li>
                                <Link href={`/fa/news/author/${post.user.id}`}>
                                  <a>
                                    <i className="fa fa-user" />{' '}
                                    {post.user.name}{' '}
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
                                {post.comments
                                  ? `${post.comments} نظر`
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
                    {currentPage !== 1 && (
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
                      disabled={currentPage === 1}
                      className={styles.prevBtn}
                    >
                      {currentPage === 1 ? (
                        <span>قبلی</span>
                      ) : (
                        <Link
                          href={{
                            query: {
                              ipp: 10,
                              page: currentPage - 1,
                            },
                          }}
                        >
                          <a>قبلی</a>
                        </Link>
                      )}
                    </button>

                    <button className={styles.currentPage}>
                      <Link href="/fisrtone">
                        <a>{currentPage}</a>
                      </Link>
                    </button>

                    <button
                      disabled={currentPage === lastPage}
                      className={styles.nextBtn}
                    >
                      {currentPage === lastPage ? (
                        <span>بعدی</span>
                      ) : (
                        <Link
                          href={{
                            query: {
                              ipp: 10,
                              page: currentPage + 1,
                            },
                          }}
                        >
                          <a>بعدی</a>
                        </Link>
                      )}
                    </button>

                    {currentPage !== lastPage && (
                      <button className={styles.lastPage}>
                        <Link href={{ query: { ipp: 10, page: lastPage } }}>
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
                      initialPage={this.props.postsData.current_page - 1}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={5}
                      onPageChange={(page) => this.changeCurPage(page)}
                      disableInitialCallback={true}
                      containerClassName={'pagination'}
                      activeClassName={'active'}
                    />
                  </div>
                </div>
              </Col>
              <Col lg={3}>
                <MostViewedNews mostViewedNews={this.props.mostViewedNews} />
                <NewsArchive newsArchive={this.props.newsArchive} />
              </Col>
            </Row>
          </Container>
        </div>
      </section>
    );
  }
}

export default withRouter(News);

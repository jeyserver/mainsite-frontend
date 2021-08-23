import * as React from 'react';
import Link from 'next/link';
import { Container, Row, Col, Image } from 'react-bootstrap';
import styles from './Footer.module.scss';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import { FooterPost } from '../../pages/_app';

export interface FooterProps {
  posts: FooterPost[];
}

export interface FooterState {
  newsLettersbtnLoading: boolean;
}

class Footer extends React.Component<FooterProps, FooterState> {
  constructor(props: FooterProps) {
    super(props);
    this.state = {
      newsLettersbtnLoading: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const email = e.target.elements.email;
    this.setState({ newsLettersbtnLoading: true });

    axios(
      'https://jsonblob.com/api/jsonBlob/af833cde-87c6-11eb-96ff-0fc9de054d2f'
    )
      .then(() => {
        NotificationManager.success('ایمیل شما با موفقیت ثبت شد.', '');
        email.value = '';
        this.setState({ newsLettersbtnLoading: false });
      })
      .catch(() => {
        NotificationManager.error(
          'ارتباط با سامانه بدرستی انجام نشد، لطفا مجددا تلاش کنید.',
          'خطا'
        );
        this.setState({ newsLettersbtnLoading: false });
      });
  }

  render() {
    return (
      <footer className={styles.footer}>
        <Container className={styles.topFooter} fluid="lg">
          <Row>
            <Col xs={12} md={3}>
              <div className={styles.info}>
                <div className={styles.logoWrapper}>
                  <Image src="/logo.png" />
                  <span>جی سرور</span>
                </div>
                <p>
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و
                  با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و
                  مجله در ستون و سطرآنچنان که لازم است
                </p>
              </div>
            </Col>
            <Col xs={12} md={3}>
              <div className={styles.contactUs}>
                <h3>تماس با ما</h3>
                <ul>
                  <li>
                    <i className="fas fa-home"></i>
                    <span>
                      اصفهان - خیابان رباط دوم - ساختمان شمشاد - واحد 4
                    </span>
                  </li>
                  <li>
                    <a href="tel:03134420301">
                      <i className="fas fa-phone"></i>
                      <span>031-34420301</span>
                    </a>
                  </li>
                  <li>
                    <a href="mailto:info@jeyserver.com">
                      <i className="far fa-envelope"></i>
                      <span>info [AT] jeyserver.com</span>
                    </a>
                  </li>
                </ul>
              </div>
            </Col>
            <Col xs={12} md={3}>
              <div className={styles.blogLinks}>
                <h3>مطالب آموزشی بلاگ</h3>
                <ul>
                  {this.props.posts.slice(0, 5).map((post) => (
                    <li key={post.permalink}>
                      <Link href={`/blog/${post.permalink}`}>
                        <a>
                          <i className="far fa-edit"></i>
                          <span>{post.title}</span>
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Col>
            <Col
              xs={12}
              md={3}
              className="d-flex justify-content-start justify-content-md-end"
            >
              <div className={styles.enamad}>
                <h3>نماد اعتماد الکترونیکی</h3>
                <a
                  target="_blank"
                  href="https://trustseal.enamad.ir/?id=22081&Code=ulnW1nDLAeYM3cL2l9U3"
                >
                  <Image src="/images/enamad.png" />
                </a>
              </div>
            </Col>
          </Row>
        </Container>
        <div className={styles.middleFooter}>
          <Container fluid="lg">
            <Row className="align-items-center">
              <Col xs={12} md={6}>
                <div className={styles.newsLettersForm}>
                  <h3>
                    ﺑﺎ ﻋﻀﻮﯾﺖ در ﺧﺒﺮﻧﺎﻣﻪ ﺟﯽ ﺳﺮور، ﺟﺪﯾﺪﺗﺮﯾﻦ آﻣﻮزش ﻫﺎ را درﯾﺎﻓﺖ
                    ﮐﻨﯿﺪ!
                  </h3>
                  <form onSubmit={this.onSubmit}>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="ایمیل خود را وارد کنید..."
                    />
                    <button
                      type="submit"
                      disabled={this.state.newsLettersbtnLoading}
                    >
                      {this.state.newsLettersbtnLoading ? (
                        <div className={styles.loadingBox}></div>
                      ) : (
                        'ثبت نام'
                      )}
                    </button>
                  </form>
                </div>
              </Col>
              <Col xs={12} md={6}>
                <div className={styles.socialNetworks}>
                  <div className={styles.info}>
                    ما را در شبکه های اجتماعی دنبال کنید:
                  </div>
                  <div className={styles.socialNetworksLinks}>
                    <div>
                      <a href="https://www.instagram.com/jeyservercom">
                        <i className="fab fa-instagram"></i>
                      </a>
                    </div>
                    <div>
                      <a href="https://telegram.me/jeyserver">
                        <i className="fab fa-telegram-plane"></i>
                      </a>
                    </div>
                    <div>
                      <a href="https://www.twitter.com/jeyserver">
                        <i className="fab fa-twitter"></i>
                      </a>
                    </div>
                    <div>
                      <a href="https://www.jeyserver.com/fa/news/rss">
                        <i className="fab fa-linkedin"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <div className={styles.bottomFooter}>
          <Container fluid="lg">
            <Row className="align-items-center">
              <Col
                xs={12}
                md={6}
                className="d-flex justify-content-center justify-content-md-start"
              >
                <div className={styles.rightSide}>
                  <span>کلیه حقوق مادی و معنوی این سایت محفوظ می باشد.</span>
                  <Link href="/terms">
                    <a> قوانین</a>
                  </Link>{' '}
                  |{' '}
                  <Link href="/policy">
                    <a>خط مشی ها</a>
                  </Link>
                </div>
              </Col>
              <Col
                xs={12}
                md={6}
                className="d-flex justify-content-center justify-content-md-end"
              >
                <ul className={styles.bottomLinksList}>
                  <li>
                    <Link href="/blog">
                      <a>
                        <i className="fas fa-circle"></i>
                        بلاگ جی سرور
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/profile">
                      <a>
                        <i className="fas fa-circle"></i>
                        پنل کاربری
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/news">
                      <a>
                        <i className="fas fa-circle"></i>
                        اخبار
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/faqs">
                      <a>
                        <i className="fas fa-circle"></i>
                        سوالات متداول
                      </a>
                    </Link>
                  </li>
                </ul>
              </Col>
            </Row>
          </Container>
        </div>
      </footer>
    );
  }
}

export default Footer;

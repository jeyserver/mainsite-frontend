import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './Footer.module.scss';

export interface FooterProps {}

export interface FooterState {}

class Footer extends React.Component<FooterProps, FooterState> {
  constructor(props: FooterProps) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <footer className={styles.footer}>
        <Container className={styles.topFooter}>
          <Row>
            <Col xs={12} md={3} className="pt-30 px-3 px-md-3">
              <div className="d-flex flex-column align-items-center w-100">
                <Image src="/logo-header.png" width="171px" height="35px" />
                <div className={styles.space}>
                  <h2>
                    <a href="/fa/server/vps"> سرور مجازی </a>
                  </h2>
                  <h3>
                    <a href="/fa/hosting/linux/standard"> هاست لینوکس </a>
                  </h3>
                  <h3>
                    <a href="/fa/hosting/linux/standard"> هاست ایران </a>
                  </h3>
                  <h4>
                    <a href="/fa/hosting/file"> هاست دانلود </a>
                  </h4>
                  <h3>
                    <a href="/fa/domain"> دامنه ارزان </a>
                  </h3>
                  <h2>
                    <a href="/fa/licenses/directadmin"> لایسنس دایرکت ادمین </a>
                  </h2>
                  <h4>
                    <a href="/fa/server/dedicated/germany"> سرور آلمان </a>
                  </h4>
                  <h4>
                    <a href="/fa/reseller/hosting/linux/directadmin">
                      نمایندگی دایرکت ادمین
                    </a>
                  </h4>
                </div>
              </div>
            </Col>
            <Col xs={12} md={3} className="pt-30 px-3 px-md-3">
              <div className={styles.contactWithUs}>
                <h3>تماس با ما</h3>
                <p>
                  شما هم اکنون میتوانید با اوپراتور های ما بصورت رایگان از طریق
                  سیستم گفتگوی آنلاین صحبت کنید و پاسخ پرسش هایتان را دریافت
                  کنید.
                </p>
                <ul>
                  <li>
                    <i className="fas fa-map-marker-alt"></i>
                    <strong> آدرس:</strong>
                    <span>
                      {' '}
                      اصفهان - خیابان رباط دوم - ساختمان شمشاد - واحد 4
                    </span>
                  </li>
                  <li>
                    <i className="fas fa-phone-alt"></i>
                    <strong> تلفن تماس: </strong>
                    <span> 34420301-031</span>
                  </li>
                  <li>
                    <i className="fas fa-envelope"></i>
                    <strong> ایمیل:</strong>
                    <span> info [AT] jeyserver.com</span>
                  </li>
                </ul>
              </div>
            </Col>
            <Col xs={12} md={3} className="pt-30 px-3 px-md-3">
              <div className={styles.educationalContent}>
                <h3>مطالب آموزشی</h3>
                <ul>
                  <li>
                    <i className="fas fa-star"></i>
                    <Link href="/fa/blog/how-to-install-go-on-ubuntu-18-04">
                      <a>نصب Go برروی اوبونتو 18.04</a>
                    </Link>
                  </li>
                  <li>
                    <i className="fas fa-star"></i>
                    <Link href="/fa/blog/how-to-install-node-js-on-ubuntu-18-04">
                      <a>نصب Node.js در اوبونتو 18.04</a>
                    </Link>
                  </li>
                  <li>
                    <i className="fas fa-star"></i>
                    <Link href="/fa/blog/node-with-mysql-examples">
                      <a>کار با MySQL به همراه Node.js</a>
                    </Link>
                  </li>
                  <li>
                    <i className="fas fa-star"></i>
                    <Link href="/fa/blog/nodejs-node-version-manager">
                      <a>اجرای چندین نسخه از Node.js با Node Version Manager</a>
                    </Link>
                  </li>
                  <li>
                    <i className="fas fa-star"></i>
                    <Link href="/fa/blog/setup-ssl-certificate-with-node-js-in-linux">
                      <a>تنظیم گواهی SSL با Node.js در لینوکس</a>
                    </Link>
                  </li>
                </ul>
              </div>
            </Col>
            <Col xs={12} md={3} className="mt-5 px-3 px-md-3">
              <div className={styles.electronicTrustSymbol}>
                <h3>نماد اعتماد الکترونیکی</h3>
                <a href="https://trustseal.enamad.ir/?id=22081&Code=ulnW1nDLAeYM3cL2l9U3">
                  <Image
                    src="/images/enamad.png"
                    width="137px"
                    height="147px"
                  />
                </a>
              </div>
            </Col>
          </Row>
        </Container>
        <div className={styles.bottomFooter}>
          <Container>
            <Row className="justif-content-between align-items-center">
              <Col xs={12} md={6}>
                <div>
                  <div className={styles.rightSide}>
                    <span>کلیه حقوق مادی و معنوی این سایت محفوظ می باشد.</span>
                    <a href="/fa/terms">قوانین</a> |{' '}
                    <a href="/fa/policy">خط مشی ها</a>
                  </div>
                </div>
              </Col>
              <Col xs={12} md={6}>
                <div className={styles.socialNetworks}>
                  <span>
                    <a href="https://www.facebook.com/jeyserver">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                  </span>
                  <span>
                    <a href="https://www.twitter.com/jeyserver">
                      <i className="fab fa-twitter"></i>
                    </a>
                  </span>
                  <span>
                    <a href="https://www.jeyserver.com/fa/news/rss">
                      <i className="fas fa-rss"></i>
                    </a>
                  </span>
                  <span>
                    <a href="https://telegram.me/jeyserver">
                      <i className="fab fa-telegram-plane"></i>
                    </a>
                  </span>
                  <span>
                    <a href="https://plus.google.com/+jeyserver">
                      <i className="fab fa-google-plus-g"></i>
                    </a>
                  </span>
                  <span>
                    <a href="https://www.instagram.com/jeyservercom">
                      <i className="fab fa-instagram"></i>
                    </a>
                  </span>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </footer>
    );
  }
}

export default Footer;

import {
  faFacebook,
  faGooglePlus,
  faInstagram,
  faTelegramPlane,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import {
  faEnvelope,
  faMapMarker,
  faMapMarkerAlt,
  faPhoneAlt,
  faRss,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container className={styles.topFooter}>
        <Row>
          <Col xs={12} md={3} className="mt-5 px-3 px-md-3">
            <div className="d-flex flex-column align-items-center w-100">
              <Image src="/logo-header.png" width="171px" height="35px" />
              <div className={styles.linksWrapper}>
                <Link href="/fa/server/vps">
                  <a>سرور مجازی</a>
                </Link>
                <Link href="/fa/hosting/linux/standard">
                  <a>هاست لینوکس</a>
                </Link>
                <Link href="/fa/hosting/linux/standard">
                  <a>هاست ایران</a>
                </Link>
                <Link href="/fa/hosting/file">
                  <a>هاست دانلود</a>
                </Link>
                <Link href="/fa/domain">
                  <a>دامنه ارزان</a>
                </Link>
                <Link href="/fa/licenses/directadmin">
                  <a>لایسنس دایرکت ادمین</a>
                </Link>
                <Link href="/fa/server/dedicated/germany">
                  <a>سرور آلمان</a>
                </Link>
                <Link href="/fa/reseller/hosting/linux/directadmin">
                  <a>نمایندگی دایرکت ادمین</a>
                </Link>
              </div>
            </div>
          </Col>
          <Col xs={12} md={3} className="mt-5 px-3 px-md-3">
            <div className={styles.contactWithUs}>
              <h3>تماس با ما</h3>
              <p>
                شما هم اکنون میتوانید با اوپراتور های ما بصورت رایگان از طریق
                سیستم گفتگوی آنلاین صحبت کنید و پاسخ پرسش هایتان را دریافت کنید.
              </p>
              <ul>
                <li>
                  <FontAwesomeIcon icon={faMapMarkerAlt} width="11px" />
                  <strong> آدرس:</strong>
                  <span>
                    {' '}
                    اصفهان - خیابان رباط دوم - ساختمان شمشاد - واحد 4
                  </span>
                </li>
                <li>
                  <FontAwesomeIcon icon={faPhoneAlt} width="11px" />
                  <strong> تلفن تماس: </strong>
                  <span> 34420301-031</span>
                </li>
                <li>
                  <FontAwesomeIcon icon={faEnvelope} width="11px" />
                  <strong> ایمیل:</strong>
                  <span> info [AT] jeyserver.com</span>
                </li>
              </ul>
            </div>
          </Col>
          <Col xs={12} md={3} className="mt-5 px-3 px-md-3">
            <div className={styles.educationalContent}>
              <h3>مطالب آموزشی</h3>
              <ul>
                <li>
                  <FontAwesomeIcon icon={faStar} height="16px" />
                  <Link href="/fa/blog/how-to-install-go-on-ubuntu-18-04">
                    <a>نصب Go برروی اوبونتو 18.04</a>
                  </Link>
                </li>
                <li>
                  <FontAwesomeIcon icon={faStar} height="16px" />
                  <Link href="/fa/blog/how-to-install-node-js-on-ubuntu-18-04">
                    <a>نصب Node.js در اوبونتو 18.04</a>
                  </Link>
                </li>
                <li>
                  <FontAwesomeIcon icon={faStar} height="16px" />
                  <Link href="/fa/blog/node-with-mysql-examples">
                    <a>کار با MySQL به همراه Node.js</a>
                  </Link>
                </li>
                <li>
                  <FontAwesomeIcon icon={faStar} height="16px" />
                  <Link href="/fa/blog/nodejs-node-version-manager">
                    <a>اجرای چندین نسخه از Node.js با Node Version Manager</a>
                  </Link>
                </li>
                <li>
                  <FontAwesomeIcon icon={faStar} height="16px" />
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
                <Image src="/images/enamad.png" width="137px" height="147px" />
              </a>
            </div>
          </Col>
        </Row>
      </Container>
      <div className={styles.bottomFooter}>
        <div>
          <div className={styles.rightSide}>
            <span>کلیه حقوق مادی و معنوی این سایت محفوظ می باشد.</span>
            <a href="/fa/terms">قوانین</a> | <a href="/fa/policy">خط مشی ها</a>
          </div>
        </div>
        <div>
          <div className={styles.socialNetworks}>
            <span>
              <a href="https://www.facebook.com/jeyserver">
                <FontAwesomeIcon width="14px" icon={faFacebook} />
              </a>
            </span>
            <span>
              <a href="https://www.twitter.com/jeyserver">
                <FontAwesomeIcon width="14px" icon={faTwitter} />
              </a>
            </span>
            <span>
              <a href="https://www.jeyserver.com/fa/news/rss">
                <FontAwesomeIcon width="14px" icon={faRss} />
              </a>
            </span>
            <span>
              <a href="https://telegram.me/jeyserver">
                <FontAwesomeIcon width="14px" icon={faTelegramPlane} />
              </a>
            </span>
            <span>
              <a href="https://plus.google.com/+jeyserver">
                <FontAwesomeIcon width="14px" icon={faGooglePlus} />
              </a>
            </span>
            <span>
              <a href="https://www.instagram.com/jeyservercom">
                <FontAwesomeIcon width="14px" icon={faInstagram} />
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

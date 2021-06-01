import {
  faChartArea,
  faDatabase,
  faPencilAlt,
  faQuestionCircle,
  faRss,
  faSignInAlt,
  faUniversity,
  faUserAlt,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { Dropdown, Container, Row, Col } from 'react-bootstrap';
import styles from './Support.module.scss';

const Support = () => {
  return (
    <Dropdown className="nav-item-dropdown">
      <Dropdown.Toggle id="nav-dropdown" className="nav-item-dropdown-toggle">
        <FontAwesomeIcon icon={faQuestionCircle} />
        پشتیبانی
      </Dropdown.Toggle>

      <Dropdown.Menu className="nav-item-dropdown-menu p-0">
        <Container fluid>
          <Row>
            <Col xs={12} md={4}>
              <div className={styles.linksWrapper}>
                <Link href="/fa/blog">
                  <a>
                    <FontAwesomeIcon width="18px" icon={faPencilAlt} />
                    <span>وبلاگ</span>
                  </a>
                </Link>
                <Link href="/fa/news">
                  <a>
                    <FontAwesomeIcon width="18px" icon={faRss} />
                    <span>اخبار</span>
                  </a>
                </Link>
                <Link href="/fa/faqs">
                  <a>
                    <FontAwesomeIcon width="18px" icon={faQuestionCircle} />
                    <span>سوالات متداول</span>
                  </a>
                </Link>
                <Link href="/fa/bankaccounts">
                  <a>
                    <FontAwesomeIcon width="18px" icon={faUniversity} />
                    <span>شماره حساب ها</span>
                  </a>
                </Link>
                <Link href="/fa/server-status">
                  <a>
                    <FontAwesomeIcon width="18px" icon={faChartArea} />
                    <span>وضعیت سرور ها</span>
                  </a>
                </Link>
              </div>
            </Col>
            <Col xs={12} md={4}>
              <div className={styles.userPanelInfo}>
                <h3>
                  <Link href="/fa/userpanel">
                    <a>
                      <FontAwesomeIcon icon={faUserAlt} />
                      <span>پنل کاربری</span>
                    </a>
                  </Link>
                </h3>
                <p>
                  عملیات مشاوره قبل از فروش، پشتیبانی فنی، پرداخت صورتحساب ها و
                  پیگیری امور مالی و کنترل خدمات خریداری شده از جی سرور در
                  سامانه یکپارچه جی سرور انجام خواهد شد.اپراتور های پشتیبانی جی
                  سرور در دو شیفت کاری بدون وقفه پاسخگوی درخواست های پشتیبانی
                  شما که از طریق پنل کاربری ارسال میکنید، هستند.
                </p>
                <img width={289} height={250} src="/images/learn-menu.png" />
                <div className={styles.btnsWrapper}>
                  <Button
                    href="/fa/userpanel/login"
                    variant="outline-md-warning"
                  >
                    <FontAwesomeIcon icon={faSignInAlt} />
                    <span>ورود به سامانه</span>
                  </Button>
                  <Button
                    href="/fa/userpanel/register"
                    variant="warning"
                    className={styles.registerBtn}
                  >
                    <FontAwesomeIcon icon={faUserPlus} />
                    <span>ثبت نام در سامانه</span>
                  </Button>
                </div>
              </div>
            </Col>
            <Col
              xs={12}
              md={4}
              className="pe-0 d-none d-md-flex align-items-md-end justify-content-md-end"
            >
              <Image width={289} height={250} src="/images/learn-menu.png" />
            </Col>
          </Row>
        </Container>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Support;

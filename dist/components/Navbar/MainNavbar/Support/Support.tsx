import Image from 'next/image';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { Dropdown, Container, Row, Col } from 'react-bootstrap';
import styles from './Support.module.scss';

interface Props {
  changeShowDropDown: () => void;
}

const Support: React.FC<Props> = (props) => {
  return (
    <Dropdown className="nav-item-dropdown">
      <Dropdown.Toggle id="nav-dropdown" className="nav-item-dropdown-toggle">
        <div onClick={props.changeShowDropDown}>
          <i className="fas fa-question-circle"></i>
          پشتیبانی
        </div>
      </Dropdown.Toggle>

      <Dropdown.Menu className="nav-item-dropdown-menu p-0">
        <Container fluid>
          <Row>
            <Col xs={12} md={4}>
              <div className={styles.linksWrapper}>
                <Link href="/fa/blog">
                  <a>
                    <i className="far fa-edit"></i>
                    <span>وبلاگ</span>
                  </a>
                </Link>
                <Link href="/fa/news">
                  <a>
                    <i className="fas fa-rss"></i>
                    <span>اخبار</span>
                  </a>
                </Link>
                <Link href="/fa/faqs">
                  <a>
                    <i className="fas fa-question-circle"></i>
                    <span>سوالات متداول</span>
                  </a>
                </Link>
                <Link href="/fa/bankaccounts">
                  <a>
                    <i className="fas fa-university"></i>
                    <span>شماره حساب ها</span>
                  </a>
                </Link>
                <Link href="/fa/server-status">
                  <a>
                    <i className="fas fa-chart-area"></i>
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
                      <i className="fas fa-user"></i>
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
                    className={styles.loginBtn}
                  >
                    <i className="fas fa-sign-in-alt"></i>
                    <span>ورود به سامانه</span>
                  </Button>
                  <Button
                    href="/fa/userpanel/register"
                    variant="warning"
                    className={styles.registerBtn}
                  >
                    <i className="fas fa-user-plus"></i>
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

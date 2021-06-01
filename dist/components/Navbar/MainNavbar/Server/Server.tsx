import {
  faCubes,
  faHdd,
  faMicrochip,
  faMoneyBill,
  faMoneyBillAlt,
  faServer,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { Dropdown, Container, Row, Col } from 'react-bootstrap';
import styles from './Server.module.scss';

const Server = () => {
  return (
    <Dropdown className="nav-item-dropdown">
      <Dropdown.Toggle id="nav-dropdown" className="nav-item-dropdown-toggle">
        <FontAwesomeIcon icon={faServer} />
        سرور
      </Dropdown.Toggle>

      <Dropdown.Menu className="nav-item-dropdown-menu py-0">
        <Container fluid className="pe-0">
          <Row>
            <Col xs={12} md={6}>
              <div className={styles.rightSide}>
                <Link href="#">
                  <a>
                    <h4 className={styles.title}>
                      <FontAwesomeIcon icon={faCubes} />
                      سرور مجازی
                    </h4>
                  </a>
                </Link>
                <Container fluid>
                  <Row>
                    <Col xs={12} md={6} lg={4}>
                      <Link href="#">
                        <a className={styles.professionalServerBtn}>
                          <div className={styles.iconWrapper}>
                            <FontAwesomeIcon icon={faMicrochip} />
                          </div>
                          <div>سرور‌های حرفه‌ای</div>
                        </a>
                      </Link>
                    </Col>
                    <Col xs={6} md={6} lg={4}>
                      <Link href="#">
                        <a className={styles.economicServerBtn}>
                          <div className={styles.iconWrapper}>
                            <FontAwesomeIcon icon={faMoneyBillAlt} />
                          </div>
                          <div>سرور‌های حرفه‌ای</div>
                        </a>
                      </Link>
                    </Col>
                    <Col xs={6} md={6} lg={4}>
                      <Link href="#">
                        <a className={styles.largeServerBtn}>
                          <div className={styles.iconWrapper}>
                            <FontAwesomeIcon icon={faHdd} />
                          </div>
                          <div>سرور‌های حرفه‌ای</div>
                        </a>
                      </Link>
                    </Col>
                  </Row>
                </Container>
              </div>
            </Col>
            <Col xs={12} md={6}>
              <div className={styles.leftSide}>
                <Link href="#">
                  <a>
                    <h4 className={styles.title}>
                      <FontAwesomeIcon icon={faServer} />
                      سرور اختصاصی
                    </h4>
                  </a>
                </Link>
                <div className={styles.countries}>
                  <Link href="#">
                    <a className={styles.countryBox}>
                      <Image
                        src="/images/countries/Iran.png"
                        width={32}
                        height={32}
                      />
                    </a>
                  </Link>
                  <Link href="#">
                    <a className={styles.countryBox}>
                      <Image
                        src="/images/countries/France.png"
                        width={32}
                        height={32}
                      />
                    </a>
                  </Link>
                  <Link href="#">
                    <a className={styles.countryBox}>
                      <Image
                        src="/images/countries/Germany.png"
                        width={32}
                        height={32}
                      />
                    </a>
                  </Link>
                  <Link href="#">
                    <a className={styles.countryBox}>
                      <Image
                        src="/images/countries/Netherlands.png"
                        width={32}
                        height={32}
                      />
                    </a>
                  </Link>
                  <Link href="#">
                    <a className={styles.countryBox}>
                      <Image
                        src="/images/countries/Canada.png"
                        width={32}
                        height={32}
                      />
                    </a>
                  </Link>
                  <Link href="#">
                    <a className={styles.countryBox}>
                      <Image
                        src="/images/countries/Finland.png"
                        width={32}
                        height={32}
                      />
                    </a>
                  </Link>
                </div>
                <p>
                  سرور اختصاصی بصرفه ترین روش میزبانی برای سازمان ها و شرکت های
                  بزرگ است که میخواهند از تمام آنچه هست استفاده کنند. در سرور
                  اختصاصی تمام تنظیمات در دسترس شماست و این به شما اجازه میدهد
                  تا همه چیز را آنجور که دوست دارید نگهداری کنید و در این نوع
                  میزبانی اطلاعات شما در حداکثر امنیت قرار دارند وزیراکه اطلاعات
                  شما فقط بصورت فیزیکی قابل دسترسی است.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Server;

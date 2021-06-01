import { faLinux, faWindows } from '@fortawesome/free-brands-svg-icons';
import {
  faCubes,
  faDatabase,
  faFileDownload,
  faServer,
  faUniversity,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { Col, Image, Dropdown, Row, Container } from 'react-bootstrap';
import styles from './Hosting.module.scss';

const Hosting = () => {
  return (
    <Dropdown className="nav-item-dropdown">
      <Dropdown.Toggle id="nav-dropdown" className="nav-item-dropdown-toggle">
        <FontAwesomeIcon icon={faDatabase} />
        هاست میزبانی
      </Dropdown.Toggle>

      <Dropdown.Menu className="nav-item-dropdown-menu px-3">
        <Container fluid>
          <Row className="flex-column-reverse flex-md-row">
            <Col xs={12} md={4} className="pt-4">
              <h3 className={styles.title}>
                <FontAwesomeIcon icon={faLinux} />
                <span>هاست اشتراکی لینوکس</span>
              </h3>
              <ul className={styles.list}>
                <li>
                  <Link href="#">
                    <a>هاست اشتراکی لینوکس ساده</a>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <a href="">هاست اشتراکی لینوکس حرفه ای</a>
                  </Link>
                </li>
              </ul>
              <h3 className={styles.title}>
                <FontAwesomeIcon icon={faWindows} />
                <span>هاست اشتراکی ویندوز</span>
              </h3>
              <ul className={styles.list}>
                <li>
                  <Link href="#">
                    <a>هاست اشتراکی ویندوز ساده</a>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <a href="">هاست اشتراکی ویندوز حرفه ای</a>
                  </Link>
                </li>
              </ul>
            </Col>
            <Col xs={12} md={4}>
              <div className="pt-4">
                <Link href="#">
                  <a>
                    <h3 className={styles.midleTitle}>
                      <FontAwesomeIcon icon={faCubes} />
                      <span>هاست نیمه اختصاصی لینوکس</span>
                    </h3>
                  </a>
                </Link>
                <Link href="#">
                  <a>
                    <h3 className={styles.midleTitle}>
                      <FontAwesomeIcon icon={faServer} />
                      <span>هاست اختصاصی لینوکس</span>
                    </h3>
                  </a>
                </Link>
                <Link href="#">
                  <a>
                    <h3 className={styles.midleTitle}>
                      <FontAwesomeIcon icon={faFileDownload} />
                      <span>هاست دانلود</span>
                    </h3>
                  </a>
                </Link>
                <Link href="#">
                  <a>
                    <h3 className={styles.midleTitle}>
                      <FontAwesomeIcon icon={faDatabase} />
                      <span>هاست پشتیبان</span>
                    </h3>
                  </a>
                </Link>
                <Link href="#">
                  <a>
                    <h3 className={styles.midleTitle}>
                      <FontAwesomeIcon icon={faUniversity} />
                      <span>نمایندگی هاست اشتراکی</span>
                    </h3>
                  </a>
                </Link>
              </div>
            </Col>
            <Col xs={12} md={4}>
              <div className="position-relative overflow-hidden">
                <p className={styles.paragraph}>
                  سرویس های هاست اشتراکی اولین و ساده ترین راه برای میزبانی فایل
                  ها و وب سایت ها شما در سطح اینترنت است.در هاست اشتراکی شما
                  بدون دانش های پیچیده مدیریت سرور میتوانید کد و برنامه های خود
                  را بر روی سرور قرار بدهید تا بتوانید پس از اتصال دامنه به هاست
                  سایتتان را راه اندازی کنید و برای همگان قابل دسترسی کنید.ما
                  اکنون در جی سرور بعد از سال ها تجربه در میزبانی وب سایت های
                  کوچک و بزرگ، تضمین بالاترین ضریب کیفیت و پایداری این نوع از
                  خدمات را به مشتریان عزیز ارائه میدهیم!
                </p>
                <Image
                  src="/images/slide2.png"
                  className={styles.backgroundImage}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Hosting;

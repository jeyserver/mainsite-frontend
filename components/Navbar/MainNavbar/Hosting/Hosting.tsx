import * as React from 'react';
import Link from 'next/link';
import { Col, Image, Dropdown, Row, Container } from 'react-bootstrap';
import styles from './Hosting.module.scss';

interface IProps {
  changeShowDropDown: () => void;
}

class Hosting extends React.Component<IProps> {
  render() {
    return (
      <Dropdown className="nav-item-dropdown">
        <Dropdown.Toggle id="nav-dropdown" className="nav-item-dropdown-toggle">
          <div onClick={this.props.changeShowDropDown}>
            <i className="fas fa-database"></i>
            هاست میزبانی
          </div>
        </Dropdown.Toggle>

        <Dropdown.Menu className="nav-item-dropdown-menu px-3">
          <Container fluid>
            <Row className="flex-column-reverse flex-md-row">
              <Col xs={12} md={7}>
                <Row>
                  <Col xs={12} md={6} className={styles.mildleCol}>
                    <h3 className={styles.title}>
                      <i className="fab fa-linux"></i>
                      <span>هاست اشتراکی لینوکس</span>
                    </h3>
                    <ul className={styles.list}>
                      <li>
                        <Link href="/hosting/linux/standard">
                          هاست اشتراکی لینوکس ساده
                        </Link>
                      </li>
                      <li>
                        <Link href="/hosting/linux/professional">
                          هاست اشتراکی لینوکس حرفه ای
                        </Link>
                      </li>
                    </ul>
                  </Col>
                  <Col xs={12} md={6} className={styles.mildleCol}>
                    <div>
                      <Link href="/hosting/linux/vps">

                        <h3
                          className={`${styles.midleTitle} ${styles.firstTitle}`}
                        >
                          <i className="fas fa-cubes"></i>
                          <span>هاست نیمه اختصاصی لینوکس</span>
                        </h3>

                      </Link>
                      <Link href="/hosting/linux/dedicated">

                        <h3 className={styles.midleTitle}>
                          <i className="fas fa-server"></i>
                          <span>هاست اختصاصی لینوکس</span>
                        </h3>

                      </Link>
                      <Link href="/hosting/file">

                        <h3 className={styles.midleTitle}>
                          <i className="fas fa-download"></i>
                          <span>هاست دانلود</span>
                        </h3>

                      </Link>
                      <Link href="/hosting/backup">

                        <h3 className={styles.midleTitle}>
                          <i className="fas fa-database"></i>
                          <span>هاست پشتیبان</span>
                        </h3>

                      </Link>
                    </div>
                  </Col>
                </Row>
              </Col>

              <Col
                xs={12}
                md={5}
                className="d-flex align-items-cenetr justify-content-center"
              >
                <div className={styles.infoWrapper}>
                  <p>
                    سرویس های هاست اشتراکی اولین و ساده ترین راه برای میزبانی
                    فایل ها و وب سایت ها شما در سطح اینترنت است.در هاست اشتراکی
                    شما بدون دانش های پیچیده مدیریت سرور میتوانید کد و برنامه
                    های خود را بر روی سرور قرار بدهید تا بتوانید پس از اتصال
                    دامنه به هاست سایتتان را راه اندازی کنید و برای همگان قابل
                    دسترسی کنید.ما اکنون در جی سرور بعد از سال ها تجربه در
                    میزبانی وب سایت های کوچک و بزرگ، تضمین بالاترین ضریب کیفیت و
                    پایداری این نوع از خدمات را به مشتریان عزیز ارائه میدهیم!
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
  }
}

export default Hosting;

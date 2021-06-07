import Image from 'next/image';
import Link from 'next/link';
import { Dropdown, Container, Row, Col } from 'react-bootstrap';
import styles from './Server.module.scss';

interface Props {
  changeShowDropDown: () => void;
}

const Server: React.FC<Props> = (props) => {
  return (
    <Dropdown className="nav-item-dropdown">
      <Dropdown.Toggle id="nav-dropdown" className="nav-item-dropdown-toggle">
        <div onClick={props.changeShowDropDown}>
          <i className="fas fa-server"></i>
          سرور
        </div>
      </Dropdown.Toggle>

      <Dropdown.Menu className="nav-item-dropdown-menu py-0">
        <Container fluid className={styles.serverContainer}>
          <Row>
            <Col xs={12} md={6}>
              <div className={styles.rightSide}>
                <Link href="#">
                  <a>
                    <h4 className={styles.title}>
                      <i className="fas fa-cubes"></i>
                      سرور مجازی
                    </h4>
                  </a>
                </Link>
                <Container fluid className={styles.serverLinksContainer}>
                  <Row>
                    <Col
                      xs={12}
                      md={6}
                      lg={6}
                      xl={4}
                      className="d-flex align-items-cenetr justify-content-center"
                    >
                      <Link href="#">
                        <a className={styles.professionalServerBtn}>
                          <div className={styles.iconWrapper}>
                            <i className="fas fa-microchip"></i>
                          </div>
                          <div>سرور‌های حرفه‌ای</div>
                        </a>
                      </Link>
                    </Col>
                    <Col
                      xs={6}
                      md={6}
                      lg={6}
                      xl={4}
                      className="d-flex align-items-cenetr justify-content-center"
                    >
                      <Link href="#">
                        <a className={styles.economicServerBtn}>
                          <div className={styles.iconWrapper}>
                            <i className="far fa-money-bill-alt"></i>
                          </div>
                          <div>سرور‌های اقتصادی</div>
                        </a>
                      </Link>
                    </Col>
                    <Col
                      xs={6}
                      md={6}
                      lg={6}
                      xl={4}
                      className="d-flex align-items-cenetr justify-content-center"
                    >
                      <Link href="#">
                        <a className={styles.largeServerBtn}>
                          <div className={styles.iconWrapper}>
                            <i className="far fa-hdd"></i>
                          </div>
                          <div>سرور‌های حجیم</div>
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
                  <div className={styles.title}>
                    <a href="/fa/server/dedicated">
                      <i className="fas fa-server"></i>
                      سرور اختصاصی
                    </a>
                  </div>
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

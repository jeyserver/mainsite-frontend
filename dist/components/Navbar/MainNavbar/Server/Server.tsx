import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Dropdown, Container, Row, Col } from 'react-bootstrap';
import styles from './Server.module.scss';
import classNames from 'classnames';

interface ServerProps {
  changeShowDropDown: () => void;
}

interface ServerState {}

class Server extends React.Component<ServerProps, ServerState> {
  constructor(props: ServerProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Dropdown className="nav-item-dropdown">
        <Dropdown.Toggle id="nav-dropdown" className="nav-item-dropdown-toggle">
          <div onClick={this.props.changeShowDropDown}>
            <i className="fas fa-server"></i>
            سرور
          </div>
        </Dropdown.Toggle>

        <Dropdown.Menu className="nav-item-dropdown-menu py-0">
          <Container fluid className={styles.serverContainer}>
            <Row>
              <Col xs={12} md={6}>
                <div className={styles.rightSide}>
                  <Link href="/server/vps">
                    <a>
                      <h4 className={classNames(styles.title, 'serverTitle')}>
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
                        <Link href="/server/vps/professional">
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
                        <Link href="/server/vps/economic">
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
                        <Link href="/server/vps/storage">
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
                <div className={classNames(styles.leftSide, 'serverLeftSide')}>
                  <Link href="#">
                    <div className={styles.title}>
                      <Link href="/server/dedicated">
                        <a>
                          <i className="fas fa-server"></i>
                          سرور اختصاصی
                        </a>
                      </Link>
                    </div>
                  </Link>
                  <div className={styles.countries}>
                    <Link href="/server/dedicated/iran">
                      <a className={styles.countryBox}>
                        <Image
                          src="/images/countries/Iran.png"
                          width={32}
                          height={32}
                        />
                      </a>
                    </Link>
                    <Link href="/server/dedicated/France">
                      <a className={styles.countryBox}>
                        <Image
                          src="/images/countries/France.png"
                          width={32}
                          height={32}
                        />
                      </a>
                    </Link>
                    <Link href="/server/dedicated/Germany">
                      <a className={styles.countryBox}>
                        <Image
                          src="/images/countries/Germany.png"
                          width={32}
                          height={32}
                        />
                      </a>
                    </Link>
                    <Link href="/server/dedicated/Netherlands">
                      <a className={styles.countryBox}>
                        <Image
                          src="/images/countries/Netherlands.png"
                          width={32}
                          height={32}
                        />
                      </a>
                    </Link>
                    <Link href="/server/dedicated/Canada">
                      <a className={styles.countryBox}>
                        <Image
                          src="/images/countries/Canada.png"
                          width={32}
                          height={32}
                        />
                      </a>
                    </Link>
                    <Link href="/server/dedicated/Finland">
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
                    سرور اختصاصی بصرفه ترین روش میزبانی برای سازمان ها و شرکت
                    های بزرگ است که میخواهند از تمام آنچه هست استفاده کنند. در
                    سرور اختصاصی تمام تنظیمات در دسترس شماست و این به شما اجازه
                    میدهد تا همه چیز را آنجور که دوست دارید نگهداری کنید و در
                    این نوع میزبانی اطلاعات شما در حداکثر امنیت قرار دارند
                    وزیراکه اطلاعات شما فقط بصورت فیزیکی قابل دسترسی است.
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default Server;

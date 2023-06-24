import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Dropdown, Container, Row, Col } from 'react-bootstrap';
import styles from './Server.module.scss';
import classNames from 'classnames';
import 'flag-icon-css/css/flag-icon.min.css';

interface IProps {
  changeShowDropDown: () => void;
}

class Server extends React.Component<IProps> {
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

                    <h4 className={classNames(styles.title, 'serverTitle')}>
                      <i className="fas fa-cubes"></i>
                      سرور مجازی ابری
                    </h4>

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
                        <Link
                          href="/server/vps/cloud#server_vps_cloud_de"
                          className={styles.professionalServerBtn}>

                          <div className={styles.iconWrapper}>
                            <i className="flag-icon flag-icon-de"></i>
                          </div>
                          <div>سرور‌های ابری آلمان</div>

                        </Link>
                      </Col>
                      <Col
                        xs={6}
                        md={6}
                        lg={6}
                        xl={4}
                        className="d-flex align-items-cenetr justify-content-center"
                      >
                        <Link
                          href="/server/vps/cloud#server_vps_cloud_fi"
                          className={styles.economicServerBtn}>

                          <div className={styles.iconWrapper}>
                            <i className="flag-icon flag-icon-fi"></i>
                          </div>
                          <div>سرور‌های ابری فنلاند</div>

                        </Link>
                      </Col>
                      <Col
                        xs={6}
                        md={6}
                        lg={6}
                        xl={4}
                        className="d-flex align-items-cenetr justify-content-center"
                      >
                        <Link
                          href="/server/vps/cloud#server_vps_cloud_us"
                          className={styles.largeServerBtn}>

                          <div className={styles.iconWrapper}>
                            <i className="flag-icon flag-icon-us"></i>
                          </div>
                          <div>سرور‌های ابری آمریکا</div>

                        </Link>
                      </Col>
                    </Row>
                  </Container>
                </div>
              </Col>
              <Col xs={12} md={6}>
                <div className={classNames(styles.leftSide, 'serverLeftSide')}>
                  <Link href="#" legacyBehavior>
                    <div className={styles.title}>
                      <Link href="/server/dedicated">

                        <i className="fas fa-server"></i>سرور اختصاصی
                      </Link>
                    </div>
                  </Link>
                  <div className={styles.countries}>
                    <Link href="/server/dedicated/iran" className={styles.countryBox}>

                      <Image
                        src="/images/countries/Iran.png"
                        width={32}
                        height={32}
                        alt='پرچم جمهوری اسلامی'
                      />

                    </Link>
                    <Link href="/server/dedicated/france" className={styles.countryBox}>

                      <Image
                        src="/images/countries/France.png"
                        width={32}
                        height={32}
                        alt='پرچم کشور فرانسه'
                      />

                    </Link>
                    <Link href="/server/dedicated/germany" className={styles.countryBox}>

                      <Image
                        src="/images/countries/Germany.png"
                        width={32}
                        height={32}
                        alt='پرچم کشور آلمان'
                      />

                    </Link>
                    <Link href="/server/dedicated/netherlands" className={styles.countryBox}>

                      <Image
                        src="/images/countries/Netherlands.png"
                        width={32}
                        height={32}
                        alt='پرچم کشور هلند'
                      />

                    </Link>
                    <Link href="/server/dedicated/canada" className={styles.countryBox}>

                      <Image
                        src="/images/countries/Canada.png"
                        width={32}
                        height={32}
                        alt='پرچم کشور کانادا'
                      />

                    </Link>
                    <Link href="/server/dedicated/finland" className={styles.countryBox}>

                      <Image
                        src="/images/countries/Finland.png"
                        width={32}
                        height={32}
                        alt='پرچم کشور فنلاند'
                      />

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

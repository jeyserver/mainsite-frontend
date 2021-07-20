import * as React from 'react';
import { Container, Row, Col, Dropdown } from 'react-bootstrap';
import Link from 'next/link';
import PagesHeader from '../../PagesHeader/PagesHeader';
import Facilities from '../Facilities/Facilities';
import HostFaq from '../HostFaq/HostFaq';
import DedicatedHostingTable from './DedicatedHostingTable/DedicatedHostingTable';
import styles from '../PageInfoStyles.module.scss';

export interface DedicatedHostingProps {
  dedicatedHosts: any;
  navData: any;
  appIsScrolling: boolean;
  switchAppIsScrolling: () => void;
}

export interface DedicatedHostingState {
  isNavFixed: boolean;
}

let lastScrollTop = 0;

class DedicatedHosting extends React.Component<
  DedicatedHostingProps,
  DedicatedHostingState
> {
  constructor(props: DedicatedHostingProps) {
    super(props);
    this.state = {
      isNavFixed: false,
    };
    this.onScroll = this.onScroll.bind(this);
  }

  onScroll() {
    const nav = document.querySelector('#dedicated-nav') as HTMLDivElement;

    const mainNavLinks = document.querySelectorAll(
      '#dedicated-nav li[data-main="true"] > a'
    );

    var st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > lastScrollTop) {
      // downscroll code
      nav.style.top = '0px';
    } else {
      // upscroll code
      if (!this.props.appIsScrolling) {
        nav.style.top = '80px';
      } else {
        nav.style.top = '0px';
      }
    }

    let fromTop = window.scrollY;

    if (fromTop > 455) {
      nav.style.position = 'fixed';
      nav.style.margin = '0';
      this.setState({ isNavFixed: true });
    } else {
      nav.style.position = 'static';
      nav.style.margin = '30px 0';
      this.setState({ isNavFixed: false });
    }

    mainNavLinks.forEach((link: any) => {
      if (link.hash) {
        let section = document.querySelector(link.hash);

        if (section) {
          if (
            section.offsetTop <= fromTop &&
            section.offsetTop + section.offsetHeight > fromTop
          ) {
            link.dataset.active = 'true';
          } else {
            link.dataset.active = 'false';
          }
        }
      }
    });

    lastScrollTop = st <= 0 ? 0 : st;
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll, false);

    this.props.switchAppIsScrolling();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  render() {
    return (
      <section>
        <PagesHeader title="هاست میزبانی اختصاصی" />

        <Container>
          <div className={styles.mainContent}>
            <div className={styles.innerHard}>
              <p>
                زمانی که وب سایت پر ترافیک شما هر روز بزرگتر و پر ترافیک تر می
                شود شما نیاز به زیرساختی دارید تا از پیشرفت نترسید!
              </p>
              <p>
                در <strong>هاست اختصاصی</strong> جی سرور شما می توانید از تمامی
                منابع یک سرور فیزیکی استفاده کنید. هیچ از مقادیر Ram یا CPU یا
                Disk برای شما بصورت نرم افزاری محدود نشده و شما از تمام آنچه هست
                نهایت استفاده را میبرید.
              </p>
              <p>
                همینطور تیم پشتیبانی جی سرور شما را در تمامی مراحل نصب، پیکربندی
                و میزبانی وب سایتتان یاری میکند. نگرانی بابت تهیه لایسنس ها
                نداشته باشید زیرا که تهیه آن ها به عهده جی سرور است.
              </p>
              <p>
                مهم نیست که حجم وب سایت شما چقدر باشد، جی سرور همواره از وب سایت
                شما بک آپ گیری میکند و در مواقع نیاز آن را در اختیار شما
                میگذارد.
              </p>
              <p>
                در این نوع از خدمات میزبانی تنظیمات سرور بر اساس نیاز انجام
                خواهد شد و امکان ویرایش توابع PHP یا تغییرات در قوانین Rewrite
                وب سرور به راحتی امکان پذیر است.
              </p>
            </div>
          </div>
        </Container>
        <Container>
          {this.state.isNavFixed && (
            <div
              style={{
                height:
                  document.querySelector<HTMLDivElement>('#dedicated-nav')
                    .clientHeight,
              }}
              className={styles.emptySpaceForNav}
            ></div>
          )}

          <Row className={styles.stickyNav} id="dedicated-nav">
            <Col xs={12} className={styles.mnavigation}>
              <ul className={styles.nav}>
                {this.props.dedicatedHosts.map((panels, index) => (
                  <li key={panels.country_name_en} data-main="true">
                    <a
                      href={`#${panels.country_name_en}`}
                      onClick={() => {
                        this.props.switchAppIsScrolling();
                      }}
                    >
                      هاستینگ اختصاصی {panels.country_name_fa}
                    </a>
                  </li>
                ))}
                <li>
                  <Dropdown className={styles.dropdown}>
                    <Dropdown.Toggle className={styles.dropdownToggle}>
                      هاست نیمه اختصاصی
                    </Dropdown.Toggle>
                    <Dropdown.Menu
                      className={styles.dropdownMenu}
                      align="right"
                    >
                      {this.props.navData.linux_vps_hosts.map((host) => (
                        <Link
                          key={host.link}
                          href={`/hosting/linux/vps#${host.link}`}
                        >
                          <a>هاست نیمه اختصاصی {host.title}</a>
                        </Link>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
                <li>
                  <Dropdown className={styles.dropdown}>
                    <Dropdown.Toggle className={styles.dropdownToggle}>
                      هاست اشتراکی لینوکس حرفه ای
                    </Dropdown.Toggle>
                    <Dropdown.Menu
                      className={styles.dropdownMenu}
                      align="right"
                    >
                      {this.props.navData.professional_linux_shared_hosts.map(
                        (host) => (
                          <Link
                            key={host.link}
                            href={`/hosting/linux/professional#${host.link}`}
                          >
                            <a>هاست اشتراکی حرفه ای {host.title}</a>
                          </Link>
                        )
                      )}
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
                <li>
                  <Dropdown className={styles.dropdown}>
                    <Dropdown.Toggle className={styles.dropdownToggle}>
                      هاست اشتراکی لینوکس ساده
                    </Dropdown.Toggle>
                    <Dropdown.Menu
                      className={styles.dropdownMenu}
                      align="right"
                    >
                      {this.props.navData.standard_linux_shared_hosts.map(
                        (host) => (
                          <Link
                            key={host.link}
                            href={`/hosting/linux/professional#${host.link}`}
                          >
                            <a>هاست اشتراکی ساده {host.title}</a>
                          </Link>
                        )
                      )}
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Col>
              {this.props.dedicatedHosts.map((panels, index) => (
                <div key={index}>
                  <DedicatedHostingTable data={panels} />
                  <div className={styles.tableBottomSpace}></div>
                </div>
              ))}
            </Col>
          </Row>
          <Facilities />
          <HostFaq />
        </Container>
      </section>
    );
  }
}

export default DedicatedHosting;

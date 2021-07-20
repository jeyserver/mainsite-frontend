import * as React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import VPSHostingTable from './VPSHostingTable/VPSHostingTable';
import PagesHeader from '../../PagesHeader/PagesHeader';
import Facilities from '../Facilities/Facilities';
import HostFaq from '../HostFaq/HostFaq';
import styles from '../PageInfoStyles.module.scss';
import Link from 'next/link';
import { Dropdown } from 'react-bootstrap';

export interface VPSHostingProps {
  VPSHosts: any;
  navData: any;
  appIsScrolling: boolean;
  switchAppIsScrolling: () => void;
}

export interface VPSHostingState {
  isNavFixed: boolean;
}

let lastScrollTop = 0;

class VPSHosting extends React.Component<VPSHostingProps, VPSHostingState> {
  constructor(props: VPSHostingProps) {
    super(props);
    this.state = {
      isNavFixed: false,
    };
    this.onScroll = this.onScroll.bind(this);
  }

  onScroll() {
    const nav = document.querySelector('#vps-nav') as HTMLDivElement;

    const mainNavLinks = document.querySelectorAll(
      '#vps-nav li[data-main="true"] a'
    );

    let st = window.pageYOffset || document.documentElement.scrollTop;

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

    if (fromTop > 600) {
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
            section.offsetTop - 10 <= fromTop &&
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
        <PagesHeader title="هاست میزبانی نیمه اختصاصی" />

        <Container>
          <div className={styles.mainContent}>
            <div className={styles.innerHard}>
              <p>
                اکثر مدیران وب سایت های بزرگ و معروف ایرانی میدانند که در زمانی
                دیگر هاست های اشتراکی پاسخگوی نیاز آن ها نبوده و مرتبا از
                پشتیبانان سرویس میزبانی سایتشان شنیده اند که نیاز به{' '}
                <Link href="/server/vps">
                  <a>سرور مجازی</a>
                </Link>{' '}
                یا{' '}
                <Link href="/server/dedicated">
                  <a>سرور اختصاصی</a>
                </Link>{' '}
                دارند.
              </p>
              <p>
                <Link href="/hosting/linux/professional">
                  <a>هاست اشتراکی</a>
                </Link>{' '}
                یک شیوه ارزان قیمت برای میزبانی وب سایت های تازه تاسیس است، اما
                زمانی که وب سایتتان به اندازه کافی معروف شد و موفقیت کسب کرد
                نیاز به منابع بیشتری پیدا میکند تا پاسخگوی تعداد بیشتری از
                کاربران شما باشد.
              </p>
              <p>
                اما کار با سرور های لینوکس کار راحتی نیست، مخصوصا که اگر تجربه
                کار با لینوکس را از قبل نداشته باشید. بنابراین شما نیاز به راه
                حلی دارید که هم شهرت و اعتبار وب سایتتان با قطعی ها و مشکلات فنی
                مداوم به خطر نیوفتد و هم منابع زیادی را در اختیار شما بگذارد.
              </p>
              <p>
                پیشنهاد{' '}
                <Link href="/">
                  <a>جی سرور</a>
                </Link>{' '}
                برای شما استفاده از <strong>هاست نیمه اختصاصی</strong> یا{' '}
                <strong>سرور مجازی مدیریت شده</strong> است.
              </p>
              <p>
                در این نوع سرویس ها شما نگران مسائل فنی نیستید و فقط بر روی
                توسعه و پیشرفت وب سایتتان تمرکز میکنید.
              </p>
              <p>
                <strong>نیازی نیست</strong> که نگران انتخاب سیستم عامل و نسخه
                های مختلف نرم افزار ها باشید. <strong>نیازی نیست</strong> نگران
                هزینه و خرید لایسنس های مختلف باشید. <strong>نیازی نیست</strong>{' '}
                در مورد بک آپ گیری و{' '}
                <Link href="/fa/hosting/backup">
                  <a>فضای بک آپ</a>
                </Link>{' '}
                جداگانه دغدغه خاطر داشته باشید. و از همه مهم تر{' '}
                <strong>نیازی نیست</strong> بدانید که یک سرور لینوکس چطور کانفیگ
                می شود و در چه شرایطی در بهترین حالت خود قرار میگیرد.
              </p>
              <p>
                در این نوع از خدمات میزبانی تنظیمات سرور بر اساس نیاز انجام
                خواهد شد و امکان ویرایش توابع PHP یا تغییرات در قوانین Rewrite
                وب سرور به راحتی امکان پذیر است.
              </p>{' '}
            </div>
          </div>
        </Container>
        <Container>
          {this.state.isNavFixed && (
            <div
              style={{
                height:
                  document.querySelector<HTMLDivElement>('#vps-nav')
                    .clientHeight,
              }}
              className={styles.emptySpaceForNav}
            ></div>
          )}

          <Row className={styles.stickyNav} id="vps-nav">
            <Col xs={12} className={styles.mnavigation}>
              <ul className={styles.nav}>
                {this.props.VPSHosts.map((panels, index) => (
                  <li key={panels.license_en} data-main="true">
                    <a
                      href={`#server_vps_${panels.license_en}`}
                      onClick={() => {
                        this.props.switchAppIsScrolling();
                      }}
                    >
                      هاستینگ نیمه اختصاصی {panels.license_fa}
                    </a>
                  </li>
                ))}
                <li>
                  <Link href="/hosting/linux/dedicated">
                    <a>هاست اختصاصی</a>
                  </Link>
                </li>
                <Dropdown className={styles.dropdown}>
                  <Dropdown.Toggle className={styles.dropdownToggle}>
                    هاست اشتراکی لینوکس حرفه ای
                  </Dropdown.Toggle>
                  <Dropdown.Menu className={styles.dropdownMenu} align="right">
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
                <Dropdown className={styles.dropdown}>
                  <Dropdown.Toggle className={styles.dropdownToggle}>
                    هاست اشتراکی لینوکس ساده
                  </Dropdown.Toggle>
                  <Dropdown.Menu className={styles.dropdownMenu} align="right">
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
              </ul>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Col>
              {this.props.VPSHosts.map((panels, index) => (
                <div key={index}>
                  <VPSHostingTable data={panels} />
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

export default VPSHosting;

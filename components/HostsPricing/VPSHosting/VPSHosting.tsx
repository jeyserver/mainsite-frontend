import * as React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import VPSHostingTable from './VPSHostingTable/VPSHostingTable';
import PagesHeader from '../../PagesHeader/PagesHeader';
import Facilities from '../Facilities/Facilities';
import HostFaq from '../HostFaq/HostFaq';
import styles from '../PageInfoStyles.module.scss';
import Link from 'next/link';
import { Dropdown } from 'react-bootstrap';
import { IHostPlan } from '../../../helper/types/products/Host/plan';
import hosts from '../../../lib/products/host';

interface IProps {
  plans: IHostPlan[];
  appIsScrolling: boolean;
  switchAppIsScrolling: () => void;
}

interface IState {
  sepratedPlans: IHostPlan[][];
}

class VPSHosting extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      sepratedPlans: Object.values(
        this.props.plans.reduce((accumulator, currentValue) => {
          const co = currentValue.cp;

          if (accumulator && accumulator[co]) {
            accumulator[co] = [...accumulator[co], currentValue];
          } else {
            accumulator[co] = [currentValue];
          }

          return accumulator;
        }, {})
      ),
    };
    this.onScroll = this.onScroll.bind(this);
  }

  lastScrollTop = 0;

  onScroll() {
    const nav = document.querySelector('#vps-nav') as HTMLDivElement;
    const mainNavLinks = document.querySelectorAll(
      '#vps-nav li[data-main="true"] a'
    );
    const emptySpaceForNav = document.querySelector(
      '#emptySpaceForNav'
    ) as HTMLDivElement;
    let st = window.pageYOffset || document.documentElement.scrollTop;

    if (st > this.lastScrollTop) {
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
      emptySpaceForNav.style.display = 'block';
    } else {
      nav.style.position = 'static';
      nav.style.margin = '30px 0';
      emptySpaceForNav.style.display = 'none';
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

    this.lastScrollTop = st <= 0 ? 0 : st;
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
                  سرور مجازی
                </Link>{' '}
                یا{' '}
                <Link href="/server/dedicated">
                  سرور اختصاصی
                </Link>{' '}
                دارند.
              </p>
              <p>
                <Link href="/hosting/linux/professional">
                  هاست اشتراکی
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
                  جی سرور
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
                  فضای بک آپ
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
          <div
            style={{
              height: '55px',
            }}
            id="emptySpaceForNav"
            className={styles.emptySpaceForNav}
          ></div>

          <Row className={styles.stickyNav} id="vps-nav">
            <Col xs={12} className={styles.mnavigation}>
              <ul className={styles.nav}>
                {hosts.linux_vps_hosts.map((panels, index) => (
                  <li key={panels.link} data-main="true">
                    <a
                      href={`#${panels.link}`}
                      onClick={() => {
                        this.props.switchAppIsScrolling();
                      }}
                    >
                      هاستینگ نیمه اختصاصی {panels.title}
                    </a>
                  </li>
                ))}
                <li>
                  <Link href="/hosting/linux/dedicated">
                    هاست اختصاصی
                  </Link>
                </li>
                <Dropdown className={styles.dropdown}>
                  <Dropdown.Toggle className={styles.dropdownToggle}>
                    هاست اشتراکی لینوکس حرفه ای
                  </Dropdown.Toggle>
                  <Dropdown.Menu className={styles.dropdownMenu} align="right">
                    {hosts.professional_linux_shared_hosts.map((host) => (
                      (<Link
                        key={host.link}
                        href={`/hosting/linux/professional#${host.link}`}
                      >
                        هاست اشتراکی حرفه ای{host.title}
                      </Link>)
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown className={styles.dropdown}>
                  <Dropdown.Toggle className={styles.dropdownToggle}>
                    هاست اشتراکی لینوکس ساده
                  </Dropdown.Toggle>
                  <Dropdown.Menu className={styles.dropdownMenu} align="right">
                    {hosts.standard_linux_shared_hosts.map((host) => (
                      (<Link
                        key={host.link}
                        href={`/hosting/linux/professional#${host.link}`}
                      >
                        هاست اشتراکی ساده{host.title}
                      </Link>)
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </ul>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Col>
              {this.state.sepratedPlans.reverse().map((plans, index) => (
                <div key={index}>
                  <VPSHostingTable plans={plans} />
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

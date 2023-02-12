import * as React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import PagesHeader from '../PagesHeader/PagesHeader';
import styles from './VpsPricing.module.scss';
import classNames from 'classnames';
import vpsesWithCountries from '../../lib/products/vps';
import { IVPSPlan } from '../../helper/types/products/VPS/plan';
import VpsServerTable from '../Tables/VpsServerTable/VpsServerTable';

const renderTopNavLinks = (
  type: 'professional' | 'storage' | 'economic',
  switchAppIsScrolling
) => {
  switch (type) {
    case 'professional':
      return (
        <ul className={styles.nav}>
          {vpsesWithCountries.professional.map((nav) => (
            <li key={nav.code}>
              <a
                href={`#vps_professional_${nav.code}`}
                onClick={() => {
                  switchAppIsScrolling();
                }}
              >
                سرور مجازی حرفه ای {nav.name_fa}
              </a>
            </li>
          ))}
          {vpsesWithCountries.economic.map((nav) => (
            <li key={nav.code}>
              <Link href={`/server/vps/economic#vps_economic_${nav.code}`}>
                <a>سرور مجازی اقتصادی {nav.name_fa}</a>
              </Link>
            </li>
          ))}
          {vpsesWithCountries.storage.map((nav) => (
            <li key={nav.code}>
              <Link href={`/server/vps/storage#vps_storage_${nav.code}`}>
                <a>سرور مجازی حجیم {nav.name_fa}</a>
              </Link>
            </li>
          ))}
        </ul>
      );
    case 'storage':
      return (
        <ul className={styles.nav}>
          {vpsesWithCountries.storage.map((nav) => (
            <li key={nav.code}>
              <a
                href={`#vps_storage_${nav.code}`}
                onClick={() => switchAppIsScrolling()}
              >
                سرور مجازی حجیم {nav.name_fa}
              </a>
            </li>
          ))}
          {vpsesWithCountries.professional.map((nav) => (
            <li key={nav.code}>
              <Link
                href={`/server/vps/professional#vps_professional_${nav.code}`}
              >
                <a>سرور مجازی حرفه ای {nav.name_fa}</a>
              </Link>
            </li>
          ))}
          {vpsesWithCountries.economic.map((nav) => (
            <li key={nav.code}>
              <Link href={`/server/vps/economic#vps_economic_${nav.code}`}>
                <a>سرور مجازی اقتصادی {nav.name_fa}</a>
              </Link>
            </li>
          ))}
        </ul>
      );
    case 'economic':
      return (
        <ul className={styles.nav}>
          {vpsesWithCountries.economic.map((nav) => (
            <li key={nav.code}>
              <a
                href={`#vps_economic_${nav.code}`}
                onClick={() => switchAppIsScrolling()}
              >
                سرور مجازی اقتصادی {nav.name_fa}
              </a>
            </li>
          ))}
          {vpsesWithCountries.professional.map((nav) => (
            <li key={nav.code}>
              <Link
                href={`/server/vps/professional#vps_professional_${nav.code}`}
              >
                <a>سرور مجازی حرفه ای {nav.name_fa}</a>
              </Link>
            </li>
          ))}
          {vpsesWithCountries.storage.map((nav) => (
            <li key={nav.code}>
              <Link href={`/server/vps/storage#vps_storage_${nav.code}`}>
                <a>سرور مجازی حجیم {nav.name_fa}</a>
              </Link>
            </li>
          ))}
        </ul>
      );
    default:
      break;
  }
};

interface IProps {
  plans: IVPSPlan[];
  type: 'professional' | 'storage' | 'economic';
  appIsScrolling: boolean;
  switchAppIsScrolling: () => void;
}

class VpsPricing extends React.Component<IProps> {
  lastScrollTop = 0;

  onScroll() {
    const nav = document.querySelector('#vps-nav') as HTMLDivElement;

    const mainNavLinks = document.querySelectorAll('#vps-nav li a');
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
        nav.style.top = '0';
      }
    }

    let fromTop = window.scrollY;

    if (fromTop > 670) {
      nav.style.position = 'fixed';
      nav.style.margin = '0';
      emptySpaceForNav.style.display = 'block';
    } else {
      nav.style.position = 'static';
      nav.style.margin = '30px 0';
      emptySpaceForNav.style.display = 'none';
    }

    mainNavLinks.forEach((link: any) => {
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
    });

    this.lastScrollTop = st <= 0 ? 0 : st;
  }

  componentDidMount() {
    window.addEventListener('scroll', () => this.onScroll(), false);
    this.props.switchAppIsScrolling();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', () => this.onScroll(), false);
  }

  chunkedPlans(size: number, plans: IVPSPlan[]) {
    let chunked = [];
    for (let i = 0; i < plans.length; i += size) {
      chunked.push(plans.slice(i, i + size));
    }
    return chunked;
  }

  render() {
    const plansSepratedByCountryName = Object.values(
      this.props.plans.reduce((accumulator, currentValue) => {
        if (accumulator && accumulator[currentValue.country.name]) {
          accumulator[currentValue.country.name] = [
            ...accumulator[currentValue.country.name],
            currentValue,
          ];
        } else {
          accumulator[currentValue.country.name] = [currentValue];
        }

        return accumulator;
      }, {})
    );

    return (
      <section>
        <PagesHeader
          title={
            this.props.type === 'storage' ? 'سرور مجازی حجیم' : 'سرور مجازی'
          }
        />
        <div className={styles.mainContent}>
          <Container fluid="lg">
            <div className={styles.innerHard}>
              <p>
                سرور مجازی راه کاریست برای بدست آوردن حداکثر بازدهی در حداقل
                هزینه!
              </p>
              <p>
                امروزه بیشتر مشتریان سرور های مجازی وب سایت های بزرگی هستند که
                هاست های اشتراکی دیگر یا پاسخگوی نیازهایشان نیست یا به فکر
                جیبشان ، یا کسانی مشتریان ما هستند که میخواهند به کسب و کار های
                کوچکشان راه رفتن بیاموزند!
              </p>
              <p>
                همه دلیلی که سرور های مجازی این همه محبوب شوند صرفه اقتصادی در
                عین امکانات بیشمارشان است.شما در این سرور ها سیستم عامل محبوب
                خود را دارید میتوانید همه چیز را طبق علاقه ، سلیقه و نیازتان
                تنظیم کنید.ترافیک و حجم سرور بسیار مقرون به صرفه بوده و محدودیت
                های پردازشی بسیار محدودند!
              </p>
              <p>
                اگر از تنظیمات پیچیده سیستم عامل ها میترسید لطفا کار را به کنترل
                پنل های تجاری و رایگان بسپارید ، کنترل پنل های تجاری همچون{' '}
                <a>Cpanel/Whm</a> ، <a>DirectAdmin</a> ، <a>Plesk</a> و حتی
                کنترل پنل های رایگانی همچون <a>Virtualmin</a> ، <a>Kloxo</a> و
                یا <a>WebSitePanel</a> که شاید از لحاظ طیف امکانات از پنل های
                پریمیوم هم گسترده تر باشند
              </p>
              <p>&nbsp;</p>
              <div className={styles.notice}>
                <div className={styles.alert}>
                  <strong>توجه فرمائید</strong> که قرار داد شما در هر لحظه قابل
                  انصراف است و ما در لحظه انصراف هزینه باقی مانده سرویس شمارا به
                  شما بازپس خواهیم داد.این تضمین ما برای جلب رضایت شماست
                </div>
              </div>
              <p>&nbsp;</p> <br />
              <div className={styles.tabs}>
                <div className={styles.menu}>
                  <div
                    className={classNames({
                      [styles.active]: this.props.type === 'professional',
                    })}
                  >
                    <Link href="/server/vps/professional">
                      <a>حرفه ای</a>
                    </Link>
                  </div>
                  <div
                    className={classNames({
                      [styles.active]: this.props.type === 'economic',
                    })}
                  >
                    <Link href="/server/vps/economic">
                      <a>اقتصادی</a>
                    </Link>
                  </div>
                  <div
                    className={classNames({
                      [styles.active]: this.props.type === 'storage',
                    })}
                  >
                    <Link href="/server/vps/storage">
                      <a>حجیم</a>
                    </Link>
                  </div>
                </div>
              </div>
              <div
                style={{
                  height: '106px',
                }}
                id="emptySpaceForNav"
                className={styles.emptySpaceForNav}
              ></div>
              <Row className={styles.stickyNav} id="vps-nav">
                <Col xs={12} className={styles.mnavigation}>
                  {renderTopNavLinks(this.props.type, () =>
                    this.props.switchAppIsScrolling()
                  )}
                </Col>
              </Row>
              <div className={styles.tables}>
                {plansSepratedByCountryName.map((plans: IVPSPlan[], index) => (
                  <div
                    key={`${this.props.type}_${plans[0].country.code}`}
                    id={`vps_${this.props.type}_${plans[0].country.code}`}
                  >
                    {this.chunkedPlans(5, plans).map(
                      (chunkedPlans, chunkedIndex) => (
                        <VpsServerTable
                          data={chunkedPlans}
                          key={`${index}-${chunkedIndex}`}
                          homePageTable={false}
                          hideTopInfo={chunkedIndex > 0}
                        />
                      )
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </div>
      </section>
    );
  }
}

export default VpsPricing;

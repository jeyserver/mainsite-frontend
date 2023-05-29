import * as React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PagesHeader from '../PagesHeader/PagesHeader';
import styles from './VpsPricing.module.scss';
import { ICountry, ILocationWithCountry, IVPSPlan, getPlans } from '../../helper/types/products/VPS/plan';
import VpsServerTable from '../Tables/VpsServerTable/VpsServerTable';
import 'flag-icon-css/css/flag-icon.min.css';
import Link from 'next/link';
import classNames from 'classnames';
import { NextRouter, withRouter } from "next/router";

interface IProps {
  plans: IVPSPlan[];
  type: 'cloud';
  appIsScrolling: boolean;
  router: NextRouter;
  switchAppIsScrolling: () => void;
}

class VpsPricing extends React.Component<IProps> {
  lastScrollTop = 0;

  onScroll() {
    const nav = document.querySelector('#vps-nav') as HTMLDivElement;

    if (!nav) {
      return;
    }

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

  getLocations(plans: IVPSPlan[], countryCode?: string) {
    const locations: ILocationWithCountry[] = [];
    const locationIDs: number[] = [];

    for (const plan of plans) {
      if (locationIDs.includes(plan.location.id) || (countryCode && countryCode !== plan.country.code)) {
        continue;
      }

      locationIDs.push(plan.location.id);

      locations.push({
        id: plan.location.id,
        name: plan.location.name,
        city: plan.location.city,
        network_zone: plan.location.network_zone,
        country: plan.country,
      });
    }

    const sortBy = ['FI', 'DE', 'US'];

    locations.sort((a, b) => {
      return sortBy.indexOf(a.country.code) - sortBy.indexOf(b.country.code);
    });

    return locations;
  }

  getCountries(plans: IVPSPlan[]): ICountry[] {
    const countries = [];
    const countryIDs = [];

    for (const plan of plans) {
      if (countryIDs.includes(plan.country.code)) {
        continue;
      }

      countryIDs.push(plan.country.code);

      countries.push(plan.country);
    }

    const sortBy = ['FI', 'DE', 'US'];

    countries.sort((a, b) => {
      return sortBy.indexOf(a.code) - sortBy.indexOf(b.code);
    });

    return countries;
  }

  getCountryTranslate(code: string) {
    switch(code) {
      case 'FI':
        return 'فنلاند';
      case 'DE':
        return 'آلمان';
      case 'US':
        return 'آمریکا';
      default:
        return code;
    }
  }

  getPlansByLocation(plans: IVPSPlan[], locationID: number) {
    return plans.filter((plan) => locationID === plan.location.id);
  }

  getPricingTableByCountry(plans: IVPSPlan[], countryCode: string): JSX.Element[] {
    const tables: JSX.Element[] = [];
    const locations = this.getLocations(this.props.plans, countryCode);

    let hideTopInfo = false;
    for (const location of locations) {
      const key = `server_vps_cloud_${countryCode.toLowerCase()}_${location.name}`;
      const items = getPlans(this.getPlansByLocation(plans, location.id));

      tables.push(<div key={key} id={key}></div>);

      let i = 0;
      for (const part of items) {
        tables.push(
          <VpsServerTable
            data={part}
            key={key+'_'+i}
            homePageTable={false}
            hideTopInfo={hideTopInfo}
          />
        );
        i++;
        hideTopInfo = true;
      }
    }

    return tables;
  }

  getTables(): JSX.Element[] {
    const tables: JSX.Element[] = [];
    const countries = this.getCountries(this.props.plans);

    for (const country of countries) {
      const key = `server_vps_cloud_${country.code.toLowerCase()}`;

      tables.push(<div key={key} id={key}>{this.getPricingTableByCountry(this.props.plans, country.code)}</div>)
    }

    return tables;
  }

  render() {

    return (
      <section>
        <PagesHeader
          title="سرور مجازی ابری |‌ حرفه ای و مقرون به صرفه"
        />
        <div className={styles.mainContent}>
          <Container fluid="lg">
            <div className={styles.innerHard}>
              <p>برنامه ها با بیشترین بار پردازشی و یا نیاز به منابع زیاد را به راحتی اجرا کنید. سرور های ابری نسل جدیدی از سرورها است که با توجه قدرت منابع به دو دسته استاندارد و اختصاصی تقسیم شده اند.</p>
              <p>در این نسل سرور ها شما میتوانید از بهترین منابع مانند پردازش گرهای نسل دوم AMD EPYC™ و Intel® Xeon® Gold و از دیسک های NVMe بهره ببرید.</p>
              <p>همه دلیلی که سرور های ابری این همه محبوب شده‌اند صرفه اقتصادی در عین امکانات بیشمارشان است. شما در این سرور ها سیستم عامل محبوب خود را دارید، میتوانید همه چیز را طبق علاقه ، سلیقه و نیازتان تنظیم کنید.ترافیک و حجم سرور بسیار مقرون به صرفه بوده و محدودیت های پردازشی بسیار محدودند!</p>
              <p>میتوانید سرور های ابری قدرتمند را از مکان های متفاوت دو نقطه از اروپا، آمریکا و در مراکز داده قدرتمند سفارش دهید.</p>
              <p><strong>برخی از ویژگی‌های سرور ابری</strong></p>
              <Row>
                <Col sm={6} xs={12}>
                  <p>
                    <i className="fa fa-cloud"></i> {' '}
                    میزبانی در پیشرفته‌ترین و ممتازترین مراکز داده
                  </p>
                </Col>
                <Col sm={6} xs={12}>
                  <p>
                    <i className="fa fa-cloud"></i> {' '}
                    ذخیره‌سازی با دیسک‌های پرسرعت NVMe
                  </p>
                </Col>
              </Row>
              <Row>
                <Col sm={6} xs={12}>
                  <p>
                    <i className="fa fa-cloud"></i> {' '}
                    ایجاد سریع و خودکار سرورهای ابری (در چند دقیقه)
                  </p>
                </Col>
                <Col sm={6} xs={12}>
                  <p>
                    <i className="fa fa-cloud"></i> {' '}
                    پشتیبانی از IPv4/IPv6
                  </p>
                </Col>
              </Row>
              <Row>
                <Col sm={6} xs={12}>
                  <p>
                    <i className="fa fa-cloud"></i> {' '}
                    امکان پشتیبان‌گیری از سرورهای ابری بر اساس تقاضا (Backup/Clone) * به زودی
                  </p>
                </Col>
                <Col sm={6} xs={12}>
                  <p>
                    <i className="fa fa-cloud"></i> {' '}
                    پشتیبانی از سیستم‌ عامل‌های متنوع لینوکس
                  </p>
                </Col>
              </Row>

              <p>&nbsp;</p>
              <div className={styles.notice}>
                <div className={styles.alert}>
                  <strong>توجه فرمائید</strong> که قرار داد شما در هر لحظه قابل
                  انصراف است و ما در لحظه انصراف هزینه باقی مانده سرویس شمارا به
                  شما بازپس خواهیم داد.این تضمین ما برای جلب رضایت شماست
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
                  <ul className={styles.nav}>
                  {this.getCountries(this.props.plans).map((country, index) => (
                    <li key={index} style={{minWidth: "33%"}} className="text-center">
                      <a
                        href={`#server_vps_cloud_${country.code.toLowerCase()}`}
                        onClick={() => {
                          this.props.switchAppIsScrolling();
                        }}
                      >
                        <span className={`flag-icon flag-icon-${country.code.toLowerCase()}`}></span>
                        {' '}
                        سرور ابری {this.getCountryTranslate(country.code)}
                      </a>
                    </li>
                  ))}
                  </ul>
                </Col>
              </Row>
              <Row id="servers">
                <Col sm={6} xs={12}>
                  <Link href="/server/vps/cloud#servers">
                    <a className={classNames(styles['tab-title'], {
                      [styles.active]: this.props.router.pathname === '/server/vps/cloud',
                    })}>
                      <h3 className={styles.h3}>استاندارد</h3>
                      <p>مناسب برای اجرای برنامه های بدون بار پردازشی زیاد، میزبانی وب سایت، اجرای برنامه های کاربردی و یا استفاده شخصی.</p>
                    </a>
                  </Link>
                </Col>
                <Col sm={6} xs={12}>
                  <Link href="/server/vps/cloud/dedicated#servers">
                    <a className={classNames(styles['tab-title'], {
                      [styles.active]: this.props.router.pathname === '/server/vps/cloud/dedicated',
                    })}>
                      <h3 className={styles.h3}>اختصاصی</h3>
                      <p>مناسب برای اجرای برنامه های پردازشی، میزبانی وب سایت های پربازدید، رمزگزاری ویدئو، یادگیری ماشین یا محاسبات تحقیقاتی.</p>
                    </a>
                  </Link>
                </Col>
              </Row>
              <div className={styles.locations}>
                <p className={classNames(styles.h4, 'h4')}>مکان ها:</p>
                <Row>
                  {this.getLocations(this.props.plans).map((location, index) => (
                    <Col sm={3} key={location.id} >
                      <a href={`#server_vps_cloud_${location.country.code.toLowerCase()}_${location.name}`}>
                        <p className={classNames(styles.h4, 'h4', 'ltr')}>
                          <span className={`flag-icon flag-icon-${location.country.code.toLowerCase()}`}></span>
                        {' '}{location.city}
                        </p>
                        <p className="text-muted ltr">{location.network_zone}</p>
                      </a>
                    </Col>
                  ))}
                  
                </Row>
              </div>
              <div className={styles.tables}> {this.getTables()} </div>
            </div>
          </Container>
        </div>
      </section>
    );
  }
}

export default withRouter(VpsPricing);

import * as React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import PagesHeader from '../PagesHeader/PagesHeader';
import CountryPricing from './CountryPricing/CountryPricing';
import styles from './VpsPricing.module.scss';
import classNames from 'classnames';

export interface VpsPricingProps {
  vpsData: any;
  type: 'professional' | 'storage' | 'economic';
}

export interface VpsPricingState {}

class VpsPricing extends React.Component<VpsPricingProps, VpsPricingState> {
  constructor(props: VpsPricingProps) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    var lastScrollTop = 0;

    const nav = document.querySelector('#vps-nav') as HTMLDivElement;

    const mainNavLinks = document.querySelectorAll('#vps-nav li a');

    window.addEventListener(
      'scroll',
      function () {
        var st = window.pageYOffset || document.documentElement.scrollTop;
        if (st > lastScrollTop) {
          // downscroll code
          nav.style.top = '0px';
        } else {
          // upscroll code
          nav.style.top = '90px';
        }

        let fromTop = window.scrollY;

        mainNavLinks.forEach((link: any) => {
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
        });

        lastScrollTop = st <= 0 ? 0 : st;
      },
      false
    );
  }

  render() {
    return (
      <section>
        <PagesHeader title="سرور مجازی" />
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
              <Row
                style={{
                  position: 'sticky',
                  top: '0',
                  margin: '30px 0',
                  backgroundColor: '#f8f8f8',
                  maxHeight: '106px',
                }}
                id="vps-nav"
              >
                <Col xs={12} className={styles.mnavigation}>
                  <ul className={styles.nav}>
                    <li>
                      <a
                        href="#server_vps_professional_France"
                        data-active="true"
                      >
                        سرور مجازی حرفه ای فرانسه
                      </a>
                    </li>
                    <li>
                      <a href="#server_vps_professional_Germany">
                        سرور مجازی حرفه ای آلمان
                      </a>
                    </li>
                    <li>
                      <a href="#server_vps_professional_Iran">
                        سرور مجازی حرفه ای ایران
                      </a>
                    </li>
                    <li>
                      <a href="/server/vps/economic#server_vps_economic_fr">
                        سرور مجازی اقتصادی فرانسه
                      </a>
                    </li>
                    <li>
                      <a href="/server/vps/economic#server_vps_economic_de">
                        سرور مجازی اقتصادی آلمان
                      </a>
                    </li>
                    <li>
                      <a href="/server/vps/economic#server_vps_economic_ir">
                        سرور مجازی اقتصادی ایران
                      </a>
                    </li>
                    <li>
                      <a href="/server/vps/storage#server_vps_storage_fr">
                        سرور مجازی حجیم فرانسه
                      </a>
                    </li>
                  </ul>
                </Col>
              </Row>
              {this.props.vpsData.map((countryData) => (
                <CountryPricing
                  countryData={countryData}
                  type={this.props.type}
                  key={countryData.country_title_en}
                />
              ))}
            </div>
          </Container>
        </div>
      </section>
    );
  }
}

export default VpsPricing;

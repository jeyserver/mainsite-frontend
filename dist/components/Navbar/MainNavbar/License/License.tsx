import classNames from 'classnames';
import Link from 'next/link';
import * as React from 'react';
import { Container, Dropdown, Row, Col } from 'react-bootstrap';
import styles from './License.module.scss';
import { License as LicenseType } from '../../../../pages/_app';
import formatPriceWithCurrency from '../../../../helper/formatPriceWithCurrency';
import { connect } from 'react-redux';
import { RootState } from '../../../../store';

type Licenses = 'DirectAdmin' | 'Cpanel' | 'LiteSpeed' | 'WHMCS' | 'CloudLinux';

const renderLicense = (license: Licenses) => {
  if (license === 'DirectAdmin') {
    return (
      <div className={styles.renderedLicenseWrapper}>
        <img
          src="/images/directadmin.png"
          alt="لایسنس دایرکت ادمین"
          height="61px"
          width="87px"
        />
        <p>
          دایرکت ادمین که بسیار ساده ، کاربردی و انعطاف پذیر است این روز ها
          مشتریان زیادی در کشورمان ایران پیدا کرده و با نسخه‌های متعددی از
          لینوکس CentOs، Ubuntu و Debian سازگاری کامل دارد. دایرکت ادمین اغلب به
          صورت کوتاه، DA نامیده می‌شود.
        </p>
      </div>
    );
  } else if (license === 'Cpanel') {
    return (
      <div className={styles.renderedLicenseWrapper}>
        <img
          src="/images/cpanel.png"
          alt="لایسنس دایرکت ادمین"
          height="59px"
          width="88px"
        />
        <p>
          سی پنل را همه میشناسند!سی پنل بسیار پویا و خوش ظاهر است،بسیاری از
          وبمستر ها به دلیل ظاهر آراسته اش به آن علاقمند شدند.سی پنل که محصول یک
          شرکت آمریکایی با همین نام است بر روی سرور های لینوکسی نصب میشود.ابزار
          معروف EasyApache را سال های قبل برای راحت کردن امور فنی ارائه کرد.
        </p>
      </div>
    );
  } else if (license === 'LiteSpeed') {
    return (
      <div className={styles.renderedLicenseWrapper}>
        <img
          src="/images/litespeed.png"
          alt="لایسنس دایرکت ادمین"
          height="59px"
          width="88px"
        />
        <p>
          وب سرور LiteSpeed ، یک وب سرور با کارایی بالا و مقیاس پذیری بالا هست.
          بطور کامل قابل تعویض با وب سرور آپاچی Apache میباشد آزمایش های ما ثابت
          کردن که 6 بار سریع تر از آپاچی عمل می کند.همچنین وقتی محتوا پویا باشد
          و پردازش PHP مورد بحث باشد ، لایت اسپید بیش از ۵۰% سریع تر از زمانی که
          آپاچی با mod_php عمل می کنه محتوای PHP رو تحویل خواهد داد.{' '}
        </p>
      </div>
    );
  } else if (license === 'WHMCS') {
    return (
      <div className={styles.renderedLicenseWrapper}>
        <img
          src="/images/whmcs.png"
          alt="لایسنس دایرکت ادمین"
          height="75px"
          width="75px"
        />
        <p>
          همان سیستمی است که تاکنون در بازار فروش جهانی جای خود را باز کرده و
          خودش یک پا "همه فن حریف" است!درگاه های پرداخت خود را به این سیستم
          معرفی کنید و بگویید که چه محصولاتی را ارائه میکنید، خودش همه ی کار ها
          را انجام میدهد.
        </p>
      </div>
    );
  } else if (license === 'CloudLinux') {
    return (
      <div className={styles.renderedLicenseWrapper}>
        <img
          src="/images/cloudlinux.png"
          alt="لایسنس دایرکت ادمین"
          height="69px"
          width="66px"
        />
        <p>
          کلاود لینوکس،اولین توزیع تجاری لینوکس، برای بهبود و کنترل شرایط سرور
          پدید آمده.اکثر مشتریان این توزیع مدیران سرور های میزبانی وب هستند که
          تمایل دارند تا کاربرانشان را در حالت ایزوله جدا از یکدگیر میزبانی
          کنند. کلاود لینوکس این امکان را صاحبان سرور میدهد تا برای هر کاربر
          منابع دقیقی(مثل رم و پردازشگر) مشخص کنند و درصورت استفاده بی رویه
          اکانت آن کاربر را غیرفعال کند.
        </p>
      </div>
    );
  }
};

const renderLicenseImg = (licenseRegistrar: number) => {
  switch (licenseRegistrar) {
    case 1:
      return (
        <img
          src="/images/directadmin.png"
          alt="لایسنس دایرکت ادمین"
          height="40px"
          width="59px"
        />
      );
    case 2:
      return (
        <img
          src="/images/cpanel.png"
          alt="لایسنس سی پنل"
          height="40px"
          width="59px"
        />
      );
    case 3:
      return (
        <img
          src="/images/litespeed.png"
          alt="لایسنس لایت اسپید"
          height="40px"
          width="59px"
        />
      );
    case 4:
      return (
        <img
          src="/images/whmcs.png"
          alt="لایسنس whmcs"
          height="40px"
          width="40px"
        />
      );
    case 5:
      return (
        <img
          src="/images/cloudlinux.png"
          alt="لایسنس کلود لینوکس"
          height="40px"
          width="38px"
        />
      );
    default:
      break;
  }
};

const renderLicenseTitle = (licenseRegistrar: number) => {
  switch (licenseRegistrar) {
    case 1:
      return 'DirectAdmin';
    case 2:
      return 'Cpanel';
    case 3:
      return 'LiteSpeed';
    case 4:
      return 'WHMCS';
    case 5:
      return 'CloudLinux';
  }
};

const renderPanelPeriod = (panelPeriod) => {
  switch (panelPeriod) {
    case 0:
      return 'برای همیشه';
    case 1:
      return 'در روز';
    case 2:
      return 'در ماه';
    case 3:
      return 'در سال';
  }
};

let interval;

interface LicenseProps {
  changeShowDropDown: () => void;
  changeShowMenu: () => void;
  licenses: LicenseType[];
  currencies: RootState['currencies'];
}

interface LicenseState {
  hoveredLicense: Licenses;
}

class License extends React.Component<LicenseProps, LicenseState> {
  constructor(props: LicenseProps) {
    super(props);
    this.state = {
      hoveredLicense: 'DirectAdmin',
    };
    this.goAutoToNextLicense = this.goAutoToNextLicense.bind(this);
    this.handleChangeHoveredLicense =
      this.handleChangeHoveredLicense.bind(this);
  }

  componentDidMount() {
    interval = setInterval(() => {
      this.goAutoToNextLicense(this.state.hoveredLicense);
    }, 8000);
  }

  componentWillUnmount() {
    clearInterval(interval);
  }

  goAutoToNextLicense(license: Licenses) {
    switch (license) {
      case 'DirectAdmin':
        this.setState({ hoveredLicense: 'Cpanel' });
        break;
      case 'Cpanel':
        this.setState({ hoveredLicense: 'LiteSpeed' });
        break;
      case 'LiteSpeed':
        this.setState({ hoveredLicense: 'WHMCS' });
        break;
      case 'WHMCS':
        this.setState({ hoveredLicense: 'CloudLinux' });
        break;
      case 'CloudLinux':
        this.setState({ hoveredLicense: 'DirectAdmin' });
        break;
      default:
        break;
    }
  }

  handleChangeHoveredLicense(license: Licenses) {
    clearInterval(interval);
    this.setState({ hoveredLicense: license }, () => {
      interval = setInterval(() => {
        this.goAutoToNextLicense(this.state.hoveredLicense);
      }, 8000);
    });
  }

  render() {
    const licenseWithLowestPrice = Object.values(
      this.props.licenses.reduce((r, o) => {
        if (
          (!r[o.registrar] || o.price > r[o.registrar].price) &&
          o.status === 1
        )
          r[o.registrar] = o;

        return r;
      }, {})
    );

    return (
      <Dropdown className="nav-item-dropdown">
        <Dropdown.Toggle id="nav-dropdown" className="nav-item-dropdown-toggle">
          <div onClick={this.props.changeShowDropDown}>
            <i className="far fa-address-card"></i>
            لایسنس
          </div>
        </Dropdown.Toggle>

        <Dropdown.Menu className="nav-item-dropdown-menu p-0">
          <Container fluid>
            <Row>
              <Col xs={12} md={6} className="px-0">
                <div className={styles.btnsWrapper}>
                  {licenseWithLowestPrice.map((license: LicenseType) => (
                    <Link
                      href={`/licenses/${renderLicenseTitle(
                        license.registrar
                      ).toLowerCase()}`}
                      key={license.registrar}
                    >
                      <a
                        className={classNames(styles.btn, 'license-btn')}
                        onMouseEnter={() => {
                          this.handleChangeHoveredLicense(
                            renderLicenseTitle(license.registrar)
                          );
                        }}
                        onClick={() => {
                          this.props.changeShowDropDown();
                          this.props.changeShowMenu();
                          document.querySelector('body').click();
                        }}
                        data-active={
                          this.state.hoveredLicense ===
                          renderLicenseTitle(license.registrar)
                        }
                      >
                        <div className={styles.imageAndNameWrapper}>
                          <div className={styles.imgWrapper}>
                            {renderLicenseImg(license.registrar)}
                          </div>
                          <span>{renderLicenseTitle(license.registrar)}</span>
                        </div>
                        <div>
                          <span>
                            از{' '}
                            {formatPriceWithCurrency(
                              this.props.currencies.items,
                              license.currency,
                              license.price
                            )}{' '}
                          </span>
                          <span> {renderPanelPeriod(license.pp)}</span>
                        </div>
                      </a>
                    </Link>
                  ))}
                </div>
              </Col>
              <Col xs={12} md={6} className="px-0">
                {renderLicense(this.state.hoveredLicense)}
              </Col>
            </Row>
          </Container>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    currencies: state.currencies,
  };
};

export default connect(mapStateToProps)(License);

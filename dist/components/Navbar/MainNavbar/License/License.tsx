import * as React from 'react';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Container, Dropdown, Row, Col } from 'react-bootstrap';
import styles from './License.module.scss';

type licenses = 'directadmin' | 'cpanel' | 'litespeed' | 'whmcs' | 'cloudlinux';

const renderLicense = (license: licenses) => {
  if (license === 'directadmin') {
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
  } else if (license === 'cpanel') {
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
  } else if (license === 'litespeed') {
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
  } else if (license === 'whmcs') {
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
  } else if (license === 'cloudlinux') {
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

let interval;

export interface LicenseProps {
  changeShowDropDown: () => void;
}

export interface LicenseState {
  hoveredLicense: licenses;
}

class License extends React.Component<LicenseProps, LicenseState> {
  constructor(props: LicenseProps) {
    super(props);
    this.state = {
      hoveredLicense: 'directadmin',
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

  goAutoToNextLicense(license: licenses) {
    switch (license) {
      case 'directadmin':
        this.setState({ hoveredLicense: 'cpanel' });
        break;
      case 'cpanel':
        this.setState({ hoveredLicense: 'litespeed' });
        break;
      case 'litespeed':
        this.setState({ hoveredLicense: 'whmcs' });
        break;
      case 'whmcs':
        this.setState({ hoveredLicense: 'cloudlinux' });
        break;
      case 'cloudlinux':
        this.setState({ hoveredLicense: 'directadmin' });
        break;
      default:
        break;
    }
  }

  handleChangeHoveredLicense(license: licenses) {
    clearInterval(interval);
    this.setState({ hoveredLicense: license }, () => {
      interval = setInterval(() => {
        this.goAutoToNextLicense(this.state.hoveredLicense);
      }, 8000);
    });
  }

  render() {
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
                  <Button
                    className={styles.btn}
                    onMouseEnter={() =>
                      this.handleChangeHoveredLicense('directadmin')
                    }
                    data-active={this.state.hoveredLicense === 'directadmin'}
                    href="/fa/licenses/directadmin"
                  >
                    <div className={styles.imageAndNameWrapper}>
                      <div className={styles.imgWrapper}>
                        <img
                          src="/images/directadmin.png"
                          alt="لایسنس دایرکت ادمین"
                          height="40px"
                          width="57px"
                        />
                      </div>
                      <span>DirectAdmin</span>
                    </div>
                    <div>
                      <span>از 28,200 تومان</span>
                      <span> در ماه</span>
                    </div>
                  </Button>

                  <Button
                    className={styles.btn}
                    onMouseEnter={() =>
                      this.handleChangeHoveredLicense('cpanel')
                    }
                    data-active={this.state.hoveredLicense === 'cpanel'}
                    href="/fa/licenses/cpanel"
                  >
                    <div className={styles.imageAndNameWrapper}>
                      <div className={styles.imgWrapper}>
                        <img
                          src="/images/cpanel.png"
                          alt="لایسنس دایرکت ادمین"
                          height="40px"
                          width="60px"
                        />
                      </div>
                      <span>Cpanel</span>
                    </div>
                    <div>
                      <span>از 28,200 تومان</span>
                      <span> در ماه</span>
                    </div>
                  </Button>

                  <Button
                    className={styles.btn}
                    onMouseEnter={() =>
                      this.handleChangeHoveredLicense('litespeed')
                    }
                    data-active={this.state.hoveredLicense === 'litespeed'}
                    href="/fa/licenses/litespeed"
                  >
                    <div className={styles.imageAndNameWrapper}>
                      <div className={styles.imgWrapper}>
                        <img
                          src="/images/litespeed.png"
                          alt="لایسنس دایرکت ادمین"
                          height="40px"
                          width="57px"
                        />
                      </div>
                      <span>LiteSpeed</span>
                    </div>
                    <div>
                      <span>از 51,000 تومان</span>
                      <span> در ماه</span>
                    </div>
                  </Button>

                  <Button
                    className={styles.btn}
                    onMouseEnter={() =>
                      this.handleChangeHoveredLicense('whmcs')
                    }
                    data-active={this.state.hoveredLicense === 'whmcs'}
                    href="/fa/licenses/whmcs"
                  >
                    <div className={styles.imageAndNameWrapper}>
                      <div className={styles.imgWrapper}>
                        <img
                          src="/images/whmcs.png"
                          alt="لایسنس دایرکت ادمین"
                          height="40px"
                          width="40px"
                        />
                      </div>
                      <span>WHMCS</span>
                    </div>
                    <div>
                      <span>از 137,500 تومان</span>
                      <span> در ماه</span>
                    </div>
                  </Button>

                  <Button
                    className={styles.btn}
                    onMouseEnter={() =>
                      this.handleChangeHoveredLicense('cloudlinux')
                    }
                    data-active={this.state.hoveredLicense === 'cloudlinux'}
                    href="/fa/licenses/cloudlinux"
                  >
                    <div className={styles.imageAndNameWrapper}>
                      <div className={styles.imgWrapper}>
                        <img
                          src="/images/cloudlinux.png"
                          alt="لایسنس دایرکت ادمین"
                          height="38px"
                          width="40px"
                        />
                      </div>
                      <span>CloudLinux</span>
                    </div>
                    <div>
                      <span>از 56,400 تومان</span>
                      <span> در ماه</span>
                    </div>
                  </Button>
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

export default License;

// interface Props {
//   changeShowDropDown: () => void;
// }

// const License: React.FC<Props> = (props) => {
//   const [hoveredLicense, setHoveredLicense] = useState<licenses>('directadmin');

//   const handleChangeHoveredLicense = (license: licenses) => {
//     clearInterval(interval);
//     setHoveredLicense(license);
//   };

//   const goAutoToNextLicense = (license: licenses) => {
//     switch (license) {
//       case 'directadmin':
//         setHoveredLicense('cpanel');
//         break;
//       case 'cpanel':
//         setHoveredLicense('litespeed');
//         break;
//       case 'litespeed':
//         setHoveredLicense('whmcs');
//         break;
//       case 'whmcs':
//         setHoveredLicense('cloudlinux');
//         break;
//       case 'cloudlinux':
//         setHoveredLicense('directadmin');
//         break;
//       default:
//         break;
//     }
//   };

//   useEffect(() => {
//     interval = setInterval(() => {
//       goAutoToNextLicense(hoveredLicense);
//     }, 8000);
//     return () => clearInterval(interval);
//   }, [hoveredLicense]);

//   return (

//   );
// };

// export default License;

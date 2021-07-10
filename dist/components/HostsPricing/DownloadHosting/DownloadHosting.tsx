import * as React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import Link from 'next/link';
import PagesHeader from '../../PagesHeader/PagesHeader';
import Facilities from '../Facilities/Facilities';
import DownloadHostingTable from './DownloadHostingTable/DownloadHostingTable';
import styles from '../PageInfoStyles.module.scss';

export interface DownloadHostingProps {
  downloadHosts: any;
  navData: any;
}

export interface DownloadHostingState {}

class DownloadHosting extends React.Component<
  DownloadHostingProps,
  DownloadHostingState
> {
  constructor(props: DownloadHostingProps) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    var lastScrollTop = 0;

    const nav = document.querySelector('#dedicated-nav') as HTMLDivElement;

    const mainNavLinks = document.querySelectorAll('#dedicated-nav li a');

    window.addEventListener(
      'scroll',
      function () {
        var st = window.pageYOffset || document.documentElement.scrollTop;
        if (st > lastScrollTop) {
          // downscroll code
          nav.style.top = '0px';
        } else {
          // upscroll code
          nav.style.top = '80px';
        }

        let fromTop = window.scrollY;

        if (fromTop > 660) {
          nav.style.position = 'fixed';
          nav.style.margin = '0';
        } else {
          nav.style.position = 'static';
          nav.style.margin = '30px 0';
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
      },
      false
    );
  }

  render() {
    return (
      <section>
        <PagesHeader title="هاست دانلود" />

        <Container>
          <div className={styles.mainContent}>
            <div className={styles.innerHard}>
              <div>
                <p />
                <div>
                  <p>
                    هاست دانلود مخصوص میزبانی فایل های شماست.پورت های این سرور
                    ها حداقل 500 مگابیت میباشد که تضمین کننده رضایت کاربران شما
                    در یک دانلود شیرین خواهد بود.
                  </p>
                  <p>
                    در هاست شما سرعت و تعداد کانکشن ها بصورت منصفانه ای محدود
                    میشوند که هرگز افت سرعت دانلود را شاهد نباشیم.
                  </p>
                  <div className={styles.notice}>
                    <div className={styles.alert}>
                      <strong>توجه فرمائید</strong> که قرار داد شما در هر لحظه
                      قابل انصراف است و ما در لحظه انصراف هزینه باقی مانده سرویس
                      شمارا به شما بازپس خواهیم داد.این تضمین ما برای جلب رضایت
                      شماست
                    </div>
                  </div>
                  <p>
                    هاست های دانلود جی سرور فقط مخصوص دانلود میباشد و قابلیت
                    استفاده از دیتابیس Mysql در این نوع از سرویس ها
                    وجودندارد.برای راه اندازی وب سایت و نصب اسکریپت سرویس های{' '}
                    <Link href="/hosting/linux/professional">
                      <a>هاست لینوکس</a>
                    </Link>{' '}
                    جی سرور استفاده کنید.
                  </p>
                  <p>
                    در هاست فایل جی سرور از تمامی فایل های شما هر 3 روز یک بار
                    بک آپ تهیه میشود و بر روی نقاط دیگری از جهان ذخیره می شوند
                    تا ما و شما از ایمنی اطلاعات شما مطمپن باشیم.
                  </p>
                  <p>
                    ما امنیت شمارا با آنتی ویروس معروف{' '}
                    <a href="http://kb.jeyserver.com/fa/servers/softwares/clamav">
                      ClamAv
                    </a>{' '}
                    تامین میکنیم وهارد های سرورمان را به کمک تکنولوژی{' '}
                    <a href="http://kb.jeyserver.com/fa/servers/raid">RIAD</a>{' '}
                    <a href="http://kb.jeyserver.com/fa/servers/raid#raid1">
                      1
                    </a>{' '}
                    آیینه یک دیگر میکنیم تا علاوه بر سرعت امنیت اطلاعاتتان نیز
                    حفظ شود
                  </p>
                  <p>
                    در هاست فایل استفاده از لیچر ها به شرط عدم مصرف بی رویه
                    منابع مجاز میباشد!
                  </p>
                  <p>&nbsp;</p>
                  <p />
                </div>
              </div>
            </div>
          </div>
        </Container>
        <Container>
          <Row className={styles.stickyNav} id="dedicated-nav">
            <Col xs={12} className={styles.mnavigation}>
              <ul className={styles.nav}>
                {this.props.downloadHosts.map((panels, index) => (
                  <li key={panels.country_name_en}>
                    <a href={`#${panels.country_name_en}`}>
                      هاست دانلود {panels.country_name_fa}
                    </a>
                  </li>
                ))}
                {this.props.navData.backup_hosts.map((host) => (
                  <li>
                    <Link href={`/hosting/backup#${host.link}`}>
                      <a>هاست پشتیبان {host.title}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </Col>
          </Row>

          <Row className={styles.properties}>
            <Col md={2}>
              <Image src="/images/transfer_100x100.png" />
            </Col>
            <Col md={10}>
              <div>
                <p className={styles.title}>انتقال خودکار اطلاعات</p>
                <p>بزرگترین دغدغه تان را به جی سرور بسپارید.</p>
                <p>
                  فقط کافیست تا اطلاعات کنترل پنل قبلیتان را وارد کنید، منتظر
                  بمانید.. کمی دیگر.. حالا باید شروع به گسترش وبسایتتان بر روی
                  سرویس های جی سرور کنید.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Col>
              {this.props.downloadHosts.map((panels, index) => (
                <DownloadHostingTable data={panels} key={index} />
              ))}
            </Col>
          </Row>
          <div style={{ marginBottom: '50px' }}>
            <Facilities />
          </div>
        </Container>
      </section>
    );
  }
}

export default DownloadHosting;

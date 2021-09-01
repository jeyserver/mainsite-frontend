import * as React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import Link from 'next/link';
import PagesHeader from '../../PagesHeader/PagesHeader';
import Facilities from '../Facilities/Facilities';
import DownloadHostingTable from './DownloadHostingTable/DownloadHostingTable';
import styles from '../PageInfoStyles.module.scss';
import hosts from '../../../lib/products/host';
import { IHostPlan } from '../../../helper/types/products/Host/plan';

interface IProps {
  plans: IHostPlan[];
  appIsScrolling: boolean;
  switchAppIsScrolling: () => void;
}

interface IState {
  isNavFixed: boolean;
  sepratedPlansByCountry: IHostPlan[][];
}

class DownloadHosting extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isNavFixed: false,
      sepratedPlansByCountry: [],
    };
    this.onScroll = this.onScroll.bind(this);
  }

  lastScrollTop = 0;

  onScroll() {
    const nav = document.querySelector('#file-nav') as HTMLDivElement;

    const mainNavLinks = document.querySelectorAll(
      '#file-nav li[data-main="true"] a'
    );

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

    if (fromTop > 638) {
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

    this.lastScrollTop = st <= 0 ? 0 : st;
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll, false);
    this.props.switchAppIsScrolling();

    this.setState({
      sepratedPlansByCountry: Object.values(
        this.props.plans.reduce((accumulator, currentValue) => {
          const co = currentValue.country.code;

          if (accumulator && accumulator[co]) {
            accumulator[co] = [...accumulator[co], currentValue];
          } else {
            accumulator[co] = [currentValue];
          }

          return accumulator;
        }, {})
      ),
    });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
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
                    <a
                      href={`${process.env.SCHEMA}://kb.${process.env.DOMAIN}/fa/servers/softwares/clamav`}
                    >
                      ClamAv
                    </a>{' '}
                    تامین میکنیم وهارد های سرورمان را به کمک تکنولوژی{' '}
                    <a
                      href={`${process.env.SCHEMA}://kb.${process.env.DOMAIN}/fa/servers/raid`}
                    >
                      RIAD
                    </a>{' '}
                    <a
                      href={`${process.env.SCHEMA}://kb.${process.env.DOMAIN}/fa/servers/raid#raid1`}
                    >
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
          {this.state.isNavFixed && (
            <div
              style={{
                height:
                  document.querySelector<HTMLDivElement>('#file-nav')
                    .clientHeight,
              }}
              className={styles.emptySpaceForNav}
            ></div>
          )}

          <Row className={styles.stickyNav} id="file-nav">
            <Col xs={12} className={styles.mnavigation}>
              <ul className={styles.nav}>
                {hosts.download_hosts.map((host, index) => (
                  <li key={host.title} data-main="true">
                    <a
                      href={`#${host.link}`}
                      onClick={() => {
                        this.props.switchAppIsScrolling();
                      }}
                    >
                      هاست دانلود {host.title}
                    </a>
                  </li>
                ))}
                {hosts.backup_hosts.map((host) => (
                  <li key={host.link}>
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
              {this.state.sepratedPlansByCountry.map((plans, index) => (
                <div key={index}>
                  <DownloadHostingTable plans={plans} />
                  <div className={styles.tableBottomSpace}></div>
                </div>
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

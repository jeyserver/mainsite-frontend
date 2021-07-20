import * as React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import Link from 'next/link';
import PagesHeader from '../../PagesHeader/PagesHeader';
import Facilities from '../Facilities/Facilities';
import BackupHostingTable from './BackupHostingTable/BackupHostingTable';
import styles from '../PageInfoStyles.module.scss';

export interface BackupHostingProps {
  backupHosts: any;
  navData: any;
  appIsScrolling: boolean;
  switchAppIsScrolling: () => void;
}

export interface BackupHostingState {
  isNavFixed: boolean;
}

let lastScrollTop = 0;

class BackupHosting extends React.Component<
  BackupHostingProps,
  BackupHostingState
> {
  constructor(props: BackupHostingProps) {
    super(props);
    this.state = {
      isNavFixed: false,
    };
    this.onScroll = this.onScroll.bind(this);
  }

  onScroll() {
    const nav = document.querySelector('#backup-nav') as HTMLDivElement;

    const mainNavLinks = document.querySelectorAll(
      '#backup-nav li[data-main="true"] a'
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

    if (fromTop > 660) {
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
        if (link.hash.split('').filter((i) => i === '#').length < 2) {
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
        <PagesHeader title="هاست بکاپ" />

        <Container>
          <div className={styles.mainContent}>
            <div className={styles.innerHard}>
              <div>
                <p />
                <p>
                  این سرویس مخصوص کسانی است که میخواهد به هیچ وجه فایل های خود
                  را از دست ندهند و شب ها با خیالی آسوده به خواب بروند!
                </p>
                <p>
                  در صورتی که شما هم برای زحمت هایتان ارزش قائلید یا حداقل
                  مسئولیت نگهداری وب سایت بر عهده شماست این سرویس کمک میکند که
                  در بازه های زمانی منظم یا نا منظم از وب سایت شما نسخه های
                  پشتیبانی تهیه و بر روی سرور های جی سرور ذخیره و نگهداری شوند.
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
                  البته الزاما این فایل ها نباید نسخه های پشتیبانی باشند،این
                  فایل ها میتوانند هر چیزی باشند که شما میخواهید فقط خودتان تحت
                  شرایط محدودی به آن دسترسی پیدا کنید.
                </p>
                <p>
                  در این نوع میزبانی دسترسی فقط از طریق اکانت های FTP میسر
                  میباشند و شما قادر به اجرای هیچ اسکریپتی نیستید.
                </p>
                <p>
                  {' '}
                  درصورتی که از روش های پشتیبانگیری از وب سایت یا سرور خود آگاهی
                  کامل ندارید.ما میتوانیم رایگان به شما کمک کنیم فقط کافی است
                  برای ما <a>درخواست پشتیبانی</a> ارسال کنید،حتی اگر هنوز سرویسی
                  خریداری نکردید!
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
                  آیینه یک دیگر میکنیم تا علاوه بر سرعت امنیت اطلاعاتتان نیز حفظ
                  شود
                </p>
                <p>&nbsp;</p>
                <p />
              </div>
            </div>
          </div>
        </Container>
        <Container>
          {this.state.isNavFixed && (
            <div
              style={{
                height:
                  document.querySelector<HTMLDivElement>('#backup-nav')
                    .clientHeight,
              }}
              className={styles.emptySpaceForNav}
            ></div>
          )}

          <Row className={styles.stickyNav} id="backup-nav">
            <Col xs={12} className={styles.mnavigation}>
              <ul className={styles.nav}>
                {this.props.backupHosts.map((panels, index) => (
                  <li key={panels.country_name_en} data-main="true">
                    <a
                      href={`#${panels.country_name_en}`}
                      onClick={() => {
                        this.props.switchAppIsScrolling();
                      }}
                    >
                      هاست پشتیبان {panels.country_name_fa}
                    </a>
                  </li>
                ))}
                {this.props.navData.download_hosts.map((host) => (
                  <li key={host.title}>
                    <Link href={`/hosting/file#${host.link}`}>
                      <a>هاست دانلود {host.title}</a>
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
              <Row
                id={`${this.props.backupHosts[0].country_name_en}`}
                className={styles.tableWrapper}
              >
                <BackupHostingTable
                  data={this.props.backupHosts[0]}
                  hideTopInfo={false}
                />
                <BackupHostingTable
                  data={this.props.backupHosts[0]}
                  hideTopInfo={true}
                />
              </Row>
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

export default BackupHosting;

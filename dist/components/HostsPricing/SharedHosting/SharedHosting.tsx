import * as React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import SharedHostingTable from './SharedHostingTable/SharedHostingTable';
import PagesHeader from '../../PagesHeader/PagesHeader';
import Facilities from '../Facilities/Facilities';
import HostFaq from '../HostFaq/HostFaq';
import {
  getPageForHeader,
  getPageInfo,
  page,
  renderTopNav,
  getScrollTopForFixNav,
} from './utils';
import styles from '../PageInfoStyles.module.scss';

export interface SharedHostingProps {
  sharedHosts: any;
  navData: any;
  page: page;
}

export interface SharedHostingState {}

class SharedHosting extends React.Component<
  SharedHostingProps,
  SharedHostingState
> {
  constructor(props: SharedHostingProps) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    var lastScrollTop = 0;

    const nav = document.querySelector(
      `#${this.props.page}-nav`
    ) as HTMLDivElement;

    const mainNavLinks = document.querySelectorAll(
      `#${this.props.page}-nav li a`
    );

    window.addEventListener(
      'scroll',
      () => {
        var st = window.pageYOffset || document.documentElement.scrollTop;
        if (st > lastScrollTop) {
          // downscroll code
          nav.style.top = '0px';
        } else {
          // upscroll code
          nav.style.top = '80px';
        }

        let fromTop = window.scrollY;

        if (fromTop > getScrollTopForFixNav(this.props.page)) {
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
        <PagesHeader title={getPageForHeader(this.props.page)} />

        <Container className={styles.container}>
          <div className={styles.mainContent}>
            <div className={styles.innerHard}>
              {getPageInfo(this.props.page)}
            </div>
          </div>

          <Row className={styles.stickyNav} id={`${this.props.page}-nav`}>
            <Col xs={12} className={styles.mnavigation}>
              {renderTopNav(this.props.page, this.props.navData)}
            </Col>
          </Row>

          {this.props.page === 'linux_standard' ||
          this.props.page === 'linux_professional' ? (
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
          ) : null}

          <Row>
            <Col>
              {this.props.sharedHosts.map((panels, index) => (
                <SharedHostingTable
                  page={this.props.page}
                  data={panels}
                  key={index}
                />
              ))}
            </Col>
          </Row>
          <Row>
            {this.props.page === 'linux_professional' ||
            this.props.page === 'linux_standard' ? (
              <>
                <Facilities />
                <HostFaq />
              </>
            ) : null}
          </Row>
        </Container>
      </section>
    );
  }
}

export default SharedHosting;

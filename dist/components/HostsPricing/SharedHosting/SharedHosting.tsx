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
  appIsScrolling: boolean;
  switchAppIsScrolling: () => void;
}

export interface SharedHostingState {
  isNavFixed: boolean;
}

var lastScrollTop = 0;

class SharedHosting extends React.Component<
  SharedHostingProps,
  SharedHostingState
> {
  constructor(props: SharedHostingProps) {
    super(props);
    this.state = {
      isNavFixed: false,
    };
    this.onScrollFixedNav = this.onScrollFixedNav.bind(this);
    this.onScrollFindActive = this.onScrollFindActive.bind(this);
    this.onScrollTopNav = this.onScrollTopNav.bind(this);
  }

  onScrollFixedNav() {
    const nav = document.querySelector(
      `#${this.props.page}-nav`
    ) as HTMLDivElement;

    let fromTop = window.scrollY;

    if (fromTop > getScrollTopForFixNav(this.props.page)) {
      nav.style.position = 'fixed';
      nav.style.margin = '0';
      this.setState({ isNavFixed: true });
    } else {
      nav.style.position = 'static';
      nav.style.margin = '30px 0';
      this.setState({ isNavFixed: false });
    }
  }

  onScrollFindActive() {
    const mainNavLinks = document.querySelectorAll(
      `#${this.props.page}-nav li[data-main="true"] > a`
    );

    let fromTop = window.scrollY;

    mainNavLinks.forEach((link: any) => {
      let section = document.querySelector(link.hash);

      if (
        section.offsetTop - 20 <= fromTop &&
        section.offsetTop + section.offsetHeight > fromTop
      ) {
        link.dataset.active = 'true';
        return;
      } else {
        link.dataset.active = 'false';
        return;
      }
    });
  }

  onScrollTopNav() {
    const nav = document.querySelector(
      `#${this.props.page}-nav`
    ) as HTMLDivElement;

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

    lastScrollTop = st <= 0 ? 0 : st;
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScrollFindActive, false);
    window.addEventListener('scroll', this.onScrollFixedNav, false);
    window.addEventListener('scroll', this.onScrollTopNav, false);

    this.props.switchAppIsScrolling();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScrollFindActive, false);
    window.removeEventListener('scroll', this.onScrollFixedNav, false);
    window.removeEventListener('scroll', this.onScrollTopNav, false);
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

          {this.state.isNavFixed && (
            <div
              style={{
                height: document.querySelector<HTMLDivElement>(
                  `#${this.props.page}-nav`
                ).clientHeight,
              }}
              className={styles.emptySpaceForNav}
            ></div>
          )}

          <Row className={styles.stickyNav} id={`${this.props.page}-nav`}>
            <Col xs={12} className={styles.mnavigation}>
              {renderTopNav(
                this.props.page,
                this.props.navData,
                this.props.switchAppIsScrolling
              )}
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
                <div key={index}>
                  <SharedHostingTable page={this.props.page} data={panels} />
                  <div className={styles.tableBottomSpace}></div>
                </div>
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

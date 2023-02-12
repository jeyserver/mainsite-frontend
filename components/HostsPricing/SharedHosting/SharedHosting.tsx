import * as React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import SharedHostingTable from '../../Tables/SharedHostingTable/SharedHostingTable';
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
import { IHostPlan } from '../../../helper/types/products/Host/plan';

interface IProps {
  sharedHosts: IHostPlan[];
  page: page;
  appIsScrolling: boolean;
  switchAppIsScrolling: () => void;
}

interface IState {
  plans: IHostPlan[][];
}

class SharedHosting extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      plans: Object.values(
        this.props.sharedHosts.reduce((accumulator, currentValue) => {
          const co = `${currentValue.country.code}-${currentValue.cp}`;

          if (accumulator && accumulator[co]) {
            accumulator[co] = [...accumulator[co], currentValue];
          } else {
            accumulator[co] = [currentValue];
          }

          return accumulator;
        }, {})
      ),
    };
    this.onScroll = this.onScroll.bind(this);
  }

  lastScrollTop = 0;

  onScroll() {
    const nav = document.querySelector(
      `#${this.props.page}-nav`
    ) as HTMLDivElement;
    const mainNavLinks = document.querySelectorAll(
      `#${this.props.page}-nav li[data-main="true"] > a`
    );
    const emptySpaceForNav = document.querySelector(
      '#emptySpaceForNav'
    ) as HTMLDivElement;

    let fromTop = window.scrollY;

    if (fromTop > getScrollTopForFixNav(this.props.page)) {
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

      if (
        section &&
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

    var st = window.pageYOffset || document.documentElement.scrollTop;
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

    this.lastScrollTop = st <= 0 ? 0 : st;
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
        <PagesHeader title={getPageForHeader(this.props.page)} />

        <Container className={styles.container}>
          <div className={styles.mainContent}>
            <div className={styles.innerHard}>
              {getPageInfo(this.props.page)}
            </div>
          </div>

          <div
            style={{
              height: '80px',
            }}
            id="emptySpaceForNav"
            className={styles.emptySpaceForNav}
          ></div>

          <Row className={styles.stickyNav} id={`${this.props.page}-nav`}>
            <Col xs={12} className={styles.mnavigation}>
              {renderTopNav(this.props.page, this.props.switchAppIsScrolling)}
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
              {this.state.plans.map((panels: IHostPlan[], index) => (
                <div
                  key={index}
                  id={`${this.props.page}_${panels[0].country.code}${this.props.page.search('linux') > -1
                      ? `_${panels[0].cp}`
                      : ''
                    }`}
                  className={styles.tableWrapper}
                >
                  <SharedHostingTable
                    type={
                      this.props.page.search('windows') > -1
                        ? 'windows'
                        : 'linux'
                    }
                    subType={
                      this.props.page.search('professional') > -1
                        ? 'professional'
                        : 'standard'
                    }
                    data={panels}
                    homePageTable={false}
                  />
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

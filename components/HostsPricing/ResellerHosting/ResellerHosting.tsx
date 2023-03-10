import * as React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import Link from 'next/link';
import PagesHeader from '../../PagesHeader/PagesHeader';
import Facilities from '../Facilities/Facilities';
import ResellerHostingTable from './ResellerHostingTable/ResellerHostingTable';
import styles from '../PageInfoStyles.module.scss';
import HostFaq from '../HostFaq/HostFaq';
import { IHostPlan } from '../../../helper/types/products/Host/plan';
import hosts from '../../../lib/products/host';

interface IProps {
  plans: IHostPlan[];
  appIsScrolling: boolean;
  switchAppIsScrolling: () => void;
}

interface IState {
  sepratedPlansByLicence: IHostPlan[][];
}

class ResellerHosting extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      sepratedPlansByLicence: Object.values(
        this.props.plans.reduce((accumulator, currentValue) => {
          const co = `${currentValue.cp}_${currentValue.country.code}`;

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
    const nav = document.querySelector('#reseller-nav') as HTMLDivElement;

    const mainNavLinks = document.querySelectorAll('#reseller-nav li a');
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
        nav.style.top = '0px';
      }
    }

    let fromTop = window.scrollY;

    if (fromTop > 750) {
      nav.style.position = 'fixed';
      nav.style.margin = '0';
      emptySpaceForNav.style.display = 'block';
    } else {
      nav.style.position = 'static';
      nav.style.margin = '30px 0';
      emptySpaceForNav.style.display = 'none';
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
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  render() {
    return (
      <section>
        <PagesHeader title="???????????????? ???????? ?????????????? ????????????" />

        <Container>
          <div className={styles.mainContent}>
            <div className={styles.innerHard}>
              <div>
                <p></p>
                <p>
                  ???? ?????? ?????? ???? ???????????????? ?????????????? ???????????? ?????? ???????????? ?????? ???????? ????
                  ???????? ???????? ???????? ???????? ???????? ?????? ???????? ???????????? ????????.
                </p>
                <p>
                  ???? ???????????????? ???????? ???????????? ???? ?????? ?????? ???????????? ???? ?????? WHM ???? ????????????
                  ???????? ?? ???????????????? ???????? ???????? ???? ???????? ?????????? ?????? ???????? ???????????? ????????????
                  ?? ???????? ?????? ???????? ???? ???? ???????? ???? ?????? ?? ???????????? ????????????????
                </p>
                <p>&nbsp;</p>
                <p>
                  ?????????? ???? ?????? ?????? <b>??????</b> ???? ?????????? ?????? ???? ???????? ???? ???? ??????
                  ???????? ?????? ???? ?????? ???????? ?? ???????? ?????????????? ???? ???? ?????????? ?????????? ????????????????
                  ?????????????? ????????.
                </p>
                <p>
                  ???????? ???? ?????? ?????? ???? ???? ???????? ???? ?????????? ?????????????? ?????? ?? ????????????????????
                  ?????????? ???????????????? ???? 24 ???????? ???????? ?????? ?????????????? ???????? ?????????? ?? ????
                  ???????? ?????????? ???? ???????? ?????????? ???????? ??????????.
                </p>
                <p>
                  ?????????? ?????? ???? ?????? ?????? ???????? ???????? ?????????? ???????????? ????????{' '}
                  <a
                    className="chcolor"
                    href={`${process.env.SCHEMA}://kb.${process.env.DOMAIN}/fa/servers/softwares/clamav`}
                  >
                    ClamAv
                  </a>{' '}
                  ?????????? ???????????? ???????????? ???????? ???? ???? ?????????? ????????????????{' '}
                  <a
                    className="chcolor"
                    href={`${process.env.SCHEMA}://kb.${process.env.DOMAIN}/fa/servers/raid`}
                  >
                    RIAD
                  </a>{' '}
                  <a
                    className="chcolor"
                    href={`${process.env.SCHEMA}://kb.${process.env.DOMAIN}/fa/servers/raid#raid1`}
                  >
                    1
                  </a>{' '}
                  ?????????? ???? ???????? ???????????? ???? ?????????? ???? ???????? ?????????? ?????????????? ?????? ??????
                  ??????
                </p>
                <p>
                  ???????? ?????? ???? ???????? ???? ???????? ???? ?????????? ?? ?????????????? ???????????? ???? ??????
                  ???????????????? ???? ???? ???? ?????????? ?????? ???????????? ?????????? ???? ?????? ?? ?????????????? ????????
                  ?? ?????????? ?????????? ?????? ???????? ???????? ???????????? ???????????? ?? ???????????? ???? ???? ??????
                  ???????? ???? ?????? ?????? ??????.
                </p>
                <p>
                  ???????????? ???? ?????? ?????????? ???? ?????????? API ?????? ???????? ???????? ?????????????? ????
                  ?????????? ?????? ???????????? ???????? ???????? ?????????? WHMCS ???? ???????????? ?????????????? ????????
                  ???????? ?????????? ????????.
                </p>
                <p>&nbsp;</p>
                <div className={styles.notice}>
                  <div className={styles.alert}>
                    <strong>???????? ??????????????</strong> ???? ???????? ?????? ?????? ???? ???? ????????
                    ???????? ???????????? ?????? ?? ???? ???? ???????? ???????????? ?????????? ???????? ?????????? ??????????
                    ?????????? ???? ?????? ?????????? ???????????? ??????.?????? ?????????? ???? ???????? ?????? ??????????
                    ??????????
                  </div>
                </div>
                <p>&nbsp;</p> <p />
              </div>
            </div>
          </div>
        </Container>
        <Container>
          <div
            style={{
              height: '55px',
            }}
            id="emptySpaceForNav"
            className={styles.emptySpaceForNav}
          ></div>

          <Row className={styles.stickyNav} id="reseller-nav">
            <Col xs={12} className={styles.mnavigation}>
              <ul className={styles.nav}>
                {hosts.reseller_hosts.map((panel, index) => (
                  <li key={panel.link} data-main="true">
                    <a
                      href={`#${panel.link}`}
                      onClick={() => {
                        this.props.switchAppIsScrolling();
                      }}
                    >
                      ???????????????? ???????? {panel.title}
                    </a>
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
                <p className={styles.title}>???????????? ???????????? ??????????????</p>
                <p>???????????????? ?????????? ?????? ???? ???? ???? ???????? ??????????????.</p>
                <p>
                  ?????? ???????????? ???? ?????????????? ?????????? ?????? ?????????????? ???? ???????? ?????????? ??????????
                  ????????????.. ?????? ????????.. ???????? ???????? ???????? ???? ?????????? ?????????????????? ???? ??????
                  ?????????? ?????? ???? ???????? ????????.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Col>
              {this.state.sepratedPlansByLicence.map((plans, index) => (
                <div key={index}>
                  <ResellerHostingTable plans={plans} />
                  <div className={styles.tableBottomSpace}></div>
                </div>
              ))}
            </Col>
          </Row>
          <Facilities />
          <HostFaq />
        </Container>
      </section>
    );
  }
}

export default ResellerHosting;

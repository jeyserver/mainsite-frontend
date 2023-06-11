import * as React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
import { countries } from '../lib/countries';
import moment from 'jalali-moment';
import styles from './CountryPlan.module.scss';
import Link from 'next/link';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { RootState } from '../../../store';
import { formatSpace } from '../../../helper/formatSpace';
import { formatHards } from '../../../helper/formatHards';
import { IDedicatedPlan } from '../../../helper/types/products/Dedicated/plan';
import { formatPriceWithCurrency } from '../../../store/Currencies';
import PagesHeader from '../../PagesHeader/PagesHeader';
import getCpuLink from '../../../helper/getCpuLink';

interface IProps {
  plan: IDedicatedPlan;
  currencies: RootState['currencies'];
}

class CountryPlan extends React.Component<IProps> {
  getDatacenterLink(name) {
    switch (name) {
      case 'Hetzner - Germany':
        return 'http://hetzner.de/';
      case 'Hetzner - Finland':
        return 'http://hetzner.com/';
      case 'Shahrad':
        return 'http://shahrad.net/';
      case 'AsiaTech':
        return 'http://asiatech.ir/';
      case 'OVH-France':
        return 'http://ovh.com/';
      case 'WorldStream':
        return 'http://worldstream.nl/';
      case 'OVH_BHS':
        return 'http://ovh.com/';
      default:
        return '';
    }
  }

  render() {
    const targetCountry = countries[this.props.plan.datacenter.country.code];

    return (
      <section>
        <PagesHeader
          title={`سرور اختصاصی ${targetCountry.title_fa} ${this.props.plan.title}`}
        />

        <div className={styles.mainContent}>
          <Container>
            <div>
              <Row className="flex-column-reverse flex-lg-row">
                <Col lg={4}>
                  <div className={styles.orderbloc}>
                    <ul className={styles.list}>
                      <li>
                        <p className={styles.title}> دیتاسنتر </p>
                        <a
                          target="_blank"
                          href={this.getDatacenterLink(
                            this.props.plan.datacenter.title
                          )}
                        >
                          <p className={styles.value}>
                            {this.props.plan.datacenter.title}
                          </p>
                        </a>
                        <div className={styles.value}>
                          {this.props.plan.datacenter.country.name}
                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip
                                className={styles.tooltip}
                                id={`tooltip-${this.props.plan.datacenter.country.name}`}
                              >
                                {this.props.plan.datacenter.country.name}
                              </Tooltip>
                            }
                          >
                            <div className={styles.flagWrapper}>
                              <img
                                src={targetCountry.flag24}
                                title=""
                                alt={this.props.plan.datacenter.country.name}
                              />
                            </div>
                          </OverlayTrigger>
                        </div>
                      </li>
                      <li>
                        <p className={styles.title}> آی پی </p>
                        <p className={styles.value}>
                          {this.props.plan.on_sell_ips !== 0 &&
                            `${this.props.plan.on_sell_ips} عدد `}
                          {(this.props.plan.monthly_price_for_extra_ip !== 0 ||
                            this.props.plan.max_extra_ip !== 0) &&
                            `(
                                ${
                                  this.props.plan.monthly_price_for_extra_ip !==
                                    0 &&
                                  `هر عدد ${formatPriceWithCurrency(
                                    this.props.currencies,
                                    this.props.plan.currency,
                                    this.props.plan.monthly_price_for_extra_ip
                                  )}, `
                                }
                                ${
                                  this.props.plan.max_extra_ip !== 0 &&
                                  `حداکثر ${this.props.plan.max_extra_ip} عدد`
                                }
                                )`}
                        </p>
                      </li>
                      <li>
                        <p className={styles.title}>
                          هزینه ستاپ (یکبار پرداخت)
                        </p>
                        <p className={styles.setup}>
                          {!this.props.plan.setup
                            ? 'مهمان ما باشید'
                            : formatPriceWithCurrency(
                                this.props.currencies,
                                this.props.plan.currency,
                                this.props.plan.price
                              )}
                        </p>
                      </li>
                      <li>
                        <p className={styles.price}>
                          <span>
                            {formatPriceWithCurrency(
                              this.props.currencies,
                              this.props.plan.currency,
                              this.props.plan.price
                            )}
                          </span>{' '}
                          ماهیانه <br />
                          <span>
                            {formatPriceWithCurrency(
                              this.props.currencies,
                              this.props.plan.currency,
                              this.props.plan.price * 12
                            )}
                          </span>{' '}
                          سالیانه
                        </p>
                        <p className={styles.orderLinkWrapper}>
                          {this.props.plan.sold_out ? (
                            <div
                              className={classNames(
                                styles.orderLink,
                                styles.disabled
                              )}
                            >
                              موجود نیست؛ درصورت تمایل تماس بگیرید
                            </div>
                          ) : (
                            <Link
                              href={`/order/server/dedicated/${this.props.plan.id}`}
                              className={styles.orderLink}>
                              سفارش
                            </Link>
                          )}
                        </p>
                      </li>
                    </ul>
                  </div>
                </Col>
                <Col lg={8} className={styles.info}>
                  <Row>
                    <Col xs={12}>
                      <div className={styles.alert}>
                        <p>
                          قیمت موجود براساس آخرین قیمت ارز در تاریخ{' '}
                          <span className="ltr d-inline-block">
                            {typeof this.props.plan.currency !== 'number' &&
                              moment(this.props.plan.currency.update_at * 1000)
                                .locale('fa')
                                .format('YYYY/MM/DD LT')}
                          </span>{' '}
                          می باشد.
                        </p>
                      </div>
                    </Col>
                  </Row>
                  <div className={styles.offers}>
                    <Row className="flex-column-reverse flex-lg-row">
                      <Col lg={6} className={styles.right}>
                        <p className={styles.header}> پنل ها و آپشن ها </p>
                        <ul className={styles.list}>
                          <li>
                            <Link href="/hosting/backup">

                              <i className="fa fa-database fa-5x"></i>{' '}
                              <span> فضای بکاپ </span>

                            </Link>
                          </li>

                          <li>
                            <Link href={`/licenses/directadmin`}>

                              <div>
                                <img
                                  src={`/images/directadmin.png`}
                                  alt="directadmin"
                                />
                              </div>
                              <span>لایسنس دایرکت ادمین</span>

                            </Link>
                          </li>
                          <li>
                            <Link href={`/licenses/cpanel`}>

                              <div>
                                <img
                                  src={`/images/cpanel.png`}
                                  alt="cpanel"
                                />
                              </div>
                              <span>لایسنس دایرکت ادمین</span>

                            </Link>
                          </li>
                        </ul>
                      </Col>
                      <Col lg={6}>
                        <ul className={styles.list}>
                          <li>
                            <p className={styles.title}> CPU </p>
                            {getCpuLink(this.props.plan.cpu.title) ? (
                              <a
                                target="_blank"
                                className={`${styles.value} ${styles.link}`}
                                href={getCpuLink(this.props.plan.cpu.title)}
                              >
                                {this.props.plan.cpu.title}
                              </a>
                            ) : (
                              <p className={styles.value}>
                                {this.props.plan.cpu.title}
                              </p>
                            )}
                            <p></p>
                            <p className={styles.value}>
                              Cores:{this.props.plan.cpu.cores},Threads:
                              {this.props.plan.cpu.threads},Frequency:
                              {this.props.plan.cpu.speed} GHZ
                            </p>
                          </li>
                          <li>
                            <p className={styles.title}> RAM </p>
                            <p className={styles.value}>
                              {formatSpace(this.props.plan.ram, 'en')}
                            </p>
                            <p></p>
                          </li>
                          <li>
                            <p className={styles.title}> Storage </p>
                            <div className={styles.value}>
                              {formatHards(this.props.plan.hard).map((hard) => (
                                <div key={hard}>{hard}</div>
                              ))}
                            </div>
                          </li>
                          <li>
                            <p className={styles.title}> Raid </p>
                            <p className={styles.value}>
                              {!this.props.plan.raid
                                ? 'RAID 0 - software'
                                : `RAID ${this.props.plan.raid} `}
                            </p>
                          </li>
                          <li>
                            <p className={styles.title}> Traffic </p>
                            <p className={styles.value}>
                              {this.props.plan.bandwidth ? (
                                `${formatSpace(
                                  this.props.plan.bandwidth,
                                  'en'
                                )}`
                              ) : (
                                <span className={styles.jUnlimited}>
                                  unlimited
                                </span>
                              )}
                            </p>
                          </li>
                          <li>
                            <p className={styles.title}> Bandwidth </p>
                            <p className={styles.value}>
                              {this.props.plan.port ? (
                                `${this.props.plan.port} Mbit/s`
                              ) : (
                                <span className={styles.jUnlimited}>
                                  unlimited
                                </span>
                              )}
                            </p>
                          </li>
                        </ul>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </section>
    );
  }
}

export default connect((state: RootState) => {
  return {
    currencies: state.currencies,
  };
})(CountryPlan);

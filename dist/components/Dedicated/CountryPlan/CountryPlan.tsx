import * as React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
import { countries } from '../lib/countries';
import moment from 'jalali-moment';
import styles from './CountryPlan.module.scss';
import Link from 'next/link';

export interface CountryPlanProps {
  countryPlan: {
    status: boolean;
    id: number;
    title: string;
    price: number;
    ip: {
      price: number;
      max: number;
    };
    panels: {
      link: string;
      name_fa: string;
      name_en: string;
    }[];
    datacenter: {
      title: string;
      link: string;
      country: { code: string; name: string };
    };
    hard: { type: string; space: number; price: number; onsell?: boolean }[][];
    cpu: {
      type: string;
      title: string;
      cores: number;
      threads: number;
      speed: number;
      num: number;
    };
    bandwidth: number;
    traffic: number;
    port: number;
    ram: number;
    raid: null;
    setup: number;
    currency: { id: number; title: string; update_at: number };
    sold_out: number;
  };
}

export interface CountryPlanState {}

class CountryPlan extends React.Component<CountryPlanProps, CountryPlanState> {
  constructor(props: CountryPlanProps) {
    super(props);
    this.state = {};
  }

  addCommas(num: number) {
    let str = num.toString().split('.');
    if (str[0].length >= 5) {
      str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    if (str[1] && str[1].length >= 5) {
      str[1] = str[1].replace(/(\d{3})/g, '$1 ');
    }
    return str.join('.');
  }

  formatSizeInEnglish(size, decimals = 2) {
    if (size == 0) return '';

    var k = 1000,
      dm = decimals || 2,
      sizes = ['MB', 'GB', 'TB'],
      i = Math.floor(Math.log(size * 1000) / Math.log(k));
    return (
      parseFloat(((size * 1000) / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
    );
  }

  getCpuLink(cpu: {
    title: string;
    cores: number;
    threads: number;
    speed: number;
    num: number;
  }) {
    if (cpu.title.toLowerCase().lastIndexOf('intel') === 0) {
      return `https://ark.intel.com/search/?_charset_=UTF-8&q=${encodeURI(
        cpu.title
      )}`;
    }
    if (cpu.title.toLowerCase().lastIndexOf('amd') === 0) {
      return `https://www.amd.com/en/search?keyword=${encodeURI(cpu.title)}`;
    }
    return null;
  }

  render() {
    const targetCountry =
      countries[this.props.countryPlan.datacenter.country.code];

    let allHards = [];

    this.props.countryPlan.hard.forEach((hardPack) => {
      allHards = allHards.concat(hardPack);
    });

    let onSells = [];

    allHards.forEach((hard) => {
      if (hard.onsell === true) {
        onSells = [...onSells, hard];
      }
    });

    let hards = [];

    onSells.forEach((hard) => {
      if (hard) {
        const hardIndex = hards.findIndex((i) => i.type === hard.type);
        if (hardIndex > -1) {
          hards[hardIndex] = {
            ...hards[hardIndex],
            number: hards[hardIndex].number + 1,
          };
        } else {
          hards = [...hards, { ...hard, number: 1 }];
        }
      }
    });

    return (
      <section>
        <div className={styles.innerBanner}>
          <Container>
            <h2 className="text-center">
              سرور اختصاصی {targetCountry.title_fa}{' '}
              {this.props.countryPlan.title}
            </h2>
          </Container>
        </div>
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
                          href={this.props.countryPlan.datacenter.link}
                        >
                          <p className={styles.value}>
                            {this.props.countryPlan.datacenter.title} -{' '}
                            {this.props.countryPlan.datacenter.country.name}{' '}
                          </p>
                        </a>
                        <div className={styles.value}>
                          {this.props.countryPlan.datacenter.country.name}
                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip
                                className={styles.tooltip}
                                id={`tooltip-${this.props.countryPlan.datacenter.country.name}`}
                              >
                                {this.props.countryPlan.datacenter.country.name}
                              </Tooltip>
                            }
                          >
                            <div className={styles.flagWrapper}>
                              <img
                                src={targetCountry.flag24}
                                title=""
                                alt={
                                  this.props.countryPlan.datacenter.country.name
                                }
                              />
                            </div>
                          </OverlayTrigger>
                        </div>
                      </li>
                      <li>
                        <p className={styles.title}> آی پی </p>
                        <p className={styles.value}>
                          1 عدد (هرعدد{' '}
                          {this.addCommas(this.props.countryPlan.ip.price)}{' '}
                          {this.props.countryPlan.currency.title} , حداکثر{' '}
                          {this.props.countryPlan.ip.max} عدد)
                        </p>
                      </li>
                      <li>
                        <p className={styles.title}>
                          هزینه ستاپ (یکبار پرداخت)
                        </p>
                        <p className={styles.setup}>
                          {!this.props.countryPlan.setup
                            ? 'مهمان ما باشید'
                            : this.addCommas(this.props.countryPlan.setup) +
                              ' تومان'}{' '}
                        </p>
                      </li>
                      <li>
                        <p className={styles.price}>
                          <span>
                            {this.addCommas(this.props.countryPlan.price)}{' '}
                            {this.props.countryPlan.currency.title}
                          </span>{' '}
                          ماهیانه <br />
                          <span>
                            {this.addCommas(this.props.countryPlan.price * 12)}{' '}
                            {this.props.countryPlan.currency.title}
                          </span>{' '}
                          سالیانه
                        </p>
                        <p className={styles.orderLinkWrapper}>
                          <Link
                            href={`/order/server/dedicated/${this.props.countryPlan.id}`}
                          >
                            <a className={styles.orderLink}>سفارش</a>
                          </Link>
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
                            {moment(
                              this.props.countryPlan.currency.update_at * 1000
                            )
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
                          {this.props.countryPlan.panels.map((panel) => {
                            if (panel.name_en === 'backup') {
                              return (
                                <li key={panel.name_en}>
                                  <Link href="/hosting/backup">
                                    <a>
                                      <i className="fa fa-database fa-5x"></i>{' '}
                                      <span> فضای بکاپ </span>
                                    </a>
                                  </Link>
                                </li>
                              );
                            } else {
                              return (
                                <li key={panel.name_en}>
                                  <Link href={`/licenses/${panel.name_en}`}>
                                    <a>
                                      <div>
                                        <img
                                          src={`/images/${panel.name_en}.png`}
                                          alt={panel.name_fa}
                                        />
                                      </div>

                                      <span>{panel.name_fa}</span>
                                    </a>
                                  </Link>
                                </li>
                              );
                            }
                          })}
                        </ul>
                      </Col>
                      <Col lg={6}>
                        <ul className={styles.list}>
                          <li>
                            <p className={styles.title}> CPU </p>
                            {this.getCpuLink(this.props.countryPlan.cpu) ? (
                              <a
                                target="_blank"
                                className={`${styles.value} ${styles.link}`}
                                href={this.getCpuLink(
                                  this.props.countryPlan.cpu
                                )}
                              >
                                {this.props.countryPlan.cpu.title}
                              </a>
                            ) : (
                              <p className={styles.value}>
                                {this.props.countryPlan.cpu.title}
                              </p>
                            )}
                            <p></p>
                            <p className={styles.value}>
                              Cores:{this.props.countryPlan.cpu.cores},Threads:
                              {this.props.countryPlan.cpu.threads},Frequency:
                              {this.props.countryPlan.cpu.speed} GHZ
                            </p>
                          </li>
                          <li>
                            <p className={styles.title}> RAM </p>
                            <p className={styles.value}>
                              {this.formatSizeInEnglish(
                                this.props.countryPlan.ram
                              )}
                            </p>
                            <p></p>
                          </li>
                          <li>
                            <p className={styles.title}> Storage </p>
                            <div className={styles.value}>
                              {hards.length > 0 &&
                                hards.map((hard) => {
                                  if (hard.number === 1) {
                                    return (
                                      <p key={hard.type} className="m-0">
                                        {this.formatSizeInEnglish(hard.space)}{' '}
                                        {hard.type}
                                      </p>
                                    );
                                  } else {
                                    return (
                                      <p key={hard.type} className="m-0">
                                        {hard.number} x{' '}
                                        {this.formatSizeInEnglish(hard.space)}{' '}
                                        {hard.type}
                                      </p>
                                    );
                                  }
                                })}
                            </div>
                          </li>
                          <li>
                            <p className={styles.title}> Raid </p>
                            <p className={styles.value}>
                              {!this.props.countryPlan.raid
                                ? 'RAID 0 - software'
                                : `RAID ${this.props.countryPlan.raid} `}
                            </p>
                          </li>
                          <li>
                            <p className={styles.title}> Traffic </p>
                            <p className={styles.value}>
                              {this.props.countryPlan.traffic ? (
                                `${this.props.countryPlan.traffic} Mbit/s`
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
                              {this.props.countryPlan.bandwidth ? (
                                `${this.props.countryPlan.bandwidth} Mbit/s`
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

export default CountryPlan;

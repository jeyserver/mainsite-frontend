import * as React from 'react';
import { Row, Col, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import Link from 'next/link';
import styles from './Plan.module.scss';

export interface PlanProps {
  plan: {
    id: number;
    title: string;
    price: number;
    datacenter: { title: string; country: { code: string; name: string } };
    hard: [
      [{ type: string; space: number; price: number; onsell?: boolean }],
      [{ type: string; space: number; price: number; onsell?: boolean }]
    ];
    cpu: {
      type: string;
      title: string;
      cores: number;
      threads: number;
      speed: number;
      num: number;
    };
    bandwidth: number;
    port: number;
    ram: number;
    raid: null;
    setup: number;
    currency: { id: number; title: string; update_at: number };
    sold_out: number;
    status: number;
  };
}

export interface PlanState {}

class Plan extends React.Component<PlanProps, PlanState> {
  constructor(props: PlanProps) {
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

  formatSizeInPersian(size, decimals = 2) {
    if (size === 0) return '';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['مگابایت', 'گیگابایت', 'ترابایت'];

    const i = Math.floor(Math.log(size) / Math.log(k));

    return parseFloat((size / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
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
    type: string;
    title: string;
    cores: number;
    threads: number;
    speed: number;
    num: number;
  }) {
    if (cpu.type.toLowerCase() === 'intel') {
      return `https://ark.intel.com/search/?_charset_=UTF-8&q=${encodeURI(
        cpu.title
      )}`;
    }
    if (cpu.type.toLowerCase() === 'amd') {
      return `https://www.amd.com/en/search?keyword=${encodeURI(cpu.title)}`;
    }
    return null;
  }

  render() {
    let allHards = [];

    this.props.plan.hard.forEach((hardPack) => {
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
      <Row className={styles.plan}>
        <Col md={2} className={styles.planTitle}>
          <div>
            <Link href={`/fa/server/dedicated/${this.props.plan.id}`}>
              <a>{this.props.plan.title}</a>
            </Link>
          </div>
        </Col>
        <Col className={styles.planHardware}>
          <Row>
            <Col xs={4}>پردازشگر:</Col>
            <Col xs={8} className="ltr">
              {this.getCpuLink(this.props.plan.cpu) ? (
                <a target="_blank" href={this.getCpuLink(this.props.plan.cpu)}>
                  {this.props.plan.cpu.title}
                </a>
              ) : (
                <span>{this.props.plan.cpu.title}</span>
              )}{' '}
              - {this.props.plan.cpu.cores} c / {this.props.plan.cpu.threads} t
              - {this.props.plan.cpu.speed} GHz
            </Col>
          </Row>
          <Row>
            <Col xs={4}>حافظه موقت:</Col>
            <Col xs={8}>{this.formatSizeInPersian(this.props.plan.ram)}</Col>
          </Row>
          <Row>
            <Col xs={4}>هارد:</Col>
            <Col xs={8} className="ltr">
              {hards.length > 0 &&
                hards.map((hard) => {
                  if (hard.number === 1) {
                    return (
                      <p key={hard.type} style={{ margin: '0' }}>
                        {this.formatSizeInEnglish(hard.space)} {hard.type}
                      </p>
                    );
                  } else {
                    return (
                      <p key={hard.type} style={{ margin: '0' }}>
                        {hard.number} x {this.formatSizeInEnglish(hard.space)}{' '}
                        {hard.type}
                      </p>
                    );
                  }
                })}
            </Col>
          </Row>
          <Row>
            <Col xs={4}>ترافیک:</Col>
            <Col xs={8}>
              {this.props.plan.bandwidth ? (
                this.formatSizeInPersian(this.props.plan.bandwidth)
              ) : (
                <span className={styles.jUnlimited}>بدون محدودیت</span>
              )}
            </Col>
          </Row>
          <Row>
            <Col xs={4}>پورت:</Col>
            <Col xs={8}>{this.props.plan.port} مگابیت </Col>
          </Row>
          <Row>
            <Col xs={4}>نوع Raid:</Col>
            <Col xs={8} className="ltr">
              {this.props.plan.raid
                ? `RAID ${this.props.plan.raid}`
                : 'RAID 0 - نرم افزاری'}
            </Col>
          </Row>
          <Row>
            <Col xs={5}>
              هزینه ستاپ:
              <br />
              <small>فقط برای ماه اول</small>
            </Col>
            <Col xs={7}>
              {this.props.plan.setup === 0
                ? '-'
                : `${this.addCommas(this.props.plan.price)} ${
                    this.props.plan.currency.title
                  }`}
            </Col>
          </Row>
        </Col>
        <Col md={2} className={styles.planPrice}>
          <div>
            {this.addCommas(this.props.plan.price)}{' '}
            {this.props.plan.currency.title}
            <br />
            <span>ماهیانه</span>
          </div>
        </Col>
        <Col md={2} className={styles.planAction}>
          <div>
            <Link href={`/server/dedicated/${this.props.plan.id}`}>
              <a className={styles.moreInfoBtn}>
                <i className="btn-ico fa fa-info"></i>
                اطلاعات بیشتر
              </a>
            </Link>
            {this.props.plan.sold_out === 0 ? (
              <Link href={`/order/server/dedicated/${this.props.plan.id}`}>
                <a className={styles.orderBtn}>
                  <i className="btn-ico fa fa-shopping-cart"></i>
                  سفارش
                </a>
              </Link>
            ) : (
              <OverlayTrigger
                overlay={
                  <Tooltip id="sold-out-tooltip">
                    موجود نیست; در صورت تمایل تماس بگیرید
                  </Tooltip>
                }
              >
                <span className="w-100">
                  <Button disabled className={styles.disabledOrderBtn}>
                    <i className="btn-ico fa fa-shopping-cart"></i>
                    سفارش
                  </Button>
                </span>
              </OverlayTrigger>
            )}
          </div>
        </Col>
      </Row>
    );
  }
}

export default Plan;

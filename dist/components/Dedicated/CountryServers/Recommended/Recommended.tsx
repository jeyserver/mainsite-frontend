import * as React from 'react';
import { Row, Col, Tooltip, OverlayTrigger, Button } from 'react-bootstrap';
import Link from 'next/link';
import styles from './Recommended.module.scss';

export interface RecommendedProps {
  recommended: any;
}

export interface RecommendedState {}

class Recommended extends React.Component<RecommendedProps, RecommendedState> {
  constructor(props: RecommendedProps) {
    super(props);
    this.state = {};
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

  getHards(recommended) {
    let allHards = [];

    recommended.hard.forEach((hardPack) => {
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

    return hards;
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

  render() {
    return (
      <Row>
        <Col md={12} className={styles.recommended}>
          <h3>سرور های پیشنهادی</h3>
          <table className="table table-flip">
            <thead>
              <tr>
                <th>&nbsp;</th>
                <th style={{ lineHeight: '75px' }}>پردازشگر</th>
                <th>حافظه موقت</th>
                <th>هارد</th>
                <th>ترافیک</th>
                <th>پورت</th>
                <th>نوع Raid</th>
                <th>پشتیبانی</th>
                <th>
                  هزینه ستاپ
                  <br />
                  <small>فقط برای ماه اول</small>
                </th>
                <th style={{ lineHeight: '50px' }}>قیمت</th>
                <th style={{ height: '82px' }}></th>
              </tr>
            </thead>
            <tbody>
              {this.props.recommended.map((recommended) => (
                <tr key={recommended.id}>
                  <td className="ltr">{recommended.title}</td>
                  <td className="ltr">
                    {recommended.cpu.title} <br />
                    Cores : {recommended.cpu.cores}, Threads :{' '}
                    {recommended.cpu.threads} <br />
                    Frequency : {recommended.cpu.speed} GHz
                  </td>
                  <td>{this.formatSizeInPersian(recommended.ram)}</td>
                  <td className="ltr">
                    {this.getHards(recommended).length > 0 &&
                      this.getHards(recommended).map((hard) => {
                        if (hard.number === 1) {
                          return (
                            <span key={hard.type} style={{ margin: '0' }}>
                              {this.formatSizeInEnglish(hard.space)} {hard.type}
                            </span>
                          );
                        } else {
                          return (
                            <span key={hard.type} style={{ margin: '0' }}>
                              {hard.number} x{' '}
                              {this.formatSizeInEnglish(hard.space)} {hard.type}
                            </span>
                          );
                        }
                      })}
                  </td>
                  <td>
                    {recommended.bandwidth ? (
                      this.formatSizeInPersian(recommended.bandwidth)
                    ) : (
                      <span className={styles.jUnlimited}>بدون محدودیت</span>
                    )}
                  </td>
                  <td>{recommended.port} مگابیت</td>
                  <td>
                    {recommended.raid
                      ? recommended.raid
                      : 'RAID 0 - نرم افزاری'}
                  </td>
                  <td>18 ساعت</td>
                  <td style={{ height: '67px' }}>
                    {recommended.setup
                      ? `${this.addCommas(recommended.setup)} ${
                          recommended.currency.title
                        }`
                      : '-'}
                  </td>
                  <td>
                    {this.addCommas(recommended.price)}{' '}
                    {recommended.currency.title}
                    <span> ماهیانه</span> <br />
                    {this.addCommas(recommended.price * 12)}{' '}
                    {recommended.currency.title}
                    <span> سالیانه</span>
                  </td>
                  <td>
                    <div>
                      <Link href={`/server/dedicated/${recommended.id}`}>
                        <a className={styles.moreInfoLink}>اطلاعات بیشتر</a>
                      </Link>
                    </div>
                    <div>
                      {recommended.sold_out === 0 ? (
                        <Link
                          href={`/order/server/dedicated/${recommended.id}`}
                        >
                          <a className={styles.orderLink}>
                            <i className="btn-ico fa fa-shopping-cart"></i>
                            سفارش
                          </a>
                        </Link>
                      ) : (
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-disabled">
                              موجود نیست; در صورت تمایل تماس بگیرید
                            </Tooltip>
                          }
                        >
                          <span className="w-100">
                            <Button
                              disabled
                              className={styles.disabledOrderBtn}
                            >
                              <i className="btn-ico fa fa-shopping-cart"></i>
                              سفارش
                            </Button>
                          </span>
                        </OverlayTrigger>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Col>
      </Row>
    );
  }
}

export default Recommended;

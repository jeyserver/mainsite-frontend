import * as React from 'react';
import { Row, Col, Table } from 'react-bootstrap';
import Link from 'next/link';
import styles from './CountryPricing.module.scss';
import classNames from 'classnames';

export interface CountryPricingProps {
  countryData: any;
  type: 'professional' | 'storage' | 'economic';
}

export interface CountryPricingState {
  isMoreInfoOpen: boolean;
}

class CountryPricing extends React.Component<
  CountryPricingProps,
  CountryPricingState
> {
  constructor(props: CountryPricingProps) {
    super(props);
    this.state = { isMoreInfoOpen: false };
    this.toggleMoreInfo = this.toggleMoreInfo.bind(this);
  }

  toggleMoreInfo() {
    this.setState((prev) => {
      return { isMoreInfoOpen: !prev.isMoreInfoOpen };
    });
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

  getType(type) {
    switch (type) {
      case 'professional':
        return 'حرفه ای';
      case 'storage':
        return 'حجیم';
      case 'economic':
        return 'اقتصادی';
      default:
        return '';
    }
  }

  render() {
    return (
      <Row
        id={`server_vps_professional_${this.props.countryData.country_title_en}`}
      >
        <Col xs={12}>
          <div className={styles.tittleLine}>
            <h5>
              سرور مجازی {this.getType(this.props.type)} <br />
              <img
                className="tooltips"
                src={this.props.countryData.flag}
                alt={this.props.countryData.country_title_en}
              />
              {this.props.countryData.country}
            </h5>
            <div className={styles.divider}>
              <div />
            </div>
          </div>
          <Table className={styles.table}>
            <thead>
              <tr>
                <th>&nbsp;</th>
                <th>هارد</th>
                <th>پردازشگر</th>
                <th>حافظه موقت</th>
                <th>ترافیک</th>
                <th
                  className={classNames(styles.jHidden, {
                    [styles.open]: this.state.isMoreInfoOpen,
                  })}
                >
                  پورت
                </th>
                <th
                  className={classNames(styles.jHidden, {
                    [styles.open]: this.state.isMoreInfoOpen,
                  })}
                >
                  پنل ریبوت
                </th>
                <th
                  className={classNames(styles.jHidden, {
                    [styles.open]: this.state.isMoreInfoOpen,
                  })}
                >
                  دسترسی کنسول
                </th>
                <th
                  className={classNames(styles.jHidden, {
                    [styles.open]: this.state.isMoreInfoOpen,
                  })}
                >
                  نصب خودکار سیستم عامل
                </th>
                <th
                  className={classNames(styles.jHidden, {
                    [styles.open]: this.state.isMoreInfoOpen,
                  })}
                >
                  گراف پهنای باند
                </th>
                <th>مانیتورینگ</th>
                <th>پشتیبانی</th>
                <th style={{ lineHeight: '50px' }}>قیمت</th>
                <th className="text-center" style={{ lineHeight: '34px' }}>
                  <button
                    type="button"
                    className={styles.moreInfoBtn}
                    onClick={this.toggleMoreInfo}
                  >
                    اطلاعات بیشتر{' '}
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {this.props.countryData.plans.map((plan) => (
                <tr key={plan.id}>
                  <td>{plan.title}</td>
                  <td>{plan.hard}</td>
                  <td>{plan.cpu}</td>
                  <td>{plan.ram}</td>
                  <td>
                    {plan.traffic ? (
                      plan.traffic
                    ) : (
                      <span className={styles.jUnlimited}>بدون محدودیت</span>
                    )}
                  </td>
                  <td
                    className={classNames(styles.jHidden, {
                      [styles.open]: this.state.isMoreInfoOpen,
                    })}
                  >
                    {plan.port}
                  </td>
                  <td
                    className={classNames(
                      styles.jHidden,
                      {
                        [styles.open]: this.state.isMoreInfoOpen,
                      },
                      { [styles.check]: plan.rebootPanel }
                    )}
                  >
                    {plan.rebootPanel ? (
                      <i className="fa fa-check fa-lg" />
                    ) : (
                      <i className="fa fa-times fa-lg" />
                    )}
                  </td>
                  <td
                    className={classNames(
                      styles.jHidden,
                      {
                        [styles.open]: this.state.isMoreInfoOpen,
                      },
                      { [styles.check]: plan.consoleAccess }
                    )}
                  >
                    {plan.consoleAccess ? (
                      <i className="fa fa-check fa-lg" />
                    ) : (
                      <i className="fa fa-times fa-lg" />
                    )}
                  </td>
                  <td
                    className={classNames(
                      styles.jHidden,
                      {
                        [styles.open]: this.state.isMoreInfoOpen,
                      },
                      { [styles.check]: plan.automaticOS }
                    )}
                  >
                    {plan.automaticOS ? (
                      <i className="fa fa-check fa-lg" />
                    ) : (
                      <i className="fa fa-times fa-lg" />
                    )}
                  </td>
                  <td
                    className={classNames(
                      styles.jHidden,
                      {
                        [styles.open]: this.state.isMoreInfoOpen,
                      },
                      { [styles.check]: plan.bandwidthGraph }
                    )}
                  >
                    {plan.bandwidthGraph ? (
                      <i className="fa fa-check fa-lg" />
                    ) : (
                      <i className="fa fa-times fa-lg" />
                    )}
                  </td>
                  <td
                    className={classNames({ [styles.check]: plan.monitoring })}
                  >
                    {plan.monitoring ? (
                      <i className="fa fa-check fa-lg" />
                    ) : (
                      <i className="fa fa-times fa-lg" />
                    )}
                  </td>
                  <td>{plan.support}</td>
                  <td>
                    <span>
                      {this.addCommas(plan.price)} {plan.currency.title}
                    </span>{' '}
                    ماهیانه <br />
                    <span>
                      {this.addCommas(plan.price * 12)} {plan.currency.title}
                    </span>{' '}
                    سالیانه{' '}
                  </td>
                  <td>
                    <Link href={`/order/server/vps/${plan.price.id}`}>
                      <a className={styles.orderLink}>
                        <img
                          className="btn-ico tooltips"
                          src={this.props.countryData.flag}
                          alt={this.props.countryData.country_title_en}
                        />
                        سفارش{' '}
                      </a>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {this.props.countryData.table_ps && (
            <div>*** {this.props.countryData.table_ps}</div>
          )}
        </Col>
      </Row>
    );
  }
}

export default CountryPricing;

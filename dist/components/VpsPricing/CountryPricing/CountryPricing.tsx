import * as React from 'react';
import {
  Row,
  Col,
  Table,
  OverlayTrigger,
  Tooltip,
  Button,
} from 'react-bootstrap';
import Link from 'next/link';
import styles from './CountryPricing.module.scss';
import classNames from 'classnames';
import { formatPrice } from '../../helper/formatPrice';
import CountryFlagTooltip from '../../helper/components/CountryFlagTooltip';

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
        className={styles.tableWrapper}
        id={`server_vps_${this.props.type}_${this.props.countryData.country_title_en}`}
      >
        <Col xs={12}>
          <div className={styles.tittleLine}>
            <h5>
              سرور مجازی {this.getType(this.props.type)} <br />
              <CountryFlagTooltip
                name={this.props.countryData.country_title_en}
                flag={{
                  address: this.props.countryData.flag,
                  width: 24,
                  height: 24,
                }}
              />
              {this.props.countryData.country}
            </h5>
            <div className={styles.divider}>
              <div />
            </div>
            {this.props.countryData.info && (
              <div
                className={styles.content}
                dangerouslySetInnerHTML={{
                  __html: this.props.countryData.info,
                }}
              ></div>
            )}
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
                      {formatPrice(plan.price)} {plan.currency.title}
                    </span>{' '}
                    ماهیانه <br />
                    <span>
                      {formatPrice(plan.price * 12)} {plan.currency.title}
                    </span>{' '}
                    سالیانه{' '}
                  </td>
                  <td>
                    {plan.active ? (
                      <Link href={`/order/server/vps/${plan.id}`}>
                        <a className={styles.orderLink}>
                          <CountryFlagTooltip
                            name={this.props.countryData.country_title_en}
                            flag={{
                              address: this.props.countryData.flag,
                              width: 24,
                              height: 24,
                            }}
                          />
                          <span>سفارش</span>{' '}
                        </a>
                      </Link>
                    ) : (
                      <OverlayTrigger
                        overlay={
                          <Tooltip
                            id="tooltip-disabled"
                            className={styles.tooltip}
                          >
                            این پلن در حال حاظر برای فروش فعال نمیباشد
                          </Tooltip>
                        }
                      >
                        <span className={styles.tooltipWrapper}>
                          <Button className={styles.orderLink} disabled>
                            <img
                              src={this.props.countryData.flag}
                              alt={this.props.countryData.country_title_en}
                            />
                            سفارش{' '}
                          </Button>
                        </span>
                      </OverlayTrigger>
                    )}
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

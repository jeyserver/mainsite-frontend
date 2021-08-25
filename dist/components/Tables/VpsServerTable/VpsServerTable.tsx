import * as React from 'react';
import { Table, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import Link from 'next/link';
import styles from './VpsServerTable.module.scss';
import classNames from 'classnames';
import CountryFlagTooltip from '../../../helper/components/CountryFlagTooltip/CountryFlagTooltip';
import { formatSpaceInPersian } from '../../../helper/formatSpace';
import { connect } from 'react-redux';
import { RootState } from '../../../store';
import formatPriceWithCurrency from '../../../helper/formatPriceWithCurrency';
import translateCountryNameToPersian from '../../../helper/translateCountryNameToPersian';
import getVpsPlanTypeInPersian from '../../../helper/getVpsPlanTypeInPersian';
import { IVPSPlan } from '../../../helper/types/products/VPS/plan';

interface IProps {
  data: IVPSPlan[];
  currencies: RootState['currencies'];
  homePageTable: boolean;
}

interface IState {
  isMoreInfoOpen: boolean;
}

class VpsServerTab extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { isMoreInfoOpen: false };
  }

  render() {
    return (
      <div>
        <div className={styles.tittleLine}>
          <h5
            className={classNames({
              [styles.pageTitle]: !this.props.homePageTable,
            })}
          >
            سرور مجازی {getVpsPlanTypeInPersian(this.props.data[0].title)}
            <br />
            <CountryFlagTooltip country={this.props.data[0].country} />
            {translateCountryNameToPersian(this.props.data[0].country.code)}
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
              <th>قیمت</th>
              <th className="text-center" style={{ lineHeight: '34px' }}>
                <button
                  type="button"
                  className={styles.moreInfoBtn}
                  onClick={() =>
                    this.setState({
                      isMoreInfoOpen: !this.state.isMoreInfoOpen,
                    })
                  }
                >
                  اطلاعات بیشتر{' '}
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.props.data.map((plan) => (
              <tr key={plan.id}>
                <td>{plan.title}</td>
                <td>{formatSpaceInPersian(plan.hard)}</td>
                <td>{plan.cpu} مگاهرتز</td>
                <td>{formatSpaceInPersian(plan.ram)}</td>
                <td>
                  <span className={styles.jUnlimited}>بدون محدودیت</span>
                </td>
                <td
                  className={classNames(styles.jHidden, {
                    [styles.open]: this.state.isMoreInfoOpen,
                  })}
                >
                  1 گیگابیت
                </td>
                <td
                  className={classNames(
                    styles.jHidden,
                    {
                      [styles.open]: this.state.isMoreInfoOpen,
                    },
                    { [styles.check]: true }
                  )}
                >
                  <i className="fa fa-check fa-lg" />
                </td>
                <td
                  className={classNames(
                    styles.jHidden,
                    {
                      [styles.open]: this.state.isMoreInfoOpen,
                    },
                    { [styles.check]: true }
                  )}
                >
                  <i className="fa fa-check fa-lg" />
                </td>
                <td
                  className={classNames(
                    styles.jHidden,
                    {
                      [styles.open]: this.state.isMoreInfoOpen,
                    },
                    { [styles.check]: true }
                  )}
                >
                  <i className="fa fa-check fa-lg" />
                </td>
                <td
                  className={classNames(
                    styles.jHidden,
                    {
                      [styles.open]: this.state.isMoreInfoOpen,
                    },
                    { [styles.check]: true }
                  )}
                >
                  <i className="fa fa-check fa-lg" />
                </td>
                <td className={classNames({ [styles.check]: true })}>
                  <i className="fa fa-check fa-lg" />
                </td>
                <td>18 ساعت</td>
                <td>
                  <span>
                    {formatPriceWithCurrency(
                      this.props.currencies.items,
                      plan.currency,
                      plan.price
                    )}
                  </span>{' '}
                  ماهیانه
                </td>
                <td>
                  {plan.is_available ? (
                    <Link href={`/order/server/vps/${plan.id}`}>
                      <a className={styles.orderLink}>
                        <CountryFlagTooltip country={plan.country} />
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
                            src={`./images/flags/${plan.country.code.toLowerCase()}.svg`}
                            alt={plan.country.name}
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
      </div>
    );
  }
}

export default connect((state: RootState) => {
  return {
    currencies: state.currencies,
  };
})(VpsServerTab);

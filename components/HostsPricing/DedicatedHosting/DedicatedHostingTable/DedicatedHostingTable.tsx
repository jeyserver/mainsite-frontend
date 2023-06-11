import * as React from 'react';
import { Row, Col, Table, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Link from 'next/link';
import styles from './DedicatedHostingTable.module.scss';
import classNames from 'classnames';
import { IHostPlan } from '../../../../helper/types/products/Host/plan';
import translateCountryNameToPersian from '../../../../helper/translateCountryNameToPersian';
import translateHostPanel from '../../../../helper/translators/translateHostPanel';
import { formatPriceWithCurrency } from '../../../../store/Currencies';
import { connect } from 'react-redux';
import { RootState } from '../../../../store';
import StarredCell from '../../TablesUtils/StarredCell';
import BackupsCell from '../../TablesUtils/BackupsCell';
import { formatSpace } from '../../../../helper/formatSpace';
import { ICurrency } from '../../../../pages/_app';

interface IHostPlanWithVariants extends IHostPlan {
  variants: {
    id: string;
    country: {
      name: string;
      code: string;
    };
    panel: {
      name: string;
      price: number;
      currency: ICurrency;
    };
  }[];
}

interface IProps {
  plans: IHostPlan[];
  currencies: RootState['currencies'];
}

interface IState {
  isMoreInfoOpen: boolean;
  plans: IHostPlanWithVariants[];
}

class DedicatedHostingTable extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isMoreInfoOpen: false,
      plans: Object.values(
        this.props.plans.reduce((accumulator, currentValue) => {
          const co = currentValue.title
            .replace('دایرکت ادمین', '')
            .replace('سی پنل', '');

          if (accumulator && accumulator[co]) {
            accumulator[co] = {
              ...accumulator[co],
              variants: [
                ...accumulator[co].variants,
                {
                  id: currentValue.id,
                  panel: {
                    name: currentValue.cp,
                    price: currentValue.price,
                    currency: currentValue.currency,
                  },
                },
              ],
            };
          } else {
            accumulator[co] = {
              ...currentValue,
              variants: [
                {
                  id: currentValue.id,
                  panel: {
                    name: currentValue.cp,
                    price: currentValue.price,
                    currency: currentValue.currency,
                  },
                },
              ],
            };
          }

          return accumulator;
        }, {})
      ),
    };
  }

  getCpuModel(planId: number): string {
    switch (planId) {
      case 171:
      case 181:
        return 'Intel Core i7-4770 4c/8t';
      case 175:
      case 185:
        return 'Intel Xeon E5-1650 6c/12t';
      case 174:
      case 184:
        return 'Intel Core™ i7-8700 6c/12t';
      case 172:
      case 173:
      case 182:
      case 183:
        return 'Intel Core™ i7-6700 4c/8t';
      case 176:
      case 186:
        return 'Intel Xeon E3-1225v2 4c/4t';
      case 177:
      case 187:
        return 'Intel I7-4790K 4c/8t';
      case 178:
      case 188:
        return 'Intel Xeon E3-1245v2 4c/8t';
      case 179:
      case 189:
        return 'Intel Xeon E5-1630v3 4c/8t';
      case 180:
      case 190:
        return 'Intel Xeon-D 1540 8c/16t';
      default:
        return '';
    }
  }

  render() {
    const maximumRam = Math.max(...this.state.plans.map((host) => host.ram));

    return (
      <Row
        id={this.props.plans[0].country.name}
        className={styles.tableWrapper}
      >
        <Col xs={12}>
          <div className={styles.tittleLine}>
            <h5>
              هاست میزبانی اختصاصی{' '}
              {translateCountryNameToPersian(this.props.plans[0].country.code)}
            </h5>
            <div className={styles.divider}>
              <div />
            </div>
          </div>
          <Table className={styles.table}>
            <thead>
              <tr>
                <th>&nbsp;</th>
                <th>فضا</th>
                <th>پهنای باند</th>
                <th style={{ lineHeight: '50px' }}>پنل هاست</th>
                <th>گواهینامه رایگان SSL</th>
                <th
                  className={classNames(styles.jHidden, {
                    [styles.open]: this.state.isMoreInfoOpen,
                  })}
                >
                  تعداد دامنه پارک
                </th>
                <th>تعداد سایت های اضافی</th>
                <th
                  className={classNames(styles.jHidden, {
                    [styles.open]: this.state.isMoreInfoOpen,
                  })}
                >
                  تعداد زیر دامنه ها
                </th>
                <th
                  className={classNames(styles.jHidden, {
                    [styles.open]: this.state.isMoreInfoOpen,
                  })}
                >
                  تعداد ایمیل ها
                </th>
                <th
                  className={classNames(styles.jHidden, {
                    [styles.open]: this.state.isMoreInfoOpen,
                  })}
                >
                  تعداد اکانت FTP
                </th>
                <th
                  className={classNames(styles.jHidden, {
                    [styles.open]: this.state.isMoreInfoOpen,
                  })}
                >
                  تعداد دیتابیس
                </th>
                <th
                  className={classNames(styles.jHidden, {
                    [styles.open]: this.state.isMoreInfoOpen,
                  })}
                >
                  بکاپ گیری روزانه
                </th>
                <th
                  className={classNames(styles.jHidden, {
                    [styles.open]: this.state.isMoreInfoOpen,
                  })}
                >
                  بکاپ گیری ماهیانه
                </th>
                <th
                  className={classNames(styles.jHidden, {
                    [styles.open]: this.state.isMoreInfoOpen,
                  })}
                >
                  بکاپ گیری سالیانه
                </th>
                <th
                  className={classNames({
                    [styles.jHidden]: this.state.isMoreInfoOpen,
                  })}
                  style={
                    this.props.plans.some((i) => i.backups.length > 0) && {
                      lineHeight: '75px',
                    }
                  }
                >
                  دوره های بکاپ گیری
                </th>
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id={`-tooltip`} className={styles.tooltip}>
                      درصد استفاده از پردازشگر
                    </Tooltip>
                  }
                >
                  <th>CPU</th>
                </OverlayTrigger>
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id={`-tooltip`} className={styles.tooltip}>
                      حافظه موقت
                    </Tooltip>
                  }
                >
                  <th style={{ lineHeight: '50px' }}>Ram</th>
                </OverlayTrigger>
                <th>آی پی اختصاصی</th>
                <th>وب سرور</th>
                <th style={{ lineHeight: '50px' }}>هزینه راه اندازی</th>
                {this.state.plans[0] &&
                  this.state.plans[0].variants.reverse().map((variant) => (
                    <th style={{ lineHeight: '25px' }} key={variant.panel.name}>
                      قیمت <br /> کنترل پنل{' '}
                      {translateHostPanel(variant.panel.name)}
                    </th>
                  ))}
                <th className="text-center" style={{ lineHeight: '73px' }}>
                  <button
                    type="button"
                    className={styles.moreInfoBtn}
                    onClick={() => {
                      this.setState((prev) => {
                        return { isMoreInfoOpen: !prev.isMoreInfoOpen };
                      });
                    }}
                  >
                    اطلاعات بیشتر{' '}
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {this.state.plans
                .sort(function (a, b) {
                  return a.title
                    .replace('دایرکت ادمین', '')
                    .replace('سی پنل', '')
                    .localeCompare(
                      b.title.replace('دایرکت ادمین', '').replace('سی پنل', '')
                    );
                })
                .map((plan) => (
                  <tr key={plan.id}>
                    <td>
                      {plan.title
                        .replace('دایرکت ادمین', '')
                        .replace('سی پنل', '')}
                    </td>
                    <td>{formatSpace(plan.space, 'fa', true)} SSD</td>
                    <td>
                      {!plan.bandwidth ? (
                        <span className={styles.jUnlimited}>بدون محدودیت</span>
                      ) : (
                        formatSpace(plan.bandwidth, 'fa')
                      )}
                    </td>
                    <td>
                      {plan.variants.reverse().map((variant) => (
                        <div key={variant.id}>
                          {translateHostPanel(variant.panel.name)}
                        </div>
                      ))}
                    </td>
                    <td
                      className={classNames({
                        [styles.check]: true,
                      })}
                    >
                      <i className="far fa-check-square"></i>
                      {/* <i className="fa fa-times fa-lg" /> */}
                    </td>
                    <td
                      className={classNames(styles.jHidden, {
                        [styles.open]: this.state.isMoreInfoOpen,
                      })}
                    >
                      {!plan.parkdomain ? (
                        <span className={styles.jUnlimited}>بدون محدودیت</span>
                      ) : (
                        `${plan.parkdomain} عدد`
                      )}
                    </td>
                    <td>
                      {!plan.addondomain ? (
                        <span className={styles.jUnlimited}>بدون محدودیت</span>
                      ) : (
                        `${plan.addondomain} عدد`
                      )}
                    </td>
                    <td
                      className={classNames(styles.jHidden, {
                        [styles.open]: this.state.isMoreInfoOpen,
                      })}
                    >
                      {!plan.subdomain ? (
                        <span className={styles.jUnlimited}>بدون محدودیت</span>
                      ) : (
                        `${plan.subdomain} عدد`
                      )}
                    </td>
                    <td
                      className={classNames(styles.jHidden, {
                        [styles.open]: this.state.isMoreInfoOpen,
                      })}
                    >
                      {!plan.email ? (
                        <span className={styles.jUnlimited}>بدون محدودیت</span>
                      ) : (
                        `${plan.email} عدد`
                      )}
                    </td>
                    <td
                      className={classNames(styles.jHidden, {
                        [styles.open]: this.state.isMoreInfoOpen,
                      })}
                    >
                      {!plan.ftp ? (
                        <span className={styles.jUnlimited}>بدون محدودیت</span>
                      ) : (
                        `${plan.ftp} عدد`
                      )}
                    </td>
                    <td
                      className={classNames(styles.jHidden, {
                        [styles.open]: this.state.isMoreInfoOpen,
                      })}
                    >
                      {!plan.dbs ? (
                        <span className={styles.jUnlimited}>بدون محدودیت</span>
                      ) : (
                        `${plan.dbs} عدد`
                      )}
                    </td>
                    <td
                      className={classNames(styles.jHidden, {
                        [styles.open]: this.state.isMoreInfoOpen,
                      })}
                    >
                      {plan.backups[2] ? (
                        <i
                          className={classNames(
                            'far fa-check-square',
                            styles.check
                          )}
                        ></i>
                      ) : (
                        <i className="fa fa-times fa-lg" />
                      )}
                    </td>
                    <td
                      className={classNames(styles.jHidden, {
                        [styles.open]: this.state.isMoreInfoOpen,
                      })}
                    >
                      {plan.backups[1] ? (
                        <i
                          className={classNames(
                            'far fa-check-square',
                            styles.check
                          )}
                        ></i>
                      ) : (
                        <i className="fa fa-times fa-lg" />
                      )}
                    </td>
                    <td
                      className={classNames(styles.jHidden, {
                        [styles.open]: this.state.isMoreInfoOpen,
                      })}
                    >
                      {plan.backups[0] ? (
                        <i
                          className={classNames(
                            'far fa-check-square',
                            styles.check
                          )}
                        ></i>
                      ) : (
                        <i className="fa fa-times fa-lg" />
                      )}
                    </td>
                    <td
                      className={classNames({
                        [styles.jHidden]: this.state.isMoreInfoOpen,
                      })}
                      style={{
                        height:
                          this.props.plans.some((i) => i.backups.length > 0) &&
                          !this.state.isMoreInfoOpen &&
                          '92px',
                      }}
                    >
                      <BackupsCell backups={plan.backups} />
                    </td>
                    <td>
                      <small>{this.getCpuModel(plan.id)}</small>
                    </td>
                    {plan.ram ? (
                      <StarredCell
                        text={formatSpace(plan.ram, 'fa')}
                        star={(plan.ram / maximumRam) * 5}
                      />
                    ) : (
                      <StarredCell text={null} star={5} />
                    )}
                    <td>
                      <i
                        className={classNames(
                          'far fa-check-square',
                          styles.check
                        )}
                      ></i>
                    </td>
                    <td>Apache + Nginx</td>
                    <td>
                      {formatPriceWithCurrency(
                        this.props.currencies,
                        plan.currency,
                        plan.setup
                      )}
                      <br />
                      یکبار پرداخت ماه اول
                    </td>

                    {plan.variants.reverse().map((variant) => (
                      <td key={variant.panel.name} style={{ height: '67px' }}>
                        {formatPriceWithCurrency(
                          this.props.currencies,
                          variant.panel.currency,
                          variant.panel.price
                        )}{' '}
                        ماهیانه
                        <br />
                        {plan.country.code === 'DE' &&
                          `${formatPriceWithCurrency(
                            this.props.currencies,
                            variant.panel.currency,
                            variant.panel.price * 12
                          )} سالیانه`}
                        <br />
                      </td>
                    ))}

                    <td>
                      <div className={styles.btnsWrapper}>
                        {plan.variants.map((variant) => (
                          (<Link
                            key={variant.id}
                            href={`/order/hosting/linux/${variant.id}`}
                            className={styles.orderLink}>

                            <OverlayTrigger
                              placement="top"
                              overlay={
                                <Tooltip
                                  id={`${variant.panel.name}-tooltip`}
                                  className={styles.tooltip}
                                >
                                  {variant.panel.name}
                                </Tooltip>
                              }
                            >
                              <img
                                src={`/images/${variant.panel.name}.png`}
                                alt={variant.panel.name}
                              />
                            </OverlayTrigger>
                            <span>
                              {translateHostPanel(variant.panel.name)}
                            </span>{' '}

                          </Link>)
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    );
  }
}

export default connect((state: RootState) => {
  return {
    currencies: state.currencies,
  };
})(DedicatedHostingTable);

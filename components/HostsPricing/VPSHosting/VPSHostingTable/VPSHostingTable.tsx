import * as React from 'react';
import { Row, Col, Table, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Link from 'next/link';
import styles from './VPSHostingTable.module.scss';
import classNames from 'classnames';
import CountryFlagTooltip from '../../../../helper/components/CountryFlagTooltip/CountryFlagTooltip';
import { IHostPlan } from '../../../../helper/types/products/Host/plan';
import translateHostPanel from '../../../../helper/translators/translateHostPanel';
import { formatPriceWithCurrency } from '../../../../store/Currencies';
import { connect } from 'react-redux';
import { RootState } from '../../../../store';
import StarredCell from '../../TablesUtils/StarredCell';
import BackupsCell from '../../TablesUtils/BackupsCell';
import { formatSpace } from '../../../../helper/formatSpace';

interface IProps {
  plans: IHostPlan[];
  currencies: RootState['currencies'];
}

interface IHostPlanWithCounties extends IHostPlan {
  counties: {
    id: string;
    name: string;
    code: string;
    isAvailable: boolean;
  }[];
}

interface IState {
  isMoreInfoOpen: boolean;
  plans: IHostPlanWithCounties[];
}

class SharedHostingTable extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isMoreInfoOpen: false,
      plans: Object.values(
        this.props.plans.reduce((accumulator, currentValue) => {
          const co = currentValue.title;

          if (accumulator && accumulator[co]) {
            accumulator[co] = {
              ...accumulator[co],
              counties: [
                ...accumulator[co].counties,
                {
                  ...currentValue.country,
                  id: currentValue.id,
                  isAvailable: currentValue.is_available,
                },
              ],
            };
          } else {
            accumulator[co] = {
              ...currentValue,
              counties: [
                {
                  ...currentValue.country,
                  id: currentValue.id,
                  isAvailable: currentValue.is_available,
                },
              ],
            };
          }

          return accumulator;
        }, {})
      ),
    };
  }

  render() {
    const maximumCpu = Math.max(...this.state.plans.map((host) => host.cpu));
    const maximumRam = Math.max(...this.state.plans.map((host) => host.ram));

    return (
      <Row id={`${this.props.plans[0].cp}`} className={styles.tableWrapper}>
        <Col xs={12}>
          <div className={styles.tittleLine}>
            <h5>
              هاست نیمه اختصاصی {translateHostPanel(this.props.plans[0].cp)}
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
                <th>پنل هاست</th>
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
                  <th style={{ lineHeight: '50px' }}>CPU</th>
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
                <th>هارد سرور</th>
                <th style={{ lineHeight: '50px' }}>هزینه راه اندازی</th>
                <th
                  style={{
                    lineHeight:
                      this.props.plans[0].cp === 'cpanel' ? '50px' : '',
                  }}
                >
                  قیمت
                </th>
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
              {this.state.plans.map((plan) => (
                <tr key={plan.id}>
                  <td>{plan.title}</td>
                  <td>{formatSpace(plan.space, 'fa', true)}</td>
                  <td>
                    {!plan.bandwidth ? (
                      <span className={styles.jUnlimited}>بدون محدودیت</span>
                    ) : (
                      plan.bandwidth
                    )}
                  </td>
                  <td>{translateHostPanel(plan.cp)}</td>
                  <td
                    className={classNames({
                      [styles.check]: true,
                    })}
                  >
                    <i className="far fa-check-square"></i>
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
                  {plan.cpu ? (
                    <StarredCell
                      text={
                        plan.cpu < 100
                          ? `% ${plan.cpu} یک هسته`
                          : `${plan.cpu / 100} هسته`
                      }
                      star={(plan.cpu / maximumCpu) * 5}
                    />
                  ) : (
                    <StarredCell text={null} star={5} />
                  )}
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
                    {/* <i className="fa fa-times fa-lg" /> */}
                  </td>
                  <td>
                    {plan.cp === 'cpanel' ? 'Apache + Nginx' : 'OpenLightSpeed'}
                  </td>
                  <td>SSD</td>
                  <td>
                    {formatPriceWithCurrency(
                      this.props.currencies,
                      plan.currency,
                      plan.setup
                    )}{' '}
                    ماهیانه
                    <br />
                    یکبار پرداخت ماه اول
                  </td>
                  <td>
                    {formatPriceWithCurrency(
                      this.props.currencies,
                      plan.currency,
                      plan.price
                    )}{' '}
                    ماهیانه
                    <br />
                    {plan.cp === 'cpanel' &&
                      `${formatPriceWithCurrency(
                        this.props.currencies,
                        plan.currency,
                        plan.price * 12
                      )}
                    سالیانه`}
                  </td>
                  <td>
                    <div className={styles.btnsWrapper}>
                      {plan.counties.map((country) => (
                        (<Link
                          key={country.name}
                          href={`/order/hosting/linux/${country.id}`}
                          className={styles.orderLink}>

                          <CountryFlagTooltip country={country} />
                          <span>سفارش</span>{' '}

                        </Link>)
                      ))}
                      {/* {plan.counties.map((country) =>
                        country.isAvailable ? (
                          <Link
                            key={country.name}
                            href={`/order/hosting/linux/${country.id}`}
                          >
                            <a className={styles.orderLink}>
                              <CountryFlagTooltip country={country} />
                              <span>سفارش</span>{' '}
                            </a>
                          </Link>
                        ) : (
                          <div>
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
                                    src={`/images/flags/${country.code.toLocaleLowerCase()}.svg`}
                                  />
                                  سفارش{' '}
                                </Button>
                              </span>
                            </OverlayTrigger>
                          </div>
                        )
                      )} */}
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
})(SharedHostingTable);

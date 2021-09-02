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
import styles from './ResellerHostingTable.module.scss';
import classNames from 'classnames';
import CountryFlagTooltip from '../../../../helper/components/CountryFlagTooltip/CountryFlagTooltip';
import { IHostPlan } from '../../../../helper/types/products/Host/plan';
import translateCountryNameToPersian from '../../../../helper/translateCountryNameToPersian';
import { formatSpace } from '../../../../helper/formatSpace';
import { connect } from 'react-redux';
import { RootState } from '../../../../store';
import translateHostPanel from '../../../../helper/translators/translateHostPanel';
import StarredCell from '../../TablesUtils/StarredCell';
import { formatPriceWithCurrency } from '../../../../store/Currencies';
import BackupsCell from '../../TablesUtils/BackupsCell';

interface IProps {
  plans: IHostPlan[];
  currencies: RootState['currencies'];
}

interface IState {
  isMoreInfoOpen: boolean;
}

class ResellerHostingTable extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { isMoreInfoOpen: false };
  }

  render() {
    const maximumCpu = Math.max(...this.props.plans.map((host) => host.cpu));
    const maximumRam = Math.max(...this.props.plans.map((host) => host.ram));
    const maximumIO = Math.max(...this.props.plans.map((host) => host.IO));
    const maximumEntryProcess = Math.max(
      ...this.props.plans.map((host) => host.entryprocess)
    );

    return (
      <Row
        id={`${this.props.plans[0].cp}_${this.props.plans[0].country.code}`}
        className={styles.tableWrapper}
      >
        <Col xs={12}>
          <div className={styles.tittleLine}>
            <h5>
              نمایندگی میزبانی هاست {translateHostPanel(this.props.plans[0].cp)}{' '}
              <br />
              <CountryFlagTooltip country={this.props.plans[0].country} />
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
                    <Tooltip id="cpu-tooltip" className={styles.tooltip}>
                      درصد استفاده از پردازشگر
                    </Tooltip>
                  }
                >
                  <th style={{ lineHeight: '50px' }}>CPU</th>
                </OverlayTrigger>
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id="ram-tooltip" className={styles.tooltip}>
                      حافظه موقت
                    </Tooltip>
                  }
                >
                  <th style={{ lineHeight: '50px' }}>Ram</th>
                </OverlayTrigger>
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id="io-tooltip" className={styles.tooltip}>
                      سرعت خواندن و نوشتن اطلاعات
                    </Tooltip>
                  }
                >
                  <th style={{ lineHeight: '50px' }}>IO</th>
                </OverlayTrigger>
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip
                      id="entry-process-tooltip"
                      className={styles.tooltip}
                    >
                      تعداد پردازش های همزمان
                    </Tooltip>
                  }
                >
                  <th style={{ lineHeight: '50px' }}>Entry Process</th>
                </OverlayTrigger>
                <th>وب سرور</th>
                <th>هارد سرور</th>
                <th
                  style={{
                    lineHeight:
                      this.props.plans[0].cp === 'directadmin' ? '75px' : '',
                  }}
                >
                  قیمت
                </th>

                <th className="text-center" style={{ lineHeight: '34px' }}>
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
              {this.props.plans.map((plan) => (
                <tr key={plan.id}>
                  <td>{plan.title}</td>
                  <td>{formatSpace(plan.space, 'fa', true)}</td>
                  <td>
                    {!plan.bandwidth ? (
                      <span className={styles.jUnlimited}>بدون محدودیت</span>
                    ) : (
                      formatSpace(plan.bandwidth, 'fa', true)
                    )}
                  </td>
                  <td>{translateHostPanel(plan.cp)}</td>
                  <td
                    className={classNames({
                      [styles.check]: true,
                    })}
                  >
                    گواهینامه رایگان SSL
                    {/* <i className="far fa-check-square"></i> */}
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
                    {plan.email ? (
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
                      plan.ftp
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
                      plan.dbs
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
                  {plan.IO ? (
                    <StarredCell
                      text={`${plan.IO} مگابایت بر ثانیه`}
                      star={(plan.IO / maximumIO) * 5}
                    />
                  ) : (
                    <StarredCell text={null} star={5} />
                  )}
                  {plan.entryprocess ? (
                    <StarredCell
                      text={`${plan.entryprocess} عدد`}
                      star={(plan.entryprocess / maximumEntryProcess) * 5}
                    />
                  ) : (
                    <StarredCell text={null} star={5} />
                  )}
                  <td>OpenLightSpeed</td>
                  <td>SSD</td>
                  <td>
                    {formatPriceWithCurrency(
                      this.props.currencies,
                      plan.currency,
                      plan.price
                    )}{' '}
                    ماهیانه
                    <br />
                    {plan.cp === 'directadmin' &&
                      `${formatPriceWithCurrency(
                        this.props.currencies,
                        plan.currency,
                        plan.price
                      )} سالیانه`}
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
                              src={`/images/flags/${plan.country.code.toLocaleLowerCase()}.svg`}
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
        </Col>
      </Row>
    );
  }
}

export default connect((state: RootState) => {
  return {
    currencies: state.currencies,
  };
})(ResellerHostingTable);

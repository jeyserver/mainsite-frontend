import * as React from 'react';
import { Table, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import Link from 'next/link';
import styles from './SharedHostingTab.module.scss';
import classNames from 'classnames';
import CountryFlagTooltip from '../../../../helper/components/CountryFlagTooltip/CountryFlagTooltip';
import { formatSpaceInPersian } from '../../../../helper/formatSpace';
import formatPriceWithCurrency from '../../../../helper/formatPriceWithCurrency';
import { connect } from 'react-redux';
import { RootState } from '../../../../store';
import { IHostPlan } from '../../../../helper/types/products/Host/plan';
import translateHostPanel from '../../../../helper/translators/translateHostPanel';

interface IProps {
  data: IHostPlan[];
  type: 'windows' | 'linux';
  currencies: RootState['currencies'];
}

interface IState {
  isMoreInfoOpen: boolean;
}

class SharedHostingTab extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { isMoreInfoOpen: false };
  }

  render() {
    return (
      <div>
        <p className={styles.tableInfo}>
          {this.props.type === 'linux'
            ? 'سرویس هاست لینوکس معمولی جهت ارائه خدمات به وب سایت هایی با بازدید و مصرف معمولی از منابع سرور است که کدنویسی و برنامه نویسی آن بر پایه سیستم عامل لینوکس و با زبان های برنامه نویسی php و ... می باشد. البته هاست لینوکس بدین معناست که فقط سیستم عامل نصب شده، روی سرور لینوکس است و هیچ ارتباطی با سیستم عامل کامپیوتر شخصی شما ندارد و چنانچه روی کامپیوتر شما ویندوز نصب باشد به راحتی می توانید از هاست لینوکس استفاده کنید.'
            : 'هاست ویندوز جی سرور مجهز به آخرین تکنولوژی های سخت افزاری،نرم افزاری بوده واز کنترل پنل هاست Website Panel جهت مدیریت هاست ویندوز بهره مند میباشد. سیستم عامل این هاست ، ویندوز سرور 2012 می باشد و تمامی کامپوننت های زبان های برنامه نویسی asp,asp.net,... را پشتیبانی می کند.در واقع این هاست تمامی نیازهای شما را به عنوان یک برنامه نویس مرتفع می نماید. از ویژگی های بارز این هاست می توان به آپ تایم بالا،امنیت بالاو پشتیبانی از تمامی زبان های برنامه نویسی اشاره کرد.'}
        </p>
        <Table className={styles.table}>
          <thead>
            <tr>
              <th>&nbsp;</th>
              <th>فضا</th>
              <th>پهنای باند</th>
              <th>پنل هاست</th>
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
                style={{ lineHeight: '75px' }}
              >
                دوره های بکاپ گیری
              </th>
              <th>وب سرور</th>
              <th>هارد سرور</th>
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
            {this.props.data.map((panel) => (
              <tr key={panel.id}>
                <td>{panel.title}</td>
                <td>{formatSpaceInPersian(panel.space)}</td>
                <td>
                  {panel.bandwidth ? (
                    formatSpaceInPersian(panel.bandwidth)
                  ) : (
                    <span className={styles.jUnlimited}>بدون محدودیت</span>
                  )}
                </td>
                <td>{translateHostPanel(panel.cp)}</td>
                <td
                  className={classNames(styles.jHidden, {
                    [styles.open]: this.state.isMoreInfoOpen,
                  })}
                >
                  {panel.parkdomain ? (
                    `${panel.parkdomain} عدد`
                  ) : (
                    <span className={styles.jUnlimited}>بدون محدودیت</span>
                  )}
                </td>

                <td>
                  {panel.addondomain ? (
                    `${panel.addondomain} عدد`
                  ) : (
                    <span className={styles.jUnlimited}>بدون محدودیت</span>
                  )}
                </td>
                <td
                  className={classNames(styles.jHidden, {
                    [styles.open]: this.state.isMoreInfoOpen,
                  })}
                >
                  {panel.subdomain ? (
                    `${panel.subdomain} عدد`
                  ) : (
                    <span className={styles.jUnlimited}>بدون محدودیت</span>
                  )}
                </td>
                <td
                  className={classNames(styles.jHidden, {
                    [styles.open]: this.state.isMoreInfoOpen,
                  })}
                >
                  {panel.email ? (
                    `${panel.email} عدد`
                  ) : (
                    <span className={styles.jUnlimited}>بدون محدودیت</span>
                  )}
                </td>
                <td
                  className={classNames(styles.jHidden, {
                    [styles.open]: this.state.isMoreInfoOpen,
                  })}
                >
                  {panel.ftp ? (
                    `${panel.ftp} عدد`
                  ) : (
                    <span className={styles.jUnlimited}>بدون محدودیت</span>
                  )}
                </td>
                <td
                  className={classNames(styles.jHidden, {
                    [styles.open]: this.state.isMoreInfoOpen,
                  })}
                >
                  {panel.dbs ? (
                    `${panel.dbs} عدد`
                  ) : (
                    <span className={styles.jUnlimited}>بدون محدودیت</span>
                  )}
                </td>
                <td
                  className={classNames(styles.jHidden, {
                    [styles.open]: this.state.isMoreInfoOpen,
                  })}
                >
                  {panel.backups[0] ? (
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
                  {panel.backups[1] ? (
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
                  {panel.backups[2] ? (
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
                >
                  {panel.backups[0] && (
                    <div>
                      <i
                        className={classNames(
                          'far fa-check-square',
                          styles.check
                        )}
                      ></i>{' '}
                      روزانه
                    </div>
                  )}
                  {panel.backups[1] && (
                    <div>
                      <i
                        className={classNames(
                          'far fa-check-square',
                          styles.check
                        )}
                      ></i>{' '}
                      ماهانه
                    </div>
                  )}
                  {panel.backups[2] && (
                    <div>
                      <i
                        className={classNames(
                          'far fa-check-square',
                          styles.check
                        )}
                      ></i>{' '}
                      سالیانه
                    </div>
                  )}
                </td>
                <td>
                  {this.props.type === 'linux' ? 'Apache + Nginx' : 'IIS'}
                </td>
                <td>SSD</td>
                <td>
                  <div>
                    {formatPriceWithCurrency(
                      this.props.currencies.items,
                      panel.currency,
                      panel.price
                    )}{' '}
                    ماهیانه
                  </div>
                </td>
                <td>
                  {panel.is_available && (
                    <Link href={`/order/server/vps/${panel.id}`}>
                      <a className={styles.orderLink}>
                        <CountryFlagTooltip
                          country={panel.country}
                          flag={{
                            width: 24,
                            height: 24,
                          }}
                        />
                        <span>سفارش</span>{' '}
                      </a>
                    </Link>
                  )}
                  {/* {!this.props.isOrderBtnHidden && (
                    <div>
                      {panel.is_available && (
                        <Link href={`/order/server/vps/${panel.id}`}>
                          <a className={styles.orderLink}>
                            <CountryFlagTooltip
                              country={panel.country}
                              flag={{
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
                                src={`./images/flags/${panel.country.code.toLowerCase()}.svg`}
                                alt={panel.country.name}
                              />
                              سفارش{' '}
                            </Button>
                          </span>
                        </OverlayTrigger>
                      )}
                    </div>
                  )} */}
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
})(SharedHostingTab);

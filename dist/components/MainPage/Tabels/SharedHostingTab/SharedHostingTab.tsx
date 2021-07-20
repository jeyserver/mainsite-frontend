import * as React from 'react';
import { Table, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import Link from 'next/link';
import styles from './SharedHostingTab.module.scss';
import classNames from 'classnames';
import { formatPrice } from '../../../helper/formatPrice';
import CountryFlagTooltip from '../../../helper/components/CountryFlagTooltip';

export interface SharedHostingTabProps {
  data: any;
  type: 'windows' | 'linux';
  isOrderBtnHidden?: boolean;
}

export interface SharedHostingTabState {
  isMoreInfoOpen: boolean;
}

class SharedHostingTab extends React.Component<
  SharedHostingTabProps,
  SharedHostingTabState
> {
  constructor(props: SharedHostingTabProps) {
    super(props);
    this.state = { isMoreInfoOpen: false };
    this.toggleMoreInfo = this.toggleMoreInfo.bind(this);
  }

  toggleMoreInfo() {
    this.setState((prev) => {
      return { isMoreInfoOpen: !prev.isMoreInfoOpen };
    });
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
            {this.props.data.panels.map((panel) => (
              <tr key={panel.id}>
                <td>{panel.title}</td>
                <td>{panel.space}</td>
                <td>
                  {panel.bandwidth === '-' ? (
                    <span className={styles.jUnlimited}>بدون محدودیت</span>
                  ) : (
                    panel.bandwidth
                  )}
                </td>
                <td>{panel.host_panel}</td>
                <td
                  className={classNames(styles.jHidden, {
                    [styles.open]: this.state.isMoreInfoOpen,
                  })}
                >
                  {panel.park_domains === '-' ? (
                    <span className={styles.jUnlimited}>بدون محدودیت</span>
                  ) : (
                    `${panel.park_domains} عدد`
                  )}
                </td>

                <td>
                  {panel.additional_sites === '-' ? (
                    <span className={styles.jUnlimited}>بدون محدودیت</span>
                  ) : (
                    `${panel.additional_sites} عدد`
                  )}
                </td>
                <td
                  className={classNames(styles.jHidden, {
                    [styles.open]: this.state.isMoreInfoOpen,
                  })}
                >
                  {panel.subdomains === '-' ? (
                    <span className={styles.jUnlimited}>بدون محدودیت</span>
                  ) : (
                    `${panel.subdomains} عدد`
                  )}
                </td>
                <td
                  className={classNames(styles.jHidden, {
                    [styles.open]: this.state.isMoreInfoOpen,
                  })}
                >
                  {panel.emails === '-' ? (
                    <span className={styles.jUnlimited}>بدون محدودیت</span>
                  ) : (
                    panel.emails
                  )}
                </td>
                <td
                  className={classNames(styles.jHidden, {
                    [styles.open]: this.state.isMoreInfoOpen,
                  })}
                >
                  {panel.ftp === '-' ? (
                    <span className={styles.jUnlimited}>بدون محدودیت</span>
                  ) : (
                    panel.ftp
                  )}
                </td>
                <td
                  className={classNames(styles.jHidden, {
                    [styles.open]: this.state.isMoreInfoOpen,
                  })}
                >
                  {panel.database === '-' ? (
                    <span className={styles.jUnlimited}>بدون محدودیت</span>
                  ) : (
                    panel.database
                  )}
                </td>
                <td
                  className={classNames(styles.jHidden, {
                    [styles.open]: this.state.isMoreInfoOpen,
                  })}
                >
                  {panel.daily_backup ? (
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
                  {panel.monthly_backup ? (
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
                  {panel.annual_backup ? (
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
                  {panel.daily_backup && (
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
                  {panel.monthly_backup && (
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
                  {panel.annual_backup && (
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
                <td>{panel.web_server}</td>
                <td>{panel.hard_server}</td>
                <td>
                  <div>
                    {formatPrice(panel.price)} {panel.currency.title} ماهیانه
                  </div>
                  <div>
                    {formatPrice(panel.price * 12)} {panel.currency.title}{' '}
                    سالیانه
                  </div>
                </td>
                <td>
                  {!this.props.isOrderBtnHidden && (
                    <div>
                      {panel.active ? (
                        <Link href={`/order/server/vps/${panel.id}`}>
                          <a className={styles.orderLink}>
                            <CountryFlagTooltip
                              name={this.props.data.country_name_en}
                              flag={{
                                address: this.props.data.flag,
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
                                src={this.props.data.flag}
                                alt={this.props.data.country_name_en}
                              />
                              سفارش{' '}
                            </Button>
                          </span>
                        </OverlayTrigger>
                      )}
                    </div>
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

export default SharedHostingTab;

import * as React from 'react';
import { Table, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import Link from 'next/link';
import styles from './SharedHostingTable.module.scss';
import classNames from 'classnames';
import CountryFlagTooltip from '../../../helper/components/CountryFlagTooltip/CountryFlagTooltip';
import { formatSpaceInPersian } from '../../../helper/formatSpace';
import { formatPriceWithCurrency } from '../../../store/Currencies';
import { connect } from 'react-redux';
import { RootState } from '../../../store';
import { IHostPlan } from '../../../helper/types/products/Host/plan';
import translateHostplan from '../../../helper/translators/translateHostPanel';
import translateCountryNameToPersian from '../../../helper/translateCountryNameToPersian';
import StarredCell from '../../HostsPricing/TablesUtils/StarredCell';
import { formatSpace } from '../../../helper/formatSpace';
import BackupsCell from '../../HostsPricing/TablesUtils/BackupsCell';

type TableType = 'windows' | 'linux';
type TableSubTitle = 'professional' | 'standard';

interface IProps {
  data: IHostPlan[];
  type: TableType;
  subType?: TableSubTitle;
  currencies: RootState['currencies'];
  homePageTable: boolean;
}

interface IState {
  isMoreInfoOpen: boolean;
}

class SharedHostingTable extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { isMoreInfoOpen: false };
  }

  tableTitle(title: `${TableType}-${TableSubTitle}`) {
    switch (title) {
      case 'linux-professional':
        return 'لینوکس حرفه ای';
      case 'linux-standard':
        return 'لینوکس ساده';
      case 'windows-standard':
        return 'ویندوز معمولی';
      case 'windows-professional':
        return 'ویندوز حرفه ای';
      default:
        return '';
    }
  }

  render() {
    const maximumCpu = Math.max(...this.props.data.map((host) => host.cpu));
    const maximumRam = Math.max(...this.props.data.map((host) => host.ram));
    const maximumIO = Math.max(...this.props.data.map((host) => host.IO));
    const maximumEntryProcess = Math.max(
      ...this.props.data.map((host) => host.entryprocess)
    );

    return (
      <div>
        {!this.props.homePageTable && this.props.subType && (
          <div className={styles.title}>
            <h5>
              میزبانی{' '}
              {this.tableTitle(`${this.props.type}-${this.props.subType}`)}{' '}
              {this.props.data[0].cp !== 'websiteplan' &&
                translateHostplan(this.props.data[0].cp)}
              <br />
              <CountryFlagTooltip country={this.props.data[0].country} />
              <span className={styles.countryName}>
                {translateCountryNameToPersian(this.props.data[0].country.code)}
              </span>
            </h5>
            <div className={styles.divider}>
              <div />
            </div>
          </div>
        )}

        {this.props.homePageTable && (
          <p className={styles.tableInfo}>
            {this.props.type === 'linux'
              ? 'سرویس هاست لینوکس معمولی جهت ارائه خدمات به وب سایت هایی با بازدید و مصرف معمولی از منابع سرور است که کدنویسی و برنامه نویسی آن بر پایه سیستم عامل لینوکس و با زبان های برنامه نویسی php و ... می باشد. البته هاست لینوکس بدین معناست که فقط سیستم عامل نصب شده، روی سرور لینوکس است و هیچ ارتباطی با سیستم عامل کامپیوتر شخصی شما ندارد و چنانچه روی کامپیوتر شما ویندوز نصب باشد به راحتی می توانید از هاست لینوکس استفاده کنید.'
              : 'هاست ویندوز جی سرور مجهز به آخرین تکنولوژی های سخت افزاری،نرم افزاری بوده واز کنترل پنل هاست Website plan جهت مدیریت هاست ویندوز بهره مند میباشد. سیستم عامل این هاست ، ویندوز سرور 2012 می باشد و تمامی کامپوننت های زبان های برنامه نویسی asp,asp.net,... را پشتیبانی می کند.در واقع این هاست تمامی نیازهای شما را به عنوان یک برنامه نویس مرتفع می نماید. از ویژگی های بارز این هاست می توان به آپ تایم بالا،امنیت بالاو پشتیبانی از تمامی زبان های برنامه نویسی اشاره کرد.'}
          </p>
        )}

        <Table className={styles.table}>
          <thead>
            <tr>
              <th>&nbsp;</th>
              <th>فضا</th>
              <th>پهنای باند</th>
              <th>پنل هاست</th>
              {!this.props.homePageTable && this.props.subType && (
                <th>گواهینامه رایگان SSL</th>
              )}
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
                  this.props.data.some((i) => i.backups.length > 0) && {
                    lineHeight: '75px',
                  }
                }
              >
                دوره های بکاپ گیری
              </th>
              {!this.props.homePageTable && (
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip id="cpu">درصد استفاده از پردازشگر</Tooltip>}
                >
                  <th style={{ lineHeight: '50px' }}>CPU</th>
                </OverlayTrigger>
              )}
              {!this.props.homePageTable && (
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip id="cpu">حافظه موقت</Tooltip>}
                >
                  <th style={{ lineHeight: '50px' }}>Ram</th>
                </OverlayTrigger>
              )}
              {!this.props.homePageTable && (
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id="cpu">سرعت خواندن و نوشتن اطلاعات</Tooltip>
                  }
                >
                  <th style={{ lineHeight: '50px' }}>IO</th>
                </OverlayTrigger>
              )}
              {!this.props.homePageTable && (
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip id="cpu">تعداد پردازش های همزمان</Tooltip>}
                >
                  <th style={{ lineHeight: '50px' }}>Entry Process</th>
                </OverlayTrigger>
              )}
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
            {this.props.data.map((plan) => (
              <tr key={plan.id}>
                <td>{plan.title}</td>
                <td>{formatSpaceInPersian(plan.space)}</td>
                <td>
                  {plan.bandwidth ? (
                    formatSpaceInPersian(plan.bandwidth)
                  ) : (
                    <span className={styles.jUnlimited}>بدون محدودیت</span>
                  )}
                </td>
                <td>{translateHostplan(plan.cp)}</td>

                {!this.props.homePageTable && (
                  <td>
                    {this.props.subType &&
                      (this.props.subType === 'professional' ? (
                        <i
                          className={classNames(
                            'far fa-check-square',
                            styles.check
                          )}
                        ></i>
                      ) : (
                        <i className="fa fa-times fa-lg" />
                      ))}
                  </td>
                )}
                <td
                  className={classNames(styles.jHidden, {
                    [styles.open]: this.state.isMoreInfoOpen,
                  })}
                >
                  {plan.parkdomain ? (
                    `${plan.parkdomain} عدد`
                  ) : (
                    <span className={styles.jUnlimited}>بدون محدودیت</span>
                  )}
                </td>

                <td>
                  {plan.addondomain ? (
                    `${plan.addondomain} عدد`
                  ) : (
                    <span className={styles.jUnlimited}>بدون محدودیت</span>
                  )}
                </td>
                <td
                  className={classNames(styles.jHidden, {
                    [styles.open]: this.state.isMoreInfoOpen,
                  })}
                >
                  {plan.subdomain ? (
                    `${plan.subdomain} عدد`
                  ) : (
                    <span className={styles.jUnlimited}>بدون محدودیت</span>
                  )}
                </td>
                <td
                  className={classNames(styles.jHidden, {
                    [styles.open]: this.state.isMoreInfoOpen,
                  })}
                >
                  {plan.email ? (
                    `${plan.email} عدد`
                  ) : (
                    <span className={styles.jUnlimited}>بدون محدودیت</span>
                  )}
                </td>
                <td
                  className={classNames(styles.jHidden, {
                    [styles.open]: this.state.isMoreInfoOpen,
                  })}
                >
                  {plan.ftp ? (
                    `${plan.ftp} عدد`
                  ) : (
                    <span className={styles.jUnlimited}>بدون محدودیت</span>
                  )}
                </td>
                <td
                  className={classNames(styles.jHidden, {
                    [styles.open]: this.state.isMoreInfoOpen,
                  })}
                >
                  {plan.dbs ? (
                    `${plan.dbs} عدد`
                  ) : (
                    <span className={styles.jUnlimited}>بدون محدودیت</span>
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
                      this.props.data.some((i) => i.backups.length > 0) &&
                      !this.state.isMoreInfoOpen &&
                      '92px',
                  }}
                >
                  <BackupsCell backups={plan.backups} />
                </td>
                {!this.props.homePageTable &&
                  (plan.cpu ? (
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
                  ))}
                {!this.props.homePageTable &&
                  (plan.ram ? (
                    <StarredCell
                      text={formatSpace(plan.ram, 'fa')}
                      star={(plan.ram / maximumRam) * 5}
                    />
                  ) : (
                    <StarredCell text={null} star={5} />
                  ))}
                {!this.props.homePageTable &&
                  (plan.IO ? (
                    <StarredCell
                      text={`${plan.IO} مگابایت بر ثانیه`}
                      star={(plan.IO / maximumIO) * 5}
                    />
                  ) : (
                    <StarredCell text={null} star={5} />
                  ))}
                {!this.props.homePageTable &&
                  (plan.entryprocess ? (
                    <StarredCell
                      text={`${plan.entryprocess} عدد`}
                      star={(plan.entryprocess / maximumEntryProcess) * 5}
                    />
                  ) : (
                    <StarredCell text={null} star={5} />
                  ))}
                <td>
                  {this.props.type === 'linux' ? 'Apache + Nginx' : 'IIS'}
                </td>
                <td>SSD</td>
                <td>
                  <div>
                    {formatPriceWithCurrency(
                      this.props.currencies,
                      plan.currency,
                      plan.price
                    )}{' '}
                    ماهیانه
                  </div>
                </td>
                <td>
                  {this.props.homePageTable && panel.is_available && (
                    <Link
                      href={`/order/hosting/${this.props.type}/${panel.id}?location=${panel.country.code}`}
                    >
                      <a className={styles.orderLink}>
                        <CountryFlagTooltip country={plan.country} />
                        <span>سفارش</span>{' '}
                      </a>
                    </Link>
                  )}

                  {!this.props.homePageTable &&
                    (panel.is_available ? (
                      <Link
                        href={`/order/hosting/${this.props.type}/${panel.id}?location=${panel.country.code}`}
                      >
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
                              src={`/images/flags/${plan.country.code.toLowerCase()}.svg`}
                              alt={plan.country.name}
                            />
                            سفارش{' '}
                          </Button>
                        </span>
                      </OverlayTrigger>
                    ))}
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
})(SharedHostingTable);

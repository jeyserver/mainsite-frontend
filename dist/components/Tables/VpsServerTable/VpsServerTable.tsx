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

  getVpsPlanType = (title) => {
    if (title.search('اقتصادی') > -1) {
      return {
        fa: 'اقتصادی',
        en: 'economic',
      };
    } else if (title.search('حرفه ای') > -1) {
      return {
        en: 'professional',
        fa: 'حرفه ای',
      };
    } else if (title.search('حجیم') > -1) {
      return {
        en: 'storage',
        fa: 'حجیم',
      };
    } else {
      return {
        en: '',
        fa: '',
      };
    }
  };

  render() {
    return (
      <div
        id={`vps_${this.getVpsPlanType(this.props.data[0].title).en}_${
          this.props.data[0].country.name === 'ایران'
            ? 'iran'
            : this.props.data[0].country.name.toLocaleLowerCase()
        }`}
      >
        <div className={styles.tittleLine}>
          <h5
            className={classNames({
              [styles.pageTitle]: !this.props.homePageTable,
            })}
          >
            سرور مجازی {this.getVpsPlanType(this.props.data[0].title).fa}
            <br />
            <CountryFlagTooltip country={this.props.data[0].country} />
            {translateCountryNameToPersian(this.props.data[0].country.code)}
          </h5>
          <div className={styles.divider}>
            <div />
          </div>
        </div>

        {this.props.data[0].country.name === 'France' &&
          this.getVpsPlanType(this.props.data[0].title).fa === 'حجیم' && (
            <div>
              <p>
                اگر میخواهید سرور دانلود راه اندازی کنید یا وب سایتتان فایل های
                سنگین دارد، این سرور های مجازی بهترین انتخاب شما خواهد بود.در
                این سرور ها هم میتوانید لینوکس و هم ویندوز نصب کنید.
              </p>
              <p>
                سرور های دانلود فرانسه از آپتایم و سرعت پورت بسیار بالا و با
                کیفیتی برخوردار هستند و ما برای مجازی سازی از VMWare استفاده
                میکنیم؛ بنابراین دسترسی کنسول به این سرور مجازی به راحتی و با
                درخواست شما قابل ارائه است.
              </p>
              <p>
                این سرویس ها بر روی هارد های پرسرعت و جدید با تکنولوژی RAID
                میزبانی خواهند شد تا امنیت اطلاعات شما حفظ شود.
              </p>
              <p>
                تمامی سرور های دانلود آنی تحویل داده خواهد شد و امکان تغییر
                سیستم عامل آن ها خودکار از و از طریق پنل کاربری جی سرور صورت
                میگیرد.
              </p>
              <p>
                اگر این سرور ها را به عنوان هاست دانلود استفاده میکنید، ما
                استفاده از وب سرور انجین ایکس را به شما پیشنهاد میکنیم. همچنین
                در صورت نیاز به کانفیگ سرور لطفا با پشتیبانی ۲۴ ساعته ما ارتباط
                برقرار کنید تا همکاران ما به سرعت خدمات مورد نیاز شما را فراهم
                کنند.
              </p>
            </div>
          )}

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
                      this.props.homePageTable
                        ? plan.currency
                        : plan.currency.id,
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
                            src={`/images/flags/${plan.country.code.toLowerCase()}.svg`}
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

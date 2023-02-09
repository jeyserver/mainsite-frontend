import * as React from 'react';
import { Table, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import Link from 'next/link';
import styles from './ServerDedicatedTab.module.scss';
import { formatHards } from '../../../../helper/formatHards';
import { formatSpaceInPersian } from '../../../../helper/formatSpace';
import CountryFlagTooltip from '../../../../helper/components/CountryFlagTooltip/CountryFlagTooltip';
import { formatPriceWithCurrency } from '../../../../store/Currencies';
import { RootState } from '../../../../store';
import { connect } from 'react-redux';
import { IDedicatedPlan } from '../../../../helper/types/products/Dedicated/plan';

interface IProps {
  data: IDedicatedPlan[];
  currencies: RootState['currencies'];
}

class ServerDedicatedTab extends React.Component<IProps> {
  render() {
    return (
      <div>
        <p className={styles.tableInfo}>
          خدمات سرور اختصاصی ، امکان کارآمدی برای استفاده کابران شخصی و افراد
          خاص می باشد که نمی‌توانند یا نمی‌خواهند به هر دلیل از سرورهای خارجی یا
          داخلی گران استفاده نمایند. از آن‌ جا که در این روش، تمام ریسورسهای
          سرور به طور کامل و نیز پهنای باند قابل توجه به همراه یک IP استاتیک با
          کمترین هزینه در اختیار مشتری قرار می‌گیرد، امکانات متنوعی برای فرد
          فراهم می‌آید.
        </p>

        <Table className={styles.table}>
          <thead>
            <tr>
              <th>&nbsp;</th>
              <th>هارد</th>
              <th>پردازشگر</th>
              <th>حافظه موقت</th>
              <th>موقعیت</th>
              <th style={{ lineHeight: '50px' }}>قیمت</th>
              <th style={{ lineHeight: '65px' }}>سفارش</th>
            </tr>
          </thead>
          <tbody>
            {this.props.data.map((panel) => (
              <tr key={panel.id}>
                <td>{panel.title}</td>
                <td>{formatHards(panel.hard)}</td>
                <td>{panel.cpu.speed} گیگاهرتز</td>
                <td>{formatSpaceInPersian(panel.ram)}</td>
                <td>
                  <CountryFlagTooltip country={panel.datacenter.country} />
                </td>
                <td>
                  <div>
                    {formatPriceWithCurrency(
                      this.props.currencies,
                      panel.currency,
                      panel.price
                    )}{' '}
                    ماهیانه
                  </div>
                  <div>
                    {formatPriceWithCurrency(
                      this.props.currencies,
                      panel.currency,
                      panel.price * 12
                    )}{' '}
                    سالیانه
                  </div>
                </td>

                <td>
                  <div className={styles.btnsWrapper}>
                    <Link href={`/server/dedicated/${panel.id}`}>
                      <a className={styles.moreInfoLink}>اطلاعات بیشتر</a>
                    </Link>
                    {!panel.sold_out ? (
                      <Link href={`/order/server/dedicated/${panel.id}`}>
                        <a className={styles.orderLink}>
                          <i className="fas fa-shopping-cart"></i>
                          <span>سفارش</span>
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
                            <i className="fas fa-shopping-cart"></i>
                            سفارش{' '}
                          </Button>
                        </span>
                      </OverlayTrigger>
                    )}
                  </div>
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
})(ServerDedicatedTab);

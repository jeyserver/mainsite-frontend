import * as React from 'react';
import { Table, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import Link from 'next/link';
import styles from './ServerDedicatedTab.module.scss';
import classNames from 'classnames';
import { formatHards } from '../../../helper/formatHards';
import { formatSpaceInPersian } from '../../../helper/formatSpace';
import CountryFlagTooltip from '../../../helper/components/CountryFlagTooltip';
import { formatPrice } from '../../../helper/formatPrice';

export interface ServerDedicatedTabProps {
  data: any;
}

export interface ServerDedicatedTabState {}

class ServerDedicatedTab extends React.Component<
  ServerDedicatedTabProps,
  ServerDedicatedTabState
> {
  constructor(props: ServerDedicatedTabProps) {
    super(props);
    this.state = {};
  }

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
            {this.props.data.panels.map((panel) => (
              <tr key={panel.id}>
                <td>{panel.title}</td>
                <td>{formatHards(panel.hard)}</td>
                <td>{panel.cpu} گیگاهرتز</td>
                <td>{formatSpaceInPersian(panel.ram)}</td>
                <td>
                  <CountryFlagTooltip
                    name={panel.location.country}
                    flag={{
                      address: panel.location.flag,
                      width: 24,
                      height: 24,
                    }}
                  />
                </td>
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
                  <div className={styles.btnsWrapper}>
                    <Link href={`/server/dedicated/${panel.id}`}>
                      <a className={styles.moreInfoLink}>اطلاعات بیشتر</a>
                    </Link>
                    <Link href={`/order/server/dedicated/${panel.id}`}>
                      <a className={styles.orderLink}>
                        <i className="fas fa-shopping-cart"></i>
                        <span>سفارش</span>
                      </a>
                    </Link>
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

export default ServerDedicatedTab;

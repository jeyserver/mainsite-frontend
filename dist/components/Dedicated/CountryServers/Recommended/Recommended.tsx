import * as React from 'react';
import { Row, Col, Tooltip, OverlayTrigger, Button } from 'react-bootstrap';
import Link from 'next/link';
import styles from './Recommended.module.scss';
import { formatSpace } from '../../../../helper/formatSpace';
import { formatHards } from '../../../../helper/formatHards';
import { IDedicatedPlan } from '../../../../helper/types/products/Dedicated/plan';
import { connect } from 'react-redux';
import { RootState } from '../../../../store';
import { formatPriceWithCurrency } from '../../../../store/Currencies';
import getCpuLink from '../../../../helper/getCpuLink';

interface IProps {
  recommended: IDedicatedPlan[];
  currencies: RootState['currencies'];
}

class Recommended extends React.Component<IProps> {
  render() {
    return (
      <Row>
        <Col md={12} className={styles.recommended}>
          <h3>سرور های پیشنهادی</h3>
          <table className="table table-flip">
            <thead>
              <tr>
                <th>&nbsp;</th>
                <th style={{ lineHeight: '75px' }}>پردازشگر</th>
                <th>حافظه موقت</th>
                <th>هارد</th>
                <th>ترافیک</th>
                <th>پورت</th>
                <th>نوع Raid</th>
                <th>پشتیبانی</th>
                <th>
                  هزینه ستاپ
                  <br />
                  <small>فقط برای ماه اول</small>
                </th>
                <th style={{ lineHeight: '50px' }}>قیمت</th>
                <th style={{ height: '82px' }}></th>
              </tr>
            </thead>
            <tbody>
              {this.props.recommended.map((recommended) => (
                <tr key={recommended.id}>
                  <td className="ltr">{recommended.title}</td>
                  <td className="ltr">
                    {getCpuLink(recommended.cpu.title) ? (
                      <a
                        target="_blank"
                        href={getCpuLink(recommended.cpu.title)}
                      >
                        {recommended.cpu.title}
                      </a>
                    ) : (
                      recommended.cpu.title
                    )}
                    <br />
                    Cores : {recommended.cpu.cores}, Threads :{' '}
                    {recommended.cpu.threads} <br />
                    Frequency : {recommended.cpu.speed} GHz
                  </td>
                  <td>{formatSpace(recommended.ram, 'fa')}</td>
                  <td className="ltr">{formatHards(recommended.hard)}</td>
                  <td>
                    {recommended.bandwidth ? (
                      formatSpace(recommended.bandwidth, 'fa')
                    ) : (
                      <span className={styles.jUnlimited}>بدون محدودیت</span>
                    )}
                  </td>
                  <td>{recommended.port} مگابیت</td>
                  <td>
                    {recommended.raid
                      ? recommended.raid
                      : 'RAID 0 - نرم افزاری'}
                  </td>
                  <td>18 ساعت</td>
                  <td style={{ height: '67px' }}>
                    {recommended.setup &&
                    typeof recommended.currency !== 'number'
                      ? formatPriceWithCurrency(
                          this.props.currencies,
                          recommended.currency,
                          recommended.setup
                        )
                      : '-'}
                  </td>
                  <td>
                    {typeof recommended.currency !== 'number' &&
                      formatPriceWithCurrency(
                        this.props.currencies,
                        recommended.currency,
                        recommended.price
                      )}
                    <span> ماهیانه</span> <br />
                    {typeof recommended.currency !== 'number' &&
                      formatPriceWithCurrency(
                        this.props.currencies,
                        recommended.currency,
                        recommended.price * 12
                      )}
                    <span> سالیانه</span>
                  </td>
                  <td>
                    <div>
                      <Link href={`/server/dedicated/${recommended.id}`}>
                        <a className={styles.moreInfoLink}>اطلاعات بیشتر</a>
                      </Link>
                    </div>
                    <div>
                      {!recommended.sold_out ? (
                        <Link
                          href={`/order/server/dedicated/${recommended.id}`}
                        >
                          <a className={styles.orderLink}>
                            <i className="btn-ico fa fa-shopping-cart"></i>
                            سفارش
                          </a>
                        </Link>
                      ) : (
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-disabled">
                              موجود نیست; در صورت تمایل تماس بگیرید
                            </Tooltip>
                          }
                        >
                          <span className="w-100">
                            <Button
                              disabled
                              className={styles.disabledOrderBtn}
                            >
                              <i className="btn-ico fa fa-shopping-cart"></i>
                              سفارش
                            </Button>
                          </span>
                        </OverlayTrigger>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Col>
      </Row>
    );
  }
}

export default connect((state: RootState) => {
  return {
    currencies: state.currencies,
  };
})(Recommended);

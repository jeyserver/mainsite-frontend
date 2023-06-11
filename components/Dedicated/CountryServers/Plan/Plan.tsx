import * as React from 'react';
import { Row, Col, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import Link from 'next/link';
import styles from './Plan.module.scss';
import { IDedicatedPlan } from '../../../../helper/types/products/Dedicated/plan';
import { formatSpace } from '../../../../helper/formatSpace';
import { connect } from 'react-redux';
import { RootState } from '../../../../store';
import { formatPriceWithCurrency } from '../../../../store/Currencies';
import getCpuLink from '../../../../helper/getCpuLink';
import { formatHards } from '../../../../helper/formatHards';

interface IProps {
  plan: IDedicatedPlan;
  currencies: RootState['currencies'];
}

class Plan extends React.Component<IProps> {
  render() {
    return (
      <Row className={styles.plan}>
        <Col md={2} className={styles.planTitle}>
          <div>
            <Link href={`/server/dedicated/${this.props.plan.id}`}>
              {this.props.plan.title}
            </Link>
          </div>
        </Col>
        <Col className={styles.planHardware}>
          <Row>
            <Col xs={4}>پردازشگر:</Col>
            <Col xs={8} className="ltr">
              {getCpuLink(this.props.plan.cpu.title) ? (
                <a target="_blank" href={getCpuLink(this.props.plan.cpu.title)}>
                  {this.props.plan.cpu.title}
                </a>
              ) : (
                <span>{this.props.plan.cpu.title}</span>
              )}{' '}
              - {this.props.plan.cpu.cores} c / {this.props.plan.cpu.threads} t
              - {this.props.plan.cpu.speed} GHz
            </Col>
          </Row>
          <Row>
            <Col xs={4}>حافظه موقت:</Col>
            <Col xs={8}>{formatSpace(this.props.plan.ram, 'fa')}</Col>
          </Row>
          <Row>
            <Col xs={4}>هارد:</Col>
            <Col xs={8} className="ltr">
              {formatHards(this.props.plan.hard).map((i) => (
                <div key={i}>{i}</div>
              ))}
            </Col>
          </Row>
          <Row>
            <Col xs={4}>ترافیک:</Col>
            <Col xs={8}>
              {this.props.plan.bandwidth ? (
                formatSpace(this.props.plan.bandwidth, 'fa')
              ) : (
                <span className={styles.jUnlimited}>بدون محدودیت</span>
              )}
            </Col>
          </Row>
          <Row>
            <Col xs={4}>پورت:</Col>
            <Col xs={8}>{this.props.plan.port} مگابیت </Col>
          </Row>
          <Row>
            <Col xs={4}>نوع Raid:</Col>
            <Col xs={8} className="ltr">
              {this.props.plan.raid
                ? `RAID ${this.props.plan.raid}`
                : 'RAID 0 - نرم افزاری'}
            </Col>
          </Row>
          <Row>
            <Col xs={5}>
              هزینه ستاپ:
              <br />
              <small>فقط برای ماه اول</small>
            </Col>
            <Col xs={7}>
              {typeof this.props.plan.currency !== 'number' &&
                (!this.props.plan.setup
                  ? '-'
                  : `${formatPriceWithCurrency(
                      this.props.currencies,
                      this.props.plan.currency,
                      this.props.plan.setup
                    )}`)}
            </Col>
          </Row>
        </Col>
        <Col md={2} className={styles.planPrice}>
          <div>
            {typeof this.props.plan.currency !== 'number' &&
              (!this.props.plan.price
                ? '-'
                : `${formatPriceWithCurrency(
                    this.props.currencies,
                    this.props.plan.currency,
                    this.props.plan.price
                  )}`)}
            <br />
            <span>ماهیانه</span>
          </div>
        </Col>
        <Col md={2} className={styles.planAction}>
          <div>
            <Link
              href={`/server/dedicated/${this.props.plan.id}`}
              className={styles.moreInfoBtn}>

              <i className="btn-ico fa fa-info"></i>اطلاعات بیشتر
            </Link>
            {!this.props.plan.sold_out ? (
              (<Link
                href={`/order/server/dedicated/${this.props.plan.id}`}
                className={styles.orderBtn}>

                <i className="btn-ico fa fa-shopping-cart"></i>سفارش
              </Link>)
            ) : (
              <OverlayTrigger
                overlay={
                  <Tooltip id="sold-out-tooltip">
                    موجود نیست; در صورت تمایل تماس بگیرید
                  </Tooltip>
                }
              >
                <span className="w-100">
                  <Button disabled className={styles.disabledOrderBtn}>
                    <i className="btn-ico fa fa-shopping-cart"></i>
                    سفارش
                  </Button>
                </span>
              </OverlayTrigger>
            )}
          </div>
        </Col>
      </Row>
    );
  }
}

export default connect((state: RootState) => {
  return {
    currencies: state.currencies,
  };
})(Plan);

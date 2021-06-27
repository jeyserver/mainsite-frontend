import * as React from 'react';
import { Card, Col, Image, OverlayTrigger, Tooltip } from 'react-bootstrap';
import styles from './Plan.module.scss';

export interface PlanProps {
  plan: any;
}

export interface PlanState {}

class Plan extends React.Component<PlanProps, PlanState> {
  constructor(props: PlanProps) {
    super(props);
    this.state = {};
  }

  addCommas(num: number) {
    let str = num.toString().split('.');
    if (str[0].length >= 5) {
      str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    if (str[1] && str[1].length >= 5) {
      str[1] = str[1].replace(/(\d{3})/g, '$1 ');
    }
    return str.join('.');
  }

  render() {
    return (
      <Col xs={12} sm={12} md={6} lg={3} xl={2} dir="rtl">
        <Card className={styles.card}>
          <Card.Header className={styles.title}>
            <h5>سرور مجازی {this.props.plan.name}</h5>
          </Card.Header>
          <Card.Body className={styles.cardContent}>
            <p className={styles.monthPrice}>
              <span>ماهیانه</span>
              <span> / {this.addCommas(this.props.plan.monthly)}</span> تومان
            </p>
            <p className={styles.hourPrice}>
              <span>ساعتی</span> /{' '}
              <span>{this.addCommas(this.props.plan.hourly)}</span> تومان
            </p>
            <ul>
              <li>
                <span>CPU</span>
                <span>{this.props.plan.cpu} core</span>
              </li>
              <li>
                <span>رم</span>
                <span>{this.props.plan.ram} GB</span>
              </li>
              <li>
                <span>فضای دیسک</span>
                <span>{this.props.plan.diskSpace} GB</span>
              </li>
              <li>
                <span>ترافیک</span>
                <span>{this.props.plan.traffic} TB</span>
              </li>
              <li>
                <span>لوکیشن</span>
                <span>
                  <OverlayTrigger
                    key="France"
                    overlay={<Tooltip id="tooltip-france">France</Tooltip>}
                  >
                    <Image
                      src={this.props.plan.img}
                      data-toggle="tooltip"
                      data-placement="top"
                      title="France"
                      alt=""
                    />
                  </OverlayTrigger>
                </span>
              </li>
            </ul>
            {/* Tooltip was added to the country flag in the plans */}
            <div className={styles.cardBtn}>
              <Card.Link href="#" className="btn">
                <span className="icon">
                  <i className="fas fa-shopping-cart" />
                </span>{' '}
                سفارش دهید
              </Card.Link>
            </div>
          </Card.Body>
        </Card>
      </Col>
    );
  }
}

export default Plan;

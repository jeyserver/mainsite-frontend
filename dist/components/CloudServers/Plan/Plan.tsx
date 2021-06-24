import * as React from 'react';
import { Card, Col, Image, OverlayTrigger, Tooltip } from 'react-bootstrap';
import styles from './Plan.module.scss';

export interface PlanProps {
  name: string;
  monthly: string;
  hourly: string;
  cpu: number;
  ram: number;
  diskSpace: number;
  traffic: number;
  location: string;
}

export interface PlanState {}

class Plan extends React.Component<PlanProps, PlanState> {
  constructor(props: PlanProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Col xs={12} sm={12} md={6} lg={3} xl={2} dir="rtl">
        <Card className={styles.card}>
          <Card.Header className={styles.title}>
            <h5>سرور مجازی {this.props.name}</h5>
          </Card.Header>
          <Card.Body className={styles.cardContent}>
            <p className={styles.monthPrice}>
              <span>ماهیانه</span>
              <span> / {this.props.monthly}</span> تومان
            </p>
            <p className={styles.hourPrice}>
              <span>ساعتی</span> / <span>{this.props.hourly}</span> تومان
            </p>
            <ul>
              <li>
                <span>CPU</span>
                <span>{this.props.cpu} core</span>
              </li>
              <li>
                <span>رم</span>
                <span>{this.props.ram} GB</span>
              </li>
              <li>
                <span>فضای دیسک</span>
                <span>{this.props.diskSpace} GB</span>
              </li>
              <li>
                <span>ترافیک</span>
                <span>{this.props.traffic} TB</span>
              </li>
              <li>
                <span>لوکیشن</span>
                <span>
                  <OverlayTrigger
                    key="France"
                    overlay={<Tooltip id="tooltip-france">France</Tooltip>}
                  >
                    <Image
                      src={this.props.location}
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

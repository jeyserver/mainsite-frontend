import * as React from 'react';
import { Row, Col, OverlayTrigger, Button, Tooltip } from 'react-bootstrap';
import styles from './ServerStatusCard.module.scss';
import { Doughnut } from 'react-chartjs-2';
import classNames from 'classnames';
import moment from 'jalali-moment';

const options = {
  plugins: {
    legend: {
      display: false,
    },
    tooltips: {
      enabled: false,
    },
  },

  maintainAspectRatio: false,
  cutout: 100,
};

export interface ServerStatusCardProps {
  server: any;
}

export interface ServerStatusCardState {}

class ServerStatusCard extends React.Component<
  ServerStatusCardProps,
  ServerStatusCardState
> {
  constructor(props: ServerStatusCardProps) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Row className={styles.row}>
        <Col md={4} lg={2}>
          <div>
            <div className={styles.serverTitle}>
              <span className={styles.iconWrapper}>
                {this.props.server.status === 'up' ? (
                  <i className={styles.up + ' fas fa-arrow-alt-circle-up'}></i>
                ) : (
                  <i
                    className={styles.down + ' fas fa-arrow-alt-circle-down'}
                  ></i>
                )}
              </span>
              <span className={styles.title}>{this.props.server.title}</span>
            </div>
            <div className={styles.serverLink}>{this.props.server.link}</div>
          </div>
        </Col>
        <Col
          md={8}
          lg={3}
          className="d-flex align-items-center justify-content-center position-relative"
        >
          <div className={styles.chartWrapper}>
            <Doughnut
              type="doughnut"
              data={{
                labels: ['Red', 'Blue'],
                datasets: [
                  {
                    label: '',
                    data: [
                      (100 - this.props.server.monthlyUpTime) / 10,
                      this.props.server.monthlyUpTime / 100,
                    ],
                    backgroundColor: ['#BE1414', '#3FC715'],
                    borderColor: ['#BE1414', '#3FC715'],
                  },
                ],
              }}
              options={options}
            />
          </div>
          <div className={styles.chartInfo}>
            <div>آپ تایم ماهیانه</div>
            <div>{this.props.server.monthlyUpTime} %</div>
          </div>
        </Col>
        <Col
          md={4}
          lg={2}
          className="d-flex flex-column justify-content-center"
        >
          <Row className={styles.specificationRow}>
            <Col xs={6}>نوع:</Col>
            <Col xs={6}>{this.props.server.type}</Col>
          </Row>
          <Row className={styles.specificationRow}>
            <Col xs={6}>فرکانس:</Col>
            <Col xs={6}>{this.props.server.frequency}s</Col>
          </Row>
          <Row className={styles.specificationRow}>
            <Col xs={6}>نوع:</Col>
            <Col xs={6}>{this.props.server.type}</Col>
          </Row>
          <Row className={styles.specificationRow}>
            <Col xs={6}>فرکانس:</Col>
            <Col xs={6}>{this.props.server.frequency}s</Col>
          </Row>
        </Col>
        <Col
          md={8}
          lg={5}
          className="d-flex justify-content-center justify-content-lg-end"
        >
          <div className={styles.upTimeMonthly}>
            <h3>آپ تایم یک ماه اخیر</h3>
            <div className={styles.lastAndFistTime}>
              <div>
                {moment(this.props.server.monthly[0].time)
                  .locale('fa')
                  .format('D MMM')}
              </div>
              <div>
                {moment(
                  this.props.server.monthly[
                    this.props.server.monthly.length - 1
                  ].time
                )
                  .locale('fa')
                  .format('D MMM')}
              </div>
            </div>
            <div className={styles.btns}>
              {this.props.server.monthly.map((a, index) => (
                <Button
                  key={index}
                  className={classNames({
                    [styles.statusBtn]: true,
                    [styles.up]: a.status === 'up',
                    [styles.down]: a.status === 'down',
                    [styles.warn]: a.status === 'warn',
                  })}
                ></Button>
              ))}
            </div>
            <div className={styles.lastCheck}>
              <div>
                <i className="fas fa-sync-alt"></i>
                <span>آخرین بررسی:</span>
                <span>
                  {moment(new Date().getTime()).locale('fa').format('LT:S')}
                </span>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    );
  }
}

export default ServerStatusCard;

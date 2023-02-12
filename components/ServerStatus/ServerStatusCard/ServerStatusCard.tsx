import * as React from 'react';
import { Row, Col, OverlayTrigger, Button, Tooltip } from 'react-bootstrap';
import styles from './ServerStatusCard.module.scss';
import { Doughnut } from 'react-chartjs-2';
import classNames from 'classnames';
import moment from 'jalali-moment';
import { IServerStatus } from '../../../pages/server-status';

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

enum Status {
  ACTIVE = 1,
  DEACTIVE = 2,
}

interface IProps {
  server: IServerStatus;
}

class ServerStatusCard extends React.Component<IProps> {
  render() {
    return (
      <Row className={styles.row}>
        <Col md={4} lg={2}>
          <div>
            <div className={styles.serverTitle}>
              <span className={styles.iconWrapper}>
                {this.props.server.status === Status.ACTIVE ? (
                  <i className={styles.up + ' fas fa-arrow-alt-circle-up'}></i>
                ) : (
                  <i
                    className={styles.down + ' fas fa-arrow-alt-circle-down'}
                  ></i>
                )}
              </span>
              <span className={styles.title}>{this.props.server.title}</span>
            </div>
            <div className={styles.serverLink}>
              {this.props.server.hostname}
            </div>
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
                      100 - this.props.server.uptime,
                      this.props.server.uptime,
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
            <div>{this.props.server.uptime} %</div>
          </div>
        </Col>
        <Col
          md={4}
          lg={2}
          className="d-flex flex-column justify-content-center"
        >
          <Row className={styles.specificationRow}>
            <Col xs={6}>نوع:</Col>
            <Col xs={6}>HTTP</Col>
          </Row>
          <Row className={styles.specificationRow}>
            <Col xs={6}>فرکانس:</Col>
            <Col xs={6}>60s</Col>
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
                {moment(this.props.server.update_at * 1000)
                  .subtract(29, 'days')
                  .locale('fa')
                  .format('D MMM')}
              </div>
              <div>
                {moment(this.props.server.update_at * 1000)
                  .locale('fa')
                  .format('D MMM')}
              </div>
            </div>
            <div className={styles.btns}>
              {this.props.server.uptimes.length > 0 ? (
                this.props.server.uptimes.map((uptime, index) => (
                  <OverlayTrigger
                    key={index}
                    placement="top"
                    overlay={
                      <Tooltip
                        className={styles.tooltip}
                        id={`tooltip-${index}`}
                      >
                        <div>
                          {moment(this.props.server.update_at * 1000)
                            .subtract(index, 'days')
                            .locale('fa')
                            .format('l')}
                        </div>
                        <div>UpTime: {uptime}%</div>
                      </Tooltip>
                    }
                  >
                    {uptime && (
                      <Button
                        className={classNames({
                          [styles.statusBtn]: true,
                          [styles.up]: uptime >= 90,
                          [styles.down]: uptime < 90 && uptime >= 70,
                          [styles.warn]: uptime < 70,
                        })}
                      ></Button>
                    )}
                  </OverlayTrigger>
                ))
              ) : (
                <div className={styles.notInfo}>
                  .اطلاعاتی از این سرور موجود نمی‌باشد
                </div>
              )}
            </div>
            <div className={styles.lastCheck}>
              <div>
                <i className="fas fa-sync-alt"></i>
                <span>آخرین بررسی:</span>
                <span>
                  {moment(this.props.server.update_at)
                    .locale('fa')
                    .format('LT:S')}
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

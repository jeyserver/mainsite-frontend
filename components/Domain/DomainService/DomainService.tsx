import classNames from 'classnames';
import moment from 'jalali-moment';
import * as React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { IOptions } from '../../../pages/domain';
import styles from './DomainService.module.scss';

interface IProps {
  totalDomainRegistered: number;
  supportedTlds: number;
  options: IOptions;
}

class DomainService extends React.Component<IProps> {
  render() {
    return (
      <section className={classNames(styles.bgService, 'mt-4')}>
        <Container>
          <Row>
            <Col lg={4} className="text-center">
              <img src="/images/domain/domainIcon.png" alt="domain" />
              <div className={styles.card}>
                <div className={styles.cardBody}>
                  <h5 className={styles.cardTitle}>دامنه های ثبت شده</h5>
                  <h4 className={styles.servicePropertiesNumber}>
                    +{this.props.totalDomainRegistered}
                  </h4>
                </div>
              </div>
            </Col>
            <Col lg={4} className="text-center">
              <img src="/images/domain/hosting.png" alt="hosting" />
              <div className={styles.card}>
                <div className={styles.cardBody}>
                  <h5 className={styles.cardTitle}>پسوند های پشتیبانی شده</h5>
                  <h4 className={styles.servicePropertiesNumber}>
                    +{this.props.supportedTlds}
                  </h4>
                </div>
              </div>
            </Col>
            <Col lg={4} className="text-center">
              <img src="/images/domain/client.png" alt="client" />
              <div className={styles.card}>
                <div className={styles.cardBody}>
                  <h5 className={styles.cardTitle}>سابقه ثبت دامنه</h5>
                  <h4 className={styles.servicePropertiesNumber}>
                    بیش از{' '}
                    {moment().diff(
                      moment(this.props.options.start_time * 1000),
                      'years'
                    )}{' '}
                    سال
                  </h4>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}

export default DomainService;

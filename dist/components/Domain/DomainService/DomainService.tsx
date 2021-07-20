import classNames from 'classnames';
import moment from 'jalali-moment';
import * as React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './DomainService.module.scss';

export interface DomainServiceProps {
  domainsData: {
    status: boolean;
    items: {
      id: number;
      tld: string;
      new: number;
      renew: number;
      transfer: number;
    }[];
  };
  service: any;
}

export interface DomainServiceState {}

class DomainService extends React.Component<
  DomainServiceProps,
  DomainServiceState
> {
  constructor(props: DomainServiceProps) {
    super(props);
    this.state = {};
  }
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
                    +{this.props.service.registeredDomains}
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
                    +{this.props.domainsData.items.length}
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
                      moment(this.props.service.domainRegistrationHistory),
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

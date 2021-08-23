import Link from 'next/link';
import * as React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { formatPrice } from '../helper/formatPrice';
import PagesHeader from '../PagesHeader/PagesHeader';
import { renderPageInfo } from './helper/renderPageInfo';
import { renderPageTitle } from './helper/renderPageTitle';
import styles from './License.module.scss';

export interface LicenseProps {
  license: 'directadmin' | 'cpanel' | 'litespeed' | 'whmcs' | 'cloudlinux';
  plans: any;
}

export interface LicenseState {}

class License extends React.Component<LicenseProps, LicenseState> {
  constructor(props: LicenseProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <section>
        <PagesHeader title={`لایسنس ${renderPageTitle(this.props.license)}`} />

        <div className={styles.mainContent}>
          <Container>
            <div>
              <div className={styles.licenseInfo}>
                {renderPageInfo(this.props.license)}
              </div>

              {this.props.plans.map((plan) => (
                <div key={plan.id} className={styles.plan}>
                  <div className={styles.palnTitle}>
                    <h5>{plan.title}</h5>
                  </div>
                  <Row>
                    <Col md={8}>
                      <p className={styles.info}>{plan.info}</p>
                    </Col>
                    <Col md={4}>
                      <ul className={styles.options}>
                        {plan.options.map((option) => (
                          <li key={option}>
                            <i className="fas fa-check"></i>
                            {option}
                          </li>
                        ))}
                        <li>
                          <i className="fas fa-check"></i>
                          {formatPrice(plan.price)} {plan.currency.title} /
                          ماهیانه
                        </li>
                        <li>
                          <Link href={`/order/licenses/${plan.id}`}>
                            <a className={styles.orderLink}>سفارش</a>
                          </Link>
                        </li>
                      </ul>
                    </Col>
                  </Row>
                </div>
              ))}
            </div>
          </Container>
        </div>
      </section>
    );
  }
}

export default License;

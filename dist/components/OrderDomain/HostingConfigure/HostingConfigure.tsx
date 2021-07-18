import * as React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import { Container, Row, Col, Form } from 'react-bootstrap';
import CountryFlagTooltip from '../../helper/components/CountryFlagTooltip';
import { formatPrice } from '../../helper/formatPrice';
import PagesHeader from '../../PagesHeader/PagesHeader';
import OrderSteps from '../OrderSteps';
import router, { NextRouter, withRouter } from 'next/router';
import styles from './HostingConfigure.module.scss';

export interface HostingConfigureProps {
  hostingCartItems: any;
  router: NextRouter;
}

export interface HostingConfigureState {}

class HostingConfigure extends React.Component<
  HostingConfigureProps,
  HostingConfigureState
> {
  constructor(props: HostingConfigureProps) {
    super(props);
    this.state = {};
  }

  restart() {
    router.push('/');
  }

  goToNextStep() {
    // push to next step
    // router.push('/');
  }

  render() {
    return (
      <section className="section">
        <PagesHeader title="پیکربندی هاست" />

        <div className={styles.mainContent}>
          <Container>
            <Row>
              <Col md={3}>
                <OrderSteps step="configuration" />
              </Col>

              <Col md={9}>
                <div className={styles.left}>
                  <h2 className={styles.pageTitle}>پیکره بندی هاست</h2>
                  <p className={styles.pageInfo}>
                    در کادر زیر شما باید دامنه متعلق به هاست را انتخاب کنید
                  </p>
                  <Form autoComplete="off">
                    <Row>
                      <Col xs={12}>
                        <Table responsive className={styles.table}>
                          <thead>
                            <tr>
                              <th>هاست</th>
                              <th />
                              <th>دامنه ها</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.props.hostingCartItems.map((cartItem) => {
                              return (
                                <tr>
                                  <td>
                                    <CountryFlagTooltip
                                      name={cartItem.country}
                                      flag={{
                                        address: cartItem.flag,
                                        width: 24,
                                        height: 24,
                                      }}
                                    />
                                    <span className={styles.cartItemTitle}>
                                      {cartItem.title}
                                    </span>
                                  </td>
                                  <td>
                                    <Form.Group>
                                      <Form.Control as="select" custom>
                                        {cartItem.periods.map((period) => (
                                          <option
                                            value={period.id}
                                            key={period.id}
                                          >
                                            برای{' '}
                                            {period.month
                                              ? period.month
                                              : period.year}{' '}
                                            {period.month ? 'ماه' : 'سال'}{' '}
                                            قیمت:‌ {formatPrice(period.price)}{' '}
                                            {cartItem.currency.title}
                                          </option>
                                        ))}
                                      </Form.Control>
                                    </Form.Group>{' '}
                                  </td>
                                  <td>
                                    <Form.Group>
                                      <Form.Control
                                        as="select"
                                        custom
                                        className={styles.domainSelect}
                                      >
                                        {cartItem.domains.map((domain) => (
                                          <option
                                            value={domain.id}
                                            key={domain.id}
                                          >
                                            {domain.name}.{domain.tld}
                                          </option>
                                        ))}
                                      </Form.Control>
                                    </Form.Group>{' '}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </Table>
                      </Col>
                    </Row>

                    <Row className="justify-content-center">
                      <Col md={6}>
                        <div className={styles.btns}>
                          <Button
                            variant="success"
                            className={styles.continueBtn}
                            onClick={this.goToNextStep}
                          >
                            ادامه
                          </Button>
                          <Button
                            className={styles.restartBtn}
                            onClick={this.restart}
                          >
                            شروع دوباره
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Form>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </section>
    );
  }
}

export default withRouter(HostingConfigure);

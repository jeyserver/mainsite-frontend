import * as React from 'react';
import { Container, Row, Col, Button, Table, FormGroup } from 'react-bootstrap';
import CountryFlagTooltip from '../../../../helper/components/CountryFlagTooltip/CountryFlagTooltip';
import PagesHeader from '../../../PagesHeader/PagesHeader';
import OrderSteps from '../OrderSteps';
import { NextRouter, withRouter } from 'next/router';
import styles from './HostingConfigure.module.scss';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import { NotificationManager } from 'react-notifications';
import {
  configureHosting,
  deleteAll,
  IConfigureHosting,
} from '../../../../store/Cart';
import { AsyncThunkAction, RootState } from '../../../../store';
import IDomainProduct from '../../../../helper/types/cart/domain';
import IHostProduct from '../../../../helper/types/cart/host';
import { formatPriceWithCurrency } from '../../../../store/Currencies';
import { connect } from 'react-redux';

interface IProps {
  hosts: IHostProduct[];
  domains: IDomainProduct[];
  router: NextRouter;
  configureHosting: AsyncThunkAction<any, IConfigureHosting>;
  deleteAll: AsyncThunkAction<any, {}>;
  currencies: RootState['currencies'];
}

interface IInputs {
  period: string[];
  primary_domain: string[];
}

class HostingConfigure extends React.Component<IProps> {
  async onSubmit(values: IInputs, { setSubmitting }: FormikHelpers<IInputs>) {
    try {
      const res = this.props
        .configureHosting({
          period: values.period,
          primary_domain: values.primary_domain,
        })
        .unwrap();
    } catch (error) {
      NotificationManager.error(
        'ارتباط با سامانه بدرستی انجام نشد، لطفا مجددا تلاش کنید.',
        'خطا'
      );
    } finally {
      setSubmitting(false);
    }
  }

  async clearCart() {
    this.setState({ clearCartLoading: true });
    try {
      await this.props.deleteAll({});
    } catch (error) {
      NotificationManager.error(
        'ارتباط با سامانه بدرستی انجام نشد، لطفا مجددا تلاش کنید.',
        'خطا'
      );
    } finally {
      this.setState({ clearCartLoading: false });
    }
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
                  <Formik
                    initialValues={{ period: [], primary_domain: [] }}
                    onSubmit={(values, helpers) =>
                      this.onSubmit(values, helpers)
                    }
                  >
                    {(formik) => (
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
                                {this.props.hosts.map((product) => {
                                  return (
                                    <tr key={product.id}>
                                      <td>
                                        <CountryFlagTooltip
                                          country={product.plan.country}
                                        />
                                        <span className={styles.productTitle}>
                                          {product.plan.title}
                                        </span>
                                      </td>
                                      <td>
                                        <FormGroup>
                                          <Field
                                            as="select"
                                            name={`period[${product.id}]`}
                                            custom
                                          >
                                            <option value="1">
                                              برای 1 ماه قیمت{' '}
                                              {formatPriceWithCurrency(
                                                this.props.currencies,
                                                product.currency,
                                                product.price
                                              )}
                                            </option>
                                          </Field>
                                        </FormGroup>{' '}
                                      </td>
                                      <td>
                                        <FormGroup>
                                          <Field
                                            as="select"
                                            custom
                                            className={styles.domainSelect}
                                            name={`primary_domain[${product.id}]`}
                                          >
                                            {this.props.domains.map(
                                              (domain) => (
                                                <option
                                                  value={domain.id}
                                                  key={domain.id}
                                                >
                                                  {domain.domain}.
                                                  {domain.tld.tld}
                                                </option>
                                              )
                                            )}
                                          </Field>
                                        </FormGroup>{' '}
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
                                type="submit"
                                className={styles.continueBtn}
                              >
                                ادامه
                              </Button>
                              <Button
                                type="button"
                                className={styles.restartBtn}
                                onClick={this.clearCart}
                              >
                                شروع دوباره
                              </Button>
                            </div>
                          </Col>
                        </Row>
                      </Form>
                    )}
                  </Formik>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </section>
    );
  }
}

export default connect(
  (state: RootState) => {
    return {
      currencies: state.currencies,
    };
  },
  { configureHosting, deleteAll }
)(withRouter(HostingConfigure));

import * as React from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Table,
  Form,
  Spinner,
} from 'react-bootstrap';
import CountryFlagTooltip from '../../../../helper/components/CountryFlagTooltip/CountryFlagTooltip';
import PagesHeader from '../../../PagesHeader/PagesHeader';
import OrderSteps from '../OrderSteps';
import { NextRouter, withRouter } from 'next/router';
import styles from './HostingConfigure.module.scss';
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
import IError from '../../../../helper/types/base/error';
import showErrorMsg from '../../../../helper/showErrorMsg';
import FormErrorMessage from '../../../../helper/components/FormErrorMessage';

interface IProps {
  hosts: IHostProduct[];
  domains: IDomainProduct[];
  router: NextRouter;
  configureHosting: AsyncThunkAction<any, IConfigureHosting>;
  deleteAll: AsyncThunkAction<any, {}>;
  currencies: RootState['currencies'];
}

interface IState {
  formIsValidated: boolean;
  formIsSubmitting: boolean;
  clearCartLoading: boolean;
  errors: IError[];
}

class HostingConfigure extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      formIsValidated: false,
      formIsSubmitting: false,
      clearCartLoading: false,
      errors: [],
    };
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

  async onSubmitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    this.setState({ formIsSubmitting: true });

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      try {
        const inputs = Array.from(form.elements) as HTMLInputElement[];
        const values = inputs.reduce((prev, cur) => {
          if (cur.nodeName !== 'BUTTON') {
            return {
              ...prev,
              [cur.name]: cur.value,
            };
          }
          return prev;
        }, {});

        const res = await this.props.configureHosting(values).unwrap();
        if (res.data.status) {
          if (res.data.redirect) {
            this.props.router.push(res.data.redirect);
          }
        } else {
          if (res.data.error) {
            this.setState({ errors: res.data.error });
            res.data.error.map((error) => {
              form[error.input].value = '';
            });
          }

          this.setState({ formIsValidated: false });
        }
      } catch (error) {
        NotificationManager.error(
          'ارتباط با سامانه بدرستی انجام نشد، لطفا مجددا تلاش کنید.',
          'خطا'
        );
      }
    }

    this.setState({ formIsValidated: true, formIsSubmitting: false });
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
                  <Form
                    autoComplete="off"
                    onSubmit={(e) => this.onSubmitForm(e)}
                    validated={this.state.formIsValidated}
                    noValidate
                  >
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
                                    <Form.Group>
                                      <Form.Control
                                        as="select"
                                        name={`period[${product.id}]`}
                                        required
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
                                      </Form.Control>
                                      <FormErrorMessage
                                        input={`period[${product.id}]`}
                                        errors={this.state.errors}
                                      />
                                    </Form.Group>{' '}
                                  </td>
                                  <td>
                                    <Form.Group>
                                      <Form.Control
                                        as="select"
                                        custom
                                        className={styles.domainSelect}
                                        name={`primary_domain[${product.id}]`}
                                        required
                                      >
                                        {this.props.domains.map((domain) => (
                                          <option
                                            value={domain.id}
                                            key={domain.id}
                                          >
                                            {domain.domain}.{domain.tld.tld}
                                          </option>
                                        ))}
                                      </Form.Control>
                                    </Form.Group>{' '}
                                    <FormErrorMessage
                                      input={`primary_domain[${product.id}]`}
                                      errors={this.state.errors}
                                    />
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
                            disabled={this.state.formIsSubmitting}
                          >
                            {this.state.formIsSubmitting ? (
                              <Spinner size="sm" animation="border" />
                            ) : (
                              'ادامه'
                            )}
                          </Button>
                          <Button
                            type="button"
                            className={styles.restartBtn}
                            onClick={this.clearCart}
                            disabled={this.state.clearCartLoading}
                          >
                            {this.state.clearCartLoading ? (
                              <Spinner size="sm" animation="border" />
                            ) : (
                              'شروع دوباره'
                            )}
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

export default connect(
  (state: RootState) => {
    return {
      currencies: state.currencies,
    };
  },
  { configureHosting, deleteAll }
)(withRouter(HostingConfigure));

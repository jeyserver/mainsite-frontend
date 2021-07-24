import axios from 'axios';
import * as React from 'react';
import { Col, Container, Form, Row, Spinner, Table } from 'react-bootstrap';
import { formatPrice } from '../helper/formatPrice';
import OrderSteps from '../OrderSteps';
import PagesHeader from '../PagesHeader/PagesHeader';
import styles from './OrderLicense.module.scss';
import { NotificationManager } from 'react-notifications';
import { NextRouter, withRouter } from 'next/router';
import { connect } from 'react-redux';
import { addToCart } from '../../redux/actions';

type error = 'data_validation' | 'data_duplicate';

const showError = (errorMsg: error) => {
  if (errorMsg === 'data_duplicate') {
    return 'داده وارد شده تکراری است';
  } else if (errorMsg === 'data_validation') {
    return 'داده وارد شده معتبر نیست';
  }
};

export interface OrderLicenseProps {
  license: any;
  router: NextRouter;
  addToCart: (products: any) => void;
}

export interface OrderLicenseState {
  formIsValidated: boolean;
  ipError: error;
  btnLoading: boolean;
}

class OrderLicense extends React.Component<
  OrderLicenseProps,
  OrderLicenseState
> {
  constructor(props: OrderLicenseProps) {
    super(props);
    this.state = {
      formIsValidated: false,
      ipError: 'data_validation',
      btnLoading: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      this.setState({ btnLoading: true });

      axios
        .get(
          `https://jsonblob.com/api/jsonBlob/57cf67c8-eb0b-11eb-8813-cda002dae790`
          // {
          //   period: form.period.value,
          //   os: form.os.value,
          //   hostname: form.hostname.value,
          //   ip: form.ip.value,
          // }
        )
        .then((respone) => {
          this.props.router.push('/order/cart/review');
          this.setState({ btnLoading: false });

          // this.props.addToCart()

          // if (respone.data.status) {
          //   this.setState({ formIsValidated: false, btnLoading: false });
          //   this.props.router.push('/order/cart/review');
          // } else if (!respone.data.status) {
          //   respone.data.error.forEach((errorItem) => {
          //     if (errorItem.input === 'ip') {
          //       form.ip.value = '';
          //       this.setState({ ipError: errorItem.code });
          //     }
          //   });
          //   this.setState({ btnLoading: false });
          // }
        })
        .catch((error) => {
          this.setState({ btnLoading: false });
          NotificationManager.error(
            'ارتباط با سامانه بدرستی انجام نشد، لطفا مجددا تلاش کنید.',
            'خطا'
          );
        });
    }

    this.setState({ formIsValidated: true });
  }

  render() {
    return (
      <section>
        <PagesHeader title={`پیکربندی لایسنس ${this.props.license.title}`} />

        <div className={styles.mainContent}>
          <Container>
            <Row>
              <Col md={3}>
                <OrderSteps step="configuration" />
              </Col>
              <Col md={9} className={styles.order}>
                <h2 className={styles.title}>{this.props.license.title}</h2>
                <Row>
                  <Col md={4}>
                    <p> هزینه راه‌اندازی اولیه </p>
                  </Col>
                  <Col md={8}>
                    <p>
                      {formatPrice(this.props.license.periods[0].price)}{' '}
                      {this.props.license.currency.title}
                    </p>
                  </Col>
                </Row>
                <p className={styles.needInfo}>
                  <strong>اطلاعات لازم</strong>
                </p>
                <p className={styles.needInfoTxt}>
                  این سرویس/محصول نیاز به بعضی اطلاعات اضافی از شما دارد تا ما
                  بتوانیم پروسه ی سفارش شما را تکمیل نماییم
                </p>
                <Form
                  onSubmit={this.onSubmit}
                  validated={this.state.formIsValidated}
                  noValidate
                >
                  <div>
                    <Table responsive className={styles.table}>
                      <tbody>
                        <tr>
                          <td>
                            <p>دوره پرداخت: </p>
                          </td>
                          <td>
                            <div className="form-group">
                              <Form.Control as="select" name="period" custom>
                                {this.props.license.periods.map((period) => (
                                  <option
                                    value={period.month}
                                    key={period.month}
                                  >
                                    {period.month} ماه قیمت{' '}
                                    {formatPrice(period.price)}{' '}
                                    {this.props.license.currency.title}
                                  </option>
                                ))}
                              </Form.Control>
                            </div>{' '}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p>سیستم عامل</p>
                          </td>
                          <td>
                            <div className="form-group">
                              <Form.Control as="select" name="os" custom>
                                {this.props.license.oses.map((os) => (
                                  <option value={os} key={os}>
                                    {os}
                                  </option>
                                ))}
                              </Form.Control>
                            </div>{' '}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p>نام هاست</p>
                          </td>
                          <td>
                            <Form.Group>
                              <Form.Control
                                type="text"
                                name="hostname"
                                className="ltr"
                              />
                            </Form.Group>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p>آي پي</p>
                          </td>
                          <td>
                            <Form.Group>
                              <Form.Control
                                type="text"
                                name="ip"
                                className="ltr"
                                required
                              />
                              <Form.Control.Feedback type="invalid">
                                {showError(this.state.ipError)}
                              </Form.Control.Feedback>
                            </Form.Group>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                  <Row className="justify-content-center">
                    <Col md={6}>
                      <button
                        className={styles.submitFormBtn}
                        disabled={this.state.btnLoading}
                        type="submit"
                      >
                        {this.state.btnLoading ? (
                          <>
                            <Spinner animation="border" size="sm" />
                            <span>لطفا صبر کنید</span>
                          </>
                        ) : (
                          'ادامه'
                        )}
                      </button>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
      </section>
    );
  }
}

export default connect(null, { addToCart })(withRouter(OrderLicense));

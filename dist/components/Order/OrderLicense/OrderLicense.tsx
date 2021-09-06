import * as React from 'react';
import { Col, Container, Row, Spinner, Table } from 'react-bootstrap';
import OrderSteps from '../../Jobs/OrderSteps';
import PagesHeader from '../../PagesHeader/PagesHeader';
import styles from './OrderLicense.module.scss';
import { NotificationManager } from 'react-notifications';
import { NextRouter, withRouter } from 'next/router';
import { connect } from 'react-redux';
import { Formik, FormikHelpers, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { formatPriceWithCurrency } from '../../../store/Currencies';
import { RootState } from '../../../store';
import ILicense from '../../../helper/types/products/License/plan';
import backend from '../../../axios-config';
import showErrorMsg from '../../../helper/showErrorMsg';
import { setItems as setCartItems } from '../../../store/Cart';
import { nanoid } from '@reduxjs/toolkit';

interface IProps {
  plan: ILicense;
  router: NextRouter;
  currencies: RootState['currencies'];
  setCartItems: typeof setCartItems;
}

interface IInputs {
  period: string;
  hostname: string;
  ip: string;
  os: string;
}

class OrderLicense extends React.Component<IProps> {
  onSubmit(
    values: IInputs,
    { setSubmitting, setErrors }: FormikHelpers<IInputs>
  ) {
    const os = this.props.plan.registrar === 1 && `&os=${values.os}`;
    const fakeProduct = {
      id: nanoid(),
      price: 2.97,
      discount: 0,
      number: 1,
      currency: this.props.plan.currency,
      product: 'license',
      plan: this.props.plan,
    };

    backend
      .post(
        `/order/licenses/${this.props.plan.id}?ajax=1&period=${values.period}&hostname=${values.hostname}&ip=${values.ip}${os}`
      )
      .then((res) => {
        if (res.data.status) {
          this.props.setCartItems([fakeProduct]);
          this.props.router.push('/order/cart/review');
        } else {
          res.data.error.map((error) => {
            setErrors({ [error.input]: showErrorMsg(error.code) });
          });
        }
      })
      .catch((err) => {
        NotificationManager.error(
          'ارتباط با سامانه بدرستی انجام نشد، لطفا مجددا تلاش کنید.',
          'خطا'
        );
      })
      .finally(() => {
        setSubmitting(false);
      });
  }

  render() {
    return (
      <section>
        <PagesHeader title={`پیکربندی لایسنس ${this.props.plan.title}`} />

        <div className={styles.mainContent}>
          <Container>
            <Row>
              <Col md={3}>
                <OrderSteps step="configuration" />
              </Col>
              <Col md={9} className={styles.order}>
                <h2 className={styles.title}>{this.props.plan.title}</h2>
                {this.props.plan.setup !== 0 && (
                  <Row>
                    <Col md={4}>
                      <p> هزینه راه‌اندازی اولیه </p>
                    </Col>
                    <Col md={8}>
                      <p>
                        {formatPriceWithCurrency(
                          this.props.currencies,
                          this.props.plan.currency,
                          this.props.plan.setup
                        )}
                      </p>
                    </Col>
                  </Row>
                )}

                <p className={styles.needInfo}>
                  <strong>اطلاعات لازم</strong>
                </p>
                <p className={styles.needInfoTxt}>
                  این سرویس/محصول نیاز به بعضی اطلاعات اضافی از شما دارد تا ما
                  بتوانیم پروسه ی سفارش شما را تکمیل نماییم
                </p>
                <Formik
                  initialValues={{
                    period: '1',
                    os: '1',
                    hostname: '',
                    ip: '',
                  }}
                  validationSchema={Yup.object({
                    period: Yup.string().required('داده وارد شده معتبر نیست'),
                    os: Yup.string().required('داده وارد شده معتبر نیست'),
                    hostname: Yup.string().required('داده وارد شده معتبر نیست'),
                    ip: Yup.string().required('داده وارد شده معتبر نیست'),
                  })}
                  onSubmit={(values, helpers) => this.onSubmit(values, helpers)}
                >
                  {(formik) => (
                    <Form>
                      <div>
                        <Table responsive className={styles.table}>
                          <tbody>
                            <tr>
                              <td>
                                <p>دوره پرداخت: </p>
                              </td>
                              <td>
                                <div className="form-group">
                                  <Field
                                    as="select"
                                    name="period"
                                    className="form-control"
                                  >
                                    {Array(12)
                                      .fill('')
                                      .map((value, index) => (
                                        <option value={index + 1} key={index}>
                                          {index + 1} ماه قیمت{' '}
                                          {formatPriceWithCurrency(
                                            this.props.currencies,
                                            this.props.plan.currency,
                                            this.props.plan.price * (index + 1)
                                          )}
                                        </option>
                                      ))}
                                  </Field>
                                  <div className="form-err-msg">
                                    <ErrorMessage name="period" />
                                  </div>
                                </div>{' '}
                              </td>
                            </tr>
                            {/* Direct Admin */}
                            {this.props.plan.registrar === 1 && (
                              <tr>
                                <td>
                                  <p>سیستم عامل</p>
                                </td>
                                <td>
                                  <div className="form-group">
                                    <Field
                                      name="os"
                                      as="select"
                                      className="form-control"
                                    >
                                      <option value="1">
                                        Centos 6.6 minimal 64bit
                                      </option>
                                      <option value="2">
                                        Centos 6.6 minimal 32bit
                                      </option>
                                      <option value="3">
                                        Centos 7 minimal 64bit
                                      </option>
                                      <option value="4">
                                        Debian 7.8 LAMP 64bit
                                      </option>
                                      <option value="5">
                                        Debian 7.8 minimal 32bit
                                      </option>
                                      <option value="6">
                                        Debian 7.8 minimal 64bit
                                      </option>
                                      <option value="7">
                                        openSUSE 13.2 minimal 64bit
                                      </option>
                                      <option value="8">
                                        Ubuntu 14.04 LTS minimal 32bit
                                      </option>
                                      <option value="9">
                                        Ubuntu 14.04 LTS minimal 64bit
                                      </option>
                                      <option value="10">
                                        Ubuntu 14.04.1 LTS minimal 64bit
                                      </option>
                                      <option value="11">
                                        Ubuntu 14.10 minimal 64bit
                                      </option>
                                      <option value="12">
                                        Ubuntu 12.04 LTS minimal 32bit
                                      </option>
                                      <option value="13">
                                        Ubuntu 12.04 LTS minimal 64bit
                                      </option>
                                      <option value="18">
                                        Ubuntu 14.04.3 LTS minimal 64bit
                                      </option>
                                      <option value="19">
                                        Ubuntu 20.04 LTS minimal 64bit
                                      </option>
                                    </Field>
                                    <div className="form-err-msg">
                                      <ErrorMessage name="os" />
                                    </div>
                                  </div>{' '}
                                </td>
                              </tr>
                            )}
                            <tr>
                              <td>
                                <p>نام هاست</p>
                              </td>
                              <td>
                                <div className="form-group">
                                  <Field
                                    type="text"
                                    name="hostname"
                                    className="form-control ltr"
                                  />
                                  <div className="form-err-msg">
                                    <ErrorMessage name="hostname" />
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p>آي پي</p>
                              </td>
                              <td>
                                <div className="form-group">
                                  <Field
                                    type="text"
                                    name="ip"
                                    className="form-control ltr"
                                  />
                                  <div className="form-err-msg">
                                    <ErrorMessage name="ip" />
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                      <Row className="justify-content-center">
                        <Col md={6}>
                          <button
                            className={styles.submitFormBtn}
                            disabled={formik.isSubmitting}
                            type="submit"
                          >
                            {formik.isSubmitting ? (
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
                  )}
                </Formik>
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
    return { currencies: state.currencies };
  },
  { setCartItems }
)(withRouter(OrderLicense));

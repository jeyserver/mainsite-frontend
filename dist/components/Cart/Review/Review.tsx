import * as React from 'react';
import {
  Container,
  Row,
  Col,
  FormGroup,
  FormLabel,
  Spinner,
  Table,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { formatPrice } from '../../helper/formatPrice';
import Link from 'next/link';
import PagesHeader from '../../PagesHeader/PagesHeader';
import OrderSteps from '../OrderSteps/OrderSteps';
import HostRow from './HostRow/HostRow';
import DedicatedServerRow from './DedicatedServerRow/DedicatedServerRow';
import DomainRow from './DomainRow/DomainRow';
import LicenseRow from './LicenseRow/LicenseRow';
import styles from './Review.module.scss';
import VpsRow from './VpsRow/VpsRow';
import { NextRouter, withRouter } from 'next/dist/client/router';
import { AsyncThunkAction, RootState } from '../../../store';
import { deleteAll, setDiscount } from '../../../store/Cart';
import { NotificationManager } from 'react-notifications';
import { ErrorMessage, Field, Formik, FormikHelpers, Form } from 'formik';
import { priceInActiveCurrency } from '../../../store/Currencies';

interface IProps {
  deleteAll: AsyncThunkAction<any, any>;
  setDiscount: AsyncThunkAction<any, string>;
  router: NextRouter;
  cart: RootState['cart'];
  currencies: RootState['currencies'];
}

interface ReviewState {
  setDiscountLoading: boolean;
  clearCartLoading: boolean;
}

class Review extends React.Component<IProps, ReviewState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      setDiscountLoading: false,
      clearCartLoading: false,
    };
  }

  componentDidUpdate() {
    if (this.props.cart.items.length === 0) {
      this.props.router.push('/');
    }
  }

  async onSubmitDisountCode(
    values: { code: string },
    { setSubmitting }: FormikHelpers<{ code: string }>
  ) {
    this.setState({ setDiscountLoading: true });
    try {
      const res = await this.props.setDiscount(values.code);
      if (!res.status && res.error[0].input === 'code') {
        NotificationManager.error('متاسفانه کد وارد شده صحیح نمی‌باشد', 'خطا');
      }
    } catch (error) {
      NotificationManager.error(
        'ارتباط با سامانه بدرستی انجام نشد، لطفا مجددا تلاش کنید.',
        'خطا'
      );
    } finally {
      this.setState({ setDiscountLoading: false });
    }
  }

  async clearCart() {
    this.setState({ clearCartLoading: true });
    try {
      await this.props.deleteAll({}).unwrap();
      this.props.router.push('/');
    } catch (error) {
      NotificationManager.error(
        'ارتباط با سامانه بدرستی انجام نشد، لطفا مجددا تلاش کنید.',
        'خطا'
      );
    } finally {
      this.setState({ clearCartLoading: false });
    }
  }

  renderRow(row, data) {
    switch (row) {
      case 'license':
        return <LicenseRow data={data} />;
      case 'host':
        return <HostRow data={data} />;
      case 'server_dedicated':
        return <DedicatedServerRow data={data} />;
      case 'server_vps':
        return <VpsRow data={data} />;
      case 'domain':
        return <DomainRow data={data} />;
      default:
        return null;
    }
  }

  render() {
    const totalCost = this.props.cart.items.reduce(
      (accumulator, currentValue) =>
        (accumulator += priceInActiveCurrency(
          this.props.currencies,
          currentValue.currency,
          currentValue.price
        )),
      0
    );

    const totalDiscount =
      this.props.cart.items.reduce((accumulator, currentValue) => {
        if (currentValue.discount !== 0) {
          return (accumulator += currentValue.discount);
        } else {
          return (accumulator += 0);
        }
      }, 0) +
      totalCost * 0;

    return (
      <section>
        <PagesHeader title="تایید سفارش" />

        <div className={styles.mainContent}>
          <Container>
            <Row>
              <Col md={3}>
                <OrderSteps step="confirmation" />
              </Col>
              <Col md={9}>
                <div style={{ padding: '0 15px' }}>
                  <h2 className={styles.title}>تایید سفارش</h2>
                  <Table striped responsive className={styles.table}>
                    <thead>
                      <tr>
                        <th>سفارشات</th>
                        <th>توضیحات</th>
                        <th>مدت</th>
                        <th>تخفیف</th>
                        <th>قیمت</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody className="text-align">
                      {this.props.cart.items.map((cartItem) => {
                        return (
                          <tr key={cartItem.id}>
                            {this.renderRow(cartItem.product, cartItem)}
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                  <Row className="justify-content-end">
                    <Col md={8} lg={6}>
                      <ul className={styles.cartList}>
                        <li className={styles.cartListItem}>
                          <span>قیمت: </span>
                          <span>{formatPrice(totalCost)} تومان</span>
                        </li>
                        <li className={styles.cartListItem}>
                          <span>تخفیف: </span>
                          <span>{formatPrice(totalDiscount)} تومان</span>
                        </li>
                        <li className={styles.cartListItem}>
                          <span>قابل پرداخت: </span>
                          <span>
                            {formatPrice(totalCost - totalDiscount)} تومان
                          </span>
                        </li>
                      </ul>
                    </Col>
                  </Row>
                </div>
                <Row>
                  <Col xs={12} className={styles.well}>
                    <Col md={8}>
                      <Formik
                        initialValues={{ code: '' }}
                        onSubmit={(values, helpers) =>
                          this.onSubmitDisountCode(values, helpers)
                        }
                      >
                        {(formik) => (
                          <Form id="discount-form">
                            <FormGroup>
                              <FormLabel>کد تخفیف</FormLabel>
                              <Field
                                type="text"
                                name="code"
                                className="form-control"
                                disabled={
                                  !this.props.cart.has_active_discount_code
                                }
                              />
                              <div className="form-err-msg">
                                <ErrorMessage name="code" />
                              </div>
                              {/* {this.props.cart.discount.percentage !== 0 && (
                            <Form.Control.Feedback type="valid">
                              تخفیف {this.props.cart.discount.percentage} درصدی
                              کد {this.props.cart.discount.code} اعمال شد.
                            </Form.Control.Feedback>
                          )} */}
                            </FormGroup>
                          </Form>
                        )}
                      </Formik>
                    </Col>
                  </Col>
                </Row>
                <Row className="justify-content-center">
                  <Col md={6}>
                    <div className={styles.btnGroup}>
                      <Link href="/order/cart/complete">
                        <a className={styles.completeOrder}>تکمیل سفارش</a>
                      </Link>

                      <button
                        className={styles.checkDiscountCode}
                        type="submit"
                        form="discount-form"
                        disabled={!this.props.cart.has_active_discount_code}
                      >
                        {this.state.setDiscountLoading ? (
                          <Spinner animation="border" size="sm" />
                        ) : (
                          'بررسی کد تخفیف'
                        )}
                      </button>

                      <button
                        className={styles.restartOrder}
                        onClick={() => this.clearCart()}
                      >
                        {this.state.clearCartLoading ? (
                          <Spinner animation="border" size="sm" />
                        ) : (
                          'شروع دوباره'
                        )}
                      </button>
                    </div>
                  </Col>
                </Row>
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
      cart: state.cart,
      currencies: state.currencies,
    };
  },
  { deleteAll, setDiscount }
)(withRouter(Review));

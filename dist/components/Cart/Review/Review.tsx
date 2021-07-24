import * as React from 'react';
import { Form, Spinner, Table } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { formatPrice } from '../../helper/formatPrice';
import PagesHeader from '../../PagesHeader/PagesHeader';
import OrderSteps from '../OrderSteps/OrderSteps';
import BackupSpaceRow from './BackupSpaceRow/BackupSpaceRow';
import DedicatedServerRow from './DedicatedServerRow/DedicatedServerRow';
import DomainRow from './DomainRow/DomainRow';
import HostRow from './HostRow/HostRow';
import LicenseRow from './LicenseRow/LicenseRow';
import styles from './Review.module.scss';
import VpsRow from './VpsRow/VpsRow';
import { setDiscount, clearCart } from '../../../redux/actions';
import { cart } from '../../../redux/reducers/cartReducer';
import { NextRouter, withRouter } from 'next/dist/client/router';

export interface ReviewProps {
  cart: cart;
  setDiscount: (code: string) => void;
  clearCart: () => void;
  router: NextRouter;
}

export interface ReviewState {
  discountCode: string;
  isDiscountFormValidated: boolean;
}

class Review extends React.Component<ReviewProps, ReviewState> {
  constructor(props: ReviewProps) {
    super(props);
    this.state = {
      discountCode: '',
      isDiscountFormValidated: false,
    };
    this.discountOnchange = this.discountOnchange.bind(this);
    this.onSubmitDisountCode = this.onSubmitDisountCode.bind(this);
    this.clearCart = this.clearCart.bind(this);
    this.goToCompleteOrder = this.goToCompleteOrder.bind(this);
  }

  componentDidUpdate() {
    if (this.props.cart.cartItems.length === 0) {
      this.props.router.push('/');
    }
  }

  renderRow(row, data) {
    switch (row) {
      case 'license':
        return <LicenseRow data={data} />;
      case 'backup_space':
        return <BackupSpaceRow data={data} />;
      case 'dedicated_server':
        return <DedicatedServerRow data={data} />;
      case 'vps_server':
        return <VpsRow data={data} />;
      case 'domain':
        return <DomainRow data={data} />;
      case 'host':
        return <HostRow data={data} />;
      default:
        return null;
    }
  }

  discountOnchange(e) {
    this.setState({ discountCode: e.target.value });
  }

  onSubmitDisountCode(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      // go
      this.props.setDiscount(this.state.discountCode);
    }

    this.setState({ isDiscountFormValidated: true });
  }

  clearCart() {
    this.props.clearCart();
  }

  goToCompleteOrder() {
    this.props.router.push('/order/cart/complete');
  }

  render() {
    const totalCost = this.props.cart.cartItems.reduce(
      (accumulator, currentValue) => (accumulator += currentValue.price),
      0
    );

    const totalDiscount =
      this.props.cart.cartItems.reduce((accumulator, currentValue) => {
        if (currentValue.discount !== '-') {
          return (accumulator += currentValue.discount);
        } else {
          return (accumulator += 0);
        }
      }, 0) +
      totalCost * (this.props.cart.discount.percentage / 100);

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
                      {this.props.cart.cartItems.map((cartItem) => {
                        return (
                          <tr key={cartItem.id}>
                            {this.renderRow(cartItem.type, cartItem)}
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
                      <Form
                        onSubmit={this.onSubmitDisountCode}
                        noValidate
                        validated={this.state.isDiscountFormValidated}
                        id="discount-form"
                      >
                        <Form.Group>
                          <Form.Label>کد تخفیف</Form.Label>
                          <Form.Control
                            type="text"
                            onChange={this.discountOnchange}
                            value={this.state.discountCode}
                            required
                          />
                          <Form.Control.Feedback type="invalid">
                            لطفا کد تخفیف خود را وارد کنید
                          </Form.Control.Feedback>
                          {this.props.cart.discount.percentage !== 0 && (
                            <Form.Control.Feedback type="valid">
                              تخفیف {this.props.cart.discount.percentage} درصدی
                              کد {this.props.cart.discount.code} اعمال شد.
                            </Form.Control.Feedback>
                          )}
                        </Form.Group>
                      </Form>
                    </Col>
                  </Col>
                </Row>
                <Row className="justify-content-center">
                  <Col md={6}>
                    <div className={styles.btnGroup}>
                      <button
                        className={styles.completeOrder}
                        onClick={this.goToCompleteOrder}
                      >
                        تکمیل سفارش
                      </button>

                      <button
                        className={styles.checkDiscountCode}
                        disabled={this.props.cart.discount.loading}
                        type="submit"
                        form="discount-form"
                      >
                        {this.props.cart.discount.loading ? (
                          <Spinner animation="border" size="sm" />
                        ) : (
                          'بررسی کد تخفیف'
                        )}
                      </button>

                      <button
                        className={styles.restartOrder}
                        onClick={this.clearCart}
                      >
                        {this.props.cart.loading ? (
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

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};

export default connect(mapStateToProps, { setDiscount, clearCart })(
  withRouter(Review)
);

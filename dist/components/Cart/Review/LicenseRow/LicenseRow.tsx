import * as React from 'react';
import { connect } from 'react-redux';
import { deleteFromCart } from '../../../../redux/actions';
import { cart } from '../../../../redux/reducers/cartReducer';
import { Spinner } from 'react-bootstrap';
import { formatPrice } from '../../../helper/formatPrice';
import styles from '../productRow.module.scss';

export interface LicenseRowProps {
  data: any;
  deleteFromCart: (id: number) => void;
  cart: cart;
}

export interface LicenseRowState {}

class LicenseRow extends React.Component<LicenseRowProps, LicenseRowState> {
  constructor(props: LicenseRowProps) {
    super(props);
    this.state = {};
  }

  render() {
    const { id, title, period, discout, price, currency, first_month_cost } =
      this.props.data;

    return (
      <>
        <td>
          <span>لایسنس {title}</span>
        </td>
        <td className={styles.noper}>
          {first_month_cost !== '-'
            ? formatPrice(first_month_cost)
            : 'هزینه راه‌اندازی اولیه (اولین ماه)'}
        </td>
        <td>
          برای {period.value} {period.type === 'monthly' ? 'ماه' : 'سال'}{' '}
        </td>
        <td>
          {discout
            ? `${formatPrice(discout)} ${currency.title}`
            : `0 ${currency.title}`}
        </td>
        <td>
          {formatPrice(price)} {currency.title}
        </td>
        <td>
          <button
            className={styles.deleteBtn}
            onClick={() => this.props.deleteFromCart(id)}
          >
            {this.props.cart.itemsInLoading.some(
              (productId) => productId === id
            ) ? (
              <Spinner animation="border" size="sm" />
            ) : (
              'حذف'
            )}
          </button>
        </td>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};

export default connect(mapStateToProps, { deleteFromCart })(LicenseRow);

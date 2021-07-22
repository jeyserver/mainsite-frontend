import * as React from 'react';
import { connect } from 'react-redux';
import { deleteFromCart } from '../../../../redux/actions';
import { cart } from '../../../../redux/reducers/cartReducer';
import { Spinner } from 'react-bootstrap';
import { formatPrice } from '../../../helper/formatPrice';
import styles from '../productRow.module.scss';

export interface DomainRowProps {
  data: any;
  deleteFromCart: (id: number) => void;
  cart: cart;
}

export interface DomainRowState {}

class DomainRow extends React.Component<DomainRowProps, DomainRowState> {
  constructor(props: DomainRowProps) {
    super(props);
    this.state = {};
  }

  render() {
    const { id, domain, period, discout, currency, price } = this.props.data;

    return (
      <>
        <td>
          <strong>ثبت دامنه</strong>
        </td>
        <td>
          {domain.name}.{domain.tld}
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

export default connect(mapStateToProps, { deleteFromCart })(DomainRow);

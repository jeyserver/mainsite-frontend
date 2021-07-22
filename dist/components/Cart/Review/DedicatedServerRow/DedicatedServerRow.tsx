import * as React from 'react';
import { connect } from 'react-redux';
import { deleteFromCart } from '../../../../redux/actions';
import { cart } from '../../../../redux/reducers/cartReducer';
import { Spinner } from 'react-bootstrap';
import { formatPrice } from '../../../helper/formatPrice';
import styles from '../productRow.module.scss';

export interface DedicatedServerRowProps {
  data: any;
  deleteFromCart: (id: number) => void;
  cart: cart;
}

export interface DedicatedServerRowState {}

class DedicatedServerRow extends React.Component<
  DedicatedServerRowProps,
  DedicatedServerRowState
> {
  constructor(props: DedicatedServerRowProps) {
    super(props);
    this.state = {};
  }

  render() {
    const { id, title, discout, price, currency, period } = this.props.data;

    return (
      <>
        <td>
          سرور اختصاصی {title} <br />
        </td>
        <td className={styles.noper}></td>
        <td>
          برای {period.value} {period.type === 'monthly' ? 'ماه' : 'سال'}
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

export default connect(mapStateToProps, { deleteFromCart })(DedicatedServerRow);

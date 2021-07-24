import * as React from 'react';
import { connect } from 'react-redux';
import { deleteFromCart } from '../../../../redux/actions';
import { cart } from '../../../../redux/reducers/cartReducer';
import CountryFlagTooltip from '../../../helper/components/CountryFlagTooltip';
import { Spinner } from 'react-bootstrap';
import { formatPrice } from '../../../helper/formatPrice';
import styles from '../productRow.module.scss';

export interface HostRowProps {
  data: any;
  deleteFromCart: (id: number) => void;
  cart: cart;
}

export interface HostRowState {}

class HostRow extends React.Component<HostRowProps, HostRowState> {
  constructor(props: HostRowProps) {
    super(props);
    this.state = {};
  }

  render() {
    const { id, title, period, discout, price, currency, country, domain } =
      this.props.data;

    return (
      <>
        <td>
          <CountryFlagTooltip
            name={country.name_en}
            flag={{ address: country.flag }}
          />
          <span className={styles.title}>{title}</span>
        </td>
        <td>
          {domain.name}.{domain.tld}
        </td>
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

export default connect(mapStateToProps, { deleteFromCart })(HostRow);

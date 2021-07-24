import * as React from 'react';
import { Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import { deleteFromCart } from '../../../../redux/actions';
import { cart } from '../../../../redux/reducers/cartReducer';
import CountryFlagTooltip from '../../../helper/components/CountryFlagTooltip';
import { formatPrice } from '../../../helper/formatPrice';
import { formatSpaceInEnglish } from '../../../helper/formatSpace';
import styles from '../productRow.module.scss';

export interface VpsRowProps {
  data: any;
  deleteFromCart: (id: number) => void;
  cart: cart;
}

export interface VpsRowState {}

class VpsRow extends React.Component<VpsRowProps, VpsRowState> {
  constructor(props: VpsRowProps) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      id,
      title,
      period,
      discout,
      price,
      currency,
      country,
      ip,
      ram,
      hard,
    } = this.props.data;

    return (
      <>
        <td>
          <CountryFlagTooltip
            name={country.name_en}
            flag={{ address: country.flag }}
          />
          <span className={styles.title}>
            سرور مجازی {title} {country.name_fa}
          </span>
        </td>
        <td>
          {ip && <div>{ip.value} عدد آی پی اضافه</div>}
          {ram && <div>{formatSpaceInEnglish(ram)}رم اضافه</div>}
          {hard && (
            <div>
              {formatSpaceInEnglish(hard.space)} {hard.type} هارد اضافه
            </div>
          )}
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

export default connect(mapStateToProps, { deleteFromCart })(VpsRow);

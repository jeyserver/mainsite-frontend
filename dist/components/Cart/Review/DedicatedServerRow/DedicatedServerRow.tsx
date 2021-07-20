import * as React from 'react';
import { connect } from 'react-redux';
import { deleteFromCart } from '../../../../redux/actions';
import { formatPrice } from '../../../helper/formatPrice';
import styles from '../productRow.module.scss';

export interface DedicatedServerRowProps {
  data: any;
  deleteFromCart: (id: number) => void;
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
    return (
      <>
        <td>
          سرور اختصاصی {this.props.data.title} <br />
        </td>
        <td className={styles.noper}></td>
        <td>برای {this.props.data.payment_period.month} ماه </td>
        <td>
          {this.props.data.discout
            ? `${formatPrice(this.props.data.discout)} ${
                this.props.data.currency.title
              }`
            : `0 ${this.props.data.currency.title}`}
        </td>
        <td>
          {formatPrice(this.props.data.price)} {this.props.data.currency.title}
        </td>
        <td>
          <button className={styles.deleteBtn}>حذف</button>
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

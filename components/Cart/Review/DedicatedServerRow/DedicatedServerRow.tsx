import * as React from 'react';
import { connect } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import { AsyncThunkAction, RootState } from '../../../../store';
import { deleteItem } from '../../../../store/Cart';
import styles from '../productRow.module.scss';
import IDedicatedProduct from '../../../../helper/types/cart/dedicated';
import { formatPriceWithCurrency } from '../../../../store/Currencies';
import { NotificationManager } from 'react-notifications';

interface IProps {
  data: IDedicatedProduct;
  deleteItem: AsyncThunkAction<{ status: boolean }, string | number>;
  currencies: RootState['currencies'];
}

interface IState {
  loading: boolean;
}

class DedicatedServerRow extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      loading: false,
    };
  }
  async deleteItem() {
    this.setState({ loading: true });

    try {
      await this.props.deleteItem(this.props.data.id).unwrap();
    } catch (error) {
      NotificationManager.error(
        'ارتباط با سامانه بدرستی انجام نشد، لطفا مجددا تلاش کنید.',
        'خطا'
      );
      this.setState({ loading: false });
    }
  }

  render() {
    const product = this.props.data;

    return (
      <React.Fragment>
        <td>
          سرور اختصاصی {product.plan.title} <br />
        </td>
        <td className={styles.noper}></td>
        <td>برای {Math.floor(product.price / product.plan.price)} ماه</td>
        <td>
          {product.discount
            ? `${formatPriceWithCurrency(
                this.props.currencies,
                product.currency,
                product.discount
              )}`
            : `0 ${this.props.currencies.active.title}`}
        </td>
        <td>
          {product.price
            ? `${formatPriceWithCurrency(
                this.props.currencies,
                product.currency,
                product.price
              )}`
            : `0 ${this.props.currencies.active.title}`}
        </td>
        <td>
          <button
            className={styles.deleteBtn}
            onClick={() => this.deleteItem()}
          >
            {this.state.loading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              'حذف'
            )}
          </button>
        </td>
      </React.Fragment>
    );
  }
}

export default connect(
  (state: RootState) => {
    return {
      currencies: state.currencies,
    };
  },
  { deleteItem }
)(DedicatedServerRow);

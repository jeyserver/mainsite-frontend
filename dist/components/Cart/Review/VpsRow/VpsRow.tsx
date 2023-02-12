import * as React from 'react';
import { Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import { AsyncThunkAction, RootState } from '../../../../store';
import CountryFlagTooltip from '../../../../helper/components/CountryFlagTooltip/CountryFlagTooltip';
import { NotificationManager } from 'react-notifications';
import styles from '../productRow.module.scss';
import IVPSProduct from '../../../../helper/types/cart/vps';
import { formatSpace } from '../../../../helper/formatSpace';
import { formatPriceWithCurrency } from '../../../../store/Currencies';
import { deleteItem } from '../../../../store/Cart';

interface iProps {
  data: IVPSProduct;
  deleteItem: AsyncThunkAction<{ status: boolean }, string | number>;
  currencies: RootState['currencies'];
}

interface VpsRowState {
  loading: boolean;
}

class VpsRow extends React.Component<iProps, VpsRowState> {
  constructor(props: iProps) {
    super(props);
    this.state = { loading: false };
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
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const product = this.props.data;

    return (
      <>
        <td>
          <CountryFlagTooltip country={product.plan.country} />
          <span className={styles.title}>سرور مجازی {product.plan.title}</span>
        </td>
        <td>
          {product.plan.addons && product.plan.addons.ip && (
            <div>{product.plan.addons.ip} عدد آی پی اضافه</div>
          )}
          {product.plan.addons && product.plan.addons.ram && (
            <div>
              {product.plan.addons.ram.addon.title}
              رم اضافه
            </div>
          )}
          {product.plan.addons && product.plan.addons.hard && (
            <div>{product.plan.addons.hard.addon.title} هارد اضافه</div>
          )}
        </td>
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
            disabled={this.state.loading}
          >
            {this.state.loading ? (
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

export default connect(
  (state: RootState) => {
    return {
      currencies: state.currencies,
    };
  },
  { deleteItem }
)(VpsRow);

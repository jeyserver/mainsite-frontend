import * as React from 'react';
import { connect } from 'react-redux';
import CountryFlagTooltip from '../../../../helper/components/CountryFlagTooltip/CountryFlagTooltip';
import { Spinner } from 'react-bootstrap';
import styles from '../productRow.module.scss';
import { AsyncThunkAction, RootState } from '../../../../store';
import { deleteItem } from '../../../../store/Cart';
import { NotificationManager } from 'react-notifications';
import IHostProduct from '../../../../helper/types/cart/host';
import { formatPriceWithCurrency } from '../../../../store/Currencies';
import { formatSpace } from '../../../../helper/formatSpace';

interface IProps {
  data: IHostProduct;
  deleteItem: AsyncThunkAction<{ status: boolean }, string | number>;
  currencies: RootState['currencies'];
}

interface IState {
  loading: boolean;
}

class HostRow extends React.Component<IProps, IState> {
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
          <span className={styles.title}>{product.plan.title}</span>
        </td>
        <td>
          {product.domain &&
            `${product.domain.domain}.${product.domain.tld.tld}`}{' '}
          {product.domain.type !== 'register' &&
            `- ${formatSpace(product.plan.space, 'en', true)}`}
        </td>
        <td>برای {Math.round(product.price / product.plan.price)} ماه</td>
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
)(HostRow);

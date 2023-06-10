import * as React from 'react';
import { connect } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import styles from '../productRow.module.scss';
import { formatPriceWithCurrency } from '../../../../store/Currencies';
import { AsyncThunkAction, RootState } from '../../../../store';
import { deleteItem } from '../../../../store/Cart';
import { NotificationManager } from 'react-notifications';
import ILicenseProduct from '../../../../helper/types/cart/license';

interface IProps {
  data: ILicenseProduct;
  deleteItem: AsyncThunkAction<{ status: boolean }, number>;
  currencies: RootState['currencies'];
}

interface IState {
  loading: boolean;
}

class LicenseRow extends React.Component<IProps, IState> {
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
      <>
        <td>
          <span>لایسنس {product.plan.title}</span>
        </td>
        <td className={styles.noper}>
          {product.plan.setup !== 0
            ? formatPriceWithCurrency(
                this.props.currencies,
                product.plan.currency,
                product.plan.setup
              )
            : 'هزینه راه‌اندازی اولیه (اولین ماه)'}
        </td>
        <td>برای {Math.floor(product.price / product.plan.price)} ماه</td>
        <td>
          {product.price
            ? `${formatPriceWithCurrency(
                this.props.currencies,
                product.currency,
                product.discount
              )}`
            : `0 ${this.props.currencies.active.title}`}
        </td>
        <td>
          {formatPriceWithCurrency(
            this.props.currencies,
            product.currency,
            product.price
          )}
        </td>
        <td>
          <button
            className={styles.deleteBtn}
            disabled={this.state.loading}
            onClick={() => this.deleteItem()}
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
)(LicenseRow);

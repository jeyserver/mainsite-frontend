import * as React from 'react';
import { connect } from 'react-redux';
import { deleteFromCart } from '../../../../redux/actions';
import { Spinner } from 'react-bootstrap';
import styles from '../productRow.module.scss';
import ILicense from '../../../../helper/types/products/License/plan';
import { ICurrency } from '../../../../pages/_app';
import { formatPriceWithCurrency } from '../../../../store/Currencies';
import { AsyncThunkAction, RootState } from '../../../../store';
import { deleteItem } from '../../../../store/Cart';
import { NotificationManager } from 'react-notifications';

interface IProps {
  data: {
    id: string;
    price: number;
    discount: number;
    number: number;
    currency: ICurrency;
    product: string;
    plan: ILicense;
  };
  deleteItem: AsyncThunkAction<{ status: boolean }, string>;
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
    this.deleteItem = this.deleteItem.bind(this);
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
    return (
      <>
        <td>
          <span>لایسنس {this.props.data.plan.title}</span>
        </td>
        <td className={styles.noper}>
          {this.props.data.plan.setup !== 0
            ? formatPriceWithCurrency(
                this.props.currencies,
                this.props.data.plan.currency,
                this.props.data.plan.setup
              )
            : 'هزینه راه‌اندازی اولیه (اولین ماه)'}
        </td>
        <td>برای 10 ماه</td>
        <td>
          {this.props.data.discount
            ? `${formatPriceWithCurrency(
                this.props.currencies,
                this.props.data.currency,
                this.props.data.discount
              )}`
            : `0 ${this.props.currencies.active.title}`}
        </td>
        <td>
          {formatPriceWithCurrency(
            this.props.currencies,
            this.props.data.plan.currency,
            this.props.data.plan.price
          )}
        </td>
        <td>
          <button
            className={styles.deleteBtn}
            disabled={this.state.loading}
            onClick={this.deleteItem}
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

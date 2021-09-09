import * as React from 'react';
import { connect } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import { AsyncThunkAction, RootState } from '../../../../store';
import { deleteItem } from '../../../../store/Cart';
import { NotificationManager } from 'react-notifications';
import { formatPriceWithCurrency } from '../../../../store/Currencies';
import IDomainProduct from '../../../../helper/types/cart/domain';
import styles from '../productRow.module.scss';

interface IProps {
  data: IDomainProduct;
  deleteItem: AsyncThunkAction<{ status: boolean }, number>;
  currencies: RootState['currencies'];
}

interface IState {
  loading: boolean;
}

class DomainRow extends React.Component<IProps, IState> {
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

  domainType(type) {
    switch (type) {
      case 'register':
        return 'قبت دامنه';
      case 'transfer':
        return 'انتقال دامنه';
      case 'owndomain':
        return 'تمدید دامنه';
    }
  }

  render() {
    const product = this.props.data;

    return (
      <>
        <td>
          <strong>{this.domainType(product.type)}</strong>
        </td>
        <td>
          {product.domain}.{product.tld.tld}
        </td>
        <td>برای {Math.round(product.price / product.tld.new)} ماه</td>
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
)(DomainRow);

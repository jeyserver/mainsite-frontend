import * as React from 'react';
import { connect } from 'react-redux';
import { deleteFromCart } from '../../../../redux/actions';
import CountryFlagTooltip from '../../../helper/components/CountryFlagTooltip';
import { formatPrice } from '../../../helper/formatPrice';
import { formatSpaceInEnglish } from '../../../helper/formatSpace';
import styles from '../productRow.module.scss';

export interface BackupSpaceRowProps {
  data: any;
  deleteFromCart: (id: number) => void;
}

export interface BackupSpaceRowState {}

class BackupSpaceRow extends React.Component<
  BackupSpaceRowProps,
  BackupSpaceRowState
> {
  constructor(props: BackupSpaceRowProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <td>
          <CountryFlagTooltip
            name={this.props.data.country.name}
            flag={{
              address: this.props.data.country.flag,
              width: 24,
              height: 24,
            }}
          />
          <span className={styles.backupTitle}>
            پشتیبان {this.props.data.id}
          </span>
        </td>
        <td>
          {formatSpaceInEnglish(this.props.data.space)} -{' '}
          {this.props.data.domain}
        </td>
        <td>برای {this.props.data.payment_period.month} ماه </td>
        <td>
          {this.props.data.discout
            ? `${formatPrice(this.props.data.discout)} ${
                this.props.data.currency.title
              }`
            : `0 ${this.props.data.currency.title}`}{' '}
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

export default connect(mapStateToProps, { deleteFromCart })(BackupSpaceRow);

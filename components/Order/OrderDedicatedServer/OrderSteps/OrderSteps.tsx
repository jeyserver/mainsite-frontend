import classNames from 'classnames';
import * as React from 'react';
import styles from './OrderSteps.module.scss';

export interface OrderStepsProps {
  step: any;
}

export interface OrderStepsState {}

class OrderSteps extends React.Component<OrderStepsProps, OrderStepsState> {
  constructor(props: OrderStepsProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={styles.orderSteps}>
        <h2 className={styles.title}>مراحل سفارش</h2>

        <div
          className={classNames(styles.step, {
            [styles.active]: this.props.step === 'configuration',
          })}
        >
          <div className={styles.stepIco}>
            <div>
              <span>1</span>
            </div>
          </div>
          <div>
            <span>پیکر بندی</span>
          </div>
        </div>

        <div
          className={classNames(styles.step, {
            [styles.active]: this.props.step === 'confirmation',
          })}
        >
          <div className={styles.stepIco}>
            <div>
              <span>2</span>
            </div>
          </div>
          <div>
            <span>تایید سفارش</span>
          </div>
        </div>

        <div
          className={classNames(styles.step, {
            [styles.active]: this.props.step === 'complete-order',
          })}
        >
          <div className={styles.stepIco}>
            <div>
              <span>3</span>
            </div>
          </div>
          <div>
            <span>تکمیل سفارش</span>
          </div>
        </div>
      </div>
    );
  }
}

export default OrderSteps;

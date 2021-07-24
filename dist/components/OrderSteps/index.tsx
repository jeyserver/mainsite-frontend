import classNames from 'classnames';
import * as React from 'react';
import styles from './style.module.scss';

export interface OrderStepsProps {
  step: 'domain-settings' | 'configuration' | 'confirmation' | 'complete-order';
  haveDomain?: boolean;
}

export interface OrderStepsState {}

class OrderSteps extends React.Component<OrderStepsProps, OrderStepsState> {
  constructor(props: OrderStepsProps) {
    super(props);
    this.state = {};
  }

  render() {
    const steps = this.props.haveDomain
      ? [
          { fa: 'تنظیمات دامنه', en: 'domain-settings' },
          { fa: 'پیکر بندی', en: 'configuration' },
          { fa: 'تایید سفارش', en: 'confirmation' },
          { fa: 'تکمیل سفارش', en: 'complete-order' },
        ]
      : [
          { fa: 'پیکر بندی', en: 'configuration' },
          { fa: 'تایید سفارش', en: 'confirmation' },
          { fa: 'تکمیل سفارش', en: 'complete-order' },
        ];

    return (
      <div className={styles.orderSteps}>
        <h2 className={styles.title}>مراحل سفارش</h2>

        {steps.map((step, index) => (
          <div
            className={classNames(styles.step, {
              [styles.active]: this.props.step === step.en,
            })}
          >
            <div className={styles.stepIco}>
              <div>
                <span>{index + 1}</span>
              </div>
            </div>
            <div>
              <span>{step.fa}</span>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default OrderSteps;

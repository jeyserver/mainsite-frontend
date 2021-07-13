import * as React from 'react';
import styles from './PlansLoading.module.scss';

export interface PlansLoadingProps {}

export interface PlansLoadingState {}

class PlansLoading extends React.Component<
  PlansLoadingProps,
  PlansLoadingState
> {
  constructor(props: PlansLoadingProps) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className={styles.loadingWrapper}>
        <div className={styles.ldsRing}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
}

export default PlansLoading;

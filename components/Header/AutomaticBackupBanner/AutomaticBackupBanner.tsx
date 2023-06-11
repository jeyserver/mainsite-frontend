import * as React from 'react';
import Link from 'next/link';
import styles from './AutomaticBackupBanner.module.scss';

export interface AutomaticBackupBannerProps {}

export interface AutomaticBackupBannerState {}

class AutomaticBackupBanner extends React.Component<
  AutomaticBackupBannerProps,
  AutomaticBackupBannerState
> {
  constructor(props: AutomaticBackupBannerProps) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className={styles.automaticBackupBanner}>
        <div className={styles.textContainer}>
          <h2>بکاپ اتوماتیک</h2>
          <h3>امنیت اطلاعات سازمان خود را بیمه کنید</h3>
          <Link href="/hosting/linux/professional" className={styles.btn}>

            <i className="fa fa-rocket" aria-hidden="true"></i>خرید هاست میزبانی
          </Link>
        </div>
        <div className={styles.images}>
          <img src="/images/cload.png" alt="بکاپگیری اتوماتیک" />
          <img src="/images/laptop.png" alt="بکاپ اتوماتیک" />
        </div>
      </div>
    );
  }
}

export default AutomaticBackupBanner;

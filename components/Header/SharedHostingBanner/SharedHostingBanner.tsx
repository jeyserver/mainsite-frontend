import * as React from 'react';
import styles from './SharedHostingBanner.module.scss';
import Link from 'next/link';

export interface SharedHostingBannerProps {}

export interface SharedHostingBannerState {}

class SharedHostingBanner extends React.Component<
  SharedHostingBannerProps,
  SharedHostingBannerState
> {
  constructor(props: SharedHostingBannerProps) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <React.Fragment>
        <div className={styles.realSharedHostingBG}></div>
        <div className={styles.sharedHostingCaption}>
          <div>
            <h3>هاست اشتراکی لینوکس</h3>
            <h4>ایده آل برای تازه وارد ها</h4>
            <p>نصاب یک کلیکی وردپرس و بازیابی بک‌آپ ها بصورت خودکار</p>
            <div className={styles.btns}>
              <Link href="/hosting/linux/professional" className={styles.professionalLink}>

                <span>برای حرفه ای ها </span>
                <i className="fas fa-user-secret"></i>

              </Link>
              <Link href="/hosting/linux/standard" className={styles.newcomersLink}>

                <span>برای تازه وارد‌ها</span>
                <i className="far fa-hand-point-up"></i>

              </Link>
            </div>
          </div>
          <div className={styles.robotImgWrapper}>
            <img src="/images/robot.png" alt="نصب خودکار سیستم عامل ها" />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SharedHostingBanner;

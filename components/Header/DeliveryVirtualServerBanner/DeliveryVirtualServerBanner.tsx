import * as React from 'react';
import styles from './DeliveryVirtualServerBanner.module.scss';
import Link from 'next/link';

export interface DeliveryVirtualServerBannerProps {}

export interface DeliveryVirtualServerBannerState {}

class DeliveryVirtualServerBanner extends React.Component<
  DeliveryVirtualServerBannerProps,
  DeliveryVirtualServerBannerState
> {
  constructor(props: DeliveryVirtualServerBannerProps) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <React.Fragment>
        <div className={styles.deliveryVirtualServersBG}></div>
        <div className={styles.deliveryVirtualServersCaption}>
          <div className={styles.captionWrapper}>
            <h3>تحویل آنی سرور های مجازی</h3>
            <ul>
              <li>
                <i className="fas fa-check-square"></i>
                <span>نصب خودکار تمام نسخه های CentOS ، Ubuntu ، Debian</span>
              </li>
              <li>
                <i className="fas fa-check-square"></i>
                <span> نصب دستی و سفارشی توسط شما</span>
              </li>
              <li>
                <i className="fas fa-check-square"></i>
                <span>نصب هر سیستم عامل دلخواه دیگر</span>
              </li>
              <li>
                <i className="fas fa-check-square"></i>
                <span>دسترسی VNC</span>
              </li>
            </ul>
            <Link href="/server/vps">
              <a className={styles.linkBuyVirtualServers}>
                <i className="far fa-hand-point-up"></i>
                <span> خرید یک سرور مجازی جدید</span>
              </a>
            </Link>
          </div>
          <div className={styles.robotImgWrapper}>
            <img src="/images/robot-2.png" className={styles.robotImg} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default DeliveryVirtualServerBanner;

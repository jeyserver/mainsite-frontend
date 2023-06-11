import * as React from 'react';
import { Image } from 'react-bootstrap';
import Link from 'next/link';
import styles from './HetzenerBanner.module.scss';

export interface HetzenerBannerProps {}

export interface HetzenerBannerState {}

class HetzenerBanner extends React.Component<
  HetzenerBannerProps,
  HetzenerBannerState
> {
  constructor(props: HetzenerBannerProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={styles.bannerWrapper}>
        <div className={styles.wrapper}>
          {/* Right Section */}
          <div className={styles.right}>
            <h2>
              <p>سرورهای</p>
              <p>CLOUD</p>
              <p>Hetzner آلمان</p>
            </h2>
            <ul>
              <li>نسل جدید سرورهای مجازی با آپتایم بالا</li>
              <li>دارای پردازنده های سریع و پیشرفته</li>
              <li>رابط کاربری مدرن جهت مدیریت سرویس ها</li>
            </ul>
          </div>
          {/* Left Section */}
          <div className={styles.left}>
            <Image src="/images/hetzener/special-sales.png" alt="" />
            <Image src="/images/hetzener/server.png" alt="" />
            <Image src="/images/hetzener/big-server.png" alt="" />
            <Image src="/images/hetzener/server.png" alt="" />
            <Image src="/images/hetzener/big-cloud.png" alt="" />
            <Image src="/images/hetzener/small-cloud.png" alt="" />
            <Link href="/server/vps/cloud" className={styles.showPannelsBtn}>
              مشاهده پلن ها
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default HetzenerBanner;

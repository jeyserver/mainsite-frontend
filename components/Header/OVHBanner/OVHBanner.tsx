import * as React from 'react';
import Link from 'next/link';
import { Button, Image } from 'react-bootstrap';
import styles from './OVHBanner.module.scss';

export interface OVHBannerProps {}

export interface OVHBannerState {}

class OVHBanner extends React.Component<OVHBannerProps, OVHBannerState> {
  constructor(props: OVHBannerProps) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className={styles.franceBannerWrapper}>
        <div className={styles.wrapper}>
          {/* Right Section */}
          <div className={styles.right}>
            <h2>
              <p>نسل جدید سرورهای مجازی</p>
              <p>CLOUD</p>
              <p>فرانسه OVH</p>
            </h2>
          </div>
          {/* Left Section */}
          <div className={styles.left}>
            <ul>
              <li>رابط کاربری مدرن با امکانات کاربردی</li>
              <li>دارای پردازنده های سریع و پیشرفته</li>
              <li>دسترسی آنی پس از ثبت سفارش</li>
              <li>کاملا مقرون به صرفه</li>
            </ul>
            <div>
              <Link href="#">
                <Button className={styles.showPannelsBtn} disabled>
                  به زودی
                </Button>
              </Link>
            </div>
          </div>
          {/* Special Sales */}
          <div className={styles.specialSales}>
            <Image src="/images/OVHBanner/special-sales-cloud.png" alt="" />
          </div>
          {/* CPU Cloud */}
          <div className={styles.cpuCloud}>
            <Image src="/images/OVHBanner/cpu-cloud.png" alt="" />
          </div>
        </div>
      </div>
    );
  }
}

export default OVHBanner;

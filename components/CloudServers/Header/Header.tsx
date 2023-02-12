import * as React from 'react';
import { Button, Image } from 'react-bootstrap';
import styles from './Header.module.scss';

export interface HeaderProps {}

export interface HeaderState {}

class Header extends React.Component<HeaderProps, HeaderState> {
  constructor(props: HeaderProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <header className={styles.mainHeaderWrapper}>
        <div className={styles.imgWaveBackground}>
          <Image src="/images/cloud-servers/top-left-wave.png" alt="" />
        </div>
        <div className={styles.imgBigServer}>
          <Image src="/images/cloud-servers/big-server.png" alt="" />
        </div>
        <div className={styles.imgJetCloud}>
          <Image src="/images/cloud-servers/jet.png" alt="" />
        </div>
        <div className={styles.imgSmallServer}>
          <Image src="/images/cloud-servers/small-server.png" alt="" />
        </div>
        <div className={styles.content}>
          <h1>سرورهای ابری جی سرور</h1>
          <p dir="rtl">
            این دسته از خدمات جدید جی سرور به شما این امکان را میدهد تا از
            بهترین مقرون به صرفه ترین دیتا سنتر های دیتا, پلن مورد نیاز خودتان
            را تهیه کنید و با استفاده از پلن مدیریتی فارسی و روان ما آنها را
            مدیریت کنید.
          </p>
          <div>
            <Button href="#plans">مشاهده پلن ها</Button>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;

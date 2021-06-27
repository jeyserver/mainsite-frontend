import * as React from 'react';
import { Container } from 'react-bootstrap';
import styles from './ServerStatus.module.scss';
import ServerStatusCard from './ServerStatusCard/ServerStatusCard';

export interface ServerStatusProps {
  servers: any;
}

export interface ServerStatusState {}

class ServerStatus extends React.Component<
  ServerStatusProps,
  ServerStatusState
> {
  constructor(props: ServerStatusProps) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <section>
        <div className={styles.innerBanner}>
          <h2>وضعیت سرورها</h2>
        </div>
        <Container>
          <div className={styles.topInfo}>
            <h3>وضعیت سرورها</h3>
            <p>
              آپتایم سرور مستقیما به معنای میزان زمان در دسترس بودن آن سرور
              اشاره دارد بدین گونه که هر چه آپتایم و به نوعی این زمان بیشتر باشد
              کیفیت سرور نیز بالاتر است.بنابر این توضیح، پایداری و ثبات وضعیت
              سرورها بی تردید یکی از مهم ترین فاکتورهای خرید سرورهای اختصاصی و
              مجازی است.
            </p>
            <p>
              سرورها هم مانند دیگر وسایل الکتریکی و سخت افزاری ممکن است در هر
              لحظه وضعیت متفاوتی داشتع باشند؛ بدین منظور جی سرور همواره عملیات
              مانیتورینگ و بررسی آپتایم سرورهای خود را در راس امور فنی خود قرار
              می دهد. هر 24 ساعت اطلاعات وضعیت سرورها بروز شده و در صورت بروز
              کوچک ترین مشکل یا اختلال، به سرعت واحد فنی اقدامات مربوط به برطرف
              سازی آن را شروع می کنند تا از هرگونه قطعی یا کاهش سرعت در سرویس
              های ارائه شده به مشتریان گرامی جی سرور جلوگیری شود.آپتایم بالای
              سرور های جی سرور باعث گردیده کاربران بتوانند بدون دغدغه و نگرانی
              از سرویس های ارائه شده بر این سرور ها نهایت استفاده را در جهت
              پیشرفت کسب و کار خود در فضای مجازی ببرند.
            </p>
          </div>
        </Container>
        <Container>
          {this.props.servers.map((server, index) => (
            <ServerStatusCard server={server} key={index} />
          ))}
        </Container>
        <Container>
          <div className={styles.downInfo}>
            <p>
              <strong>Uptime</strong> به نسبت مدت زمان فعالیت سالم سرور به کل
              زمان (یک ماه) میگویند. هرچه این درصد مقدار بیشتری داشته باشد سرور
              در وضعیت بهتری است.
            </p>
            <p>
              <strong>Downtime</strong> به مدت زمانی که سرور از دسترس خارج شده
              می گویند هرچه این مدت زمان کمتر باشد، سرور در وضعیت بهتری است.
            </p>
            <p>
              میزان <strong>Uptime</strong> و <strong>Downtime</strong> سرور ها
              از ابتدای تیر ماه (به صورت ماهیانه) محاسبه شده .
            </p>
          </div>
        </Container>
      </section>
    );
  }
}

export default ServerStatus;

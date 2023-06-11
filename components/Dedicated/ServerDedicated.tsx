import * as React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import CountryCard from './CountryCard/CountryCard';
import styles from './ServerDedicated.module.scss';

interface IProps {
  countries: { code: string; name: string; is_recommended: boolean }[];
}

class ServerDedicated extends React.Component<IProps> {
  render() {
    return (
      <div>
        <div className={styles.innerBanner}>
          <Container>
            <h2>سرور اختصاصی</h2>
          </Container>
        </div>
        <section className={styles.info}>
          <Container>
            <div className={styles.innerHard}>
              <p>
                سرور اختصاصی بصرفه ترین روش میزبانی برای سازمان ها و شرکت های
                بزرگ است که میخواهند از تمام آنچه هست استفاده کنند.
              </p>
              <p>
                در سرور اختصاصی تمام تنظیمات در دسترس شماست و این به شما اجازه
                میدهد تا همه چیز را آنجور که دوست دارید نگهداری کنید و در این
                نوع میزبانی اطلاعات شما در حداکثر امنیت قرار دارند وزیراکه
                اطلاعات شما فقط بصورت فیزیکی قابل دسترسی است.
              </p>
              <p>
                اگر از تنظیمات پیچیده سیستم عامل ها میترسید لطفا کار را به کنترل
                پنل های تجاری و رایگان بسپارید ، کنترل پنل های تجاری همچون{' '}
                <Link href="/licenses/cpanel" title="خرید لایسنس سی پنل">
                  Cpanel/Whm
                </Link>{' '}
                ،{' '}
                <Link href="/licenses/directadmin" title="خرید لایسنس دایرکت ادمین">
                  DirectAdmin
                </Link>{' '}
                ، <a>Plesk</a> و حتی کنترل پنل های رایگانی همچون{' '}
                <a>Virtualmin</a> ، <a>Kloxo</a> و یا <a>WebSitePanel</a> که
                شاید از لحاظ طیف امکانات از پنل های پریمیوم هم گسترده تر باشند
              </p>
              <p>&nbsp;</p>
              <p>
                این نوع سرور ها معمولا بدون قرار داد بک آپ به مشتریان تحویل داده
                میشود ولی از طرفی بعضی از این مراکز داده از 100GB تا 500GB به
                مشتریان خود فضای بک آپ در سرور دیگری بصورت رایگان واگذار میکند
                که در{' '}
                <Link href="">
                  اینجا
                </Link>{' '}
                کمی عمیق تر به این موضوع نگاهی انداختیم که بد نیست شما هم
                بخوانید!
              </p>
              <p>
                ما در جی سرور از 6 نقطه جهان اقدام به فروش سرور میکنیم که هر
                کدام دارای شرایط خاصی هستند پس اگر در انتخاب سرور یا مرکز داده
                تردید دارید چه خوب است که{' '}
                <Link href="/contact">
                  با ما تماس بگیرید
                </Link>{' '}
                تا بهترین گزینه را به شما پیشنهاد بدهیم. <br />
              </p>
              <Row>
                {this.props.countries.map((country) => (
                  <Col md={4} key={country.code}>
                    <CountryCard country={country} />
                  </Col>
                ))}
              </Row>
            </div>
          </Container>
        </section>
      </div>
    );
  }
}

export default ServerDedicated;

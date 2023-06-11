import Link from 'next/link';
import * as React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { formatPriceWithCurrency } from '../../store/Currencies';
import ILicense from '../../helper/types/products/License/plan';
import { RootState } from '../../store';
import PagesHeader from '../PagesHeader/PagesHeader';
import { renderPageInfo } from './helper/renderPageInfo';
import { renderPageTitle } from './helper/renderPageTitle';
import styles from './License.module.scss';

interface IOptions {
  [T: string]: {
    onlineActivation: boolean;
    IPReplacementPanel: boolean;
    webserver?: string;
    php?: string;
  };
}

const options: IOptions = {
  directadmin: {
    onlineActivation: true,
    IPReplacementPanel: true,
    webserver: 'استفاده از وب سرور های Nginx و Apache ',
  },
  cpanel: {
    onlineActivation: true,
    IPReplacementPanel: true,
    webserver: ' استفاده از وب سرور EasyApache 4 ',
    php: ' نغییر نسخه های PHP !‍ ',
  },
  litespeed: {
    onlineActivation: true,
    IPReplacementPanel: true,
  },
  whmcs: {
    onlineActivation: true,
    IPReplacementPanel: true,
  },
  cloudlinux: {
    onlineActivation: true,
    IPReplacementPanel: true,
  },
};

const infos = {
  directadmin: {
    3: 'اگر فعالیت شما طولانی مدت نیست یا فعلا تمایلی به هزینه و سرمایه گذاری در زمینه مجوز های قانونی کنترل پنل دایرکت ادمین ندارید، پلن ماهیانه برای شما مناسب تر است. شما با این مجوز می توانید به سرعت لایسنس خود را بعد از پرداخت تحویل بگیرید و بر روی سرور خود نصب کنید.اگر مایل بودید نصب دایرکت ادمین را به ما بسپارید، فقط کافیست بعد از خرید از طریق سامانه پشتیبانی مارا آگاه سازید',
  },
  cloudlinux: {
    5: 'این مجوز را برای سرور های مجازی یا اختصاصی استفاده کنید،اگر کنترل پنل های معمولی مثل سی پنل و یا دایرکت ادمین داشته باشید، بصورت خودکار با یکدگیر هماهنگ خواهند شد.درغیراینصورت شما با سرور بصورت مستقیم تنظیمات لازم را انجام بدهید.',
  },
  whmcs: {
    7: 'شما با این مجوز مثل مجوز بالایی تمامی امکانات این سیستم را دریافت خواهید کرد و تمام تفاوت لینک کپی رایتی است که برای شما دیگر وجود نخواهد داشت.شما ببلافاصله بعد از پرداخت این مجوز را دریافت خواهید کرد و با پنلی که در ناحیاه کاربری جی سرور به شما ارائه خواهد شد. میتوانید آی پی لایسنس راتغییر بدهید.',
  },
  litespeed: {
    11: 'این یک پلن مقرون بصرفه و متعادل برای سرور های اختصاصی است.شما محدودیتی در مورد میزان استفاده از رم یا تعداد کانکشن های همزمان ندارید بلکه لایت اسپید محدود خواهد شد تا فقط بر روی دو هسته از پردازشگر شما اجرا شود.',
    12: 'یک لایسنس حرفه ای مخصوص سرور های اختصاصی شما که میزبان وب سایت های خیلی پر بازدید هستند!با نصب این مجوز بر روی سرور خود،به لایت اسپید اجازه میدهید تا برروی 4 هسته از پردازشگر شما بدون هیچ محدودیت دیگریوب سایت هارا سریع باز کند!',
    13: 'این لایسنس مخصوص سرور های میزبانی حجیم است که تعداد زیادی از وب سایت های پربازدید را در خود نگهداری میکند.با این لایسنس از هر 8 هسته پرداشگرتان بهره ببرید و همه درخواست ها توسط لایت اسپید به سرعت پاسخ داده خواهند شد.',
  },
};

interface IProps {
  license: 'directadmin' | 'cpanel' | 'litespeed' | 'whmcs' | 'cloudlinux';
  plans: ILicense[];
  currencies: RootState['currencies'];
}

class License extends React.Component<IProps> {
  renderPlanType(pp: number) {
    switch (pp) {
      case 0:
        return 'برای همیشه';
      case 1:
        return 'روزانه';
      case 2:
        return 'ماهانه';
      case 3:
        return 'سالانه';
    }
  }

  render() {
    return (
      <section>
        <PagesHeader title={`لایسنس ${renderPageTitle(this.props.license)}`} />

        <div className={styles.mainContent}>
          <Container>
            <div>
              <div className={styles.licenseInfo}>
                {renderPageInfo(this.props.license)}
              </div>

              {this.props.plans.map((plan) => (
                <div key={plan.id} className={styles.plan}>
                  <div className={styles.palnTitle}>
                    <h5>{plan.title}</h5>
                  </div>
                  <Row>
                    <Col md={8}>
                      {infos[this.props.license] &&
                        infos[this.props.license][plan.id] && (
                          <p className={styles.info}>
                            {infos[this.props.license][plan.id]}
                          </p>
                        )}
                    </Col>
                    <Col md={4}>
                      <ul className={styles.options}>
                        {options[this.props.license].onlineActivation && (
                          <li>
                            <i className="fas fa-check"></i>
                            فعال سازی آنلاین
                          </li>
                        )}
                        {options[this.props.license].IPReplacementPanel && (
                          <li>
                            <i className="fas fa-check"></i>
                            پنل تعویض آی پی(یکبار در ماه)
                          </li>
                        )}
                        {options[this.props.license].webserver && (
                          <li>
                            <i className="fas fa-check"></i>
                            {options[this.props.license].webserver}
                          </li>
                        )}
                        <li>
                          <i className="fas fa-check"></i>
                          {plan.setup
                            ? `هزینه راه‌اندازی اولیه  ${formatPriceWithCurrency(
                                this.props.currencies,
                                plan.currency,
                                plan.setup
                              )}`
                            : 'هزینه راه‌اندازی اولیه رایگان! '}
                        </li>
                        {options[this.props.license].php && (
                          <li>
                            <i className="fas fa-check"></i>
                            {options[this.props.license].php}
                          </li>
                        )}
                        <li>
                          <i className="fas fa-check"></i>
                          {formatPriceWithCurrency(
                            this.props.currencies,
                            plan.currency,
                            plan.price
                          )}{' '}
                          / {this.renderPlanType(plan.pp)}
                        </li>

                        <li>
                          <Link href={`/order/licenses/${plan.id}`} className={styles.orderLink}>
                            سفارش
                          </Link>
                        </li>
                      </ul>
                    </Col>
                  </Row>
                </div>
              ))}
            </div>
          </Container>
        </div>
      </section>
    );
  }
}

export default connect((state: RootState) => {
  return {
    currencies: state.currencies,
  };
})(License);

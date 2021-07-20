import * as React from 'react';
import { Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import styles from './Facilities.module.scss';

export interface FacilitiesProps {}

export interface FacilitiesState {}

class Facilities extends React.Component<FacilitiesProps, FacilitiesState> {
  constructor(props: FacilitiesProps) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <div className={styles.tittle}>
          <h5>امکانات سرویس هاست های میزبانی جی سرور</h5>
          <div className={styles.divider}>
            <div />
          </div>
        </div>
        <Row>
          <Col md={4}>
            <div className={styles.box}>
              <div className={styles.header}>
                <div className={styles.txt}>
                  <i className="fa fa-credit-card" />
                  <span>ضمانت بازگشت وجه</span>
                </div>
              </div>
              <div className={styles.content}>
                <p>
                  در صورتی که از کیفیت و یا نصب اسکریپت مد نظرتان بر روی سرویس
                  های جی سرور اطمینان ندارید، میتوانید بدون نگرانی اقدام به خرید
                  هر یک از پلن ها کنید. در صورتی سرویس مدنظر نتوانست نظر شما را
                  جلب کند و یا مشکلی مشاهده کردید میتوانید در پنل مدیریت سرویس و
                  بدون قید هیچ شرطی سرویس را لغو کنید.
                </p>
                <p>
                  پس از ثبت درخواست انصراف ، هزینه سرویس به موجودی کاربری شما در
                  جی سرور اضافه خواهد شد.
                </p>
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div className={styles.box}>
              <div className={styles.header}>
                <div className={styles.txt}>
                  <i className="fab fa-wordpress"></i>
                  <span>نصب رایگان مدیریت محتوا</span>
                </div>
              </div>
              <div className={styles.content}>
                <p>
                  اسکریپت های سایت ساز و یا مدیریت محتوا به شما کمک میکنند تا
                  بدون نیاز به دانش فنی و یا برنامه نویسی بتوانید یک سایت را
                  ایجاد و مدیریت کنید . محبوب ترین این اسکریپت ها وردپرس و گاها
                  جوملا میباشد. سرویس های هاست میزبانی جی سرور هماهنگی کامل با
                  این اسکریپت ها دارد و میتوانید با خیالی آسوده نسبت به خرید پلن
                  مدنظرتان اقدام کنید اگر شما هم از طرفداران این سایت ساز های
                  محبوب هستید اما با نصب و راه اندازی آن همواره مشکل دارید، در
                  تمامی پلن ها ما سیستم مدیریت محتوای مدنظر شما را به رایگان نصب
                  و راه اندازی میکنیم
                </p>
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div className={styles.box}>
              <div className={styles.header}>
                <div className={styles.txt}>
                  <i className="far fa-clock"></i>
                  <span>پشتیبان گیری به صورت منظم</span>
                </div>
              </div>
              <div className={styles.content}>
                <p>
                  اگر اطلاعات شما تحت هر شرایطی از بین برود و یا غیر قابل
                  استفاده شود، با داشتن نسخه‌ی پشتیبان میتوانید بدون هدرفت زمان
                  و یا نیروی زیاد به فعالیتتان ادامه دهید. اما تهیه پشتیبان در
                  دوره های مختلف و نگه داری آنها به زمان و فضای زیادی نیاز خواهد
                  داشت . در تمامی سرویس های هاست میزبانی جی سرور، نسخه های
                  پشتیبانی در دوره های یک روز، یک ماه و سالیانه تهیه و برای
                  امینت بیشتر در سرور هایی در نقاطی غیر از سرور هاست شما نگهداری
                  خواهد شد
                </p>
                <p>
                  ‍ در تمامی پلن های هاست میزبانی جی سرور، شما فقط با فشردن یک
                  دکمه میتوانید نسخه ی پشتیبانی را بازگردانی و یا حتی دانلود
                  نمایید .
                </p>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <div className={styles.box}>
              <div className={styles.header}>
                <div className={styles.txt}>
                  <i className="fa fa-truck" />
                  <span>انتقال رایگان اطلاعات</span>
                </div>
              </div>
              <div className={styles.content}>
                <p>
                  همواره دغدغه مدیران وب سایت ها هنگام خرید هاست میزبانی جدید،
                  انتقال اطلاعات سایتشان بدون ازدست دادن اطلاعات به سرویس دهنده
                  جدید است . در تمامی سرویس های هاست میزبانی جی سرور، میتوانید
                  با ارائه اطلاعات هاست میزبانی قبلی خود و یا پشتیبان وب
                  سایتتان، انتقال اطلاعات را به ما بسپارید تا ما در کمترین زمان
                  ممکن و با دقت بالایی اطلاعات شما را به رایگان به سرویس جدید
                  منتقل کنیم .
                </p>
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div className={styles.box}>
              <div className={styles.header}>
                <div className={styles.txt}>
                  <i className="fas fa-tv"></i>
                  <span>مانیتورینگ 24 ساعته سرور ها</span>
                </div>
              </div>
              <div className={styles.content}>
                <p>
                  هاست های میزبانی به دلیل عدم نیاز به دانش فنی زیاد و مناسب
                  بودن قیمت از پرطرف دارترین سرویس های میزبانی محسوب میشوند .
                  اختلال در عملکرد سرور و یا حتی یکی از سرویس ها میتواند باعث
                  اختلال در کل سرویس های یک سرور هاست میزبانی شود . در تمامی
                  سرویس های هاست میزبانی جی سرور ، سرور ها و منابع به صورت 24
                  ساعته رصد میشوند تا در صورت پیش آمد مشکلی در سریع ترین زمان
                  بررسی و حل شود .
                </p>
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div className={styles.box}>
              <div className={styles.header}>
                <div className={styles.txt}>
                  <i className="fa fa-calendar" />
                  <span>دوره های پرداخت متنوع</span>
                </div>
              </div>
              <div className={styles.content}>
                <p>
                  دوره های تمدید هاست های میزبانی جی سرور در دوره های ماهانه در
                  نظر گرفته شده است تا اگر قصد آزمایش سازگاری اسکریپتی با سرویس
                  های جی سرور را دارید بتوانید این کار را با هزینه ی اندکی انجام
                  دهید . البته این امکان وجود دارد تا بتوانید با هر دوره پراختی
                  که مدنظرتان است خریداری و یا تمدید کنید . جی سرور این اقدام را
                  تضمینی برای کیفیت سرویس های خود میداند .
                </p>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <div className={styles.box}>
              <div className={styles.header}>
                <div className={styles.txt}>
                  <i className="fa fa-tasks" />
                  <span>امکان ارتقا در هر لحظه</span>
                </div>
              </div>
              <div className={styles.content}>
                <p>
                  اگر نمیدانید به چه منابعی نیاز دارید و یا اگر قصد راه اندازی
                  وب سایت جدیدی را دارید و نمیخواهید در ابتدای کار هزینه ی گزاف
                  پرداخت کنید و ممکن است در آینده نیاز به منابع بیشتری داشته
                  باشید ، در انتخاب پلن مردد نباشید و بدون نگرانی پلنی که
                  مدنظرتان است را انتخاب کنید . در تمامی پلن های هاست میزبانی جی
                  سرور، شما میتوانید در هرلحظه و با حفظ کامل اطلاعاتتان ، پلن
                  سرویس را به پلن های بالاتر ارتقا دهید .
                </p>
                <p>
                  در هنگام ارتقا شما فقط هزینه مابه‌التفاوت قیمت برای روز های
                  باقی مانده از سرویس را پرداخت میکنید .
                </p>
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div className={styles.box}>
              <div className={styles.header}>
                <div className={styles.txt}>
                  <i className="fa fa-ambulance" />
                  <span>پشتیبانی هاست های میزبانی</span>
                </div>
              </div>
              <div className={styles.content}>
                <p>
                  در صورتی که در یکی از سرویس ها مشکل خاصی مشاهده کردید و یا
                  دانش انجام عملیاتی در کنترل پنل سرویس را ندارید میتوانید در هر
                  لحظه با کارشناسان جی سرور در پخش پشتیبانی و تیکتنیگ در میان
                  بگذارید تا کارشناسان ما راهنمایی های لازم را به شما بدهند و یا
                  خود مشکل را بررسی و برای شما حل نمایند .
                </p>
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div className={styles.box}>
              <div className={styles.header}>
                <div className={styles.txt}>
                  <i className="fa fa-cubes" />
                  <span>کنترل پنل های پیشرفته</span>
                </div>
              </div>
              <div className={styles.content}>
                <p>
                  آخرین نسخه ی کنترل پنل های دایرکت ادمین و سی پنل بر روی سرور
                  های هاست میزبانی جی سرور نصب است . این کنترل پنل ها در
                  جدیدترین بروزرسانی ها، امکانات بسیاری اضافه کرده اند، مانند :
                </p>
                <p>
                  نمایش آمار بازدید، مشاهده خطاهای وب سایت، امکان ایجاد محافظت
                  بر روی پوشه ها مهم، آنتی ویروس جهت بررسی فایل ها، مدیریت اکانت
                  های FTP، مدیریت ایمیل ها و .. است
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Facilities;

import Link from 'next/link';
import * as React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import PagesHeader from '../PagesHeader/PagesHeader';
import styles from './Faqs.module.scss';

interface IProps {
  appIsScrolling: boolean;
  switchAppIsScrolling: () => void;
}

interface IState {
  isNavFixed: boolean;
}

class Faqs extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isNavFixed: false,
    };
  }
  lastScrollTop = 0;

  onScroll() {
    const nav = document.querySelector('#faqs-nav') as HTMLDivElement;

    const mainNavLinks = document.querySelectorAll('#faqs-nav li a');

    var st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > this.lastScrollTop) {
      // downscroll code
      nav.style.top = '0px';
    } else {
      // upscroll code
      if (!this.props.appIsScrolling) {
        nav.style.top = '80px';
      } else {
        nav.style.top = '0px';
      }
    }

    let fromTop = window.scrollY - 120;

    if (fromTop > 280) {
      nav.style.position = 'fixed';
      this.setState({ isNavFixed: true });
    } else {
      nav.style.position = 'static';
      this.setState({ isNavFixed: false });
    }

    mainNavLinks.forEach((link: any) => {
      if (link.hash) {
        let section = document.querySelector(link.hash);

        if (section) {
          if (
            section.offsetTop - 10 <= fromTop &&
            section.offsetTop + section.offsetHeight > fromTop
          ) {
            link.dataset.active = 'true';
          } else {
            link.dataset.active = 'false';
          }
        }
      }
    });

    this.lastScrollTop = st <= 0 ? 0 : st;
  }

  componentDidMount() {
    window.addEventListener('scroll', () => this.onScroll(), false);
    this.props.switchAppIsScrolling();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', () => this.onScroll(), false);
  }

  render() {
    return (
      <section>
        <PagesHeader title="سوالات متداول" />

        <div className={styles.mainContent}>
          <Container>
            <div className={styles.innerSpace}>
              <div className={styles.title}>
                <h5>سوالات متدوال</h5>
                <div className={styles.space}>
                  <div className={styles.blockquote}>
                    تعدادی سوال متداولند، یعنی حتی برای ما هم در ابتدای کار این
                    سوالات پیش می آمد و هم اکنون ما میخواهیم قبل از پرسیده
                    شدنشان پاسخ بدهیم!البته ممکن است تعدادی از سوال ها را جا
                    انداخته باشیم!چه خوب است که از طریق{' '}
                    <Link href="/contact">
                      <a>فرم تماس با ما</a>
                    </Link>{' '}
                    آن هارا یاد آوری کنید تا به اینجا اضافه شوند.{' '}
                  </div>
                </div>
              </div>

              {this.state.isNavFixed && (
                <div
                  style={{
                    height:
                      document.querySelector<HTMLDivElement>('#faqs-nav')
                        .clientHeight,
                  }}
                  className={styles.emptySpaceForNav}
                ></div>
              )}

              <Row>
                <Col className={styles.mnavigation} id="faqs-nav">
                  <ul>
                    <li>
                      <a
                        href="#hosting"
                        onClick={() => {
                          this.props.switchAppIsScrolling();
                        }}
                      >
                        سوالات متداول هاست میزبانی
                      </a>
                    </li>
                    <li>
                      <a
                        href="#domain"
                        onClick={() => {
                          this.props.switchAppIsScrolling();
                        }}
                      >
                        سوالات متداول دامنه
                      </a>
                    </li>
                  </ul>
                </Col>
              </Row>

              <div id="hosting">
                <Row>
                  <Col xs={12}>
                    <div className={styles.faqTittle}>
                      <Link href="/hosting/faq">
                        <a>
                          <h5>سوالات متداول هاست میزبانی</h5>
                        </a>
                      </Link>

                      <div className={styles.divider}>
                        <div />
                      </div>
                    </div>

                    <div className={styles.faqBox}>
                      <div className={styles.body}>
                        <h4 className={styles.heading}>
                          1 - میخواهم یک وب سایت ایجاد کنم،مرا راهنمایی کنید.
                        </h4>
                        <Col md={10} className={styles.content}>
                          <p>
                            شما برای راه اندازی یک وب سایت ابتدا لازم دارید یک
                            آدرس(domain) برای آن انتخاب کنید.سپس هاست خریداری
                            کنید و بر روی آن سیستم های مدیریت محتوا را راه
                            اندازی کنید و به انتشار و مدیریت بپردازید. ممکن است
                            تعدادی اصطاح در این جمله بکار رفته باشد، در سوالات
                            بعدی هر کدام توضیح داده خواهند شد
                          </p>
                        </Col>
                      </div>
                    </div>
                    <div className={styles.faqBox}>
                      <div className={styles.body}>
                        <h4 className={styles.heading}>2 - هاست چیست ؟</h4>
                        <Col md={10} className={styles.content}>
                          <p>
                            در ساده ترین تعریف، هاست را میتوان قسمتی از صدها
                            قسمت یک سرور دانست که با اتخاذ شرایط و محدودیت هایی
                            به شما اجازه میدهد با پرداخت مبالغی ناچیز در سال یا
                            ماه با توجه به نیاز های شما،فایل هایتان را در بستر
                            اینترنت و در دسترس عموم قرار بدهید.در هاست اشتراکی
                            شما بدون دانش های پیچیده مدیریت سرور میتوانید کد و
                            برنامه های خود را بر روی سرور قرار بدهید تا بتوانید
                            پس از اتصال دامنه به هاست سایتتان را راه اندازی کنید
                            و برای همگان قابل دسترسی کنید. هاست ها انواع مختلفی
                            دارند مانند هاست لینوکس،هاست ویندوز،هاست دانلود و...
                            <Link href="/hosting/linux/professional">
                              <a>قیمت انواع هاست ها</a>
                            </Link>
                          </p>
                        </Col>
                      </div>
                    </div>
                    <div className={styles.faqBox}>
                      <div className={styles.body}>
                        <h4 className={styles.heading}>
                          3 - تفاوت هاست لینوکس و ویندوز درچیست ؟
                        </h4>
                        <Col md={10} className={styles.content}>
                          <p>
                            در ساده ترین پاسخ میتوان گفت که هاست لینوکس،همان
                            سرویسی است که اکنون بیشتر سایت ها از آن استفاده
                            میکنند.در هاست لینوکس شما از زبان های اسکریپت نویسی
                            php و perl استفاده کنید و از مدیریت پایگاه های
                            اطلاعاتتان توسط Mysql لذت میبرید.در هاست های لینوکس
                            شما اغلب از یکی از پنل های ( Cpanel, DirectAdmin,
                            Kloxo, Webmin ) استفاده میکنید و بر خلاف نام "هاست
                            لینوکس" شما نیازی ندارید که سیستم عامل لینوکس را بر
                            روی رایانه خود نصب کنید. در هاست ویندوز شما علاوه بر
                            استفاده از php میتوانید از برنامه های خانواده .NET
                            ماکروسافت استفاده کنید و مدیریت پایگاه اطلاعاتتان
                            توسط Sql server صورت خواهد گرفت.پنل های معروف
                            هاستینگ در ویندوز WebSitePanel و Plesk می باشد. ما
                            برای افرادی که آغاز کار هستند هاست های لینوکس را
                            پیشنهاد میکنیم چرا که قیمت ها و پیچدگی های کمتری
                            دارید. ما در جملات بالا تعداد زیادی اصطاح به کار
                            بردیم.با کلیک بر روی تعدادی از آن ها میتوانید
                            توضیحات بیشتری مطالعه بفرمایید.
                          </p>
                        </Col>
                      </div>
                    </div>
                    <div className={styles.faqBox}>
                      <div className={styles.body}>
                        <h4 className={styles.heading}>4 - سی پنل چیست ؟</h4>
                        <Col md={10} className={styles.content}>
                          <p>
                            در تعاریف اولیه،سی پنل یک برنامه غیر رایگان است که
                            بر روی سیستم عامل های لینوکسی نصب شده و اجازه تقسیم
                            منابع سرور را میدهد تا هر قسمت به سایت یا شخصی
                            واگذار شده و مدیریت آن خارج از تمام پیچدگی های
                            لینوکسی صورت پذیرد.
                          </p>
                        </Col>
                      </div>
                    </div>
                    <div className={styles.faqBox}>
                      <div className={styles.body}>
                        <h4 className={styles.heading}>
                          5 - سیستم های مدیریت محتوا چیستند ؟
                        </h4>
                        <Col md={10} className={styles.content}>
                          <p>
                            برنامه هایی هستند تحت وب که به مدیریت یک وب سایت
                            اجازه میدهند که بدون نیاز به کد نویسی های عظیم و
                            دانش های تخصصی مربوط یک وب سایت را در کمتر از چند
                            دقیقه راه اندازی کرد.این سیستم ها اغلب از هزاران
                            فایل و یک پایگاه اطلاعاتی تشکیل شده و تعداد آن ها بر
                            روی هاست های لینوکس به مراتب بیشتر از هاست ویندوز
                            است.
                          </p>
                        </Col>
                      </div>
                    </div>
                    <div className={styles.faqBox}>
                      <div className={styles.body}>
                        <h4 className={styles.heading}>
                          6 - سرعت و کیفیت هاست اروپا نسبت به هاست ایران چگونه
                          است ؟
                        </h4>
                        <Col md={10} className={styles.content}>
                          <p>
                            کاربران بسیار زیادی قبل از خرید هاست از ما این سوال
                            را پرسیده اند و همواره پاسخ ما به کاربران این بوده
                            است که سرویس های اروپا به دلیل به روز بودن قطعات
                            سرور ها، از کیفیت و آپتایم بالا و هم چنین پهنای باند
                            بسیار بیشتری نسبت به سرویس های ایران برخودار هستند .
                          </p>
                          <p>
                            در مقابل سرویس های ایران به دلیل فاصله و موقعیت
                            جفرافیایی نسبت به شما و کاربران ایرانی، از سرعت
                            بیشتری نسبت به سرویس های اروپا برخوردار هستند .
                          </p>
                        </Col>
                      </div>
                    </div>
                    <div className={styles.faqBox}>
                      <div className={styles.body}>
                        <h4 className={styles.heading}>
                          7 - منظور از پردازنده و میزان آن در سرویس های هاست
                          لینوکس چیست ؟
                        </h4>
                        <Col md={10} className={styles.content}>
                          <p>
                            در واقع هاست قسمتی از یک سرور است، سرور هم مانند
                            کامپیوتر های عادی دارای cpu یا همان پردازنده
                            هستند،جی سرور جهت ارائه خدمات بهتر به هر پلن مقدار
                            مشخصی پردازنده اختصاص میدهد. درصورتی که به تازگی
                            تصمیم به راه اندازی وب سایت گرفته اید و میخواهید
                            سایت جدیدی را راه اندازی کنید باید بدانید که میزان
                            پردازنده ای که در هاست های میزبانی استاندارد ارائه
                            شده است، برای وب سایت شما تا مدت زیادی کافی هستند و
                            تا زمان رشد وب سایت و افزایش تعداد بازدیدکنندگان به
                            میزان پردازنده بیشتری نیاز ندارید.
                          </p>
                        </Col>
                      </div>
                    </div>
                    <div className={styles.faqBox}>
                      <div className={styles.body}>
                        <h4 className={styles.heading}>
                          8 - هاست های میزبانی جی سرور از چه تعداد زیر دامین،
                          پارک دامین و ادان دامین پشتیبانی می کند ؟
                        </h4>
                        <Col md={10} className={styles.content}>
                          <p>
                            در تمامی پلن های هاست میزبانی ، با کلیک بر روی دکمه
                            "اطلاعات بیشتر" در انتهای جدول مقدار دقیق این مشخصات
                            را مشاهده کنید . در تمامی پلن های هاست میزبانی جی
                            سرور محدودیتی برای زیر دامنه در نظر گرفته نشده .
                          </p>
                        </Col>
                      </div>
                    </div>
                    <div className={styles.faqBox}>
                      <div className={styles.body}>
                        <h4 className={styles.heading}>
                          9 - منظور از تعداد Entry Process چیست و اگر از تعداد
                          آن بیشتر شود، چه اتفاقی رخ می دهد ؟
                        </h4>
                        <Col md={10} className={styles.content}>
                          <p>
                            تعداد بازدید های هم زمان و یا به صورت کلی تعداد
                            درخواست های همزمان از سمت کاربران به هاست میزبانی و
                            یا تعداد روند هایی که در خود هاست تعیین می شود را
                            مشخص میکند . اگر مقدار روند ها و بازدید های در لحظه
                            به حد تعیین شده برسد ، تا زمان اتمام یک روند،
                            درخواست های جدید در حالت انتظار باقی می مانند.
                            بنابراین اگر شما صاحب یک وب سایت پربازدید هستید حتما
                            به میزان Entry Process توجه داشته باشید و باتوجه به
                            آن نسبت به انتخاب هاست میزبانی اقدام کنید.
                          </p>
                        </Col>
                      </div>
                    </div>
                    <div className={styles.faqBox}>
                      <div className={styles.body}>
                        <h4 className={styles.heading}>
                          10 - منظور از هارد SSD چیست و چه تفاوتی با هارد معمولی
                          دارد ؟
                        </h4>
                        <Col md={10} className={styles.content}>
                          <p>
                            هارد های SSD نسل جدید از هارد های ذخیره سازی اطلاعات
                            هستند، سرعت خواندن و نوشتن اطلاعات در این نوع هارد
                            ها 3 تا 5 برابر بیشتر از هارد های معمولی است . سرعت
                            بارگذاری سایت ها در این نوع هارد به طبع سریع تر
                            خواهد بود .
                          </p>
                        </Col>
                      </div>
                    </div>
                    <div className={styles.faqBox}>
                      <div className={styles.body}>
                        <h4 className={styles.heading}>
                          11 - آیا شما به صورت رایگان برای من وردپرس یا جوملا بر
                          روی هاست نصب می کنید ؟
                        </h4>
                        <Col md={10} className={styles.content}>
                          <p>
                            اگر طرفدار سیستم های مدیریت محتوا هستید ولی همواره
                            در مراحل نصب مشکل داشتید و یا اینکه مایل نیستید
                            مراحل نصب را خودتان انجام دهید ، میتوانید بعد از
                            تهیه هاست میزبانی در تیکتی در بخش پشتیبانی جی سرور
                            عنوان کنید . ما بعد از دریافت درخواست شما ، اقدام به
                            نصب سیستم مدیریت محتوا مدنظرتان خواهیم کرد و پس از
                            اتمام، اطلاعات را در تیکت ارسال میکنیم .
                          </p>
                        </Col>
                      </div>
                    </div>
                    <div className={styles.faqBox}>
                      <div className={styles.body}>
                        <h4 className={styles.heading}>
                          12 - اطلاعات من تا چه مدت پس از خرید سرویس جدید به جی
                          سرور منتقل می شود ؟
                        </h4>
                        <Col md={10} className={styles.content}>
                          <p>
                            در صورتی که قصد انتقال وب سایتتان به سرویس های هاست
                            میزبانی جی سرور را دارید ، در صورت تمایل میتوانید
                            اطلاعات سرویس قبلی خود را در بخش پشتیبانی و در قالب
                            یک تیکت ارسال کنید تا ما برای شما به رایگان و با دقت
                            بالا انتقال اطلاعات را انجام دهیم .
                          </p>
                          <p>
                            در صورتی که کنترل پنل سرویس قبلی با سرویس جدید تهیه
                            شده از جی سرور یکسان باشد ، انتقال اطلاعات زمان
                            کوتاهی خواهد بود در غیر این صورت زمان بیشتری نیاز
                            خواهد داشت .
                          </p>
                        </Col>
                      </div>
                    </div>
                    <div className={styles.faqBox}>
                      <div className={styles.body}>
                        <h4 className={styles.heading}>
                          13 - هاست های میزبانی جی سرور تا چه تعداد بازدیدکننده
                          را در روز پشتیبانی می کنند ؟
                        </h4>
                        <Col md={10} className={styles.content}>
                          <p>
                            جی سرور هیچگونه محدودیتی در تعداد بازدیدکننده در طول
                            روز بر روی سرویس های خود اعمال نکرده است و بدون
                            محدودیت است، اما شما باید توجه داشته باشید که تعداد
                            بازدید در لحظه بر روی پلن های جی سرور محدود شده است
                            و برای انتخاب هاست مناسب میبایست تعداد بازدید در
                            لحظه وب سایت خود را مشخص کنید و سپس نسبت به خرید
                            هاست مورد نظر خود اقدام کنید.
                          </p>
                        </Col>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
              <div id="domain">
                <Row>
                  <Col xs={12}>
                    <div className={styles.faqTittle}>
                      <Link href="/hosting/faq">
                        <a>
                          <h5>سوالات متداول دامنه</h5>
                        </a>
                      </Link>
                      <div className={styles.divider}>
                        <div />
                      </div>
                    </div>
                    <div className={styles.faqBox}>
                      <div className={styles.body}>
                        <h4 className={styles.heading}>1 - دامنه چیست ؟</h4>
                        <Col md={10} className={styles.content}>
                          <p>
                            دامنه یا دومین همان آدرس اینترنتی است که شما در
                            مرورگرتان وارد میکند.(مثلا{' '}
                            {process.env.DOMAIN.slice(
                              4,
                              process.env.DOMAIN.length
                            )}{' '}
                            ) این دامنه ها با مالکیت قانونی به شما واگذار میشود
                            و درصورتی که تا قبل از آن کسی آن دامنه را فعال نکرده
                            باشد میتوانید با پرداخت هزینه ای آن را خریداری کنید.{' '}
                            <Link href="/domain">
                              <a>قیمت ثبت دامنه</a>
                            </Link>
                          </p>
                        </Col>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </Container>
        </div>
      </section>
    );
  }
}

export default Faqs;

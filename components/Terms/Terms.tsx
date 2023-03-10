import * as React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PagesHeader from '../PagesHeader/PagesHeader';
import styles from './Terms.module.scss';

class Terms extends React.Component {
  render() {
    return (
      <section>
        <PagesHeader title="شرایط و قوانین جی سرور" />

        <Container>
          <Row className={styles.section}>
            <Col xs={12}>
              <div className={styles.blockquote}>
                <h2 className={styles.title}>
                  <strong>تعاریف</strong>
                </h2>
                <ul>
                  <li>
                    ما: هر جایی در این متن از کلمه "ما" استفاده شده منظور مدیران
                    سایت جی سرور است.
                  </li>
                  <li>
                    مشتری: مشتری به کسی گفته خواهد شد که با اطلاعات یک شخص حقیقی
                    در جی سرور ثبت نام کرده و فاکتور های مربوط را با آن شناسه
                    کاربری پرداخت نموده است.
                  </li>
                  <li>
                    محیط کاربری: به قسمتی از سایت جی سرور گفته میشود که مشتری در
                    آن امکان خرید سرویس و خدمات ، ارتباط با ما و مدیریت و مشاهده
                    جزئیات سرویس ها و خدمات خریداری شده و ارسال درخواست پشتیبانی
                    امکان پذیر باشد.
                  </li>
                  <li>
                    قرار داد: قرار داد در اولویت اول به سندی گفته میشود که بصورت
                    رسمی به مهر و امضای ما و مشتری رسیده باشد.درصورتی که مشتری
                    علاقه یا امکان امضای رسمی یک سند را نداشته باشد فاکتور صادر
                    شده ی محیط کاربری به عنوان قرار داد شناخته خواهد شد.
                  </li>
                  <li>
                    سرویس: سرویس معرف کالا یا محصولاتی است که جی سرور ارائه
                    میدهد.اعم از: همه ی انواع هاست های اشتراکی ، همه انواع سرور
                    های مجازی ، همه انواع سرور های اختصاصی ، همه انواع دامنه های
                    اینترنتی و ...
                  </li>
                  <li>
                    خدمات: منظور از کلمه خدمات تمام کار هایی است جی سرور برای یک
                    مشتری بصورت مستقیم انجام میدهد که اعم است از: همه انواع
                    پروژه های برنامه نویسی ، همه انواع پرداخت های اینترنتی ، همه
                    انواع مدیریت و پیکرندی سرور و...
                  </li>
                  <li>
                    پشتیبانی: پشتیبانی به معنای پاسخ دادن به سوالات و رفع مشکلات
                    سرویس ها و خدماتی است که جی سرور ارائه میکند.
                  </li>
                  <li>
                    انصراف: انصراف از سرویس یا خدمات به معنای بازگشت پول مابقی
                    زمان تا انقضای سرویس میباشد
                  </li>
                  <li>
                    هر گیگابایت: در جی سرور به هر 1000 مگابایت، یک گیگابایت گفته
                    میشود.
                  </li>
                  <li>
                    هر ترابایت: در جی سرور به هر 1000 گیگابایت، یک ترابایت گفته
                    میشود.
                  </li>
                  <li>هر ماه: در جی سرور به هر 30 روز، یک ماه گفته میشود.</li>
                  <li>
                    سرور های مدیریت شده: به سرور هایی گفته میشود که علاوه بر
                    اینکه مشتری صاحب امتیاز آن است ولی جی سرور مسئولیت پیکربندی
                    و نگهداری سرور را به عهده میگیرد.
                  </li>
                  <li>
                    سرور های مدیریت نشده: به سرور هایی گفته میشود که جی سرور هیچ
                    مسئولیتی در قبال پشتیبانی نرم افزاری را به گردن نگرفته است و
                    تمامی مسئولیت های پیکربندی و نگهداری سرور به عهده مشتری است
                  </li>
                </ul>
              </div>
              <div className={styles.blockquote}>
                <h2 className={styles.title}>
                  <strong>قوانین</strong> کلی
                </h2>
                <ul>
                  <li>
                    جی سرور تابع قوانین جمهوری اسلامی ایران و هر گونه اقدامی که
                    خلاف این قوانین باشد منجر به قطع سرویس میشود.
                  </li>
                  <li>
                    جی سرور اطلاعات سرویس ها و مشتریان را درصورت دریافت حکم
                    قضایی به مراجع مربوط تحویل خواهد داد
                  </li>
                  <li>
                    انتشار مطالب و محتوای ضد اخلاقی، سوء استفاده، توهین به شخص
                    یا اشخاص و ... ممنوع می باشد و سایت خاطی بدون اطلاع قبلی
                    غیرفعال یا حذف می شود
                  </li>
                  <li>
                    هرگونه اقدامی که باعث حملات به سرور یا سرویس دیگری بشود خلاف
                    قوانین بوده و پس قطع سرویس اطلاعات مشتری خاطی به مراجع قضایی
                    تحویل داده میشود
                  </li>
                  <li>
                    با توجه به مواد{' '}
                    <a href="http://rc.majlis.ir/fa/law/show/135717">
                      قانون جرايم رايانه&zwnj;ای
                    </a>
                    ، جی سرور این اختیار را برای خود محفوظ میدارد که در صورت
                    شناسایی هر یک از کاربران یا مشتریانی که تلاش برای ایجاد
                    اختلال در سرویس ها یا نفود به سامانه های مربوط به این مجموعه
                    از ادامه همکاری، ارائه خدمات و پشتیبانی به ایشان، حتی در
                    میان دوره قرارداد خودداری کند و درصورت لزوم از اطلاعات موجود
                    آنان جهت پیگیری های قانونی از مراجع ذیصلاح استفاده کند.
                  </li>
                </ul>
              </div>
              <div className={styles.blockquote}>
                <h2 className={styles.title}>
                  <strong>قوانین</strong> ثبت نام و اطلاعات
                </h2>
                <ul>
                  <li>
                    همه اطلاعات وارد شده توسط کاربران باید صحیح باشد و تمامی
                    مسئولیت ورود اطلاعات اشتباه به عهده مشتری میباشد.
                  </li>
                  <li>
                    ایمیل و تلفن هر کاربر میتواند راهی برای احراز هویت وی باشد،
                    بنابر این هرگونه تماس یا درخواست به منزله تماس از طرف مشتری
                    مربوط میباشد.
                  </li>
                  <li>
                    درصورتی که مشتری اطلاعات ورود خود را به پنل کاربری فراموش
                    کرده باشد و امکان دسترسی او به ایمیل و تلفنش وجود نداشته
                    باشد، تنها راه ورود او به پنل کاربری ارسال تصویر کارت ملی
                    اون که قبلا شماره ملی در مشخصاتش وارد کرده است .درصورتی که
                    مشتری قبلا کد ملی خود را ارائه نکرده باشد امکان دسترسی مجدد
                    به پنل کاربری وجود ندارد.
                  </li>
                  <li>کلمه عبور کاربر باید از لحاظ امنیتی مستحکم باشد.</li>
                  <li>
                    تمامی اطلاعات مشتریان نزد جی سرور محفوظ است و به شخص ثالثی
                    واگذار نمیشود به جز مواردی که به دستوراتی مقام محترم قاضی
                    ابلاغ کنند.
                  </li>
                  <li>
                    ثبت نام به معنای قبول تمامی قوانین موجود در این صفحه است.
                  </li>
                </ul>
              </div>
              <div className={styles.blockquote}>
                <h2 className={styles.title}>
                  <strong>قوانین</strong> خرید سرویس یا خدمات
                </h2>
                <ul>
                  <li>
                    مشتری ملزم است تا مبلغ سفارش یا خدمات را تا پایان زمان
                    انقضای فاکتور پرداخت کند در غیر اینصورت جی سرور فاکتور را
                    منقضی خواهد کرد و خدمات و سرویس ها کنسل خواهند شد.
                  </li>
                  <li>
                    دامنه ها، سرور های اختصاصی، سرورهای مجازی ایران، لایسنس ها،
                    مدیریت سرور و کانفیگ ها به هیچ عنوان قابلیت انصراف را ندارند
                    و پس از پرداخت فاکتور هزینه قابل برگشت نیست.
                  </li>
                  <li>
                    برگشت هزینه و قابلیت انصراف سرور های مجازی و هاست های
                    اشتراکی طبق پیش فاکتور امکان پذیر یا غیرممکن است.
                  </li>
                  <li>
                    جی سرور ملزم است مبالغ موجود در اعتبار پنل کاربری را درصورت
                    درخواست طی 72 ساعت به شماره حساب اعلام شده توسط وی واریز
                    نماید.
                  </li>
                  <li>
                    فاکتور هایی که از طریق واریز به حساب یا کارت به کارت پرداخت
                    میشوند باید از طریق قسمت مربوط در پنل کاربری اطلاع داده
                    بشود.
                  </li>
                  <li>
                    بازگشت هزینه یا انصراف از خدمات ارائه شده فقط درصورتی امکان
                    پذیر است که در قرار داد ذکر شده باشد.
                  </li>
                  <li>
                    در صورتی که ارائه محصولات و خدمات به دلیل دستورات قضایی و
                    مراجع قانونی در میان دوره قرارداد برای یک یا گروهی از
                    مشتریان متوقف گردد، هزینه ی باقی مانده آن سرویس عودت نخواهد
                    شد.
                  </li>
                  <li>
                    جی سرور اجازه دارد در سرویس ها و خدماتی که نیاز به تمدید
                    دوره ای دارند ، ممانعت از تمدید کند و ادامه همکاری خود را با
                    مشتری بعد از اتمام مدت قرارداد قطع کند.
                  </li>
                </ul>
              </div>
              <div className={styles.blockquote}>
                <h2 className={styles.title}>
                  <strong>قوانین</strong> پشتیبانی سرویس یا خدمات
                </h2>
                <ul>
                  <li>
                    پشتیبانی بصورت عام شامل همه سرویس ها و خدمات جی سرور میشود
                    مگر آن که بصورت خاص در فاکتور عدم پشتیبانی ذکر شده باشد.
                  </li>
                  <li>
                    پشتیبانی فقط از طریق پنل کاربری(تیکتینگ) امکان پذیر است و
                    پشتیبانی تلفنی و یا از طریق چت آنلاین درصورتی امکان پذیر است
                    که در قرار داد یا پیش فاکتور ذکر شده باشد.
                  </li>
                  <li>
                    زمان پاسخگویی از 1 ساعت تا 24 ساعت متغییر است.درصورت بروز
                    هرگونه مشکلات غیر قابل پیشبینی جی سرور هیچگونه مسئولیتی در
                    قبال آن نمیپذیرد
                  </li>
                  <li>
                    درصورتی که جی سرور برنامه نویس وب سایت شما نباشد رفع اشکالات
                    وب سایت شما درصورت امکان با پرداخت هزینه امکان پذیر است در
                    غیر اینصورت جی سرور هیچگونه مسئولیتی در این قبال ندارد
                  </li>
                  <li>
                    جی سرور طبق مشخصات سرویس در هاست های اشتراکی یا سرور مجازی
                    اقدام به تهیه نسخه های پشتیبان میکند ولکن هیچ گونه مسئولیتی
                    را در قبال سلامت این بک آپ ها ندارد و مشتری باید به تهیه
                    نسخه پشتیبان اقدام کند
                  </li>
                  <li>
                    بازگردانی نسخه پشتیبان در هر 24 ساعت رایگان بوده و بیش از آن
                    نیاز به پرداخت هزینه دارد
                  </li>
                  <li>
                    درصورت درخواست مشتری نسخه پشتیبان امکان ارسال از طریق دیسک
                    های سخت یا حافظه های شیمیایی(Flash) رادارند که نیاز به
                    پرداخت هزینه های پست + ترافیک مصرف شده برای دانلود نسخه
                    پشتیبان + هزینه منتقل کننده دیتا را دارد.
                  </li>
                  <li>
                    جی سرور اجازه دارد در هر زمان با اعلام قبلی اقدام به قطع
                    سرور ها برای تعمییرات یا بروزرسانی ها و رسیدگی به آن ها برای
                    حفظ کیفیت بکند.
                  </li>
                  <li>
                    مشتری وظیفه دارد تا برنامه های خود را با نسخه نرم افزار های
                    نصب شده با آن هماهنگ کند و درصورت بروزرسانی و تغییر نسخه این
                    نرم افزار ها جی سرور هیچگونه مسئولیتی را قبول نمیکند
                  </li>
                  <li>
                    درصورتی که ما در تماس با مشتری مورد توهین قرار بگیریم ، طبق
                    بند <i>خرید سرویس یا خدمات » ممانعت از تمدید</i> از ادامه
                    همکاری با مشتری امتناع کنیم.
                  </li>
                </ul>
              </div>
              <div className={styles.blockquote}>
                <h2 className={styles.title}>
                  <strong>قوانین</strong> سرویس های اشتراکی
                </h2>
                <ul>
                  <li>
                    در هاست های اشتراکی و سرور های مجازی درصورت ارسال انبوه
                    ایمیل جی سرور اقدام به قطع سرویس و اطلاع به مشتری میکند در
                    صورت تکرار جی سرور اجازه دارد تا سرویس را قطع نماید و هزینه
                    باقی مانده سرویس را غیرقابل برگشت کند.
                  </li>
                  <li>
                    در هاست های اشتراکی وسرور های اشتراکی که پردازشگر بصورت
                    اختصاصی جداسازی نشده درصورت استفاده بیش از حد برنامه از
                    منابع سرور جی سرور اقدام به قطع سرویس و اطلاع به مشتری میکند
                    و درصورت تکرار جی سرور اجازه دارد تا سرویس را قطع کند و
                    مابقی هزینه سرویس را غیرقابل برگشت کند.
                  </li>
                  <li>
                    هرگونه اقدامی که به ضرر امنیت اطلاعات یا کیفیت سایر مشتریان
                    باشد از طرف جی سرور خلاف محسوب شده و جی سرور بدون اخطار
                    اقدام به قطع سرویس میکند{' '}
                  </li>
                  <li>
                    همه سرویس ها به جز سرویس های وارز تابع قوانین بین المللی کپی
                    رایت بوده و درصورت مشاهده تخلف جی سرور اقدام به اخطار و قطع
                    سرویس میکند.
                  </li>
                  <li>
                    وب سایت های چتروم، دوستیابی و سایر شبکه های اجتماعی اجازه
                    استفاده از هاست اشتراکی را ندارد و درصورت تمایل به راه
                    اندازی اینگونه وب سایت می&zwnj;بایست از سرور مجازی یا
                    اختصاصی استفاده کنند؛ درصورت مشاهده تخلف، سرویس بصورت
                    غیرقابل انصراف مسدود خواهد شد.
                  </li>
                </ul>
              </div>
              <div className={styles.blockquote}>
                <h2 className={styles.title}>
                  <strong>قوانین</strong> سرور های مجازی و اختصاصی
                </h2>
                <ul>
                  <li>
                    تمامی سرورهای مجازی و اختصاصی بصورت پیشفرض مدیریت نشده هستند
                    به جز آن که در قرارداد کلمه "مدیریت شده" ذکر شده باشد.
                  </li>
                  <li>
                    در تمامی سرور ها مجازی و اختصاصی در زمان نصب مجدد سیستم عامل
                    یا تغییر هارد فیزیکی و یا تغییر سایز هارد های مجازی اطلاعات
                    بصورت کامل حذف میشوند وتمام مسئولیت آن به عهده مشتری میباشد.
                  </li>
                  <li>
                    در سرور اختصاصی، اگر قطعات سرور به مشکل بربخورند، تنها وظیفه
                    ما ارسال درخواست تعمییر یا تعویض سرور به دیتاسنتر است.
                  </li>
                  <li>
                    در سرور های مجازی، اگر سرور مادر به مشکل برخورد کند و
                    اطلاعات مشتری حذف شود جی سرور هیچ مسئولیتی را تقبل
                    نمیکند.این وظیفه مشتری است که بصورت دوره ای از اطلاعات خود
                    نسخه پشتیبان تهیه کند.
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}

export default Terms;

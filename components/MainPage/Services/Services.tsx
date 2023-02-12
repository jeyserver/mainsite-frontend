import classNames from 'classnames';
import * as React from 'react';
import styles from './Services.module.scss';

export interface ServicesProps {}

export interface ServicesState {}

class Services extends React.Component<ServicesProps, ServicesState> {
  constructor(props: ServicesProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={styles.services}>
        <div className={styles.servicesTitle}>خدمات ویژه ی جی سرور</div>

        <div className={styles.servicesBody}>
          <div className={classNames(styles.circle, styles.circleTop)} />

          <div className={styles.timelineRow}>
            <div
              className={classNames(styles.timelineCol, styles.timelineRight)}
            >
              <div className={styles.timelineRowBox}>
                <div className={styles.timelineBox}>
                  <div className={styles.title}>لایسنس</div>
                  <div className={styles.desc}>
                    جی سرور مجموعه کاملی از لایسنس‌های مدیریت سرور (همچون دایرکت
                    ادمین و سی پنل و ...) را در اختیارتان قرار می‌دهد تا به صورت
                    قانونی قادر به استفاده از آنها باشید. در حال حاضر لایسنس‌ها
                    به صورت ماهیانه یا ابدی (lifetime) ارائه می شوند.{' '}
                  </div>
                </div>
                <div className={styles.splitter}>
                  <div className={styles.vline} />

                  <div className={styles.splitterIcon}>
                    <img
                      width={45}
                      height={45}
                      src="/images/main-page/services/laptop-code.svg"
                    />
                  </div>
                </div>
              </div>

              <div className={styles.timelineRowBox}>
                <div className={styles.timelineBox}>
                  <div className={styles.title}> سرور اختصاصی </div>
                  <div className={styles.desc}>
                    اگر دارای وبسایت یا اپلیکیشنی با تعداد بالایی بازدیدکننده و
                    کاربر هستید که نیاز به پهنای باند و سرعت بالایی می‌باشد و
                    امنیت وب‌سایت برای سازمان یا شرکت شما از اهمیت ویژه‌ای
                    برخوردار می‌باشد، خرید سرور اختصاصی قطعا پاسخگوی نیاز شما
                    خواهد بود.
                  </div>
                </div>
                <div className={styles.splitter}>
                  <div className={styles.vline} />
                  <div className={styles.splitterIcon}>
                    <img
                      width={45}
                      height={45}
                      src="/images/main-page/services/server.svg"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.timeline} />

            <div
              className={classNames(styles.timelineCol, styles.timelineLeft)}
            >
              <div className={styles.timelineRowBox}>
                <div className={styles.splitter}>
                  <div className={styles.vline} />
                  <div className={styles.splitterIcon}>
                    <img
                      width={45}
                      height={45}
                      src="/images/main-page/services/network-wired.svg"
                    />
                  </div>
                </div>
                <div className={styles.timelineBox}>
                  <div className={styles.title}> هاست اشتراکی </div>
                  <div className={styles.desc}>
                    {' '}
                    هاست اشتراکی مناسب‌ترین سرویس جهت خدمات هاستینگ برای
                    سایت‌های نوپا و با بازدید کم می‌باشد. با خرید هاست این امکان
                    برای شما وجود دارد که سایت خود را بر روی هاست ارزان ایران و
                    یا هاست ارزان خارج میزبانی کنید. با هاست‌های جی سرور دیگر
                    دغدغه بک آپ را نخواهید داشت؛ چرا که جی سرور بیش از شما نگران
                    امنیت اطلاعاتتان می‌باشد! جی‌سرور با بک‌آپ گیری روزانه،
                    هفتگی و ماهانه خیال شما را از این بابت آسوده خواهد نمود!
                  </div>
                </div>
              </div>
              <div className={styles.timelineRowBox}>
                <div className={styles.splitter}>
                  <div className={styles.vline} />
                  <div className={styles.splitterIcon}>
                    <img
                      width={45}
                      height={45}
                      src="/images/main-page/services/cloud-server-shield-protect-database.svg"
                    />
                  </div>
                </div>
                <div className={styles.timelineBox}>
                  <div className={styles.title}>سرور مجازی</div>
                  <div className={styles.desc}>
                    {' '}
                    اگر به امکانات بیشتر در مدیریت وب‌سایت‌های خود و دسترسی root
                    برای سرور لینوکس و یا دسترسی administrator برای سرور ویندوز
                    نیاز دارید، خرید سرور مجازی جی سرور می‌تواند بهترین گزینه
                    برای شما در توسعه کسب و کار باشد؛ جی‌سرور امکان ارائه
                    سیستم‌عامل‌های مختلف بر روی سرورهای مجازی و حتی سرور مجازی
                    میکروتیک را نیز دارا می باشد.{' '}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={classNames(styles.circle, styles.circleBottom)} />
        </div>
      </div>
    );
  }
}

export default Services;

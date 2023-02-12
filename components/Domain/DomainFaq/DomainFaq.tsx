import classNames from 'classnames';
import * as React from 'react';
import { Container, Accordion, Card, Button } from 'react-bootstrap';
import styles from './DomainFaq.module.scss';

class DomainFaq extends React.Component {
  render() {
    return (
      <section className={styles.faq}>
        <Container>
          <h2 className={styles.faqTitle}>سوالات متداول</h2>
          <p className={styles.faqInfo}>
            پاسخ سوالات شما پیرامون خدمات ثبت دامنه جی سرور
          </p>
          <Accordion defaultActiveKey="1">
            <Card className={classNames(styles.card, styles.firstCard)}>
              <Card.Header className={styles.cardHeader}>
                <Accordion.Toggle
                  as={Button}
                  variant="link"
                  className={styles.link}
                  eventKey="0"
                >
                  <div>
                    <img
                      src="/images/domain/question.png"
                      alt="question"
                      className={styles.questionIcon}
                      width="25px"
                    />
                    <span className="text-wrap">
                      چرا دامنه خود را در جی سرور ثبت کنیم؟
                    </span>
                  </div>
                  <span>
                    <i className="fas fa-sort-down"></i>
                  </span>
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body className={styles.cardBody}>
                  اغلب کاربران سوال می کنند که بعد از خرید هاست و دامنه چه باید
                  کرد؟ در اولین گام می بایست منتظر باشید تا دامنه شما فعال شود و
                  سپس نیم سرور هاست خود را روی دامنه مریوطه ست نمایید و مدت
                  زمانی را برای نشر شدن نیم سرورها منتظر بمانید. اصولا اغلب
                  کاربران بعد از ثبت سفارش تصور می کنند اتصال هاست و دامنه سریعا
                  برقرار می شود. اما کمی بعد متوجه می شوند دامنه به هاست متصل
                  نیست! اگر دامنه فعال شد، نیم سرورها را نیز به درستی ست کردید و
                  از نشر آن نیز 24 ساعت گذشت اما همچنان سایت در دسترس قرار نگرفت
                  این مورد را با پشتیبانی خود مطرح نمایید. در این آموزش از
                  پایگاه دانش میزبان فا تصمیم داریم مراحل اتصال هاست و دامنه و
                  دلایلی که موجب عدم اتصال هاست به دامنه می شوند را به طور کامل
                  بررسی کنیم.
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
          <Accordion defaultActiveKey="1">
            <Card className={styles.card}>
              <Card.Header className={styles.cardHeader}>
                <Accordion.Toggle
                  as={Button}
                  variant="link"
                  className={styles.link}
                  eventKey="0"
                >
                  <div>
                    <img
                      src="/images/domain/question.png"
                      alt="question"
                      className={styles.questionIcon}
                      width="25px"
                    />
                    <span className="text-wrap">
                      در جی سرور چه پسوند های دامنه ای را می توانیم ثبت کنیم؟
                    </span>
                  </div>
                  <span>
                    <i className="fas fa-sort-down"></i>
                  </span>
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body className={styles.cardBody}>
                  هر وب سایتی به یک آدرس قابل دسترس نیاز دارد، این آدرس همان نام
                  دامنه‌ای است که برای سایت به ثبت می‌رسد و علاوه بر یکتا بودن
                  می‌بایست پسوندی متناسب با فعالیت سایت باشد. همچنین ثبت دامنه
                  با پسوند مرتبط با منطقه تجاری که به اصطلاح دامنه تجاری معروف
                  است، در سئو سایت موثر خواهد بود. چرا که موتورهای جستجو مانند
                  گوگل ربات های جستجوگر وب سایت‌هایی را در نتایج ابتدایی خود
                  نشان می‌دهند که پسوند دامنه آن‌ها متناسب با منطقه جغرافیایی
                  جستجوگر باشد.
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Container>
      </section>
    );
  }
}

export default DomainFaq;

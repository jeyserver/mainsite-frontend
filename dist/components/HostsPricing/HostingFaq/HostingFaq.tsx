import * as React from 'react';
import {
  Col,
  Container,
  Row,
  Dropdown,
  FormGroup,
  FormLabel,
} from 'react-bootstrap';
import Link from 'next/link';
import PagesHeader from '../../PagesHeader/PagesHeader';
import styles from './HostingFaq.module.scss';
import classNames from 'classnames';
import { NotificationManager } from 'react-notifications';
import { Formik, Form, FormikHelpers, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import backend from '../../../axios-config';
import showErrorMsg from '../../../helper/showErrorMsg';
import hosts from '../../../lib/products/host';

interface IInputs {
  name: string;
  email: string;
  text: string;
}

class HostingFaq extends React.Component {
  lastScrollTop = 0;

  componentDidMount() {
    window.addEventListener('scroll', () => this.onScroll(), false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', () => this.onScroll(), false);
  }

  onScroll() {
    var st = window.pageYOffset || document.documentElement.scrollTop;
    const nav = document.querySelector('#faq-nav') as HTMLDivElement;

    if (st > this.lastScrollTop) {
      // downscroll code
      nav.style.top = '0px';
    } else {
      // upscroll code
      nav.style.top = '80px';
    }

    let fromTop = window.scrollY;

    if (fromTop > 225) {
      nav.style.position = 'fixed';
    } else {
      nav.style.position = 'static';
    }

    this.lastScrollTop = st <= 0 ? 0 : st;
  }

  onSubmit(
    values: IInputs,
    { setSubmitting, resetForm, setErrors }: FormikHelpers<IInputs>
  ) {
    backend
      .post(
        `/contact?ajax=1&subject=طرح سوال در سوالات متداول هاست های میزبانی&name=${values.name}&email=${values.email}&text=${values.text}`
      )
      .then((res) => {
        if (res.data.status) {
          NotificationManager.success(
            'کارشناسان ما در اولین فرصت پیام شما را بررسی و پاسخ خواهند داد. از صبر شما متشکریم.',
            'پیام شما دریافت شد.'
          );
          resetForm();
        } else {
          res.data.error.map((error) => {
            setErrors({ [error.input]: showErrorMsg(error.code) });
          });
        }
      })
      .catch(() => {
        NotificationManager.error(
          'ارتباط با سامانه بدرستی انجام نشد، لطفا مجددا تلاش کنید.',
          'خطا'
        );
      })
      .finally(() => {
        setSubmitting(false);
      });
  }

  render() {
    return (
      <section>
        <PagesHeader title="سوالات متداول هاست های میزبانی" />

        <div className={styles.mainContent}>
          <Container fluid="md">
            <Row>
              <Col xs={12} className={styles.navWrapper}>
                <ul className={styles.nav} id="faq-nav">
                  <li>
                    <Dropdown className={styles.dropdown}>
                      <Dropdown.Toggle className={styles.dropdownToggle}>
                        هاست اختصاصی
                      </Dropdown.Toggle>
                      <Dropdown.Menu
                        className={styles.dropdownMenu}
                        align="right"
                      >
                        {hosts.dedicated_hosts.map((host) => (
                          <Link
                            key={host.link}
                            href={`/hosting/linux/dedicated#${host.link}`}
                          >
                            <a>هاست اختصاصی {host.title}</a>
                          </Link>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </li>
                  <li>
                    <Dropdown className={styles.dropdown}>
                      <Dropdown.Toggle className={styles.dropdownToggle}>
                        هاست نیمه اختصاصی
                      </Dropdown.Toggle>
                      <Dropdown.Menu
                        className={styles.dropdownMenu}
                        align="right"
                      >
                        {hosts.linux_vps_hosts.map((host) => (
                          <Link
                            key={host.link}
                            href={`/hosting/linux/vps#${host.link}`}
                          >
                            <a>هاست نیمه اختصاصی {host.title}</a>
                          </Link>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </li>
                  <li>
                    <Dropdown className={styles.dropdown}>
                      <Dropdown.Toggle className={styles.dropdownToggle}>
                        هاست اشتراکی لینوکس حرفه ای
                      </Dropdown.Toggle>
                      <Dropdown.Menu
                        className={styles.dropdownMenu}
                        align="right"
                      >
                        {hosts.professional_linux_shared_hosts.map((host) => (
                          <Link
                            key={host.link}
                            href={`/hosting/linux/professional#${host.link}`}
                          >
                            <a>هاست اشتراکی حرفه ای {host.title}</a>
                          </Link>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </li>
                  <li>
                    <Dropdown className={styles.dropdown}>
                      <Dropdown.Toggle className={styles.dropdownToggle}>
                        هاست اشتراکی لینوکس ساده
                      </Dropdown.Toggle>
                      <Dropdown.Menu
                        className={styles.dropdownMenu}
                        align="right"
                      >
                        {hosts.standard_linux_shared_hosts.map((host) => (
                          <Link
                            key={host.link}
                            href={`/hosting/linux/standard#${host.link}`}
                          >
                            <a>هاست اشتراکی ساده {host.title}</a>
                          </Link>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </li>
                </ul>
              </Col>
            </Row>
            <Row>
              <Col xs={12} className={styles.items}>
                <div className={styles.item}>
                  <div className={styles.body}>
                    <h4 className={styles.heading}>
                      1 - سرعت و کیفیت هاست اروپا نسبت به هاست ایران چگونه است ؟
                    </h4>
                    <Col md={10} className={styles.content}>
                      <p>
                        کاربران بسیار زیادی قبل از خرید هاست از ما این سوال را
                        پرسیده اند و همواره پاسخ ما به کاربران این بوده است که
                        سرویس های اروپا به دلیل به روز بودن قطعات سرور ها، از
                        کیفیت و آپتایم بالا و هم چنین پهنای باند بسیار بیشتری
                        نسبت به سرویس های ایران برخودار هستند .
                      </p>
                      <p>
                        در مقابل سرویس های ایران به دلیل فاصله و موقعیت
                        جفرافیایی نسبت به شما و کاربران ایرانی، از سرعت بیشتری
                        نسبت به سرویس های اروپا برخوردار هستند .
                      </p>
                    </Col>
                  </div>
                </div>

                <div className={styles.item}>
                  <div className={styles.body}>
                    <h4 className={styles.heading}>
                      2 - منظور از پردازنده و میزان آن در سرویس های هاست لینوکس
                      چیست ؟
                    </h4>
                    <Col md={10} className={styles.content}>
                      <p>
                        در واقع هاست قسمتی از یک سرور است، سرور هم مانند
                        کامپیوتر های عادی دارای cpu یا همان پردازنده هستند،جی
                        سرور جهت ارائه خدمات بهتر به هر پلن مقدار مشخصی پردازنده
                        اختصاص میدهد. درصورتی که به تازگی تصمیم به راه اندازی وب
                        سایت گرفته اید و میخواهید سایت جدیدی را راه اندازی کنید
                        باید بدانید که میزان پردازنده ای که در هاست های میزبانی
                        استاندارد ارائه شده است، برای وب سایت شما تا مدت زیادی
                        کافی هستند و تا زمان رشد وب سایت و افزایش تعداد
                        بازدیدکنندگان به میزان پردازنده بیشتری نیاز ندارید.
                      </p>
                    </Col>
                  </div>
                </div>

                <div className={styles.item}>
                  <div className={styles.body}>
                    <h4 className={styles.heading}>
                      3 - هاست های میزبانی جی سرور از چه تعداد زیر دامین، پارک
                      دامین و ادان دامین پشتیبانی می کند ؟
                    </h4>
                    <Col md={10} className={styles.content}>
                      <p>
                        در تمامی پلن های هاست میزبانی ، با کلیک بر روی دکمه
                        "اطلاعات بیشتر" در انتهای جدول مقدار دقیق این مشخصات را
                        مشاهده کنید . در تمامی پلن های هاست میزبانی جی سرور
                        محدودیتی برای زیر دامنه در نظر گرفته نشده .
                      </p>
                    </Col>
                  </div>
                </div>

                <div className={styles.item}>
                  <div className={styles.body}>
                    <h4 className={styles.heading}>
                      4 - منظور از تعداد Entry Process چیست و اگر از تعداد آن
                      بیشتر شود، چه اتفاقی رخ می دهد ؟
                    </h4>
                    <Col md={10} className={styles.content}>
                      <p>
                        تعداد بازدید های هم زمان و یا به صورت کلی تعداد درخواست
                        های همزمان از سمت کاربران به هاست میزبانی و یا تعداد
                        روند هایی که در خود هاست تعیین می شود را مشخص میکند .
                        اگر مقدار روند ها و بازدید های در لحظه به حد تعیین شده
                        برسد ، تا زمان اتمام یک روند، درخواست های جدید در حالت
                        انتظار باقی می مانند. بنابراین اگر شما صاحب یک وب سایت
                        پربازدید هستید حتما به میزان Entry Process توجه داشته
                        باشید و باتوجه به آن نسبت به انتخاب هاست میزبانی اقدام
                        کنید.
                      </p>
                    </Col>
                  </div>
                </div>

                <div className={styles.item}>
                  <div className={styles.body}>
                    <h4 className={styles.heading}>
                      5 - منظور از هارد SSD چیست و چه تفاوتی با هارد معمولی دارد
                      ؟
                    </h4>
                    <Col md={10} className={styles.content}>
                      <p>
                        هارد های SSD نسل جدید از هارد های ذخیره سازی اطلاعات
                        هستند، سرعت خواندن و نوشتن اطلاعات در این نوع هارد ها 3
                        تا 5 برابر بیشتر از هارد های معمولی است . سرعت بارگذاری
                        سایت ها در این نوع هارد به طبع سریع تر خواهد بود .
                      </p>
                    </Col>
                  </div>
                </div>

                <div className={styles.item}>
                  <div className={styles.body}>
                    <h4 className={styles.heading}>
                      6 - آیا شما به صورت رایگان برای من وردپرس یا جوملا بر روی
                      هاست نصب می کنید ؟
                    </h4>
                    <Col md={10} className={styles.content}>
                      <p>
                        اگر طرفدار سیستم های مدیریت محتوا هستید ولی همواره در
                        مراحل نصب مشکل داشتید و یا اینکه مایل نیستید مراحل نصب
                        را خودتان انجام دهید ، میتوانید بعد از تهیه هاست میزبانی
                        در تیکتی در بخش پشتیبانی جی سرور عنوان کنید . ما بعد از
                        دریافت درخواست شما ، اقدام به نصب سیستم مدیریت محتوا
                        مدنظرتان خواهیم کرد و پس از اتمام، اطلاعات را در تیکت
                        ارسال میکنیم .
                      </p>
                    </Col>
                  </div>
                </div>

                <div className={styles.item}>
                  <div className={styles.body}>
                    <h4 className={styles.heading}>
                      7 - اطلاعات من تا چه مدت پس از خرید سرویس جدید به جی سرور
                      منتقل می شود ؟
                    </h4>
                    <Col md={10} className={styles.content}>
                      <p>
                        در صورتی که قصد انتقال وب سایتتان به سرویس های هاست
                        میزبانی جی سرور را دارید ، در صورت تمایل میتوانید
                        اطلاعات سرویس قبلی خود را در بخش پشتیبانی و در قالب یک
                        تیکت ارسال کنید تا ما برای شما به رایگان و با دقت بالا
                        انتقال اطلاعات را انجام دهیم .
                      </p>
                      <p>
                        در صورتی که کنترل پنل سرویس قبلی با سرویس جدید تهیه شده
                        از جی سرور یکسان باشد ، انتقال اطلاعات زمان کوتاهی خواهد
                        بود در غیر این صورت زمان بیشتری نیاز خواهد داشت .
                      </p>
                    </Col>
                  </div>
                </div>

                <div className={styles.item}>
                  <div className={styles.body}>
                    <h4 className={styles.heading}>
                      8 - هاست های میزبانی جی سرور تا چه تعداد بازدیدکننده را در
                      روز پشتیبانی می کنند ؟
                    </h4>
                    <Col md={10} className={styles.content}>
                      <p>
                        جی سرور هیچگونه محدودیتی در تعداد بازدیدکننده در طول روز
                        بر روی سرویس های خود اعمال نکرده است و بدون محدودیت است،
                        اما شما باید توجه داشته باشید که تعداد بازدید در لحظه بر
                        روی پلن های جی سرور محدود شده است و برای انتخاب هاست
                        مناسب میبایست تعداد بازدید در لحظه وب سایت خود را مشخص
                        کنید و سپس نسبت به خرید هاست مورد نظر خود اقدام کنید.
                      </p>
                    </Col>
                  </div>
                </div>
              </Col>
            </Row>

            <Row className="justify-content-center">
              <Col md={8} className={styles.formWrapper}>
                <div id="hostingfaq-contact" className={styles.tittle}>
                  <h5>هنوز سوالی دارید ؟ بپرسید!</h5>
                  <div className={styles.divider}>
                    <div />
                  </div>
                </div>
                <Formik
                  validationSchema={Yup.object({
                    name: Yup.string().required('داده وارد شده معتبر نیست'),
                    email: Yup.string()
                      .required('داده وارد شده معتبر نیست')
                      .email('داده وارد شده معتبر نیست'),
                    text: Yup.string().required('داده وارد شده معتبر نیست'),
                  })}
                  initialValues={{ name: '', email: '', text: '' }}
                  onSubmit={(values, helpers) => this.onSubmit(values, helpers)}
                >
                  {(formik) => (
                    <Form className={styles.form}>
                      <Row>
                        <Col md={6}>
                          <Row>
                            <Col xs={12}>
                              <FormGroup
                                controlId="name"
                                className={styles.formGroup}
                              >
                                <FormLabel>نام شما</FormLabel>
                                <div className={styles.inputWrapper}>
                                  <Field
                                    type="text"
                                    name="name"
                                    className="form-control"
                                  />
                                  <div className="form-err-msg">
                                    <ErrorMessage name="name" />
                                  </div>
                                  <span className={styles.iconWrapper}>
                                    <i className="fa fa-user" />
                                  </span>
                                </div>
                              </FormGroup>
                            </Col>
                          </Row>

                          <Row>
                            <Col xs={12}>
                              <FormGroup
                                controlId="email"
                                className={styles.formGroup}
                              >
                                <FormLabel>ایمیل شما</FormLabel>
                                <div className={styles.inputWrapper}>
                                  <Field
                                    type="email"
                                    name="email"
                                    className="form-control"
                                  />
                                  <div className="form-err-msg">
                                    <ErrorMessage name="email" />
                                  </div>
                                  <span
                                    className={classNames(
                                      styles.iconWrapper,
                                      styles.left
                                    )}
                                  >
                                    <i className="fas fa-at"></i>
                                  </span>
                                </div>
                              </FormGroup>
                              <p className={styles.formDes}>
                                ایمیل شما برای پاسخگویی به سوالتان نیاز است.{' '}
                                <br /> ما هم مثل شما از ایمیل های اسپم بیزاریم !
                              </p>
                            </Col>
                          </Row>
                        </Col>
                        <Col md={6}>
                          <Row>
                            <Col xs={12}>
                              <FormGroup
                                controlId="text"
                                className={styles.formGroup}
                              >
                                <FormLabel>سوال</FormLabel>
                                <div className={styles.inputWrapper}>
                                  <Field
                                    as="textarea"
                                    rows={8}
                                    name="text"
                                    className="form-control"
                                  />
                                  <span className={styles.iconWrapper}>
                                    <i className="fa fa-comments" />
                                  </span>
                                  <div className="form-err-msg">
                                    <ErrorMessage name="text" />
                                  </div>
                                </div>
                              </FormGroup>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                      <Row className="justify-content-end">
                        <Col md={4}>
                          <button
                            className={styles.sendBtn}
                            disabled={formik.isSubmitting}
                            type="submit"
                          >
                            {formik.isSubmitting ? (
                              <div className={styles.loading}>
                                <i className="fas fa-spinner"></i>
                              </div>
                            ) : (
                              <div>
                                <div className={styles.icon}>
                                  <i className="fa fa-paper-plane" />
                                </div>
                                ارسال{' '}
                              </div>
                            )}
                          </button>
                        </Col>
                      </Row>
                    </Form>
                  )}
                </Formik>
              </Col>
            </Row>
          </Container>
        </div>
      </section>
    );
  }
}

export default HostingFaq;

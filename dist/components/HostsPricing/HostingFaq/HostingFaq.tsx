import * as React from 'react';
import { Col, Container, Row, Dropdown, Form } from 'react-bootstrap';
import Link from 'next/link';
import PagesHeader from '../../PagesHeader/PagesHeader';
import styles from './HostingFaq.module.scss';
import classNames from 'classnames';
import { NotificationManager } from 'react-notifications';
import axios from 'axios';

export interface HostingFaqProps {
  navData: any;
}

type error = 'data_validation' | 'data_duplicate';

const showError = (errorMsg: error) => {
  if (errorMsg === 'data_duplicate') {
    return 'داده وارد شده تکراری است';
  } else if (errorMsg === 'data_validation') {
    return 'داده وارد شده معتبر نیست';
  }
};

export interface HostingFaqState {
  nameInputError: error;
  emailInputError: error;
  textInputError: error;
  sendBtnLoading: boolean;
  formValidated: boolean;
}

class HostingFaq extends React.Component<HostingFaqProps, HostingFaqState> {
  constructor(props: HostingFaqProps) {
    super(props);
    this.state = {
      nameInputError: 'data_validation',
      emailInputError: 'data_validation',
      textInputError: 'data_validation',
      sendBtnLoading: false,
      formValidated: false,
    };
  }

  submitForm(e) {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      this.setState({ sendBtnLoading: true });

      axios
        // .post(
        //   `${process.env.SCHEMA}://${process.env.DOMAIN}`,
        //   {
        //     name: form.name.value,
        //     email: form.email.value,
        //     text: form.text.value,
        //   }
        // )
        .get(
          'https://jsonblob.com/api/jsobBlob/14b7037a-e155-11eb-9c37-51d866f9d6a7'
        )
        .then((respone) => {
          if (respone.data.status) {
            form.name.value = '';
            form.email.value = '';
            form.text.value = '';

            NotificationManager.success(
              'کارشناسان ما در اولین فرصت پیام شما را بررسی و پاسخ خواهند داد. از صبر شما متشکریم.',
              'پیام شما دریافت شد.'
            );
            this.setState({ formValidated: false, sendBtnLoading: false });
          } else if (!respone.data.status) {
            respone.data.error.forEach((errorItem) => {
              if (errorItem.input === 'name') {
                form.elements[0].value = '';
                this.setState({ nameInputError: errorItem.code });
              } else if (errorItem.input === 'email') {
                form.elements[2].value = '';
                this.setState({ emailInputError: errorItem.code });
              } else if (errorItem.input === 'text') {
                form.elements[3].value = '';
                this.setState({ textInputError: errorItem.code });
              }
            });
          }
        })
        .catch((error) => {
          this.setState({ sendBtnLoading: false });
          NotificationManager.error(
            'ارتباط با سامانه بدرستی انجام نشد، لطفا مجددا تلاش کنید.',
            'خطا'
          );
        });
    }

    this.setState({ formValidated: true });
  }

  componentDidMount() {
    var lastScrollTop = 0;

    const nav = document.querySelector('#faq-nav') as HTMLDivElement;

    window.addEventListener(
      'scroll',
      function () {
        var st = window.pageYOffset || document.documentElement.scrollTop;

        if (st > lastScrollTop) {
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

        lastScrollTop = st <= 0 ? 0 : st;
      },
      false
    );
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
                        {this.props.navData.dedicated_hosts.map((host) => (
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
                        {this.props.navData.linux_vps_hosts.map((host) => (
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
                        {this.props.navData.professional_linux_shared_hosts.map(
                          (host) => (
                            <Link
                              key={host.link}
                              href={`/hosting/linux/professional#${host.link}`}
                            >
                              <a>هاست اشتراکی حرفه ای {host.title}</a>
                            </Link>
                          )
                        )}
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
                        {this.props.navData.standard_linux_shared_hosts.map(
                          (host) => (
                            <Link
                              key={host.link}
                              href={`/hosting/linux/standard#${host.link}`}
                            >
                              <a>هاست اشتراکی ساده {host.title}</a>
                            </Link>
                          )
                        )}
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
                <Form
                  className={styles.form}
                  noValidate
                  validated={this.state.formValidated}
                  onSubmit={(e) => this.submitForm(e)}
                >
                  <Row>
                    <Col md={6}>
                      <Row>
                        <Col xs={12}>
                          <Form.Group
                            controlId="name"
                            className={styles.formGroup}
                          >
                            <Form.Label>نام شما</Form.Label>
                            <div className={styles.inputWrapper}>
                              <Form.Control type="text" name="name" required />
                              <Form.Control.Feedback type="invalid">
                                {showError(this.state.nameInputError)}
                              </Form.Control.Feedback>

                              <span className={styles.iconWrapper}>
                                <i className="fa fa-user" />
                              </span>
                            </div>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={12}>
                          <Form.Group
                            controlId="email"
                            className={styles.formGroup}
                          >
                            <Form.Label>ایمیل شما</Form.Label>
                            <div className={styles.inputWrapper}>
                              <Form.Control
                                type="email"
                                name="email"
                                required
                              />
                              <Form.Control.Feedback type="invalid">
                                {showError(this.state.emailInputError)}
                              </Form.Control.Feedback>
                              <span
                                className={classNames(
                                  styles.iconWrapper,
                                  styles.left
                                )}
                              >
                                <i className="fas fa-at"></i>
                              </span>
                            </div>
                          </Form.Group>
                          <p className={styles.formDes}>
                            ایمیل شما برای پاسخگویی به سوالتان نیاز است. <br />{' '}
                            ما هم مثل شما از ایمیل های اسپم بیزاریم !
                          </p>
                        </Col>
                      </Row>
                    </Col>
                    <Col md={6}>
                      <Row>
                        <Col xs={12}>
                          <Form.Group
                            controlId="text"
                            className={styles.formGroup}
                          >
                            <Form.Label>سوال</Form.Label>
                            <div className={styles.inputWrapper}>
                              <Form.Control
                                as="textarea"
                                rows={8}
                                name="text"
                                required
                              />
                              <span className={styles.iconWrapper}>
                                <i className="fa fa-comments" />
                              </span>
                              <Form.Control.Feedback type="invalid">
                                {showError(this.state.textInputError)}
                              </Form.Control.Feedback>
                            </div>
                          </Form.Group>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row className="justify-content-end">
                    <Col md={4}>
                      <button
                        className={styles.sendBtn}
                        disabled={this.state.sendBtnLoading}
                        type="submit"
                      >
                        {this.state.sendBtnLoading ? (
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
              </Col>
            </Row>
          </Container>
        </div>
      </section>
    );
  }
}

export default HostingFaq;

import { useState } from 'react';
import { InputGroup } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Container, Row, Form, Col } from 'react-bootstrap';
import styles from './ContactUs.module.scss';
import dynamic from 'next/dynamic';

const Map = dynamic(import('../Map/Map'), {
  ssr: false,
  loading: () => (
    <div style={{ textAlign: 'center', paddingTop: 20 }}>
      در حال دریافت نقشه...
    </div>
  ),
});

type error = 'data_validation' | 'data_duplicate';

const showError = (errorMsg: error) => {
  if (errorMsg === 'data_duplicate') {
    return 'داده وارد شده تکراری است';
  } else if (errorMsg === 'data_validation') {
    return 'داده وارد شده معتبر نیست';
  }
};

const ContactUs = () => {
  const [nameError, setNameError] = useState<error>('data_validation');
  const [subjectError, setSubjectError] = useState<error>('data_validation');
  const [emailError, setEmailError] = useState<error>('data_validation');

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    // {
    //   status: false,
    //   error: [
    //     {
    //       type: 'fetal',
    //       code: 'data_validation',
    //       input: 'name',
    //       error: 'data_validation',
    //     },
    //   ],
    // }
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <section>
      <div className={styles.innerBanner} id="top" data-ix="shotop-btn">
        <Container>
          <h2 className="text-center">تماس با ما</h2>
        </Container>
      </div>
      <div className={styles.section}>
        <Container>
          <h3 className={styles.hMinimal}>تماس با ما</h3>
          <div className={styles.subTitle}>
            <p>
              شما هم اکنون میتوانید با اوپراتور های ما بصورت رایگان از طریق
              سیستم گفتگوی آنلاین صحبت کنید و پاسخ پرسش هایتان را دریافت کنید.
              <br />
              لطفا اجازه بدهید که با شما هم صحبت بشویم! <b>تلفن واحد مرکزی</b>:
              ۳۴۴۲۰۳۰۱-۰۳۱
            </p>
          </div>
          <div className={styles.innerSpace}>
            <Row>
              <Col xs={12} md={8} className={styles.formWrapper}>
                <div className={styles.tittleLine}>
                  <h5>فرم تماس با ما</h5>
                  <div className={styles.divider1}>
                    <div className={styles.dividerSmall}></div>
                  </div>
                </div>
                <Form
                  className="letter-form"
                  id="contact-form"
                  noValidate
                  validated={validated}
                  onSubmit={handleSubmit}
                >
                  <Row>
                    <Col xs={12} md={6}>
                      <Form.Group className={styles.formGroup}>
                        <InputGroup hasValidation className={styles.inputGroup}>
                          <InputGroup.Prepend
                            className={styles.inputGroupPrepend}
                          >
                            <InputGroup.Text
                              id="inputGroupPrepend"
                              className={styles.inputGroupText}
                            >
                              <i className="far fa-user"></i>
                            </InputGroup.Text>
                          </InputGroup.Prepend>
                          <Form.Control
                            type="text"
                            name="name"
                            placeholder="نام شما"
                            aria-describedby="inputGroupPrepend"
                            className={styles.formControl}
                            required
                          />
                          <Form.Control.Feedback
                            type="invalid"
                            className={styles.invalidFeedbackMsg}
                          >
                            {showError(nameError)}
                          </Form.Control.Feedback>
                        </InputGroup>
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                      <Form.Group className={styles.formGroup}>
                        <InputGroup hasValidation className={styles.inputGroup}>
                          <InputGroup.Prepend
                            className={styles.inputGroupPrepend}
                          >
                            <InputGroup.Text
                              id="inputGroupPrepend"
                              className={styles.inputGroupText}
                            >
                              <i className="far fa-comment"></i>
                            </InputGroup.Text>
                          </InputGroup.Prepend>
                          <Form.Control
                            type="text"
                            name="subject"
                            placeholder="موضوع پیام"
                            aria-describedby="inputGroupPrepend"
                            className={styles.formControl}
                            required
                          />
                          <Form.Control.Feedback
                            type="invalid"
                            className={styles.invalidFeedbackMsg}
                          >
                            {showError(subjectError)}
                          </Form.Control.Feedback>
                        </InputGroup>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} md={6}>
                      <Form.Group className={styles.formGroup}>
                        <InputGroup
                          hasValidation
                          className={`${styles.inputGroup} ${styles.inputGroupLtr}`}
                        >
                          <InputGroup.Prepend
                            className={styles.inputGroupPrepend}
                          >
                            <InputGroup.Text
                              id="inputGroupPrepend"
                              className={styles.inputGroupText}
                            >
                              <i className="fas fa-at"></i>
                            </InputGroup.Text>
                          </InputGroup.Prepend>
                          <Form.Control
                            type="email"
                            name="email"
                            placeholder="ایمیل شما"
                            aria-describedby="inputGroupPrepend"
                            className={styles.formControl}
                            required
                          />
                          <Form.Control.Feedback
                            type="invalid"
                            className={styles.invalidFeedbackMsg}
                          >
                            {showError(emailError)}
                          </Form.Control.Feedback>
                        </InputGroup>
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                      <p className={styles.emailNotice}>
                        آدرس ایمیل شما برای ارسال پاسخ نیاز است
                        <br /> ما هم مثل شما از اسپم بیزاریم!
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12}>
                      <Form.Group className={styles.formGroup}>
                        <Form.Control
                          as="textarea"
                          rows={4}
                          name="text"
                          className={styles.textarea}
                          placeholder="متن پیام..."
                          required
                        ></Form.Control>
                        <div className={styles.textareaPrepend}>
                          <i className="far fa-file-alt"></i>
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="align-items-center justify-content-center">
                    <Col xs={12} md={6} className="col-sm-offset-3">
                      <Button type="submit" className={styles.sendBtn}>
                        <div className={styles.btnIco}>
                          <i className="fas fa-paper-plane"></i>
                        </div>
                        ارسال
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
              <Col xs={12} md={4} className={styles.resSpace}>
                <div className={styles.titleLine}>
                  <h5>دفتر مرکزی</h5>
                  <div className={styles.divider1}>
                    <div className={styles.dividerSmall}></div>
                  </div>
                </div>
                <div>
                  اصفهان - خیابان رباط دوم - ساختمان شمشاد - واحد 4<br />
                  (مراجعه حضوری فقط با هماهنگی قبلی امکان پذیر است)
                  <br />
                  تلفن: 34420301-031
                  <br />
                  فکس: 7716115-0311
                  <br />
                  ایمیل:{' '}
                  <a href="mailto:info@jeyserver.com">info@jeyserver.com</a>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
      <div className={styles.callToAction}>
        <a className={styles.mapBlock} href="#">
          <div className={styles.mapTxt}>ما اینجا هستیم!</div>
          <div className={styles.mapArrow}>
            <i className="fa fa-chevron-up"></i>
          </div>
        </a>
      </div>
      <div className={styles.mapContainer}>
        <Map />
      </div>
    </section>
  );
};

export default ContactUs;

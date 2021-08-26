import * as React from 'react';
import axios from 'axios';
import { Card, InputGroup } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Container, Row, Col, Form } from 'react-bootstrap';
import styles from './ContactUs.module.scss';
import { Accordion } from 'react-bootstrap';
import { NotificationManager } from 'react-notifications';
import {
  Form as FormikForm,
  Field,
  Formik,
  FormikHelpers,
  ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { RootState } from '../../store';
import showErrorMsg from '../../helper/showErrorMsg';
import PagesHeader from '../PagesHeader/PagesHeader';

// import dynamic from 'next/dynamic';

// const Map = dynamic(import('../Map/Map'), {
//   ssr: false,
//   loading: () => (
//     <div style={{ textAlign: 'center', paddingTop: 20 }}>
//       در حال دریافت نقشه...
//     </div>
//   ),
// });

interface IProps {
  language: RootState['language'];
}

interface IState {
  isMapOpen: boolean;
}

interface IInputs {
  name: string;
  subject: string;
  email: string;
  text: string;
}

class ContactUs extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isMapOpen: true,
    };
  }

  onSubmit(
    values: IInputs,
    { setSubmitting, setErrors, resetForm }: FormikHelpers<IInputs>
  ) {
    axios
      .post(
        `${process.env.SCHEMA}://${process.env.DOMAIN}/${this.props.language.locale}/contact?ajax=1&name=${values.name}&subject=${values.subject}&email=${values.email}&text=${values.text}`
        // {
        //   name: values.name,
        //   subject: values.subject,
        //   email: values.email,
        //   text: values.text,
        // }
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

          setSubmitting(false);
        }
      })
      .catch(() => {
        NotificationManager.error(
          'ارتباط با سامانه بدرستی انجام نشد، لطفا مجددا تلاش کنید.',
          'خطا'
        );
        setSubmitting(false);
      });
  }

  render() {
    return (
      <section>
        <PagesHeader title="تماس با ما" />

        <div className={styles.section}>
          <Container>
            <h3 className={styles.hMinimal}>تماس با ما</h3>
            <div className={styles.subTitle}>
              <p>
                شما هم اکنون میتوانید با اوپراتور های ما بصورت رایگان از طریق
                سیستم گفتگوی آنلاین صحبت کنید و پاسخ پرسش هایتان را دریافت کنید.
                <br />
                لطفا اجازه بدهید که با شما هم صحبت بشویم! <b>تلفن واحد مرکزی</b>
                : ۳۴۴۲۰۳۰۱-۰۳۱
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
                  <Formik
                    initialValues={{
                      name: '',
                      subject: '',
                      email: '',
                      text: '',
                    }}
                    validationSchema={Yup.object({
                      name: Yup.string().required('داده وارد شده معتبر نیست'),
                      subject: Yup.string().required(
                        'داده وارد شده معتبر نیست'
                      ),
                      email: Yup.string()
                        .required('داده وارد شده معتبر نیست')
                        .email('داده وارد شده معتبر نیست'),
                      text: Yup.string().required('داده وارد شده معتبر نیست'),
                    })}
                    onSubmit={(values, helpers) =>
                      this.onSubmit(values, helpers)
                    }
                  >
                    {(formik) => (
                      <FormikForm
                        autoComplete="off"
                        className="letter-form"
                        id="contact-form"
                      >
                        <Row>
                          <Col xs={12} md={6}>
                            <Form.Group className={styles.formGroup}>
                              <InputGroup
                                hasValidation
                                className={styles.inputGroup}
                              >
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
                                <Field
                                  type="text"
                                  name="name"
                                  placeholder="نام شما"
                                  className={classNames(
                                    'form-control',
                                    styles.formControl
                                  )}
                                />
                              </InputGroup>
                              <div className="form-err-msg">
                                <ErrorMessage name="name" />
                              </div>
                            </Form.Group>
                          </Col>

                          <Col xs={12} md={6}>
                            <Form.Group className={styles.formGroup}>
                              <InputGroup
                                hasValidation
                                className={styles.inputGroup}
                              >
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
                                <Field
                                  type="text"
                                  name="subject"
                                  placeholder="موضوع پیام"
                                  className={classNames(
                                    'form-control',
                                    styles.formControl
                                  )}
                                />
                              </InputGroup>
                              <div className="form-err-msg">
                                <ErrorMessage name="subject" />
                              </div>
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
                                <Field
                                  type="email"
                                  name="email"
                                  placeholder="ایمیل شما"
                                  className={classNames(
                                    'form-control',
                                    styles.formControl
                                  )}
                                />
                              </InputGroup>
                              <div className="form-err-msg">
                                <ErrorMessage name="email" />
                              </div>
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
                              <Field
                                as="textarea"
                                rows={4}
                                name="text"
                                className={classNames(
                                  styles.textarea,
                                  'form-control'
                                )}
                                placeholder="متن پیام..."
                              ></Field>
                              <div className="form-err-msg">
                                <ErrorMessage name="text" />
                              </div>
                              <div className={styles.textareaPrepend}>
                                <i className="far fa-file-alt"></i>
                              </div>
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row className="align-items-center justify-content-center">
                          <Col xs={12} md={6} className="col-sm-offset-3">
                            <button
                              type="submit"
                              disabled={formik.isSubmitting}
                              className={styles.sendBtn}
                            >
                              {formik.isSubmitting ? (
                                <div>
                                  <div className={styles.loading}>
                                    <div className={styles.loadingBox}></div>
                                    لطفا صبر کنید...
                                  </div>
                                </div>
                              ) : (
                                <div>
                                  <div className={styles.btnIco}>
                                    <i className="fas fa-paper-plane"></i>
                                  </div>
                                  ارسال
                                </div>
                              )}
                            </button>
                          </Col>
                        </Row>
                      </FormikForm>
                    )}
                  </Formik>
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

        <Accordion defaultActiveKey="0">
          <Card className={styles.mapAccordionCard}>
            <Card.Header className={styles.callToAction}>
              <Accordion.Toggle
                as={Button}
                variant="link"
                eventKey="0"
                className={styles.mapBlockBtn}
                onClick={() =>
                  this.setState({ isMapOpen: !this.state.isMapOpen })
                }
              >
                <div className={styles.mapBlock}>
                  <div className={styles.mapTxt}>ما اینجا هستیم!</div>
                  <div className={styles.mapArrow}>
                    {this.state.isMapOpen ? (
                      <i className="fa fa-chevron-up"></i>
                    ) : (
                      <i className="fa fa-chevron-down"></i>
                    )}
                  </div>
                </div>
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body className={styles.mapContainerBody}>
                <div className={styles.mapContainer}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3357.1408949069337!2d51.65846731518039!3d32.70888358099266!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3fbc353824657c8b%3A0x8b8d863f6bed2059!2sJeyServer+Ltd.!5e0!3m2!1sen!2sde!4v1473845192355"
                    className={styles.map}
                  ></iframe>
                </div>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </section>
    );
  }
}

export default connect((state: RootState) => {
  return {
    language: state.language,
  };
})(ContactUs);

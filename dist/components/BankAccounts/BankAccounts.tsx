import * as React from 'react';
import { Col, Container, FormLabel, Row, Table } from 'react-bootstrap';
import showErrorMsg from '../../helper/showErrorMsg';
import { Form, Field, Formik, FormikHelpers, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { IBankAccount } from '../../pages/bankaccounts';
import { NotificationManager } from 'react-notifications';
import styles from './BankAccounts.module.scss';
import PagesHeader from '../PagesHeader/PagesHeader';
import backend from '../../axios-config';

interface IProps {
  bankAccounts: IBankAccount[];
}

interface IState {
  isFormSubmited: boolean;
}

interface IInputs {
  account: number;
  cellphone: string;
}

class BankAccounts extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isFormSubmited: false,
    };
  }

  onSubmit(
    values: IInputs,
    { setSubmitting, setErrors, resetForm }: FormikHelpers<IInputs>
  ) {
    backend
      .post(
        `/bankaccounts?ajax=1&account=${values.account}&cellphone=${values.cellphone}`
      )
      .then((res) => {
        if (res.data.status) {
          NotificationManager.success(
            'کارشناسان ما در اولین فرصت پیام شما را بررسی و پاسخ خواهند داد. از صبر شما متشکریم.',
            'پیام شما دریافت شد.'
          );
          resetForm();
          this.setState({ isFormSubmited: true });

          setTimeout(() => {
            this.setState({ isFormSubmited: false });
          }, 15000);
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
      <section className="BankAccounts">
        <PagesHeader title="شماره حساب ها" />

        <div className={styles.sectionBankAccounts}>
          <Container>
            <Row className="row">
              <h2>شماره حساب ها</h2>
              <p>
                در صورتی که به هر دلیلی (مانند نداشتن حساب دارای امکان خرید
                اینترنتی یا عدم اطلاع از رمز دوم خود) تمایل دارید هزینه ی سرویس
                خود را از طریق واریز به حساب پرداخت کنید به یکی از بانکهای زیر
                مراجعه نموده و وجه مورد نظر را به حساب واریز نمایید.{' '}
              </p>
              <div
                className={`alert alert-info text-center col-sm-8 col-sm-offset-2 ${styles.alert}`}
              >
                میتوانید با استفاده از کارت بانکی عضو شبکه شتاب و رمز دوم، به
                صورت آنلاین از درگاه های بانکی برای پرداخت استفاده کنید
              </div>
              <p style={{ display: 'inline-block' }}>
                با مراجعه به اینترنت بانک مربوط به کارت خود ، عملیات کارت به
                کارت را که در گذشته از طریق دستگاههای خودپرداز انجام میدادید
                اکنون می توانید از طریق اینترنت و به صورت آنلاین انجام دهید.
              </p>
              <p>
                براي انتقال وجه به صورت كارت به كارت باید رمز دوم اینترنتی و کد
                CVV2 داشته باشید. رمز اینترنتی کارت خود را از طریق دستگاههای
                خودپرداز و بدون مراجعه به شعبه می توانید تعریف کنید. کد CVV2
                معمولا در پشت کارت حک شده است.
              </p>

              <p>
                تا پایان پیگیری پرداخت صورتحساب، شماره پیگیری انتقال وجه را در
                جای مطمئن نگهداری کنید. درصورت تمایل میتوانید با وارد کردن شماره
                همراه و انتخاب حساب ، اطلاعات حساب را در قالب یک پیام کوتاه
                دریافت کنید.
                <br />
                تایید تراکنش های واریزی ۱تا ۳ روز کاری زمان برخواهد بود، در
                حالیکه میتوانید با پرداخت از درگاه های آنلاین بانکی این زمان را
                به صفر برسانید.
              </p>
              <Col xs={12} lg={9}>
                <Table striped responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>نام بانک</th>
                      <th>صاحب حساب</th>
                      <th>شماره حساب</th>
                      <th>شماره کارت</th>
                      <th>شماره شبا</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.bankAccounts &&
                      this.props.bankAccounts.map((bankAccount) => (
                        <tr key={bankAccount.id}>
                          <td>{bankAccount.id}</td>
                          <td>{bankAccount.title}</td>
                          <td>{bankAccount.owner}</td>
                          {bankAccount.account.length > 0 ? (
                            <td className={styles.ltr}>
                              {bankAccount.account}
                            </td>
                          ) : (
                            <td className={styles.ltr + ' text-center'}>-</td>
                          )}
                          {bankAccount.cart.length > 0 ? (
                            <td className={styles.ltr}>{bankAccount.cart}</td>
                          ) : (
                            <td className={styles.ltr + ' text-center'}>-</td>
                          )}
                          {bankAccount.sheba.length > 0 ? (
                            <td className={styles.ltr}>{bankAccount.sheba}</td>
                          ) : (
                            <td className={styles.ltr + ' text-center'}>-</td>
                          )}
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </Col>
              <Col xs={12} lg={3}>
                <div className={styles.panelSend}>
                  <Formik
                    initialValues={{ account: 1, cellphone: '' }}
                    validationSchema={Yup.object({
                      account: Yup.string().required(
                        'داده وارد شده معتبر نیست'
                      ),
                      cellphone: Yup.string().required(
                        'داده وارد شده معتبر نیست'
                      ),
                    })}
                    onSubmit={(values, helpers) =>
                      this.onSubmit(values, helpers)
                    }
                  >
                    {(formik) => (
                      <Form autoComplete="off" className={styles.form}>
                        <div className={styles.panelHeading}>
                          <i className="far fa-paper-plane"></i>
                          <span>ارسال با پیام</span>
                        </div>
                        <div className={styles.panelBody}>
                          <div className={styles.formGroup}>
                            <FormLabel>حساب</FormLabel>
                            <Field name="account" as="select">
                              {this.props.bankAccounts &&
                                this.props.bankAccounts.map((bankAccount) => (
                                  <option
                                    key={bankAccount.id}
                                    value={bankAccount.id}
                                  >
                                    {bankAccount.title} ({bankAccount.account})
                                  </option>
                                ))}
                            </Field>
                            <div className="form-err-msg">
                              {!this.state.isFormSubmited && (
                                <ErrorMessage name="account" />
                              )}
                            </div>
                          </div>

                          <div className={styles.formGroup}>
                            <FormLabel>شماره همراه</FormLabel>
                            <Field
                              type="text"
                              name="cellphone"
                              className="form-control"
                              placeholder="09123456789"
                            />
                            <div className="form-err-msg">
                              {!this.state.isFormSubmited && (
                                <ErrorMessage name="cellphone" />
                              )}
                            </div>
                          </div>
                        </div>

                        <div className={styles.panelFooter}>
                          {this.state.isFormSubmited ? (
                            <button
                              type="submit"
                              className="btn btn-success btn-block"
                              disabled={true}
                            >
                              <div className={styles.sentTxt}>
                                <i className="far fa-check-square"></i>
                                <span>ارسال شد</span>
                              </div>
                            </button>
                          ) : (
                            <button
                              type="submit"
                              className="btn btn-success btn-block"
                              disabled={formik.isSubmitting}
                            >
                              {formik.isSubmitting ? (
                                <div className={styles.loadingBtn}>
                                  <span className={styles.loadingBox}></span>
                                  <span className={styles.loadingTxt}>
                                    لطفا صبر کنید...
                                  </span>
                                </div>
                              ) : (
                                <div>
                                  <i className="fas fa-paper-plane"></i> ارسال
                                </div>
                              )}
                            </button>
                          )}
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </section>
    );
  }
}

export default BankAccounts;

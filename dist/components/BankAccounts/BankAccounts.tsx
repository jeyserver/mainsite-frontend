import * as React from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import { Col, Container, FormGroup, Row, Table } from 'react-bootstrap';
import styles from './BankAccounts.module.scss';

interface bankAccount {
  id: number;
  title: string;
  owner: string;
  account: string;
  cart: string;
  sheba: string;
}

type error = 'data_validation' | 'data_duplicate';

const showError = (error: error | null) => {
  if (error === 'data_duplicate') {
    return 'داده وارد شده تکراری است';
  } else if (error === 'data_validation' || error === null) {
    return 'داده وارد شده معتبر نیست';
  }
};

export interface BankAccountsProps {
  bankAccounts: bankAccount[];
}

export interface BankAccountsState {
  validated: boolean;
  bankAccounts: bankAccount[];
  phoneNumber: string;
  selectedAccount: string;
  isBtnDisabled: boolean;
  isBtnLoading: boolean;
  phoneNumberError: error | null;
  selectedAccountError: error | null;
}

class BankAccounts extends React.Component<
  BankAccountsProps,
  BankAccountsState
> {
  constructor(props: BankAccountsProps) {
    super(props);
    this.state = {
      validated: false,
      bankAccounts: this.props.bankAccounts,
      phoneNumber: '',
      selectedAccount: '1',
      isBtnDisabled: false,
      isBtnLoading: false,
      phoneNumberError: null,
      selectedAccountError: null,
    };
    this.submitForm = this.submitForm.bind(this);
    this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
    this.onChangeSelectedAccount = this.onChangeSelectedAccount.bind(this);
  }

  submitForm(e) {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      e.preventDefault();
      this.setState({ isBtnLoading: true, isBtnDisabled: true });
      axios
        .post(
          `${process.env.SCHEMA}://${process.env.DOMAIN}/fa/bankaccounts?ajax=1`,
          {
            account: this.state.selectedAccount,
            cellPhone: this.state.phoneNumber,
          }
        )
        .then((res) => {
          this.setState({
            isBtnLoading: false,
            isBtnDisabled: true,
            phoneNumber: '',
            selectedAccount: '1',
            validated: false,
            selectedAccountError: null,
            phoneNumberError: null,
          });

          setTimeout(() => {
            this.setState({ isBtnDisabled: false });
          }, 15000);
        })
        .catch((error) => {
          this.setState({ isBtnLoading: false, isBtnDisabled: false });
        });
    }
    this.setState({ validated: true });
  }

  onChangePhoneNumber(e) {
    this.setState({ phoneNumber: e.target.value, isBtnDisabled: false });
  }

  onChangeSelectedAccount(e) {
    this.setState({ selectedAccount: e.target.value, isBtnDisabled: false });
  }

  render() {
    const showBtnContent = () => {
      if (this.state.isBtnLoading) {
        return (
          <div className={styles.loadingBtn}>
            <span className={styles.loadingBox}></span>
            <span className={styles.loadingTxt}>لطفا صبر کنید...</span>
          </div>
        );
      } else if (this.state.isBtnDisabled) {
        return (
          <div className={styles.sentTxt}>
            <i className="far fa-check-square"></i>
            <span>ارسال شد</span>
          </div>
        );
      } else {
        return (
          <div>
            <i className="fas fa-paper-plane"></i> ارسال
          </div>
        );
      }
    };

    return (
      <section className="BankAccounts">
        <div className={styles.innerBanner} id="top" data-ix="shotop-btn">
          <div className="container">
            <h2 className="text-center">شماره حساب ها</h2>
          </div>
        </div>
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
                    {this.state.bankAccounts &&
                      this.state.bankAccounts.map((bankAccount) => (
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
                  <Form
                    onSubmit={this.submitForm}
                    noValidate
                    validated={this.state.validated}
                  >
                    <div className={styles.panelHeading}>
                      <i className="far fa-paper-plane"></i>
                      <span>ارسال با پیام</span>
                    </div>
                    <div className={styles.panelBody}>
                      <FormGroup className={styles.formGroup}>
                        <Form.Label>حساب</Form.Label>
                        <Form.Control
                          as="select"
                          name="account"
                          value={this.state.selectedAccount}
                          onChange={this.onChangeSelectedAccount}
                          isInvalid={Boolean(
                            this.state.selectedAccountError !== null
                          )}
                        >
                          {this.state.bankAccounts &&
                            this.state.bankAccounts.map((bankAccount) => (
                              <option
                                key={bankAccount.id}
                                value={bankAccount.id}
                              >
                                {bankAccount.title} ({bankAccount.account})
                              </option>
                            ))}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                          {showError(this.state.selectedAccountError)}
                        </Form.Control.Feedback>
                      </FormGroup>
                      <FormGroup className={styles.formGroup}>
                        <Form.Label>شماره همراه</Form.Label>
                        <Form.Control
                          type="text"
                          name="cellphone"
                          placeholder="09123456789"
                          value={this.state.phoneNumber}
                          onChange={this.onChangePhoneNumber}
                          isInvalid={Boolean(
                            this.state.phoneNumberError !== null
                          )}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          {showError(this.state.phoneNumberError)}
                        </Form.Control.Feedback>
                      </FormGroup>
                    </div>
                    <div className={styles.panelFooter}>
                      <button
                        disabled={this.state.isBtnDisabled}
                        type="submit"
                        className="btn btn-success btn-block"
                      >
                        {showBtnContent()}
                      </button>
                    </div>
                  </Form>
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

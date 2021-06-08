import axios from 'axios';
import { useEffect, useState } from 'react';
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

const BankAccounts = () => {
  const [validated, setValidated] = useState(false);
  const [bankAccounts, setBankAccounts] = useState<bankAccount[]>([]);

  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [selectedAccount, setSelectedAccount] = useState<string>('1');

  const [isBtnDisabled, setIsBtnDisabled] = useState<boolean>(false);
  const [isBtnLoading, setIsBtnLoading] = useState<boolean>(false);
  const [phoneNumberError, setPhoneNumberError] = useState<error | null>(null);
  const [selectedAccountError, setselectedAccountError] =
    useState<error | null>(null);

  const submitForm = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      e.preventDefault();
      setIsBtnLoading(true);
      setIsBtnDisabled(true);
      axios
        .post('https://www.jeyserver.com/fa/bankaccounts?ajax=1', {
          account: '1',
          cellPhone: '09123456789',
        })
        .then((res) => {
          setIsBtnDisabled(true);
          setIsBtnLoading(false);

          setPhoneNumber('');
          setSelectedAccount('1');
          setValidated(false);

          setselectedAccountError(null);
          setPhoneNumberError(null);
          setTimeout(() => {
            setIsBtnDisabled(false);
          }, 15000);
        })
        .catch((error) => {});
    }
    setValidated(true);
  };

  const onChangePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
    setIsBtnDisabled(false);
  };

  const onChangeSelectedAccount = (e) => {
    setSelectedAccount(e.target.value);
    setIsBtnDisabled(false);
  };

  useEffect(() => {
    axios(
      'https://jsonblob.com/api/jsonBlob/8f150852-c849-11eb-ba15-3ffb1391eb2c'
    ).then((response) => {
      setBankAccounts(response.data.accounts);
    });
    // axios
    //   .get(
    //     `${process.env.SCHEMA}://${process.env.DOMAIN}/fa/bankaccounts?ajax=1`
    //   )
    //   .then(function (response) {
    //     console.log(response.data);
    //   });
  }, []);

  const showBtnContent = () => {
    if (isBtnLoading) {
      return (
        <div className={styles.loadingBtn}>
          <span className={styles.loadingBox}></span>
          <span className={styles.loadingTxt}>لطفا صبر کنید...</span>
        </div>
      );
    } else if (isBtnDisabled) {
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
              میتوانید با استفاده از کارت بانکی عضو شبکه شتاب و رمز دوم، به صورت
              آنلاین از درگاه های بانکی برای پرداخت استفاده کنید
            </div>
            <p style={{ display: 'inline-block' }}>
              با مراجعه به اینترنت بانک مربوط به کارت خود ، عملیات کارت به کارت
              را که در گذشته از طریق دستگاههای خودپرداز انجام میدادید اکنون می
              توانید از طریق اینترنت و به صورت آنلاین انجام دهید.
            </p>
            <p>
              براي انتقال وجه به صورت كارت به كارت باید رمز دوم اینترنتی و کد
              CVV2 داشته باشید. رمز اینترنتی کارت خود را از طریق دستگاههای
              خودپرداز و بدون مراجعه به شعبه می توانید تعریف کنید. کد CVV2
              معمولا در پشت کارت حک شده است.
            </p>

            <p>
              تا پایان پیگیری پرداخت صورتحساب، شماره پیگیری انتقال وجه را در جای
              مطمئن نگهداری کنید. درصورت تمایل میتوانید با وارد کردن شماره همراه
              و انتخاب حساب ، اطلاعات حساب را در قالب یک پیام کوتاه دریافت کنید.
              <br />
              تایید تراکنش های واریزی ۱تا ۳ روز کاری زمان برخواهد بود، در حالیکه
              میتوانید با پرداخت از درگاه های آنلاین بانکی این زمان را به صفر
              برسانید.
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
                  {bankAccounts &&
                    bankAccounts.map((bankAccount) => (
                      <tr key={bankAccount.id}>
                        <td>{bankAccount.id}</td>
                        <td>{bankAccount.title}</td>
                        <td>{bankAccount.owner}</td>
                        {bankAccount.account.length > 0 ? (
                          <td className={styles.ltr}>{bankAccount.account}</td>
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
                <Form onSubmit={submitForm} noValidate validated={validated}>
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
                        value={selectedAccount}
                        onChange={onChangeSelectedAccount}
                        isInvalid={Boolean(selectedAccountError !== null)}
                      >
                        {bankAccounts &&
                          bankAccounts.map((bankAccount) => (
                            <option value={bankAccount.id}>
                              {bankAccount.title} ({bankAccount.account})
                            </option>
                          ))}
                      </Form.Control>
                      <Form.Control.Feedback type="invalid">
                        {showError(selectedAccountError)}
                      </Form.Control.Feedback>
                    </FormGroup>
                    <FormGroup className={styles.formGroup}>
                      <Form.Label>شماره همراه</Form.Label>
                      <Form.Control
                        type="text"
                        name="cellphone"
                        placeholder="09123456789"
                        value={phoneNumber}
                        onChange={onChangePhoneNumber}
                        isInvalid={Boolean(phoneNumberError !== null)}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {showError(phoneNumberError)}
                      </Form.Control.Feedback>
                    </FormGroup>
                  </div>
                  <div className={styles.panelFooter}>
                    <button
                      disabled={isBtnDisabled}
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
};

export default BankAccounts;

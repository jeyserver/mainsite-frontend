import { Form } from 'react-bootstrap';
import { Col, Container, FormGroup, Row, Table } from 'react-bootstrap';
import styles from './BankAccounts.module.scss';

const BankAccounts = () => {
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
                  <tr>
                    <td>1</td>
                    <td>بانک ملی ایران</td>
                    <td>امیرحسین یگانه مهر</td>
                    <td className={styles.ltr}>0343840500006</td>
                    <td className={styles.ltr}>6037-9974-7736-4179</td>
                    <td className={styles.ltr}>IR020170000000343840500006</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>بانک ملت</td>
                    <td>امیرحسین یگانه مهر</td>
                    <td className={styles.ltr}>4776975560</td>
                    <td className={styles.ltr}>6104-3372-5138-7211</td>
                    <td className={styles.ltr}>IR950120010000004776975560</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>بانک تجارت</td>
                    <td>امیرحسین یگانه مهر</td>
                    <td className={styles.ltr}>4416592425</td>
                    <td className={styles.ltr}>6273-5319-9932-9867</td>
                    <td className={styles.ltr}>IR230180000000004416592425</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>بانک قوامین</td>
                    <td>امیرحسین یگانه مهر</td>
                    <td className={styles.ltr}>104580500755466</td>
                    <td className={styles.ltr}>6395-9911-5909-7187</td>
                    <td className={styles.ltr}>IR840520000104580500755466</td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>مؤسسه اعتباری عسگریه</td>
                    <td>امیرحسین یگانه مهر</td>
                    <td className={`${styles.ltr} text-center`}>-</td>
                    <td className={styles.ltr}>6062-5611-9858-5880</td>
                    <td className={`${styles.ltr} text-center`}>-</td>
                  </tr>
                  <tr>
                    <td>6</td>
                    <td>بانک مهر اقتصاد</td>
                    <td>امیرحسین یگانه مهر</td>
                    <td className={styles.ltr}>8361-874-13745658-1</td>
                    <td className={styles.ltr}>6393-7050-3892-9234</td>
                    <td className={`${styles.ltr} text-center`}>-</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
            <Col xs={12} lg={3}>
              <div className={styles.panelSend}>
                <form action="/fa/bankaccounts" method="POST">
                  <div className={styles.panelHeading}>
                    <i className="far fa-paper-plane"></i>
                    <span>ارسال با پیام</span>
                  </div>
                  <div className={styles.panelBody}>
                    <FormGroup className={styles.formGroup}>
                      <Form.Label>حساب</Form.Label>
                      <select name="account" className="form-control">
                        <option value="1">
                          بانک ملی ایران (0343840500006)
                        </option>
                        <option value="2">بانک ملت (4776975560)</option>
                        <option value="3">بانک تجارت (4416592425)</option>
                        <option value="4">بانک قوامین (104580500755466)</option>
                        <option value="5">مؤسسه اعتباری عسگریه ()</option>
                        <option value="6">
                          بانک مهر اقتصاد (8361-874-13745658-1)
                        </option>
                      </select>
                    </FormGroup>
                    <FormGroup className={styles.formGroup}>
                      <Form.Label>شماره همراه</Form.Label>
                      <Form.Control
                        type="text"
                        name="cellphone"
                        className="form-control ltr"
                        placeholder="09123456789"
                      />
                    </FormGroup>
                  </div>
                  <div className={styles.panelFooter}>
                    <button type="submit" className="btn btn-success btn-block">
                      <i className="fas fa-paper-plane"></i> ارسال
                    </button>
                  </div>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </section>
  );
};

export default BankAccounts;

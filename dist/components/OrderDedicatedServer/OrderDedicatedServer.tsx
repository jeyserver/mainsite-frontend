import * as React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import PagesHeader from '../PagesHeader/PagesHeader';
import OrderSteps from './OrderSteps/OrderSteps';
import styles from './OrderDedicatedServer.module.scss';
import { formatHards } from '../helper/formatHards';
import { formatSpaceInEnglish } from '../helper/formatSpace';
import { formatPrice } from '../helper/formatPrice';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { addToCart } from '../../redux/actions';
import { Alert } from 'react-bootstrap';
import CountryFlagTooltip from '../helper/components/CountryFlagTooltip';

export interface OrderDedicatedServerProps {
  serviceData: any;
  addToCart: (product: any) => void;
  cart: { cart: any; loading: boolean };
}

export interface OrderDedicatedServerState {
  backupSpace: string;
  license: string;
  os: { type: string; name: string };
  formValidated: boolean;
  isFormInvalid: boolean;
}

class OrderDedicatedServer extends React.Component<
  OrderDedicatedServerProps,
  OrderDedicatedServerState
> {
  constructor(props: OrderDedicatedServerProps) {
    super(props);
    this.state = {
      backupSpace: '-',
      os: this.props.serviceData.oses[0],
      license: '-',
      formValidated: false,
      isFormInvalid: false,
    };
    this.onChangeLicense = this.onChangeLicense.bind(this);
    this.onChangeBackupSpace = this.onChangeBackupSpace.bind(this);
    this.onChangeOs = this.onChangeOs.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  onChangeLicense(e) {
    this.setState({ license: e.target.value });
  }

  onChangeBackupSpace(e) {
    this.setState({ backupSpace: e.target.value });
  }

  onChangeOs(e) {
    const selected = this.props.serviceData.oses.find(
      (i) => i.name === e.target.value
    );
    this.setState({ os: selected });
  }

  onSubmitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    this.setState({ isFormInvalid: false });

    if (form.checkValidity() === false) {
      this.setState({ isFormInvalid: true });
      e.stopPropagation();
    } else {
      const domainHostingBackup = form.domainHostingBackup
        ? form.domainHostingBackup.value
        : null;
      const description = form.description.value;
      const os = form.os.value;

      const payment_period = this.props.serviceData.payment_periods.find(
        (payment_period) =>
          payment_period.id === Number(form.payment_period.value)
      );
      const licenseFromData = this.props.serviceData.licenses.find(
        (license) => license.id === Number(form.license.value)
      );
      const backupSpaceFromData = this.props.serviceData.backup_spaces.find(
        (backupSpace) => backupSpace.id === Number(form.backupSpace.value)
      );

      this.props.addToCart([
        {
          ...this.props.serviceData,
          description,
          os,
          payment_period,
          productType: 'dedicated_server',
        },
        licenseFromData && {
          ...licenseFromData,
          productType: 'license',
          currency: this.props.serviceData.currency,
          payment_period,
        },
        backupSpaceFromData && {
          ...backupSpaceFromData,
          productType: 'backup_space',
          domain: domainHostingBackup,
          country: this.props.serviceData.datacenter.country,
          currency: this.props.serviceData.currency,
          payment_period,
        },
      ]);
    }

    this.setState({ formValidated: true });
  }

  render() {
    console.log(this.props);

    return (
      <section>
        <PagesHeader
          title={`پیکربندی سرور اختصاصی ${this.props.serviceData.title}`}
        />

        <div className={styles.mainContent}>
          <Container>
            <Row>
              <Col md={3}>
                <OrderSteps step="configuration" />
              </Col>
              <Col md={9}>
                <Form
                  onSubmit={this.onSubmitForm}
                  noValidate
                  validated={this.state.formValidated}
                >
                  <div className={styles.service}>
                    <h2 className={styles.title}>
                      {this.props.serviceData.title}
                    </h2>
                    <div className={styles.info}>
                      <p>
                        سرویسی که انتخاب کردید دارای امکانات ساختاری زیر است :
                      </p>
                      {this.state.isFormInvalid && (
                        <Alert
                          variant="danger"
                          onClose={() =>
                            this.setState({ isFormInvalid: false })
                          }
                          className={styles.backupDangerAlert}
                          dismissible
                        >
                          <Alert.Heading>
                            <i className="fas fa-times-circle"></i>
                            <span>خطا</span>
                          </Alert.Heading>
                          <p>
                            لطفا برای ایجاد فضای بکاپ، آدرس دامنه خود را وارد
                            نمایید.
                          </p>
                        </Alert>
                      )}

                      <p>{this.props.serviceData.title}</p>
                      <div>
                        <div>
                          هارد{' '}
                          {formatHards(this.props.serviceData.hard).map(
                            (hard) => (
                              <span key={hard}>{hard}</span>
                            )
                          )}
                        </div>
                        <div>
                          {this.props.serviceData.traffic === '-' ? (
                            <span>‌ترافیک بی نهایت</span>
                          ) : (
                            this.props.serviceData.traffic
                          )}
                        </div>
                        <div>
                          پردازشگر {this.props.serviceData.cpu.title}; :: cores
                          : {this.props.serviceData.cpu.cores}, :: threads :{' '}
                          {this.props.serviceData.cpu.threads}, :: Frequency :{' '}
                          {this.props.serviceData.cpu.speed} GHz
                        </div>
                        <div>
                          حافظه موقت{' '}
                          {formatSpaceInEnglish(this.props.serviceData.ram)}
                        </div>
                        <div>
                          ماهیانه {formatPrice(this.props.serviceData.price)}
                          {this.props.serviceData.currency.title}
                        </div>
                        <div>
                          هزینه ستاپ {formatPrice(this.props.serviceData.setup)}
                          {this.props.serviceData.currency.title}
                        </div>
                        <div>
                          <span className={styles.location}>
                            موقعیت{' '}
                            {this.props.serviceData.datacenter.country.name_fa}
                          </span>
                          <CountryFlagTooltip
                            name={
                              this.props.serviceData.datacenter.country.name
                            }
                            flag={{
                              address:
                                this.props.serviceData.datacenter.country.flag,
                              width: 24,
                              height: 24,
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <Row className={styles.paymentPeriodRow}>
                      <Col md={4}>دوره پرداخت:</Col>
                      <Col md={8}>
                        <Form.Control as="select" name="payment_period">
                          {this.props.serviceData.payment_periods.map(
                            (period) => (
                              <option value={period.id} key={period.id}>
                                برای {period.month} ماه قیمت{' '}
                                {`${formatPrice(period.price)} ${
                                  this.props.serviceData.currency.title
                                }`}
                              </option>
                            )
                          )}
                        </Form.Control>
                      </Col>
                    </Row>
                    <Row className={styles.additionalFeatures}>
                      <p>
                        <strong>انتخاب های قابل پیکربندی</strong>
                      </p>
                      <p>
                        این سرویس/محصول که انتخاب نموده اید دارای امکانات اضافه
                        ای است که میتوانید برای سفارش خود انتخاب نمایید
                      </p>
                      <br />
                      <div className={styles.rowsWrapper}>
                        <div className={styles.rows}>
                          {this.props.serviceData.licenses && (
                            <div className={styles.row}>
                              <div>لایسنس</div>
                              <div>
                                <Form.Control
                                  as="select"
                                  onChange={this.onChangeLicense}
                                  name="license"
                                >
                                  <option value="-">لازم ندارم</option>
                                  {this.props.serviceData.licenses.map(
                                    (license) => (
                                      <option
                                        value={license.id}
                                        key={license.id}
                                      >
                                        {license.name} - ماهیانه قیمت:{' '}
                                        {`${formatPrice(license.price)} ${
                                          this.props.serviceData.currency.title
                                        }`}
                                      </option>
                                    )
                                  )}
                                </Form.Control>
                              </div>
                            </div>
                          )}
                          {this.props.serviceData.backup_spaces && (
                            <div className={styles.row}>
                              <div>فضای بکاپ</div>
                              <div>
                                <Form.Control
                                  as="select"
                                  name="backupSpace"
                                  onChange={this.onChangeBackupSpace}
                                >
                                  <option value="-">لازم ندارم</option>
                                  {this.props.serviceData.backup_spaces.map(
                                    (backup_space) => (
                                      <option
                                        value={backup_space.id}
                                        key={backup_space.id}
                                      >
                                        {formatSpaceInEnglish(
                                          backup_space.space
                                        )}{' '}
                                        ، قیمت :{' '}
                                        {`${formatPrice(backup_space.price)} ${
                                          this.props.serviceData.currency.title
                                        }`}{' '}
                                        ماهیانه
                                      </option>
                                    )
                                  )}
                                </Form.Control>
                              </div>
                            </div>
                          )}
                          <div
                            className={classNames(styles.row, {
                              [styles.hidden]: this.state.backupSpace === '-',
                            })}
                          >
                            <div>دامنه هاست بکاپ</div>
                            <div>
                              {this.state.backupSpace !== '-' && (
                                <>
                                  <Form.Control
                                    type="text"
                                    required
                                    name="domainHostingBackup"
                                  />
                                  <Form.Control.Feedback type="invalid">
                                    لطفا دامنه هاست بکاپ خود را وارد کنید
                                  </Form.Control.Feedback>
                                </>
                              )}
                            </div>
                          </div>

                          <div className={styles.row}>
                            <div>توضیحات</div>
                            <div>
                              <Form.Control
                                as="textarea"
                                name="description"
                                placeholder="درصورتی که میخواید توضیح خاصی در مورد آماده سازی سرور به ما بدهید لطفا آن را در اینجا ذکر کنید"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Row>
                    <div className={styles.osRow}>
                      <div>سیستم عامل</div>
                      <div>
                        <Form.Control
                          as="select"
                          name="os"
                          onChange={this.onChangeOs}
                        >
                          <optgroup label="Windows">
                            {this.props.serviceData.oses
                              .filter((i) => i.type === 'windows')
                              .map((os) => (
                                <option value={os.name} key={os.name}>
                                  {os.name}
                                </option>
                              ))}
                          </optgroup>
                          <optgroup label="linux">
                            {this.props.serviceData.oses
                              .filter((i) => i.type === 'linux')
                              .map((os) => (
                                <option value={os.name} key={os.name}>
                                  {os.name}
                                </option>
                              ))}
                          </optgroup>
                        </Form.Control>
                      </div>
                    </div>
                    <div
                      className={classNames(styles.alert, {
                        [styles.show]:
                          this.state.os.type === 'windows' &&
                          this.state.license !== '-',
                      })}
                    >
                      توجه داشته باشید که لایسنس ها مربوط به برنامه هایی هستند
                      که فقط بر روی سیستم عامل های لینوکس نصب میشوند
                    </div>
                    <Row className="justify-content-center">
                      <Col md={6}>
                        <Button
                          className={styles.nextStepBtn}
                          type="submit"
                          disabled={this.props.cart.loading}
                        >
                          {this.props.cart.loading ? (
                            <i className="fas fa-spinner"></i>
                          ) : (
                            'ادامه'
                          )}
                        </Button>
                      </Col>
                    </Row>
                  </div>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return { cart: state.cart };
};

export default connect(mapStateToProps, { addToCart })(OrderDedicatedServer);

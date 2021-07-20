import * as React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import PagesHeader from '../PagesHeader/PagesHeader';
import OrderSteps from './OrderSteps/OrderSteps';
import styles from './OrderVPS.module.scss';
import { formatHards } from '../helper/formatHards';
import {
  formatSpaceInEnglish,
  formatSpaceInPersian,
} from '../helper/formatSpace';
import { formatPrice } from '../helper/formatPrice';
import classNames from 'classnames';
import { Alert } from 'react-bootstrap';
import CountryFlagTooltip from '../helper/components/CountryFlagTooltip';

export interface OrderVPSProps {
  serviceData: any;
}

export interface OrderVPSState {
  backupSpace: string;
  license: string;
  os: { type: string; name: string };
  formValidated: boolean;
  isFormInvalid: boolean;
}

class OrderVPS extends React.Component<OrderVPSProps, OrderVPSState> {
  constructor(props: OrderVPSProps) {
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
      // save in store and go next step
    }

    this.setState({ formValidated: true });
  }

  render() {
    return (
      <section>
        <PagesHeader
          title={`پیکربندی سرور مجازی ${this.props.serviceData.title}`}
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
                          {formatSpaceInPersian(
                            this.props.serviceData.hard.space
                          )}
                          {this.props.serviceData.hard.type}
                        </div>
                        <div>
                          ترافیک{' '}
                          {this.props.serviceData.traffic === '-' ? (
                            <span className={styles.unlimited}>
                              بدون محدودیت
                            </span>
                          ) : (
                            this.props.serviceData.traffic
                          )}
                        </div>
                        <div>
                          پردازشگر {this.props.serviceData.processor} مگاهرتز
                        </div>
                        <div>
                          حافظه موقت{' '}
                          {formatSpaceInEnglish(this.props.serviceData.ram)}
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
                        <Form.Control as="select" name="payment_period" custom>
                          {this.props.serviceData.payment_periods.map(
                            (period) => (
                              <option value={period.id} key={period.id}>
                                برای {period.month} ماه قیمت :{' '}
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
                                  custom
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
                                  custom
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

                          {this.props.serviceData.rams && (
                            <div className={styles.row}>
                              <div>حافظه موقت</div>
                              <div>
                                <Form.Control as="select" name="ram" custom>
                                  <option value="-">
                                    {formatSpaceInPersian(
                                      this.props.serviceData.ram
                                    )}
                                  </option>
                                  {this.props.serviceData.rams.map((ram) => (
                                    <option value={ram.id} key={ram.id}>
                                      {formatSpaceInEnglish(ram.space)} قیمت{' '}
                                      {`${formatPrice(ram.price)} ${
                                        this.props.serviceData.currency.title
                                      }`}{' '}
                                      ماهیانه
                                    </option>
                                  ))}
                                </Form.Control>
                              </div>
                            </div>
                          )}

                          {this.props.serviceData.ips && (
                            <div className={styles.row}>
                              <div>آي پي</div>
                              <div>
                                <Form.Control as="select" name="ip" custom>
                                  <option value="-">
                                    {this.props.serviceData.ip} عدد
                                  </option>
                                  {this.props.serviceData.ips.map((ip) => (
                                    <option value={ip.id} key={ip.id}>
                                      {ip.number} عدد{' '}
                                      {ip.month === 1 && 'یک ماه'} قیمت{' '}
                                      {`${formatPrice(ip.price)} ${
                                        this.props.serviceData.currency.title
                                      }`}
                                    </option>
                                  ))}
                                </Form.Control>
                              </div>
                            </div>
                          )}

                          {this.props.serviceData.hards && (
                            <div className={styles.row}>
                              <div>هارد</div>
                              <div>
                                <Form.Control as="select" name="hard" custom>
                                  <option value="-">
                                    {formatSpaceInPersian(
                                      this.props.serviceData.hard.space
                                    )}
                                    {this.props.serviceData.hard.type}
                                  </option>
                                  {this.props.serviceData.hards.map((hard) => (
                                    <option value={hard.id} key={hard.id}>
                                      {formatSpaceInEnglish(hard.space)}{' '}
                                      {hard.type} اضافی{' '}
                                      {hard.month === 1 && 'یک ماه'} قیمت{' '}
                                      {`${formatPrice(hard.price)} ${
                                        this.props.serviceData.currency.title
                                      }`}
                                    </option>
                                  ))}
                                </Form.Control>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </Row>

                    <div className={styles.moreInfoSection}>
                      <p>
                        <strong>اطلاعات لازم دیگر</strong>
                      </p>
                      <p>
                        این سرویس/محصول نیاز به بعضی اطلاعات اضافی از شما دارد
                        تا ما بتوانیم پروسه ی سفارش شما را تکمیل نماییم
                      </p>
                      <div className={styles.osRow}>
                        <div>سیستم عامل</div>
                        <div>
                          <Form.Control
                            as="select"
                            name="os"
                            onChange={this.onChangeOs}
                            custom
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
                          // disabled={this.props.cart.loading}
                        >
                          {/* {this.props.cart.loading ? (
                            <i className="fas fa-spinner"></i>
                          ) : (
                            'ادامه'
                          )} */}
                          ادامه
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

export default OrderVPS;

import * as React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import PagesHeader from '../../PagesHeader/PagesHeader';
import OrderSteps from './OrderSteps/OrderSteps';
import styles from './OrderDedicatedServer.module.scss';
import { formatHards } from '../../../helper/formatHards';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap';
import CountryFlagTooltip from '../../../helper/components/CountryFlagTooltip/CountryFlagTooltip';
import { IDedicatedPlan } from '../../../helper/types/products/Dedicated/plan';
import ILicense from '../../../helper/types/products/License/plan';
import { IHostPlan } from '../../../helper/types/products/Host/plan';
import IOS from '../../../helper/types/products/VPS/os';
import { formatSpace } from '../../../helper/formatSpace';
import { formatPriceWithCurrency } from '../../../store/Currencies';
import { RootState } from '../../../store';

interface IProps {
  plan: IDedicatedPlan;
  licenses: ILicense[];
  backups: IHostPlan[];
  oses: IOS[];

  currencies: RootState['currencies'];
}

interface IState {
  backupSpace: string;
  license: string;
  os: IOS;
  formValidated: boolean;
  isFormInvalid: boolean;
}

class OrderDedicatedServer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      backupSpace: '-',
      os: this.props.oses[0],
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
    // const selected = this.props.oses.find(
    //   (i) => i.name === e.target.value
    // );
    // this.setState({ os: selected });
  }

  onSubmitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    this.setState({ isFormInvalid: false });

    // if (form.checkValidity() === false) {
    //   this.setState({ isFormInvalid: true });
    //   e.stopPropagation();
    // } else {
    //   const domainHostingBackup = form.domainHostingBackup
    //     ? form.domainHostingBackup.value
    //     : null;
    //   const description = form.description.value;
    //   const os = form.os.value;

    //   const payment_period = this.props.serviceData.payment_periods.find(
    //     (payment_period) =>
    //       payment_period.id === Number(form.payment_period.value)
    //   );
    //   const licenseFromData = this.props.serviceData.licenses.find(
    //     (license) => license.id === Number(form.license.value)
    //   );
    //   const backupSpaceFromData = this.props.serviceData.backup_spaces.find(
    //     (backupSpace) => backupSpace.id === Number(form.backupSpace.value)
    //   );

    //   this.props.addToCart([
    //     {
    //       ...this.props.serviceData,
    //       description,
    //       os,
    //       payment_period,
    //       productType: 'dedicated_server',
    //     },
    //     licenseFromData && {
    //       ...licenseFromData,
    //       productType: 'license',
    //       currency: this.props.serviceData.currency,
    //       payment_period,
    //     },
    //     backupSpaceFromData && {
    //       ...backupSpaceFromData,
    //       productType: 'backup_space',
    //       domain: domainHostingBackup,
    //       country: this.props.serviceData.datacenter.country,
    //       currency: this.props.serviceData.currency,
    //       payment_period,
    //     },
    //   ]);
    // }

    // this.setState({ formValidated: true });
  }

  render() {
    return (
      <section>
        <PagesHeader title={`پیکربندی سرور اختصاصی ${this.props.plan.title}`} />

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
                    <h2 className={styles.title}>{this.props.plan.title}</h2>
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

                      <p>{this.props.plan.title}</p>
                      <div>
                        <div>
                          هارد{' '}
                          {formatHards(this.props.plan.hard).map((hard) => (
                            <span key={hard}>{hard}</span>
                          ))}
                        </div>
                        <div>
                          {this.props.plan.bandwidth ? (
                            formatSpace(this.props.plan.bandwidth, 'fa')
                          ) : (
                            <span>‌ترافیک بی نهایت</span>
                          )}
                        </div>
                        <div>
                          پردازشگر {this.props.plan.cpu.title}; :: cores :{' '}
                          {this.props.plan.cpu.cores}, :: threads :{' '}
                          {this.props.plan.cpu.threads}, :: Frequency :{' '}
                          {this.props.plan.cpu.speed} GHz
                        </div>
                        <div>
                          حافظه موقت{' '}
                          <span className="ltr">
                            {formatSpace(this.props.plan.ram, 'en')}
                          </span>
                        </div>
                        <div>
                          ماهیانه{' '}
                          {formatPriceWithCurrency(
                            this.props.currencies,
                            this.props.plan.currency,
                            this.props.plan.price
                          )}
                        </div>
                        {this.props.plan.setup !== 0 && (
                          <div>
                            هزینه ستاپ{' '}
                            {formatPriceWithCurrency(
                              this.props.currencies,
                              this.props.plan.currency,
                              this.props.plan.setup
                            )}
                          </div>
                        )}

                        <div>
                          <span className={styles.location}>
                            موقعیت {this.props.plan.datacenter.country.name}
                          </span>
                          <CountryFlagTooltip
                            country={this.props.plan.datacenter.country}
                          />
                        </div>
                      </div>
                    </div>

                    <Row className={styles.paymentPeriodRow}>
                      <Col md={4}>دوره پرداخت:</Col>
                      <Col md={8}>
                        <Form.Control as="select" name="payment_period" custom>
                          {Array(12)
                            .fill('')
                            .map((period, index) => (
                              <option value={index + 1} key={index + 1}>
                                برای {index + 1} ماه قیمت :{' '}
                                {formatPriceWithCurrency(
                                  this.props.currencies,
                                  this.props.plan.currency,
                                  this.props.plan.price * (index + 1)
                                )}
                              </option>
                            ))}
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
                          {this.props.licenses && (
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
                                  {this.props.licenses.map((license) => (
                                    <option value={license.id} key={license.id}>
                                      {license.title} قیمت :{' '}
                                      {formatPriceWithCurrency(
                                        this.props.currencies,
                                        license.currency,
                                        license.price
                                      )}
                                    </option>
                                  ))}
                                </Form.Control>
                              </div>
                            </div>
                          )}
                          {this.props.backups && (
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
                                  {this.props.backups.map((backupSpace) => (
                                    <option
                                      value={backupSpace.id}
                                      key={backupSpace.id}
                                    >
                                      {formatSpace(
                                        backupSpace.space,
                                        'en',
                                        true
                                      )}{' '}
                                      ، قیمت :‌{' '}
                                      {formatPriceWithCurrency(
                                        this.props.currencies,
                                        backupSpace.currency,
                                        backupSpace.price
                                      )}
                                    </option>
                                  ))}
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
                          custom
                        >
                          <optgroup label="Windows">
                            {this.props.oses
                              .filter((i) => i.base === 'windows')
                              .map((os) => (
                                <option value={os.id} key={os.id}>
                                  {os.title}
                                </option>
                              ))}
                          </optgroup>
                          <optgroup label="linux">
                            {this.props.oses
                              .filter((i) => i.base === 'linux')
                              .map((os) => (
                                <option value={os.id} key={os.id}>
                                  {os.title}
                                </option>
                              ))}
                          </optgroup>
                        </Form.Control>
                      </div>
                    </div>
                    <div
                      className={classNames(styles.alert, {
                        [styles.show]:
                          this.state.os.base === 'windows' &&
                          this.state.license !== '-',
                      })}
                    >
                      توجه داشته باشید که لایسنس ها مربوط به برنامه هایی هستند
                      که فقط بر روی سیستم عامل های لینوکس نصب میشوند
                    </div>
                    <Row className="justify-content-center">
                      <Col md={6}>
                        <Button className={styles.nextStepBtn} type="submit">
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

export default connect((state: RootState) => {
  return {
    currencies: state.currencies,
  };
})(OrderDedicatedServer);

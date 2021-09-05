import * as React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import PagesHeader from '../../PagesHeader/PagesHeader';
import OrderSteps from './OrderSteps/OrderSteps';
import styles from './OrderVPS.module.scss';
import { formatHards } from '../../helper/formatHards';
import classNames from 'classnames';
import { Alert } from 'react-bootstrap';
import CountryFlagTooltip from '../../../helper/components/CountryFlagTooltip/CountryFlagTooltip';
import { IVPSPlan } from '../../../helper/types/products/VPS/plan';
import IAddon, { AddonType } from '../../../helper/types/products/VPS/addon';
import ILicense from '../../../helper/types/products/License/plan';
import { IHostPlan } from '../../../helper/types/products/Host/plan';
import IOS from '../../../helper/types/products/VPS/os';
import { Formik, FormikHelpers, Form, Field, ErrorMessage } from 'formik';
import { formatSpace } from '../../../helper/formatSpace';
import translateCountryNameToPersian from '../../../helper/translateCountryNameToPersian';
import getPlanPP from '../../../helper/getPlanPP';
import { formatPriceWithCurrency } from '../../../store/Currencies';
import { connect } from 'react-redux';
import { RootState } from '../../../store';
import getHardType from '../../../helper/getHardType';

interface IProps {
  plan: IVPSPlan;
  addons: IAddon[];
  licenses: ILicense[];
  hosts: IHostPlan[];
  oses: IOS[];
  currencies: RootState['currencies'];
}

interface OrderVPSState {
  backupSpace: string;
  license: string;
  os: IOS;
}

interface IInputs {
  period: string;
  license: string;
  backup: string;
  domain: string;
  ram: string;
  ip: string;
  hard: string;
  os: string;
}

class OrderVPS extends React.Component<IProps, OrderVPSState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      backupSpace: '-',
      os: this.props.oses.filter((i) => i.base === 'windows')[0],
      license: '-',
    };
    this.onChangeLicense = this.onChangeLicense.bind(this);
    this.onChangeBackupSpace = this.onChangeBackupSpace.bind(this);
    this.onChangeOs = this.onChangeOs.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeLicense(e) {
    this.setState({ license: e.target.value });
  }

  onChangeBackupSpace(e) {
    this.setState({ backupSpace: e.target.value });
  }

  onChangeOs(e) {
    const selected = this.props.oses.find(
      (i) => i.id === Number(e.target.value)
    );
    this.setState({ os: selected });
  }

  onSubmit(values: IInputs, { setSubmitting }: FormikHelpers<IInputs>) {}

  getRam(ram: string) {
    return parseInt(ram.replace(/^\D+/g, '').match(/\d+/)[0]);
  }

  render() {
    return (
      <section>
        <PagesHeader title={`پیکربندی سرور مجازی ${this.props.plan.title}`} />

        <div className={styles.mainContent}>
          <Container>
            <Row>
              <Col md={3}>
                <OrderSteps step="configuration" />
              </Col>

              <Col md={9}>
                <Formik
                  initialValues={{
                    period: '',
                    license: '',
                    backup: '',
                    domain: '',
                    ram: '',
                    ip: '',
                    hard: '',
                    os: '',
                  }}
                  onSubmit={(values, helpers) => this.onSubmit(values, helpers)}
                >
                  {(formik) => (
                    <Form>
                      <div className={styles.service}>
                        <h2 className={styles.title}>
                          {this.props.plan.title}
                        </h2>
                        <div className={styles.info}>
                          {/* {this.state.isFormInvalid && (
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
                                لطفا برای ایجاد فضای بکاپ، آدرس دامنه خود را
                                وارد نمایید.
                              </p>
                            </Alert>
                          )} */}

                          <p>{this.props.plan.title}</p>
                          <div>
                            <div>
                              هارد {formatSpace(this.props.plan.hard, 'fa')}
                              SATA
                            </div>
                            <div>
                              ترافیک{' '}
                              {!this.props.plan.bandwidth ? (
                                <span className={styles.unlimited}>
                                  بدون محدودیت
                                </span>
                              ) : (
                                formatSpace(this.props.plan.bandwidth, 'fa')
                              )}
                            </div>
                            <div>پردازشگر {this.props.plan.cpu} مگاهرتز</div>
                            <div>
                              حافظه موقت{' '}
                              {formatSpace(this.props.plan.ram, 'fa')}
                            </div>
                            <div>
                              <span className={styles.location}>
                                موقعیت{' '}
                                {translateCountryNameToPersian(
                                  this.props.plan.country.code
                                )}
                              </span>
                              <CountryFlagTooltip
                                country={this.props.plan.country}
                              />
                            </div>
                          </div>
                        </div>

                        <Row className={styles.paymentPeriodRow}>
                          <Col md={4}>دوره پرداخت:</Col>
                          <Col md={8}>
                            <Field as="select" name="period">
                              <option value="1">
                                برای 1 ماه قیمت :‌{' '}
                                {formatPriceWithCurrency(
                                  this.props.currencies,
                                  this.props.plan.currency,
                                  this.props.plan.price
                                )}
                              </option>
                            </Field>
                            <div className="form-err-msg">
                              <ErrorMessage name="period" />
                            </div>
                          </Col>
                        </Row>

                        <Row className={styles.additionalFeatures}>
                          <p>
                            <strong>انتخاب های قابل پیکربندی</strong>
                          </p>
                          <p>
                            این سرویس/محصول که انتخاب نموده اید دارای امکانات
                            اضافه ای است که میتوانید برای سفارش خود انتخاب
                            نمایید
                          </p>

                          <br />
                          <div className={styles.rowsWrapper}>
                            <div className={styles.rows}>
                              {this.props.licenses && (
                                <div className={styles.row}>
                                  <div>لایسنس</div>
                                  <div>
                                    <Field
                                      as="select"
                                      onChange={this.onChangeLicense}
                                      value={this.state.license}
                                      name="license"
                                    >
                                      <option value="-">لازم ندارم</option>
                                      {this.props.licenses.map((license) => (
                                        <option
                                          value={license.id}
                                          key={license.id}
                                        >
                                          {license.title} قیمت:{' '}
                                          {formatPriceWithCurrency(
                                            this.props.currencies,
                                            license.currency,
                                            license.price
                                          )}
                                        </option>
                                      ))}
                                    </Field>
                                  </div>
                                </div>
                              )}

                              {this.props.hosts && (
                                <div className={styles.row}>
                                  <div>فضای بکاپ</div>
                                  <div>
                                    <Field
                                      as="select"
                                      name="backup"
                                      onChange={this.onChangeBackupSpace}
                                      value={this.state.backupSpace}
                                      className="form-control"
                                    >
                                      <option value="-">لازم ندارم</option>
                                      {this.props.hosts.map((host) => (
                                        <option value={host.id} key={host.id}>
                                          {formatSpace(host.space, 'en', true)}{' '}
                                          ، قیمت :{' '}
                                          {formatPriceWithCurrency(
                                            this.props.currencies,
                                            host.currency,
                                            host.price
                                          )}{' '}
                                          ماهیانه
                                        </option>
                                      ))}
                                    </Field>
                                    <div className="form-err-msg">
                                      <ErrorMessage name="backup" />
                                    </div>
                                  </div>
                                </div>
                              )}

                              <div
                                className={classNames(styles.row, {
                                  [styles.hidden]:
                                    this.state.backupSpace === '-',
                                })}
                              >
                                <div>دامنه هاست بکاپ</div>
                                <div>
                                  {this.state.backupSpace !== '-' && (
                                    <>
                                      <Field
                                        type="text"
                                        name="domain"
                                        className="form-control"
                                      />
                                      <div className="form-err-msg">
                                        <ErrorMessage name="domain" />
                                      </div>
                                    </>
                                  )}
                                </div>
                              </div>

                              {this.props.addons.some(
                                (addon) => addon.addon.type === AddonType.Ram
                              ) && (
                                <div className={styles.row}>
                                  <div>حافظه موقت</div>
                                  <div>
                                    <Field
                                      as="select"
                                      name="ram"
                                      className="form-control"
                                    >
                                      <option value="-">
                                        {formatSpace(this.props.plan.ram, 'fa')}
                                      </option>
                                      {this.props.addons
                                        .filter(
                                          (addon) =>
                                            addon.addon.type === AddonType.Ram
                                        )
                                        .map((ram) => (
                                          <option value={ram.id} key={ram.id}>
                                            {formatSpace(
                                              this.props.plan.ram +
                                                this.getRam(ram.addon.title),
                                              'fa',
                                              false,
                                              2
                                            )}{' '}
                                            قیمت{' '}
                                            {formatPriceWithCurrency(
                                              this.props.currencies,
                                              ram.currency,
                                              ram.price
                                            )}{' '}
                                            ماهیانه
                                          </option>
                                        ))}
                                    </Field>
                                  </div>
                                </div>
                              )}

                              {this.props.plan.addonip && (
                                <div className={styles.row}>
                                  <div>آي پي</div>
                                  <div>
                                    <Field as="select" name="ip" custom>
                                      <option value="-">1 عدد</option>
                                      {Array(3)
                                        .fill('')
                                        .map((ip, index) => (
                                          <option
                                            value={index + 1}
                                            key={index + 1}
                                          >
                                            {index + 2} عدد یک ماه قیمت{' '}
                                            {formatPriceWithCurrency(
                                              this.props.currencies,
                                              this.props.plan.currency,
                                              this.props.plan.addonip *
                                                (index + 1)
                                            )}
                                          </option>
                                        ))}
                                    </Field>
                                  </div>
                                </div>
                              )}

                              {this.props.addons.some(
                                (addon) => addon.addon.type === AddonType.Hard
                              ) && (
                                <div className={styles.row}>
                                  <div>هارد</div>
                                  <div>
                                    <Field
                                      as="select"
                                      name="hard"
                                      className="form-control"
                                    >
                                      <option value="-">
                                        {formatSpace(
                                          this.props.plan.hard,
                                          'fa'
                                        )}{' '}
                                        {getHardType(this.props.plan.hardtype)}
                                      </option>

                                      {this.props.addons
                                        .filter(
                                          (addon) =>
                                            addon.addon.type === AddonType.Hard
                                        )
                                        .map((hard) => (
                                          <option value={hard.id} key={hard.id}>
                                            {hard.addon.title} اضافی یک ماه قیمت{' '}
                                            {formatPriceWithCurrency(
                                              this.props.currencies,
                                              hard.currency,
                                              hard.price
                                            )}
                                          </option>
                                        ))}
                                    </Field>
                                    <div className="form-err-msg">
                                      <ErrorMessage name="hard" />
                                    </div>
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
                            این سرویس/محصول نیاز به بعضی اطلاعات اضافی از شما
                            دارد تا ما بتوانیم پروسه ی سفارش شما را تکمیل نماییم
                          </p>
                          <div className={styles.osRow}>
                            <div>سیستم عامل </div>
                            <div>
                              <Field
                                as="select"
                                name="os"
                                onChange={this.onChangeOs}
                                value={this.state.os.id}
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
                              </Field>
                            </div>
                          </div>
                        </div>

                        <div
                          className={classNames(styles.alert, {
                            [styles.show]:
                              this.state.os.base === 'windows' &&
                              this.state.license !== '-',
                          })}
                        >
                          توجه داشته باشید که لایسنس ها مربوط به برنامه هایی
                          هستند که فقط بر روی سیستم عامل های لینوکس نصب میشوند
                        </div>

                        <Row className="justify-content-center">
                          <Col md={6}>
                            <Button
                              className={styles.nextStepBtn}
                              type="submit"
                              disabled={formik.isSubmitting}
                            >
                              {formik.isSubmitting ? (
                                <i className="fas fa-spinner"></i>
                              ) : (
                                'ادامه'
                              )}
                              ادامه
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    </Form>
                  )}
                </Formik>
              </Col>
            </Row>
          </Container>
        </div>
      </section>
    );
  }
}

export default connect((state: RootState) => {
  return { currencies: state.currencies };
})(OrderVPS);

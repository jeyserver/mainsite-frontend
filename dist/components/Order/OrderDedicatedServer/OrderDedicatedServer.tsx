import * as React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
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
import { AsyncThunkAction, RootState } from '../../../store';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { NotificationManager } from 'react-notifications';
import {
  addDedicated as addDedicatedToCart,
  IAddDedicated,
} from '../../../store/Cart';
import { NextRouter, withRouter } from 'next/router';
import showErrorMsg from '../../../helper/showErrorMsg';

interface IProps {
  plan: IDedicatedPlan;
  licenses: ILicense[];
  backups: IHostPlan[];
  oses: IOS[];
  currencies: RootState['currencies'];
  router: NextRouter;
  addDedicatedToCart: AsyncThunkAction<any, IAddDedicated>;
}

interface IState {
  backup: string;
  license: string;
  domain: string;
  os: IOS;
  showDomainAlert: boolean;
}

interface IInputs {
  period: string;
  license: string;
  backup: string;
  description: string;
  os: string;
}

class OrderDedicatedServer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      backup: '',
      license: '',
      domain: '',
      os: this.props.oses.find((i) => i.base === 'windows'),
      showDomainAlert: false,
    };
  }

  onChangeLicense(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ license: e.target.value });
  }

  onChangeBackupSpace(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ backup: e.target.value });
  }

  onChangeDomain(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ domain: e.target.value, showDomainAlert: false });
  }

  onChangeOs(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = this.props.oses.find(
      (i) => i.id === Number(e.target.value)
    );
    if (selected) {
      this.setState({ os: selected });
    }
  }

  async onSubmit(
    values: IInputs,
    { setSubmitting, setErrors, setFieldError }: FormikHelpers<IInputs>
  ) {
    try {
      const res = await this.props
        .addDedicatedToCart({
          period: values.period,
          license: this.state.license,
          backup: this.state.backup,
          domain: this.state.domain,
          description: values.description,
          os: this.state.os.id.toString(),
          id: this.props.plan.id,
        })
        .unwrap();
      if (res.data.status) {
        this.props.router.push('/order/cart/review');
      } else {
        res.data.error.map((error) => {
          setErrors({ [error.input]: showErrorMsg(error.code) });
        });
        if (!res.data.error[0].code && this.state.domain === '') {
          this.setState({ showDomainAlert: true });
          setFieldError('domain', showErrorMsg('data_validation'));
        }
      }
    } catch (error) {
      NotificationManager.error(
        'ارتباط با سامانه بدرستی انجام نشد، لطفا مجددا تلاش کنید.',
        'خطا'
      );
    } finally {
      setSubmitting(false);
    }
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
                <Formik
                  initialValues={{
                    period: '1',
                    license: '',
                    backup: '',
                    domain: '',
                    description: '',
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
                          <p>
                            سرویسی که انتخاب کردید دارای امکانات ساختاری زیر است
                            :
                          </p>
                          {this.state.showDomainAlert && (
                            <Alert
                              variant="danger"
                              onClose={() =>
                                this.setState({ showDomainAlert: false })
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
                            <Field
                              className="form-control"
                              as="select"
                              name="period"
                            >
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
                              <div className={styles.row}>
                                <div>لایسنس</div>
                                <div>
                                  <Field
                                    className="form-control"
                                    as="select"
                                    onChange={(e) => this.onChangeLicense(e)}
                                    value={this.state.license}
                                    name="license"
                                  >
                                    <option value="">لازم ندارم</option>
                                    {this.props.licenses.map((license) => (
                                      <option
                                        value={license.id}
                                        key={license.id}
                                      >
                                        {license.title} قیمت :{' '}
                                        {formatPriceWithCurrency(
                                          this.props.currencies,
                                          license.currency,
                                          license.price
                                        )}
                                      </option>
                                    ))}
                                  </Field>
                                  <div className="form-err-msg">
                                    <ErrorMessage name="license" />
                                  </div>
                                </div>
                              </div>
                              <div className={styles.row}>
                                <div>فضای بکاپ</div>
                                <div>
                                  <Field
                                    className="form-control"
                                    as="select"
                                    name="backup"
                                    onChange={(e) =>
                                      this.onChangeBackupSpace(e)
                                    }
                                    value={this.state.backup}
                                  >
                                    <option value="">لازم ندارم</option>
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
                                  </Field>
                                  <div className="form-err-msg">
                                    <ErrorMessage name="backup" />
                                  </div>
                                </div>
                              </div>

                              <div
                                className={classNames(styles.row, {
                                  [styles.hidden]:
                                    this.state.backup.trim() === '',
                                })}
                              >
                                <div>دامنه هاست بکاپ</div>
                                <div>
                                  {this.state.backup.trim() !== '' && (
                                    <>
                                      <Field
                                        className="form-control"
                                        type="text"
                                        name="domain"
                                        onChange={(e) => this.onChangeDomain(e)}
                                        value={this.state.domain}
                                      />
                                      <div className="form-err-msg">
                                        <ErrorMessage name="domain" />
                                      </div>
                                    </>
                                  )}
                                </div>
                              </div>

                              <div className={styles.row}>
                                <div>توضیحات</div>
                                <div>
                                  <Field
                                    className="form-control"
                                    as="textarea"
                                    name="description"
                                    placeholder="درصورتی که میخواید توضیح خاصی در مورد آماده سازی سرور به ما بدهید لطفا آن را در اینجا ذکر کنید"
                                  />
                                  <div className="form-err-msg">
                                    <ErrorMessage name="description" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Row>
                        <div className={styles.osRow}>
                          <div>سیستم عامل</div>
                          <div>
                            <Field
                              className="form-control"
                              as="select"
                              name="os"
                              onChange={(e) => this.onChangeOs(e)}
                              value={this.state.os.id}
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
                            </Field>
                            <div className="form-err-msg">
                              <ErrorMessage name="os" />
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
                              disabled={formik.isSubmitting}
                              type="submit"
                            >
                              {formik.isSubmitting ? (
                                <i className="fas fa-spinner"></i>
                              ) : (
                                'ادامه'
                              )}
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

export default withRouter(
  connect(
    (state: RootState) => {
      return {
        currencies: state.currencies,
      };
    },
    { addDedicatedToCart }
  )(OrderDedicatedServer)
);

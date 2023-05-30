import * as React from 'react';
import { Container, Row, Col, Button, FormLabel, FormGroup, FormControl } from 'react-bootstrap';
import PagesHeader from '../../PagesHeader/PagesHeader';
import OrderSteps from './OrderSteps/OrderSteps';
import styles from './OrderVPS.module.scss';
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
import { NotificationManager } from 'react-notifications';
import { formatPriceWithCurrency } from '../../../store/Currencies';
import { connect } from 'react-redux';
import { AsyncThunkAction, RootState } from '../../../store';
import getHardType from '../../../helper/getHardType';
import showErrorMsg from '../../../helper/showErrorMsg';
import { NextRouter, withRouter } from 'next/router';
import {
  addVPS as addVPSToCart,
  IAddVPS,
} from '../../../store/Cart';

interface IProps {
  plan: IVPSPlan;
  addons: IAddon[];
  licenses: ILicense[];
  hosts: IHostPlan[];
  oses: IOS[];
  currencies: RootState['currencies'];
  router: NextRouter;
  addVPSToCart: AsyncThunkAction<any, IAddVPS>;
}

interface OrderVPSState {
  backup: string;
  license: string;
  os: IOS;
  domain: string;
  showDomainAlert: boolean;
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
      backup: '',
      os: this.props.oses[0],
      license: '',
      domain: '',
      showDomainAlert: false,
    };
  }

  onChangeField(
    e: React.ChangeEvent<FormControlElement>,
    field: 'backup' | 'license' | 'domain'
  ) {
    this.setState({ [field]: e.target.value } as any);
  }

  onChangeOs(e: React.ChangeEvent<FormControlElement>) {
    const selected = this.props.oses.find(
      (i) => i.id === Number(e.target.value)
    );
    this.setState({ os: selected });
  }

  async onSubmit(
    values: IInputs,
    { setSubmitting, setErrors, setFieldError }: FormikHelpers<IInputs>
  ) {
    try {
      const res = await this.props
        .addVPSToCart({
          id: this.props.plan.id,
          period: values.period,
          license: this.state.license,
          backup: this.state.backup,
          domain: this.state.domain,
          ram: values.ram,
          ip: values.ip,
          hard: values.hard,
          os: this.state.os.id.toString(),
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
      console.log('error', error);
      NotificationManager.error(
        'ارتباط با سامانه بدرستی انجام نشد، لطفا مجددا تلاش کنید.',
        'خطا'
      );
    } finally {
      setSubmitting(false);
    }
  }

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
                    period: '1',
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
                          پیکربندی
                        </h2>
                        <div className={styles['configuration-container']}>
                          <div className={styles.info}>
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
                          </div>
                          <h3 className={styles.h3}>مشخصات پلن انتخاب شده:</h3>
                          <Row className={styles['panel-info']}>
                            <Col sm={6}>
                              <Row className={styles['row-label']}>
                                <Col sm={5}>
                                  <FormLabel>
                                    <i className="align-middle fa fa-server" aria-hidden="true"></i> {' '}
                                    پلن:
                                  </FormLabel>
                                </Col>
                                <Col xs={7}><strong>{this.props.plan.title}</strong></Col>
                              </Row>
                              <Row className={styles['row-label']}>
                                <Col xs={5}>
                                  <FormLabel>
                                    <i className="align-middle fa fa-hdd" aria-hidden="true"></i> {' '}
                                    هارد:
                                  </FormLabel>
                                </Col>
                                <Col xs={7}>
                                  {formatSpace(this.props.plan.hard, 'fa')} {' '}
                                  <b>NVMe</b>
                                </Col>
                              </Row>
                              <Row className={styles['row-label']}>
                                <Col xs={5}>
                                  <FormLabel>
                                    <i className="align-middle fa fa-exchange-alt" aria-hidden="true"></i> {' '}
                                    ترافیک:
                                  </FormLabel>
                                </Col>
                                <Col xs={7}>
                                {!this.props.plan.bandwidth ? (
                                  <span className={styles.unlimited}>
                                    بدون محدودیت
                                  </span>
                                ) : (
                                  formatSpace(this.props.plan.bandwidth, 'fa')
                                )}
                                </Col>
                              </Row>
                              <Row className={styles['row-label']}>
                                <Col xs={5}>
                                  <FormLabel>
                                    <i className="align-middle fa fa-globe" aria-hidden="true"></i> {' '}
                                    موقعیت:
                                  </FormLabel>
                                </Col>
                                <Col xs={7}>
                                  <span className={`flag-icon flag-icon-${this.props.plan.country.code.toLowerCase()}`}></span> {' '}
                                  {translateCountryNameToPersian(
                                    this.props.plan.country.code
                                  )} {' '}
                                  - {' '}
                                  {this.props.plan.location.city}
                                </Col>
                              </Row>
                            </Col>
                            <Col sm={6}>
                              <Row className={styles['row-label']}>
                                <Col xs={5}>
                                  <FormLabel>
                                    <i className="align-middle fa fa-microchip" aria-hidden="true"></i> {' '}
                                    پردازشگر:
                                  </FormLabel>
                                </Col>
                                <Col xs={7}>{this.props.plan.cpu / 3500} هسته</Col>
                              </Row>
                              <Row className={styles['row-label']}>
                                <Col xs={5}>
                                  <FormLabel>
                                    <i className="align-middle fa fa-chart-pie" aria-hidden="true"></i> {' '}
                                    حافظه موقت:
                                  </FormLabel>
                                </Col>
                                <Col xs={7}>{formatSpace(this.props.plan.ram, 'fa')}</Col>
                              </Row>
                              <Row className={styles['row-label']}>
                                <Col xs={5}>
                                  <FormLabel>
                                    <i className="align-middle fa fa-signal" aria-hidden="true"></i> {' '}
                                    نوع شبکه:
                                  </FormLabel>
                                </Col>
                                <Col xs={7}>آدرس IPV4</Col>
                              </Row>
                              <Row className={styles['row-label']}>
                                <Col xs={5}>
                                  <FormLabel>
                                    <i className="align-middle fa fa-fire" aria-hidden="true"></i> {' '}
                                    فایروال:
                                  </FormLabel>
                                </Col>
                                <Col xs={7}>پیش فرض</Col>
                              </Row>
                            </Col>
                          </Row>
                          <Row className={styles['row-label']}>
                            <Col sm={6} className="mb-2">
                              <FormGroup>
                                <FormLabel>دوره پرداخت:</FormLabel>
                                <FormControl as="select" name="period">
                                  <option value="1">
                                    برای 1 ماه قیمت :‌{' '}
                                    {formatPriceWithCurrency(
                                      this.props.currencies,
                                      this.props.plan.currency,
                                      this.props.plan.price
                                    )}
                                  </option>
                                </FormControl>
                              </FormGroup>
                            </Col>
                            <Col sm={6} className="mb-2">
                              <FormGroup>
                                <FormLabel>سیستم عامل:</FormLabel>
                                <FormControl as="select" name="os" onChange={(e) => this.onChangeOs(e)} value={this.state.os?.id} className="ltr">
                                  <optgroup label="linux">
                                    {this.props.oses
                                      .filter((i) => i.base === 'linux')
                                      .map((os) => (
                                        <option value={os.id} key={os.id}>
                                          {os.title}
                                        </option>
                                      ))}
                                  </optgroup>
                                </FormControl>
                              </FormGroup>
                            </Col>
                          </Row>

                          <p className="h5 mt-2">
                            <strong>انتخاب های قابل پیکربندی</strong>
                          </p>
                          <p>
                            این سرویس/محصول که انتخاب نموده اید دارای امکانات
                            اضافه ای است که میتوانید برای سفارش خود انتخاب
                            نمایید
                          </p>

                          <Row className={classNames(styles['row-label'], 'mb-3')}>
                            <Col sm={4}>
                              <FormLabel>
                                لایسنس
                              </FormLabel>
                            </Col>
                            <Col sm={8}>
                              <FormGroup>
                                <FormControl as="select" name="license" onChange={(e) => this.onChangeField(e, 'license') } value={this.state.license}>
                                  <option value="">لازم ندارم</option>
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
                                </FormControl>
                              </FormGroup>
                            </Col>
                          </Row>

                          <Alert
                            variant='danger'
                            className={classNames('text-center', {
                              ['d-none']: this.state.os?.base !== 'windows' || this.state.license === '',
                            })}
                          >
                            توجه داشته باشید که لایسنس ها مربوط به برنامه هایی
                            هستند که فقط بر روی سیستم عامل های لینوکس نصب میشوند
                          </Alert>

                          <Row className={classNames(styles['row-label'], 'mb-3')}>
                            <Col sm={4}>
                              <FormLabel>
                                فضای بکاپ
                              </FormLabel>
                            </Col>
                            <Col sm={8}>
                              <FormGroup>
                                <FormControl as="select" name="backup" onChange={(e) => this.onChangeField(e, 'backup') } value={this.state.backup}>
                                  <option value="">لازم ندارم</option>
                                {this.props.hosts.map((host) => (
                                  <option value={host.id} key={host.id}>
                                    {formatSpace(host.space, 'en', true)} ،
                                    قیمت :{' '}
                                    {formatPriceWithCurrency(
                                      this.props.currencies,
                                      host.currency,
                                      host.price
                                    )}{' '}
                                    ماهیانه
                                  </option>
                                ))}
                                </FormControl>
                              </FormGroup>
                            </Col>
                          </Row>

                          <Row className={classNames(styles['row-label'], 'mb-3', {
                            ['d-none']: this.state.backup === '',
                          })}>
                            <Col sm={4}>
                              <FormLabel>
                                دامنه هاست بکاپ
                              </FormLabel>
                            </Col>
                            <Col sm={8}>
                              <FormGroup>
                                <FormControl
                                  type="text"
                                  className='ltr'
                                  name="domain"
                                  onChange={(e) => {
                                    this.onChangeField(e, 'domain');
                                    this.setState({
                                      showDomainAlert: false,
                                    });
                                  }}
                                  value={this.state.domain}
                                >
                                </FormControl>
                              </FormGroup>
                            </Col>
                          </Row>

                          <Row className={classNames(styles['row-label'], 'mb-3')}>
                            <Col sm={4}>
                              <FormLabel>
                                حافظه موقت
                              </FormLabel>
                            </Col>
                            <Col sm={8}>
                              <FormGroup>
                                <FormControl as="select" name="ram">
                                  <option>
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
                                </FormControl>
                              </FormGroup>
                            </Col>
                          </Row>

                          <Row className={classNames(styles['row-label'], 'mb-3')}>
                            <Col sm={4}>
                              <FormLabel>
                                آي پي
                              </FormLabel>
                            </Col>
                            <Col sm={8}>
                              <FormGroup>
                                <FormControl as="select" name="ip">
                                  <option value="">1 عدد</option>
                                </FormControl>
                              </FormGroup>
                            </Col>
                          </Row>

                          <Row className={classNames(styles['row-label'], 'mb-3')}>
                            <Col sm={4}>
                              <FormLabel>
                                هارد
                              </FormLabel>
                            </Col>
                            <Col sm={8}>
                              <FormGroup>
                                <FormControl as="select" name="ip">
                                  <option>
                                    {formatSpace(this.props.plan.hard, 'fa')}{' '}
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
                                </FormControl>
                              </FormGroup>
                            </Col>
                          </Row>

                          <Row className="justify-content-center">
                            <Col md={6}>
                              <Button
                                variant='success'
                                type="submit"
                                disabled={formik.isSubmitting}
                                block
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

export default connect(
  (state: RootState) => {
    return { currencies: state.currencies };
  },
  { addVPSToCart }
)(withRouter(OrderVPS));

import * as React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
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
  setItems as setCartItems,
} from '../../../store/Cart';

interface IProps {
  plan: IVPSPlan;
  addons: IAddon[];
  licenses: ILicense[];
  hosts: IHostPlan[];
  oses: IOS[];
  currencies: RootState['currencies'];
  router: NextRouter;
  setCartItems: typeof setCartItems;
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
      os: this.props.oses.find((i) => i.base === 'windows'),
      license: '',
      domain: '',
      showDomainAlert: false,
    };
  }

  onChangeField(
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'backup' | 'license' | 'domain'
  ) {
    this.setState({ [field]: e.target.value });
  }

  onChangeOs(e: React.ChangeEvent<HTMLInputElement>) {
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
      NotificationManager.error(
        '???????????? ???? ???????????? ???????????? ?????????? ???????? ???????? ?????????? ???????? ????????.',
        '??????'
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
        <PagesHeader title={`???????????????? ???????? ?????????? ${this.props.plan.title}`} />

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
                          {this.props.plan.title}
                        </h2>
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
                                <span>??????</span>
                              </Alert.Heading>
                              <p>
                                ???????? ???????? ?????????? ???????? ?????????? ???????? ?????????? ?????? ????
                                ???????? ????????????.
                              </p>
                            </Alert>
                          )}

                          <p>{this.props.plan.title}</p>
                          <div>
                            <div>
                              ???????? {formatSpace(this.props.plan.hard, 'fa')}
                              SATA
                            </div>
                            <div>
                              ????????????{' '}
                              {!this.props.plan.bandwidth ? (
                                <span className={styles.unlimited}>
                                  ???????? ??????????????
                                </span>
                              ) : (
                                formatSpace(this.props.plan.bandwidth, 'fa')
                              )}
                            </div>
                            <div>???????????????? {this.props.plan.cpu} ??????????????</div>
                            <div>
                              ?????????? ????????{' '}
                              {formatSpace(this.props.plan.ram, 'fa')}
                            </div>
                            <div>
                              <span className={styles.location}>
                                ????????????{' '}
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
                          <Col md={4}>???????? ????????????:</Col>
                          <Col md={8}>
                            <Field as="select" name="period">
                              <option value="1">
                                ???????? 1 ?????? ???????? :???{' '}
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
                            <strong>???????????? ?????? ???????? ????????????????</strong>
                          </p>
                          <p>
                            ?????? ??????????/?????????? ???? ???????????? ?????????? ?????? ?????????? ??????????????
                            ?????????? ???? ?????? ???? ???????????????? ???????? ?????????? ?????? ????????????
                            ????????????
                          </p>

                          <br />
                          <div className={styles.rowsWrapper}>
                            <div className={styles.rows}>
                              <div className={styles.row}>
                                <div>????????????</div>
                                <div>
                                  <Field
                                    as="select"
                                    onChange={(e) =>
                                      this.onChangeField(e, 'license')
                                    }
                                    value={this.state.license}
                                    name="license"
                                  >
                                    <option value="">???????? ??????????</option>
                                    {this.props.licenses.map((license) => (
                                      <option
                                        value={license.id}
                                        key={license.id}
                                      >
                                        {license.title} ????????:{' '}
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
                                <div>???????? ????????</div>
                                <div>
                                  <Field
                                    as="select"
                                    name="backup"
                                    onChange={(e) =>
                                      this.onChangeField(e, 'backup')
                                    }
                                    value={this.state.backup}
                                    className="form-control"
                                  >
                                    <option value="-">???????? ??????????</option>
                                    {this.props.hosts.map((host) => (
                                      <option value={host.id} key={host.id}>
                                        {formatSpace(host.space, 'en', true)} ??
                                        ???????? :{' '}
                                        {formatPriceWithCurrency(
                                          this.props.currencies,
                                          host.currency,
                                          host.price
                                        )}{' '}
                                        ??????????????
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
                                  [styles.hidden]: this.state.backup === '',
                                })}
                              >
                                <div>?????????? ???????? ????????</div>
                                <div>
                                  {this.state.backup !== '-' && (
                                    <>
                                      <Field
                                        type="text"
                                        name="domain"
                                        className="form-control"
                                        onChange={(e) => {
                                          this.onChangeField(e, 'domain');
                                          this.setState({
                                            showDomainAlert: false,
                                          });
                                        }}
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
                                <div>?????????? ????????</div>
                                <div>
                                  <Field
                                    as="select"
                                    name="ram"
                                    className="form-control"
                                  >
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
                                          ????????{' '}
                                          {formatPriceWithCurrency(
                                            this.props.currencies,
                                            ram.currency,
                                            ram.price
                                          )}{' '}
                                          ??????????????
                                        </option>
                                      ))}
                                  </Field>
                                </div>
                              </div>

                              <div className={styles.row}>
                                <div>???? ????</div>
                                <div>
                                  <Field as="select" name="ip">
                                    <option value="">1 ??????</option>
                                    {Array(3)
                                      .fill('')
                                      .map((ip, index) => (
                                        <option
                                          value={index + 1}
                                          key={index + 1}
                                        >
                                          {index + 2} ?????? ???? ?????? ????????{' '}
                                          {formatPriceWithCurrency(
                                            this.props.currencies,
                                            this.props.plan.currency,
                                            this.props.plan.addonip *
                                              (index + 1)
                                          )}
                                        </option>
                                      ))}
                                  </Field>
                                  <div className="form-err-msg">
                                    <ErrorMessage name="ip" />
                                  </div>
                                </div>
                              </div>

                              <div className={styles.row}>
                                <div>????????</div>
                                <div>
                                  <Field
                                    as="select"
                                    name="hard"
                                    className="form-control"
                                  >
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
                                          {hard.addon.title} ?????????? ???? ?????? ????????{' '}
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
                            </div>
                          </div>
                        </Row>

                        <div className={styles.moreInfoSection}>
                          <p>
                            <strong>?????????????? ???????? ????????</strong>
                          </p>
                          <p>
                            ?????? ??????????/?????????? ???????? ???? ???????? ?????????????? ?????????? ???? ??????
                            ???????? ???? ???? ?????????????? ?????????? ?? ?????????? ?????? ???? ?????????? ????????????
                          </p>
                          <div className={styles.osRow}>
                            <div>?????????? ???????? </div>
                            <div>
                              <Field
                                as="select"
                                name="os"
                                onChange={(e) => this.onChangeOs(e)}
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
                          ???????? ?????????? ?????????? ???? ???????????? ???? ?????????? ???? ???????????? ????????
                          ?????????? ???? ?????? ???? ?????? ?????????? ???????? ?????? ???????????? ?????? ????????????
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
                                '??????????'
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

export default connect(
  (state: RootState) => {
    return { currencies: state.currencies };
  },
  { setCartItems, addVPSToCart }
)(withRouter(OrderVPS));

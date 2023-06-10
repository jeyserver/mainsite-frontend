import classNames from 'classnames';
import { Formik, FormikHelpers, Form, Field, ErrorMessage } from 'formik';
import * as React from 'react';
import { Button, Col, InputGroup, Row } from 'react-bootstrap';
import showErrorMsg from '../../../../../helper/showErrorMsg';
import { ITld } from '../../../../../pages/_app';
import { getDomainsByCategory } from '../../../../helper/getDomainsByCategory';
import { NotificationManager } from 'react-notifications';
import { connect } from 'react-redux';
import { setDomainsForConfigure } from '../../../../../store/Domain';
import { NextRouter, withRouter } from 'next/router';
import {
  addDomain as addDomainToCart,
  IAddDomain,
} from '../../../../../store/Cart';
import { AsyncThunkAction } from '../../../../../store';
import styles from './CheckDomainForm.module.scss';

interface IDomain {
  available: boolean;
  name: string;
  tld: ITld;
}

interface IProps {
  tlds: ITld[];
  domainoption: 'register' | 'transfer' | 'owndomain';
  commercialDomains: string[];
  cheepBorder: number;
  default: { name: string; tld: number };
  hostPlan: string | undefined;
  selectedDomains: IDomain[];
  periods: { [domain: string]: string };
  router: NextRouter;
  setRecommendedDomains: (domains: IDomain[]) => void;
  setSelectedDomains: (domains: IDomain[]) => void;
  setPeriods: (periods: any) => void;
  setDomainsForConfigure: typeof setDomainsForConfigure;
  children: React.ReactNode;
  addDomainToCart: AsyncThunkAction<any, IAddDomain>;
}

interface IState {
  unAvailableDomainException: boolean;
  domainName: string;
  tld: string | number;
  customTld: string;
}

interface IInputs {
  name: string;
  tld: number | string;
  customTld: string;
}

class CheckDomainForm extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      unAvailableDomainException: false,
      domainName: this.props.default.name ? this.format(this.props.default.name, true) : undefined,
      tld: this.props.default.tld,
      customTld: undefined,
    };
  }

  componentDidUpdate(prevProps: IProps, prevState: IState) {
    if (
      (prevProps.default &&
        this.props.default.name !== prevProps.default.name) ||
      (prevProps.default && this.props.default.tld !== prevProps.default.tld)
     ) {
      this.setState({
        domainName: this.props.default.name ? this.format(this.props.default.name, true) : undefined,
        tld: this.props.default.tld || undefined,
      });
    }
  }

  format(val: string, removeEnd: boolean) {
    if (val.startsWith('.')) {
      val = val.substring(1);
    }

    if (removeEnd && val.endsWith('.')) {
      val = val.substring(0, val.length - 1);
    }

    return val && val.length > 0 ? val.trim().toLowerCase() : undefined;
  }

  async onSubmit(
    values: IInputs,
    { setSubmitting, setErrors }: FormikHelpers<IInputs>
  ) {
    if (this.state.unAvailableDomainException) {
      this.setState({ unAvailableDomainException: false });
    }

    if (
      !this.state.domainName ||
      (this.props.domainoption === 'owndomain' && !this.state.customTld)
    ) {
      setErrors({ name: 'داده وارد شده معتبر نیست.' });

      return;
    }

    try {
      const res = await this.props
        .addDomainToCart({
          domainoption: this.props.domainoption,
          domains: this.props.selectedDomains.map(
            (i) => this.format(`${i.name}.${i.tld.tld}`, true)
          ),
          name: this.format(this.state.domainName, true),
          tld:
            this.props.domainoption === 'owndomain'
              ? this.format(this.state.customTld, true)
              : this.state.tld,
          period: this.props.periods,
          hostPlan: this.props.hostPlan,
        })
        .unwrap();

      if (res.data.status) {
        if (res.data.redirect) {
          this.props.router.push(res.data.redirect);
        } else {
          if (res.data.ordered.available) {
            this.props.setSelectedDomains([res.data.ordered]);
          }
          // recomendeds
          const recomendeds = [res.data.ordered, ...res.data.recomendeds];
          this.props.setRecommendedDomains(recomendeds);
          // periods
          const periods = recomendeds.reduce((prev, cur) => {
            return { ...prev, [`${cur.name}.${cur.tld.tld}`]: 1 };
          }, {});
          this.props.setPeriods(periods);
        }
      } else {
        res.data.error.map((error) => {
          setErrors({ [error.input]: showErrorMsg(error.code) });
        });
        if (res.data.error[0].code === 'unAvailableDomainException') {
          this.setState({ unAvailableDomainException: true });
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

  onChangeDomainName(e) {
    this.setState({ domainName: this.format(e.target.value, 'blur' === e.type) });
  }

  onChangeTld(e) {
    this.setState({ tld: e.target.value });
  }

  onChangeTLDName(e) {
    this.setState({ customTld: this.format(e.target.value, 'blur' === e.type) });
  }

  render() {
    const formBtnText =
      this.props.selectedDomains.length === 0 ? 'بررسی دامنه' : 'پیکر بندی';

    return (
      <Formik
        initialValues={{
          name: this.state.domainName,
          tld: this.state.tld,
          customTld: this.state.customTld,
        }}
        onSubmit={(values, helpers) => this.onSubmit(values, helpers)}
      >
        {(formik) => (
          <Form>
            <Row className="justify-content-center">
              <Col md={8} className={styles.formInputs}>
                <InputGroup
                  className={classNames(styles.inputGroup, {
                    [styles.invalid]:
                      formik.touched &&
                      (formik.errors.name || formik.errors.tld),
                  })}
                >
                  <InputGroup.Prepend className={styles.prefix}>
                    www.
                  </InputGroup.Prepend>
                  <Field
                    type="text"
                    placeholder="Your Domain"
                    name="name"
                    className="form-control"
                    value={this.state.domainName}
                    onChange={(e: Event) => this.onChangeDomainName(e)}
                    onBlur={(e: Event) => this.onChangeDomainName(e)}
                  />
                  {this.props.domainoption === 'owndomain' ? (
                    <div className={styles.suffix}>
                      <Field
                        type="text"
                        placeholder="پسوند"
                        name="customTld"
                        className={classNames('form-control', styles.tldInput)}
                        onChange={(e: Event) => this.onChangeTLDName(e)}
                        value={this.state.customTld}
                        onBlur={(e: Event) => this.onChangeTLDName(e)}
                      />
                    </div>
                  ) : (
                    <Field
                      as="select"
                      name="tld"
                      className="form-control"
                      value={this.state.tld}
                      onChange={(e) => this.onChangeTld(e)}
                    >
                      <optgroup label="دامنه های ارزان قیمت">
                        {getDomainsByCategory(
                          'cheap-domains',
                          this.props.tlds,
                          [],
                          this.props.cheepBorder
                        ).map((domain) => (
                          <option key={domain.id} value={domain.id}>
                            .{domain.tld}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="دامنه های تجاری">
                        {getDomainsByCategory(
                          'commercial-domains',
                          this.props.tlds,
                          this.props.commercialDomains,
                          this.props.cheepBorder
                        ).map((domain) => (
                          <option key={domain.id} value={domain.id}>
                            .{domain.tld}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="دامنه های خدماتی">
                        {getDomainsByCategory(
                          'service-domains',
                          this.props.tlds,
                          this.props.commercialDomains,
                          this.props.cheepBorder
                        ).map((domain) => (
                          <option key={domain.id} value={domain.id}>
                            .{domain.tld}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="دامنه های ملی">
                        {getDomainsByCategory(
                          'national-domains',
                          this.props.tlds,
                          this.props.commercialDomains,
                          this.props.cheepBorder
                        ).map((domain) => (
                          <option key={domain.id} value={domain.id}>
                            .{domain.tld}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="دامنه های کشوری">
                        {getDomainsByCategory(
                          'country-domains',
                          this.props.tlds,
                          this.props.commercialDomains,
                          this.props.cheepBorder
                        ).map((domain) => (
                          <option key={domain.id} value={domain.id}>
                            .{domain.tld}
                          </option>
                        ))}
                      </optgroup>
                    </Field>
                  )}
                </InputGroup>

                <div className={styles.invalidMsg}>
                  <ErrorMessage name="tld" />
                </div>

                {this.state.unAvailableDomainException && (
                  <div className={styles.invalidMsg}>
                    دامنه مورد نظر تا به حال ثبت نشده است
                  </div>
                )}

                {formik.touched && formik.errors.name && (
                  <div className={styles.invalidMsg}>
                    <div>داده وارد شده معتبر نیست</div>
                    <div>فقط از حروف لاتین و (-) میتوانید استفاده کنید</div>
                  </div>
                )}
              </Col>
            </Row>

            {/* Table */}
            {this.props.children}

            <Row className="justify-content-center">
              <Col md={6}>
                <Button
                  type="submit"
                  disabled={formik.isSubmitting}
                  className={styles.checkDomainBtn}
                >
                  {formik.isSubmitting ? (
                    <span className={styles.spin}>
                      <i className="fas fa-spinner"></i>
                    </span>
                  ) : (
                    formBtnText
                  )}
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    );
  }
}

export default connect(null, { setDomainsForConfigure, addDomainToCart })(
  withRouter(CheckDomainForm)
);

import classNames from 'classnames';
import { Formik, FormikHelpers, Form, Field, ErrorMessage } from 'formik';
import * as React from 'react';
import { Button, Col, InputGroup, Row } from 'react-bootstrap';
import backend from '../../../../../axios-config';
import showErrorMsg from '../../../../../helper/showErrorMsg';
import { ITld } from '../../../../../pages/_app';
import { getDomainsByCategory } from '../../../../helper/getDomainsByCategory';
import { NotificationManager } from 'react-notifications';
import styles from './CheckDomainForm.module.scss';
import { connect } from 'react-redux';
import { setDomainsForConfigure } from '../../../../../store/Domain';
import { nanoid } from '@reduxjs/toolkit';
import { NextRouter, withRouter } from 'next/router';

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
  selectedDomains: IDomain[];
  periods: { [domain: string]: string };
  router: NextRouter;
  setRecommendedDomains: (domains: IDomain[]) => void;
  setSelectedDomains: (domains: IDomain[]) => void;
  setDomainsForConfigure: typeof setDomainsForConfigure;
}

interface IState {}

interface IInputs {
  name: string;
  tld: number;
}

class CheckDomainForm extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  onSubmit(
    values: IInputs,
    { setSubmitting, setErrors }: FormikHelpers<IInputs>
  ) {
    if (this.props.selectedDomains.length > 0) {
      const domainsForConfigure = this.props.selectedDomains.map((domain) => {
        return {
          id: nanoid(),
          price: domain.tld.new,
          discount: 0,
          number: 1,
          currency: domain.tld.currency,
          product: 'domain',
          tld: domain.tld,
          domain: domain.name,
          type: this.props.domainoption,
        };
      });

      backend
        .post(
          `/order/domain?ajax=1&domains=${JSON.stringify(
            this.props.selectedDomains
          )}&period=${JSON.stringify(this.props.periods)}`
        )
        .then((res) => {
          this.props.setDomainsForConfigure(domainsForConfigure);
          this.props.router.push('/order/domain/configure');
        })
        .catch((err) => {
          NotificationManager.error(
            'ارتباط با سامانه بدرستی انجام نشد، لطفا مجددا تلاش کنید.',
            'خطا'
          );
        })
        .finally(() => {
          setSubmitting(false);
        });
    } else {
      backend
        .post(
          `/order/domain?ajax=1&domainoption=${this.props.domainoption}&tld=${values.tld}&name=${values.name}`
        )
        .then((res) => {
          if (res.data.status) {
            if (res.data.ordered.available) {
              this.props.setSelectedDomains([res.data.ordered]);
            }
            this.props.setRecommendedDomains([
              res.data.ordered,
              ...res.data.recomendeds,
            ]);
          } else {
            res.data.error.map((error) => {
              setErrors({ [error.input]: showErrorMsg(error.code) });
            });
          }
        })
        .catch((err) => {
          NotificationManager.error(
            'ارتباط با سامانه بدرستی انجام نشد، لطفا مجددا تلاش کنید.',
            'خطا'
          );
        })
        .finally(() => {
          setSubmitting(false);
        });
    }
  }

  render() {
    const formBtnText =
      this.props.selectedDomains.length === 0 ? 'بررسی دامنه' : 'پیکر بندی';

    return (
      <Formik
        initialValues={{
          name: this.props.default.name,
          tld: Number(this.props.default.tld) || this.props.tlds[0].id,
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
                  {this.props.domainoption === 'owndomain' ? (
                    <div className={styles.suffix}>
                      <Field
                        type="text"
                        placeholder="پسوند"
                        name="tld"
                        className={classNames('form-control', styles.tldInput)}
                        // defaultValue={this.props.default.name}
                      />
                      <div className={styles.hint}>
                        <div className={styles.text}>بدون نقطه وارد کنید</div>
                        <div className={styles.flashLine}></div>
                        <i className="fas fa-caret-down"></i>
                      </div>
                      <div className={styles.invalidMsg}>
                        <ErrorMessage name="tld" />
                      </div>
                    </div>
                  ) : (
                    <Field
                      as="select"
                      name="tld"
                      // value={this.state.domainTldSelectValue}
                      // onChange={this.onChangeDomainTld}
                      value={this.props.default.tld}
                      className="form-control"
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
                  <Field
                    type="text"
                    placeholder="Your Domain"
                    name="name"
                    className="form-control"
                    // onChange={this.onChangeDomainName}
                    // value={this.state.domainNameInputValue}
                  />
                  <InputGroup.Prepend className={styles.prefix}>
                    www.
                  </InputGroup.Prepend>
                </InputGroup>

                {formik.touched && (formik.errors.name || formik.errors.tld) && (
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

export default connect(null, { setDomainsForConfigure })(
  withRouter(CheckDomainForm)
);

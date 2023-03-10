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
}

interface IInputs {
  name: string;
  tld: number | string;
  postfix: string;
}

class CheckDomainForm extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      unAvailableDomainException: false,
      domainName: this.props.default.name,
      tld: this.props.default.tld,
    };
  }

  componentDidUpdate(prevProps: IProps, prevState: IState) {
    if (
      (prevProps.default &&
        this.props.default.name !== prevProps.default.name) ||
      (prevProps.default && this.props.default.tld !== prevProps.default.tld)
    ) {
      this.setState({
        domainName: this.props.default.name,
        tld: this.props.default.tld,
      });
    }
  }

  async onSubmit(
    values: IInputs,
    { setSubmitting, setErrors }: FormikHelpers<IInputs>
  ) {
    if (this.state.unAvailableDomainException) {
      this.setState({ unAvailableDomainException: false });
    }

    if (this.props.selectedDomains.length > 0) {
      try {
        const res = await this.props
          .addDomainToCart({
            domainoption: this.props.domainoption,
            domains: this.props.selectedDomains.map(
              (i) => `${i.name}.${i.tld.tld}`
            ),
            name: this.state.domainName,
            tld:
              this.props.domainoption === 'owndomain'
                ? values.postfix
                : this.state.tld,
            period: this.props.periods,
            hostPlan: this.props.hostPlan,
          })
          .unwrap();
        if (res.data.redirect) {
          this.props.router.push(res.data.redirect);
        }
      } catch (error) {
        NotificationManager.error(
          '???????????? ???? ???????????? ???????????? ?????????? ???????? ???????? ?????????? ???????? ????????.',
          '??????'
        );
      } finally {
        setSubmitting(false);
      }
    } else {
      try {
        const res = await this.props
          .addDomainToCart({
            domainoption: this.props.domainoption,
            tld:
              this.props.domainoption === 'owndomain'
                ? values.postfix
                : this.state.tld,
            name: this.state.domainName,
            hostPlan: this.props.hostPlan,
            domains: '',
            period: '',
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
          '???????????? ???? ???????????? ???????????? ?????????? ???????? ???????? ?????????? ???????? ????????.',
          '??????'
        );
      } finally {
        setSubmitting(false);
      }
    }
  }

  onChangeDomainName(e) {
    this.setState({ domainName: e.target.value });
  }

  onChangeTld(e) {
    this.setState({ tld: e.target.value });
  }

  render() {
    const formBtnText =
      this.props.selectedDomains.length === 0 ? '?????????? ??????????' : '???????? ????????';

    return (
      <Formik
        initialValues={{
          name: this.state.domainName,
          tld: this.state.tld,
          postfix: '',
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
                        placeholder="??????????"
                        name="postfix"
                        className={classNames('form-control', styles.tldInput)}
                      />
                      <div className={styles.hint}>
                        <div className={styles.text}>???????? ???????? ???????? ????????</div>
                        <div className={styles.flashLine}></div>
                        <i className="fas fa-caret-down"></i>
                      </div>
                    </div>
                  ) : (
                    <Field
                      as="select"
                      name="tld"
                      className="form-control"
                      value={this.state.tld}
                      onChange={(e) => this.onChangeTld(e)}
                    >
                      <optgroup label="?????????? ?????? ?????????? ????????">
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
                      <optgroup label="?????????? ?????? ??????????">
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
                      <optgroup label="?????????? ?????? ????????????">
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
                      <optgroup label="?????????? ?????? ??????">
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
                      <optgroup label="?????????? ?????? ??????????">
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
                    defaultValue={this.props.default.name}
                    onChange={(e) => this.onChangeDomainName(e)}
                    value={this.state.domainName}
                  />
                  <InputGroup.Prepend className={styles.prefix}>
                    www.
                  </InputGroup.Prepend>
                </InputGroup>

                <div className={styles.invalidMsg}>
                  <ErrorMessage name="tld" />
                </div>

                {this.state.unAvailableDomainException && (
                  <div className={styles.invalidMsg}>
                    ?????????? ???????? ?????? ???? ???? ?????? ?????? ???????? ??????
                  </div>
                )}

                {formik.touched && formik.errors.name && (
                  <div className={styles.invalidMsg}>
                    <div>???????? ???????? ?????? ?????????? ????????</div>
                    <div>?????? ???? ???????? ?????????? ?? (-) ???????????????? ?????????????? ????????</div>
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

import * as React from 'react';
import axios from 'axios';
import classNames from 'classnames';
import { NextRouter, withRouter } from 'next/router';
import { InputGroup, Table, Form, Col, Row, Button } from 'react-bootstrap';
import { getDomainsByCategory } from '../../helper/getDomainsByCategory';
import styles from './DomainSettings.module.scss';
import { NotificationManager } from 'react-notifications';

export interface DomainSettingsProps {
  data: any;
  router: NextRouter;
}

export interface DomainSettingsState {
  domainoption: 'register' | 'transfer';
  selectedTld: number | null;
  domainNameError: 'data_validation' | 'data_duplicate' | null;
  checkDomainBtnLoading: boolean;
  recommendedDomains: any;
  ordered: any;
  selectedDomains: any;
}

class DomainSettings extends React.Component<
  DomainSettingsProps,
  DomainSettingsState
> {
  constructor(props: DomainSettingsProps) {
    super(props);
    this.state = {
      domainoption: 'register',
      selectedTld: null,
      domainNameError: null,
      checkDomainBtnLoading: false,
      recommendedDomains: null,
      ordered: null,
      selectedDomains: [],
    };
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.onChangeDomainName = this.onChangeDomainName.bind(this);
    this.toggleSelectedDomains = this.toggleSelectedDomains.bind(this);
  }

  onSubmitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.domainName.value.trim().length === 0) {
      this.setState({ domainNameError: 'data_validation' });
      e.stopPropagation();
    } else {
      if (this.state.selectedDomains.length > 0) {
        this.setState({ checkDomainBtnLoading: true });

        axios
          .get(
            'https://jsonblob.com/api/jsonBlob/ea5bc877-e265-11eb-a96b-95a5a070a2d6'
          )
          .then(() => {
            this.setState({ checkDomainBtnLoading: false });
            this.props.router.push('/order/domain/configure');
          });
      } else {
        this.setState({ checkDomainBtnLoading: true });

        axios
          .get(
            // `${process.env.SCHEMA}://${process.env.DOMAIN}/fa/order/domain?ajax=1`,
            // {
            //   tld: form.tld.value,
            //   name: form.domainName.value,
            //   domainoption: form.domainoption.value,
            // }
            'https://jsonblob.com/api/jsonBlob/ea5bc877-e265-11eb-a96b-95a5a070a2d6'
          )
          .then((res) => {
            if (res.data.status) {
              if (form.domainoption.value === 'transfer') {
                this.props.router.push('/order/domain/configure');
              } else {
                this.setState({
                  recommendedDomains: res.data.recomendeds,
                  ordered: res.data.ordered,
                  selectedDomains: [res.data.ordered],
                });
              }
            } else {
              res.data.error.forEach((errorItem) => {
                if (errorItem.input === 'name') {
                  this.setState({ domainNameError: errorItem.code });
                }
              });
            }
            this.setState({ checkDomainBtnLoading: false });
          })
          .catch((err) => {
            this.setState({ checkDomainBtnLoading: false });
            NotificationManager.error(
              'ارتباط با سامانه بدرستی انجام نشد، لطفا مجددا تلاش کنید.',
              'خطا'
            );
          });
      }
    }
  }

  onChangeDomainName() {
    this.setState({ domainNameError: null });
  }

  toggleSelectedDomains(newDomain) {
    const domainIndex = this.state.selectedDomains.findIndex(
      (domain) => domain.tld.id === newDomain.tld.id
    );

    if (domainIndex > -1) {
      this.setState((prev) => {
        return {
          selectedDomains: prev.selectedDomains.filter(
            (domain, index) => index !== domainIndex
          ),
        };
      });
    } else {
      this.setState((prev) => {
        return {
          selectedDomains: [...prev.selectedDomains, newDomain],
        };
      });
    }
  }

  render() {
    const formBtnText =
      this.state.selectedDomains.length === 0 ? 'بررسی دامنه' : 'پیکر بندی';

    return (
      <div className={styles.domainSettings}>
        <h2 className={styles.title}>خرید دامنه</h2>
        <p className={styles.info}>
          لطفا نام دامین انتخابی خود را در زیر وارد کنید.
        </p>
        <br />

        <Form
          className={styles.orderDomainForm}
          autoComplete="off"
          onSubmit={(e) => this.onSubmitForm(e)}
          data-invalid={this.state.domainNameError ? true : false}
        >
          <Col xs={12}>
            <Form.Group>
              <div className={styles.domainOptions}>
                <label>
                  <input
                    type="radio"
                    name="domainoption"
                    defaultValue="register"
                    defaultChecked
                  />
                  میخواهم جی سرور برای من دامنه جدید ثبت کند.
                </label>
              </div>
              {this.props.data.transferOption && (
                <div className={styles.domainOptions}>
                  <label>
                    <input
                      type="radio"
                      name="domainoption"
                      defaultValue="transfer"
                    />
                    میخواهم دامنه ام را منتقل کنم به جی سرور
                  </label>
                </div>
              )}
            </Form.Group>
          </Col>

          <Row className={styles.alertOwnDomain} hidden>
            <Col xs={12}>
              <div className={styles.alert}>
                <span>
                  پسوند دامنه را بدون نقطه در قسمت پسوند دامنه وارد کنید
                </span>
              </div>
            </Col>
          </Row>

          <Row className="justify-content-center">
            <Col md={8} className={styles.formInputs}>
              <InputGroup className={styles.inputGroup}>
                <Form.Control as="select" name="tld" custom>
                  <optgroup label="دامنه های ارزان قیمت">
                    {getDomainsByCategory(
                      'cheap-domains',
                      this.props.data.domains.items,
                      [],
                      this.props.data.cheapDomainBreakPrice
                    ).map((domain) => (
                      <option
                        key={domain.id}
                        value={domain.id}
                        selected={this.props.data.tldFromQuery === domain.tld}
                      >
                        .{domain.tld}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="دامنه های تجاری">
                    {getDomainsByCategory(
                      'commercial-domains',
                      this.props.data.domains.items,
                      this.props.data.famousAndTrendyDomains,
                      this.props.data.cheapDomainBreakPrice
                    ).map((domain) => (
                      <option
                        key={domain.id}
                        value={domain.id}
                        selected={this.props.data.tldFromQuery === domain.tld}
                      >
                        .{domain.tld}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="دامنه های خدماتی">
                    {getDomainsByCategory(
                      'service-domains',
                      this.props.data.domains.items,
                      this.props.data.famousAndTrendyDomains,
                      this.props.data.cheapDomainBreakPrice
                    ).map((domain) => (
                      <option
                        key={domain.id}
                        value={domain.id}
                        selected={this.props.data.tldFromQuery === domain.tld}
                      >
                        .{domain.tld}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="دامنه های ملی">
                    {getDomainsByCategory(
                      'national-domains',
                      this.props.data.domains.items,
                      this.props.data.famousAndTrendyDomains,
                      this.props.data.cheapDomainBreakPrice
                    ).map((domain) => (
                      <option
                        key={domain.id}
                        value={domain.id}
                        selected={this.props.data.tldFromQuery === domain.tld}
                      >
                        .{domain.tld}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="دامنه های کشوری">
                    {getDomainsByCategory(
                      'country-domains',
                      this.props.data.domains.items,
                      this.props.data.famousAndTrendyDomains,
                      this.props.data.cheapDomainBreakPrice
                    ).map((domain) => (
                      <option
                        key={domain.id}
                        value={domain.id}
                        selected={this.props.data.tldFromQuery === domain.tld}
                      >
                        .{domain.tld}
                      </option>
                    ))}
                  </optgroup>
                </Form.Control>
                <Form.Control
                  type="text"
                  placeholder="Your Domain"
                  name="domainName"
                  onChange={this.onChangeDomainName}
                />
                <InputGroup.Prepend>www.</InputGroup.Prepend>
              </InputGroup>
              {this.state.domainNameError === 'data_validation' && (
                <div className={styles.invalidMsg}>
                  <div>داده وارد شده معتبر نیست</div>
                  <div>فقط از حروف لاتین و (-) میتوانید استفاده کنید</div>
                </div>
              )}
            </Col>
          </Row>

          {this.state.recommendedDomains && (
            <Row className={styles.recommendedDomain}>
              <Table responsive striped className={classNames(styles.table)}>
                <thead>
                  <tr>
                    <th>دامین</th>
                    <th>وضعیت</th>
                    <th>تعرفه ها</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td className="ltr">
                      {this.state.ordered.name}.{this.state.ordered.tld.tld}
                    </td>
                    <td>
                      <Form.Group>
                        <label>
                          {this.state.ordered.available && (
                            <input
                              name={`domains[${this.state.ordered.name}.${this.state.ordered.tld.tld}]`}
                              defaultValue={`${this.state.ordered.name}.${this.state.ordered.tld.tld}`}
                              type="checkbox"
                              checked={this.state.selectedDomains.some(
                                (domain) =>
                                  domain.tld.tld === this.state.ordered.tld.tld
                              )}
                              onChange={() =>
                                this.toggleSelectedDomains(this.state.ordered)
                              }
                            />
                          )}

                          {this.state.ordered.available ? (
                            <span className={styles.jGreen}>
                              موجود است! هم اکنون سفارش دهید
                            </span>
                          ) : (
                            <span className={styles.jRed}>موجود نیست</span>
                          )}
                        </label>
                      </Form.Group>
                    </td>

                    <td>
                      {this.state.ordered.available && (
                        <Form.Group>
                          <Form.Control as="select" custom>
                            {this.state.ordered.tariffs.map((tariff) => (
                              <option value={tariff.id} key={tariff.id}>
                                {tariff.value}
                              </option>
                            ))}
                          </Form.Control>
                        </Form.Group>
                      )}
                    </td>
                  </tr>

                  {this.state.recommendedDomains.map((recommended) => (
                    <tr key={recommended.tld.id}>
                      <td className="ltr">
                        {recommended.name}.{recommended.tld.tld}
                      </td>
                      <td>
                        <Form.Group>
                          <label>
                            {recommended.available && (
                              <input
                                name={`domains[${recommended.name}.${recommended.tld.tld}]`}
                                defaultValue={`${recommended.name}.${recommended.tld.tld}`}
                                type="checkbox"
                                onChange={() =>
                                  this.toggleSelectedDomains(recommended)
                                }
                                checked={this.state.selectedDomains.some(
                                  (domain) =>
                                    domain.tld.tld === recommended.tld.tld
                                )}
                              />
                            )}

                            {recommended.available ? (
                              <span className={styles.jGreen}>
                                موجود است! هم اکنون سفارش دهید
                              </span>
                            ) : (
                              <span className={styles.jRed}>موجود نیست</span>
                            )}
                          </label>
                        </Form.Group>
                      </td>

                      <td>
                        {recommended.available && (
                          <Form.Group>
                            <Form.Control as="select" custom>
                              {recommended.tariffs.map((tariff) => (
                                <option value={tariff.id} key={tariff.id}>
                                  {tariff.value}
                                </option>
                              ))}
                            </Form.Control>
                          </Form.Group>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Row>
          )}

          <Row className="justify-content-center">
            <Col md={6}>
              <Button
                type="submit"
                disabled={this.state.checkDomainBtnLoading}
                className={styles.checkDomainBtn}
              >
                {this.state.checkDomainBtnLoading ? (
                  <span className={styles.spin}>
                    <i className="fas fa-spinner"></i>
                  </span>
                ) : (
                  formBtnText
                )}
              </Button>
            </Col>
          </Row>
          {}
        </Form>
      </div>
    );
  }
}

export default withRouter(DomainSettings);

import React from 'react';
import {
  OverlayTrigger,
  Spinner,
  Tooltip,
  Col,
  Image,
  Dropdown,
  Row,
  Container,
  InputGroup,
  Button,
} from 'react-bootstrap';
import styles from './Domain.module.scss';
import { withRouter, NextRouter } from 'next/router';
import classNames from 'classnames';
import { ITld } from '../../../../pages/_app';
import { formatPriceWithCurrency } from '../../../../store/Currencies';
import { connect } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import { RootState } from '../../../../store';
import Link from 'next/link';
import backend from '../../../../axios-config';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import showErrorMsg from '../../../../helper/showErrorMsg';
import { setSelectedDomain } from '../../../../store/Domain';

interface IProps {
  changeShowDropDown: () => void;
  router: NextRouter;
  tlds: ITld[];
  setSelectedDomain: typeof setSelectedDomain;
  currencies: RootState['currencies'];
}

interface IState {
  tld: string;
  selectedDomain: string | null;
  selectedDomains: any;
}

interface IInputs {
  name: string;
  tld: string;
}

class Domain extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      tld: this.props.tlds[0].tld,
      selectedDomain: null,
      selectedDomains: [],
    };
    this.checkDomain = this.checkDomain.bind(this);
  }

  componentDidMount() {
    const tr = document.querySelectorAll(
      'tr > td[data-selected="true"]'
    ) as any;

    if (this.state.selectedDomain) {
      const tableWrapper = document.querySelector('#tableWrapper') as any;
      tableWrapper.scrollTop = tr[0].parentElement.offsetTop;
    }
  }

  changeSelectedDomain(e: any) {
    const domainCurrentlyExist =
      this.state.selectedDomains.find(
        (domain) => domain.tld === e.target.value
      ) ||
      this.props.tlds
        .slice(0, 10)
        .find((domain) => domain.tld === e.target.value);

    this.setState({ tld: e.target.value });

    this.setState(
      (prev) => {
        if (domainCurrentlyExist) {
          return { ...prev, selectedDomain: e.target.value };
        } else {
          const domain = this.props.tlds.find(
            (domain) => domain.tld === e.target.value
          );

          return {
            ...prev,
            selectedDomain: e.target.value,
            selectedDomains: [...prev.selectedDomains, domain],
          };
        }
      },
      () => {
        const tr = document.querySelectorAll(
          'tr > td[data-selected="true"]'
        ) as any;

        if (this.state.selectedDomain) {
          const tableWrapper = document.querySelector('#tableWrapper') as any;
          tableWrapper.scrollTop = tr[0].parentElement.offsetTop;
        }
      }
    );
  }

  moreBtn() {
    this.props.router.push('/domain');
  }

  checkDomain(
    values: IInputs,
    { setSubmitting, setErrors }: FormikHelpers<IInputs>
  ) {
    const tld = this.props.tlds.find((tld) => tld.tld === this.state.tld);

    backend
      .post(
        `/order/domain?ajax=1&domainoption=register&tld=${tld.id}&name=${values.name}`
      )
      .then((res) => {
        if (res.data.status) {
          this.props.setSelectedDomain({
            name: values.name,
            tld: tld.id ? tld.id : this.props.tlds[0].id,
          });
          this.props.router.push('/order/domain');
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

  render() {
    return (
      <Dropdown className="nav-item-dropdown">
        <Dropdown.Toggle id="nav-dropdown" className="nav-item-dropdown-toggle">
          <div
            onClick={this.props.changeShowDropDown}
            style={{ height: '100%', width: '100%' }}
          >
            <i className="fas fa-globe-asia"></i>
            دامنه
          </div>
        </Dropdown.Toggle>

        <Dropdown.Menu className="domain-drop-down-menu nav-item-dropdown-menu px-3 py-0">
          <Container fluid>
            <Row className="flex-column-reverse flex-md-row">
              <Col xs={12} md={4}>
                <div className="d-flex flex-column justify-content-between mt-4">
                  <div className="d-flex align-items-center justify-content-between">
                    <Link href="/domain">
                      <a className={styles.tableTitle}>تعرفه ثبت دامنه</a>
                    </Link>
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip
                          className={styles.moreBtnDominToolpit}
                          id="moreBtnDominToolpit"
                        >
                          مشاهده {this.props.tlds.length} پسوند دیگر
                        </Tooltip>
                      }
                    >
                      <button className={styles.moreBtn}>
                        <Link href="/domain">
                          <a>
                            <div>بیشتر</div>
                          </a>
                        </Link>
                      </button>
                    </OverlayTrigger>
                  </div>
                  <div className="mt-3">
                    <div
                      className={classNames(styles.tableHeader, 'tableHeader')}
                    >
                      <div>پسوند</div>
                      <div>قیمت ثبت</div>
                    </div>
                    <div className={styles.tableWrapper} id="tableWrapper">
                      <table className="table">
                        <tbody>
                          {this.props.tlds.slice(0, 10).map((domain) => (
                            <tr key={domain.id}>
                              <td
                                data-selected={
                                  this.state.selectedDomain === domain.tld
                                }
                              >
                                {domain.tld}
                              </td>
                              <td
                                data-selected={
                                  this.state.selectedDomain === domain.tld
                                }
                              >
                                {this.props.currencies.items.length > 0 &&
                                  formatPriceWithCurrency(
                                    this.props.currencies,
                                    domain.currency,
                                    domain.new
                                  )}
                              </td>
                            </tr>
                          ))}
                          {this.state.selectedDomains.map((domain) => (
                            <tr key={domain.id}>
                              <td
                                data-selected={
                                  this.state.selectedDomain === domain.tld
                                }
                              >
                                {domain.tld}
                              </td>
                              <td
                                data-selected={
                                  this.state.selectedDomain === domain.tld
                                }
                              >
                                {this.props.currencies.items.length > 0 &&
                                  formatPriceWithCurrency(
                                    this.props.currencies,
                                    domain.currency,
                                    domain.new
                                  )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </Col>
              <Col xs={12} md={4} className={styles.centerCol}>
                <div className={styles.domainCheck}>
                  <h4>نقطه شروع همه چیز اینجاست!</h4>
                  <Formik
                    initialValues={{ name: '', tld: 'com' }}
                    onSubmit={(values, helpers) =>
                      this.checkDomain(values, helpers)
                    }
                  >
                    {(formik) => (
                      <Form className="mt-5">
                        <InputGroup className={styles.formInputGroup}>
                          <Field
                            as="select"
                            className="mr-sm-2 form-control"
                            dir="ltr"
                            name="tld"
                            onChange={(e) => this.changeSelectedDomain(e)}
                            value={this.state.tld}
                          >
                            {this.props.tlds.map((domain) => (
                              <option key={domain.id} value={domain.tld}>
                                .{domain.tld}
                              </option>
                            ))}
                            {this.state.selectedDomains.map((domain) => (
                              <option key={domain.id} value={domain.tld}>
                                .{domain.tld}
                              </option>
                            ))}
                          </Field>
                          <Field
                            type="text"
                            placeholder="Your Domain"
                            name="name"
                            className="form-control"
                          />
                          <InputGroup.Prepend>
                            <InputGroup.Text dir="ltr">www.</InputGroup.Text>
                          </InputGroup.Prepend>
                        </InputGroup>
                        <div className={styles.errorMsg}>
                          <ErrorMessage name="name" />
                        </div>
                        <Button
                          type="submit"
                          variant="success"
                          className={styles.searchDomainBtn}
                          disabled={formik.isSubmitting}
                        >
                          {formik.isSubmitting ? (
                            <Spinner size="sm" animation="border" />
                          ) : (
                            <>
                              <i className="fas fa-search"></i>
                              <span>بررسی کن</span>
                            </>
                          )}
                        </Button>
                      </Form>
                    )}
                  </Formik>
                </div>
              </Col>
              <Col xs={12} md={4} className={styles.infoCol}>
                <div className={styles.infoWrapper}>
                  <Image
                    src="/images/domain-menu.png"
                    className={styles.backgroundImage}
                  />
                  <p>
                    دامنه یا دامین یا domain نامی یکتا و بیانگر هویت و نشانی
                    دسترسی یک وب سایت است. هر دامنه از دو بخش تشکیل شده است؛ بخش
                    اول نامی است انتخابی، که هر فرد می‌تواند بسته به موضوع
                    وب‌سایت و سلیقه خود آن را انتخاب نماید و بخش دوم نیز که با
                    یک نقطه از بخش اول جدا می‌شود، پسوندی است و هر فرد می‌تواند
                    بسته به موضوع وب‌سایت و سلیقۀ خود یکی از آن‌ها را انتخاب
                    نماید.
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default connect(
  (state: RootState) => {
    return {
      currencies: state.currencies,
    };
  },
  { setSelectedDomain }
)(withRouter(Domain));

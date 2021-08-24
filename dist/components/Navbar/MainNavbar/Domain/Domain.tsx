import React from 'react';
import { Form, OverlayTrigger, Spinner, Tooltip } from 'react-bootstrap';
import {
  Col,
  Image,
  Dropdown,
  Row,
  Container,
  FormControl,
  InputGroup,
  Button,
} from 'react-bootstrap';
import styles from './Domain.module.scss';
import { withRouter, NextRouter } from 'next/router';
import classNames from 'classnames';
import { ITld } from '../../../../pages/_app';
import formatPriceWithCurrency from '../../../../helper/formatPriceWithCurrency';
import { setDomainForShop } from '../../../../redux/actions';
import { connect } from 'react-redux';
import axios from 'axios';
import { RootState } from '../../../../store';
import Link from 'next/link';

type error = 'data_validation' | 'data_duplicate';

const showError = (errorMsg: error) => {
  if (errorMsg === 'data_duplicate') {
    return 'داده وارد شده تکراری است';
  } else if (errorMsg === 'data_validation') {
    return 'داده وارد شده معتبر نیست';
  }
};

interface IProps {
  changeShowDropDown: () => void;
  router: NextRouter;
  tlds: ITld[];
  currencies: RootState['currencies'];
  setDomainForShop: (domain: { tld: string; name: string }) => void;
}

interface IState {
  selectedDomain: string | null;
  loading: boolean;
  isFormValidated: boolean;
  errorCode: error;
  selectedDomains: any;
}

class Domain extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      selectedDomain: null,
      selectedDomains: [],
      loading: false,
      isFormValidated: false,
      errorCode: 'data_validation',
    };
    this.moreBtn = this.moreBtn.bind(this);
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

  checkDomain(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      this.setState({ loading: true });

      axios(
        'https://jsonblob.com/api/jsonBlob/d3196d4f-e2e1-11eb-b284-d50b7a049077'
      )
        .then((res) => {
          this.props.setDomainForShop({
            tld: form.tld.value,
            name: form.domainName.value,
          });
          this.setState({ loading: false });

          // if (res.data.status) {
          // } else if (!res.data.status) {
          //   res.data.error.forEach((errorItem) => {
          //     if (errorItem.input === 'name') {
          //       form.domainName.value = '';
          //       this.setState({ errorCode: errorItem.code });
          //     }
          //   });
          // }
        })
        .catch(() => {
          this.setState({ loading: false });
        });
    }

    this.setState({ isFormValidated: true });
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
                      <Button
                        type="submit"
                        variant="success"
                        className={styles.moreBtn}
                        onClick={this.moreBtn}
                      >
                        <span>بیشتر</span>
                      </Button>
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
                                    this.props.currencies.items,
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
                                    this.props.currencies.items,
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
                  <Form
                    className="mt-5"
                    onSubmit={this.checkDomain}
                    validated={this.state.isFormValidated}
                    noValidate
                  >
                    <InputGroup className={styles.formInputGroup}>
                      <FormControl
                        as="select"
                        className="mr-sm-2"
                        dir="ltr"
                        name="tld"
                        onChange={(e) => this.changeSelectedDomain(e)}
                        required
                        custom
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
                      </FormControl>
                      <FormControl
                        type="text"
                        placeholder="Your Domain"
                        name="domainName"
                        required
                      />
                      <InputGroup.Prepend>
                        <InputGroup.Text dir="ltr">www.</InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control.Feedback
                        type="invalid"
                        className={styles.errorMsg}
                      >
                        {showError(this.state.errorCode)}
                      </Form.Control.Feedback>
                    </InputGroup>
                    <Button
                      type="submit"
                      variant="success"
                      className={styles.searchDomainBtn}
                      disabled={this.state.loading}
                    >
                      {this.state.loading ? (
                        <Spinner size="sm" animation="border" />
                      ) : (
                        <>
                          <i className="fas fa-search"></i>
                          <span>بررسی کن</span>
                        </>
                      )}
                    </Button>
                  </Form>
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

const mapStateToProps = (state: RootState) => {
  return {
    currencies: state.currencies,
  };
};

export default connect(mapStateToProps, { setDomainForShop })(
  withRouter(Domain)
);

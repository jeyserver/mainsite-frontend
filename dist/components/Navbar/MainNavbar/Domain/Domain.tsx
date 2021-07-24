import Link from 'next/link';
import React from 'react';
import { OverlayTrigger, Spinner, Tooltip } from 'react-bootstrap';
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
import { domainsForNavbarType } from '../../../../pages/_app';
import { formatPrice } from '../../../helper/formatPrice';
import { setDomainForShop } from '../../../../redux/actions';
import { connect } from 'react-redux';
import axios from 'axios';

export interface DomainProps {
  changeShowDropDown: () => void;
  router: NextRouter;
  domains: domainsForNavbarType;
  setDomainForShop: (domain: { tld: string; name: string }) => void;
}

export interface DomainState {
  selectedDomain: string | null;
  loading: boolean;
}

class Domain extends React.Component<DomainProps, DomainState> {
  constructor(props: DomainProps) {
    super(props);
    this.state = { selectedDomain: null, loading: false };
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
    this.setState({ selectedDomain: e.target.value }, () => {
      const tr = document.querySelectorAll(
        'tr > td[data-selected="true"]'
      ) as any;

      if (this.state.selectedDomain) {
        const tableWrapper = document.querySelector('#tableWrapper') as any;
        tableWrapper.scrollTop = tr[0].parentElement.offsetTop;
      }
    });
  }

  moreBtn() {
    this.props.router.push('/domain');
  }

  checkDomain(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    this.setState({ loading: true });
    axios(
      'https://jsonblob.com/api/jsonBlob/d3196d4f-e2e1-11eb-b284-d50b7a049077'
    )
      .then(() => {
        this.props.setDomainForShop({
          tld: form.tld.value,
          name: form.domainName.value,
        });
        this.setState({ loading: false });
      })
      .catch(() => {
        this.setState({ loading: false });
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
                    <a href="/fa/domain" className={styles.tableTitle}>
                      تعرفه ثبت دامنه
                    </a>
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip
                          className={styles.moreBtnDominToolpit}
                          id="moreBtnDominToolpit"
                        >
                          مشاهده {this.props.domains.items.length} پسوند دیگر
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
                          {this.props.domains.items.map((domain) => (
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
                                {formatPrice(domain.new)}{' '}
                                {this.props.domains.currency.title}
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
                  <form className="mt-5" onSubmit={this.checkDomain}>
                    <InputGroup className={styles.formInputGroup}>
                      <FormControl
                        as="select"
                        className="mr-sm-2"
                        dir="ltr"
                        name="tld"
                        onChange={(e) => this.changeSelectedDomain(e)}
                        required
                      >
                        {this.props.domains.items.map((domain) => (
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
                  </form>
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

export default connect(null, { setDomainForShop })(withRouter(Domain));

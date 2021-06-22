import Link from 'next/link';
import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
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

export interface DomainProps {
  changeShowDropDown: () => void;
  router: NextRouter;
}

export interface DomainState {
  selectedDomain: string | null;
}

class Domain extends React.Component<DomainProps, DomainState> {
  constructor(props: DomainProps) {
    super(props);
    this.state = { selectedDomain: null };
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
    this.props.router.push('/fa/domain');
  }

  render() {
    const renderTooltip = (props) => (
      <Tooltip id="button-tooltip" {...props}>
        Simple tooltip
      </Tooltip>
    );

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

        <Dropdown.Menu className="nav-item-dropdown-menu px-3 py-0">
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
                          مشاهده ۱۴۵ پسوند دیگر
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
                    <div className={styles.tableHeader}>
                      <div>پسوند</div>
                      <div>قیمت ثبت</div>
                    </div>
                    <div className={styles.tableWrapper} id="tableWrapper">
                      <table className="table">
                        <tbody>
                          <tr>
                            <td
                              data-selected={
                                this.state.selectedDomain === 'com'
                              }
                            >
                              com
                            </td>
                            <td
                              data-selected={
                                this.state.selectedDomain === 'com'
                              }
                            >
                              247,520 تومان
                            </td>
                          </tr>
                          <tr>
                            <td
                              data-selected={
                                this.state.selectedDomain === 'net'
                              }
                            >
                              net
                            </td>
                            <td
                              data-selected={
                                this.state.selectedDomain === 'net'
                              }
                            >
                              257,920 تومان
                            </td>
                          </tr>
                          <tr>
                            <td
                              data-selected={
                                this.state.selectedDomain === 'org'
                              }
                            >
                              org
                            </td>
                            <td
                              data-selected={
                                this.state.selectedDomain === 'org'
                              }
                            >
                              303,420 تومان
                            </td>
                          </tr>
                          <tr>
                            <td
                              data-selected={
                                this.state.selectedDomain === 'info'
                              }
                            >
                              info
                            </td>
                            <td
                              data-selected={
                                this.state.selectedDomain === 'info'
                              }
                            >
                              104,520 تومان
                            </td>
                          </tr>
                          <tr>
                            <td
                              data-selected={
                                this.state.selectedDomain === 'asia'
                              }
                            >
                              asia
                            </td>
                            <td
                              data-selected={
                                this.state.selectedDomain === 'asia'
                              }
                            >
                              388,700 تومان
                            </td>
                          </tr>
                          <tr>
                            <td
                              data-selected={this.state.selectedDomain === 'co'}
                            >
                              co
                            </td>
                            <td
                              data-selected={this.state.selectedDomain === 'co'}
                            >
                              814,060 تومان
                            </td>
                          </tr>
                          <tr>
                            <td
                              data-selected={this.state.selectedDomain === 'ir'}
                            >
                              ir
                            </td>
                            <td
                              data-selected={this.state.selectedDomain === 'ir'}
                            >
                              14,000 تومان
                            </td>
                          </tr>
                          <tr>
                            <td
                              data-selected={this.state.selectedDomain === 'cc'}
                            >
                              cc
                            </td>
                            <td
                              data-selected={this.state.selectedDomain === 'cc'}
                            >
                              355,420 تومان
                            </td>
                          </tr>
                          <tr>
                            <td
                              data-selected={this.state.selectedDomain === 'ca'}
                            >
                              ca
                            </td>
                            <td
                              data-selected={this.state.selectedDomain === 'ca'}
                            >
                              346,320 تومان
                            </td>
                          </tr>
                          <tr>
                            <td
                              data-selected={this.state.selectedDomain === 'de'}
                            >
                              de
                            </td>
                            <td
                              data-selected={this.state.selectedDomain === 'de'}
                            >
                              215,020 تومان
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </Col>
              <Col xs={12} md={4} className={styles.centerCol}>
                <div className={styles.domainCheck}>
                  <h4>نقطه شروع همه چیز اینجاست!</h4>
                  <form className="mt-5">
                    <InputGroup className={styles.formInputGroup}>
                      <FormControl
                        as="select"
                        className="mr-sm-2"
                        dir="ltr"
                        onChange={(e) => this.changeSelectedDomain(e)}
                      >
                        <option value="com">.com</option>
                        <option value="net">.net</option>
                        <option value="org">.org</option>
                        <option value="info">.info</option>
                        <option value="asia">.asia</option>
                        <option value="co">co</option>
                        <option value="ir">ir</option>
                        <option value="cc">cc</option>
                        <option value="ca">ca</option>
                        <option value="de">de</option>
                      </FormControl>
                      <FormControl placeholder="Your Domain" />
                      <InputGroup.Prepend>
                        <InputGroup.Text dir="ltr">www.</InputGroup.Text>
                      </InputGroup.Prepend>
                    </InputGroup>
                    <Button
                      type="submit"
                      variant="success"
                      className={styles.searchDomainBtn}
                    >
                      <i className="fas fa-search"></i>
                      <span>بررسی کن</span>
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

export default withRouter(Domain);

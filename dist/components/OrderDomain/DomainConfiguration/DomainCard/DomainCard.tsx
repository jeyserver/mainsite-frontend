import classNames from 'classnames';
import * as React from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { deleteOrderedDomain } from '../../../../redux/actions';
import styles from './DomainCard.module.scss';

type error = 'data_validation' | 'data_duplicate';

export interface DomainCardProps {
  nationalDomain: boolean;
  domain: any;
  transfer: boolean;
  deleteOrderedDomain: (targetTld) => void;
  store?: any;
  errors: {
    type: string;
    code: error;
    input: string;
    error: error;
  }[];
}

export interface DomainCardState {}

const showError = (errorMsg: error) => {
  if (errorMsg === 'data_duplicate') {
    return 'داده وارد شده تکراری است';
  } else if (errorMsg === 'data_validation') {
    return 'داده وارد شده معتبر نیست';
  }
};

class DomainCard extends React.Component<DomainCardProps, DomainCardState> {
  constructor(props: DomainCardProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={styles.product}>
        <div className={styles.topRow}>
          <div className={styles.title}>
            <strong>
              {this.props.domain.name}.{this.props.domain.tld.tld}
            </strong>
            <span>{this.props.domain.time}</span>
          </div>
          <div>
            <Button
              variant="danger"
              className={styles.deleteBtn}
              disabled={
                this.props.store.orderedDomains.inPending.filter(
                  (i) => i === this.props.domain.tld.tld
                ).length > 0
              }
              onClick={() =>
                this.props.deleteOrderedDomain(this.props.domain.tld.tld)
              }
            >
              {this.props.store.orderedDomains.inPending.filter(
                (i) => i === this.props.domain.tld.tld
              ).length > 0 ? (
                <>
                  <i className="fas fa-spinner"></i>
                  حذف از سبد خرید
                </>
              ) : (
                <>
                  <i className="fa fa-trash pull-right" />
                  حذف از سبد خرید
                </>
              )}
            </Button>
          </div>
        </div>

        {this.props.transfer ? (
          <div className={styles.transfer}>
            <div className={styles.alert}>
              <label>کد انتقال</label>
            </div>
            <Row className="justify-content-center">
              <Col md={6}>
                <Form.Control
                  type="text"
                  required
                  placeholder=" این کد را باید از شرکت ثبت کننده فعلی دامنه درخواست کنید"
                />
                <Form.Control.Feedback type="invalid">
                  لطفا این قسمت را پر کنید
                </Form.Control.Feedback>
              </Col>
            </Row>
          </div>
        ) : (
          <>
            <Row>
              <Col xs={12}>
                {this.props.nationalDomain ? (
                  <>
                    <div className={styles.alert}>
                      حتما شناسه ایرنیک را به صورت صحیح وارد نمایید در غیر
                      اینصورت مسئولیت مبلغ واریز شده بر عهده ما نمی باشد و از
                      استرداد مبلغ معذوریم
                    </div>
                    <div className={styles.alert}>
                      برای ثبت دامنه به مالکیت شما باید در شناسه ی ایرنیک در
                      قسمت "رابط های مجاز" گزینه "آزاد برای نمایندگان فروش" را
                      انتخاب نمائید.
                    </div>

                    <div className={classNames(styles.alert)}>
                      <Row>
                        <Col md={3} className="d-none d-md-block"></Col>
                        <Col md={5}>
                          <Form.Group controlId="irnic">
                            <Form.Label>شناسه ی ایرنیک</Form.Label>
                            <Form.Control type="text" required />
                            <Form.Control.Feedback type="invalid">
                              لطفا این قسمت را پر کنید
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col
                          md={4}
                          className="d-flex flex-column align-items-center"
                        >
                          <a
                            className="btn btn-link"
                            target="_blank"
                            href="https://www.nic.ir/Create_New_Handle"
                            rel="nofollow"
                          >
                            ساخت شناسه جدید
                          </a>
                          <a
                            className="btn btn-link"
                            target="_blank"
                            href="https://blog.jeyserver.com/howto-register-ir-domain"
                          >
                            آموزش ثبت دامنه های ir
                          </a>
                        </Col>
                      </Row>
                    </div>
                  </>
                ) : (
                  <div>
                    {this.props.store.auth.isLoggedIn ? (
                      <div className={styles.selectDomainPanel}>
                        <div>پنل دامنه را انتخاب کنید</div>
                        <Form.Control as="select" custom>
                          <option value="-">هیچکدام</option>
                        </Form.Control>
                      </div>
                    ) : (
                      <div className={styles.dnsAlert}>
                        <span>
                          برای ثبت این دامنه به مالکیت شما نیاز هست تا بعد از
                          پرداخت صورتحساب به صورتحساب بازگردید و پنل ثبت کننده ی
                          دامنه را (از طریق دکمه ی پیکربندی مقابل محصول دامنه)
                          مشخص کنید.
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </Col>
            </Row>

            <Row>
              <Col xs={12}>
                <p className={styles.info}>
                  اگر مایل به استفاده از NameServer های سرویس دیگری هستید آنها
                  را در اینجا وارد کنید. به صورت پیش فرض روی دامنه های جدید
                  ،NameServer های ما تنظیم میشود.
                </p>
              </Col>
              <Col xs={12}>
                <div className={styles.nameservers}>
                  <div className={styles.nameserver}>
                    <Form.Group controlId="nameserver-1">
                      <Form.Label>NameServer 1</Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={this.props.domain.name_servers['1']}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {this.props.errors.find(
                          (error) => error.input === `name_servers_1`
                        )
                          ? showError(
                              this.props.errors.find(
                                (error) => error.input === `name_servers_1`
                              ).error
                            )
                          : 'داده وارد شده معتبر نیست'}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                  <div className={styles.nameserver}>
                    <Form.Group controlId="nameserver-2">
                      <Form.Label>NameServer 2</Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={this.props.domain.name_servers['2']}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {this.props.errors.find(
                          (error) => error.input === `name_servers_2`
                        )
                          ? showError(
                              this.props.errors.find(
                                (error) => error.input === `name_servers_2`
                              ).error
                            )
                          : 'داده وارد شده معتبر نیست'}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                  <div className={styles.nameserver}>
                    <Form.Group controlId="nameserver-3">
                      <Form.Label>NameServer 3</Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={this.props.domain.name_servers['3']}
                        isInvalid={this.props.errors.some(
                          (error) => error.input === `name_servers_3`
                        )}
                      />
                      <Form.Control.Feedback type="invalid">
                        {this.props.errors.find(
                          (error) => error.input === `name_servers_3`
                        )
                          ? showError(
                              this.props.errors.find(
                                (error) => error.input === `name_servers_3`
                              ).error
                            )
                          : 'داده وارد شده معتبر نیست'}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                  <div className={styles.nameserver}>
                    <Form.Group controlId="nameserver-4">
                      <Form.Label>NameServer 4</Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={this.props.domain.name_servers['4']}
                        isInvalid={this.props.errors.some(
                          (error) => error.input === `name_servers_4`
                        )}
                      />
                      <Form.Control.Feedback type="invalid">
                        {this.props.errors.find(
                          (error) => error.input === `name_servers_4`
                        )
                          ? showError(
                              this.props.errors.find(
                                (error) => error.input === `name_servers_4`
                              ).error
                            )
                          : 'داده وارد شده معتبر نیست'}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                </div>
              </Col>
            </Row>
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { store: state };
};

export default connect(mapStateToProps, { deleteOrderedDomain })(DomainCard);

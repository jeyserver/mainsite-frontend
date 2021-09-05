import * as React from 'react';
import classNames from 'classnames';
import { ErrorMessage } from 'formik';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import IDomainProduct from '../../../../../helper/types/cart/domain';
import { RootState } from '../../../../../store';
import { deleteFromForConfigure as deleteDomain } from '../../../../../store/Domain';
import styles from './DomainCard.module.scss';

interface IProps {
  nationalDomain: boolean;
  domain: IDomainProduct;
  transfer: boolean;
  deleteOrderedDomain: (targetTld) => void;
  storeDomain: RootState['domain'];
  auth: RootState['auth'];
  deleteDomain: typeof deleteDomain;
}

class DomainCard extends React.Component<IProps> {
  render() {
    const domain = this.props.domain;

    return (
      <div className={styles.product}>
        <div className={styles.topRow}>
          <div className={styles.title}>
            <strong>
              {domain.domain}.{domain.tld.tld}
            </strong>
            <span>یک ساله</span>
          </div>
          <div>
            <Button
              variant="danger"
              className={styles.deleteBtn}
              // disabled={
              //   this.props.store.orderedDomains.inPending.filter(
              //     (i) => i === this.props.domain.tld.tld
              //   ).length > 0
              // }
              onClick={() => this.props.deleteDomain(domain.id)}
            >
              {/* {this.props.store.orderedDomains.inPending.filter(
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
              )} */}
              <i className="fa fa-trash pull-right" />
              حذف از سبد خرید
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
                  name={`products[${domain.id}][transfer_code]`}
                  placeholder=" این کد را باید از شرکت ثبت کننده فعلی دامنه درخواست کنید"
                />
                <div className="form-err-msg">
                  <ErrorMessage
                    name={`products[${domain.id}][transfer_code]`}
                  />
                </div>
                {/* لطفا این قسمت را پر کنید */}
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
                            <Form.Control
                              type="text"
                              name={`products[${domain.id}][panel]`}
                            />
                            <div className="form-err-msg">
                              <ErrorMessage
                                name={`products[${domain.id}][panel]`}
                              />
                            </div>
                            {/* لطفا این قسمت را پر کنید */}
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
                    {this.props.auth.isLoggedIn ? (
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
                    <Form.Group>
                      <Form.Label>NameServer 1</Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue="ns1.jeyserver.com"
                        name={`products[${domain.id}][dns][1]`}
                      />
                      <div className="form-err-msg">
                        <ErrorMessage name={`products[${domain.id}][dns][1]`} />
                      </div>
                    </Form.Group>
                  </div>
                  <div className={styles.nameserver}>
                    <Form.Group controlId="nameserver-2">
                      <Form.Label>NameServer 2</Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue="ns2.jeyserver.com"
                        name={`products[${domain.id}][dns][2]`}
                      />
                      <div className="form-err-msg">
                        <ErrorMessage name={`products[${domain.id}][dns][2]`} />
                      </div>
                    </Form.Group>
                  </div>
                  <div className={styles.nameserver}>
                    <Form.Group controlId="nameserver-3">
                      <Form.Label>NameServer 3</Form.Label>
                      <Form.Control
                        type="text"
                        name={`products[${domain.id}][dns][3]`}
                      />
                      <div className="form-err-msg">
                        <ErrorMessage name={`products[${domain.id}][dns][3]`} />
                      </div>
                    </Form.Group>
                  </div>
                  <div className={styles.nameserver}>
                    <Form.Group controlId="nameserver-4">
                      <Form.Label>NameServer 4</Form.Label>
                      <Form.Control
                        type="text"
                        name={`products[${domain.id}][dns][4]`}
                      />
                      <div className="form-err-msg">
                        <ErrorMessage name={`products[${domain.id}][dns][4]`} />
                      </div>
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

export default connect(
  (state: RootState) => {
    return { storeDomain: state.domain, auth: state.auth };
  },
  { deleteDomain }
)(DomainCard);

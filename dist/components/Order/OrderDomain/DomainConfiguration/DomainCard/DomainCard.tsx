import * as React from 'react';
import classNames from 'classnames';
import { ErrorMessage, Field } from 'formik';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import IDomainProduct from '../../../../../helper/types/cart/domain';
import { AsyncThunkAction, RootState } from '../../../../../store';
import { deleteDomain } from '../../../../../store/Domain';
import { NotificationManager } from 'react-notifications';
import styles from './DomainCard.module.scss';
import FormErrorMessage from '../../../../../helper/components/FormErrorMessage';
import IError from '../../../../../helper/types/base/error';

interface IProps {
  nationalDomain: boolean;
  domain: IDomainProduct;
  transfer: boolean;
  storeDomain: RootState['domain'];
  auth: RootState['auth'];
  deleteDomain: AsyncThunkAction<any, { id: string | number }>;
  errors: IError[];
}

interface IState {
  deleteBtnLoading: boolean;
}

class DomainCard extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      deleteBtnLoading: false,
    };
  }

  async deleteDomain() {
    this.setState({ deleteBtnLoading: true });
    try {
      await this.props.deleteDomain({ id: this.props.domain.id }).unwrap();
    } catch {
      NotificationManager.error(
        'ارتباط با سامانه بدرستی انجام نشد، لطفا مجددا تلاش کنید.',
        'خطا'
      );
    } finally {
      this.setState({ deleteBtnLoading: false });
    }
  }

  ppToPersian(number) {
    switch (number) {
      case 1:
        return 'یک';
      case 2:
        return 'دو';
      case 3:
        return 'سه';
      case 4:
        return 'چهار';
      case 5:
        return 'پنج';
      default:
        return '';
    }
  }

  getPP() {
    const domain = this.props.domain;
    switch (domain.type) {
      case 'register':
        return `${this.ppToPersian(
          Math.round(domain.price / domain.tld.new)
        )} ساله`;
      case 'transfer':
        return `${this.ppToPersian(
          Math.round(domain.price / domain.tld.transfer)
        )} ساله`;
      case 'owndomain':
        return `${this.ppToPersian(
          Math.round(domain.price / domain.tld.renew)
        )} ساله`;
      default:
        return '';
    }
  }

  render() {
    const domain = this.props.domain;

    return (
      <div className={styles.product}>
        <div className={styles.topRow}>
          <div className={styles.title}>
            <strong>
              {domain.domain}.{domain.tld.tld}
            </strong>
            <span>{this.getPP()}</span>
          </div>
          <div>
            <Button
              variant="danger"
              className={styles.deleteBtn}
              disabled={this.state.deleteBtnLoading}
              onClick={() => this.deleteDomain()}
            >
              {this.state.deleteBtnLoading ? (
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
                  placeholder=" این کد را باید از شرکت ثبت کننده فعلی دامنه درخواست کنید"
                  name={`products[${domain.id}][transfer_code]`}
                  className="form-control ltr"
                  type="text"
                  required
                />
                <FormErrorMessage
                  input={`products[${domain.id}][transfer_code]`}
                  errors={this.props.errors}
                />
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
                              className="ltr"
                              required
                            />
                            <FormErrorMessage
                              input={`products[${domain.id}][panel]`}
                              errors={this.props.errors}
                            />
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
                        name={`products[${domain.id}][dns][1]`}
                        defaultValue="ns1.jeyserver.com"
                        className="form-control"
                        type="text"
                        required
                      />
                      <FormErrorMessage
                        input={`products[${domain.id}][dns][1]`}
                        errors={this.props.errors}
                      />
                    </Form.Group>
                  </div>
                  <div className={styles.nameserver}>
                    <Form.Group controlId="nameserver-2">
                      <Form.Label>NameServer 2</Form.Label>
                      <Form.Control
                        name={`products[${domain.id}][dns][2]`}
                        defaultValue="ns2.jeyserver.com"
                        className="form-control"
                        type="text"
                        required
                      />
                      <FormErrorMessage
                        input={`products[${domain.id}][dns][2]`}
                        errors={this.props.errors}
                      />
                    </Form.Group>
                  </div>
                  <div className={styles.nameserver}>
                    <Form.Group controlId="nameserver-3">
                      <Form.Label>NameServer 3</Form.Label>
                      <Form.Control
                        name={`products[${domain.id}][dns][3]`}
                        className="form-control"
                        type="text"
                      />
                      <FormErrorMessage
                        input={`products[${domain.id}][dns][3]`}
                        errors={this.props.errors}
                      />
                    </Form.Group>
                  </div>
                  <div className={styles.nameserver}>
                    <Form.Group controlId="nameserver-4">
                      <Form.Label>NameServer 4</Form.Label>
                      <Form.Control
                        name={`products[${domain.id}][dns][4]`}
                        className="form-control"
                        type="text"
                      />
                      <FormErrorMessage
                        input={`products[${domain.id}][dns][4]`}
                        errors={this.props.errors}
                      />
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

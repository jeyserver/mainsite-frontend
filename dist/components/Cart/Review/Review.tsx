import * as React from 'react';
import { Form, Table } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
import PagesHeader from '../../PagesHeader/PagesHeader';
import OrderSteps from '../OrderSteps/OrderSteps';
import styles from './Review.module.scss';

export interface ReviewProps {}

export interface ReviewState {}

class Review extends React.Component<ReviewProps, ReviewState> {
  constructor(props: ReviewProps) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <section>
        <PagesHeader title="تایید سفارش" />

        <div className={styles.mainContent}>
          <Container>
            <Row>
              <Col md={3}>
                <OrderSteps step="confirmation" />
              </Col>
              <Col md={9}>
                <div style={{ padding: '0 15px' }}>
                  <h2 className={styles.title}>تایید سفارش</h2>
                  <Table striped responsive className={styles.table}>
                    <thead>
                      <tr>
                        <th>سفارشات</th>
                        <th>توضیحات</th>
                        <th>مدت</th>
                        <th>تخفیف</th>
                        <th>قیمت</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody className="text-align">
                      <tr>
                        <td>
                          سرور اختصاصی EX52-NVMe <br />
                        </td>
                        <td className="noper"></td>
                        <td>برای 1 ماه </td>
                        <td>0 تومان </td>
                        <td>6446500 تومان </td>
                        <td>
                          <button type="button" className={styles.deleteBtn}>
                            حذف
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                  <Row className="justify-content-end">
                    <Col md={8} lg={6}>
                      <ul className={styles.cartList}>
                        <li className={styles.cartListItem}>
                          <span>قیمت: </span>
                          <span>6,446,500 تومان</span>
                        </li>
                        <li className={styles.cartListItem}>
                          <span>تخفیف: </span>
                          <span>0 تومان</span>
                        </li>
                        <li className={styles.cartListItem}>
                          <span>قابل پرداخت: </span>
                          <span>6,446,500 تومان</span>
                        </li>
                      </ul>
                    </Col>
                  </Row>
                </div>
                <Row>
                  <Form>
                    <Col xs={12} className={styles.well}>
                      <Col md={8}>
                        <Form.Group>
                          <Form.Label>کد تخفیف</Form.Label>
                          <Form.Control type="text" />
                        </Form.Group>
                      </Col>
                    </Col>
                  </Form>
                </Row>
                <Row className="justify-content-center">
                  <Col md={6}>
                    <div className={styles.btnGroup}>
                      <button className={styles.completeOrder}>
                        تکمیل سفارش
                      </button>
                      <button className={styles.checkDiscountCode}>
                        بررسی کد تخفیف
                      </button>
                      <button className={styles.restartOrder}>
                        شروع دوباره
                      </button>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
      </section>
    );
  }
}

export default Review;

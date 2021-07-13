import classNames from 'classnames';
import * as React from 'react';
import { Container, Col, Row, Form, Button } from 'react-bootstrap';
import OrderSteps from '../../OrderDedicatedServer/OrderSteps/OrderSteps';
import PagesHeader from '../../PagesHeader/PagesHeader';
import styles from './CompleteOrder.module.scss';
import SigninForm from './SigninForm/SigninForm';
import SignupForm from './SignupForm/SignupForm';

export interface CompleteOrderProps {}

export interface CompleteOrderState {
  loginMethod: 'signup' | 'signin';
}

class CompleteOrder extends React.Component<
  CompleteOrderProps,
  CompleteOrderState
> {
  constructor(props: CompleteOrderProps) {
    super(props);
    this.state = {
      loginMethod: 'signup',
    };
    this.changeLoginMethod = this.changeLoginMethod.bind(this);
  }

  changeLoginMethod(e) {
    this.setState({ loginMethod: e.target.value });
  }

  render() {
    return (
      <section>
        <PagesHeader title="تکمیل سفارش" />

        <div className={styles.mainContent}>
          <Container>
            <Row>
              <Col md={3}>
                <OrderSteps step="complete-order" />
              </Col>
              <Col md={9}>
                <div style={{ padding: '0 15px' }}>
                  <h2 className={styles.title}>تکمیل سفارش</h2>
                  <p className={styles.info}>مشخصات شما</p>
                  <Row>
                    <Col xs={12} className={styles.signupOrLogin}>
                      <Form.Group>
                        <label>
                          <input
                            type="radio"
                            name="dologin"
                            defaultValue="signup"
                            onChange={this.changeLoginMethod}
                            defaultChecked
                          />
                          مشتری جدید هستم | ثبت نام
                        </label>
                      </Form.Group>
                      <Form.Group>
                        <label>
                          <input
                            type="radio"
                            name="dologin"
                            defaultValue="signin"
                            onChange={this.changeLoginMethod}
                          />
                          قبلا ثبت نام کرده ام | ورود
                        </label>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className={styles.methodsWrapper}>
                    <Row
                      className={classNames(
                        {
                          [styles.show]: this.state.loginMethod === 'signin',
                          [styles.hidden]: this.state.loginMethod === 'signup',
                        },
                        'justify-content-center',
                        styles.signin
                      )}
                    >
                      <Col md={8} className="d-flex justify-content-center">
                        <SigninForm />
                      </Col>
                    </Row>
                    <Row
                      className={classNames(
                        {
                          [styles.show]: this.state.loginMethod === 'signup',
                          [styles.hidden]: this.state.loginMethod === 'signin',
                        },
                        styles.signup
                      )}
                    >
                      <Col md={12}>
                        <SignupForm />
                      </Col>
                    </Row>
                  </Row>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </section>
    );
  }
}

export default CompleteOrder;

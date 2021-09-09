import classNames from 'classnames';
import * as React from 'react';
import { Container, Col, Row, Form, Button } from 'react-bootstrap';
import { countriesType } from '../../../pages/order/cart/complete';
import OrderSteps from '../../Order/OrderDedicatedServer/OrderSteps/OrderSteps';
import PagesHeader from '../../PagesHeader/PagesHeader';
import styles from './CompleteOrder.module.scss';
import SigninForm from './SigninForm/SigninForm';
import SignupForm from './SignupForm/SignupForm';

interface IProps {}

interface IState {
  loginMethod: 'signup' | 'signin';
}

class CompleteOrder extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      loginMethod: 'signup',
    };
  }

  changeLoginMethod(e: React.ChangeEvent<HTMLInputElement>) {
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
                            onChange={(e) => this.changeLoginMethod(e)}
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
                            onChange={(e) => this.changeLoginMethod(e)}
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
                          [styles.signin]: true,
                        },
                        'justify-content-center'
                      )}
                    >
                      <Col md={8} className="d-flex justify-content-center">
                        <SigninForm />
                      </Col>
                    </Row>
                    <Row
                      className={classNames({
                        [styles.show]: this.state.loginMethod === 'signup',
                        [styles.hidden]: this.state.loginMethod === 'signin',
                        [styles.signup]: true,
                      })}
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

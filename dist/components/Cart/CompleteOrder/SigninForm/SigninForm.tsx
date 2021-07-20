import * as React from 'react';
import { InputGroup, Row, Col, Form } from 'react-bootstrap';
import styles from './SigninForm.module.scss';

export interface SigninFormProps {}

export interface SigninFormState {}

class SigninForm extends React.Component<SigninFormProps, SigninFormState> {
  constructor(props: SigninFormProps) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Form className={styles.form}>
        <InputGroup className={styles.inputGroup}>
          <span className={styles.icon}>
            <i className="fa fa-user"></i>
          </span>
          <Form.Control type="text" />
          <span className={styles.floatPlaceHolder}>ایمیل یا شماره همراه</span>
        </InputGroup>

        <InputGroup className={styles.inputGroup}>
          <span className={styles.icon}>
            <i className="fa fa-lock"></i>
          </span>
          <Form.Control type="password" />
          <span className={styles.floatPlaceHolder}>کلمه عبور</span>
        </InputGroup>

        <Row className="justify-content-center">
          <Col md={6}>
            <button type="submit" className={styles.loginbtn}>
              ورود
            </button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default SigninForm;

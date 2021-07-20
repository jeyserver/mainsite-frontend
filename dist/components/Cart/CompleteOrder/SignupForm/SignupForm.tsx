import * as React from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { ReactPhonenumber } from '../../../ReactPhonenumber/ReactPhonenumber';
import styles from './SignupForm.module.scss';

type error = 'data_validation' | 'data_duplicate';

const showError = (errorMsg: error) => {
  if (errorMsg === 'data_duplicate') {
    return 'داده وارد شده تکراری است';
  } else if (errorMsg === 'data_validation') {
    return 'داده وارد شده معتبر نیست';
  }
};

export interface SignupFormProps {}

export interface SignupFormState {
  firstNameError: error;
  lastNameError: error;
  emailError: error;
  phonenumberError: error;
  passwordError: error;
  formValidated: boolean;
}

class SignupForm extends React.Component<SignupFormProps, SignupFormState> {
  constructor(props: SignupFormProps) {
    super(props);
    this.state = {
      firstNameError: 'data_validation',
      lastNameError: 'data_validation',
      emailError: 'data_validation',
      phonenumberError: 'data_validation',
      passwordError: 'data_validation',
      formValidated: false,
    };
  }

  changePhoneNumber() {}

  onSubmitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      //go
    }

    this.setState({ formValidated: true });
  }

  render() {
    return (
      <Form
        className={styles.signupForm}
        onSubmit={(e) => this.onSubmitForm(e)}
        noValidate
        validated={this.state.formValidated}
      >
        <Row>
          <Col md={6}>
            <Form.Group className={styles.formGroup} controlId="firstname">
              <Form.Label>نام*</Form.Label>
              <Form.Control
                type="text"
                name="firstname"
                required
                placeholder="حسین"
              />
              <Form.Control.Feedback type="invalid">
                {showError(this.state.firstNameError)}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className={styles.formGroup} controlId="lastname">
              <Form.Label>نام خانوادگی*</Form.Label>
              <Form.Control
                type="text"
                name="lastname"
                required
                placeholder="امیری"
              />
              <Form.Control.Feedback type="invalid">
                {showError(this.state.lastNameError)}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className={styles.formGroup} controlId="email">
              <Form.Label>ایمیل*</Form.Label>
              <Form.Control
                type="email"
                name="email"
                required
                placeholder="username@example.com"
              />
              <Form.Control.Feedback type="invalid">
                {showError(this.state.emailError)}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className={styles.formGroup} controlId="passwordss1">
              <Form.Label>شماره همراه</Form.Label>
              <div className="phonenumber-input-wrapper">
                <ReactPhonenumber
                  countries={[
                    { code: 'IR', name: 'Iran', dialingCode: '98' },
                    { code: 'AF', name: 'Afghanistan', dialingCode: '93' },
                    { code: 'AL', name: 'Albania', dialingCode: '213' },
                    { code: 'AS', name: 'American Samoa', dialingCode: '1684' },
                  ]}
                  onChange={this.changePhoneNumber}
                  defaultCode="IR"
                />
              </div>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className={styles.formGroup} controlId="password1">
              <Form.Label>گذرواژه*</Form.Label>
              <Form.Control type="password" name="password1" required />
              <Form.Control.Feedback type="invalid">
                {showError(this.state.passwordError)}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className={styles.formGroup} controlId="password2">
              <Form.Label>تکرار گذرواژه*</Form.Label>
              <Form.Control type="password" name="password2" required />
              <Form.Control.Feedback type="invalid">
                {showError(this.state.passwordError)}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Form.Group>
              <label className={styles.termsCheckBox}>
                <input type="checkbox" name="tos" required defaultValue={1} />
                <a target="_blank" href="/fa/terms">
                  شرایط سرویس
                </a>
                را خواندم و موافق هستم.
                <Form.Control.Feedback type="invalid">
                  لطفا این قسمت را تایید کنید
                </Form.Control.Feedback>
              </label>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Button className={styles.submitBtn} type="submit">
              تکمیل سفارش
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default SignupForm;

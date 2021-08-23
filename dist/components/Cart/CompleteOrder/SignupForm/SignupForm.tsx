import * as React from 'react';
import axios from 'axios';
import classNames from 'classnames';
import { Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import { countriesType } from '../../../../pages/order/cart/complete';
import { ReactPhonenumber } from '../../../ReactPhonenumber/ReactPhonenumber';
import { NotificationManager } from 'react-notifications';
import styles from './SignupForm.module.scss';
import { connect } from 'react-redux';
import { signUp } from '../../../../redux/actions';

type error = 'data_validation' | 'data_duplicate';

const showError = (errorMsg: error) => {
  if (errorMsg === 'data_duplicate') {
    return 'داده وارد شده تکراری است';
  } else if (errorMsg === 'data_validation') {
    return 'داده وارد شده معتبر نیست';
  }
};

export interface SignupFormProps {
  countries: countriesType;
  defaultCountrySelected: string;
  signUp: (signUpDetails: any) => void;
}

export interface SignupFormState {
  firstNameError: error;
  lastNameError: error;
  emailError: error;
  phonenumberError: error;
  passwordError: error;
  password2Error: error;
  formValidated: boolean;
  submitBtnLoading: boolean;
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
      password2Error: 'data_validation',
      formValidated: false,
      submitBtnLoading: false,
    };
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  changePhoneNumber() {}

  onSubmitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      this.setState({ submitBtnLoading: true });

      axios
        .get(
          `https://jsonblob.com/api/jsonBlob/57cf67c8-eb0b-11eb-8813-cda002dae790`
        )
        .then((respone) => {
          this.setState({ submitBtnLoading: false });
          // this.props.signUp()

          // if (respone.data.status) {
          //   this.setState({ submitBtnLoading: false });
          //   // this.props.router.push('');
          // } else if (!respone.data.status) {
          //   respone.data.error.forEach((errorItem) => {
          //     if (errorItem.input === 'name') {
          //       form.firstName.value = '';
          //       this.setState({ firstNameError: errorItem.code });
          //     } else if (errorItem.input === 'lastName') {
          //       form.lastName.value = '';
          //       this.setState({ lastNameError: errorItem.code });
          //     } else if (errorItem.input === 'email') {
          //       form.email.value = '';
          //       this.setState({ emailError: errorItem.code });
          //     } else if (errorItem.input === 'cellphone[number]') {
          //       form.credential.value = '';
          //       this.setState({ phonenumberError: errorItem.code });
          //     } else if (errorItem.input === 'password') {
          //       form.password1.value = '';
          //       this.setState({ passwordError: errorItem.code });
          //     } else if (errorItem.input === 'password2') {
          //       form.password2.value = '';
          //       this.setState({ password2Error: errorItem.code });
          //     }
          //   });
          //   this.setState({ submitBtnLoading: false });
          // }
        })
        .catch((error) => {
          this.setState({ submitBtnLoading: false });

          NotificationManager.error(
            'ارتباط با سامانه بدرستی انجام نشد، لطفا مجددا تلاش کنید.',
            'خطا'
          );
        });
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
            <Form.Group
              className={classNames(styles.formGroup, styles.phoneNumber)}
              controlId="passwordss1"
            >
              <Form.Label>شماره همراه*</Form.Label>
              <div className="phonenumber-input-wrapper">
                <ReactPhonenumber
                  countries={this.props.countries}
                  onChange={this.changePhoneNumber}
                  defaultCode={this.props.defaultCountrySelected}
                  isSelectHide={false}
                  className="phoneNumberEmail"
                  selectName="signUpForm"
                  options={{ dir: 'rtl' }}
                  errorCode={this.state.phonenumberError}
                />
              </div>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className={styles.formGroup} controlId="password">
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
                {showError(this.state.password2Error)}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Form.Group>
              <label className={styles.termsCheckBox}>
                <input type="checkbox" name="tos" required defaultValue={1} />
                <a target="_blank" href="/terms">
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
            <Button
              className={styles.submitBtn}
              type="submit"
              disabled={this.state.submitBtnLoading}
            >
              {this.state.submitBtnLoading ? (
                <>
                  <Spinner animation="border" size="sm" />
                  <span>لطفا صبر کنید</span>
                </>
              ) : (
                'تکمیل سفارش'
              )}
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default connect(null, { signUp })(SignupForm);

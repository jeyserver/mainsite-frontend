import axios from 'axios';
import classNames from 'classnames';
import * as React from 'react';
import { InputGroup, Row, Col, Form, Spinner } from 'react-bootstrap';
import { countriesType } from '../../../../pages/order/cart/complete';
import { ReactPhonenumber } from '../../../ReactPhonenumber/ReactPhonenumber';
import { NotificationManager } from 'react-notifications';
import styles from './SigninForm.module.scss';
import { connect } from 'react-redux';
import { login } from '../../../../redux/actions';

type error = 'data_validation' | 'data_duplicate';

const showError = (errorMsg: error) => {
  if (errorMsg === 'data_duplicate') {
    return 'داده وارد شده تکراری است';
  } else if (errorMsg === 'data_validation') {
    return 'داده وارد شده معتبر نیست';
  }
};

export interface SigninFormProps {
  countries: countriesType;
  defaultCountrySelected: string;
  login: (loginDetails: any) => void;
}

export interface SigninFormState {
  signinFormValidated: boolean;
  isSelectHide: boolean;
  emailPhonenumberInput: string;
  password: string;
  emailPhoneNumberError: error;
  passwordError: error;
  submitBtnLoading: boolean;
}

class SigninForm extends React.Component<SigninFormProps, SigninFormState> {
  constructor(props: SigninFormProps) {
    super(props);
    this.state = {
      signinFormValidated: false,
      isSelectHide: true,
      emailPhonenumberInput: '',
      password: '',
      emailPhoneNumberError: 'data_validation',
      passwordError: 'data_validation',
      submitBtnLoading: false,
    };
    this.signin = this.signin.bind(this);
    this.changePhoneNumber = this.changePhoneNumber.bind(this);
    this.changePassword = this.changePassword.bind(this);
  }

  signin(e: React.ChangeEvent<HTMLFormElement>) {
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

          // this.props.loginDetails()

          // if (respone.data.status) {
          //   this.setState({ submitBtnLoading: false });
          //   // this.props.router.push('/order/cart/review');
          // } else if (!respone.data.status) {
          //   respone.data.error.forEach((errorItem) => {
          //     if (errorItem.input === 'credential') {
          //       form.credential.value = '';
          //       this.setState({ emailPhoneNumberError: errorItem.code });
          //     } else if (errorItem.input === 'password') {
          //       form.credential.value = '';
          //       this.setState({ passwordError: errorItem.code });
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

    this.setState({ signinFormValidated: true });
  }

  changePhoneNumber(phoneNumber, phonenumberObj, value, isFocusedOnInput) {
    if (/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g.test(value)) {
      this.setState({ isSelectHide: false });
    } else {
      this.setState({ isSelectHide: true });
    }

    this.setState({ emailPhonenumberInput: value });
  }

  changePassword(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    return (
      <Form
        className={styles.form}
        onSubmit={this.signin}
        validated={this.state.signinFormValidated}
        noValidate
      >
        <InputGroup className={styles.inputGroup}>
          <div className="phonenumber-input-wrapper">
            <ReactPhonenumber
              countries={this.props.countries}
              onChange={this.changePhoneNumber}
              defaultCode={this.props.defaultCountrySelected}
              isSelectHide={this.state.isSelectHide}
              className="phoneNumberEmail"
              selectName="signInForm"
              options={{ dir: 'rtl' }}
              floatPlaceHolder={{
                placeholder: 'ایمیل یا شماره همراه',
                icon: 'fa fa-user',
              }}
              errorCode={this.state.emailPhoneNumberError}
            />
          </div>
        </InputGroup>

        <InputGroup className={styles.inputGroup}>
          <span className={styles.icon}>
            <i className="fa fa-lock"></i>
          </span>
          <Form.Control
            type="password"
            onChange={this.changePassword}
            required
          />
          <span
            className={classNames(styles.floatPlaceHolder, {
              [styles.up]: this.state.password.length > 0,
            })}
          >
            کلمه عبور
          </span>
          <Form.Control.Feedback type="invalid">
            {showError(this.state.passwordError)}
          </Form.Control.Feedback>
        </InputGroup>

        <Row className="justify-content-center">
          <Col md={6}>
            <button
              type="submit"
              className={styles.loginbtn}
              disabled={this.state.submitBtnLoading}
            >
              {this.state.submitBtnLoading ? (
                <>
                  <Spinner animation="border" size="sm" />
                  <span>لطفا صبر کنید</span>
                </>
              ) : (
                'ورود'
              )}
            </button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default connect(null, { login })(SigninForm);

import classNames from 'classnames';
import * as React from 'react';
import { InputGroup, Row, Col, Form } from 'react-bootstrap';
import { countriesType } from '../../../../pages/order/cart/complete';
import { ReactPhonenumber } from '../../../ReactPhonenumber/ReactPhonenumber';
import styles from './SigninForm.module.scss';

export interface SigninFormProps {
  countries: countriesType;
  defaultCountrySelected: string;
}

export interface SigninFormState {
  signinFormValidated: boolean;
  isSelectHide: boolean;
  emailPhonenumberInput: string;
  password: string;
}

class SigninForm extends React.Component<SigninFormProps, SigninFormState> {
  constructor(props: SigninFormProps) {
    super(props);
    this.state = {
      signinFormValidated: false,
      isSelectHide: true,
      emailPhonenumberInput: '',
      password: '',
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
      //go
    }

    this.setState({ signinFormValidated: true });
  }

  changePhoneNumber(phoneNumber, phonenumberObj, value, isFocusedOnInput) {
    console.log(isFocusedOnInput);

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
            داده وارد شده معتبر نیست
          </Form.Control.Feedback>
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

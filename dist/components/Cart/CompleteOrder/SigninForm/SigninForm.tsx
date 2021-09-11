import * as React from 'react';
import classNames from 'classnames';
import { InputGroup, Row, Col, Spinner } from 'react-bootstrap';
import { ReactPhonenumber } from '../../../ReactPhonenumber/ReactPhonenumber';
import { NotificationManager } from 'react-notifications';
import styles from './SigninForm.module.scss';
import { connect } from 'react-redux';
import { ErrorMessage, Formik, Form, FormikHelpers, Field } from 'formik';
import { completeWithLogin, ICompleteLogin } from '../../../../store/Cart';
import { AsyncThunkAction } from '../../../../store';
import showErrorMsg from '../../../../helper/showErrorMsg';
import { countries, defaultCode } from '../../../../lib/countriesForCellphone';

interface IProps {
  completeWithLogin: AsyncThunkAction<any, ICompleteLogin>;
}

interface IState {
  isSelectHide: boolean;
  credential: string;
  cellphone: { code: string; number: string };
  password: string;
}

interface IInputs {
  credential: string;
  password: string;
}

class SigninForm extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isSelectHide: true,
      credential: '',
      cellphone: { code: '', number: '' },
      password: '',
    };
  }

  async onSubmit(
    values: IInputs,
    { setSubmitting, setErrors }: FormikHelpers<IInputs>
  ) {
    try {
      const res = await this.props
        .completeWithLogin({
          credential: this.state.isSelectHide
            ? this.state.credential
            : this.state.cellphone,
          password: this.state.password,
        })
        .unwrap();
      if (res.data.status) {
      } else {
        res.data.error.map((error) => {
          setErrors({ [error.input]: showErrorMsg(error.code) });
        });
      }
    } catch (error) {
      NotificationManager.error(
        'ارتباط با سامانه بدرستی انجام نشد، لطفا مجددا تلاش کنید.',
        'خطا'
      );
    }
  }

  changePhoneNumber(
    phoneNumber: string,
    selected: { code: string; name: string; dialingCode: string },
    value: string,
    isFocusedOnInput: boolean
  ) {
    if (/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g.test(value)) {
      this.setState({ isSelectHide: false });
    } else {
      this.setState({ isSelectHide: true });
    }

    this.setState({
      credential: value,
      cellphone: { code: selected.code, number: value },
    });
  }

  changePassword(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    return (
      <Formik
        initialValues={{ credential: '', password: '' }}
        onSubmit={(values, helpers) => this.onSubmit(values, helpers)}
      >
        {(formik) => (
          <Form className={styles.form}>
            <InputGroup className={styles.inputGroup}>
              <div className="phonenumber-input-wrapper">
                <ReactPhonenumber
                  countries={countries}
                  onChange={(
                    phoneNumber,
                    phonenumberObj,
                    value,
                    isFocusedOnInput
                  ) =>
                    this.changePhoneNumber(
                      phoneNumber,
                      phonenumberObj,
                      value,
                      isFocusedOnInput
                    )
                  }
                  defaultCode={defaultCode}
                  isSelectHide={this.state.isSelectHide}
                  className="phoneNumberEmail"
                  selectName="signInForm"
                  options={{ dir: 'rtl' }}
                  floatPlaceHolder={{
                    placeholder: 'ایمیل یا شماره همراه',
                    icon: 'fa fa-user',
                  }}
                  errorCode={<ErrorMessage name="credential" />}
                />
              </div>
            </InputGroup>

            <InputGroup className={styles.inputGroup}>
              <span className={styles.icon}>
                <i className="fa fa-lock"></i>
              </span>
              <Field
                type="password"
                name="password"
                className="form-control"
                onChange={(e) => this.changePassword(e)}
                value={this.state.password}
              />
              <span
                className={classNames(styles.floatPlaceHolder, {
                  [styles.up]: this.state.password.length > 0,
                })}
              >
                کلمه عبور
              </span>
              <div className="form-err-msg">
                <ErrorMessage name="password" />
              </div>
            </InputGroup>

            <Row className="justify-content-center">
              <Col md={6}>
                <button
                  type="submit"
                  className={styles.loginbtn}
                  disabled={formik.isSubmitting}
                >
                  {formik.isSubmitting ? (
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
        )}
      </Formik>
    );
  }
}

export default connect(null, { completeWithLogin })(SigninForm);

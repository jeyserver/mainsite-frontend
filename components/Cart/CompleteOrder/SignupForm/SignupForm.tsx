import * as React from 'react';
import classNames from 'classnames';
import {
  Row,
  Col,
  Button,
  Spinner,
  FormGroup,
  FormLabel,
} from 'react-bootstrap';
import { ReactPhonenumber } from '../../../ReactPhonenumber/ReactPhonenumber';
import { NotificationManager } from 'react-notifications';
import styles from './SignupForm.module.scss';
import { connect } from 'react-redux';
import {
  completeWithRegister,
  ICompleteRegister,
} from '../../../../store/Cart';
import { AsyncThunkAction } from '../../../../store';
import { Formik, FormikHelpers, ErrorMessage, Field, Form } from 'formik';
import * as Yup from 'yup';
import showErrorMsg from '../../../../helper/showErrorMsg';
import { countries, defaultCode } from '../../../../lib/countriesForCellphone';
import { NextRouter, withRouter } from 'next/router';

interface IProps {
  completeWithRegister: AsyncThunkAction<any, ICompleteRegister>;
  router: NextRouter;
}

interface IState {
  cellphone: { code: string; number: string };
  showCellPhoneError: boolean;
}

interface IInputs {
  name: string;
  lastname: string;
  email: string;
  cellphone: string;
  password: string;
  password2: string;
  acceptedTerms: boolean;
}

class SignupForm extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      cellphone: { code: '', number: '' },
      showCellPhoneError: false,
    };
  }

  changePhoneNumber(
    phoneNumber: string,
    selected: { code: string; name: string; dialingCode: string },
    phoneNumberInputValue: string
  ) {
    this.setState({
      cellphone: { code: selected.code, number: phoneNumberInputValue },
      showCellPhoneError: false,
    });
  }

  async onSubmit(
    values: IInputs,
    { setSubmitting, setErrors }: FormikHelpers<IInputs>
  ) {
    try {
      const res = await this.props
        .completeWithRegister({
          name: values.name,
          lastname: values.lastname,
          email: values.email,
          cellphone: this.state.cellphone,
          password: values.password,
          password2: values.password2,
        })
        .unwrap();
      if (res.data.status) {
        if (res.data.redirect) {
          this.props.router.push(res.data.redirect);
        }
      } else {
        res.data.error.map((error) => {
          setErrors({ [error.input]: showErrorMsg(error.code) });
          if (error.input === 'cellphone') {
            this.setState({ showCellPhoneError: true });
          }
        });
      }
    } catch (error) {
      NotificationManager.error(
        '???????????? ???? ???????????? ???????????? ?????????? ???????? ???????? ?????????? ???????? ????????.',
        '??????'
      );
    } finally {
      setSubmitting(false);
    }
  }

  render() {
    return (
      <Formik
        initialValues={{
          name: '',
          lastname: '',
          email: '',
          cellphone: '-',
          password: '',
          password2: '',
          acceptedTerms: false,
        }}
        validationSchema={Yup.object({
          name: Yup.string().required('???????? ???????? ?????? ?????????? ????????'),
          lastname: Yup.string().required('???????? ???????? ?????? ?????????? ????????'),
          email: Yup.string()
            .email('???????? ???????? ?????? ?????????? ????????')
            .required('???????? ???????? ?????? ?????????? ????????'),
          cellphone: Yup.string().required('???????? ???????? ?????? ?????????? ????????'),
          password: Yup.string().required('???????? ???????? ?????? ?????????? ????????'),
          password2: Yup.string()
            .required('???????? ???????? ?????? ?????????? ????????')
            .oneOf([Yup.ref('password')], '?????????????? ???? ?????????? ???? ?????????? ????????'),
          acceptedTerms: Yup.boolean()
            .required('???????? ???????? ?????? ?????????? ????????')
            .oneOf([true], '???????? ???????? ?????? ?????????? ????????'),
        })}
        onSubmit={(values, helpers) => this.onSubmit(values, helpers)}
      >
        {(formik) => (
          <Form className={styles.signupForm}>
            <Row>
              <Col md={6}>
                <FormGroup className={styles.formGroup}>
                  <FormLabel>??????*</FormLabel>
                  <Field
                    type="text"
                    name="name"
                    placeholder="????????"
                    className="form-control"
                  />
                  <div className="form-err-msg">
                    <ErrorMessage name="name" />
                  </div>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup className={styles.formGroup}>
                  <FormLabel>?????? ????????????????*</FormLabel>
                  <Field
                    type="text"
                    name="lastname"
                    placeholder="??????????"
                    className="form-control"
                  />
                  <div className="form-err-msg">
                    <ErrorMessage name="lastname" />
                  </div>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup className={styles.formGroup}>
                  <FormLabel>??????????*</FormLabel>
                  <Field
                    type="email"
                    name="email"
                    placeholder="username@example.com"
                    className="form-control"
                  />
                  <div className="form-err-msg">
                    <ErrorMessage name="email" />
                  </div>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup
                  className={classNames(styles.formGroup, styles.phoneNumber)}
                >
                  <FormLabel>?????????? ??????????*</FormLabel>
                  <div className="phonenumber-input-wrapper">
                    <ReactPhonenumber
                      countries={countries}
                      onChange={(
                        phoneNumber,
                        selected,
                        phoneNumberInputValue
                      ) =>
                        this.changePhoneNumber(
                          phoneNumber,
                          selected,
                          phoneNumberInputValue
                        )
                      }
                      defaultCode={defaultCode}
                      isSelectHide={false}
                      className="phoneNumberEmail"
                      selectName="signUpForm"
                      options={{ dir: 'rtl' }}
                    />
                  </div>
                  {this.state.showCellPhoneError && (
                    <div>
                      <ErrorMessage name="cellphone" />
                    </div>
                  )}
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup className={styles.formGroup}>
                  <FormLabel>??????????????*</FormLabel>
                  <Field
                    type="password"
                    name="password"
                    className="form-control"
                  />
                  <div className="form-err-msg">
                    <ErrorMessage name="password" />
                  </div>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup className={styles.formGroup}>
                  <FormLabel>?????????? ??????????????*</FormLabel>
                  <Field
                    type="password"
                    name="password2"
                    className="form-control"
                  />
                  <div className="form-err-msg">
                    <ErrorMessage name="password2" />
                  </div>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <FormGroup>
                  <label className={styles.termsCheckBox}>
                    <Field type="checkbox" name="acceptedTerms" />
                    <a target="_blank" href="/terms">
                      ?????????? ??????????
                    </a>
                    ???? ???????????? ?? ?????????? ????????.
                    <div className="form-err-msg">
                      <ErrorMessage name="acceptedTerms" />
                    </div>
                  </label>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <Button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={formik.isSubmitting}
                >
                  {formik.isSubmitting ? (
                    <>
                      <Spinner animation="border" size="sm" />
                      <span>???????? ?????? ????????</span>
                    </>
                  ) : (
                    '?????????? ??????????'
                  )}
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    );
  }
}

export default connect(null, { completeWithRegister })(withRouter(SignupForm));

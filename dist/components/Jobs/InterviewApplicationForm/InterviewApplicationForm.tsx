import axios from 'axios';
import * as React from 'react';
import { Button, Col, Form, Spinner, Row } from 'react-bootstrap';
import backend from '../../../axios-config';
import styles from './InterviewApplicationForm.module.scss';
import { NotificationManager } from 'react-notifications';

type error = 'data_validation' | 'data_duplicate';

const showError = (errorMsg: error) => {
  if (errorMsg === 'data_duplicate') {
    return 'داده وارد شده تکراری است';
  } else if (errorMsg === 'data_validation') {
    return 'داده وارد شده معتبر نیست';
  }
};

export interface InterviewApplicationFormProps {}

export interface InterviewApplicationFormState {
  formValidated: boolean;
  formLoading: boolean;
  personNameError: error;
  emailError: error;
  cellphoneError: error;
  phoneError: error;
}

class InterviewApplicationForm extends React.Component<
  InterviewApplicationFormProps,
  InterviewApplicationFormState
> {
  constructor(props: InterviewApplicationFormProps) {
    super(props);
    this.state = {
      formValidated: false,
      formLoading: false,
      personNameError: 'data_validation',
      emailError: 'data_validation',
      cellphoneError: 'data_validation',
      phoneError: 'data_validation',
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      this.setState({ formLoading: true });

      axios(
        'https://jsonblob.com/api/jsonBlob/ff048401-e7cd-11eb-971c-9ff88820de62'
      )
        .then((respone) => {
          if (respone.data.status) {
            form.personName.value = '';
            form.email.value = '';
            form.cellphone.value = '';
            form.phone.value = '';

            NotificationManager.success(
              'کارشناسان ما در اولین فرصت پیام شما را بررسی و پاسخ خواهند داد. از صبر شما متشکریم.',
              'پیام شما دریافت شد.'
            );

            this.setState({ formLoading: false, formValidated: false });
          } else if (!respone.data.status) {
            respone.data.error.forEach((errorItem) => {
              if (errorItem.input === 'name') {
                form.personName.value = '';
                this.setState({ personNameError: errorItem.code });
              } else if (errorItem.input === 'email') {
                form.email.value = '';
                this.setState({ emailError: errorItem.code });
              } else if (errorItem.input === 'cellphone') {
                form.cellphone.value = '';
                this.setState({ cellphoneError: errorItem.code });
              } else if (errorItem.input === 'phone') {
                form.phone.value = '';
                this.setState({ phoneError: errorItem.code });
              }
            });

            this.setState({ formLoading: false });
          }
        })
        .catch(() => {
          NotificationManager.error(
            'ارتباط با سامانه بدرستی انجام نشد، لطفا مجددا تلاش کنید.',
            'خطا'
          );
          this.setState({ formLoading: false });
        });
    }

    this.setState({ formValidated: true });
  }

  render() {
    return (
      <Form
        onSubmit={this.onSubmit}
        className={styles.form}
        validated={this.state.formValidated}
        noValidate
      >
        <Form.Group controlId="personName" className={styles.formGroup}>
          <Form.Label>نام و نام خانوادگی</Form.Label>
          <Form.Control type="text" required />
          <Form.Control.Feedback type="invalid">
            {showError(this.state.personNameError)}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="email" className={styles.formGroup}>
          <Form.Label>رایانامه</Form.Label>
          <Form.Control type="email" required />
          <Form.Control.Feedback type="invalid">
            {showError(this.state.emailError)}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="cellphone" className={styles.formGroup}>
          <Form.Label>تلفن همراه</Form.Label>
          <Form.Control type="tel" required />
          <Form.Control.Feedback type="invalid">
            {showError(this.state.cellphoneError)}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="phone" className={styles.formGroup}>
          <Form.Label>تلفن ثابت</Form.Label>
          <Form.Control type="tel" required />
          <Form.Control.Feedback type="invalid">
            {showError(this.state.phoneError)}
          </Form.Control.Feedback>
        </Form.Group>
        <Row className="justify-content-center">
          <Col md={6} className={styles.sendBtnWrapper}>
            <Button type="submit" disabled={this.state.formLoading}>
              {this.state.formLoading ? (
                <>
                  <Spinner animation="border" size="sm" />
                  <span className={styles.loadingTxt}>لطفا صبر کنید</span>
                </>
              ) : (
                <>
                  <i className="fa fa-check"></i>
                  <span> ارسال </span>
                </>
              )}
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default InterviewApplicationForm;

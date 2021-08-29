import axios from 'axios';
import * as React from 'react';
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import Link from 'next/link';
import { NotificationManager } from 'react-notifications';
import styles from './NewsletterForm.module.scss';
import { connect } from 'react-redux';
import { RootState } from '../../../store';
import classNames from 'classnames';

interface IProps {
  theme: RootState['theme'];
}

interface IState {
  newslettersBtnLoading: boolean;
  newslettersFormValidated: boolean;
}

class NewsletterForm extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      newslettersFormValidated: false,
      newslettersBtnLoading: false,
    };
    this.submitNewslettersForm = this.submitNewslettersForm.bind(this);
  }

  submitNewslettersForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      this.setState({ newslettersBtnLoading: true });

      axios(
        'https://jsonblob.com/api/jsonBlob/d8eccd84-d821-11eb-9f33-07821a14b37b'
      )
        .then(() => {
          form.email.value = '';
          NotificationManager.success('ایمیل شما با موفقیت ثبت شد', '');
          this.setState({
            newslettersBtnLoading: false,
            newslettersFormValidated: false,
          });
        })
        .catch(() => {
          NotificationManager.error(
            'ارتباط با سامانه بدرستی انجام نشد، لطفا مجددا تلاش کنید.',
            'خطا'
          );
          this.setState({ newslettersBtnLoading: true });
        });
    }

    this.setState({ newslettersFormValidated: true });
  }

  render() {
    return (
      <div
        className={classNames(styles.newslettersForm, {
          [styles.dark]: this.props.theme.current === 'dark',
        })}
      >
        <div className={styles.info}>
          با عضویت در خبرنامه جی سرور، جدیدترین آموزش ها را دریافت کنید!
        </div>
        <Form
          className={styles.form}
          onSubmit={(e) => this.submitNewslettersForm(e)}
          validated={this.state.newslettersFormValidated}
          data-validated={this.state.newslettersFormValidated}
          noValidate
        >
          <InputGroup className={styles.inputGroup}>
            <InputGroup.Prepend className={styles.inputGroupPrepend}>
              <i className="far fa-envelope"></i>
            </InputGroup.Prepend>
            <FormControl
              type="email"
              name="email"
              placeholder="ایمیل خود را وارد کنید"
              required
            />
            <Form.Control.Feedback type="invalid" className={styles.feedback}>
              لطفا ایمیل خود را وارد کنید.
            </Form.Control.Feedback>
          </InputGroup>
          <Button
            type="submit"
            className={styles.btn}
            disabled={this.state.newslettersBtnLoading}
          >
            {this.state.newslettersBtnLoading
              ? 'لطفا صبر کنید'
              : 'عضویت در خبرنامه'}
          </Button>
        </Form>
        <div className={styles.linkWrapper}>
          <Link href="#">
            <a className={styles.link}>
              <span className={styles.iconWrapper}>
                <i className="fab fa-instagram"></i>
              </span>
              <span className={styles.text}>
                ما را در اینستاگرام دنبال کنید!
              </span>
            </a>
          </Link>
        </div>
      </div>
    );
  }
}

export default connect((state: RootState) => {
  return {
    theme: state.theme,
  };
})(NewsletterForm);

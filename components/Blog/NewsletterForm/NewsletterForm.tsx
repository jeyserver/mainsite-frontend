import * as React from 'react';
import { InputGroup, Button } from 'react-bootstrap';
import Link from 'next/link';
import { NotificationManager } from 'react-notifications';
import styles from './NewsletterForm.module.scss';
import { connect } from 'react-redux';
import { RootState } from '../../../store';
import classNames from 'classnames';
import backend from '../../../axios-config';
import { Formik, FormikHelpers, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import { NextRouter, withRouter } from 'next/router';
import showErrorMsg from '../../../helper/showErrorMsg';

interface IProps {
  theme: RootState['theme'];
  router: NextRouter;
  token: string;
}

interface IInputs {
  email: string;
}

class NewsletterForm extends React.Component<IProps> {
  onSubmit(
    values: IInputs,
    { setSubmitting, setErrors, resetForm }: FormikHelpers<IInputs>
  ) {
    //
    backend(
      `${this.props.router.asPath}?ajax=1&blog_newsletter_group_token=${this.props.token}&email=${values.email}`
    )
      .then((res) => {
        if (res.data.status) {
          NotificationManager.success('ایمیل شما با موفقیت ثبت شد', '');
          resetForm();
        } else {
          res.data.error.map((error) => {
            setErrors({ [error.input]: showErrorMsg(error.code) });
          });
        }
      })
      .catch(() => {
        NotificationManager.error(
          'ارتباط با سامانه بدرستی انجام نشد، لطفا مجددا تلاش کنید.',
          'خطا'
        );
      })
      .finally(() => {
        setSubmitting(false);
      });
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
        <Formik
          initialValues={{ email: '' }}
          validationSchema={Yup.object({
            email: Yup.string()
              .required('داده وارد شده معتبر نیست')
              .email('داده وارد شده معتبر نیست'),
          })}
          onSubmit={(values, helpers) => this.onSubmit(values, helpers)}
        >
          {(formik) => (
            <Form className={styles.form}>
              <InputGroup className={styles.inputGroup}>
                <InputGroup.Prepend className={styles.inputGroupPrepend}>
                  <i className="far fa-envelope"></i>
                </InputGroup.Prepend>
                <Field
                  className="form-control"
                  type="email"
                  name="email"
                  placeholder="ایمیل خود را وارد کنید"
                />
              </InputGroup>
              <div className={styles.feedback}>
                <ErrorMessage name="email" />
              </div>
              <Button
                type="submit"
                className={styles.btn}
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? 'لطفا صبر کنید' : 'عضویت در خبرنامه'}
              </Button>
            </Form>
          )}
        </Formik>

        <div className={styles.linkWrapper}>
          <Link href="#" className={styles.link}>

            <span className={styles.iconWrapper}>
              <i className="fab fa-instagram"></i>
            </span>
            <span className={styles.text}>
              ما را در اینستاگرام دنبال کنید!
            </span>

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
})(withRouter(NewsletterForm));

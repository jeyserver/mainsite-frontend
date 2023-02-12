import * as React from 'react';
import classNames from 'classnames';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { Button, Col } from 'react-bootstrap';
import styles from './SendCommentForm.module.scss';
import IComment from '../../../../helper/types/news/Comment';
import backend from '../../../../axios-config';
import { NotificationManager } from 'react-notifications';
import showErrorMsg from '../../../../helper/showErrorMsg';

interface IProps {
  selectedCommentForReply: IComment | null;
  postId: number;
}

interface IInputs {
  name: string;
  email: string;
  text: string;
}

class SendCommentForm extends React.Component<IProps> {
  onSubmit(
    values: IInputs,
    { setSubmitting, setErrors, resetForm }: FormikHelpers<IInputs>
  ) {
    const reply = this.props.selectedCommentForReply
      ? `&reply=${this.props.selectedCommentForReply.id}`
      : '';

    backend
      .post(
        `/news/view/${this.props.postId}?ajax=1&name=${values.name}&email=${values.email}&text=${values.text}${reply}`,
        {
          // name: values.name,
          // email: values.email,
          // text: values.text,
          // reply: this.props.selectedCommentForReply.id
        }
      )
      .then((res) => {
        if (res.data.status) {
          resetForm();
          NotificationManager.success(
            'نظر شما با موفقیت ثبت شد و پس از تایید به نمایش در خواهد آمد!',
            'موفق'
          );
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
      <div id="comment-form" className={styles.newsFormWrapper}>
        <Formik
          onSubmit={(values, helpers) => this.onSubmit(values, helpers)}
          initialValues={{ name: '', email: '', text: '' }}
        >
          {(formik) => (
            <Form>
              <div className={classNames('form-group', styles.formGroup)}>
                <Field
                  type="text"
                  name="name"
                  placeholder="نام شما"
                  className="form-control"
                />

                <div className="form-err-msg">
                  <ErrorMessage name="username" />
                </div>
              </div>

              <div className={classNames('form-group', styles.formGroup)}>
                <Field
                  type="text"
                  name="email"
                  placeholder="ایمیل شما"
                  className="form-control"
                />

                <div className="form-err-msg">
                  <ErrorMessage name="username" />
                </div>
              </div>

              <div className={classNames('form-group', styles.formGroup)}>
                <Field
                  as="textarea"
                  name="text"
                  placeholder="متن پیام..."
                  className="form-control"
                />

                <div className="form-err-msg">
                  <ErrorMessage name="username" />
                </div>
              </div>

              <Col lg={6} className={styles.sendBtnWrapper}>
                <Button
                  type="submit"
                  className={styles.sendBtn}
                  disabled={formik.isSubmitting}
                >
                  {formik.isSubmitting ? (
                    <i
                      className={classNames(
                        'fa fa-spinner fa-spin',
                        styles.loadingSpin
                      )}
                    ></i>
                  ) : (
                    <span>
                      <i className="fa fa-paper-plane" /> ارسال{' '}
                    </span>
                  )}
                </Button>
              </Col>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

export default SendCommentForm;

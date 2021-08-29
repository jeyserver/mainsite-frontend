import * as React from 'react';
import Link from 'next/link';
import { Image, Col, Row, FormGroup, FormLabel } from 'react-bootstrap';
import moment from 'jalali-moment';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import IPost from '../../../../helper/types/blog/Post';
import IComment from '../../../../helper/types/blog/Comment';
import { withRouter, NextRouter } from 'next/router';
import { connect } from 'react-redux';
import { RootState } from '../../../../store';
import Comment from '../Comment/Comment';
import classNames from 'classnames';
import styles from './Post.module.scss';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import backend from '../../../../axios-config';
import showErrorMsg from '../../../../helper/showErrorMsg';

interface IProps {
  post: IPost;
  comments: IComment[];
  router: NextRouter;
  language: RootState['language'];
  theme: RootState['theme'];
}

interface IState {
  commentFormValidated: boolean;
  commentSendBtnLoading: boolean;
}

interface IInputs {
  name: string;
  email: string;
  site: string;
  text: string;
}

class Post extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      commentFormValidated: false,
      commentSendBtnLoading: false,
    };
    this.onSubmitCommentForm = this.onSubmitCommentForm.bind(this);
  }

  getPageLink() {
    return `${process.env.SCHEMA}://${process.env.DOMAIN}/${this.props.language.locale}/blog/${this.props.post.permalink}`;
  }

  onSubmitCommentForm(
    values: IInputs,
    { setSubmitting, setErrors, resetForm }: FormikHelpers<IInputs>
  ) {
    backend
      .post(
        `/blog/${this.props.post.permalink}?ajax=1&name=${values.name}&text=${values.text}&site=${values.site}&email=${values.email}`
        // {
        //   name: values.name,
        //   text: values.text,
        //   site: values.site,
        //   email: values.email,
        // }
      )
      .then((res) => {
        if (res.data.status) {
          NotificationManager.success(
            'کارشناسان ما در اولین فرصت پیام شما را بررسی و پاسخ خواهند داد. از صبر شما متشکریم.',
            'پیام شما دریافت شد.'
          );
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
    const { title, author, image, date, categories, content, description } =
      this.props.post;

    return (
      <div
        className={classNames(styles.post, {
          [styles.dark]: this.props.theme.current === 'dark',
        })}
      >
        <h3 className={styles.title}>{this.props.post.title}</h3>
        <div className={styles.postInfo}>
          <div className={styles.authorWrapper}>
            <span>
              <i className="far fa-user"></i>
              <span>نویسنده: </span>
            </span>
            <Link href={`/blog/author/${author.id}`}>
              <a>{`${author.name} ${author.lastname}`}</a>
            </Link>
          </div>
          <div className={styles.timeWrapper}>
            <i className="far fa-calendar-alt"></i>
            <span>
              {moment(date * 1000)
                .locale('fa')
                .format('D MMM YYYY')}
            </span>
          </div>
        </div>
        <Image src={image} className={styles.postImage} />

        <div className={styles.postCategories}>
          <span>دسته بندی:</span>
          {categories.map((category, index) => {
            if (index === categories.length - 1) {
              return (
                <Link
                  href={`/blog/category/${category.permalink}`}
                  key={category.id}
                >
                  <a>{category.title}</a>
                </Link>
              );
            } else {
              return (
                <Link
                  href={`/blog/category/${category.permalink}`}
                  key={category.id}
                >
                  <a>{category.title}، </a>
                </Link>
              );
            }
          })}
        </div>

        <div
          className={styles.content}
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        ></div>

        <div className={styles.socialLinks}>
          <span>اشتراک مطلب:</span>
          <a
            href={`http://www.facebook.com/sharer.php?u=${this.getPageLink()}`}
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href={`mailto:?subject=${title}&body=${description}`}>
            <i className="far fa-envelope"></i>
          </a>
          <a href={`http://www.twitter.com/sharer?url=${this.getPageLink()}`}>
            <i className="fab fa-twitter"></i>
          </a>
          <a href="">
            <i className="fab fa-google-plus-g"></i>
          </a>
          <a
            href={`http://www.linkedin.com/shareArticle?mini=true&title=${this.getPageLink()}`}
          >
            <i className="fab fa-linkedin"></i>
          </a>
        </div>

        <div className={styles.lables}>
          <span> برچسب ها:</span>
          <span className={styles.labelsWrapper}>
            {this.props.post.tags.map((tag, index) => {
              if (index === this.props.post.categories.length - 1) {
                return (
                  <Link href={`/blog/tag/${tag.permalink}`} key={tag.id}>
                    <a>{tag.title}</a>
                  </Link>
                );
              } else {
                return (
                  <Link href={`/blog/tag/${tag.permalink}`} key={tag.id}>
                    <a>{tag.title}، </a>
                  </Link>
                );
              }
            })}
          </span>
        </div>

        <div className={styles.comments}>
          <h3>دیدگاه ها ({this.props.comments.length})</h3>

          {this.props.comments
            // .filter((i) => !i.reply)
            .map((comment) => (
              <Comment
                key={comment.id}
                comment={comment}
                comments={this.props.comments}
              />
            ))}

          <div className={styles.formWrapper}>
            <h3>افزودن دیدگاه</h3>
            <h4>
              آدرس ایمیل شما منتشر نخواهد شد. قسمت های ضروری که با * مشخص شده
              اند را کامل کنید.
            </h4>

            <Formik
              onSubmit={(values, helpers) =>
                this.onSubmitCommentForm(values, helpers)
              }
              initialValues={{ name: '', email: '', text: '', site: '' }}
              validationSchema={Yup.object({
                name: Yup.string().required('داده وارد شده معتبر نیست'),
                email: Yup.string()
                  .required('داده وارد شده معتبر نیست')
                  .email('داده وارد شده معتبر نیست'),
                text: Yup.string().required('داده وارد شده معتبر نیست'),
              })}
            >
              {(formik) => (
                <Form className={styles.form}>
                  <FormGroup as={Col} className={styles.formGroup} md="12">
                    <FormLabel className={styles.label}>
                      دیدگاه شما <span className="star">*</span>
                    </FormLabel>
                    <Field as="textarea" name="text" className="form-control" />
                    <div className="form-err-msg">
                      <ErrorMessage name="text" />
                    </div>
                  </FormGroup>

                  <Row>
                    <FormGroup as={Col} className={styles.formGroup} md="4">
                      <FormLabel className={styles.label}>
                        نام <span className="star">*</span>
                      </FormLabel>
                      <Field type="text" name="name" className="form-control" />
                      <div className="form-err-msg">
                        <ErrorMessage name="name" />
                      </div>
                    </FormGroup>

                    <FormGroup as={Col} className={styles.formGroup} md="4">
                      <FormLabel className={styles.label}>
                        ایمیل <span className="star">*</span>
                      </FormLabel>
                      <Field
                        type="email"
                        name="email"
                        className="form-control"
                      />
                      <div className="form-err-msg">
                        <ErrorMessage name="email" />
                      </div>
                    </FormGroup>

                    <FormGroup as={Col} className={styles.formGroup} md="4">
                      <FormLabel className={styles.label}>وب سایت</FormLabel>
                      <Field type="text" name="site" className="form-control" />
                    </FormGroup>
                  </Row>

                  <Button
                    type="submit"
                    className={styles.sendBtn}
                    disabled={formik.isSubmitting}
                  >
                    {formik.isSubmitting ? 'لطفا صبر کنید' : 'ارسال'}
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    );
  }
}

export default connect((state: RootState) => {
  return {
    language: state.language,
    theme: state.theme,
  };
})(withRouter(Post));

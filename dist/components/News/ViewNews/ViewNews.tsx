import * as React from 'react';
import { Button } from 'react-bootstrap';
import { Container, Row, Col, Form, Image } from 'react-bootstrap';
import Link from 'next/link';
import moment from 'jalali-moment';
import { NotificationManager } from 'react-notifications';
import MostViewedNews from '../MostViewedNews/MostViewedNews';
import NewsArchive from '../NewsArchive/NewsArchive';
import styles from './ViewNews.module.scss';
import axios from 'axios';
import Comment from './Comment/Comment';

export interface ViewNewsProps {
  postData: {
    id: number;
    title: string;
    date: number;
    user: {
      id: number;
      name: string;
    };
    comments: any;
    description: string;
    author: number;
    content: string;
    image: string;
    view: number;
    status: number;
  };
  mostViewedNews: any;
  newsArchive: number[];
}

type error = 'data_validation' | 'data_duplicate';

const showError = (errorMsg: error) => {
  if (errorMsg === 'data_duplicate') {
    return 'داده وارد شده تکراری است';
  } else if (errorMsg === 'data_validation') {
    return 'داده وارد شده معتبر نیست';
  }
};

export interface ViewNewsState {
  sendBtnLoading: boolean;
  formValidated: boolean;
  nameError: error;
  emailError: error;
  textError: error;
  selectedCommentForReply: any;
}

class ViewNews extends React.Component<ViewNewsProps, ViewNewsState> {
  constructor(props: ViewNewsProps) {
    super(props);
    this.state = {
      sendBtnLoading: false,
      formValidated: false,
      nameError: 'data_validation',
      emailError: 'data_validation',
      textError: 'data_validation',
      selectedCommentForReply: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeSelectedCommentForReply =
      this.changeSelectedCommentForReply.bind(this);
    this.cancelReply = this.cancelReply.bind(this);
  }

  changeSelectedCommentForReply(comment: any) {
    this.setState({ selectedCommentForReply: comment });
    document.querySelector('#comment-form').scrollIntoView(false);
  }

  cancelReply() {
    this.setState({ selectedCommentForReply: null });
  }

  handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      this.setState({ sendBtnLoading: true });

      // this.state.selectedCommentForReply
      axios
        .post(
          `${process.env.SCHEMA}://${process.env.DOMAIN}/fa/news/view/${this.props.postData.id}?ajax=1`,
          {
            name: form.userName.value,
            email: form.email.value,
            text: form.text.value,
          }
        )
        .then((respone) => {
          if (respone.data.status) {
            form.userName.value = '';
            form.email.value = '';
            form.text.value = '';
            NotificationManager.success(
              'کارشناسان ما در اولین فرصت نظر شما را بررسی و ثبت خواهند کرد..',
              'نظر شما دریافت شد.'
            );
            this.setState({
              formValidated: false,
              sendBtnLoading: false,
              selectedCommentForReply: null,
            });
          } else if (!respone.data.status) {
            respone.data.error.forEach((errorItem) => {
              if (errorItem.input === 'name') {
                form.userName.value = '';
                this.setState({ nameError: errorItem.code });
              } else if (errorItem.input === 'email') {
                form.email.value = '';
                this.setState({ emailError: errorItem.code });
              } else if (errorItem.input === 'text') {
                form.text.value = '';
                this.setState({ textError: errorItem.code });
              }
            });
          }
        })
        .catch((error) => {
          this.setState({ sendBtnLoading: false });
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
      <section>
        <div className={styles.innerBanner}>
          <Container>
            <h2 className="text-center">{this.props.postData.title}</h2>
          </Container>
        </div>
        <div className={styles.contentWrapper}>
          <Container>
            <Row>
              <Col xs={12} lg={8} className={styles.newsWrapper}>
                <h3 className={styles.portfolioTittle}>
                  <Link href={`/news/view/${this.props.postData.id}`}>
                    <a>{this.props.postData.title}</a>
                  </Link>
                </h3>

                <div className={styles.metaTag}>
                  <Link href={`/news/author/${this.props.postData.user.id}`}>
                    <a className={styles.user}>
                      <i className="fa fa-user" />{' '}
                      {this.props.postData.user.name}
                    </a>
                  </Link>
                  <span className={styles.blueLine}>/</span>
                  <Link
                    href={`/news/archive/${moment(
                      this.props.postData.date * 1000
                    )
                      .locale('fa')
                      .format('YYYY')}/${moment(this.props.postData.date * 1000)
                      .locale('fa')
                      .format('DD')}`}
                  >
                    <a className={styles.date}>
                      <i className="far fa-calendar-alt"></i>{' '}
                      {moment(this.props.postData.date * 1000)
                        .locale('fa')
                        .format('dddd DD MMM YYYY')}
                    </a>
                  </Link>
                  <span className={styles.blueLine}>/</span>
                  <i className="far fa-comment"></i>{' '}
                  {this.props.postData.comments.commentsNumber > 0
                    ? `${this.props.postData.comments.commentsNumber} نظر`
                    : 'بدون نظر'}{' '}
                </div>

                {this.props.postData.image && (
                  <div className={styles.imgWrapper}>
                    <Image
                      src={this.props.postData.image}
                      alt={this.props.postData.title}
                    />
                  </div>
                )}

                <div
                  className={styles.newsText}
                  dangerouslySetInnerHTML={{
                    __html: this.props.postData.content,
                  }}
                ></div>

                <div className={styles.divider}>
                  <div />
                </div>

                <div className={styles.commentsTitle}>
                  <h5>نظرات: </h5>
                </div>

                <div className={styles.comments}>
                  {this.props.postData.comments.items.map((comment) => {
                    if (comment.answers) {
                      return (
                        <div key={comment.id}>
                          <Comment
                            comment={comment}
                            changeSelectedCommentForReply={
                              this.changeSelectedCommentForReply
                            }
                          />
                          {comment.answers.map((answer) => (
                            <Comment
                              key={answer.id}
                              comment={answer}
                              changeSelectedCommentForReply={
                                this.changeSelectedCommentForReply
                              }
                            />
                          ))}
                        </div>
                      );
                    }
                    return (
                      <Comment
                        key={comment.id}
                        comment={comment}
                        changeSelectedCommentForReply={
                          this.changeSelectedCommentForReply
                        }
                      />
                    );
                  })}
                </div>

                <div className={styles.sendCommentTitle}>
                  <div className={styles.header}>
                    <h5>
                      ارسال دیدگاه{' '}
                      {this.state.selectedCommentForReply &&
                        `در پاسخ ${this.state.selectedCommentForReply.user}`}
                    </h5>
                    {this.state.selectedCommentForReply && (
                      <button
                        className={styles.cancelBtn}
                        onClick={this.cancelReply}
                      >
                        انصراف
                      </button>
                    )}
                  </div>

                  <div className={styles.divider}>
                    <div />
                  </div>
                </div>

                <div id="comment-form" className={styles.newsFormWrapper}>
                  <Form
                    noValidate
                    validated={this.state.formValidated}
                    onSubmit={this.handleSubmit}
                  >
                    <Form.Group className={styles.formGroupe}>
                      <Form.Control
                        type="text"
                        name="userName"
                        placeholder="نام شما"
                        required
                      />
                      <Form.Control.Feedback
                        type="invalid"
                        className={styles.invalidFeedbackMsg}
                      >
                        {showError(this.state.nameError)}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className={styles.formGroupe}>
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="ایمیل شما"
                        required
                      />
                      <Form.Control.Feedback
                        type="invalid"
                        className={styles.invalidFeedbackMsg}
                      >
                        {showError(this.state.emailError)}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className={styles.formGroupe}>
                      <Form.Control
                        as="textarea"
                        name="text"
                        placeholder="متن پیام..."
                        required
                      />
                      <Form.Control.Feedback
                        type="invalid"
                        className={styles.invalidFeedbackMsg}
                      >
                        {showError(this.state.textError)}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Col lg={6} className={styles.sendBtnWrapper}>
                      <Button
                        type="submit"
                        className={styles.sendBtn}
                        disabled={this.state.sendBtnLoading}
                      >
                        {this.state.sendBtnLoading ? (
                          <i className="fa fa-spinner fa-spin"></i>
                        ) : (
                          <span>
                            <i className="fa fa-paper-plane" /> ارسال{' '}
                          </span>
                        )}
                      </Button>
                    </Col>
                  </Form>
                </div>
              </Col>
              <Col xs={12} lg={3}>
                <MostViewedNews mostViewedNews={this.props.mostViewedNews} />
                <NewsArchive newsArchive={this.props.newsArchive} />
              </Col>
            </Row>
          </Container>
        </div>
      </section>
    );
  }
}

export default ViewNews;

import * as React from 'react';
import Link from 'next/link';
import { Image, Form, Col, Row } from 'react-bootstrap';
import moment from 'jalali-moment';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';

export interface PostProps {
  post: any;
}

export interface PostState {
  commentFormValidated: boolean;
  commentSendBtnLoading: boolean;
}

class Post extends React.Component<PostProps, PostState> {
  constructor(props: PostProps) {
    super(props);
    this.state = {
      commentFormValidated: false,
      commentSendBtnLoading: false,
    };
    this.onSubmitCommentForm = this.onSubmitCommentForm.bind(this);
  }

  onSubmitCommentForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      this.setState({ commentSendBtnLoading: true });

      axios(
        'https://jsonblob.com/api/jsonBlob/d8eccd84-d821-11eb-9f33-07821a14b37b'
      )
        .then(() => {
          form.email.value = '';
          form.comment.value = '';
          form.user.value = '';
          form.website.value = '';

          NotificationManager.success('ایمیل شما با موفقیت ثبت شد', '');
          this.setState({
            commentSendBtnLoading: false,
            commentFormValidated: false,
          });
        })
        .catch(() => {
          NotificationManager.error(
            'ارتباط با سامانه بدرستی انجام نشد، لطفا مجددا تلاش کنید.',
            'خطا'
          );
          this.setState({ commentSendBtnLoading: true });
        });
    }
    this.setState({ commentFormValidated: true });
  }

  render() {
    return (
      <div className="post">
        <h3 className="title">{this.props.post.title}</h3>
        <div className="post-info">
          <div className="author-wrapper">
            <span>
              <i className="far fa-user"></i>
              <span>نویسنده: </span>
            </span>
            <Link href={`/blog/author/${this.props.post.author}`}>
              <a>{this.props.post.author}</a>
            </Link>
          </div>
          <div className="time-wrapper">
            <i className="far fa-calendar-alt"></i>
            <span>{moment().locale('fa').format('D MMM YYYY')}</span>
          </div>
        </div>
        <Image src={this.props.post.img} className="post-image" />
        <div className="post-categories">
          <span>دسته بندی:</span>
          {this.props.post.categories.map((category, index) => {
            if (index === this.props.post.categories.length - 1) {
              return (
                <Link href={category} key={index}>
                  <a>{category}</a>
                </Link>
              );
            } else {
              return (
                <Link href={category} key={index}>
                  <a>{category}، </a>
                </Link>
              );
            }
          })}
        </div>

        <div
          className="content"
          dangerouslySetInnerHTML={{
            __html: new Buffer(this.props.post.content, 'base64').toString(),
          }}
        ></div>

        <div className="post-sources">
          <span>منبع:</span>
          {this.props.post.source.map((source, index) => {
            if (index === this.props.post.source.length - 1) {
              return (
                <Link href={source.link} key={index}>
                  <a>{source.title}</a>
                </Link>
              );
            } else {
              return (
                <Link href={source.link} key={index}>
                  <a>{source.title} ، </a>
                </Link>
              );
            }
          })}
        </div>

        <div className="social-links">
          <span>اشتراک مطلب:</span>
          <a href="http://www.facebook.com/sharer.php?u=">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="mailto:?subject=URL= &body">
            <i className="far fa-envelope"></i>
          </a>
          <a href="http://www.twitter.com/sharer?url=">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="">
            <i className="fab fa-google-plus-g"></i>
          </a>
          <a href="http://www.linkedin.com/shareArticle?mini=true&title=">
            <i className="fab fa-linkedin"></i>
          </a>
        </div>

        <div className="lables">
          <span> برچسب ها:</span>
          <span className="labels-wrapper">
            {this.props.post.labels.map((label, index) => {
              if (index === this.props.post.categories.length - 1) {
                return (
                  <Link href={label} key={label}>
                    <a>{label}</a>
                  </Link>
                );
              } else {
                return (
                  <Link href={label} key={label}>
                    <a>{label}، </a>
                  </Link>
                );
              }
            })}
          </span>
        </div>

        <div className="comments">
          <h3>دیدگاه ها ({this.props.post.comments.length})</h3>

          {this.props.post.comments.map((comment, index) => (
            <div className="comment" key={index}>
              <Image
                src={comment.img ? comment.img : '/images/none-user.png'}
              />
              <div className="content">
                <div className="user">{comment.user}</div>
                <div className="time">
                  {moment(comment.time * 1000)
                    .locale('fa')
                    .format('dddd DD MMM YYYY')}
                </div>
                <div className="body">{comment.body}</div>
              </div>
            </div>
          ))}

          <div className="form-wrapper">
            <h3>افزودن دیدگاه</h3>
            <h4>
              آدرس ایمیل شما منتشر نخواهد شد. قسمت های ضروری که با * مشخص شده
              اند را کامل کنید.
            </h4>

            <Form
              className="form"
              onSubmit={(e) => this.onSubmitCommentForm(e)}
              noValidate
              validated={this.state.commentFormValidated}
            >
              <Form.Group as={Col} md="12" controlId="comment">
                <Form.Label>
                  دیدگاه شما <span className="star">*</span>
                </Form.Label>
                <Form.Control
                  required
                  type="text"
                  as="textarea"
                  name="comment"
                />
                <Form.Control.Feedback type="invalid">
                  لطفا دیدگاه خود را وارد کنید.
                </Form.Control.Feedback>
              </Form.Group>

              <Row>
                <Form.Group as={Col} md="4" controlId="user">
                  <Form.Label>
                    نام <span className="star">*</span>
                  </Form.Label>
                  <Form.Control required type="text" name="user" />
                  <Form.Control.Feedback type="invalid">
                    لطفا نام خود را وارد کنید.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="4" controlId="email">
                  <Form.Label>
                    ایمیل <span className="star">*</span>
                  </Form.Label>
                  <Form.Control required type="email" name="email" />
                  <Form.Control.Feedback type="invalid">
                    لطفا ایمیل خود را وارد کنید.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="4" controlId="website">
                  <Form.Label>وب سایت</Form.Label>
                  <Form.Control type="text" name="website" />
                </Form.Group>
              </Row>

              <Button
                type="submit"
                className="send-btn"
                disabled={this.state.commentSendBtnLoading}
              >
                {this.state.commentSendBtnLoading ? 'لطفا صبر کنید' : 'ارسال'}
              </Button>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default Post;

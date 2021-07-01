import * as React from 'react';
import TopNav from '../TopNav/TopNav';
import {
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  FormControl,
} from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import Post from './Post/Post';
import Link from 'next/link';
import MostViewedPosts from '../MostViewedPosts/MostViewedPosts';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';

export interface BlogPostProps {
  categories: any;
  post: any;
}

export interface BlogPostState {
  newslettersFormValidated: boolean;
  newslettersBtnLoading: boolean;
}

class BlogPost extends React.Component<BlogPostProps, BlogPostState> {
  constructor(props: BlogPostProps) {
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
      <section className="blog-post">
        <TopNav
          nightMode={true}
          categories={this.props.categories}
          title="آموزش ها و مقالات کاربردی برای وبمستران"
        />

        <Container fluid>
          <Row>
            <Col xl={2} className="d-none d-xl-block"></Col>
            <Col md={12} lg={9} xl={7} className="px-0 px-md-5">
              <Post post={this.props.post} />
            </Col>
            <Col md={12} lg={3} xl={3} className="d-none d-lg-block">
              <div className="newsletters-form-and-instagram-link">
                <div className="info">
                  با عضویت در خبرنامه جی سرور، جدیدترین آموزش ها را دریافت کنید!
                </div>
                <Form
                  className="form"
                  onSubmit={(e) => this.submitNewslettersForm(e)}
                  validated={this.state.newslettersFormValidated}
                  noValidate
                >
                  <InputGroup>
                    <InputGroup.Prepend>
                      <i className="far fa-envelope"></i>
                    </InputGroup.Prepend>
                    <FormControl
                      type="email"
                      name="email"
                      placeholder="ایمیل خود را وارد کنید"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      لطفا ایمیل خود را وارد کنید.
                    </Form.Control.Feedback>
                  </InputGroup>
                  <Button
                    type="submit"
                    disabled={this.state.newslettersBtnLoading}
                  >
                    {this.state.newslettersBtnLoading
                      ? 'لطفا صبر کنید'
                      : 'عضویت در خبرنامه'}
                  </Button>
                </Form>
                <div className="link-wrapper">
                  <Link href="#">
                    <a className="link">
                      <span className="icon-wrapper">
                        <i className="fab fa-instagram"></i>
                      </span>
                      <span className="text">
                        ما را در اینستاگرام دنبال کنید!
                      </span>
                    </a>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <MostViewedPosts posts={this.props.post.mostViewedPosts} />
        <Col className="newslettersFormOnMobile">
          <div className="newsletters-form-and-instagram-link">
            <div className="info">
              با عضویت در خبرنامه جی سرور، جدیدترین آموزش ها را دریافت کنید!
            </div>
            <Form
              className="form"
              onSubmit={(e) => this.submitNewslettersForm(e)}
              validated={this.state.newslettersFormValidated}
              noValidate
            >
              <InputGroup>
                <InputGroup.Prepend>
                  <i className="far fa-envelope"></i>
                </InputGroup.Prepend>
                <FormControl
                  type="email"
                  name="email"
                  placeholder="ایمیل خود را وارد کنید"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  لطفا ایمیل خود را وارد کنید.
                </Form.Control.Feedback>
              </InputGroup>
              <Button type="submit" disabled={this.state.newslettersBtnLoading}>
                {this.state.newslettersBtnLoading
                  ? 'لطفا صبر کنید'
                  : 'عضویت در خبرنامه'}
              </Button>
            </Form>
            <div className="link-wrapper">
              <Link href="#">
                <a className="link">
                  <span className="icon-wrapper">
                    <i className="fab fa-instagram"></i>
                  </span>
                  <span className="text">ما را در اینستاگرام دنبال کنید!</span>
                </a>
              </Link>
            </div>
          </div>
        </Col>
      </section>
    );
  }
}

export default BlogPost;

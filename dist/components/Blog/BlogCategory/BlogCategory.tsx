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
import PostCategory from './PostCategory/PostCategory';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import MostViewedPosts from '../MostViewedPosts/MostViewedPosts';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import ReactPaginate from 'react-paginate';
import { NextRouter, withRouter } from 'next/router';

export interface BlogCategoryProps {
  category: any;
  categories: any;
  posts: any;
  router: NextRouter;
  page: { currentPage: number | null; all: number };
}

export interface BlogCategoryState {
  newslettersBtnLoading: boolean;
  newslettersFormValidated: boolean;
}

class BlogCategory extends React.Component<
  BlogCategoryProps,
  BlogCategoryState
> {
  constructor(props: BlogCategoryProps) {
    super(props);
    this.state = {
      newslettersBtnLoading: false,
      newslettersFormValidated: false,
    };
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

  changePage(page) {
    this.props.router.push({ query: { page: page.selected + 1 } });
  }

  render() {
    return (
      <section className="blogCategory">
        <TopNav
          nightMode={true}
          categories={this.props.categories}
          title={this.props.category}
        />
        <Container fluid>
          <Row>
            <Col xl={2} className="d-none d-xl-block"></Col>
            <Col md={12} lg={9} xl={7}>
              <div className="posts">
                {this.props.posts.mostViewedPosts.map((post, index) => {
                  if (index < 3) {
                    return <PostCategory post={post} key={index} />;
                  }
                })}
              </div>

              <ReactPaginate
                previousLabel={<i className="fas fa-caret-right"></i>}
                nextLabel={<i className="fas fa-caret-left"></i>}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={this.props.page.all}
                initialPage={
                  this.props.page.currentPage
                    ? this.props.page.currentPage - 1
                    : 0
                }
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={(page) => this.changePage(page)}
                containerClassName={'pagination'}
                activeClassName={'active'}
              />
            </Col>
            <Col md={12} lg={3} xl={3}>
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
        <MostViewedPosts
          posts={[
            ...this.props.posts.mostViewedPosts,
            ...this.props.posts.mostViewedPosts,
          ]}
        />
      </section>
    );
  }
}

export default withRouter(BlogCategory);

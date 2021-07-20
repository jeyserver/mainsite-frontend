import moment from 'jalali-moment';
import * as React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import Link from 'next/link';

export interface MostViewedPostsProps {
  posts: any;
}

export interface MostViewedPostsState {}

class MostViewedPosts extends React.Component<
  MostViewedPostsProps,
  MostViewedPostsState
> {
  constructor(props: MostViewedPostsProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="most-viewed-posts">
        <Container fluid="lg">
          <h3>مطالب پربازدید</h3>
        </Container>
        <div className="line"></div>
        <Container fluid="lg">
          <Row className="most-viewed-posts-row">
            {this.props.posts.map((post, index) => {
              let url = encodeURI(post.title);

              return (
                <Col xs={12} md={6} lg={3} key={index}>
                  <Link href={`/blog/${url}`}>
                    <a className="most-viewed-post">
                      <Image src={post.img} />
                      <div className="content">
                        <h3 className="time">
                          {moment().locale('fa').format('DD MMM YYYY')}
                        </h3>
                        <div className="title">{post.title}</div>
                      </div>
                    </a>
                  </Link>
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>
    );
  }
}

export default MostViewedPosts;

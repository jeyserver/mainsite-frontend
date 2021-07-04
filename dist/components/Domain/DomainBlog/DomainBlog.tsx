import * as React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import styles from './DomainBlog.module.scss';

export interface DomainBlogProps {
  domainPosts: any;
}

export interface DomainBlogState {}

class DomainBlog extends React.Component<DomainBlogProps, DomainBlogState> {
  constructor(props: DomainBlogProps) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <section id="about">
        <Container>
          <Row>
            {this.props.domainPosts.map((post) => (
              <Col xs={12} md={4}>
                <div className={styles.card}>
                  <img src={post.img} className={styles.postImg} />
                  <div className={styles.cardBody}>
                    <div className={styles.see}>
                      <i className="fa fa-eye" aria-hidden="true" />
                      <span>{post.view}</span>
                    </div>
                    <img
                      src={
                        post.user.avatar
                          ? post.user.avatar
                          : '/images/domain/default-avatar_67x67.png'
                      }
                      className={styles.user}
                    />
                    <div className={styles.comment}>
                      <i className="fa fa-comment" aria-hidden="true" />
                      <span>{post.comments}</span>
                    </div>
                    <h5 className={styles.cardTitle}>{post.title}</h5>
                    <p className={styles.cardText}>{post.summary}</p>
                  </div>
                  <Link href={`/blog/${encodeURI(post.title)}`}>
                    <a className={styles.cardBtn}>بیشتر بخوانید</a>
                  </Link>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    );
  }
}

export default DomainBlog;

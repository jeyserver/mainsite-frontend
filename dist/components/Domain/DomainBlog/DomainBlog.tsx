import * as React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import styles from './DomainBlog.module.scss';
import { IPost } from '../../../pages/domain';

interface IProps {
  posts: IPost[];
}

class DomainBlog extends React.Component<IProps> {
  render() {
    return (
      <section>
        <Container>
          <Row>
            {this.props.posts &&
              this.props.posts.map((post) => (
                <Col xs={12} md={4} key={post.id}>
                  <div className={styles.card}>
                    <img src={post.image} className={styles.postImg} />
                    <div className={styles.cardBody}>
                      <div className={styles.see}>
                        <i className="fa fa-eye" aria-hidden="true" />
                        <span>{post.view}</span>
                      </div>
                      <img
                        src={
                          post.author.avatar
                            ? post.author.avatar
                            : '/images/domain/default-avatar_67x67.png'
                        }
                        className={styles.user + ' rounded-circle'}
                      />
                      <div className={styles.comment}>
                        <i className="fa fa-comment" aria-hidden="true" />
                        <span>{post.comments_count}</span>
                      </div>
                      <h5 className={styles.cardTitle}>{post.title}</h5>
                      <p className={styles.cardText}>{post.description}</p>
                    </div>
                    <Link href={`/blog/${post.permalink}}`}>
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

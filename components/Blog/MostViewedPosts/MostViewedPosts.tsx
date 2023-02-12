import moment from 'jalali-moment';
import * as React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import Link from 'next/link';
import IPopularPost from '../../../helper/types/blog/PopularPost';
import styles from './MostViewedPosts.module.scss';
import { connect } from 'react-redux';
import { RootState } from '../../../store';
import classNames from 'classnames';

interface IProps {
  posts: IPopularPost[];
  theme: RootState['theme'];
}

class MostViewedPosts extends React.Component<IProps> {
  render() {
    return (
      <div
        className={classNames(styles.wrapper, {
          [styles.dark]: this.props.theme.current === 'dark',
        })}
      >
        <Container fluid="lg">
          <h3>مطالب پربازدید</h3>
        </Container>
        <div className="line"></div>
        <Container fluid="lg">
          <Row className={styles.row}>
            {this.props.posts.map((post) => (
              <Col xs={12} md={6} lg={3} key={post.id}>
                <Link href={`/blog/${post.permalink}`}>
                  <a className={styles.post}>
                    <Image src={post.image} />

                    <div className={styles.content}>
                      <h3 className={styles.time}>
                        {moment(post.date * 1000)
                          .locale('fa')
                          .format('DD MMM YYYY')}
                      </h3>
                      <div className={styles.title}>{post.title}</div>
                    </div>
                  </a>
                </Link>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    );
  }
}

export default connect((state: RootState) => {
  return {
    theme: state.theme,
  };
})(MostViewedPosts);

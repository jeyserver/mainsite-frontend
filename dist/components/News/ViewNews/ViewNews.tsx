import * as React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import MostViewedNews from '../MostViewedNews/MostViewedNews';
import NewsArchive from '../NewsArchive/NewsArchive';
import styles from './ViewNews.module.scss';
import Comment from './Comment/Comment';
import SendCommentForm from './SendCommentForm/SendCommentForm';
import NewsPost from './NewsPost/NewsPost';
import PagesHeader from '../../PagesHeader/PagesHeader';
import IComment from '../../../helper/types/news/Comment';
import IPost from '../../../helper/types/news/Post';
import IPopularPost from '../../../helper/types/news/PopularPost';

interface IProps {
  post: IPost;
  comments: IComment[];
  popular_posts: IPopularPost[];
  archives: { [T: string]: number };
}

interface IState {
  selectedCommentForReply: IComment;
}

class ViewNews extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      selectedCommentForReply: null,
    };
    this.changeSelectedCommentForReply =
      this.changeSelectedCommentForReply.bind(this);
  }

  changeSelectedCommentForReply(comment: any) {
    this.setState({ selectedCommentForReply: comment });
    document.querySelector('#comment-form').scrollIntoView(false);
  }

  render() {
    return (
      <section>
        <PagesHeader title={this.props.post.title} />

        <div className={styles.contentWrapper}>
          <Container>
            <Row>
              <Col xs={12} lg={8} className={styles.newsWrapper}>
                <NewsPost post={this.props.post} />

                <div className={styles.divider}>
                  <div />
                </div>

                <div className={styles.commentsTitle}>
                  <h5>نظرات: </h5>
                </div>

                <div className={styles.comments}>
                  {this.props.comments
                    .filter((i) => !i.reply)
                    .map((comment) => (
                      <Comment
                        key={comment.id}
                        comment={comment}
                        comments={this.props.comments}
                        changeSelectedCommentForReply={
                          this.changeSelectedCommentForReply
                        }
                      />
                    ))}
                </div>

                <div className={styles.sendCommentTitle}>
                  <div className={styles.header}>
                    <h5>
                      ارسال دیدگاه{' '}
                      {this.state.selectedCommentForReply &&
                        `در پاسخ ${this.state.selectedCommentForReply.name}`}
                    </h5>
                    {this.state.selectedCommentForReply && (
                      <button
                        className={styles.cancelBtn}
                        onClick={() =>
                          this.setState({ selectedCommentForReply: null })
                        }
                      >
                        انصراف
                      </button>
                    )}
                  </div>

                  <div className={styles.divider}>
                    <div />
                  </div>
                </div>

                <SendCommentForm
                  selectedCommentForReply={this.state.selectedCommentForReply}
                  postId={this.props.post.id}
                />
              </Col>
              <Col xs={12} lg={3}>
                <MostViewedNews popularPosts={this.props.popular_posts} />
                <NewsArchive archives={this.props.archives} />
              </Col>
            </Row>
          </Container>
        </div>
      </section>
    );
  }
}

export default ViewNews;

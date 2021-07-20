import * as React from 'react';
import { Image } from 'react-bootstrap';
import styles from './Comment.module.scss';
import classNames from 'classnames';
import moment from 'jalali-moment';

export interface CommentProps {
  comment: any;
  changeSelectedCommentForReply: (comment: any) => void;
}

export interface CommentState {}

class Comment extends React.Component<CommentProps, CommentState> {
  constructor(props: CommentProps) {
    super(props);
    this.state = {};
  }

  render() {
    const { time, avatar, user, body, answer } = this.props.comment;

    return (
      <div
        className={classNames(styles.commentBox, {
          [styles.answer]: answer,
        })}
      >
        <div className={styles.avatarWrapper}>
          <Image src={avatar ? avatar : '/images/news-none-user.png'} />
        </div>
        <div className={styles.commentBoxRightSide}>
          <div className={styles.header}>
            <div className={styles.right}>
              <span className={styles.user}>{user}</span>{' '}
              <span className={styles.time}>
                {moment(time * 1000)
                  .locale('fa')
                  .format('dddd DD MMM YYYY')}
              </span>
            </div>
            <div>
              <button
                className={styles.replyBtn}
                title={`پاسخ به ${user}`}
                onClick={() =>
                  this.props.changeSelectedCommentForReply(this.props.comment)
                }
              >
                <i className="fas fa-reply"></i>
              </button>
            </div>
          </div>
          <div className={styles.body}>{body}</div>
        </div>
      </div>
    );
  }
}

export default Comment;

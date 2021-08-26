import * as React from 'react';
import { Image } from 'react-bootstrap';
import styles from './Comment.module.scss';
import moment from 'jalali-moment';
import IComment from '../../../../helper/types/news/Comment';

interface IProps {
  comment: IComment;
  comments: IComment[];
  changeSelectedCommentForReply: (comment: any) => void;
}

class Comment extends React.Component<IProps> {
  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.box}>
          <div className={styles.avatarWrapper}>
            <Image src={this.props.comment.avatar} />
          </div>
          <div className={styles.commentBoxRightSide}>
            <div className={styles.header}>
              <div className={styles.right}>
                <span className={styles.user}>{this.props.comment.name}</span>{' '}
                <span className={styles.time}>
                  {moment(this.props.comment.date * 1000)
                    .locale('fa')
                    .format('dddd DD MMM YYYY')}
                </span>
              </div>
              <div>
                <button
                  className={styles.replyBtn}
                  title={`پاسخ به ${this.props.comment.name}`}
                  onClick={() =>
                    this.props.changeSelectedCommentForReply(this.props.comment)
                  }
                >
                  <i className="fas fa-reply"></i>
                </button>
              </div>
            </div>
            <div className={styles.body}>{this.props.comment.text}</div>
          </div>
        </div>

        <div className={styles.reply}>
          {this.props.comments.some(
            (comment) => comment.reply === this.props.comment.id
          ) &&
            this.props.comments
              .filter((comment) => comment.reply === this.props.comment.id)
              .map((comment) => (
                // <div key={comment.name}>{comment.name}</div>
                <Comment
                  comment={comment}
                  comments={this.props.comments}
                  key={comment.id}
                  changeSelectedCommentForReply={
                    this.props.changeSelectedCommentForReply
                  }
                />
              ))}
        </div>
      </div>
    );
  }
}

export default Comment;

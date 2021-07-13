import moment from 'jalali-moment';
import * as React from 'react';
import { Image } from 'react-bootstrap';
import Link from 'next/link';
import styles from './PostCard.module.scss';

export interface PostCardProps {
  post: any;
}

export interface PostCardState {}

class PostCard extends React.Component<PostCardProps, PostCardState> {
  constructor(props: PostCardProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={styles.postCard}>
        <div className={styles.postImageWrapper}>
          <Link href={`/blog/${this.props.post.title_en.split(' ').join('+')}`}>
            <a>
              <Image src="/images/black-rectangle-79.png" />
            </a>
          </Link>

          <div className={styles.visit}>
            <i className="far fa-eye"></i>
            <span>{this.props.post.visit}</span>
          </div>
        </div>
        <div className={styles.content}>
          <Link href={`/blog/${this.props.post.title_en.split(' ').join('+')}`}>
            <a>
              <h3 className={styles.title}>{this.props.post.title}</h3>
              <div className={styles.time}>
                <i className="far fa-calendar-alt"></i>
                <span>{moment().locale('fa').format('D MMM YYYY')}</span>
              </div>
              <div className={styles.summary}>{this.props.post.summary}</div>
            </a>
          </Link>

          <div className={styles.linkWrapper}>
            <Link
              href={`/blog/${this.props.post.title_en.split(' ').join('+')}`}
            >
              <a className={styles.postLink}>ادامه مطلب</a>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default PostCard;

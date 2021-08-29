import moment from 'jalali-moment';
import * as React from 'react';
import { Image } from 'react-bootstrap';
import Link from 'next/link';
import styles from './PostCard.module.scss';
import IPost from '../../../../helper/types/blog/Post';
import IPopularPost from '../../../../helper/types/blog/PopularPost';

interface PostCardProps {
  post: IPost;
}

class PostCard extends React.Component<PostCardProps> {
  render() {
    const { permalink, view, image, title, date } = this.props.post;

    return (
      <div className={styles.postCard}>
        <div className={styles.postImageWrapper}>
          <Link href={`/blog/${permalink}`}>
            <a>
              <Image src={image} alt={title} className={styles.image} />
            </a>
          </Link>

          <div className={styles.visit}>
            <i className="far fa-eye"></i>
            <span>{view}</span>
          </div>
        </div>
        <div className={styles.content}>
          <Link href={`/blog/${permalink}`}>
            <a>
              <h3 className={styles.title}>{this.props.post.title}</h3>
              <div className={styles.time}>
                <i className="far fa-calendar-alt"></i>
                <span>
                  {moment(date * 1000)
                    .locale('fa')
                    .format('D MMM YYYY')}
                </span>
              </div>
              {this.props.post.description && (
                <div
                  className={styles.summary}
                  dangerouslySetInnerHTML={{ __html: this.props.post.content }}
                ></div>
              )}
            </a>
          </Link>

          <div className={styles.linkWrapper}>
            <Link href={`/blog/${permalink}`}>
              <a className={styles.postLink}>ادامه مطلب</a>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default PostCard;

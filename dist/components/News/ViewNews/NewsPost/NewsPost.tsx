import moment from 'jalali-moment';
import Link from 'next/link';
import * as React from 'react';
import { Image } from 'react-bootstrap';
import IPost from '../../../../helper/types/news/Post';
import styles from './NewsPost.module.scss';

interface IProps {
  post: IPost;
}

interface IState {}

class NewsPost extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <h3 className={styles.portfolioTittle}>
          <Link href={`/news/view/${this.props.post.id}`}>
            <a>{this.props.post.title}</a>
          </Link>
        </h3>

        <div className={styles.metaTag}>
          <Link href={`/news/author/${this.props.post.author.id}`}>
            <a className={styles.user}>
              <i className="fa fa-user" />{' '}
              {`${this.props.post.author.name} ${this.props.post.author.lastname}`}
            </a>
          </Link>
          <span className={styles.blueLine}>/</span>
          <Link
            href={`/news/archive/${moment(this.props.post.date * 1000)
              .locale('fa')
              .format('YYYY')}/${moment(this.props.post.date * 1000)
              .locale('fa')
              .format('DD')}`}
          >
            <a className={styles.date}>
              <i className="far fa-calendar-alt"></i>{' '}
              {moment(this.props.post.date * 1000)
                .locale('fa')
                .format('dddd DD MMM YYYY')}
            </a>
          </Link>
          <span className={styles.blueLine}>/</span>
          <i className="far fa-comment"></i>{' '}
          {this.props.post.comments_count > 0
            ? `${this.props.post.comments_count} نظر`
            : 'بدون نظر'}{' '}
        </div>

        {this.props.post.image && (
          <div className={styles.imgWrapper}>
            <Image src={this.props.post.image} alt={this.props.post.title} />
          </div>
        )}

        <div
          className={styles.newsText}
          dangerouslySetInnerHTML={{
            __html: this.props.post.content,
          }}
        ></div>
      </React.Fragment>
    );
  }
}

export default NewsPost;

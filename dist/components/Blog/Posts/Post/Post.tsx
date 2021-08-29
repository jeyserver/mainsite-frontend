import * as React from 'react';
import Link from 'next/link';
import { Image } from 'react-bootstrap';
import moment from 'jalali-moment';
import IPost from '../../../../helper/types/blog/Post';
import styles from './Post.module.scss';
import { connect } from 'react-redux';
import { RootState } from '../../../../store';
import classNames from 'classnames';

interface IProps {
  post: IPost;
  theme: RootState['theme'];
}

class Post extends React.Component<IProps> {
  render() {
    return (
      <div
        className={classNames(styles.post, {
          [styles.dark]: this.props.theme.current === 'dark',
        })}
      >
        <Link href={`/blog/${this.props.post.permalink}`}>
          <a className={styles.title}>{this.props.post.title}</a>
        </Link>
        <div className={styles.postInfo}>
          <div className={styles.authorWrapper}>
            <span>
              <i className="far fa-user"></i>
              <span>نویسنده: </span>
            </span>
            <Link href={`/blog/author/${this.props.post.author.id}`}>
              <a>{`${this.props.post.author.name} ${this.props.post.author.lastname}`}</a>
            </Link>
          </div>
          <div className={styles.timeWrapper}>
            <i className="far fa-calendar-alt"></i>
            <span>{moment().locale('fa').format('D MMM YYYY')}</span>
          </div>
        </div>

        <Image src={this.props.post.image} className={styles.postImage} />

        <div className={styles.postCategories}>
          <span>دسته بندی:</span>
          {this.props.post.categories.map((category, index) => {
            if (index === this.props.post.categories.length - 1) {
              return (
                <Link
                  href={`/blog/category/${category.permalink}`}
                  key={category.id}
                >
                  <a>{category.title}</a>
                </Link>
              );
            } else {
              return (
                <Link
                  href={`/blog/category/${category.permalink}`}
                  key={category.id}
                >
                  <a>{category.title}، </a>
                </Link>
              );
            }
          })}
        </div>

        <div
          className={styles.largeSummary}
          dangerouslySetInnerHTML={{ __html: this.props.post.content }}
        ></div>
        <div className={styles.postLinkWrapper}>
          <Link href={`/blog/${this.props.post.permalink}`}>
            <a className={styles.postLink}>ادامه مطلب</a>
          </Link>
        </div>
      </div>
    );
  }
}

export default connect((state: RootState) => {
  return {
    theme: state.theme,
  };
})(Post);

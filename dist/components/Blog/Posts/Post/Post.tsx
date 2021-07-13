import * as React from 'react';
import Link from 'next/link';
import { Image } from 'react-bootstrap';
import moment from 'jalali-moment';

export interface PostProps {
  post: any;
}

export interface PostState {}

class Post extends React.Component<PostProps, PostState> {
  constructor(props: PostProps) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="post">
        <Link href={`/blog/${this.props.post.title_en}`}>
          <a className="title">{this.props.post.title}</a>
        </Link>
        <div className="post-info">
          <div className="author-wrapper">
            <span>
              <i className="far fa-user"></i>
              <span>نویسنده: </span>
            </span>
            <Link href={`/blog/author/${this.props.post.author}`}>
              <a>{this.props.post.author}</a>
            </Link>
          </div>
          <div className="time-wrapper">
            <i className="far fa-calendar-alt"></i>
            <span>{moment().locale('fa').format('D MMM YYYY')}</span>
          </div>
        </div>
        <Image src={this.props.post.img} className="post-image" />
        <div className="post-categories">
          <span>دسته بندی:</span>
          {this.props.post.categories.map((category, index) => {
            if (index === this.props.post.categories.length - 1) {
              return (
                <Link href={category} key={index}>
                  <a>{category}</a>
                </Link>
              );
            } else {
              return (
                <Link href={category} key={index}>
                  <a>{category}، </a>
                </Link>
              );
            }
          })}
        </div>
        <div className="large-summary">{this.props.post.largeSummary}</div>
        <div className="post-link-wrapper">
          <Link href={`/blog/${this.props.post.title_en}`}>
            <a className="post-link">ادامه مطلب</a>
          </Link>
        </div>
      </div>
    );
  }
}

export default Post;

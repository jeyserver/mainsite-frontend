import * as React from 'react';
import { Image } from 'react-bootstrap';
import Link from 'next/link';
import moment from 'jalali-moment';
import styles from './MostViewedNews.module.scss';

export interface MostViewedNewsProps {
  mostViewedNews: any;
}

export interface MostViewedNewsState {}

class MostViewedNews extends React.Component<
  MostViewedNewsProps,
  MostViewedNewsState
> {
  constructor(props: MostViewedNewsProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className={styles.tittleLine}>
          <h5>پر بازدید ها</h5>
          <div className={styles.divider}>
            <div />
          </div>
        </div>
        <div className={styles.mostViewedPosts}>
          <ul>
            {this.props.mostViewedNews.map((news) => (
              <li key={news.id}>
                <div>
                  <Link href={`/news/view/${news.id}`}>
                    <a className={styles.blogImg}>
                      <Image
                        src={
                          news.image
                            ? `${process.env.SCHEMA}://${process.env.DOMAIN}/packages/news/${news.image}`
                            : '/images/defaultimage.jpg'
                        }
                        alt={news.title}
                      />
                      <div>
                        <div>
                          {moment(news.date * 1000)
                            .locale('fa')
                            .format('DD MMM YYYY')}
                        </div>
                      </div>
                    </a>
                  </Link>

                  <div className={styles.blogWrapper}>
                    <h5>
                      <Link href={`/news/view/13`}>
                        <a>{news.title}</a>
                      </Link>
                    </h5>
                    <p>
                      {moment(news.date * 1000)
                        .locale('fa')
                        .format('dddd DD MMM YYYY')}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default MostViewedNews;

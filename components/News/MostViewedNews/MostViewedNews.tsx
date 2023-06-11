import * as React from 'react';
import { Image } from 'react-bootstrap';
import Link from 'next/link';
import moment from 'jalali-moment';
import styles from './MostViewedNews.module.scss';
import IPopularPost from '../../../helper/types/news/PopularPost';

interface IProps {
  popularPosts: IPopularPost[];
}

class MostViewedNews extends React.Component<IProps> {
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
            {this.props.popularPosts.map((news) => (
              <li key={news.id}>
                <div>
                  <Link href={`/news/view/${news.id}`} className={styles.blogImg}>

                    <Image src={news.image} alt={news.title} />
                    <div>
                      <div>
                        {moment(news.date * 1000)
                          .locale('fa')
                          .format('DD MMM YYYY')}
                      </div>
                    </div>

                  </Link>

                  <div className={styles.blogWrapper}>
                    <h5>
                      <Link href={`/news/view/${news.id}`}>
                        {news.title}
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

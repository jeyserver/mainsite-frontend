import * as React from 'react';
import moment from 'jalali-moment';
import Link from 'next/link';
import styles from './NewsArchive.module.scss';

export interface NewsArchiveProps {
  newsArchive: number[];
}

export interface NewsArchiveState {}

class NewsArchive extends React.Component<NewsArchiveProps, NewsArchiveState> {
  constructor(props: NewsArchiveProps) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className={styles.archiveWrapper}>
        <div className={styles.tittleLine}>
          <h5>آرشیو اخبار </h5>
          <div className={styles.divider}>
            <div />
          </div>
        </div>
        <ul className={styles.archiveList}>
          {this.props.newsArchive.map((time) => (
            <Link
              href={`/news/archive/${moment(time * 1000)
                .locale('fa')
                .format('YYYY')}/${moment(time * 1000)
                .locale('fa')
                .format('DD')}`}
              key={time}
            >
              <a>
                <li>
                  {moment(time * 1000)
                    .locale('fa')
                    .format('MMM YYYY')}
                </li>
              </a>
            </Link>
          ))}
        </ul>
      </div>
    );
  }
}

export default NewsArchive;

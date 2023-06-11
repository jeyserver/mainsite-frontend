import * as React from 'react';
import moment from 'jalali-moment';
import Link from 'next/link';
import styles from './NewsArchive.module.scss';

interface IProps {
  archives: { [T: string]: number };
}

class NewsArchive extends React.Component<IProps> {
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
          {Object.values(this.props.archives).map((time) => (
            (<Link
              href={`/news/archive/${moment(time * 1000)
                .locale('fa')
                .format('YYYY')}/${moment(time * 1000)
                .locale('fa')
                .format('MM')}`}
              key={time}
            >

              <li>
                {moment(time * 1000)
                  .locale('fa')
                  .format('MMM YYYY')}
              </li>

            </Link>)
          ))}
        </ul>
      </div>
    );
  }
}

export default NewsArchive;

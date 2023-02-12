import classNames from 'classnames';
import * as React from 'react';
import ReactStars from 'react-rating-stars-component';
import styles from './index.module.scss';

interface IProps {
  star: number;
  text: string;
}

class StarredCell extends React.Component<IProps> {
  render() {
    return (
      <td>
        <div className={styles.wrapper}>
          <div>
            {this.props.text ? (
              this.props.text
            ) : (
              <span className={styles.unlimited}>بدون محدودیت</span>
            )}
          </div>
          <ReactStars
            size={50}
            count={5}
            value={this.props.star}
            edit={false}
            isHalf={true}
            emptyIcon={
              <i className={classNames('far fa-star', styles.emptyIcon)} />
            }
            filledIcon={<i className="fa fa-star" />}
            halfIcon={<i className="fas fa-star-half-alt"></i>}
          />
        </div>
      </td>
    );
  }
}

export default StarredCell;

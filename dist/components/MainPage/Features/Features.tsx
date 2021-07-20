import classNames from 'classnames';
import * as React from 'react';
import { Col, Row } from 'react-bootstrap';
import styles from './Features.module.scss';

export interface FeaturesProps {}

export interface FeaturesState {}

class Features extends React.Component<FeaturesProps, FeaturesState> {
  constructor(props: FeaturesProps) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className={styles.features}>
        <div className={styles.featuresTitle}>ویژگی های برتر جی سرور</div>
        <div className={styles.featuresDes}>
          با سرویس های میزبانی جی سرور با خیال راحت به توسعه ی کسب و کارتان
          بپردازید
        </div>

        <div className={styles.backgroundPic} />

        <Row className={classNames(styles.items, 'justify-content-center')}>
          <Col xs={10}>
            <Row className="flex-nowrap">
              <div className={styles.item}>
                <div className={styles.imgWrapper}>
                  <img
                    className="jeyserver-feature-item-img lazyloaded"
                    width={70}
                    height={70}
                    src="/images/Free-SSL-B.svg"
                  />
                </div>
                <div className={styles.itemDes}>نصب رایگان SSL</div>
              </div>
              <div className={styles.item}>
                <div className={styles.imgWrapper}>
                  <img
                    className="jeyserver-feature-item-img lazyloaded"
                    width={70}
                    height={70}
                    src="/images/support-B.svg"
                  />
                </div>
                <div className={styles.itemDes}>پشتیبانی فنی</div>
              </div>
              <div className={styles.item}>
                <div className={styles.imgWrapper}>
                  <img
                    className="jeyserver-feature-item-img lazyloaded"
                    width={70}
                    height={70}
                    src="/images/OneClickinstall-B.svg"
                  />
                </div>
                <div className={styles.itemDes}>
                  نصب تک کلیکی و اتوماتیک وردپرس
                </div>
              </div>
              <div className={styles.item}>
                <div className={styles.imgWrapper}>
                  <img
                    className="jeyserver-feature-item-img lazyloaded"
                    width={70}
                    height={70}
                    src="/images/hostiko27-support.svg"
                  />
                </div>
                <div className={styles.itemDes}>بک آپ گیری اتوماتیک</div>
              </div>
              <div className={styles.item}>
                <div className={styles.imgWrapper}>
                  <img
                    className="jeyserver-feature-item-img lazyloaded"
                    width={70}
                    height={70}
                    src="/images/latest-speed-B.svg"
                  />
                </div>
                <div className={styles.itemDes}>
                  انتقال رایگان و اتوماتیک
                  <br />
                  هاست های اشتراکی
                </div>
              </div>
              <div className={styles.item}>
                <div className={styles.imgWrapper}>
                  <img
                    className="jeyserver-feature-item-img lazyloaded"
                    width={70}
                    height={70}
                    src="/images/hostiko_27-fast_ssd.svg"
                  />
                </div>
                <div className={styles.itemDes}>سرور های مدیریت شده</div>
              </div>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Features;

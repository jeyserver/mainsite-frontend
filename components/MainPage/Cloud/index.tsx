import * as React from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import Link from 'next/link';
import styles from './Cloud.module.scss';
import 'flag-icon-css/css/flag-icon.min.css';
import classNames from 'classnames';
import { getPlans, IVPSPlan } from '../../../helper/types/products/VPS/plan';
import VpsServerTable from '../../Tables/VpsServerTable/VpsServerTable';

interface IProps {
  plans: IVPSPlan[],
}

class Cloud extends React.Component<IProps> {
  render() {
    return (
      <>
      <Row className={styles['server-cloud-sction']}>
        <Col md={5} className={styles['image-container']}>
          <p className={classNames(styles.h3, 'h3 text-center d-block d-md-none')}>
            <Link href="/server/vps/cloud">
              <a>سرور مجازی ابری</a>
            </Link>
          </p>
          <Image
            fluid
            src="/images/clouds.png"
            alt="سرور مجازی ابری آمریکا، فنلاند، آلمان"
          />
        </Col>
        <Col md={7} className={styles['links-container']}>
          <p className={classNames(styles.h3, 'h3 d-none d-md-block')}>
            <Link href="/server/vps/cloud">
              <a>سرور مجازی ابری</a>
            </Link>
          </p>
          <p>برنامه ها با بار پردازشی زیاد را به راحتی هرچه تمام تر اجرا کنید و تجربه‌ای دلپذیر با بروزترین نسل از پردازنده ها و منابع واقعی را با سرور های ابری بدست آورید.</p>
          <p>سرور های ابری در استفاده تفاوتی با سرور های مجازی کلاسیک ندارند و سرویس شما بجای آنکه بر روی <strong>یک سرور</strong> فیزیکی میزبانی شود، بر روی <strong>چند سرور</strong> میزبانی شده تا حداکثر مقیاس‌پذیری ( Scalability ) و در دسترس بودن ( Uptime ) را فراهم کند.</p>
          <p>تنها با چند کلیک میتوانید یک سرور ابری داشته باشد.</p>
          <p className={classNames(styles.h4, 'h4')}>از 4 نقطه در 3 کشور</p>
          <Row className={styles['server-cloud-locations']}>
            <Col sm={4}>
              <Link href="/server/vps/cloud#server_vps_cloud_fi">
                <a>
                  <p className={classNames(styles.h5, 'h5')}>
                    <span className="flag-icon flag-icon-fi"></span>{' '}
                    فنلاند
                  </p>
                </a>
              </Link>
            </Col>
            <Col sm={4}>
              <Link href="/server/vps/cloud#server_vps_cloud_de">
                <a>
                  <p className={classNames(styles.h5, 'h5')}>
                    <span className="flag-icon flag-icon-de"></span>{' '}
                    آلمان
                  </p>
                </a>
              </Link>
            </Col>
            <Col sm={4}>
              <Link href="/server/vps/cloud#server_vps_cloud_us">
                <a>
                  <p className={classNames(styles.h5, 'h5')}>
                    <span className="flag-icon flag-icon-us"></span>{' '}
                    آمریکا
                  </p>
                </a>
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
      <h4 className={classNames(styles['table-title'], "text-center")}>سرورهای ابری</h4>
      <small className={classNames(styles['table-title'], "d-block text-center")}>نسل جدید و پیشرفته سرورهای مجازی</small>
      {getPlans(this.props.plans).map((items: IVPSPlan[], index) => (
        <VpsServerTable data={items} key={index} hideTopInfo={true} homePageTable={true} />
      ))}
      </>
    );
  }
}

export default Cloud;

import * as React from 'react';
import { Row, Col, Table, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Link from 'next/link';
import styles from './DedicatedHostingTable.module.scss';
import ReactStars from 'react-rating-stars-component';
import classNames from 'classnames';
import { formatPrice } from '../../../helper/formatPrice';

export interface DedicatedHostingTableProps {
  data: any;
}

export interface DedicatedHostingTableState {
  isMoreInfoOpen: boolean;
}

class DedicatedHostingTable extends React.Component<
  DedicatedHostingTableProps,
  DedicatedHostingTableState
> {
  constructor(props: DedicatedHostingTableProps) {
    super(props);
    this.state = { isMoreInfoOpen: false };
    this.toggleMoreInfo = this.toggleMoreInfo.bind(this);
  }

  toggleMoreInfo() {
    this.setState((prev) => {
      return { isMoreInfoOpen: !prev.isMoreInfoOpen };
    });
  }

  render() {
    return (
      <Row id={this.props.data.country_name_en} className={styles.tableWrapper}>
        <Col xs={12}>
          <div className={styles.tittleLine}>
            <h5>هاست میزبانی اختصاصی {this.props.data.country_name_fa}</h5>
            <div className={styles.divider}>
              <div />
            </div>
            {this.props.data.info && (
              <div
                className={styles.content}
                dangerouslySetInnerHTML={{
                  __html: this.props.data.info,
                }}
              ></div>
            )}
          </div>
          <Table className={styles.table}>
            <thead>
              <tr>
                <th>&nbsp;</th>
                <th>فضا</th>
                <th>پهنای باند</th>
                <th style={{ lineHeight: '50px' }}>پنل هاست</th>
                <th>گواهینامه رایگان SSL</th>
                <th
                  className={classNames(styles.jHidden, {
                    [styles.open]: this.state.isMoreInfoOpen,
                  })}
                >
                  تعداد دامنه پارک
                </th>
                <th>تعداد سایت های اضافی</th>
                <th
                  className={classNames(styles.jHidden, {
                    [styles.open]: this.state.isMoreInfoOpen,
                  })}
                >
                  تعداد زیر دامنه ها
                </th>
                <th
                  className={classNames(styles.jHidden, {
                    [styles.open]: this.state.isMoreInfoOpen,
                  })}
                >
                  تعداد ایمیل ها
                </th>
                <th
                  className={classNames(styles.jHidden, {
                    [styles.open]: this.state.isMoreInfoOpen,
                  })}
                >
                  تعداد اکانت FTP
                </th>
                <th
                  className={classNames(styles.jHidden, {
                    [styles.open]: this.state.isMoreInfoOpen,
                  })}
                >
                  تعداد دیتابیس
                </th>
                <th
                  className={classNames(styles.jHidden, {
                    [styles.open]: this.state.isMoreInfoOpen,
                  })}
                >
                  بکاپ گیری روزانه
                </th>
                <th
                  className={classNames(styles.jHidden, {
                    [styles.open]: this.state.isMoreInfoOpen,
                  })}
                >
                  بکاپ گیری ماهیانه
                </th>
                <th
                  className={classNames(styles.jHidden, {
                    [styles.open]: this.state.isMoreInfoOpen,
                  })}
                >
                  بکاپ گیری سالیانه
                </th>
                <th
                  className={classNames({
                    [styles.jHidden]: this.state.isMoreInfoOpen,
                  })}
                  style={{ lineHeight: '75px' }}
                >
                  دوره های بکاپ گیری
                </th>
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip
                      id={`${this.props.data.country_name_en}-tooltip`}
                      className={styles.tooltip}
                    >
                      درصد استفاده از پردازشگر
                    </Tooltip>
                  }
                >
                  <th>CPU</th>
                </OverlayTrigger>
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip
                      id={`${this.props.data.country_name_en}-tooltip`}
                      className={styles.tooltip}
                    >
                      حافظه موقت
                    </Tooltip>
                  }
                >
                  <th style={{ lineHeight: '50px' }}>Ram</th>
                </OverlayTrigger>
                <th>وب سرور</th>
                <th>هارد سرور</th>
                <th style={{ lineHeight: '50px' }}>هزینه راه اندازی</th>
                {this.props.data.panels[0].host_panel.map((panel) => (
                  <th style={{ lineHeight: '25px' }} key={panel}>
                    قیمت <br /> کنترل پنل {panel}
                  </th>
                ))}
                <th className="text-center" style={{ lineHeight: '73px' }}>
                  <button
                    type="button"
                    className={styles.moreInfoBtn}
                    onClick={this.toggleMoreInfo}
                  >
                    اطلاعات بیشتر{' '}
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {this.props.data.panels.map((panel) => (
                <tr key={panel.id}>
                  <td>{panel.title}</td>
                  <td>{panel.space}</td>
                  <td>
                    {panel.bandwidth === '-' ? (
                      <span className={styles.jUnlimited}>بدون محدودیت</span>
                    ) : (
                      panel.bandwidth
                    )}
                  </td>
                  <td>
                    {panel.host_panel.map((panel) => (
                      <div key={panel}>{panel}</div>
                    ))}
                  </td>
                  <td
                    className={classNames({
                      [styles.check]: panel.ssl,
                    })}
                  >
                    {panel.ssl ? (
                      <i className="far fa-check-square"></i>
                    ) : (
                      <i className="fa fa-times fa-lg" />
                    )}
                  </td>
                  <td
                    className={classNames(styles.jHidden, {
                      [styles.open]: this.state.isMoreInfoOpen,
                    })}
                  >
                    {panel.park_domains === '-' ? (
                      <span className={styles.jUnlimited}>بدون محدودیت</span>
                    ) : (
                      `${panel.park_domains} عدد`
                    )}
                  </td>
                  <td>
                    {panel.additional_sites === '-' ? (
                      <span className={styles.jUnlimited}>بدون محدودیت</span>
                    ) : (
                      `${panel.additional_sites} عدد`
                    )}
                  </td>
                  <td
                    className={classNames(styles.jHidden, {
                      [styles.open]: this.state.isMoreInfoOpen,
                    })}
                  >
                    {panel.subdomains === '-' ? (
                      <span className={styles.jUnlimited}>بدون محدودیت</span>
                    ) : (
                      `${panel.subdomains} عدد`
                    )}
                  </td>
                  <td
                    className={classNames(styles.jHidden, {
                      [styles.open]: this.state.isMoreInfoOpen,
                    })}
                  >
                    {panel.emails === '-' ? (
                      <span className={styles.jUnlimited}>بدون محدودیت</span>
                    ) : (
                      `${panel.emails} عدد`
                    )}
                  </td>
                  <td
                    className={classNames(styles.jHidden, {
                      [styles.open]: this.state.isMoreInfoOpen,
                    })}
                  >
                    {panel.ftp === '-' ? (
                      <span className={styles.jUnlimited}>بدون محدودیت</span>
                    ) : (
                      panel.ftp
                    )}
                  </td>
                  <td
                    className={classNames(styles.jHidden, {
                      [styles.open]: this.state.isMoreInfoOpen,
                    })}
                  >
                    {panel.database === '-' ? (
                      <span className={styles.jUnlimited}>بدون محدودیت</span>
                    ) : (
                      panel.database
                    )}
                  </td>
                  <td
                    className={classNames(styles.jHidden, {
                      [styles.open]: this.state.isMoreInfoOpen,
                    })}
                  >
                    {panel.daily_backup ? (
                      <i
                        className={classNames(
                          'far fa-check-square',
                          styles.check
                        )}
                      ></i>
                    ) : (
                      <i className="fa fa-times fa-lg" />
                    )}
                  </td>
                  <td
                    className={classNames(styles.jHidden, {
                      [styles.open]: this.state.isMoreInfoOpen,
                    })}
                  >
                    {panel.monthly_backup ? (
                      <i
                        className={classNames(
                          'far fa-check-square',
                          styles.check
                        )}
                      ></i>
                    ) : (
                      <i className="fa fa-times fa-lg" />
                    )}
                  </td>
                  <td
                    className={classNames(styles.jHidden, {
                      [styles.open]: this.state.isMoreInfoOpen,
                    })}
                  >
                    {panel.annual_backup ? (
                      <i
                        className={classNames(
                          'far fa-check-square',
                          styles.check
                        )}
                      ></i>
                    ) : (
                      <i className="fa fa-times fa-lg" />
                    )}
                  </td>
                  <td
                    className={classNames({
                      [styles.jHidden]: this.state.isMoreInfoOpen,
                    })}
                  >
                    {panel.daily_backup && (
                      <div>
                        <i
                          className={classNames(
                            'far fa-check-square',
                            styles.check
                          )}
                        ></i>{' '}
                        روزانه
                      </div>
                    )}
                    {panel.monthly_backup && (
                      <div>
                        <i
                          className={classNames(
                            'far fa-check-square',
                            styles.check
                          )}
                        ></i>{' '}
                        ماهانه
                      </div>
                    )}
                    {panel.annual_backup && (
                      <div>
                        <i
                          className={classNames(
                            'far fa-check-square',
                            styles.check
                          )}
                        ></i>{' '}
                        سالیانه
                      </div>
                    )}
                  </td>
                  <td>
                    <small>{panel.cpu}</small>
                  </td>
                  <td>
                    {panel.ram.value}
                    <br />
                    <div className={styles.scoreWrapper}>
                      <ReactStars
                        size={50}
                        count={5}
                        value={panel.ram.score}
                        edit={false}
                        emptyIcon={
                          <i
                            className={classNames(
                              'far fa-star',
                              styles.emptyIcon
                            )}
                          />
                        }
                        filledIcon={<i className="fa fa-star" />}
                      />
                    </div>
                  </td>
                  <td>{panel.web_server}</td>
                  <td>{panel.hard_server}</td>
                  <td>
                    {formatPrice(panel.price)} {panel.currency.title} ماهیانه
                    <br />
                    یکبار پرداخت ماه اول
                  </td>
                  <td style={{ height: '67px' }}>
                    {formatPrice(panel.price)} {panel.currency.title} ماهیانه
                  </td>
                  <td style={{ height: '67px' }}>
                    {formatPrice(panel.price)} {panel.currency.title} ماهیانه
                  </td>
                  <td>
                    <div className={styles.btnsWrapper}>
                      {this.props.data.licenses.map((license) => (
                        <Link
                          key={license.id}
                          href={`/order/hosting/linux/${license.id}`}
                        >
                          <a className={styles.orderLink}>
                            <OverlayTrigger
                              placement="top"
                              overlay={
                                <Tooltip
                                  id={`${license.license_en}-tooltip`}
                                  className={styles.tooltip}
                                >
                                  {license.license_en}
                                </Tooltip>
                              }
                            >
                              <img src={license.img} alt={license.license_en} />
                            </OverlayTrigger>
                            <span>{license.license_fa}</span>{' '}
                          </a>
                        </Link>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {this.props.data.table_ps && (
            <div>*** {this.props.data.table_ps}</div>
          )}
        </Col>
      </Row>
    );
  }
}

export default DedicatedHostingTable;

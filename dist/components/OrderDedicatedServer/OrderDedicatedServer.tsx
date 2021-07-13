import * as React from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  Image,
  Button,
  Tooltip,
} from 'react-bootstrap';
import PagesHeader from '../PagesHeader/PagesHeader';
import OrderSteps from './OrderSteps/OrderSteps';
import styles from './OrderDedicatedServer.module.scss';
import { formatHards } from '../helper/formatHards';
import { formatSpaceInEnglish } from '../helper/formatSpace';
import { formatPrice } from '../helper/formatPrice';
import { OverlayTrigger } from 'react-bootstrap';
import classNames from 'classnames';

export interface OrderDedicatedServerProps {
  serviceData: any;
}

export interface OrderDedicatedServerState {
  backupSpace: string;
  license: string;
  os: { type: string; name: string };
}

class OrderDedicatedServer extends React.Component<
  OrderDedicatedServerProps,
  OrderDedicatedServerState
> {
  constructor(props: OrderDedicatedServerProps) {
    super(props);
    this.state = {
      backupSpace: '-',
      os: this.props.serviceData.oses[0],
      license: '-',
    };
    this.onChangeLicense = this.onChangeLicense.bind(this);
    this.onChangeBackupSpace = this.onChangeBackupSpace.bind(this);
    this.onChangeOs = this.onChangeOs.bind(this);
  }

  onChangeLicense(e) {
    this.setState({ license: e.target.value });
  }

  onChangeBackupSpace(e) {
    this.setState({ backupSpace: e.target.value });
  }

  onChangeOs(e) {
    const selected = this.props.serviceData.oses.find(
      (i) => i.name === e.target.value
    );
    this.setState({ os: selected });
  }

  render() {
    const isAlertOpen =
      this.state.os.type === 'windows' && this.state.license !== '-';

    return (
      <section>
        <PagesHeader
          title={`پیکربندی سرور اختصاصی ${this.props.serviceData.title}`}
        />

        <div className={styles.mainContent}>
          <Container>
            <Row>
              <Col md={3}>
                <OrderSteps step="configuration" />
              </Col>
              <Col md={9}>
                <Form>
                  <div className={styles.service}>
                    <h2 className={styles.title}>
                      {this.props.serviceData.title}
                    </h2>
                    <div className={styles.info}>
                      <p>
                        سرویسی که انتخاب کردید دارای امکانات ساختاری زیر است :
                      </p>
                      <p>{this.props.serviceData.title}</p>
                      <div>
                        <div>
                          هارد{' '}
                          {formatHards(this.props.serviceData.hard).map(
                            (hard) => (
                              <span key={hard}>{hard}</span>
                            )
                          )}
                        </div>
                        <div>
                          {this.props.serviceData.traffic === '-' ? (
                            <span>‌ترافیک بی نهایت</span>
                          ) : (
                            this.props.serviceData.traffic
                          )}
                        </div>
                        <div>
                          پردازشگر {this.props.serviceData.cpu.title}; :: cores
                          : {this.props.serviceData.cpu.cores}, :: threads :{' '}
                          {this.props.serviceData.cpu.threads}, :: Frequency :{' '}
                          {this.props.serviceData.cpu.speed} GHz
                        </div>
                        <div>
                          حافظه موقت{' '}
                          {formatSpaceInEnglish(this.props.serviceData.ram)}
                        </div>
                        <div>
                          ماهیانه {formatPrice(this.props.serviceData.price)}
                          {this.props.serviceData.currency.title}
                        </div>
                        <div>
                          هزینه ستاپ {formatPrice(this.props.serviceData.setup)}
                          {this.props.serviceData.currency.title}
                        </div>
                        <div>
                          موقعیت{' '}
                          {this.props.serviceData.datacenter.country.name_fa}
                          <OverlayTrigger
                            overlay={
                              <Tooltip
                                id={
                                  this.props.serviceData.datacenter.country.name
                                }
                                className="tooltip"
                              >
                                {this.props.serviceData.datacenter.country.name}
                              </Tooltip>
                            }
                          >
                            <Image
                              width="24px"
                              height="24px"
                              className={styles.flag}
                              src={
                                this.props.serviceData.datacenter.country.flag
                              }
                            />
                          </OverlayTrigger>
                        </div>
                      </div>
                    </div>

                    <Row className={styles.paymentPeriodRow}>
                      <Col md={4}>دوره پرداخت:</Col>
                      <Col md={8}>
                        <Form.Control as="select">
                          {this.props.serviceData.payment_periods.map(
                            (period) => (
                              <option value={period.id} key={period.id}>
                                برای {period.month} ماه قیمت{' '}
                                {`${formatPrice(period.price)} ${
                                  this.props.serviceData.currency.title
                                }`}
                              </option>
                            )
                          )}
                        </Form.Control>
                      </Col>
                    </Row>
                    <Row className={styles.additionalFeatures}>
                      <p>
                        <strong>انتخاب های قابل پیکربندی</strong>
                      </p>
                      <p>
                        این سرویس/محصول که انتخاب نموده اید دارای امکانات اضافه
                        ای است که میتوانید برای سفارش خود انتخاب نمایید
                      </p>
                      <br />
                      <div className={styles.rowsWrapper}>
                        <div className={styles.rows}>
                          {this.props.serviceData.licenses && (
                            <div className={styles.row}>
                              <div>لایسنس</div>
                              <div>
                                <Form.Control
                                  as="select"
                                  onChange={this.onChangeLicense}
                                >
                                  <option value="-">لازم ندارم</option>
                                  {this.props.serviceData.licenses.map(
                                    (license) => (
                                      <option
                                        value={license.id}
                                        key={license.id}
                                      >
                                        {license.name} - ماهیانه قیمت:{' '}
                                        {`${formatPrice(license.price)} ${
                                          this.props.serviceData.currency.title
                                        }`}
                                      </option>
                                    )
                                  )}
                                </Form.Control>
                              </div>
                            </div>
                          )}
                          {this.props.serviceData.backup_spaces && (
                            <div className={styles.row}>
                              <div>فضای بکاپ</div>
                              <div>
                                <Form.Control
                                  as="select"
                                  onChange={this.onChangeBackupSpace}
                                >
                                  <option value="-">لازم ندارم</option>
                                  {this.props.serviceData.backup_spaces.map(
                                    (backup_space) => (
                                      <option
                                        value={backup_space.id}
                                        key={backup_space.id}
                                      >
                                        {formatSpaceInEnglish(
                                          backup_space.space
                                        )}{' '}
                                        ، قیمت :{' '}
                                        {`${formatPrice(backup_space.price)} ${
                                          this.props.serviceData.currency.title
                                        }`}{' '}
                                        ماهیانه
                                      </option>
                                    )
                                  )}
                                </Form.Control>
                              </div>
                            </div>
                          )}
                          <div
                            className={classNames(styles.row, {
                              [styles.hidden]: this.state.backupSpace === '-',
                            })}
                          >
                            <div>دامنه هاست بکاپ</div>
                            <div>
                              <Form.Control type="text" />
                            </div>
                          </div>

                          <div className={styles.row}>
                            <div>توضیحات</div>
                            <div>
                              <Form.Control
                                as="textarea"
                                placeholder="درصورتی که میخواید توضیح خاصی در مورد آماده سازی سرور به ما بدهید لطفا آن را در اینجا ذکر کنید"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Row>
                    <div className={styles.osRow}>
                      <div>سیستم عامل</div>
                      <div>
                        <Form.Control as="select" onChange={this.onChangeOs}>
                          <optgroup label="Windows">
                            {this.props.serviceData.oses
                              .filter((i) => i.type === 'windows')
                              .map((os) => (
                                <option value={os.name} key={os.name}>
                                  {os.name}
                                </option>
                              ))}
                          </optgroup>
                          <optgroup label="linux">
                            {this.props.serviceData.oses
                              .filter((i) => i.type === 'linux')
                              .map((os) => (
                                <option value={os.name} key={os.name}>
                                  {os.name}
                                </option>
                              ))}
                          </optgroup>
                        </Form.Control>
                      </div>
                    </div>
                    <div
                      className={classNames(styles.alert, {
                        [styles.show]:
                          this.state.os.type === 'windows' &&
                          this.state.license !== '-',
                      })}
                    >
                      توجه داشته باشید که لایسنس ها مربوط به برنامه هایی هستند
                      که فقط بر روی سیستم عامل های لینوکس نصب میشوند
                    </div>
                    <Row className="justify-content-center">
                      <Col md={6}>
                        <Button className={styles.nextStepBtn}>ادامه</Button>
                      </Col>
                    </Row>
                  </div>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
      </section>
    );
  }
}

export default OrderDedicatedServer;

import classNames from 'classnames';
import moment from 'jalali-moment';
import * as React from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  Image,
  FormControl,
  FormControlProps,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { IDedicatedPlan } from '../../../helper/types/products/Dedicated/plan';
import { RootState } from '../../../store';
import PagesHeader from '../../PagesHeader/PagesHeader';
import { countries } from '../lib/countries';
import styles from './CountryServers.module.scss';
import Plan from './Plan/Plan';
import Recommended from './Recommended/Recommended';

type countryPlans = {
  status: boolean;
  recommended: [];
  plans: IDedicatedPlan[];
};

interface IProps {
  countryPlans: countryPlans;
  currencies: RootState['currencies'];
}

interface IState {
  filtredPlans: IDedicatedPlan[];
  plans: IDedicatedPlan[];

  // Filter and search
  title: string;
  sortName: string;
  hardType: string;
  sortAscOrDesc: string;
}

class CountryServer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      filtredPlans: this.props.countryPlans.plans,
      plans: this.props.countryPlans.plans,
      title: '',
      sortName: '',
      hardType: '',
      sortAscOrDesc: 'asc',
    };
  }

  filterWithTitle(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      title: e.target.value,
    });
  }

  filterByHardType(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      hardType: e.target.value,
    });
  }

  sorting(e: React.ChangeEvent<HTMLSelectElement>) {
    this.setState({
      sortName: e.target.value,
    });
  }

  changeSortAscOrDesc(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ sortAscOrDesc: e.target.value });
  }

  render() {
    const targetCountry =
      countries[this.props.countryPlans.plans[0].datacenter.country.code];

    const filtredPlans = this.state.plans
      .filter((plan) => {
        const planHrads = plan.hard.map((hard) =>
          hard.map((i) => {
            if (i.onsell) {
              return i.type;
            }
          })
        );
        if (this.state.hardType.length === 0) {
          return (
            plan.title.toLowerCase().search(this.state.title.toLowerCase()) > -1
          );
        } else {
          return (
            planHrads
              .join()
              .split(',')
              .find(
                (hardType) =>
                  hardType
                    .toLowerCase()
                    .search(this.state.hardType.toLowerCase()) > -1
              ) &&
            plan.title.toLowerCase().search(this.state.title.toLowerCase()) > -1
          );
        }
      })
      .sort((a, b) => {
        if (this.state.sortName.length === 0) {
          return a.id - b.id;
        } else {
          if (this.state.sortAscOrDesc === 'asc') {
            if (this.state.sortName === 'price') {
              return a.price - b.price;
            } else if (this.state.sortName === 'cpu') {
              const aCpuScore = a.cpu.cores * a.cpu.speed * a.cpu.threads;
              const bCpuScore = b.cpu.cores * b.cpu.speed * b.cpu.threads;
              return aCpuScore - bCpuScore;
            } else if (this.state.sortName === 'ram') {
              return a.ram - b.ram;
            } else if (this.state.sortName === 'bandwidth') {
              return a.bandwidth - b.bandwidth;
            } else if (this.state.sortName === 'port') {
              return a.port - b.port;
            } else if (this.state.sortName === 'setup') {
              return a.setup - b.setup;
            }
          } else if (this.state.sortAscOrDesc === 'desc') {
            if (this.state.sortName === 'price') {
              return b.price - a.price;
            } else if (this.state.sortName === 'cpu') {
              const aCpuScore = a.cpu.cores * a.cpu.speed * a.cpu.threads;
              const bCpuScore = b.cpu.cores * b.cpu.speed * b.cpu.threads;
              return bCpuScore - aCpuScore;
            } else if (this.state.sortName === 'ram') {
              return b.ram - a.ram;
            } else if (this.state.sortName === 'bandwidth') {
              return b.bandwidth - a.bandwidth;
            } else if (this.state.sortName === 'port') {
              return b.port - a.port;
            } else if (this.state.sortName === 'setup') {
              return b.setup - a.setup;
            }
          }
        }
      });

    return (
      <div>
        <PagesHeader title={`سرور اختصاصی ${targetCountry.title_fa}`} />

        <div className={styles.wrapper}>
          <Container fluid="lg">
            <Row className={styles.summary}>
              <Col md={4}>
                <Image
                  src="/images/dedicated/dedicated_255x255.jpg"
                  title={`سرور اختصاصی ${targetCountry.title_fa}`}
                  alt={`سرور اختصاصی ${targetCountry.title_fa}`}
                  width="255"
                  height="255"
                />
              </Col>
              <Col md={8} className={styles.left}>
                <h3>سرور اختصاصی {targetCountry.title_fa}</h3>
                <>{targetCountry.largeInfo}</>
                <div className="alert alert-info">
                  قیمت های موجود براساس آخرین قیمت ارز در تاریخ{' '}
                  <span className="ltr" style={{ display: 'inline-block' }}>
                    {typeof this.props.countryPlans.plans[0].currency !==
                      'number' &&
                      moment(
                        this.props.countryPlans.plans[0].currency.update_at *
                          1000
                      )
                        .locale('fa')
                        .format('YYYY/MM/DD LT')}
                  </span>{' '}
                  می باشد.
                </div>
              </Col>
            </Row>
            {this.props.countryPlans.recommended.length > 0 && (
              <Recommended recommended={this.props.countryPlans.recommended} />
            )}
            <Row className={styles.allPlans}>
              <h3>همه سرور ها</h3>
              <Col lg={3} className={styles.sort}>
                <Form.Group className={styles.formGroup}>
                  <Form.Label className={styles.controlLabel}>عنوان</Form.Label>
                  <input
                    type="text"
                    name="title"
                    className={classNames('form-control', styles.formControl)}
                    onChange={(e) => this.filterWithTitle(e)}
                    value={this.state.title}
                  />
                </Form.Group>
                <Form.Group className={styles.formGroup}>
                  <Form.Label className={styles.controlLabel}>
                    مرتب سازی بر اساس
                  </Form.Label>
                  <select
                    className={classNames('form-control', styles.formControl)}
                    onChange={(e) => this.sorting(e)}
                  >
                    <option value=""></option>
                    <option value="cpu">پردازشگر</option>
                    <option value="ram">حافظه موقت</option>
                    <option value="bandwidth">ترافیک</option>
                    <option value="port">پورت</option>
                    <option value="price">قیمت</option>
                    <option value="setup">هزینه ستاپ</option>
                  </select>
                </Form.Group>
                <Form.Group className={styles.formGroup}>
                  <div
                    className={styles.sortAscOrDesc}
                    style={{
                      height: this.state.sortName.length > 0 ? '22px' : '0',
                    }}
                  >
                    <label>
                      <input
                        type="radio"
                        name="orderBy"
                        value="asc"
                        onChange={(e) => this.changeSortAscOrDesc(e)}
                        defaultChecked={true}
                      />
                      <span>کوچک به بزرگ</span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="orderBy"
                        value="desc"
                        onChange={(e) => this.changeSortAscOrDesc(e)}
                      />
                      <span>بزرگ به کوچک</span>
                    </label>
                  </div>
                </Form.Group>
                <Form.Group className={styles.formGroup}>
                  <Form.Label className={styles.controlLabel}>
                    نوع هارد
                  </Form.Label>
                  <div className={styles.radio}>
                    <input
                      id="all-hard"
                      type="radio"
                      name="hard"
                      value=""
                      onChange={(e) => this.filterByHardType(e)}
                      defaultChecked={true}
                    />
                    <label htmlFor="all-hard">همه</label>
                  </div>
                  <div className={styles.radio}>
                    <input
                      id="ssd-hard"
                      type="radio"
                      name="hard"
                      value="ssd"
                      onChange={(e) => this.filterByHardType(e)}
                    />
                    <label htmlFor="ssd-hard">SSD</label>
                  </div>
                  <div className={styles.radio}>
                    <input
                      id="sata-hard"
                      type="radio"
                      name="hard"
                      value="sata"
                      onChange={(e) => this.filterByHardType(e)}
                    />
                    <label htmlFor="sata-hard">SATA</label>
                  </div>
                  <div className={styles.radio}>
                    <input
                      id="sas-hard"
                      type="radio"
                      name="hard"
                      value="sas"
                      onChange={(e) => this.filterByHardType(e)}
                    />
                    <label htmlFor="sas-hard">SAS</label>
                  </div>
                  <div className={styles.radio}>
                    <input
                      id="nvme-hard"
                      type="radio"
                      name="hard"
                      value="nvme"
                      onChange={(e) => this.filterByHardType(e)}
                    />
                    <label htmlFor="nvme-hard">NVMe</label>
                  </div>
                </Form.Group>
              </Col>
              <Col lg={9} className={styles.plans}>
                {filtredPlans.map((plan) => (
                  <Plan key={plan.id} plan={plan} />
                ))}
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default connect((state: RootState) => {
  return {
    currencies: state.currencies,
  };
})(CountryServer);

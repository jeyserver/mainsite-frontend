import moment from 'jalali-moment';
import * as React from 'react';
import { Container, Row, Col, Form, Image } from 'react-bootstrap';
import { countries } from '../lib/countries';
import styles from './CountryServers.module.scss';
import Plan from './Plan/Plan';
import Recommended from './Recommended/Recommended';

type plans = {
  id: number;
  title: string;
  price: number;
  datacenter: { title: string; country: { code: string; name: string } };
  hard: [
    [{ type: string; space: number; price: number; onsell?: boolean }],
    [{ type: string; space: number; price: number; onsell?: boolean }]
  ];
  cpu: {
    type: string;
    title: string;
    cores: number;
    threads: number;
    speed: number;
    num: number;
  };
  bandwidth: number;
  port: number;
  ram: number;
  raid: null;
  setup: number;
  currency: { id: number; title: string; update_at: number };
  sold_out: number;
  status: number;
}[];

type countryPlans = {
  status: boolean;
  recommended: [];
  plans: plans;
};

export interface CountryServerProps {
  countryPlans: countryPlans;
}

export interface CountryServerState {
  filtredPlans: plans;
  plans: plans;
  title: string;
  sortName: '' | 'cpu' | 'ram' | 'bandwidth' | 'port' | 'price' | 'setup';
  hardType: string;
  sortAscOrDesc: 'asc' | 'desc';
}

class CountryServer extends React.Component<
  CountryServerProps,
  CountryServerState
> {
  constructor(props: CountryServerProps) {
    super(props);
    this.state = {
      filtredPlans: this.props.countryPlans.plans,
      plans: this.props.countryPlans.plans,
      title: '',
      sortName: '',
      hardType: '',
      sortAscOrDesc: 'asc',
    };
    this.filterWithTitle = this.filterWithTitle.bind(this);
    this.filterByHardType = this.filterByHardType.bind(this);
    this.sorting = this.sorting.bind(this);
    this.changeSortAscOrDesc = this.changeSortAscOrDesc.bind(this);
  }

  filterWithTitle(e) {
    this.setState({
      title: e.target.value,
      filtredPlans: this.state.plans
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
              plan.title.toLowerCase().search(e.target.value.toLowerCase()) > -1
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
              plan.title.toLowerCase().search(e.target.value.toLowerCase()) > -1
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
        }),
    });
  }

  filterByHardType(e) {
    this.setState({
      hardType: e.target.value,
      filtredPlans: this.state.plans
        .filter((plan) => {
          const planHrads = plan.hard.map((hard) =>
            hard.map((i) => {
              if (i.onsell) {
                return i.type;
              }
            })
          );

          if (e.target.value.length === 0) {
            return (
              plan.title.toLowerCase().search(this.state.title.toLowerCase()) >
              -1
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
                      .search(e.target.value.toLowerCase()) > -1
                ) &&
              plan.title.toLowerCase().search(this.state.title.toLowerCase()) >
                -1
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
        }),
    });
  }

  sorting(e) {
    this.setState((prev) => {
      return {
        sortName: e.target.value,
        filtredPlans: prev.filtredPlans.sort((a, b) => {
          if (e.target.value.length === 0) {
            return a.id - b.id;
          } else {
            if (prev.sortAscOrDesc === 'asc') {
              if (e.target.value === 'price') {
                return a.price - b.price;
              } else if (e.target.value === 'cpu') {
                const aCpuScore = a.cpu.cores * a.cpu.speed * a.cpu.threads;
                const bCpuScore = b.cpu.cores * b.cpu.speed * b.cpu.threads;
                return aCpuScore - bCpuScore;
              } else if (e.target.value === 'ram') {
                return a.ram - b.ram;
              } else if (e.target.value === 'bandwidth') {
                return a.bandwidth - b.bandwidth;
              } else if (e.target.value === 'port') {
                return a.port - b.port;
              } else if (e.target.value === 'setup') {
                return a.setup - b.setup;
              }
            } else if (prev.sortAscOrDesc === 'desc') {
              if (e.target.value === 'price') {
                return b.price - a.price;
              } else if (e.target.value === 'cpu') {
                const aCpuScore = a.cpu.cores * a.cpu.speed * a.cpu.threads;
                const bCpuScore = b.cpu.cores * b.cpu.speed * b.cpu.threads;
                return bCpuScore - aCpuScore;
              } else if (e.target.value === 'ram') {
                return b.ram - a.ram;
              } else if (e.target.value === 'bandwidth') {
                return b.bandwidth - a.bandwidth;
              } else if (e.target.value === 'port') {
                return b.port - a.port;
              } else if (e.target.value === 'setup') {
                return b.setup - a.setup;
              }
            }
          }
        }),
      };
    });
  }

  changeSortAscOrDesc(e) {
    this.setState((prev) => {
      return {
        sortAscOrDesc: e.target.value,
        filtredPlans: prev.filtredPlans.sort((a, b) => {
          if (e.target.value === 'asc') {
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
          } else if (e.target.value === 'desc') {
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
        }),
      };
    });
  }

  render() {
    const targetCountry =
      countries[this.props.countryPlans.plans[0].datacenter.country.code];
    return (
      <div>
        <div className={styles.innerBanner}>
          <Container>
            <h2>سرور اختصاصی {targetCountry.title_fa}</h2>
          </Container>
        </div>
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
                    {moment(
                      this.props.countryPlans.plans
                        .map((i) => i.currency.update_at)
                        .reduce(
                          (acc, value) => Math.max(acc, value),
                          this.props.countryPlans.plans[0].currency.update_at
                        ) * 1000
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
                  <Form.Control
                    type="text"
                    name="title"
                    className={styles.formControl}
                    onChange={this.filterWithTitle}
                    value={this.state.title}
                  />
                </Form.Group>
                <Form.Group className={styles.formGroup}>
                  <Form.Label className={styles.controlLabel}>
                    مرتب سازی بر اساس
                  </Form.Label>
                  <Form.Control
                    className={styles.formControl}
                    onChange={this.sorting}
                    as="select"
                  >
                    <option value=""></option>
                    <option value="cpu">پردازشگر</option>
                    <option value="ram">حافظه موقت</option>
                    <option value="bandwidth">ترافیک</option>
                    <option value="port">پورت</option>
                    <option value="price">قیمت</option>
                    <option value="setup">هزینه ستاپ</option>
                  </Form.Control>
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
                        onChange={this.changeSortAscOrDesc}
                        defaultChecked={true}
                      />
                      <span>کوچک به بزرگ</span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="orderBy"
                        value="desc"
                        onChange={this.changeSortAscOrDesc}
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
                      onChange={this.filterByHardType}
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
                      onChange={this.filterByHardType}
                    />
                    <label htmlFor="ssd-hard">SSD</label>
                  </div>
                  <div className={styles.radio}>
                    <input
                      id="sata-hard"
                      type="radio"
                      name="hard"
                      value="sata"
                      onChange={this.filterByHardType}
                    />
                    <label htmlFor="sata-hard">SATA</label>
                  </div>
                  <div className={styles.radio}>
                    <input
                      id="sas-hard"
                      type="radio"
                      name="hard"
                      value="sas"
                      onChange={this.filterByHardType}
                    />
                    <label htmlFor="sas-hard">SAS</label>
                  </div>
                  <div className={styles.radio}>
                    <input
                      id="nvme-hard"
                      type="radio"
                      name="hard"
                      value="nvme"
                      onChange={this.filterByHardType}
                    />
                    <label htmlFor="nvme-hard">NVMe</label>
                  </div>
                </Form.Group>
              </Col>
              <Col lg={9} className={styles.plans}>
                {this.state.filtredPlans.map((plan) => (
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

export default CountryServer;

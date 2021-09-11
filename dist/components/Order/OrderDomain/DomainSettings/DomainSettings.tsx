import * as React from 'react';
import classNames from 'classnames';
import { NextRouter, withRouter } from 'next/router';
import { Form, Col, Row, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import { ITld } from '../../../../pages/_app';
import { RootState } from '../../../../store';
import { NotificationManager } from 'react-notifications';
import CheckDomainForm from './CheckDomainForm/CheckDomainForm';
import RecommendedDomains from './RecommendedDomains/RecommendedDomains';
import styles from './DomainSettings.module.scss';
import backend from '../../../../axios-config';

interface IProps {
  data: {
    tlds: ITld[];
    transferOption: boolean;
    cheepBorder: number;
    commercialDomains: string[];
    tldFromQuery?: string;
    hostPlan?: string;
  };
  router: NextRouter;
  domain: RootState['domain'];
}

interface IDomain {
  available: boolean;
  name: string;
  tld: ITld;
}

interface IState {
  domainoption: 'register' | 'transfer' | 'owndomain';
  recommendedDomains: IDomain[];
  ordered: IDomain;
  selectedDomains: IDomain[];
  recommendedDomainsLoading: boolean;
  periods: { [domain: string]: string };
}

class DomainSettings extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      domainoption: 'register',
      recommendedDomains: [],
      ordered: null,
      selectedDomains: [],
      recommendedDomainsLoading: false,
      periods: {},
    };
  }

  onChangeDomainOption(e: React.ChangeEvent<HTMLInputElement>) {
    if (
      e.target.value === 'register' ||
      e.target.value === 'transfer' ||
      e.target.value === 'owndomain'
    ) {
      this.setState({
        domainoption: e.target.value,
        recommendedDomains: [],
        selectedDomains: [],
        ordered: null,
        periods: {},
      });
    }
  }

  setPeriods(periods: { [domain: string]: string }) {
    this.setState({ periods });
  }

  changePeriods(domainWithPeriod: { domain: string; period: string }) {
    this.setState((prev) => {
      return {
        periods: {
          ...prev.periods,
          [domainWithPeriod.domain]: domainWithPeriod.period,
        },
      };
    });
  }

  setRecommendedDomains(domains: IDomain[]) {
    this.setState({ recommendedDomains: domains });
  }

  setSelectedDomains(domains: IDomain[]) {
    this.setState({ selectedDomains: domains });
  }

  toggleSelectedDomains(newDomain: IDomain) {
    const domainIndex = this.state.selectedDomains.findIndex(
      (domain) => domain.tld.id === newDomain.tld.id
    );

    if (domainIndex > -1) {
      this.setState((prev) => {
        return {
          selectedDomains: prev.selectedDomains.filter(
            (domain, index) => index !== domainIndex
          ),
        };
      });
    } else {
      this.setState((prev) => {
        return {
          selectedDomains: [...prev.selectedDomains, newDomain],
        };
      });
    }
  }

  componentDidMount() {
    if (this.props.domain.selected) {
      this.setState({ recommendedDomainsLoading: true });

      const { name, tld } = this.props.domain.selected;

      backend
        .post(
          `/order/domain?ajax=1&domainoption=${this.state.domainoption}&tld=${tld}&name=${name}`
        )
        .then((res) => {
          if (res.data.status) {
            if (res.data.ordered.available) {
              this.setState({ selectedDomains: [res.data.ordered] });
            }
            this.setState({
              recommendedDomains: [res.data.ordered, ...res.data.recomendeds],
            });
          }
        })
        .catch(() => {
          NotificationManager.error(
            'ارتباط با سامانه بدرستی انجام نشد، لطفا مجددا تلاش کنید.',
            'خطا'
          );
        })
        .finally(() => {
          this.setState({ recommendedDomainsLoading: false });
        });
    }
  }

  componentDidUpdate(prevProps: IProps, prevState: IState) {
    //   if (
    //     prevProps.domain.selected.name !== this.props.domain.selected.name ||
    //     prevProps.domain.selected.tld !== this.props.domain.selected.tld
    //   ) {
    //     this.setState({
    //       recommendedDomainsLoading: true,
    //       domainName: this.props.domain.selected.name,
    //       domainTld: this.props.domain.selected.tld,
    //     });
    //     axios
    //       .get(
    //         'https://jsonblob.com/api/jsonBlob/ea5bc877-e265-11eb-a96b-95a5a070a2d6'
    //       )
    //       .then((res) => {
    //         this.setState({
    //           recommendedDomains: res.data.recomendeds,
    //           ordered: res.data.ordered,
    //           selectedDomains: [res.data.ordered],
    //           recommendedDomainsLoading: false,
    //         });
    //       })
    //       .catch(() => {
    //         this.setState({
    //           recommendedDomainsLoading: false,
    //         });
    //       });
    //   }
  }

  render() {
    const defaultTldId = this.props.data.tlds.find(
      (i) => i.tld === this.props.data.tldFromQuery
    );
    console.log(this.props.data.tldFromQuery);

    return (
      <div className={styles.domainSettings}>
        <h2 className={styles.title}>خرید دامنه</h2>
        <p className={styles.info}>
          لطفا نام دامین انتخابی خود را در زیر وارد کنید.
        </p>
        <br />

        <div className={styles.orderDomainForm}>
          <Col xs={12}>
            <Form.Group>
              <div className={styles.domainOptions}>
                <label>
                  <input
                    type="radio"
                    name="domainoption"
                    value="register"
                    onChange={(e) => this.onChangeDomainOption(e)}
                    defaultChecked
                  />
                  میخواهم جی سرور برای من دامنه جدید ثبت کند.
                </label>
              </div>

              {this.props.data.tldFromQuery && (
                <div className={styles.domainOptions}>
                  <label>
                    <input
                      type="radio"
                      name="domainoption"
                      value="transfer"
                      onChange={(e) => this.onChangeDomainOption(e)}
                    />
                    میخواهم دامنه ام را منتقل کنم به جی سرور
                  </label>
                </div>
              )}

              {this.props.data.hostPlan && (
                <div className={styles.domainOptions}>
                  <label>
                    <input
                      type="radio"
                      name="domainoption"
                      value="owndomain"
                      onChange={(e) => this.onChangeDomainOption(e)}
                    />
                    NameServer های شرکت را بر روی دامنه ام تنظیم می کنم.
                  </label>
                </div>
              )}
            </Form.Group>
          </Col>

          <Row
            className={classNames(styles.alertOwnDomain, {
              [styles.show]: this.state.domainoption === 'owndomain',
            })}
          >
            <Col xs={12}>
              <div className={styles.alert}>
                <span>
                  پسوند دامنه را بدون نقطه در قسمت پسوند دامنه وارد کنید
                </span>
              </div>
            </Col>
          </Row>

          <CheckDomainForm
            tlds={this.props.data.tlds}
            domainoption={this.state.domainoption}
            commercialDomains={this.props.data.commercialDomains}
            cheepBorder={this.props.data.cheepBorder}
            default={{
              name: '',
              tld: defaultTldId && defaultTldId.id,
            }}
            hostPlan={this.props.data.hostPlan}
            selectedDomains={this.state.selectedDomains}
            setRecommendedDomains={(domains) =>
              this.setRecommendedDomains(domains)
            }
            setSelectedDomains={(domains) => this.setSelectedDomains(domains)}
            setPeriods={(periods) => this.setPeriods(periods)}
            periods={this.state.periods}
          >
            {this.state.recommendedDomainsLoading && (
              <div className={styles.recommendedDomainsLoading}>
                <Spinner animation="border" size="sm" />
                <span>لطفا صبر کنید</span>
              </div>
            )}

            {this.state.recommendedDomains.length > 0 && (
              <RecommendedDomains
                toggleSelectedDomains={(newDomain) =>
                  this.toggleSelectedDomains(newDomain)
                }
                selectedDomains={this.state.selectedDomains}
                recomendeds={this.state.recommendedDomains}
                changePeriods={(domainWithPeriod) =>
                  this.changePeriods(domainWithPeriod)
                }
              />
            )}
          </CheckDomainForm>
        </div>
      </div>
    );
  }
}

export default connect((state: RootState) => {
  return {
    domain: state.domain,
  };
})(withRouter(DomainSettings));

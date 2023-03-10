import * as React from 'react';
import { Row, Col, Table, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Link from 'next/link';
import styles from './VPSHostingTable.module.scss';
import classNames from 'classnames';
import CountryFlagTooltip from '../../../../helper/components/CountryFlagTooltip/CountryFlagTooltip';
import { IHostPlan } from '../../../../helper/types/products/Host/plan';
import translateHostPanel from '../../../../helper/translators/translateHostPanel';
import { formatPriceWithCurrency } from '../../../../store/Currencies';
import { connect } from 'react-redux';
import { RootState } from '../../../../store';
import StarredCell from '../../TablesUtils/StarredCell';
import BackupsCell from '../../TablesUtils/BackupsCell';
import { formatSpace } from '../../../../helper/formatSpace';

interface IProps {
  plans: IHostPlan[];
  currencies: RootState['currencies'];
}

interface IHostPlanWithCounties extends IHostPlan {
  counties: {
    id: string;
    name: string;
    code: string;
    isAvailable: boolean;
  }[];
}

interface IState {
  isMoreInfoOpen: boolean;
  plans: IHostPlanWithCounties[];
}

class SharedHostingTable extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isMoreInfoOpen: false,
      plans: Object.values(
        this.props.plans.reduce((accumulator, currentValue) => {
          const co = currentValue.title;

          if (accumulator && accumulator[co]) {
            accumulator[co] = {
              ...accumulator[co],
              counties: [
                ...accumulator[co].counties,
                {
                  ...currentValue.country,
                  id: currentValue.id,
                  isAvailable: currentValue.is_available,
                },
              ],
            };
          } else {
            accumulator[co] = {
              ...currentValue,
              counties: [
                {
                  ...currentValue.country,
                  id: currentValue.id,
                  isAvailable: currentValue.is_available,
                },
              ],
            };
          }

          return accumulator;
        }, {})
      ),
    };
  }

  render() {
    const maximumCpu = Math.max(...this.state.plans.map((host) => host.cpu));
    const maximumRam = Math.max(...this.state.plans.map((host) => host.ram));

    return (
      <Row id={`${this.props.plans[0].cp}`} className={styles.tableWrapper}>
        <Col xs={12}>
          <div className={styles.tittleLine}>
            <h5>
              ???????? ???????? ?????????????? {translateHostPanel(this.props.plans[0].cp)}
            </h5>
            <div className={styles.divider}>
              <div />
            </div>
          </div>
          <Table className={styles.table}>
            <thead>
              <tr>
                <th>&nbsp;</th>
                <th>??????</th>
                <th>?????????? ????????</th>
                <th>?????? ????????</th>
                <th>?????????????????? ???????????? SSL</th>
                <th
                  className={classNames(styles.jHidden, {
                    [styles.open]: this.state.isMoreInfoOpen,
                  })}
                >
                  ?????????? ?????????? ????????
                </th>
                <th>?????????? ???????? ?????? ??????????</th>
                <th
                  className={classNames(styles.jHidden, {
                    [styles.open]: this.state.isMoreInfoOpen,
                  })}
                >
                  ?????????? ?????? ?????????? ????
                </th>
                <th
                  className={classNames(styles.jHidden, {
                    [styles.open]: this.state.isMoreInfoOpen,
                  })}
                >
                  ?????????? ?????????? ????
                </th>
                <th
                  className={classNames(styles.jHidden, {
                    [styles.open]: this.state.isMoreInfoOpen,
                  })}
                >
                  ?????????? ?????????? FTP
                </th>
                <th
                  className={classNames(styles.jHidden, {
                    [styles.open]: this.state.isMoreInfoOpen,
                  })}
                >
                  ?????????? ??????????????
                </th>
                <th
                  className={classNames(styles.jHidden, {
                    [styles.open]: this.state.isMoreInfoOpen,
                  })}
                >
                  ???????? ???????? ????????????
                </th>
                <th
                  className={classNames(styles.jHidden, {
                    [styles.open]: this.state.isMoreInfoOpen,
                  })}
                >
                  ???????? ???????? ??????????????
                </th>
                <th
                  className={classNames(styles.jHidden, {
                    [styles.open]: this.state.isMoreInfoOpen,
                  })}
                >
                  ???????? ???????? ??????????????
                </th>
                <th
                  className={classNames({
                    [styles.jHidden]: this.state.isMoreInfoOpen,
                  })}
                  style={
                    this.props.plans.some((i) => i.backups.length > 0) && {
                      lineHeight: '75px',
                    }
                  }
                >
                  ???????? ?????? ???????? ????????
                </th>
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id={`-tooltip`} className={styles.tooltip}>
                      ???????? ?????????????? ???? ????????????????
                    </Tooltip>
                  }
                >
                  <th style={{ lineHeight: '50px' }}>CPU</th>
                </OverlayTrigger>
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id={`-tooltip`} className={styles.tooltip}>
                      ?????????? ????????
                    </Tooltip>
                  }
                >
                  <th style={{ lineHeight: '50px' }}>Ram</th>
                </OverlayTrigger>
                <th>???? ???? ??????????????</th>
                <th>???? ????????</th>
                <th>???????? ????????</th>
                <th style={{ lineHeight: '50px' }}>?????????? ?????? ????????????</th>
                <th
                  style={{
                    lineHeight:
                      this.props.plans[0].cp === 'cpanel' ? '50px' : '',
                  }}
                >
                  ????????
                </th>
                <th className="text-center" style={{ lineHeight: '73px' }}>
                  <button
                    type="button"
                    className={styles.moreInfoBtn}
                    onClick={() => {
                      this.setState((prev) => {
                        return { isMoreInfoOpen: !prev.isMoreInfoOpen };
                      });
                    }}
                  >
                    ?????????????? ??????????{' '}
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {this.state.plans.map((plan) => (
                <tr key={plan.id}>
                  <td>{plan.title}</td>
                  <td>{formatSpace(plan.space, 'fa', true)}</td>
                  <td>
                    {!plan.bandwidth ? (
                      <span className={styles.jUnlimited}>???????? ??????????????</span>
                    ) : (
                      plan.bandwidth
                    )}
                  </td>
                  <td>{translateHostPanel(plan.cp)}</td>
                  <td
                    className={classNames({
                      [styles.check]: true,
                    })}
                  >
                    <i className="far fa-check-square"></i>
                  </td>

                  <td
                    className={classNames(styles.jHidden, {
                      [styles.open]: this.state.isMoreInfoOpen,
                    })}
                  >
                    {!plan.parkdomain ? (
                      <span className={styles.jUnlimited}>???????? ??????????????</span>
                    ) : (
                      `${plan.parkdomain} ??????`
                    )}
                  </td>

                  <td>
                    {!plan.addondomain ? (
                      <span className={styles.jUnlimited}>???????? ??????????????</span>
                    ) : (
                      `${plan.addondomain} ??????`
                    )}
                  </td>

                  <td
                    className={classNames(styles.jHidden, {
                      [styles.open]: this.state.isMoreInfoOpen,
                    })}
                  >
                    {!plan.subdomain ? (
                      <span className={styles.jUnlimited}>???????? ??????????????</span>
                    ) : (
                      `${plan.subdomain} ??????`
                    )}
                  </td>
                  <td
                    className={classNames(styles.jHidden, {
                      [styles.open]: this.state.isMoreInfoOpen,
                    })}
                  >
                    {!plan.email ? (
                      <span className={styles.jUnlimited}>???????? ??????????????</span>
                    ) : (
                      `${plan.email} ??????`
                    )}
                  </td>
                  <td
                    className={classNames(styles.jHidden, {
                      [styles.open]: this.state.isMoreInfoOpen,
                    })}
                  >
                    {!plan.ftp ? (
                      <span className={styles.jUnlimited}>???????? ??????????????</span>
                    ) : (
                      `${plan.ftp} ??????`
                    )}
                  </td>
                  <td
                    className={classNames(styles.jHidden, {
                      [styles.open]: this.state.isMoreInfoOpen,
                    })}
                  >
                    {!plan.dbs ? (
                      <span className={styles.jUnlimited}>???????? ??????????????</span>
                    ) : (
                      `${plan.dbs} ??????`
                    )}
                  </td>
                  <td
                    className={classNames(styles.jHidden, {
                      [styles.open]: this.state.isMoreInfoOpen,
                    })}
                  >
                    {plan.backups[2] ? (
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
                    {plan.backups[1] ? (
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
                    {plan.backups[0] ? (
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
                    style={{
                      height:
                        this.props.plans.some((i) => i.backups.length > 0) &&
                        !this.state.isMoreInfoOpen &&
                        '92px',
                    }}
                  >
                    <BackupsCell backups={plan.backups} />
                  </td>
                  {plan.cpu ? (
                    <StarredCell
                      text={
                        plan.cpu < 100
                          ? `% ${plan.cpu} ???? ????????`
                          : `${plan.cpu / 100} ????????`
                      }
                      star={(plan.cpu / maximumCpu) * 5}
                    />
                  ) : (
                    <StarredCell text={null} star={5} />
                  )}
                  {plan.ram ? (
                    <StarredCell
                      text={formatSpace(plan.ram, 'fa')}
                      star={(plan.ram / maximumRam) * 5}
                    />
                  ) : (
                    <StarredCell text={null} star={5} />
                  )}
                  <td>
                    <i
                      className={classNames(
                        'far fa-check-square',
                        styles.check
                      )}
                    ></i>
                    {/* <i className="fa fa-times fa-lg" /> */}
                  </td>
                  <td>
                    {plan.cp === 'cpanel' ? 'Apache + Nginx' : 'OpenLightSpeed'}
                  </td>
                  <td>SSD</td>
                  <td>
                    {formatPriceWithCurrency(
                      this.props.currencies,
                      plan.currency,
                      plan.setup
                    )}{' '}
                    ??????????????
                    <br />
                    ?????????? ???????????? ?????? ??????
                  </td>
                  <td>
                    {formatPriceWithCurrency(
                      this.props.currencies,
                      plan.currency,
                      plan.price
                    )}{' '}
                    ??????????????
                    <br />
                    {plan.cp === 'cpanel' &&
                      `${formatPriceWithCurrency(
                        this.props.currencies,
                        plan.currency,
                        plan.price * 12
                      )}
                    ??????????????`}
                  </td>
                  <td>
                    <div className={styles.btnsWrapper}>
                      {plan.counties.map((country) => (
                        <Link
                          key={country.name}
                          href={`/order/hosting/linux/${country.id}`}
                        >
                          <a className={styles.orderLink}>
                            <CountryFlagTooltip country={country} />
                            <span>??????????</span>{' '}
                          </a>
                        </Link>
                      ))}
                      {/* {plan.counties.map((country) =>
                        country.isAvailable ? (
                          <Link
                            key={country.name}
                            href={`/order/hosting/linux/${country.id}`}
                          >
                            <a className={styles.orderLink}>
                              <CountryFlagTooltip country={country} />
                              <span>??????????</span>{' '}
                            </a>
                          </Link>
                        ) : (
                          <div>
                            <OverlayTrigger
                              overlay={
                                <Tooltip
                                  id="tooltip-disabled"
                                  className={styles.tooltip}
                                >
                                  ?????? ?????? ???? ?????? ???????? ???????? ???????? ???????? ??????????????
                                </Tooltip>
                              }
                            >
                              <span className={styles.tooltipWrapper}>
                                <Button className={styles.orderLink} disabled>
                                  <img
                                    src={`/images/flags/${country.code.toLocaleLowerCase()}.svg`}
                                  />
                                  ??????????{' '}
                                </Button>
                              </span>
                            </OverlayTrigger>
                          </div>
                        )
                      )} */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    );
  }
}

export default connect((state: RootState) => {
  return {
    currencies: state.currencies,
  };
})(SharedHostingTable);

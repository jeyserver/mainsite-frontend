import classNames from 'classnames';
import { IProduceWithPatches } from 'immer/dist/internal';
import * as React from 'react';
import { Form, Row, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { ITld } from '../../../../../pages/_app';
import { RootState } from '../../../../../store';
import { formatPriceWithCurrency } from '../../../../../store/Currencies';
import styles from './RecommendedDomains.module.scss';

interface IRecomendeds {
  available: boolean;
  name: string;
  tld: ITld;
}

interface IProps {
  recomendeds: IRecomendeds[];
  toggleSelectedDomains: (domain: any) => void;
  selectedDomains: IRecomendeds[];
  currencies: RootState['currencies'];
  changePeriods: ({
    domain,
    period,
  }: {
    domain: string;
    period: string;
  }) => void;
}

interface IState {
  period: string;
}

class RecommendedDomains extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      period: '1',
    };
  }

  onChangePeriod(e, domain: string) {
    this.setState({ period: e.target.value });
    this.props.changePeriods({ domain: domain, period: e.target.value });
  }

  render() {
    return (
      <Row className={styles.recommendedDomain}>
        <Table responsive striped className={classNames(styles.table)}>
          <thead>
            <tr>
              <th>دامین</th>
              <th>وضعیت</th>
              <th>تعرفه ها</th>
            </tr>
          </thead>

          <tbody>
            {this.props.recomendeds.map((recommended) => (
              <tr key={recommended.tld.id}>
                <td className="ltr">
                  {recommended.name}.{recommended.tld.tld}
                </td>
                <td>
                  <Form.Group>
                    <label>
                      {recommended.available && (
                        <input
                          name={`domains[${recommended.name}.${recommended.tld.tld}]`}
                          defaultValue={`${recommended.name}.${recommended.tld.tld}`}
                          type="checkbox"
                          onChange={() =>
                            this.props.toggleSelectedDomains(recommended)
                          }
                          checked={this.props.selectedDomains.some(
                            (domain) => domain.tld.tld === recommended.tld.tld
                          )}
                        />
                      )}

                      {recommended.available ? (
                        <span className={styles.jGreen}>
                          موجود است! هم اکنون سفارش دهید
                        </span>
                      ) : (
                        <span className={styles.jRed}>موجود نیست</span>
                      )}
                    </label>
                  </Form.Group>
                </td>

                <td>
                  {recommended.available && (
                    <Form.Group>
                      <Form.Control
                        as="select"
                        custom
                        onChange={(e) =>
                          this.onChangePeriod(
                            e,
                            `${recommended.name}.${recommended.tld.tld}`
                          )
                        }
                        // value={this.state.period}
                      >
                        {recommended.tld.tld === 'ir' ? (
                          <React.Fragment>
                            <option value="1">
                              1 ساله قیمت{' '}
                              {formatPriceWithCurrency(
                                this.props.currencies,
                                recommended.tld.currency,
                                recommended.tld.new
                              )}
                            </option>
                            <option value="5">
                              5 ساله قیمت{' '}
                              {formatPriceWithCurrency(
                                this.props.currencies,
                                recommended.tld.currency,
                                recommended.tld.new * 5
                              )}
                            </option>
                          </React.Fragment>
                        ) : (
                          Array(5)
                            .fill('')
                            .map((_, index) => (
                              <option value={index + 1}>
                                {index + 1} ساله قیمت{' '}
                                {formatPriceWithCurrency(
                                  this.props.currencies,
                                  recommended.tld.currency,
                                  recommended.tld.new * (index + 1)
                                )}
                              </option>
                            ))
                        )}
                      </Form.Control>
                    </Form.Group>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
    );
  }
}

export default connect((state: RootState) => {
  return {
    currencies: state.currencies,
  };
})(RecommendedDomains);

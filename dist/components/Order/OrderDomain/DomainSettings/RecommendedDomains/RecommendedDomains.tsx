import classNames from 'classnames';
import * as React from 'react';
import { Form, Row, Table } from 'react-bootstrap';
import { ITld } from '../../../../../pages/_app';
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
}

interface IState {}

class RecommendedDomains extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
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
                      <Form.Control as="select" custom>
                        <option value="">1 ساله قیمت 291,400 تومان</option>
                        {/* {recommended.tariffs.map((tariff) => (
                          <option value={tariff.id} key={tariff.id}>
                            {tariff.value}
                          </option>
                        ))} */}
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

export default RecommendedDomains;

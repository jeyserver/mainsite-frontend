import * as React from 'react';
import { Button } from 'react-bootstrap';
import { Col, Nav, Tab, Table } from 'react-bootstrap';
import Link from 'next/link';
import styles from './DomainTypes.module.scss';
import { ITld } from '../../../pages/_app';
import { IOptions } from '../../../pages/domain';
import { connect } from 'react-redux';
import { RootState } from '../../../store';
import formatPriceWithCurrency from '../../../helper/formatPriceWithCurrency';

interface IProps {
  tlds: ITld[];
  commercialDomains: string[];
  options: IOptions;
  currencies: RootState['currencies'];
}

class DomainTypes extends React.Component<IProps> {
  getDomains(
    type:
      | 'commercial-domains'
      | 'cheap-domains'
      | 'national-domains'
      | 'service-domains'
      | 'country-domains'
  ): ITld[] {
    switch (type) {
      case 'commercial-domains':
        return this.props.tlds.filter((domain) =>
          this.props.commercialDomains.some((i) => i === domain.tld)
        );
      case 'cheap-domains':
        return this.props.tlds.filter(
          (domain) => domain.new < this.props.options.cheep_border
        );
      case 'national-domains':
        return [this.props.tlds.find((domain) => domain.tld === 'ir')];
      case 'service-domains':
        return this.props.tlds.filter((domain) => domain.tld.length > 2);
      case 'country-domains':
        return this.props.tlds.filter((domain) => domain.tld.length === 2);
      default:
        return [];
    }
  }

  render() {
    return (
      <Col xs={12} lg={8} className={styles.domainsTypes}>
        <Tab.Container defaultActiveKey="commercial-domains">
          {/* Nav tabs */}
          <Nav className={styles.domainNav}>
            <Nav.Item>
              <Nav.Link eventKey="commercial-domains">
                <span>دامنه های تجاری</span>
                <i className="fa fa-chevron-down" aria-hidden="true" />
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link eventKey="cheap-domains">
                <span>دامنه های ارزان قیمت</span>
                <i className="fa fa-chevron-down" aria-hidden="true" />
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link eventKey="national-domains">
                <span>دامنه های ملی</span>
                <i className="fa fa-chevron-down" aria-hidden="true" />
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link eventKey="service-domains">
                <span>دامنه های خدماتی</span>
                <i className="fa fa-chevron-down" aria-hidden="true" />
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link eventKey="country-domains">
                <span>دامنه های کشوری</span>
                <i className="fa fa-chevron-down" aria-hidden="true" />
              </Nav.Link>
            </Nav.Item>
          </Nav>
          {/* Tab panes */}
          <Tab.Content>
            {[
              'commercial-domains',
              'cheap-domains',
              'national-domains',
              'service-domains',
              'country-domains',
            ].map((domain: any, index) => (
              <Tab.Pane eventKey={domain} key={domain}>
                <Table responsive bordered className={styles.domainTable}>
                  <thead>
                    <tr>
                      <th>پسوند</th>
                      <th>هزینه ثبت</th>
                      <th>هزینه تمدید</th>
                      <th>هزینه انتقال</th>
                      <th>سفارش</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.getDomains(domain).map((domain) => (
                      <tr key={domain.id}>
                        <td>{domain.tld}</td>
                        <td>
                          {domain.new ? (
                            formatPriceWithCurrency(
                              this.props.currencies.items,
                              domain.currency,
                              domain.new
                            )
                          ) : (
                            <i className="fas fa-times"></i>
                          )}
                        </td>
                        <td>
                          {domain.renew ? (
                            formatPriceWithCurrency(
                              this.props.currencies.items,
                              domain.currency,
                              domain.renew
                            )
                          ) : (
                            <i className="fas fa-times"></i>
                          )}
                        </td>
                        <td>
                          {domain.transfer ? (
                            formatPriceWithCurrency(
                              this.props.currencies.items,
                              domain.currency,
                              domain.transfer
                            )
                          ) : (
                            <i className="fas fa-times"></i>
                          )}
                        </td>
                        <td>
                          <Link href={`/order/domain/${domain.tld}`}>

                            <Button className={styles.orderBtn}>سفارش</Button>

                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Tab.Pane>
            ))}
          </Tab.Content>
        </Tab.Container>
      </Col>
    );
  }
}

export default connect((state: RootState) => {
  return {
    currencies: state.currencies,
  };
})(DomainTypes);

import * as React from 'react';
import { Button } from 'react-bootstrap';
import { Col, Nav, Tab, Table } from 'react-bootstrap';
import Link from 'next/link';
import styles from './DomainTypes.module.scss';

type items = {
  id: number;
  tld: string;
  new: number;
  renew: number;
  transfer: number;
}[];

export interface DomainTypesProps {
  domainsData: {
    status: boolean;
    items: items;
  };
  famousAndTrendyDomains: string[];
}

export interface DomainTypesState {}

class DomainTypes extends React.Component<DomainTypesProps, DomainTypesState> {
  constructor(props: DomainTypesProps) {
    super(props);
    this.state = {};
  }

  getDomains(
    type:
      | 'commercial-domains'
      | 'cheap-domains'
      | 'national-domains'
      | 'service-domains'
      | 'country-domains'
  ): items {
    switch (type) {
      case 'commercial-domains':
        return this.props.domainsData.items.filter((domain) =>
          this.props.famousAndTrendyDomains.some((i) => i === domain.tld)
        );
      case 'cheap-domains':
        return this.props.domainsData.items.filter(
          (domain) => domain.new < 15000
        );
      case 'national-domains':
        return [
          this.props.domainsData.items.find((domain) => domain.tld === 'ir'),
        ];
      case 'service-domains':
        return this.props.domainsData.items.filter(
          (domain) => domain.tld.length > 2
        );
      case 'country-domains':
        return this.props.domainsData.items.filter(
          (domain) => domain.tld.length === 2
        );
      default:
        return [];
    }
  }

  addCommas(num: number) {
    let str = num.toString().split('.');
    if (str[0].length >= 5) {
      str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    if (str[1] && str[1].length >= 5) {
      str[1] = str[1].replace(/(\d{3})/g, '$1 ');
    }
    return str.join('.');
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
                        <td>{this.addCommas(domain.new)} تومان</td>
                        <td>{this.addCommas(domain.renew)} تومان</td>
                        <td>
                          {domain.transfer ? (
                            this.addCommas(domain.transfer) + ' تومان'
                          ) : (
                            <i className="fas fa-times"></i>
                          )}
                        </td>
                        <td>
                          <Link href={`/order/domain/${domain.tld}`}>
                            <a>
                              <Button className={styles.orderBtn}>سفارش</Button>
                            </a>
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

export default DomainTypes;

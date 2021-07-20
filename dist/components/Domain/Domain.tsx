import * as React from 'react';
import DomainHeader from './DomainHeader/DomainHeader';
import DomainTypes from './DomainTypes/DomainTypes';
import DomainOrderTable from './DomainOrderTable/DomainOrderTable';
import DomainService from './DomainService/DomainService';
import DomainFaq from './DomainFaq/DomainFaq';
import DomainBlog from './DomainBlog/DomainBlog';
import { Container, Row } from 'react-bootstrap';
import styles from './Domain.module.scss';

export interface DomainProps {
  domainsData: {
    status: boolean;
    items: {
      id: number;
      tld: string;
      new: number;
      renew: number;
      transfer: number;
    }[];
  };
  famousAndTrendyDomains: string[];
  roundDomains: any;
  domainPosts: any;
  service: any;
}

export interface DomainState {}

class Domain extends React.Component<DomainProps, DomainState> {
  constructor(props: DomainProps) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <React.Fragment>
        <DomainHeader domainsData={this.props.domainsData} />
        <section className={styles.domainsSection}>
          <Container className="mt-5" fluid="md">
            <Row>
              <DomainTypes
                domainsData={this.props.domainsData}
                famousAndTrendyDomains={this.props.famousAndTrendyDomains}
              />
              <DomainOrderTable roundDomains={this.props.roundDomains} />
            </Row>
          </Container>
        </section>
        <DomainService
          domainsData={this.props.domainsData}
          service={this.props.service}
        />
        <DomainFaq />
        <DomainBlog domainPosts={this.props.domainPosts} />
      </React.Fragment>
    );
  }
}

export default Domain;

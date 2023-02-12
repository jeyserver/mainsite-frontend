import * as React from 'react';
import DomainHeader from './DomainHeader/DomainHeader';
import DomainTypes from './DomainTypes/DomainTypes';
import DomainOrderTable from './DomainOrderTable/DomainOrderTable';
import DomainService from './DomainService/DomainService';
import DomainFaq from './DomainFaq/DomainFaq';
import DomainBlog from './DomainBlog/DomainBlog';
import { Container, Row } from 'react-bootstrap';
import styles from './Domain.module.scss';
import { IOptions, IPost, IRoundDomain } from '../../pages/domain';
import { ITld } from '../../pages/_app';

interface IProps {
  tlds: ITld[];
  roundDomains: IRoundDomain[];
  totalDomainRegistered: number;
  options: IOptions;
  posts: IPost[];
  commercialDomains: string[];
}

class Domain extends React.Component<IProps> {
  render() {
    return (
      <React.Fragment>
        <DomainHeader tlds={this.props.tlds} />

        <section className={styles.domainsSection}>
          <Container className="mt-5" fluid="md">
            <Row>
              <DomainTypes
                tlds={this.props.tlds}
                commercialDomains={this.props.commercialDomains}
                options={this.props.options}
              />
              <DomainOrderTable roundDomains={this.props.roundDomains} />
            </Row>
          </Container>
        </section>

        <DomainService
          totalDomainRegistered={this.props.totalDomainRegistered}
          supportedTlds={this.props.tlds.length}
          options={this.props.options}
        />

        <DomainFaq />

        <DomainBlog posts={this.props.posts} />
      </React.Fragment>
    );
  }
}

export default Domain;

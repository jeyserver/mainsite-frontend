import * as React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SharedHostingTable from './SharedHostingTable/SharedHostingTable';
import PagesHeader from '../../PagesHeader/PagesHeader';
import Facilities from '../Facilities/Facilities';
import HostFaq from '../HostFaq/HostFaq';

export interface SharedHostingProps {
  sharedHosts: any;
}

export interface SharedHostingState {}

class SharedHosting extends React.Component<
  SharedHostingProps,
  SharedHostingState
> {
  constructor(props: SharedHostingProps) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <section>
        <PagesHeader title="سرور مجازی" />
        <Container>
          <Row>
            <Col>
              {this.props.sharedHosts.map((panels, index) => (
                <SharedHostingTable
                  type="linux_standard"
                  data={panels}
                  key={index}
                />
              ))}
            </Col>
          </Row>
          <Facilities />
          <HostFaq />
        </Container>
      </section>
    );
  }
}

export default SharedHosting;

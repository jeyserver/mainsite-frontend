import * as React from 'react';
import { Container, Row } from 'react-bootstrap';
import { IServices } from '../../pages';
import Features from './Features/Features';
import Services from './Services/Services';
import Tables from './Tabels/Tables';
import Cloud from './Cloud';

interface IProps {
  tablesData: IServices;
}

class MainPage extends React.Component<IProps> {
  render() {
    return (
      <section>
        <Container fluid="md">
          <Cloud plans={this.props.tablesData.servers.vps} />
        </Container>
        <Container fluid>
          <Row>
            <Features />
          </Row>
        </Container>
        <Container fluid="md">
          <Tables tablesData={this.props.tablesData} />
        </Container>
        <Container fluid>
          <Row>
            <Services />
          </Row>
        </Container>
      </section>
    );
  }
}

export default MainPage;

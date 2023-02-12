import * as React from 'react';
import { Container, Row } from 'react-bootstrap';
import { ITablesData } from '../../pages';
import Features from './Features/Features';
import Services from './Services/Services';
import Tables from './Tabels/Tables';

interface MainPageProps {
  tablesData: ITablesData;
}

class MainPage extends React.Component<MainPageProps> {
  render() {
    return (
      <section>
        <Container fluid="md">
          <Tables tablesData={this.props.tablesData} />
        </Container>
        <Container fluid>
          <Row>
            <Features />
          </Row>
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

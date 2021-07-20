import * as React from 'react';
import { Container, Row } from 'react-bootstrap';
import Features from './Features/Features';
import Services from './Services/Services';
import Tables from './Tabels/Tables';

export interface MainPageProps {
  tablesData: any;
}

export interface MainPageState {}

class MainPage extends React.Component<MainPageProps, MainPageState> {
  constructor(props: MainPageProps) {
    super(props);
    this.state = {};
  }

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

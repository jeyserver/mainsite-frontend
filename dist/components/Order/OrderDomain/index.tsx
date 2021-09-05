import * as React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ITld } from '../../../pages/_app';
import PagesHeader from '../../PagesHeader/PagesHeader';
import { renderPageTitle, renderStep } from './helper';
import OrderSteps from './OrderSteps';
import styles from './style.module.scss';

export type step =
  | 'settings'
  | 'confirmation'
  | 'configuration'
  | 'complete-order';

interface IProps {
  step: step;
  data: {
    tlds: ITld[];
    transferOption: boolean;
    cheepBorder: number;
    commercialDomains: string[];
    tldFromQuery?: string;
    orderHost?: boolean;
  };
}

class OrderDomain extends React.Component<IProps> {
  render() {
    return (
      <section>
        <PagesHeader title={renderPageTitle(this.props.step)} />

        <div className={styles.mainContent}>
          <Container>
            <Row>
              <Col md={3}>
                <OrderSteps step={this.props.step} />
              </Col>
              <Col md={9}>{renderStep(this.props.step, this.props.data)}</Col>
            </Row>
          </Container>
        </div>
      </section>
    );
  }
}

export default OrderDomain;

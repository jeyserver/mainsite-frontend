import * as React from 'react';
import { Col, Tab, Row, Nav } from 'react-bootstrap';
import SharedHostingTable from '../../Tables/SharedHostingTable/SharedHostingTable';
import styles from './Tables.module.scss';
import ServerDedicatedTab from './ServerDedicatedTab/ServerDedicatedTab';
import { IServices } from '../../../pages';

interface IProps {
  tablesData: IServices;
}

class Tables extends React.Component<IProps> {

  render() {
    return (
      <div>
        <Tab.Container defaultActiveKey="tab-hosting-linux">
          <Row as={Nav} className={styles.nav}>
            <Col xs={6}>
              <Nav.Link eventKey="tab-hosting-linux">
                <div className={styles.navText}>هاست لینوکس</div>
                <img
                  width={100}
                  height={100}
                  alt="هاست لینوکس"
                  src="/images/tab-hosting-linux.png"
                />
              </Nav.Link>
            </Col>

            <Col xs={6}>
              <Nav.Link eventKey="tab-server-dedicated">
                <div className={styles.navText}>سرور اختصاصی</div>
                <img
                  width={100}
                  height={100}
                  alt="سرور اختصاصی"
                  src="/images/tab-server-dedicated.png"
                />
              </Nav.Link>
            </Col>
          </Row>

          <Tab.Content style={{ marginBottom: '5em' }}>
            <Tab.Pane eventKey="tab-hosting-linux">
              <SharedHostingTable
                data={this.props.tablesData.hosts.linux}
                type="linux"
                homePageTable={true}
              />
            </Tab.Pane>
            <Tab.Pane eventKey="tab-server-dedicated">
              <ServerDedicatedTab
                data={this.props.tablesData.servers.dedicated}
              />
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </div>
    );
  }
}

export default Tables;

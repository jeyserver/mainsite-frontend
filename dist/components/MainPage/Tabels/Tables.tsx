import * as React from 'react';
import { Col, Tab, Row, Nav } from 'react-bootstrap';
import Link from 'next/link';
import SharedHostingTab from './SharedHostingTab/SharedHostingTab';
import styles from './Tables.module.scss';
import VpsServerTab from './VpsServerTab/VpsServerTab';
import { Dropdown } from 'react-bootstrap';
import ServerDedicatedTab from './ServerDedicatedTab/ServerDedicatedTab';
import VpsNav from './VpsServerTab/VpsNav/VpsNav';

export interface TablesProps {
  tablesData: any;
}

export interface TablesState {}

class Tables extends React.Component<TablesProps, TablesState> {
  constructor(props: TablesProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Tab.Container defaultActiveKey="tab-server-vps">
          <Row as={Nav} className={styles.nav}>
            <Col xs={6} sm={3}>
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

            <Col xs={6} sm={3}>
              <Nav.Link eventKey="tab-hosting-windows">
                <div className={styles.navText}>هاست ویندوز</div>
                <img
                  width={100}
                  height={100}
                  alt="هاست ویندوز"
                  src="/images/tab-hosting-windows.png"
                />
              </Nav.Link>
            </Col>

            <Col xs={6} sm={3}>
              <Nav.Link
                eventKey="tab-server-vps"
                className={styles.serverVpsNavItem}
              >
                <div className={styles.navText}>سرور مجازی</div>
                <img
                  width={100}
                  height={100}
                  alt="سرور مجازی"
                  src="/images/tab-server-vps.png"
                />
              </Nav.Link>
            </Col>

            <Col xs={6} sm={3}>
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
              <SharedHostingTab
                data={this.props.tablesData.linuxHosts[0]}
                type="linux"
              />
            </Tab.Pane>
            <Tab.Pane eventKey="tab-hosting-windows">
              <SharedHostingTab
                data={this.props.tablesData.linuxHosts[0]}
                type="windows"
                isOrderBtnHidden={true}
              />
            </Tab.Pane>
            <Tab.Pane eventKey="tab-server-vps">
              <VpsNav data={this.props.tablesData.vps.navData} />
              {this.props.tablesData.vps.tableData.map((data) => (
                <VpsServerTab data={data} type={data.type} />
              ))}
            </Tab.Pane>
            <Tab.Pane eventKey="tab-server-dedicated">
              <ServerDedicatedTab
                data={this.props.tablesData.dedicatedServers[0]}
              />
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </div>
    );
  }
}

export default Tables;

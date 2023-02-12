import * as React from 'react';
import { Col, Tab, Row, Nav } from 'react-bootstrap';
import SharedHostingTable from '../../Tables/SharedHostingTable/SharedHostingTable';
import styles from './Tables.module.scss';
import VpsServerTable from '../../Tables/VpsServerTable/VpsServerTable';
import ServerDedicatedTab from './ServerDedicatedTab/ServerDedicatedTab';
import VpsNav from './VpsNav/VpsNav';
import { ITablesData } from '../../../pages';
import { IVPSPlan } from '../../../helper/types/products/VPS/plan';

interface IProps {
  tablesData: ITablesData;
}

class Tables extends React.Component<IProps> {
  render() {
    const vpsPlans = this.props.tablesData.servers.vps.reduce(
      (accumulator, currentValue) => {
        if (accumulator && accumulator[currentValue.country.name]) {
          accumulator[currentValue.country.name] = [
            ...accumulator[currentValue.country.name],
            currentValue,
          ];
        } else {
          accumulator[currentValue.country.name] = [currentValue];
        }

        return accumulator;
      },
      {}
    );

    return (
      <div>
        <Tab.Container defaultActiveKey="tab-server-vps">
          <Row as={Nav} className={styles.nav}>
            <Col xs={3}>
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

            <Col xs={3}>
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

            <Col xs={3}>
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

            <Col xs={3}>
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
            <Tab.Pane eventKey="tab-hosting-windows">
              <SharedHostingTable
                data={this.props.tablesData.hosts.windows}
                type="windows"
                homePageTable={true}
              />
            </Tab.Pane>
            <Tab.Pane eventKey="tab-server-vps">
              <VpsNav />
              {Object.values(vpsPlans).map((data: IVPSPlan[], index) => (
                <VpsServerTable data={data} key={index} homePageTable={true} />
              ))}
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

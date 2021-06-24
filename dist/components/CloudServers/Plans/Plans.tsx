import * as React from 'react';
import { Container, Col, Row, Nav, Tab } from 'react-bootstrap';
import Plan from '../Plan/Plan';
import styles from './Plans.module.scss';

export interface PlansProps {}

export interface PlansState {}

class Plans extends React.Component<PlansProps, PlansState> {
  constructor(props: PlansProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <section>
        <Container fluid className={styles.plans}>
          {/* Title */}
          <div className={styles.title} dir="rtl">
            <p>پلن های پیش فرض اقتصادی ترند</p>
            <p>
              اگر بسته به نیازتان به cpu اختصاصی احتیاج دارید پلن های پیشرفته تر
              را نیز مشاهده نمایید
            </p>
          </div>
          <div className={styles.plansContent}>
            <Tab.Container defaultActiveKey="defaultPlans">
              {/* Plans Menu */}
              <Nav className={styles.plansMenu} as="ul">
                <Nav.Item as="li" dir="rtl">
                  <Nav.Link eventKey="defaultPlans">پلن های پیشفرض</Nav.Link>
                </Nav.Item>
                <Nav.Item as="li" dir="rtl">
                  <Nav.Link eventKey="specialCpu">CPU اختصاصی</Nav.Link>
                </Nav.Item>
              </Nav>
              <Row>
                <Col>
                  <Tab.Content>
                    {/* Default Plans */}
                    <Tab.Pane eventKey="defaultPlans">
                      <Row dir="rtl">
                        <Col xl={1}></Col>
                        {Array(5)
                          .fill({
                            name: 'CX11',
                            monthly: '1,000,000',
                            hourly: '50,000',
                            cpu: 2,
                            ram: 2,
                            diskSpace: 40,
                            traffic: 20,
                            location:
                              '/images/cloud-servers/Country flags/France.png',
                          })
                          .map((plan, index) => (
                            <Plan
                              key={index}
                              name={plan.name}
                              monthly={plan.monthly}
                              hourly={plan.hourly}
                              cpu={plan.cpu}
                              ram={plan.ram}
                              diskSpace={plan.diskSpace}
                              traffic={plan.traffic}
                              location={plan.location}
                            />
                          ))}
                      </Row>
                    </Tab.Pane>
                    {/* Special Cpu */}
                    <Tab.Pane eventKey="specialCpu">
                      <Row dir="rtl">
                        <Col xl={1}></Col>

                        {Array(5)
                          .fill({
                            name: 'CX11',
                            monthly: '1,000,000',
                            hourly: '50,000',
                            cpu: 4,
                            ram: 2,
                            diskSpace: 40,
                            traffic: 20,
                            location:
                              '/images/cloud-servers/Country flags/France.png',
                          })
                          .map((plan, index) => (
                            <Plan
                              key={index}
                              name={plan.name}
                              monthly={plan.monthly}
                              hourly={plan.hourly}
                              cpu={plan.cpu}
                              ram={plan.ram}
                              diskSpace={plan.diskSpace}
                              traffic={plan.traffic}
                              location={plan.location}
                            />
                          ))}
                      </Row>
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </div>
        </Container>
      </section>
    );
  }
}

export default Plans;

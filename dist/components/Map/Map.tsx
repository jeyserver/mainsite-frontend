import * as React from 'react';
import { Accordion, Button, Card } from 'react-bootstrap';
import styles from './Map.module.scss';

export interface MapProps {}

export interface MapState {
  isMapOpen: boolean;
}

class Map extends React.Component<MapProps, MapState> {
  constructor(props: MapProps) {
    super(props);
    this.state = {
      isMapOpen: true,
    };
    this.toggleMap = this.toggleMap.bind(this);
  }

  toggleMap() {
    this.setState((prevState) => {
      return {
        isMapOpen: !prevState.isMapOpen,
      };
    });
  }

  render() {
    return (
      <div>
        <Accordion defaultActiveKey="0">
          <Card className={styles.mapAccordionCard}>
            <Card.Header className={styles.callToAction}>
              <Accordion.Toggle
                as={Button}
                variant="link"
                eventKey="0"
                className={styles.mapBlockBtn}
                onClick={() => this.toggleMap()}
              >
                <div className={styles.mapBlock}>
                  <div className={styles.mapTxt}>ما اینجا هستیم!</div>
                  <div className={styles.mapArrow}>
                    {this.state.isMapOpen ? (
                      <i className="fa fa-chevron-up"></i>
                    ) : (
                      <i className="fa fa-chevron-down"></i>
                    )}
                  </div>
                </div>
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body className={styles.mapContainerBody}>
                <div className={styles.mapContainer}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3357.1408949069337!2d51.65846731518039!3d32.70888358099266!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3fbc353824657c8b%3A0x8b8d863f6bed2059!2sJeyServer+Ltd.!5e0!3m2!1sen!2sde!4v1473845192355"
                    className={styles.map}
                  ></iframe>
                </div>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    );
  }
}

export default Map;

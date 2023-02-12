import * as React from 'react';
import { Accordion, Card } from 'react-bootstrap';
import styles from './JobTitles.module.scss';

export interface JobTitlesProps {
  jobs: any;
}

export interface JobTitlesState {}

class JobTitles extends React.Component<JobTitlesProps, JobTitlesState> {
  constructor(props: JobTitlesProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Accordion>
          {this.props.jobs.map((job, index) => (
            <Card key={job.title} className={styles.card}>
              <Accordion.Toggle
                as={Card.Header}
                className={styles.header}
                eventKey={job.title}
              >
                <span className={styles.title}>
                  <div dangerouslySetInnerHTML={{ __html: job.title }}></div>
                </span>
                <span className={styles.city}>
                  {job.city === '-' ? (
                    <>
                      <i className="fas fa-globe-asia"></i> دورکاری
                    </>
                  ) : (
                    <>
                      <i className="fas fa-map-marker-alt"></i> {job.city}
                    </>
                  )}
                </span>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey={job.title}>
                <Card.Body
                  className={styles.body}
                  dangerouslySetInnerHTML={{ __html: job.body }}
                ></Card.Body>
              </Accordion.Collapse>
            </Card>
          ))}
        </Accordion>
      </div>
    );
  }
}

export default JobTitles;

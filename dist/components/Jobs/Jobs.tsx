import * as React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import PagesHeader from '../PagesHeader/PagesHeader';
import styles from './Jobs.module.scss';
import Map from '../Map/Map';
import JobTitles from './JobTitles/JobTitles';
import InterviewApplicationForm from './InterviewApplicationForm/InterviewApplicationForm';

export interface JobsProps {
  jobs: any;
}

export interface JobsState {}

class Jobs extends React.Component<JobsProps, JobsState> {
  constructor(props: JobsProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <section>
        <PagesHeader title="فرصت های شغلی" />

        <div className={styles.mainContent}>
          <Container>
            <Row>
              <Col lg={6} className={styles.jobTitlesWrapper}>
                <div className={styles.tittle}>
                  <h5>شرح فرصت های شغلی</h5>
                  <div className={styles.divider}>
                    <div />
                  </div>
                </div>

                <JobTitles jobs={this.props.jobs} />
              </Col>
              <Col lg={6}>
                <Col xs={12}>
                  <div className={styles.tittle}>
                    <h5>شرایط کلی جی سرور</h5>
                    <div className={styles.divider}>
                      <div />
                    </div>
                  </div>

                  <ul className={styles.conditions}>
                    <li>
                      حضور فرد هر روزه بدون تاخیر در محل دفتر جی سرور الزامی
                      است.
                    </li>
                    <li>
                      میز و رایانه شخصی مخصوص هر کارمند متصل به اینترنت پرسرعت
                      فراهم است.
                    </li>
                    <li>
                      احترام متقابل لازم بین کارکنان و همینطور بین کارکنان و
                      مشتریان بسیار حائز اهمیت است
                    </li>
                    <li>رشد سطح مهارت های تخصصی در طول همکاری اجباری است.</li>
                  </ul>
                </Col>
                <Col>
                  <div className={styles.tittle}>
                    <h5>درخواست مصاحبه</h5>
                    <div className={styles.divider}>
                      <div />
                    </div>
                  </div>

                  <InterviewApplicationForm />
                </Col>
              </Col>
            </Row>
          </Container>
        </div>
        <Map />
      </section>
    );
  }
}

export default Jobs;

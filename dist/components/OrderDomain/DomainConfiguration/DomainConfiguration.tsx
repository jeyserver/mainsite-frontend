import { withRouter, NextRouter } from 'next/router';
import * as React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import DomainCard from './DomainCard/DomainCard';
import styles from './DomainConfiguration.module.scss';

export interface DomainConfigurationProps {
  data: any;
  state?: any;
  router: NextRouter;
}

export interface DomainConfigurationState {
  formValidated: boolean;
}

class DomainConfiguration extends React.Component<
  DomainConfigurationProps,
  DomainConfigurationState
> {
  constructor(props: DomainConfigurationProps) {
    super(props);
    this.state = {
      formValidated: false,
    };
  }

  submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      // Go to next step
    }

    this.setState({ formValidated: true });
  }

  componentDidUpdate() {
    if (this.props.state.orderedDomains.domains.length === 0) {
      this.props.router.push('/order/domain');
    }
  }

  render() {
    return (
      <div className={styles.domainConfiguration}>
        <h2 className={styles.title}>پیکره بندی دامنه</h2>

        <Form
          onSubmit={(e) => this.submitForm(e)}
          noValidate
          validated={this.state.formValidated}
        >
          {this.props.state &&
            this.props.state.orderedDomains.domains.map((domain) => (
              <DomainCard
                nationalDomain={this.props.data.nationalDomainsList.some(
                  (tld) => tld === domain.tld.tld
                )}
                transfer={domain.transfer}
                domain={domain}
                key={domain.tld.id}
              />
            ))}

          <Row className="justify-content-center">
            <Col xs={12} md={6}>
              <Button type="submit" className={styles.continueBtn}>
                ادامه
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { state };
};

export default connect(mapStateToProps)(withRouter(DomainConfiguration));

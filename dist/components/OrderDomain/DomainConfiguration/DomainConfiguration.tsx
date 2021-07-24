import axios from 'axios';
import { withRouter, NextRouter } from 'next/router';
import * as React from 'react';
import { Form, Row, Col, Button, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import DomainCard from './DomainCard/DomainCard';
import { NotificationManager } from 'react-notifications';
import styles from './DomainConfiguration.module.scss';

export interface DomainConfigurationProps {
  data: any;
  state?: any;
  router: NextRouter;
}

type error = 'data_validation' | 'data_duplicate';

export interface DomainConfigurationState {
  formValidated: boolean;
  errors: {
    type: string;
    code: error;
    input: string;
    error: error;
  }[];
  btnLoading: boolean;
}

class DomainConfiguration extends React.Component<
  DomainConfigurationProps,
  DomainConfigurationState
> {
  constructor(props: DomainConfigurationProps) {
    super(props);
    this.state = {
      formValidated: false,
      btnLoading: false,
      errors: [],
    };
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      this.setState({ btnLoading: true });

      axios(
        'https://jsonblob.com/api/jsonBlob/d3196d4f-e2e1-11eb-b284-d50b7a049077'
      )
        .then((res) => {
          // this.setState({ btnLoading: false });
          this.props.router.push('/order/cart/review');

          // if (res.data.status) {
          // } else if (!res.data.status) {
          //   res.data.error.forEach((errorItem) => {
          //     if (errorItem.input === 'name') {
          //       form.domainName.value = '';
          //       this.setState({ errorCode: errorItem.code });
          //     }
          //   });
          // }
        })
        .catch(() => {
          this.setState({ btnLoading: false });
          NotificationManager.error(
            'ارتباط با سامانه بدرستی انجام نشد، لطفا مجددا تلاش کنید.',
            'خطا'
          );
        });
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
                errors={this.state.errors}
              />
            ))}

          <Row className="justify-content-center">
            <Col xs={12} md={6}>
              <Button
                type="submit"
                className={styles.continueBtn}
                disabled={this.state.btnLoading}
              >
                {this.state.btnLoading ? (
                  <>
                    <Spinner animation="border" size="sm" />
                    <span>لطفا صبر کنید</span>
                  </>
                ) : (
                  'ادامه'
                )}
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

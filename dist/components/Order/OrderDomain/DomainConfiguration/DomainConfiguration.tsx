import { withRouter, NextRouter } from 'next/router';
import * as React from 'react';
import { Row, Col, Button, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import DomainCard from './DomainCard/DomainCard';
import styles from './DomainConfiguration.module.scss';
import { RootState } from '../../../../store';
import { Formik, Form, FormikHelpers } from 'formik';
import { NotificationManager } from 'react-notifications';
import backend from '../../../../axios-config';

interface IProps {
  data: any;
  state?: any;
  router: NextRouter;
  domain: RootState['domain'];
}

interface IInputs {
  products: {
    [id: string]: {
      panel: string;
      dns: string[];
    };
  };
}

class DomainConfiguration extends React.Component<IProps> {
  componentDidUpdate() {
    if (this.props.domain.forConfigure.length === 0) {
      this.props.router.push('/order/domain');
    }
  }

  onSubmit(values: IInputs, { setSubmitting }: FormikHelpers<IInputs>) {
    backend
      .post(
        `/order/domain/configure?ajax=1&products=${JSON.stringify(
          values.products
        )}`
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch(() => {
        NotificationManager.error(
          'ارتباط با سامانه بدرستی انجام نشد، لطفا مجددا تلاش کنید.',
          'خطا'
        );
      })
      .finally(() => {
        setSubmitting(false);
      });
  }

  getInputs() {
    let inputs = {};
    this.props.domain.forConfigure.map((domain) => {
      if (domain.tld.tld === 'ir') {
        inputs = {
          ...inputs,
          [domain.id]: {
            panel: '',
            dns: ['ns1.jeyserver.com', 'ns2.jeyserver.com', '', ''],
          },
        };
      } else {
        inputs = {
          ...inputs,
          [domain.id]: {
            dns: ['ns1.jeyserver.com', 'ns2.jeyserver.com', '', ''],
          },
        };
      }
    });
    return inputs;
  }

  render() {
    return (
      <div className={styles.domainConfiguration}>
        <h2 className={styles.title}>پیکره بندی دامنه</h2>

        <Formik
          initialValues={{ products: this.getInputs() }}
          onSubmit={(values, helpers) => this.onSubmit(values, helpers)}
        >
          {(formik) => (
            <Form>
              {this.props.domain.forConfigure.map((domain) => (
                <DomainCard
                  nationalDomain={domain.tld.tld === 'ir'}
                  transfer={domain.type === 'transfer'}
                  domain={domain}
                  key={domain.tld.id}
                />
              ))}

              <Row className="justify-content-center">
                <Col xs={12} md={6}>
                  <Button
                    type="submit"
                    className={styles.continueBtn}
                    disabled={formik.isSubmitting}
                  >
                    {formik.isSubmitting ? (
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
          )}
        </Formik>
      </div>
    );
  }
}

export default connect((state: RootState) => {
  return { domain: state.domain };
})(withRouter(DomainConfiguration));

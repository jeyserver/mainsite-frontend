import { withRouter, NextRouter } from 'next/router';
import * as React from 'react';
import { Row, Col, Button, Spinner, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import DomainCard from './DomainCard/DomainCard';
import styles from './DomainConfiguration.module.scss';
import { AsyncThunkAction, RootState } from '../../../../store';
import { Formik, FormikHelpers } from 'formik';
import { NotificationManager } from 'react-notifications';
import backend from '../../../../axios-config';
import showErrorMsg from '../../../../helper/showErrorMsg';
import { configureDomains, IConfigDomain } from '../../../../store/Domain';
import IError from '../../../../helper/types/base/error';

interface IProps {
  data: any;
  state?: any;
  router: NextRouter;
  domain: RootState['domain'];
  configureDomains: AsyncThunkAction<any, IConfigDomain>;
}

interface IInputs {
  products: {
    [id: string]: {
      panel: string;
      dns: string[];
    };
  };
}

interface IState {
  formIsSubmitting: boolean;
  formIsValidated: boolean;
  errors: IError[];
}

class DomainConfiguration extends React.Component<IProps, IState> {
  state = {
    formIsSubmitting: false,
    formIsValidated: false,
    errors: [],
  };

  componentDidUpdate() {
    if (this.props.domain.forConfigure.length === 0) {
      this.props.router.push('/order/domain');
    }
  }

  // async onSubmit(
  //   values: any,
  //   { setSubmitting, setErrors }: FormikHelpers<any>
  // ) {
  //   try {
  //     const res = await this.props.configureDomains(values).unwrap();
  //     if (res.data.status) {
  //       if (res.data.redirect) {
  //         this.props.router.push(res.data.redirect);
  //       }
  //     } else {
  //       if (res.data.error) {
  //         res.data.error.map((error) => {
  //           setErrors({ [error.input]: showErrorMsg(error.code) });
  //         });
  //       }
  //     }
  //   } catch (error) {
  //     NotificationManager.error(
  //       'ارتباط با سامانه بدرستی انجام نشد، لطفا مجددا تلاش کنید.',
  //       'خطا'
  //     );
  //   } finally {
  //     setSubmitting(false);
  //   }
  // }

  async onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    this.setState({ formIsSubmitting: true });

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      try {
        const inputs = Array.from(form.elements) as HTMLInputElement[];
        const values = inputs.reduce((prev, cur) => {
          if (cur.nodeName !== 'BUTTON') {
            return {
              ...prev,
              [cur.name]: cur.value,
            };
          }
          return prev;
        }, {});

        const res = await this.props.configureDomains(values).unwrap();
        if (res.data.status) {
          if (res.data.redirect) {
            this.props.router.push(res.data.redirect);
          }
        } else {
          if (res.data.error) {
            this.setState({ errors: res.data.error });
            res.data.error.map((error) => {
              form[error.input].value = '';
            });
          }

          this.setState({ formIsValidated: false });
        }
      } catch (error) {
        NotificationManager.error(
          'ارتباط با سامانه بدرستی انجام نشد، لطفا مجددا تلاش کنید.',
          'خطا'
        );
      }
    }

    this.setState({ formIsValidated: true, formIsSubmitting: false });
  }

  // getInputs(domains) {
  //   let inputs = {};
  //   domains.forEach((domain) => {
  //     if (domain.type === 'register') {
  //       if (domain.tld.tld === 'ir') {
  //         inputs = {
  //           ...inputs,
  //           [`products[${domain.id}][dns][1]`]: 'ns1.jeyserver.com',
  //           [`products[${domain.id}][dns][2]`]: 'ns2.jeyserver.com',
  //           [`products[${domain.id}][dns][3]`]: '',
  //           [`products[${domain.id}][dns][4]`]: '',
  //           [`products[${domain.id}][panel]`]: 'panel',
  //         };
  //       } else {
  //         inputs = {
  //           ...inputs,
  //           [`products[${domain.id}][dns][1]`]: 'ns1.jeyserver.com',
  //           [`products[${domain.id}][dns][2]`]: 'ns2.jeyserver.com',
  //           [`products[${domain.id}][dns][3]`]: '',
  //           [`products[${domain.id}][dns][4]`]: '',
  //         };
  //       }
  //     } else if (domain.type === 'transfer') {
  //       inputs = {
  //         ...inputs,
  //         [`products[${domain.id}][transfer_code]`]: '',
  //       };
  //     }
  //   });
  //   return inputs;
  // }

  render() {
    return (
      <div className={styles.domainConfiguration}>
        <h2 className={styles.title}>پیکره بندی دامنه</h2>

        <Form
          onSubmit={(e) => this.onSubmit(e)}
          validated={this.state.formIsValidated}
          noValidate
        >
          {this.props.domain.forConfigure.map((domain) => (
            <DomainCard
              nationalDomain={domain.tld.tld === 'ir'}
              transfer={domain.type === 'transfer'}
              domain={domain}
              errors={this.state.errors}
              key={domain.tld.id}
            />
          ))}

          <Row className="justify-content-center">
            <Col xs={12} md={6}>
              <Button
                type="submit"
                className={styles.continueBtn}
                disabled={this.state.formIsSubmitting}
              >
                {this.state.formIsSubmitting ? (
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

        {/* {this.props.domain.forConfigure.length > 0 && (
          <Formik
            initialValues={{
              ...this.getInputs(this.props.domain.forConfigure),
            }}
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
        )} */}
      </div>
    );
  }
}

export default connect(
  (state: RootState) => {
    return { domain: state.domain };
  },
  { configureDomains }
)(withRouter(DomainConfiguration));

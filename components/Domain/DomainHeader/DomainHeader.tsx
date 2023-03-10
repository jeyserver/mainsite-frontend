import { withRouter, NextRouter } from 'next/router';
import * as React from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  Spinner,
} from 'react-bootstrap';
import styles from './DomainHeader.module.scss';
import { connect } from 'react-redux';
import { ITld } from '../../../pages/_app';
import { setSelectedDomain } from '../../../store/Domain';

interface IProps {
  tlds: ITld[];
  router: NextRouter;
  setSelectedDomain: typeof setSelectedDomain;
}

interface IState {
  loading: boolean;
}

class DomainHeader extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { loading: false };
  }
  submitDomainForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    this.setState({ loading: true });

    this.props.setSelectedDomain({
      tld: form.tld.value,
      name: form.domainName.value,
    });

    this.props.router.push('/order/domain');
  }

  render() {
    return (
      <header>
        <div className={styles.view}>
          <img src="/images/domain/datacenter.jpg" />
          <div className={styles.mask}>
            <Container>
              <Row className={styles.maskRow}>
                <Col xs={12} lg={7}>
                  <div className={styles.formWrapper}>
                    <label htmlFor="domain" className="text-white h2">
                      همین حالا <span className={styles.textOrange}>دامنه</span>{' '}
                      مورد نظرتان را ثبت کنید
                    </label>
                    <Form
                      onSubmit={(e) => this.submitDomainForm(e)}
                      className={styles.form}
                      autoComplete="off"
                    >
                      <div>
                        <Form.Control
                          as="select"
                          id="domain"
                          name="tld"
                          custom
                          required
                        >
                          {this.props.tlds.map((domain) => (
                            <option value={domain.tld} key={domain.tld}>
                              .{domain.tld}
                            </option>
                          ))}
                        </Form.Control>
                        <InputGroup className={styles.inputGroup}>
                          <Form.Control
                            type="text"
                            name="domainName"
                            required
                            placeholder="Your Domain"
                          />
                          <InputGroup.Prepend>
                            <InputGroup.Text>www.</InputGroup.Text>
                          </InputGroup.Prepend>
                        </InputGroup>
                      </div>
                      <button type="submit" disabled={this.state.loading}>
                        {this.state.loading ? (
                          <Spinner size="sm" animation="border" />
                        ) : (
                          'جستجو'
                        )}
                      </button>
                    </Form>
                  </div>
                </Col>
                <Col xs={12} lg={5}>
                  <div className={styles.headerLeftImage}>
                    <img
                      src="/images/domain/domain.png"
                      className="img-fluid float-left"
                    />
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </header>
    );
  }
}

export default connect(null, { setSelectedDomain })(withRouter(DomainHeader));

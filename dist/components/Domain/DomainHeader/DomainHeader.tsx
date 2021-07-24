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
import { setDomainForShop } from '../../../redux/actions';
import { connect } from 'react-redux';
import axios from 'axios';

export interface DomainHeaderProps {
  domainsData: {
    status: boolean;
    items: {
      id: number;
      tld: string;
      new: number;
      renew: number;
      transfer: number;
    }[];
  };
  router: NextRouter;
  setDomainForShop: (user: { tld: string; name: string }) => void;
}

export interface DomainHeaderState {
  loading: boolean;
}

class DomainHeader extends React.Component<
  DomainHeaderProps,
  DomainHeaderState
> {
  constructor(props: DomainHeaderProps) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  submitDomainForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    this.setState({ loading: true });
    axios(
      'https://jsonblob.com/api/jsonBlob/d3196d4f-e2e1-11eb-b284-d50b7a049077'
    )
      .then(() => {
        this.props.setDomainForShop({
          tld: form.tld.value,
          name: form.domainName.value,
        });
      })
      .catch(() => {
        this.setState({ loading: false });
      });
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
                    >
                      <div>
                        <Form.Control
                          as="select"
                          id="domain"
                          name="tld"
                          custom
                          required
                        >
                          {this.props.domainsData.items.map((domain) => (
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

export default connect(null, { setDomainForShop })(withRouter(DomainHeader));

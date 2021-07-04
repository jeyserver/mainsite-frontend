import { withRouter, NextRouter } from 'next/router';
import * as React from 'react';
import { Container, Row, Col, Form, InputGroup } from 'react-bootstrap';
import styles from './DomainHeader.module.scss';
import { setDomainForShop } from '../../../redux/actions';
import { connect } from 'react-redux';

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

export interface DomainHeaderState {}

class DomainHeader extends React.Component<
  DomainHeaderProps,
  DomainHeaderState
> {
  constructor(props: DomainHeaderProps) {
    super(props);
    this.state = {};
  }

  submitDomainForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    this.props.setDomainForShop({
      tld: form.tld.value,
      name: form.domainName.value,
    });

    this.props.router.push('/');
  }

  render() {
    return (
      <header>
        <div className={styles.view}>
          <img src="/images/domain/datacenter.jpg" />
          <div className={styles.mask}>
            <Container>
              <Row>
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
                      <button type="submit">جستجو</button>
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

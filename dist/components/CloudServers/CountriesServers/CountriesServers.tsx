import * as React from 'react';
import { Dropdown, Image, Container, Button } from 'react-bootstrap';
import styles from './CountriesServers.module.scss';

export interface CountriesServersProps {}

export interface CountriesServersState {
  activeCountry: string;
}

class CountriesServers extends React.Component<
  CountriesServersProps,
  CountriesServersState
> {
  constructor(props: CountriesServersProps) {
    super(props);
    this.state = {
      activeCountry: 'german',
    };
    this.changeActiveCountry = this.changeActiveCountry.bind(this);
  }

  changeActiveCountry(countryName: string) {
    this.setState({ activeCountry: countryName });
  }

  render() {
    return (
      <Container
        as="section"
        id="plans"
        fluid="xl"
        className={styles.countryServer}
      >
        <Button
          data-active={this.state.activeCountry === 'german'}
          onClick={() => this.changeActiveCountry('german')}
          className={styles.serverLink}
        >
          <Image src="/images/cloud-servers/Country flags/german.png" alt="" />
          <span className={styles.text}>سرورهای مجازی آلمان</span>
        </Button>
        <Button
          data-active={this.state.activeCountry === 'france'}
          onClick={() => this.changeActiveCountry('france')}
          className={styles.serverLink}
        >
          <Image src="/images/cloud-servers/Country flags/France.png" alt="" />
          <span className={styles.text}>سرورهای مجازی فرانسه</span>
        </Button>
        <Button
          data-active={this.state.activeCountry === 'iran'}
          onClick={() => this.changeActiveCountry('iran')}
          className={styles.serverLink}
        >
          <Image src="/images/cloud-servers/Country flags/iran.png" alt="" />
          <span className={styles.text}>سرورهای مجازی ایران</span>
        </Button>
        <Dropdown style={{ padding: '0' }} className={styles.serverLink}>
          <Dropdown.Toggle
            className={`${styles.serverLink} ${styles.dropdownToggle}`}
            as="div"
            style={{
              width: '100%',
            }}
          >
            <Image src="/images/cloud-servers/Country flags/other.png" alt="" />
            <span className={styles.text}>سایر کشورها</span>
            <span className={styles.icon}>
              <i className="fas fa-angle-down fa-lg"></i>
            </span>
          </Dropdown.Toggle>

          <Dropdown.Menu className={styles.dropdownMenu}>
            <Dropdown.Item
              eventKey="1"
              data-active={this.state.activeCountry === 'finland'}
              onClick={() => this.changeActiveCountry('finland')}
              className={`${styles.serverLink} ${styles.dropdownLinksBtn}`}
            >
              <span className={styles.imgWrapper}>
                <Image
                  src="/images/cloud-servers/Country flags/finland.png"
                  alt=""
                />
              </span>
              <span className={styles.text}>پلن های فنلاند</span>
            </Dropdown.Item>
            <Dropdown.Item
              eventKey="2"
              data-active={this.state.activeCountry === 'netherland'}
              onClick={() => this.changeActiveCountry('netherland')}
              className={`${styles.serverLink} ${styles.dropdownLinksBtn}`}
            >
              <span className={styles.imgWrapper}>
                <Image
                  src="/images/cloud-servers/Country flags/netherland.png"
                  alt=""
                />
              </span>
              <span className={styles.text}>پلن های هلند</span>
            </Dropdown.Item>
            <Dropdown.Item
              eventKey="3"
              data-active={this.state.activeCountry === 'america'}
              onClick={() => this.changeActiveCountry('america')}
              className={`${styles.serverLink} ${styles.dropdownLinksBtn}`}
            >
              <span className={styles.imgWrapper}>
                <Image
                  src="/images/cloud-servers/Country flags/america.png"
                  alt=""
                />
              </span>
              <span className={styles.text}>پلن های آمریکا</span>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    );
  }
}

export default CountriesServers;

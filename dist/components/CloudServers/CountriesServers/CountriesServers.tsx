import * as React from 'react';
import { Dropdown, Image, Container, Button } from 'react-bootstrap';
import styles from './CountriesServers.module.scss';

export interface CountriesServersProps {
  countries: any;
}

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
      activeCountry: this.props.countries[0].title_en,
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
        {this.props.countries.map((country, index) => {
          if (index < 3) {
            return (
              <Button
                key={index}
                data-active={this.state.activeCountry === country.title_en}
                onClick={() => this.changeActiveCountry(country.title_en)}
                className={styles.serverLink}
              >
                <Image src={country.img} alt="" />
                <span className={styles.text}>
                  سرورهای مجازی {country.title_fa}
                </span>
              </Button>
            );
          }
        })}
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
            {this.props.countries.map((country, index) => {
              if (index > 3) {
                return (
                  <Dropdown.Item
                    eventKey={index}
                    key={index}
                    data-active={this.state.activeCountry === country.title_en}
                    onClick={() => this.changeActiveCountry(country.title_en)}
                    className={`${styles.serverLink} ${styles.dropdownLinksBtn}`}
                  >
                    <span className={styles.imgWrapper}>
                      <Image src={country.img} alt="" />
                    </span>
                    <span className={styles.text}>
                      پلن های {country.title_fa}
                    </span>
                  </Dropdown.Item>
                );
              }
            })}
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    );
  }
}

export default CountriesServers;

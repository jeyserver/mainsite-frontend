import * as React from 'react';
import { Dropdown, Image, Container, Button } from 'react-bootstrap';
import Link from 'next/link';
import styles from './CountriesServers.module.scss';
import { NextRouter, withRouter } from 'next/router';

export interface CountriesServersProps {
  countries: any;
  country: string;
  router: NextRouter;
}

export interface CountriesServersState {}

class CountriesServers extends React.Component<
  CountriesServersProps,
  CountriesServersState
> {
  constructor(props: CountriesServersProps) {
    super(props);
    this.state = {};
  }

  closeDropDown() {
    document.querySelector('body').click();
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
              <Link
                key={index}
                scroll={false}
                href={`/cloud-servers/${country.title_en}`}
              >
                <a
                  data-active={
                    this.props.country === country.title_en ||
                    (country.title_en === this.props.countries[0].title_en &&
                      this.props.country === undefined)
                  }
                  className={styles.serverLink}
                >
                  <Image src={country.img} alt="" />
                  <span className={styles.text}>
                    سرورهای مجازی {country.title_fa}
                  </span>
                </a>
              </Link>
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
                  <Link
                    key={index}
                    scroll={false}
                    href={`/cloud-servers/${country.title_en}`}
                  >
                    <a
                      data-active={this.props.country === country.title_en}
                      className={`${styles.serverLink} ${styles.dropdownLinksBtn}`}
                      onClick={this.closeDropDown}
                    >
                      <span className={styles.imgWrapper}>
                        <Image src={country.img} alt="" />
                      </span>
                      <span className={styles.text}>
                        پلن های {country.title_fa}
                      </span>
                    </a>
                  </Link>
                );
              }
            })}
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    );
  }
}

export default withRouter(CountriesServers);

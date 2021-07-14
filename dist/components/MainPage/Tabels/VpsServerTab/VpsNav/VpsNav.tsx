import * as React from 'react';
import { Container, Row, Col, Dropdown } from 'react-bootstrap';
import Link from 'next/link';
import styles from './VpsNav.module.scss';

export interface VpsNavProps {
  data: any;
}

export interface VpsNavState {}

class VpsNav extends React.Component<VpsNavProps, VpsNavState> {
  constructor(props: VpsNavProps) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Row className="justify-content-center">
        <Col md={10}>
          <ul className={styles.vpsNav}>
            {this.props.data.professionals.map((item) => (
              <li key={item.country_name_en}>
                <Link
                  href={`/server/vps/professional#server_vps_professional_${item.country_name_en}`}
                >
                  <a>سرور مجازی حرفه ای {item.country_name_fa}</a>
                </Link>
              </li>
            ))}
            {this.props.data.economics.map((item) => (
              <li key={item.country_name_en}>
                <Link
                  href={`/server/vps/professional#server_vps_economic_${item.country_name_en}`}
                >
                  <a>سرور مجازی اقتصادی {item.country_name_fa}</a>
                </Link>
              </li>
            ))}
            {this.props.data.storages.map((item) => (
              <li key={item.country_name_en}>
                <Link
                  href={`/server/vps/professional#server_vps_storage_${item.country_name_en}`}
                >
                  <a>سرور مجازی حجیم {item.country_name_fa}</a>
                </Link>
              </li>
            ))}
          </ul>

          <ul className={styles.vpsNavOnMobile}>
            <li>
              <Dropdown>
                <Dropdown.Toggle className={styles.dropdownToggle}>
                  سرور مجازی حرفه‌ای
                </Dropdown.Toggle>

                <Dropdown.Menu className={styles.dropdownMenu}>
                  {this.props.data.professionals.map((item) => (
                    <Link
                      key={item.country_name_en}
                      href={`/server/vps/professional#server_vps_professional_${item.country_name_en}`}
                    >
                      <a>سرور مجازی حرفه ای {item.country_name_fa}</a>
                    </Link>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </li>

            <li>
              <Dropdown>
                <Dropdown.Toggle className={styles.dropdownToggle}>
                  سرور مجازی اقتصادی
                </Dropdown.Toggle>

                <Dropdown.Menu className={styles.dropdownMenu}>
                  {this.props.data.economics.map((item) => (
                    <Link
                      key={item.country_name_en}
                      href={`/server/vps/professional#server_vps_professional_${item.country_name_en}`}
                    >
                      <a>سرور مجازی اقتصادی {item.country_name_fa}</a>
                    </Link>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </li>
            {this.props.data.storages.map((item) => (
              <li key={item.country_name_en}>
                <Link
                  href={`/server/vps/professional#server_vps_storage_${item.country_name_en}`}
                >
                  <a>سرور مجازی حجیم {item.country_name_fa}</a>
                </Link>
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    );
  }
}

export default VpsNav;

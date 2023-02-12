import * as React from 'react';
import { Row, Col, Dropdown } from 'react-bootstrap';
import Link from 'next/link';
import styles from './VpsNav.module.scss';
import vpsesWithCountries from '../../../../lib/products/vps';

const tarnslateType = (type) => {
  switch (type) {
    case 'professional':
      return 'حرفه ای';
    case 'economic':
      return 'اقتصادی';
    case 'storage':
      return 'حجیم';
    default:
      return '';
  }
};

class VpsNav extends React.Component {
  render() {
    return (
      <Row className="justify-content-center">
        <Col md={10}>
          <ul className={styles.vpsNav}>
            {Object.keys(vpsesWithCountries).map((type) => {
              return vpsesWithCountries[type].map((country) => (
                <li key={country.name_en}>
                  <Link
                    href={`/server/vps/${type}#server_vps_${type}_${country.name_en}`}
                  >
                    <a>
                      سرور مجازی {tarnslateType(type)} {country.name_fa}
                    </a>
                  </Link>
                </li>
              ));
            })}
          </ul>

          <ul className={styles.vpsNavOnMobile}>
            <li>
              <Dropdown>
                <Dropdown.Toggle className={styles.dropdownToggle}>
                  سرور مجازی حرفه‌ای
                </Dropdown.Toggle>

                <Dropdown.Menu className={styles.dropdownMenu}>
                  {vpsesWithCountries.professional.map((country) => (
                    <Link
                      key={country.name_en}
                      href={`/server/vps/professional#server_vps_professional_${country.name_en}`}
                    >
                      <a>سرور مجازی حرفه ای {country.name_fa}</a>
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
                  {vpsesWithCountries.economic.map((country) => (
                    <Link
                      key={country.name_en}
                      href={`/server/vps/professional#server_vps_professional_${country.name_en}`}
                    >
                      <a>سرور مجازی اقتصادی {country.name_fa}</a>
                    </Link>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </li>

            {vpsesWithCountries.storage.map((country) => (
              <li key={country.name_fa}>
                <Link
                  href={`/server/vps/professional#server_vps_storage_${country.name_en}`}
                >
                  <a>سرور مجازی حجیم {country.name_fa}</a>
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

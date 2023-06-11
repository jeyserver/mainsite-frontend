import * as React from 'react';
import { Row, Col, Dropdown } from 'react-bootstrap';
import Link from 'next/link';
import styles from './VpsNav.module.scss';
import vpsesWithCountries from '../../../../lib/products/vps';
import 'flag-icon-css/css/flag-icon.min.css';
import classNames from 'classnames';


class VpsNav extends React.Component {
  render() {
    return (
      <Row className="justify-content-center">
        <Col md={10}>
          <ul className={classNames(styles.vpsNav, 'nav nav-pills nav-default')}>
            {Object.keys(vpsesWithCountries).map((type) => {
              return vpsesWithCountries[type].map((country) => (
                <li key={country.name_en} style={{minWidth: "33%"}} className="text-center">
                  <Link
                    href={`/server/vps/${type}#server_vps_${type}_${country.code.toLowerCase()}`}
                  >

                    <span className={`flag-icon flag-icon-${country.code.toLowerCase()}`}></span>
                    {' '}سرور مجازی ابری{country.name_fa}

                  </Link>
                </li>
              ));
            })}
          </ul>
        </Col>
      </Row>
    );
  }
}

export default VpsNav;

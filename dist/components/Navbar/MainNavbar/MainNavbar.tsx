import React, { useState } from 'react';
import styles from './MainNavbar.module.scss';
import Image from 'next/image';
import { Button, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faBriefcase,
  faChevronRight,
  faPhoneAlt,
} from '@fortawesome/free-solid-svg-icons';
import Hosting from './Hosting/Hosting';
import Domain from './Domain/Domain';
import Server from './Server/Server';
import License from './License/License';
import Support from './Support/Support';
import Link from 'next/link';

const MainNavbar = () => {
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);

  const changeShowMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

  return (
    <div className={styles.mainNavbar}>
      <Container fluid="md">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <Image src="/logo-header.png" width={171} height={35} />
            <div
              className={styles.navItemWrapper}
              style={{ right: isMenuOpen ? 0 : '-100%' }}
            >
              <Hosting />
              <Domain />
              <Server />
              <License />
              <Support />
              <Link href="/fa/contact">
                <a className={styles.jobsLinkOnNav}>
                  <FontAwesomeIcon icon={faBriefcase} />
                  فرصت‌های شغلی
                </a>
              </Link>
              <Link href="/fa/contact">
                <a className={styles.contactUsLink}>
                  <FontAwesomeIcon icon={faPhoneAlt} />
                  تماس با ما
                </a>
              </Link>
            </div>
            <button
              className={styles.closeSpace}
              onClick={changeShowMenu}
              style={{ left: isMenuOpen ? 0 : '-100%' }}
            ></button>
          </div>
          <Link href="/fa/jobs">
            <a className={styles.jobTitlesBtn}>
              <FontAwesomeIcon icon={faBriefcase} height="16px" />
              <span>فرصت‌های شغلی</span>
            </a>
          </Link>
          <Button
            variant="light"
            className={styles.hamburgerMenuBtn}
            onClick={changeShowMenu}
          >
            {isMenuOpen ? (
              <FontAwesomeIcon icon={faChevronRight} />
            ) : (
              <FontAwesomeIcon icon={faBars} />
            )}
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default MainNavbar;

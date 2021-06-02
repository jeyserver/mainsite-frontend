import React, { useState } from 'react';
import styles from './MainNavbar.module.scss';
import Image from 'next/image';
import { Button, Container } from 'react-bootstrap';
import Hosting from './Hosting/Hosting';
import Domain from './Domain/Domain';
import Server from './Server/Server';
import License from './License/License';
import Support from './Support/Support';
import Link from 'next/link';

const MainNavbar = () => {
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
  const [dropDownOpend, setDropDownOpend] = useState<boolean>(false);

  const changeShowDropDown = () => {
    setDropDownOpend((prevState) => !prevState);
  };

  const changeShowMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

  return (
    <div className={styles.mainNavbar} id="mainNavbar">
      <Container fluid="md">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <a href="/">
              <Image src="/logo-header.png" width={171} height={35} />
            </a>
            <div
              className={styles.navItemWrapper}
              style={{ right: isMenuOpen ? 0 : '-100%' }}
            >
              <Hosting changeShowDropDown={changeShowDropDown} />
              <Domain changeShowDropDown={changeShowDropDown} />
              <Server changeShowDropDown={changeShowDropDown} />
              <License changeShowDropDown={changeShowDropDown} />
              <Support changeShowDropDown={changeShowDropDown} />
              <Link href="/fa/contact">
                <a className={styles.jobsLinkOnNav}>
                  <i className="fas fa-briefcase"></i>
                  فرصت‌های شغلی
                </a>
              </Link>
              <Link href="/fa/contact">
                <a className={styles.contactUsLink}>
                  <i className="fas fa-phone-alt"></i>
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
              <i className="fas fa-briefcase"></i>
              <span>فرصت‌های شغلی</span>
            </a>
          </Link>
          <Button
            variant="light"
            className={styles.hamburgerMenuBtn}
            onClick={changeShowMenu}
            data-close
          >
            {isMenuOpen ? (
              <i className="fas fa-chevron-right"></i>
            ) : (
              <i className="fas fa-bars"></i>
            )}
          </Button>
          {dropDownOpend ? (
            <div
              className={styles.closeSpaceForDropDown}
              onClick={changeShowDropDown}
            ></div>
          ) : (
            <div className="d-none"></div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default MainNavbar;

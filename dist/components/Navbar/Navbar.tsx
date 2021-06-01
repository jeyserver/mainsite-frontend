import React from 'react';
import MainNavbar from './MainNavbar/MainNavbar';
import TopNavbar from './TopNavbar/TopNavbar';
import styles from './Navbar.module.scss';

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <TopNavbar />
      <MainNavbar />
    </nav>
  );
};

export default Navbar;

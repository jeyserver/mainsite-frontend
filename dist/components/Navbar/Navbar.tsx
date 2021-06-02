import React, { useEffect } from 'react';
import MainNavbar from './MainNavbar/MainNavbar';
import TopNavbar from './TopNavbar/TopNavbar';
import styles from './Navbar.module.scss';

const Navbar = () => {
  useEffect(() => {
    const debounce = (fn) => {
      let frame;
      return (...params) => {
        if (frame) {
          cancelAnimationFrame(frame);
        }
        frame = requestAnimationFrame(() => {
          fn(...params);
        });
      };
    };

    const storeScroll = () => {
      (document.documentElement as any).dataset.scroll = window.scrollY;
    };

    document.addEventListener('scroll', debounce(storeScroll), {
      passive: true,
    });
    storeScroll();
  }, []);
  return (
    <nav className={styles.nav}>
      <TopNavbar />
      <MainNavbar />
    </nav>
  );
};

export default Navbar;

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
      if (scrollY > 44) {
        (
          document.querySelector('#mainNavbar') as HTMLDivElement
        ).style.position = 'fixed';
        (document.querySelector('#top-nav') as HTMLDivElement).setAttribute(
          'style',
          'height: 0;'
        );
      } else {
        (
          document.querySelector('#mainNavbar') as HTMLDivElement
        ).style.position = 'static';
        (document.querySelector('#top-nav') as HTMLDivElement).setAttribute(
          'style',
          'height: 43px;'
        );
      }
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

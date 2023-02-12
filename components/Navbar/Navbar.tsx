import React from 'react';
import MainNavbar from './MainNavbar/MainNavbar';
import TopNavbar from './TopNavbar/TopNavbar';
import styles from './Navbar.module.scss';
import { ILicense, ITld } from '../../pages/_app';

interface NavbarProps {
  appIsScrolling?: boolean;
  tlds: ITld[];
  licenses: ILicense[];
}

class Navbar extends React.Component<NavbarProps> {
  componentDidMount() {
    const mainNavbar = document.querySelector('#mainNavbar') as HTMLDivElement;
    const topNav = document.querySelector('#top-nav') as HTMLDivElement;
    const navItemDropdown = document.querySelectorAll(
      '.nav-item-dropdown'
    ) as any;

    const navbarTopSpace = document.querySelector(
      '#navbar-top-space'
    ) as HTMLDivElement;

    var lastScrollTop = 0;

    const storeScroll = () => {
      (document.documentElement as any).dataset.scroll = window.scrollY;
      const st = window.pageYOffset || document.documentElement.scrollTop;

      if (st > lastScrollTop) {
        // Downscroll
        navItemDropdown.forEach(
          (dropdownMenu) => (dropdownMenu.dataset.down = 'true')
        );
        const dropDownMenuShowing = document.querySelectorAll(
          '.nav-item-dropdown-menu.show'
        ) as any;

        if (dropDownMenuShowing) {
          if (dropDownMenuShowing.length === 0) {
            mainNavbar.style.top = '-100px';
          } else {
            mainNavbar.style.top = '0';
          }
        } else {
          mainNavbar.style.top = '-100px';
        }

        if (window.innerWidth > 991) {
          if (scrollY > 123) {
            mainNavbar.style.position = 'fixed';
            topNav.style.opacity = '0';
            topNav.style.marginBottom = '80px';
          } else {
            mainNavbar.style.position = 'static';
            topNav.style.opacity = '1';
            topNav.style.marginBottom = '0';
          }
        } else {
          if (scrollY > 80) {
            mainNavbar.style.position = 'fixed';
            navbarTopSpace.style.display = 'block';
          } else {
            mainNavbar.style.position = 'static';
            navbarTopSpace.style.display = 'none';
          }
        }
      } else {
        // upscroll code
        navItemDropdown.forEach(
          (dropdownMenu) => (dropdownMenu.dataset.down = 'false')
        );
        if (!this.props.appIsScrolling) {
          mainNavbar.style.top = '0';
        } else {
          mainNavbar.style.top = '-100px';
        }

        if (window.innerWidth > 991) {
          if (scrollY > 43) {
            mainNavbar.style.position = 'fixed';
            topNav.style.opacity = '0';
            topNav.style.marginBottom = '80px';
          } else {
            mainNavbar.style.position = 'static';
            topNav.style.opacity = '1';
            topNav.style.marginBottom = '0';
          }
        } else {
          if (scrollY > 0) {
            mainNavbar.style.position = 'fixed';
            navbarTopSpace.style.display = 'block';
          } else {
            mainNavbar.style.position = 'static';
            navbarTopSpace.style.display = 'none';
          }
        }
      }

      lastScrollTop = st <= 0 ? 0 : st;
    };

    document.addEventListener('scroll', storeScroll, {
      passive: true,
    });
  }

  render() {
    return (
      <nav className={styles.nav}>
        <TopNavbar />
        <div id="navbar-top-space" className={styles.navbarTopSpace}></div>
        <MainNavbar tlds={this.props.tlds} licenses={this.props.licenses} />
      </nav>
    );
  }
}

export default Navbar;

import React from 'react';
import styles from './MainNavbar.module.scss';
import Image from 'next/image';
import { Button, Container } from 'react-bootstrap';
import Hosting from './Hosting/Hosting';
import Domain from './Domain/Domain';
import Server from './Server/Server';
import License from './License/License';
import Support from './Support/Support';
import Link from 'next/link';
import { ITld, ILicense as ILicense } from '../../../pages/_app';

interface IProps {
  tlds: ITld[];
  licenses: ILicense[];
}

interface IState {
  isMenuOpen: boolean;
  dropDownOpend: boolean;
}

class MainNavbar extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { isMenuOpen: false, dropDownOpend: false };
    this.changeShowDropDown = this.changeShowDropDown.bind(this);
    this.changeShowMenu = this.changeShowMenu.bind(this);
    this.closeSpace = this.closeSpace.bind(this);
  }

  changeShowDropDown() {
    this.setState((prev) => {
      return {
        dropDownOpend: !prev.dropDownOpend,
      };
    });
  }

  changeShowMenu() {
    this.setState((prevState) => {
      if (window.innerWidth <= 768) {
        if (!prevState.isMenuOpen) {
          document.querySelector('body').style.overflow = 'hidden';
        } else {
          document.querySelector('body').style.overflow = '';
        }
      }
      return {
        isMenuOpen: !prevState.isMenuOpen,
      };
    });
  }

  closeSpace() {
    if (!this.state.dropDownOpend) {
      this.changeShowMenu();
    } else {
      this.changeShowDropDown();
    }
  }

  render() {
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
                style={{ right: this.state.isMenuOpen ? 0 : '-100%' }}
              >
                <Hosting changeShowDropDown={this.changeShowDropDown} />
                <Domain
                  changeShowDropDown={this.changeShowDropDown}
                  tlds={this.props.tlds}
                />
                <Server changeShowDropDown={this.changeShowDropDown} />
                <License
                  changeShowDropDown={this.changeShowDropDown}
                  changeShowMenu={this.changeShowMenu}
                  licenses={this.props.licenses}
                />
                <Support changeShowDropDown={this.changeShowDropDown} />
                <Link href="/jobs" className={styles.jobsLinkOnNav}>

                  <i className="fas fa-briefcase"></i>فرصت‌های شغلی
                </Link>
                <Link href="/contact" className={styles.contactUsLink}>

                  <i className="fas fa-phone-alt"></i>تماس با ما
                </Link>
              </div>
              <button
                className={styles.closeSpace}
                onClick={this.closeSpace}
                style={{ left: this.state.isMenuOpen ? 0 : '-100%' }}
              ></button>
            </div>
            <Link href="/jobs" className={styles.jobTitlesBtn}>

              <i className="fas fa-briefcase"></i>
              <span>فرصت‌های شغلی</span>

            </Link>
            <Button
              variant="light"
              className={styles.hamburgerMenuBtn}
              onClick={this.changeShowMenu}
              data-close
            >
              {this.state.isMenuOpen ? (
                <i className="fas fa-chevron-right"></i>
              ) : (
                <i className="fas fa-bars"></i>
              )}
            </Button>
            {this.state.dropDownOpend ? (
              <div
                className={styles.closeSpaceForDropDown}
                onClick={this.changeShowDropDown}
              ></div>
            ) : (
              <div className="d-none"></div>
            )}
          </div>
        </Container>
      </div>
    );
  }
}

export default MainNavbar;

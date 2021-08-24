import * as React from 'react';
import { Dropdown, Container } from 'react-bootstrap';
import Link from 'next/link';
import styles from './TopNavbar.module.scss';
import { connect } from 'react-redux';
import { signUp, logout } from '../../../redux/actions';
import { RootState } from '../../../store';

interface IProps {
  isLoggedIn: RootState['auth']['isLoggedIn'];
  logout: any;
  signUp: any;
  user: RootState['auth']['user'];
}

class TopNavbar extends React.Component<IProps> {
  render() {
    return (
      <div id="top-nav" className={styles.topNav}>
        <Container>
          <div className="d-flex align-items-center justify-content-between">
            <div className={styles.rightItems}>
              <Dropdown>
                <Dropdown.Toggle
                  className={styles.langDropDown}
                  id="dropdown-basic"
                >
                  <i className="fas fa-globe-asia"></i>
                  زبان: <span>فارسی</span>
                </Dropdown.Toggle>

                <Dropdown.Menu className={styles.langDropDownMenu}>
                  <Dropdown.Item href="#fa">فارسی</Dropdown.Item>
                  <Dropdown.Item href="#en">انگلیسی</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <div>
                <i className="fas fa-phone-alt"></i>
                <span>تلفن:</span>
                <a href="tel:+3134420301">03134420301</a>
              </div>
              <div>
                <i className="far fa-envelope"></i>
                <span>ایمیل:</span>
                <a href="mailto:info@jeyserver.com">info@jeyserver.com</a>
              </div>
            </div>
            <div className={styles.leftItems}>
              {this.props.isLoggedIn ? (
                <>
                  <Link href={`#${this.props.user.name}`}>
                    <a className={styles.authLink}>
                      <img
                        src="/images/user.svg"
                        width="25px"
                        height="25px"
                        className="me-1"
                      />
                      <span>{this.props.user.name}</span>
                    </a>
                  </Link>
                  <button
                    className={styles.authLink}
                    onClick={() => this.props.logout()}
                  >
                    <i className="fas fa-sign-out-alt"></i>
                    <span>خروج</span>
                  </button>
                </>
              ) : (
                <>
                  <Link href="#login">
                    <a className={styles.authLink}>
                      <i className="fas fa-sign-in-alt"></i>
                      <span>ورود</span>
                    </a>
                  </Link>
                  <button
                    className={styles.authLink}
                    onClick={() => this.props.signUp()}
                  >
                    <i className="fas fa-user-plus"></i>
                    <span>ثبت نام</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

export default connect(
  (state: RootState) => {
    return {
      user: state.auth.user,
      isLoggedIn: state.auth.isLoggedIn,
    };
  },
  { signUp, logout }
)(TopNavbar);

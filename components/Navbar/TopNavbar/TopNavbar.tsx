import * as React from 'react';
import { Dropdown, Container } from 'react-bootstrap';
import Link from 'next/link';
import styles from './TopNavbar.module.scss';
import { RootState } from '../../../store';
import { connect } from 'react-redux';

interface IProps {
  isLoggedIn: RootState['auth']['isLoggedIn'];
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
                  <Link href={`#${this.props.user.name}`} className={styles.authLink}>

                    <img
                      src="/images/user.svg"
                      width="25px"
                      height="25px"
                      className="me-1"
                    />
                    <span>{this.props.user.name}</span>

                  </Link>
                  <button className={styles.authLink}>
                    <i className="fas fa-sign-out-alt"></i>
                    <span>خروج</span>
                  </button>
                </>
              ) : (
                <>
                  <Link href="/userpanel/login" className={styles.authLink}>

                    <i className="fas fa-sign-in-alt"></i>
                    <span>ورود</span>

                  </Link>
                  <Link href="/userpanel/register" className={styles.authLink}>

                    <i className="fas fa-user-plus"></i>
                    <span>ثبت نام</span>

                  </Link>
                </>
              )}
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

export default connect((state: RootState) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    user: state.auth.user,
  };
})(TopNavbar);

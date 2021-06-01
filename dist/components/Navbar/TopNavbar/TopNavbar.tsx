import { Dropdown, Container } from 'react-bootstrap';
import Link from 'next/link';
import styles from './TopNavbar.module.scss';
import {
  faEnvelope,
  faGlobeAsia,
  faPhone,
  faRegistered,
  faSignInAlt,
  faSignOutAlt,
  faUserCircle,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { signUp, logout } from '../../../redux/actions';
import Image from 'next/image';

const TopNavbar = (props) => {
  console.log(props);

  return (
    <div className={styles.topNav + ' d-none d-lg-block'}>
      <Container>
        <div className="d-flex align-items-center justify-content-between">
          <div className={styles.rightItems}>
            <Dropdown>
              <Dropdown.Toggle
                className={styles.langDropDown}
                id="dropdown-basic"
              >
                <FontAwesomeIcon icon={faGlobeAsia} />
                زبان: <span>فارسی</span>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#fa">فارسی</Dropdown.Item>
                <Dropdown.Item href="#en">انگلیسی</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <div>
              <FontAwesomeIcon icon={faPhone} />
              <span>تلفن:</span>
              <a href="tel:+3134420301">03134420301</a>
            </div>
            <div>
              <FontAwesomeIcon icon={faEnvelope} />
              <span>ایمیل:</span>
              <a href="mailto:info@jeyserver.com">info@jeyserver.com</a>
            </div>
          </div>
          <div className={styles.leftItems}>
            {props.isLoggedIn ? (
              <>
                <Link href={`#${props.user.name}`}>
                  <a className={styles.authLink}>
                    <img
                      src="/images/user.svg"
                      width="25px"
                      height="25px"
                      className="me-1"
                    />
                    <span>{props.user.name}</span>
                  </a>
                </Link>
                <button
                  className={styles.authLink}
                  onClick={() => props.logout()}
                >
                  <FontAwesomeIcon icon={faSignOutAlt} />
                  <span>خروج</span>
                </button>
              </>
            ) : (
              <>
                <Link href="#login">
                  <a className={styles.authLink}>
                    <FontAwesomeIcon icon={faSignInAlt} />
                    <span>ورود</span>
                  </a>
                </Link>
                <button
                  className={styles.authLink}
                  onClick={() => props.signUp()}
                >
                  <FontAwesomeIcon icon={faUserPlus} />
                  <span>ثبت نام</span>
                </button>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    isLoggedIn: state.auth.isLoggedIn,
  };
}

export default connect(mapStateToProps, { signUp, logout })(TopNavbar);

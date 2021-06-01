import { faGlobeAsia, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import {
  Col,
  Image,
  Dropdown,
  Row,
  Container,
  FormControl,
  InputGroup,
  Button,
} from 'react-bootstrap';
import styles from './Domain.module.scss';

const Domain = () => {
  return (
    <Dropdown className="nav-item-dropdown">
      <Dropdown.Toggle id="nav-dropdown" className="nav-item-dropdown-toggle">
        <FontAwesomeIcon icon={faGlobeAsia} />
        دامنه
      </Dropdown.Toggle>

      <Dropdown.Menu className="nav-item-dropdown-menu px-3 py-0">
        <Container fluid>
          <Row className="flex-column-reverse flex-md-row">
            <Col xs={12} md={4}>
              <div className="d-flex flex-column justify-content-between mt-4">
                <div className="d-flex align-items-center justify-content-between">
                  <h4>تعرفه ثبت دامنه</h4>
                  <Link href="#">
                    <Button as="a" type="submit" variant="success">
                      <span>بیشتر</span>
                    </Button>
                  </Link>
                </div>
                <div className="mt-3">
                  <div className={styles.tableHeader}>
                    <div>پسوند</div>
                    <div>قیمت ثبت</div>
                  </div>
                  <div className={styles.tableWrapper}>
                    <table className="table">
                      <tbody>
                        <tr>
                          <td>com</td>
                          <td>247,520 تومان</td>
                        </tr>
                        <tr>
                          <td>net</td>
                          <td>257,920 تومان</td>
                        </tr>
                        <tr>
                          <td>org</td>
                          <td>303,420 تومان</td>
                        </tr>
                        <tr>
                          <td>info</td>
                          <td>104,520 تومان</td>
                        </tr>
                        <tr>
                          <td>asia</td>
                          <td>388,700 تومان</td>
                        </tr>
                        <tr>
                          <td>co</td>
                          <td>814,060 تومان</td>
                        </tr>
                        <tr>
                          <td>ir</td>
                          <td>14,000 تومان</td>
                        </tr>
                        <tr>
                          <td>cc</td>
                          <td>355,420 تومان</td>
                        </tr>
                        <tr>
                          <td>ca</td>
                          <td>346,320 تومان</td>
                        </tr>
                        <tr>
                          <td>de</td>
                          <td>215,020 تومان</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={12} md={4} className="px-0">
              <div className={styles.domainCheck}>
                <h4>نقطه شروع همه چیز اینجاست!</h4>
                <form className="mt-5">
                  <InputGroup className={styles.formInputGroup}>
                    <FormControl as="select" className="mr-sm-2" dir="ltr">
                      <option value="com">.com</option>
                      <option value="net">.net</option>
                      <option value="org">.org</option>
                      <option value="info">.info</option>
                    </FormControl>
                    <FormControl placeholder="Your Domain" />
                    <InputGroup.Prepend>
                      <InputGroup.Text dir="ltr">www.</InputGroup.Text>
                    </InputGroup.Prepend>
                  </InputGroup>
                  <Button
                    type="submit"
                    variant="success"
                    className={styles.searchDomainBtn}
                  >
                    <FontAwesomeIcon icon={faSearch} />
                    <span>بررسی کن</span>
                  </Button>
                </form>
              </div>
            </Col>
            <Col xs={12} md={4}>
              <div className="position-relative mt-4">
                <p className={styles.paragraph}>
                  دامنه یا دامین یا domain نامی یکتا و بیانگر هویت و نشانی
                  دسترسی یک وب سایت است. هر دامنه از دو بخش تشکیل شده است؛ بخش
                  اول نامی است انتخابی، که هر فرد می‌تواند بسته به موضوع وب‌سایت
                  و سلیقه خود آن را انتخاب نماید و بخش دوم نیز که با یک نقطه از
                  بخش اول جدا می‌شود، پسوندی است و هر فرد می‌تواند بسته به موضوع
                  وب‌سایت و سلیقۀ خود یکی از آن‌ها را انتخاب نماید.
                </p>
                <Image
                  src="/images/domain-menu.png"
                  className={styles.backgroundImage}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Domain;

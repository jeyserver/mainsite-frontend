import Link from 'next/link';
import React, { useEffect, useState } from 'react';
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

interface Props {
  changeShowDropDown: () => void;
}

const Domain: React.FC<Props> = (props) => {
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);

  useEffect(() => {
    const tr = document.querySelectorAll(
      'tr > td[data-selected="true"]'
    ) as any;
    if (selectedDomain) {
      const tableWrapper = document.querySelector('#tableWrapper') as any;
      tableWrapper.scrollTop = tr[0].parentElement.offsetTop;
    }
  }, [selectedDomain]);

  const changeSelectedDomain = (e: any) => {
    setSelectedDomain(e.target.value);
  };

  return (
    <Dropdown className="nav-item-dropdown">
      <Dropdown.Toggle id="nav-dropdown" className="nav-item-dropdown-toggle">
        <div onClick={props.changeShowDropDown}>
          <i className="fas fa-globe-asia"></i>
          دامنه
        </div>
      </Dropdown.Toggle>

      <Dropdown.Menu className="nav-item-dropdown-menu px-3 py-0">
        <Container fluid>
          <Row className="flex-column-reverse flex-md-row">
            <Col xs={12} md={4}>
              <div className="d-flex flex-column justify-content-between mt-4">
                <div className="d-flex align-items-center justify-content-between">
                  <h4 className={styles.tableTitle}>تعرفه ثبت دامنه</h4>
                  <Link href="#">
                    <Button
                      as="a"
                      type="submit"
                      variant="success"
                      className={styles.moreBtn}
                    >
                      <span>بیشتر</span>
                    </Button>
                  </Link>
                </div>
                <div className="mt-3">
                  <div className={styles.tableHeader}>
                    <div>پسوند</div>
                    <div>قیمت ثبت</div>
                  </div>
                  <div className={styles.tableWrapper} id="tableWrapper">
                    <table className="table">
                      <tbody>
                        <tr>
                          <td data-selected={selectedDomain === 'com'}>com</td>
                          <td data-selected={selectedDomain === 'com'}>
                            247,520 تومان
                          </td>
                        </tr>
                        <tr>
                          <td data-selected={selectedDomain === 'net'}>net</td>
                          <td data-selected={selectedDomain === 'net'}>
                            257,920 تومان
                          </td>
                        </tr>
                        <tr>
                          <td data-selected={selectedDomain === 'org'}>org</td>
                          <td data-selected={selectedDomain === 'org'}>
                            303,420 تومان
                          </td>
                        </tr>
                        <tr>
                          <td data-selected={selectedDomain === 'info'}>
                            info
                          </td>
                          <td data-selected={selectedDomain === 'info'}>
                            104,520 تومان
                          </td>
                        </tr>
                        <tr>
                          <td data-selected={selectedDomain === 'asia'}>
                            asia
                          </td>
                          <td data-selected={selectedDomain === 'asia'}>
                            388,700 تومان
                          </td>
                        </tr>
                        <tr>
                          <td data-selected={selectedDomain === 'co'}>co</td>
                          <td data-selected={selectedDomain === 'co'}>
                            814,060 تومان
                          </td>
                        </tr>
                        <tr>
                          <td data-selected={selectedDomain === 'ir'}>ir</td>
                          <td data-selected={selectedDomain === 'ir'}>
                            14,000 تومان
                          </td>
                        </tr>
                        <tr>
                          <td data-selected={selectedDomain === 'cc'}>cc</td>
                          <td data-selected={selectedDomain === 'cc'}>
                            355,420 تومان
                          </td>
                        </tr>
                        <tr>
                          <td data-selected={selectedDomain === 'ca'}>ca</td>
                          <td data-selected={selectedDomain === 'ca'}>
                            346,320 تومان
                          </td>
                        </tr>
                        <tr>
                          <td data-selected={selectedDomain === 'de'}>de</td>
                          <td data-selected={selectedDomain === 'de'}>
                            215,020 تومان
                          </td>
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
                    <FormControl
                      as="select"
                      className="mr-sm-2"
                      dir="ltr"
                      onChange={(e) => changeSelectedDomain(e)}
                    >
                      <option value="com">.com</option>
                      <option value="net">.net</option>
                      <option value="org">.org</option>
                      <option value="info">.info</option>
                      <option value="asia">.asia</option>
                      <option value="co">co</option>
                      <option value="ir">ir</option>
                      <option value="cc">cc</option>
                      <option value="ca">ca</option>
                      <option value="de">de</option>
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
                    <i className="fas fa-search"></i>
                    <span>بررسی کن</span>
                  </Button>
                </form>
              </div>
            </Col>
            <Col xs={12} md={4}>
              <div className={styles.infoWrapper}>
                <Image
                  src="/images/domain-menu.png"
                  className={styles.backgroundImage}
                />
                <p>
                  دامنه یا دامین یا domain نامی یکتا و بیانگر هویت و نشانی
                  دسترسی یک وب سایت است. هر دامنه از دو بخش تشکیل شده است؛ بخش
                  اول نامی است انتخابی، که هر فرد می‌تواند بسته به موضوع وب‌سایت
                  و سلیقه خود آن را انتخاب نماید و بخش دوم نیز که با یک نقطه از
                  بخش اول جدا می‌شود، پسوندی است و هر فرد می‌تواند بسته به موضوع
                  وب‌سایت و سلیقۀ خود یکی از آن‌ها را انتخاب نماید.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Domain;

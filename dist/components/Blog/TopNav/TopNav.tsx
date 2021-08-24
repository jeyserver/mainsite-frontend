import * as React from 'react';
import { Container, Row, Dropdown, Accordion } from 'react-bootstrap';
import Link from 'next/link';
import { connect } from 'react-redux';
import { toggleTheme } from '../../../redux/actions';
import { Button } from 'react-bootstrap';
import { NextRouter, withRouter } from 'next/router';
import CategoryAccordion from './CategoryAccordion';

interface param {
  category?: string[];
  tag?: string;
  search?: string;
}

export interface TopNavProps {
  title: string;
  page: 'blog' | 'post' | 'category' | 'tag' | 'search';
  param?: param;
  categories: any;
  nightMode: boolean;
  store: { theme: string };
  toggleTheme: () => void;
  router: NextRouter;
}

export interface TopNavState {
  isPageLoading: boolean;
  showCategoriesDropDownOnMobile: boolean;
}

class TopNav extends React.Component<TopNavProps, TopNavState> {
  constructor(props: TopNavProps) {
    super(props);
    this.state = {
      isPageLoading: false,
      showCategoriesDropDownOnMobile: false,
    };
    this.hideDropdownOnMobile = this.hideDropdownOnMobile.bind(this);
  }

  componentDidMount() {
    // For categories menu on desktop
    const scroller = document.querySelector('#top-nav-links-and-dropdowns');
    const dropDown = document.querySelectorAll('.top-nav-dropdown-menu') as any;
    scroller.addEventListener('scroll', checkScroll);

    function checkScroll() {
      for (let i = 0; i < dropDown.length; i++) {
        dropDown[i].style.transform = `translateX(${
          -1 * scroller.scrollLeft
        }px)`;
      }
    }

    // watch page is loading
    const handleStart = (url) =>
      url !== this.props.router.asPath &&
      this.setState({ isPageLoading: true });
    const handleComplete = (url) =>
      url === this.props.router.asPath &&
      this.setState({ isPageLoading: false });

    this.props.router.events.on('routeChangeStart', handleStart);
    this.props.router.events.on('routeChangeComplete', handleComplete);
    this.props.router.events.on('routeChangeError', handleComplete);
  }

  componentWillUnmount() {
    const handleStart = (url) =>
      url !== this.props.router.asPath &&
      this.setState({ isPageLoading: true });
    const handleComplete = (url) =>
      url === this.props.router.asPath &&
      this.setState({ isPageLoading: false });

    this.props.router.events.off('routeChangeStart', handleStart);
    this.props.router.events.off('routeChangeComplete', handleComplete);
    this.props.router.events.off('routeChangeError', handleComplete);
  }

  submitSearchForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    this.props.router
      .push(`/blog/search?word=${encodeURI(form.word.value)}`)
      .then(() => {
        form.word.value = '';
      });
  }

  hideDropdownOnMobile() {
    this.setState({
      showCategoriesDropDownOnMobile: false,
    });
  }

  render() {
    const showBreedcrumb = (param: param) => {
      if (param.category) {
        return (
          <h3 className="title-under-links">
            <span>
              <Link href="/blog">
                <a>آموزش ها</a>
              </Link>
            </span>
            <i className="fas fa-chevron-left"></i>
            {param.category.map((category, index) => {
              if (index !== param.category.length - 1) {
                return (
                  <span key={category}>
                    <Link href={`/blog/category/${encodeURI(category)}`}>
                      <a>{category}</a>
                    </Link>
                    <i className="fas fa-chevron-left"></i>
                  </span>
                );
              } else {
                return (
                  <span key={category}>
                    <Link href={`/blog/category/${encodeURI(category)}`}>
                      <a>{category}</a>
                    </Link>
                  </span>
                );
              }
            })}
          </h3>
        );
      } else if (param.search) {
        return null;
      } else if (param.tag) {
        return null;
      }
    };

    return (
      <div className="topNav">
        <Container fluid="md">
          <Row>
            <div className="top">
              <div className="right">
                <h1 className="headerTitle">{this.props.title}</h1>
                {this.props.param && showBreedcrumb(this.props.param)}
              </div>

              <div className="left">
                {this.props.nightMode && (
                  <button
                    className="nightModeBtn"
                    onClick={this.props.toggleTheme}
                  >
                    {this.props.store.theme === 'dark' ? (
                      <i className="far fa-sun"></i>
                    ) : (
                      <i className="far fa-moon"></i>
                    )}
                  </button>
                )}

                <form
                  className="searchForm"
                  onSubmit={(e) => this.submitSearchForm(e)}
                >
                  <input
                    type="text"
                    name="word"
                    placeholder="جستجوی مطلب"
                    className="searchInput"
                    required
                  />
                  <button type="submit" className="searchBtn">
                    <i className="fas fa-search"></i>
                  </button>
                </form>
              </div>
            </div>
          </Row>

          <Row className="d-none d-md-flex">
            <div className="overflow-hidden">
              <div
                id="top-nav-links-and-dropdowns"
                className="top-nav-links-and-dropdowns"
              >
                {this.props.categories.map((category, index) => {
                  if (category.subCategories) {
                    return (
                      <button className="item dropDownToggle" key={index}>
                        <Link
                          href={`/blog/category/${encodeURI(category.name)}`}
                          key={index}
                        >
                          <a>{category.name}</a>
                        </Link>
                        <span className="top-nav-dropdown-menu">
                          {category.subCategories.map((subCategory, index) => (
                            <Link
                              href={`/blog/category/${encodeURI(
                                subCategory.name
                              )}`}
                              key={index}
                            >
                              <a>
                                <i className="fas fa-angle-left"></i>
                                {subCategory.name}
                              </a>
                            </Link>
                          ))}
                        </span>
                      </button>
                    );
                  } else {
                    return (
                      <Link
                        href={`/blog/category/${category.name}`}
                        key={index}
                      >
                        <a className="link">{category.name}</a>
                      </Link>
                    );
                  }
                })}
              </div>
            </div>
          </Row>
        </Container>

        <div className="show-categories-on-mobile">
          <Dropdown
            onToggle={(isOpen) =>
              this.setState((prev) => {
                return {
                  showCategoriesDropDownOnMobile: isOpen,
                };
              })
            }
            show={this.state.showCategoriesDropDownOnMobile}
          >
            <Dropdown.Toggle className="categoriesToggle">
              <div>
                <span>دسته بندی مطالب</span>
                {this.state.showCategoriesDropDownOnMobile ? (
                  <i className="fas fa-chevron-up"></i>
                ) : (
                  <i className="fas fa-chevron-down"></i>
                )}
              </div>
            </Dropdown.Toggle>

            {!this.state.isPageLoading && (
              <Dropdown.Menu className="categoriesMenu">
                {this.props.categories.map((category, index) => {
                  if (category.subCategories) {
                    return (
                      <CategoryAccordion
                        changeDropdown={this.hideDropdownOnMobile}
                        param={this.props.param}
                        categoryName={category.name}
                      >
                        {category.subCategories.map((subCategory, index) => {
                          if (subCategory.subCategories) {
                            return (
                              <CategoryAccordion
                                changeDropdown={this.hideDropdownOnMobile}
                                param={this.props.param}
                                categoryName={category.name}
                              >
                                {subCategory.subCategories.map(
                                  (insideSubCategory, index) => (
                                    <Link
                                      href={`/blog/category/${insideSubCategory.name}`}
                                      key={insideSubCategory}
                                    >
                                      <a
                                        className="linkInCategoryAccordion"
                                        onClick={this.hideDropdownOnMobile}
                                      >
                                        {insideSubCategory.name}
                                      </a>
                                    </Link>
                                  )
                                )}
                              </CategoryAccordion>
                            );
                          } else {
                            return (
                              <Link
                                href={`/blog/category/${subCategory.name}`}
                                key={index}
                              >
                                <a
                                  className="linkInCategoryAccordion"
                                  onClick={this.hideDropdownOnMobile}
                                >
                                  {subCategory.name}
                                </a>
                              </Link>
                            );
                          }
                        })}
                      </CategoryAccordion>
                    );
                  } else {
                    return (
                      <Link
                        href={`/blog/category/${category.name}`}
                        key={index}
                      >
                        <a className="item">
                          <span onClick={this.hideDropdownOnMobile}>
                            {category.name}
                          </span>
                        </a>
                      </Link>
                    );
                  }
                })}
              </Dropdown.Menu>
            )}
          </Dropdown>
        </div>

        <div className="searchAndNightModeOnMobileWrapper">
          <div className="showOnMobile">
            {this.props.nightMode && (
              <button className="nightModeBtn" onClick={this.props.toggleTheme}>
                {this.props.store.theme === 'dark' ? (
                  <i className="far fa-sun"></i>
                ) : (
                  <i className="far fa-moon"></i>
                )}
              </button>
            )}

            <form
              className="searchForm"
              onSubmit={(e) => this.submitSearchForm(e)}
            >
              <input
                type="text"
                name="word"
                placeholder="جستجوی مطلب"
                className="searchInput"
                required
              />
              <button type="submit" className="searchBtn">
                <i className="fas fa-search"></i>
              </button>
            </form>
          </div>
        </div>
        <div className="line"></div>
      </div>
    );
  }
}

export default connect(
  (state) => {
    return {
      store: state.theme,
    };
  },
  { toggleTheme }
)(withRouter(TopNav));

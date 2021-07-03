import * as React from 'react';
import { Container, Row, Dropdown } from 'react-bootstrap';
import Link from 'next/link';
import { connect } from 'react-redux';
import { toggleTheme } from '../../../redux/actions';
import { Button } from 'react-bootstrap';

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
}

export interface TopNavState {}

class TopNav extends React.Component<TopNavProps, TopNavState> {
  constructor(props: TopNavProps) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
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
      <section className="topNav">
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

                <form className="searchForm">
                  <input
                    type="text"
                    placeholder="جستجوی مطلب"
                    className="searchInput"
                  />
                  <button type="submit" className="searchBtn">
                    <i className="fas fa-search"></i>
                  </button>
                </form>
              </div>
            </div>
          </Row>

          <Row>
            <div className="overflow-hidden">
              <div
                id="top-nav-links-and-dropdowns"
                className="top-nav-links-and-dropdowns"
              >
                {this.props.categories.map((category, index) => {
                  if (category.subCategories) {
                    return (
                      <button className="item dropDownToggle" key={index}>
                        {category.name}
                        <span className="top-nav-dropdown-menu">
                          {category.subCategories.map((subCategory, index) => (
                            <Link
                              href={`/blog/category/${subCategory}`}
                              key={index}
                            >
                              <a>
                                <i className="fas fa-angle-left"></i>
                                {subCategory}
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
                        <a className="item">{category.name}</a>
                      </Link>
                    );
                  }
                })}
              </div>
            </div>
          </Row>

          <Row>
            <div className="showOnMobile">
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

              <form className="searchForm">
                <input
                  type="text"
                  placeholder="جستجوی مطلب"
                  className="searchInput"
                />
                <button type="submit" className="searchBtn">
                  <i className="fas fa-search"></i>
                </button>
              </form>
            </div>
          </Row>
        </Container>
        <div className="line"></div>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    store: state.theme,
  };
};

export default connect(mapStateToProps, { toggleTheme })(TopNav);

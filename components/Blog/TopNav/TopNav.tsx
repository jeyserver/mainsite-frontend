import * as React from 'react';
import { Container, Row, Dropdown } from 'react-bootstrap';
import Link from 'next/link';
import { connect } from 'react-redux';
import { toggleTheme } from '../../../store/Theme';
import { NextRouter, withRouter } from 'next/router';
import classNames from 'classnames';
import styles from './TopNav.module.scss';
import { RootState } from '../../../store';
import ICategory from '../../../helper/types/blog/Category';
import CategoryAccordion from './CategoryAccordion/CategoryAccordion';

interface param {
  category?: ICategory;
  tag?: string;
  search?: string;
  breedcrumb?: ICategory[];
}

interface IProps {
  title: string;
  param?: param;
  categories: ICategory[];
  nightMode: boolean;
  theme: RootState['theme'];
  toggleTheme: typeof toggleTheme;
  router: NextRouter;
}

interface IState {
  isPageLoading: boolean;
  showCategoriesDropDownOnMobile: boolean;
}

class TopNav extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isPageLoading: false,
      showCategoriesDropDownOnMobile: false,
    };
  }

  checkScroll() {
    const scroller = document.querySelector('#top-nav-links-and-dropdowns');
    const dropDown = document.querySelectorAll('.mainMenu') as any;

    for (let i = 0; i < dropDown.length; i++) {
      dropDown[i].style.transform = `translateX(${-1 * scroller.scrollLeft}px)`;
    }
  }

  componentDidMount() {
    const scroller = document.querySelector('#top-nav-links-and-dropdowns');
    scroller.addEventListener('scroll', () => this.checkScroll());
  }

  componentWillUnmount() {
    const scroller = document.querySelector('#top-nav-links-and-dropdowns');
    scroller.removeEventListener('scroll', () => this.checkScroll());
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

  categoryMenu(category: ICategory) {
    return (
      <span className={styles.menu}>
        {this.props.categories
          .filter((c) => c.parent === category.id)
          .map((subCategory) => (
            <Link
              href={`/blog/category/${subCategory.permalink}`}
              key={subCategory.id}
            >
              <a className={styles.linkInside}>
                <i className="fas fa-angle-left"></i>
                {subCategory.title}
                {this.props.categories.some(
                  (i) => i.parent === subCategory.id
                ) && this.categoryMenu(subCategory)}
              </a>
            </Link>
          ))}
      </span>
    );
  }

  mouseOverLink(e: any, id) {
    const rect = e.target.getBoundingClientRect();
    const menu = document.querySelector(`#${id}`) as HTMLDivElement;

    if (menu) {
      menu.style.top = `${rect.top + 38}px`;
    }
  }

  render() {
    const showSub = (param: param) => {
      if (param.breedcrumb) {
        return (
          <h3 className={styles.titleUnderLinks}>
            {param.breedcrumb.map((category, index) => {
              if (index !== param.breedcrumb.length - 1) {
                return (
                  <span key={category.id}>
                    <Link href={`/blog/category/${category.permalink}`}>
                      <a>{category.title}</a>
                    </Link>
                    <i className="fas fa-chevron-left"></i>
                  </span>
                );
              } else {
                return (
                  <span key={category.id}>
                    <Link href={`/blog/category/${category.permalink}`}>
                      <a>{category.title}</a>
                    </Link>
                  </span>
                );
              }
            })}
          </h3>
        );
      } else {
        return null;
      }
    };

    return (
      <div
        className={classNames(styles.topNav, {
          [styles.dark]: this.props.theme.current === 'dark',
        })}
      >
        <Container fluid="md">
          <Row>
            <div className={styles.top}>
              <div className={styles.right}>
                <h1 className={styles.headerTitle}>{this.props.title}</h1>
                {this.props.param && showSub(this.props.param)}
              </div>

              <div className={styles.left}>
                {this.props.nightMode && (
                  <button
                    className={styles.nightModeBtn}
                    onClick={this.props.toggleTheme}
                  >
                    {this.props.theme.current === 'dark' ? (
                      <i className="far fa-sun"></i>
                    ) : (
                      <i className="far fa-moon"></i>
                    )}
                  </button>
                )}

                <form
                  className={styles.searchForm}
                  onSubmit={(e) => this.submitSearchForm(e)}
                >
                  <input
                    type="text"
                    name="word"
                    placeholder="جستجوی مطلب"
                    className={styles.searchInput}
                    required
                  />

                  <button type="submit" className={styles.searchBtn}>
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
                className={styles.linksAndDropdowns}
              >
                {this.props.categories
                  .filter((i) => i.parent === 1 && i.id !== 1)
                  .map((category, index) => {
                    if (
                      this.props.categories.some(
                        (i) => i.parent === category.id
                      )
                    ) {
                      return (
                        <button
                          className={classNames(
                            styles.item,
                            styles.dropDownToggle
                          )}
                          key={category.id}
                          onMouseEnter={(e) =>
                            this.mouseOverLink(e, `c-${category.id}`)
                          }
                        >
                          <Link href={`/blog/category/${category.permalink}`}>
                            <a>{category.title}</a>
                          </Link>
                          <div
                            className={classNames(styles.mainMenu, 'mainMenu')}
                            id={`c-${category.id}`}
                          >
                            {this.categoryMenu(category)}
                          </div>
                        </button>
                      );
                    } else {
                      return (
                        <Link
                          href={`/blog/category/${category.permalink}`}
                          key={category.id}
                        >
                          <a className={styles.link}>{category.title}</a>
                        </Link>
                      );
                    }
                  })}
              </div>
            </div>
          </Row>
        </Container>

        <div className={styles.showCategoriesOnMobile}>
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
            <Dropdown.Toggle className={styles.categoriesToggle}>
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
              <Dropdown.Menu className={styles.categoriesMenu}>
                {this.props.categories
                  .filter((i) => i.parent === 1)
                  .map((category, index) => (
                    <CategoryAccordion
                      category={category}
                      categories={this.props.categories}
                      key={index}
                    />
                  ))}
              </Dropdown.Menu>
            )}
          </Dropdown>
        </div>

        <div className={styles.searchAndNightModeOnMobileWrapper}>
          <div className={styles.showOnMobile}>
            {this.props.nightMode && (
              <button
                className={styles.nightModeBtn}
                onClick={this.props.toggleTheme}
              >
                {this.props.theme.current === 'dark' ? (
                  <i className="far fa-sun"></i>
                ) : (
                  <i className="far fa-moon"></i>
                )}
              </button>
            )}

            <form
              className={styles.searchForm}
              onSubmit={(e) => this.submitSearchForm(e)}
            >
              <input
                type="text"
                name="word"
                placeholder="جستجوی مطلب"
                className={styles.searchInput}
                required
              />
              <button type="submit" className={styles.searchBtn}>
                <i className="fas fa-search"></i>
              </button>
            </form>
          </div>
        </div>
        <div className={styles.line}></div>
      </div>
    );
  }
}

export default connect(
  (state: RootState) => {
    return {
      theme: state.theme,
    };
  },
  { toggleTheme }
)(withRouter(TopNav));

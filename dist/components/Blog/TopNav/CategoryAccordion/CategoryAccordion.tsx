import * as React from 'react';
import Link from 'next/link';
import { Accordion } from 'react-bootstrap';
import classNames from 'classnames';
import ICategory from '../../../../helper/types/blog/Category';

interface param {
  category?: ICategory;
  tag?: string;
  search?: string;
  breedcrumb?: ICategory[];
}

export interface CategoryAccordionProps {
  param?: param;
  categoryName: string;
  changeDropdown: () => void;
}

export interface CategoryAccordionState {
  isOpen: boolean;
}

class CategoryAccordion extends React.Component<
  CategoryAccordionProps,
  CategoryAccordionState
> {
  constructor(props: CategoryAccordionProps) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  changeAccordionOpen() {
    this.setState((prev) => {
      return { isOpen: !prev.isOpen };
    });
  }

  render() {
    const isOpenFromPath =
      this.props.param &&
      this.props.param.category &&
      this.props.param.breedcrumb.some(
        (i) => i.title === this.props.categoryName
      )
        ? '0'
        : '1';

    const isOpened = isOpenFromPath === '0' ? true : false;

    return (
      <Accordion
        defaultActiveKey={isOpenFromPath}
        className="categoryAccordion"
      >
        <Accordion.Toggle
          eventKey="0"
          onClick={() => this.changeAccordionOpen()}
          className={classNames('categoriesAccordionToggle', {
            active: this.state.isOpen || isOpened,
          })}
        >
          <Link href={`/blog/category/${this.props.categoryName}`}>
            <a onClick={() => this.props.changeDropdown()}>
              {this.props.categoryName}
            </a>
          </Link>
          <span>
            {this.state.isOpen || isOpened ? (
              <i className="fas fa-chevron-down"></i>
            ) : (
              <i className="fas fa-chevron-left"></i>
            )}
          </span>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <div className="categoriesAccordionCollapse">
            {this.props.children}
          </div>
        </Accordion.Collapse>
      </Accordion>
    );
  }
}

export default CategoryAccordion;

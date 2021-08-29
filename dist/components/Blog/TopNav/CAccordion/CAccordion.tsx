import classNames from 'classnames';
import Link from 'next/link';
import * as React from 'react';
import { Accordion } from 'react-bootstrap';
import ICategory from '../../../../helper/types/blog/Category';
import styles from './CAccordion.module.scss';

interface IProps {
  category: ICategory;
  categories: ICategory[];
}

interface IState {
  isOpen: boolean;
}

class CAccordion extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  render() {
    return (
      <Accordion defaultActiveKey="1">
        <Accordion.Toggle
          eventKey="0"
          className={classNames(styles.toggle, {
            [styles.open]: this.state.isOpen,
          })}
          onClick={() => this.setState({ isOpen: !this.state.isOpen })}
        >
          <Link href={`/blog/category/${this.props.category.permalink}`}>
            <a>{this.props.category.title}</a>
          </Link>
          {this.props.categories.filter(
            (category) => category.parent === this.props.category.id
          ).length > 0 && (
            <span>
              {this.state.isOpen ? (
                <i className="fas fa-chevron-down"></i>
              ) : (
                <i className="fas fa-chevron-left"></i>
              )}
            </span>
          )}
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <div className={styles.collapse}>
            {this.props.categories.some(
              (category) => category.parent === this.props.category.id
            ) &&
              this.props.categories
                .filter(
                  (category) => category.parent === this.props.category.id
                )
                .map((c) => (
                  <CAccordion
                    category={c}
                    categories={this.props.categories}
                    key={c.id}
                  />
                ))}
          </div>
        </Accordion.Collapse>
      </Accordion>
    );
  }
}

export default CAccordion;

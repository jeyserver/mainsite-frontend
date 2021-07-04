import classNames from 'classnames';
import * as React from 'react';
import { Button } from 'react-bootstrap';
import { Col, Table } from 'react-bootstrap';
import styles from './DomainOrderTable.module.scss';

export interface DomainOrderTableProps {
  roundDomains: any;
}

export interface DomainOrderTableState {}

class DomainOrderTable extends React.Component<
  DomainOrderTableProps,
  DomainOrderTableState
> {
  constructor(props: DomainOrderTableProps) {
    super(props);
    this.state = {};
  }

  addCommas(num: number) {
    let str = num.toString().split('.');
    if (str[0].length >= 5) {
      str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    if (str[1] && str[1].length >= 5) {
      str[1] = str[1].replace(/(\d{3})/g, '$1 ');
    }
    return str.join('.');
  }

  render() {
    return (
      <Col xs={12} lg={4} className={classNames(styles.orderTable, 'px-0')}>
        <img src="/images/domain/mobile.png" className="float-left mobile" />
        <h5 className={styles.tableOrderTitle}>لیست دامنه های رند</h5>
        <Table responsive bordered className={styles.table}>
          <thead>
            <tr>
              <th>دامنه</th>
              <th>هزینه ثبت</th>
              <th>سفارش</th>
            </tr>
          </thead>
          <tbody>
            {this.props.roundDomains.items.map((domain) => (
              <tr key={domain.id}>
                <td>
                  {domain.name}.{domain.tld}
                </td>
                <td>{this.addCommas(domain.new)} تومان</td>
                <td>
                  <Button>
                    <a>سفارش</a>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    );
  }
}

export default DomainOrderTable;

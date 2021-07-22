import classNames from 'classnames';
import * as React from 'react';
import { Alert, Spinner } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Col, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { formatPrice } from '../../helper/formatPrice';
import { setDomainForShop } from '../../../redux/actions';
import styles from './DomainOrderTable.module.scss';
import { domainReducerType } from '../../../redux/reducers/domainReducer';
import axios from 'axios';

export interface DomainOrderTableProps {
  roundDomains: any;
  setDomainForShop: (domain: any) => void;
  domain: domainReducerType;
}

export interface DomainOrderTableState {
  loading: boolean;
}

class DomainOrderTable extends React.Component<
  DomainOrderTableProps,
  DomainOrderTableState
> {
  constructor(props: DomainOrderTableProps) {
    super(props);
    this.state = {
      loading: false,
    };
    this.order = this.order.bind(this);
  }

  order(domain) {
    this.setState({ loading: true });

    axios(
      'https://jsonblob.com/api/jsonBlob/d3196d4f-e2e1-11eb-b284-d50b7a049077'
    )
      .then(() => {
        this.props.setDomainForShop(domain);
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  }

  render() {
    return (
      <Col xs={12} lg={4} className={classNames(styles.orderTable, 'px-0')}>
        <img src="/images/domain/mobile.png" className="float-left mobile" />
        <h5 className={styles.tableOrderTitle}>لیست دامنه های رند</h5>
        {this.props.roundDomains.items.length === 0 ? (
          <Alert variant="info" className={styles.roundDomainsNotFoundMsg}>
            به محض پیدا کردن دامنه رند، در این قسمت براتون اضافه میکنیم.
          </Alert>
        ) : (
          <div className={styles.tableWrapper}>
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
                    <td>{formatPrice(domain.new)} تومان</td>
                    <td>
                      <Button onClick={() => this.order(domain)}>
                        <a>سفارش</a>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {this.state.loading && (
              <div className={styles.loading}>
                <Spinner animation="border" size="sm" />
                <span>لطفا صبر کنید</span>
              </div>
            )}
          </div>
        )}
      </Col>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    domain: state.domain,
  };
};

export default connect(mapStateToProps, { setDomainForShop })(DomainOrderTable);

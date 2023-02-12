import classNames from 'classnames';
import * as React from 'react';
import { Alert, Spinner } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Col, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import styles from './DomainOrderTable.module.scss';
import { IRoundDomain } from '../../../pages/domain';
import { RootState } from '../../../store';
import formatPriceWithCurrency from '../../../helper/formatPriceWithCurrency';
import { setSelectedDomain } from '../../../store/Domain';
import { NextRouter, withRouter } from 'next/router';

interface IProps {
  roundDomains: IRoundDomain[];
  setSelectedDomain: typeof setSelectedDomain;
  currencies: RootState['currencies'];
  router: NextRouter;
}

interface IState {
  loading: boolean;
}

class DomainOrderTable extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  order(domain: IRoundDomain) {
    this.setState({ loading: true });

    this.props.setSelectedDomain({
      name: domain.domain.replace(/.+\/\/|www.|\..+/g, ''),
      tld: domain.tld.id,
    });

    this.props.router.push('/order/domain');
  }

  render() {
    return (
      <Col xs={12} lg={4} className={classNames(styles.orderTable, 'px-0')}>
        <img src="/images/domain/mobile.png" className="float-left mobile" />
        <h5 className={styles.tableOrderTitle}>لیست دامنه های رند</h5>
        {this.props.roundDomains.length === 0 ? (
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
                {this.props.roundDomains.map((roundDomain) => (
                  <tr key={roundDomain.domain}>
                    <td>{roundDomain.domain}</td>
                    <td>
                      {formatPriceWithCurrency(
                        this.props.currencies.items,
                        roundDomain.tld.currency,
                        roundDomain.tld.new
                      )}
                    </td>
                    <td>
                      <Button onClick={() => this.order(roundDomain)}>
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

export default connect(
  (state: RootState) => {
    return {
      currencies: state.currencies,
    };
  },
  { setSelectedDomain }
)(withRouter(DomainOrderTable));

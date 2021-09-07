import * as React from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { IPageProps } from '../../pages/_app';
import { connect } from 'react-redux';
import { setCurrencies } from '../../store/Currencies';

interface IProps extends IPageProps {
  children: React.ReactNode;
  appIsScrolling?: boolean;
  setCurrencies: typeof setCurrencies;
}

class Layout extends React.Component<IProps> {
  render() {
    this.props.setCurrencies(this.props.header.currencies);
    return (
      <React.Fragment>
        <Navbar
          appIsScrolling={this.props.appIsScrolling}
          tlds={this.props.header.tlds}
          licenses={this.props.header.licenses}
        />
        {this.props.children}
        <Footer posts={this.props.footer.posts} />
      </React.Fragment>
    );
  }
}

export default connect(null, { setCurrencies })(Layout);

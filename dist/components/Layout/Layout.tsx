import * as React from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { IFooterPost, ILicense, ITld } from '../../pages/_app';

interface IProps {
  postsForFooter: IFooterPost[];
  appIsScrolling?: boolean;
  domainsForNavbar?: ITld[];
  licensesForNavbar?: ILicense[];
}

class Layout extends React.Component<IProps> {
  render() {
    return (
      <React.Fragment>
        <Navbar
          appIsScrolling={this.props.appIsScrolling}
          tlds={this.props.domainsForNavbar}
          licenses={this.props.licensesForNavbar}
        />
        {this.props.children}
        <Footer posts={this.props.postsForFooter} />
      </React.Fragment>
    );
  }
}

export default Layout;

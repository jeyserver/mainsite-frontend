import * as React from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { FooterPost, License, Tlds } from '../../pages/_app';

interface LayoutProps {
  postsForFooter: FooterPost[];
  appIsScrolling?: boolean;
  domainsForNavbar?: Tlds;
  licensesForNavbar?: License[];
}

interface LayoutState {}

class Layout extends React.Component<LayoutProps, LayoutState> {
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

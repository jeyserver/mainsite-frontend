import * as React from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

export interface LayoutProps {
  postsForFooter: { title: string; link: string }[];
  appIsScrolling?: boolean;
  domainsForNavbar?: {
    items: {
      id: number;
      new: number;
      renew: number;
      tld: string;
      transfer: number;
    }[];
    status: boolean;
    currency: {
      title: string;
    };
  };
}

export interface LayoutState {}

class Layout extends React.Component<LayoutProps, LayoutState> {
  constructor(props: LayoutProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <Navbar
          appIsScrolling={this.props.appIsScrolling}
          domains={this.props.domainsForNavbar}
        />
        {this.props.children}
        <Footer posts={this.props.postsForFooter} />
      </React.Fragment>
    );
  }
}

export default Layout;

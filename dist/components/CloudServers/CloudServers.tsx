import * as React from 'react';
import Advantages from './Advantage/Advantages';
import CountriesServers from './CountriesServers/CountriesServers';
import Header from './Header/Header';
import Plans from './Plans/Plans';
import Price from './Price/Price';
import Faq from './Faq/Faq';

export interface CloudServersProps {}

export interface CloudServersState {}

class CloudServers extends React.Component<
  CloudServersProps,
  CloudServersState
> {
  constructor(props: CloudServersProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <Advantages />
        <CountriesServers />
        <Plans />
        <Price />
        <Faq />
      </React.Fragment>
    );
  }
}

export default CloudServers;

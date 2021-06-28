import * as React from 'react';
import Advantages from './Advantage/Advantages';
import CountriesServers from './CountriesServers/CountriesServers';
import Header from './Header/Header';
import Plans from './Plans/Plans';
import Price from './Price/Price';
import Faq from './Faq/Faq';

export interface CloudServersProps {
  plans: any;
  countries: any;
  country: string;
}

export interface CloudServersState {
  defaultPlans: any;
  specialCpu: any;
}

class CloudServers extends React.Component<
  CloudServersProps,
  CloudServersState
> {
  constructor(props: CloudServersProps) {
    super(props);
    this.state = {
      defaultPlans: this.props.plans,
      specialCpu: this.props.plans,
    };
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <Advantages />
        <CountriesServers
          country={this.props.country}
          countries={this.props.countries}
        />
        <Plans
          defaultPlans={this.state.defaultPlans}
          specialCpu={this.state.specialCpu}
          countries={this.props.countries}
          country={this.props.country}
        />
        <Price />
        <Faq />
      </React.Fragment>
    );
  }
}

export default CloudServers;

import * as React from 'react';
import Advantages from './Advantage/Advantages';
import CountriesServers from './CountriesServers/CountriesServers';
import Header from './Header/Header';
import Plans from './Plans/Plans';
import Price from './Price/Price';
import Faq from './Faq/Faq';
import { withRouter, NextRouter } from 'next/router';
import PlansLoading from './PlansLoading/PlansLoading';

export interface CloudServersProps {
  plans: any;
  countries: any;
  country: string;
  router: NextRouter;
}

export interface CloudServersState {
  defaultPlans: any;
  specialCpu: any;
  loading: boolean;
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
      loading: false,
    };
  }

  componentDidMount() {
    const handleStart = (url) =>
      url !== this.props.router.asPath && this.setState({ loading: true });
    const handleComplete = (url) =>
      url === this.props.router.asPath && this.setState({ loading: false });

    this.props.router.events.on('routeChangeStart', handleStart);
    this.props.router.events.on('routeChangeComplete', handleComplete);
    this.props.router.events.on('routeChangeError', handleComplete);
  }

  componentWillUnmount() {
    const handleStart = (url) =>
      url !== this.props.router.asPath && this.setState({ loading: true });
    const handleComplete = (url) =>
      url === this.props.router.asPath && this.setState({ loading: false });

    this.props.router.events.on('routeChangeStart', handleStart);
    this.props.router.events.on('routeChangeComplete', handleComplete);
    this.props.router.events.on('routeChangeError', handleComplete);
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
        {this.state.loading ? (
          <PlansLoading />
        ) : (
          <Plans
            defaultPlans={this.state.defaultPlans}
            specialCpu={this.state.specialCpu}
            countries={this.props.countries}
            country={this.props.country}
          />
        )}
        <Price />
        <Faq />
      </React.Fragment>
    );
  }
}

export default withRouter(CloudServers);

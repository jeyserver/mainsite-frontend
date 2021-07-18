import * as React from 'react';
import { Image, Tooltip } from 'react-bootstrap';
import { OverlayTrigger } from 'react-bootstrap';

export interface CountryFlagTooltipProps {
  name: string;
  flag: { address: string; width: number; height: number };
}

export interface CountryFlagTooltipState {}

class CountryFlagTooltip extends React.Component<
  CountryFlagTooltipProps,
  CountryFlagTooltipState
> {
  constructor(props: CountryFlagTooltipProps) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <OverlayTrigger
        overlay={<Tooltip id={`${this.props.name}`}>{this.props.name}</Tooltip>}
      >
        <Image
          src={this.props.flag.address}
          width={this.props.flag.width}
          height={this.props.flag.height}
        />
      </OverlayTrigger>
    );
  }
}

export default CountryFlagTooltip;

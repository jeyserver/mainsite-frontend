import * as React from 'react';
import { Image, Tooltip } from 'react-bootstrap';
import { OverlayTrigger } from 'react-bootstrap';

export interface CountryFlagTooltipProps {
  name: string;
  flag: { address: string; width?: number; height?: number };
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
    const { name, flag } = this.props;

    return (
      <OverlayTrigger overlay={<Tooltip id={`${name}`}>{name}</Tooltip>}>
        <Image
          src={flag.address}
          width={flag.width ? flag.width : 24}
          height={flag.height ? flag.height : 24}
        />
      </OverlayTrigger>
    );
  }
}

export default CountryFlagTooltip;

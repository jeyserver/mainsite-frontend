import * as React from 'react';
import { Image, Tooltip } from 'react-bootstrap';
import { OverlayTrigger } from 'react-bootstrap';

export interface CountryFlagTooltipProps {
  country: { name: string; code: string };
  flag?: { width?: number; height?: number };
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
    const { country, flag } = this.props;

    return (
      <OverlayTrigger
        overlay={<Tooltip id={`${country.name}`}>{country.name}</Tooltip>}
      >
        <Image
          src={`/images/flags/${country.code.toLowerCase()}.svg`}
          width={flag && flag.width ? flag.width : 24}
          height={flag && flag.height ? flag.height : 24}
        />
      </OverlayTrigger>
    );
  }
}

export default CountryFlagTooltip;

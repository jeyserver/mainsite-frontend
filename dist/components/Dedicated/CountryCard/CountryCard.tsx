import * as React from 'react';
import Link from 'next/link';
import styles from './CountryCard.module.scss';
import { countries } from '../lib/countries';

export interface CountryCardProps {
  country: { code: string; name: string };
}

export interface CountryCardState {}

class CountryCard extends React.Component<CountryCardProps, CountryCardState> {
  constructor(props: CountryCardProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={styles.pricingTable}>
        <div className={styles.pricingPrice}>
          <div className={styles.pricingTxt}>{this.props.country.name}</div>
          {countries[this.props.country.code].recommended && (
            <div className={styles.recommended}>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
            </div>
          )}
          <div className={styles.circlePrice}>
            <div>
              <img src={countries[this.props.country.code].flag} />
            </div>
          </div>
        </div>
        <ul className={styles.ulPricing}>
          <li className={styles.liPricing}>
            <p className={styles.pPricing}>
              سرور اختصاصی {countries[this.props.country.code].title_fa}
            </p>
          </li>
          <li className={styles.liPricing}>
            <p className={styles.pPricing}>
              {countries[this.props.country.code].info}
            </p>
          </li>
        </ul>
        <Link href={countries[this.props.country.code].link}>
          <a className={styles.link}>لیست محصولات </a>
        </Link>
      </div>
    );
  }
}

export default CountryCard;

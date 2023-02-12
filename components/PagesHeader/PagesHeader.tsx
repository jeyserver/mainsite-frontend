import * as React from 'react';
import { Container } from 'react-bootstrap';
import styles from './PagesHeader.module.scss';

export interface PagesHeaderProps {
  title: string;
}

export interface PagesHeaderState {}

class PagesHeader extends React.Component<PagesHeaderProps, PagesHeaderState> {
  constructor(props: PagesHeaderProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={styles.innerBanner}>
        <Container>
          <h2>{this.props.title}</h2>
        </Container>
      </div>
    );
  }
}

export default PagesHeader;

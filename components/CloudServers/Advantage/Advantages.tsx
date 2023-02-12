import React from 'react';
import { Image, Container, Row, Col } from 'react-bootstrap';
import styles from './Advantages.module.scss';
import getAllAdvantages from './lib/advantages';

export interface AdvantagesProps {}

export interface AdvantagesState {}

class Advantages extends React.Component<AdvantagesProps, AdvantagesState> {
  constructor(props: AdvantagesProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container as="section" className={styles.advantages}>
        <Row>
          <Col>
            {getAllAdvantages().map((advantage) => (
              <div
                key={advantage.id}
                className={`${styles.advantage} ${
                  advantage.imagePosition === 'left'
                    ? styles.left
                    : styles.right
                }`}
              >
                <div
                  style={
                    advantage.imagePosition === 'left'
                      ? { paddingLeft: '80px' }
                      : { paddingRight: '80px' }
                  }
                  className={`${styles.wrapper} ${styles.textWrapper}`}
                >
                  <h2>{advantage.title}</h2>
                  <p dir="rtl">{advantage.description}</p>
                </div>
                <div className={`${styles.wrapper} ${styles.imgWrapper}`}>
                  <Image src={advantage.image} alt="" />
                </div>
              </div>
            ))}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Advantages;

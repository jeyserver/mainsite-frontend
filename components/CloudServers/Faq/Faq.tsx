import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Question from '../Question/Question';
import styles from './Faq.module.scss';

const Faq = () => {
  return (
    <section>
      <Container className={styles.frequentQuestion}>
        {/* Title */}
        <div className={styles.title}>
          <h2>سوالات متداول</h2>
        </div>
        {/* Questions */}
        <Row>
          <Col xs={12}>
            {Array(4)
              .fill({
                title: 'حجم های پلن های cloud جی سرور چقدر است؟',
                answer:
                  'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان',
              })
              .map((question, index) => (
                <Question
                  key={index}
                  index={index}
                  title={question.title}
                  answer={question.answer}
                />
              ))}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Faq;

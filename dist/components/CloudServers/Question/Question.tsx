import React, { useState } from 'react'
import { Accordion, Card } from 'react-bootstrap'
import styles from './Question.module.scss'

export interface QuestionProps {
  index: number
  title: string
  answer: string
}

export interface QuestionState {
  isOpen: boolean
}

class Question extends React.Component<QuestionProps, QuestionState> {
  constructor(props: QuestionProps) {
    super(props)
    this.state = { isOpen: false }
    this.showQuestion = this.showQuestion.bind(this)
  }

  showQuestion() {
    this.setState((prev) => {
      return {
        isOpen: !prev.isOpen,
      }
    })
  }

  render() {
    return (
      <Accordion>
        <Card className={styles.questionWrapper}>
          <Card.Header className={styles.cardHeader}>
            <Accordion.Toggle
              className={`${styles.question} ${
                this.state.isOpen ? styles.active : ''
              }`}
              as="div"
              eventKey={`${this.props.index}`}
              dir="rtl"
              onClick={this.showQuestion}
            >
              {this.props.title}
              <i
                className={`${
                  this.state.isOpen
                    ? 'fas fa-chevron-circle-down fa-chevron-circle-up fa-lg'
                    : 'fas fa-chevron-circle-down fa-lg'
                }`}
              />
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={`${this.props.index}`}>
              <Card.Body className={styles.cardBody}>
                <p>{this.props.answer}</p>
              </Card.Body>
            </Accordion.Collapse>
          </Card.Header>
        </Card>
      </Accordion>
    )
  }
}

export default Question

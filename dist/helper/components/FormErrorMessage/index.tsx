import * as React from 'react';
import { Form } from 'react-bootstrap';
import showErrorMsg from '../../showErrorMsg';
import IError from '../../types/base/error';

interface IProps {
  errors: IError[];
  input: string;
}

class FormErrorMessage extends React.Component<IProps> {
  render() {
    const error = this.props.errors.find(
      (error) => error.input === this.props.input
    );
    return (
      <Form.Control.Feedback type="invalid">
        {error ? showErrorMsg(error.code) : 'داده وارد شده معتبر نیست'}
      </Form.Control.Feedback>
    );
  }
}

export default FormErrorMessage;

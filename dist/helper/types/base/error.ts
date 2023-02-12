interface IError {
  code: 'data_validation' | 'data_duplicate';
  message: string;
  type: 'success' | 'warning' | 'fatal' | 'notice';
  input: string;
  error: string;
}

export default IError;

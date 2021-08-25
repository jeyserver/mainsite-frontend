type Error = 'data_validation' | 'data_duplicate';

const showErrorMsg = (error: Error) => {
  if (error === 'data_duplicate') {
    return 'داده وارد شده تکراری است';
  } else if (error === 'data_validation') {
    return 'داده وارد شده معتبر نیست';
  }
};

export default showErrorMsg;

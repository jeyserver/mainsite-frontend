const translateCountryNameToPersian = (code) => {
  switch (code) {
    case 'FR':
      return 'فرانسه';
    case 'DE':
      return 'آلمان';
    case 'IR':
      return 'ایران';
    case 'FI':
      return 'فنلاند';
    case 'US':
      return 'آمریکا';
    default:
      return '';
  }
};

export default translateCountryNameToPersian;

const translateCountryNameToPersian = (code) => {
  switch (code) {
    case 'FR':
      return 'فرانسه';
    case 'DE':
      return 'آلمان';
    case 'IR':
      return 'ایران';
    default:
      return '';
  }
};

export default translateCountryNameToPersian;

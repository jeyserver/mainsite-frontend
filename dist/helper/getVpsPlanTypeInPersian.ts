const getVpsPlanTypeInPersian = (title) => {
  if (title.search('اقتصادی') > -1) {
    return 'اقتصادی';
  } else if (title.search('حرفه ای') > -1) {
    return 'حرفه ای';
  } else if (title.search('حجیم') > -1) {
    return 'حجیم';
  } else {
    return '';
  }
};

export default getVpsPlanTypeInPersian;

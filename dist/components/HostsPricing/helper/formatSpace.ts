export const formatSpace = (size, lang: 'persian' | 'english') => {
  if (!size) {
    return '0';
  }
  const persianSizeUnits = ['مگابایت', 'گیگابایت', 'ترابایت'];
  const englishSizeUnits = ['MB', 'GB', 'TB'];

  const sizeUnits = lang === 'persian' ? persianSizeUnits : englishSizeUnits;
  let calc = Math.floor(Math.log(size) / Math.log(1024));
  calc = Math.min(Math.max(0, calc), sizeUnits.length - 1);
  const sizeNew = Math.round((size / Math.pow(1024, calc)) * 100) / 100;
  return sizeNew + ' ' + sizeUnits[calc];
};

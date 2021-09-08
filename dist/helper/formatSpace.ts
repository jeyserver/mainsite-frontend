export const formatSpaceInEnglish = (size, decimals = 2) => {
  if (size == 0) return '';

  var k = 1000,
    dm = decimals || 2,
    sizes = ['MB', 'GB', 'TB'],
    i = Math.floor(Math.log(size * 1000) / Math.log(k));
  return (
    parseFloat(((size * 1000) / Math.pow(k, i)).toFixed(dm)) + '' + sizes[i]
  );
};

export const formatSpaceInPersian = (size, decimals = 2) => {
  if (size === 0) return '';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['مگابایت', 'گیگابایت', 'ترابایت'];

  const i = Math.floor(Math.log(size) / Math.log(k));

  return parseFloat((size / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export const formatSpace = (size: number, lang: 'fa' | 'en', si = false) => {
  if (size === 0) return '0';
  const thresh = si ? 1000 : 1024;
  const sizes =
    lang === 'fa' ? ['مگابایت', 'گیگابایت', 'ترابایت'] : ['MB', 'GB', 'TB'];

  const i = Math.floor(Math.log(size) / Math.log(thresh));

  return Math.round(size / Math.pow(thresh, i)) + sizes[i];
};

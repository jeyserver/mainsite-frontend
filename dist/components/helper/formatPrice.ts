export const formatPrice = (addad: number) => {
  return addad.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

export const formatDecimalNumber = (addad: number) => {
  const split = addad.toString().split('.');
  const int = parseInt(split[0].toString().replace(/\D/g, ''), 10);
  const number = isNaN(int)
    ? 0
    : int.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  const decimal =
    split.length > 1 ? split[1].toString().replace(/\D/g, '') : '';
  const javab = number + (decimal.length ? '.' + decimal : '');

  return javab;
};

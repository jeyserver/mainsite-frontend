enum PP {
  Lifetime,
  Daily,
  Monthly,
  Yearly,
}

const getPlanPP = (pp) => {
  switch (pp) {
    case PP.Lifetime:
      return 'ابدی';
    case PP.Daily:
      return 'روزانه';
    case PP.Monthly:
      return 'ماهیانه';
    case PP.Yearly:
      return 'سالیانه';
    default:
      return '';
  }
};

export default getPlanPP;

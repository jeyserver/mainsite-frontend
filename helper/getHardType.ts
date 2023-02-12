enum HardType {
  SATA = 1,
  SSD = 2,
  SAS = 3,
}

const getHardType = (hardtype: HardType) => {
  switch (hardtype) {
    case HardType.SATA:
      return 'SATA';
    case HardType.SSD:
      return 'SSD';
    case HardType.SAS:
      return 'SAS';
    default:
      return '';
  }
};

export default getHardType;

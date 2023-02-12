import { formatSpaceInEnglish } from './formatSpace';

export const formatHards = (hardsData) => {
  let allHards = [];
  let onSells = [];
  let hards = [];

  hardsData.forEach((hardPack) => {
    allHards = allHards.concat(hardPack);
  });

  allHards.forEach((hard) => {
    if (hard.onsell === true) {
      onSells = [...onSells, hard];
    }
  });

  onSells.forEach((hard) => {
    if (hard) {
      const hardIndex = hards.findIndex((i) => i.type === hard.type);
      if (hardIndex > -1) {
        hards[hardIndex] = {
          ...hards[hardIndex],
          number: hards[hardIndex].number + 1,
        };
      } else {
        hards = [...hards, { ...hard, number: 1 }];
      }
    }
  });

  return hards.map((hard) => {
    if (hard.number === 1) {
      return `${hard.type}`;
    } else {
      return `${hard.number}x${formatSpaceInEnglish(hard.space)} ${hard.type}`;
    }
  });
};

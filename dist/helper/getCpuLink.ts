const getCpuLink = (cpuTitle: string) => {
  if (cpuTitle.toLowerCase().lastIndexOf('intel') === 0) {
    return `https://ark.intel.com/search/?_charset_=UTF-8&q=${encodeURI(
      cpuTitle
    )}`;
  }
  if (cpuTitle.toLowerCase().lastIndexOf('amd') === 0) {
    return `https://www.amd.com/en/search?keyword=${encodeURI(cpuTitle)}`;
  }
  return null;
};

export default getCpuLink;

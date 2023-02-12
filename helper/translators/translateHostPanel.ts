const translateHostPanel = (panel) => {
  switch (panel) {
    case 'cpanel':
      return 'سی پنل';
    case 'directadmin':
      return 'دایرکت ادمین';
    case 'websitepanel':
      return 'وبسایت پنل';
    default:
      return '';
  }
};

export default translateHostPanel;

type licenses = 'directadmin' | 'cpanel' | 'litespeed' | 'whmcs' | 'cloudlinux';

export const renderPageTitle = (license: licenses) => {
  switch (license) {
    case 'directadmin':
      return 'دایرکت ادمین';
    case 'cpanel':
      return 'سی پنل';
    case 'litespeed':
      return 'لایت اسپید';
    case 'whmcs':
      return 'WHMCS';
    case 'cloudlinux':
      return 'کلود لینوکس';
  }
};

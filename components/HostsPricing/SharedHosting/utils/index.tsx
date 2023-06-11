import Link from 'next/link';
import styles from '../../PageInfoStyles.module.scss';
import { Dropdown } from 'react-bootstrap';
import hosts from '../../../../lib/products/host';

type os = 'windows' | 'linux';
type planType = 'standard' | 'professional';
export type page = `${os}_${planType}`;

export const getPageForHeader = (type: page) => {
  switch (type) {
    case 'linux_professional':
      return 'هاست لینوکس حرفه ای';
    case 'linux_standard':
      return 'هاست لینوکس معمولی';
    case 'windows_professional':
      return 'هاست ویندوز حرفه ای';
    case 'windows_standard':
      return 'هاست ویندوز معمولی';
    default:
      return '';
  }
};

export const getPageInfo = (type: page) => {
  switch (type) {
    case 'linux_professional':
      return (
        <div>
          <p></p>
          <p>
            در هاست لینوکس حرفه ای ما شما میتوانید سایت پر بازدید خود را پرورش
            دهید ما در کنار شما هستیم
          </p>
          <p>
            در لینوکس حرفه ای شما میتوانید اکثر برنامه ها و اسکریپت ها نصب و راه
            اندازی کنید و برای راه اندازی گالری های تصاویر سایت های
            خبری،تفریحی،فروشگاهی،تالار های گفتمان سایت های ورزشی و انواع دیگر
            بسیار مناسب است
          </p>
          <div className={styles.notice}>
            <div className={styles.alert}>
              <strong>توجه فرمائید</strong> که قرار داد شما در هر لحظه قابل
              انصراف است و ما در لحظه انصراف هزینه باقی مانده سرویس شمارا به شما
              بازپس خواهیم داد.این تضمین ما برای جلب رضایت شماست
            </div>
          </div>
          <p>
            ما از وب سایت شما هر 24 ساعت نسخه ای پشتیبان تهیه میکنیم و بر روی
            نقاط دیگری از جهان ذخیره نگه داری میکنیم تا هیچوقت شما و ما نگران
            آسیب به اطلاعات نباشیم.
          </p>
          <p>
            همچنین ما با سیستم های پیشرفته مانیتورینگمان ثانیه به ثانیه وب سایت
            شمارا زیر نظر داریم تا در سریع ترین زمان هر مشکلی را به تجربه تبدیل
            کنیم.
          </p>
          <p>
            ما امنیت شمارا با آنتی ویروس معروف{' '}
            <a href="http://kb.jeyserver.com/fa/servers/softwares/clamav">
              ClamAv
            </a>{' '}
            تامین میکنیم وهارد های سرورمان را به کمک تکنولوژی{' '}
            <a href="http://kb.jeyserver.com/fa/servers/raid">RIAD</a>{' '}
            <a href="http://kb.jeyserver.com/fa/servers/raid#raid1">1</a> آیینه
            یک دیگر میکنیم تا علاوه بر سرعت امنیت اطلاعاتتان نیز حفظ شود
          </p>
          <p>
            ما در هاست های لینوکس به شما اجازه میدهیم تا از زبان برنامه نویسی{' '}
            <a href="http://kb.jeyserver.com/fa/servers/softwares/php">PHP</a> و
            پایگاه داده{' '}
            <a href="http://kb.jeyserver.com/fa/servers/softwares/mysql">
              Mysql
            </a>{' '}
            استفاده کنید و تنظیمات سرورمان را به نحوی انجام میدهیم تا بتوانید
            تمامی اسکریپت های استاندارد را اجرا کنید.
          </p>
          <p>&nbsp;</p> <p />
        </div>
      );
    case 'linux_standard':
      return (
        <div>
          <p></p>
          <p>
            در این نوع هاست وب سایت هایی میزبانی میشوند که از بازدید زیادی
            برخوردار نیستند و مناسب سایت های شخصی،شرکتی،آموزشی و...میباشند.
          </p>
          <p>
            درصورتی که سایت پربازدیدی دارید حتما از صفحه{' '}
            <Link href="/hosting/linux/professional">
              هاست حرفه ای لینوکس
            </Link>{' '}
            بازدید بفرمائید
          </p>
          <p>&nbsp;</p>
          <p>
            هاست های لینوکس جی سرور با استفاده از بروز ترین نرم افزار ها و
            بهترین سخت افزار سریع،ایمن و پایدارند.سرورها در باکیفیت ترین
            دیتاسنتر های جهان قرار داند و ما مرتبا تمامی سرورهایمان را مانیتور
            میکنیم تا از بهترین بازدهی آن ها مطمئن بشویم.
          </p>
          <div className={styles.notice}>
            <div className={styles.alert}>
              <strong>توجه فرمائید</strong> که قرار داد شما در هر لحظه قابل
              انصراف است و ما در لحظه انصراف هزینه باقی مانده سرویس شمارا به شما
              بازپس خواهیم داد.این تضمین ما برای جلب رضایت شماست
            </div>
          </div>
          <p>
            ما از تمامی اطلاعات خودمان و شما بصورت مرتب پشتیبانگیری میکنیم و در
            سرور های مخصوصی در سرتاسر جهان ذخیره میکنیم تا مطمئن شویم هیچ خطری
            در کمین ما نیست! بله ما معتقدیم برای رضایت شما هر هزینه ای لازم است
          </p>
          <p>
            ما امنیت شمارا با آنتی ویروس معروف{' '}
            <a href="http://kb.jeyserver.com/fa/servers/softwares/clamav">
              ClamAv
            </a>{' '}
            تامین میکنیم وهارد های سرورمان را به کمک تکنولوژی{' '}
            <a href="http://kb.jeyserver.com/fa/servers/raid">RIAD</a>{' '}
            <a href="http://kb.jeyserver.com/fa/servers/raid#raid1">1</a> آیینه
            یک دیگر میکنیم تا علاوه بر سرعت امنیت اطلاعاتتان نیز حفظ شود
          </p>
          <p>
            ما در هاست های لینوکس به شما اجازه میدهیم تا از زبان برنامه نویسی{' '}
            <a href="http://kb.jeyserver.com/fa/servers/softwares/php">PHP</a> و
            پایگاه داده{' '}
            <a href="http://kb.jeyserver.com/fa/servers/softwares/mysql">
              Mysql
            </a>{' '}
            استفاده کنید و تنظیمات سرورمان را به نحوی انجام میدهیم تا بتوانید
            تمامی اسکریپت های استاندارد را اجرا کنید.
          </p>
          <p>&nbsp;</p> <p />
        </div>
      );
    case 'windows_professional':
      return (
        <div>
          <p></p>
          <p>
            هاست ویندوز بیشتر مناسب برنامه نویسان و توسعه دهندگانی است که از
            پروژه های{' '}
            <a href="http://kb.jeyserver.com/fa/servers/softwares/asp.net">
              Asp.NET
            </a>{' '}
            و پایگاه های داده{' '}
            <a href="http://kb.jeyserver.com/fa/servers/softwares/mssql">
              MsSql
            </a>{' '}
            استفاده میکنند.
          </p>
          <p>&nbsp;</p>
          <p>
            در هاست ویندوز جی سرور تمامی کامپوننت ها مورد نیازبرای یک توسعه و
            برنامه نویسی شیرین آماده شده و همه برنامه ها بصورت قانونی خریداری
            شده اند.
          </p>
          <p>
            ما از تمامی اطلاعات خودمان و شما بصورت مرتب پشتیبانگیری میکنیم و در
            سرور های مخصوصی در سرتاسر جهان ذخیره میکنیم تا مطمئن شویم هیچ خطری
            در کمین ما نیست! بله ما معتقدیم برای رضایت شما هر هزینه ای لازم است
          </p>
          <p>&nbsp;</p>
          <div className={styles.notice}>
            <div className={styles.alert}>
              <strong>توجه فرمائید</strong> که قرار داد شما در هر لحظه قابل
              انصراف است و ما در لحظه انصراف هزینه باقی مانده سرویس شمارا به شما
              بازپس خواهیم داد.این تضمین ما برای جلب رضایت شماست
            </div>
          </div>
          <p>&nbsp;</p> <p />
        </div>
      );
    case 'windows_standard':
      return (
        <div>
          <p></p>
          <p>
            هاست ویندوز بیشتر مناسب برنامه نویسان و توسعه دهندگانی است که از
            پروژه های{' '}
            <a href="http://kb.jeyserver.com/fa/servers/softwares/asp.net">
              Asp.NET
            </a>{' '}
            و پایگاه های داده{' '}
            <a href="http://kb.jeyserver.com/fa/servers/softwares/mssql">
              MsSql
            </a>{' '}
            استفاده میکنند.
          </p>
          <p>
            درصورتی که سایت پربازدیدی دارید حتما از صفحه{' '}
            <a href="/fa/hosting/windows/professional">هاست حرفه ای ویندوز</a>{' '}
            بازدید بفرمائید
          </p>
          <p>&nbsp;</p>
          <div className={styles.notice}>
            <div className={styles.alert}>
              <strong>توجه فرمائید</strong> که قرار داد شما در هر لحظه قابل
              انصراف است و ما در لحظه انصراف هزینه باقی مانده سرویس شمارا به شما
              بازپس خواهیم داد.این تضمین ما برای جلب رضایت شماست
            </div>
          </div>
          <p>
            در هاست ویندوز جی سرور تمامی کامپوننت ها مورد نیازبرای یک توسعه و
            برنامه نویسی شیرین آماده شده و همه برنامه ها بصورت قانونی خریداری
            شده اند.
          </p>
          <p>
            ما از تمامی اطلاعات خودمان و شما بصورت مرتب پشتیبانگیری میکنیم و در
            سرور های مخصوصی در سرتاسر جهان ذخیره میکنیم تا مطمئن شویم هیچ خطری
            در کمین ما نیست! بله ما معتقدیم برای رضایت شما هر هزینه ای لازم است
          </p>
          <p>&nbsp;</p> <p />
        </div>
      );
    default:
      return '';
  }
};

export const getScrollTopForFixNav = (type: page) => {
  switch (type) {
    case 'linux_professional':
      return 600;
    case 'linux_standard':
      return 685;
    case 'windows_professional':
      return 600;
    case 'windows_standard':
      return 590;
    default:
      return '';
  }
};

const scrollToTargetElement = (appIsScrollingFunction) => {
  appIsScrollingFunction();
};

export const renderTopNav = (
  type: page,
  appIsScrollingFunction?: () => void
) => {
  switch (type) {
    case 'linux_professional':
      return (
        <ul className={styles.nav}>
          {hosts.professional_linux_shared_hosts.map((host) => (
            <li key={host.title} data-main="true">
              <a
                href={`#${host.link}`}
                onClick={(e) => scrollToTargetElement(appIsScrollingFunction)}
              >
                هاست اشتراکی حرفه ای {host.title}
              </a>
            </li>
          ))}
          <li>
            <Dropdown className={styles.dropdown}>
              <Dropdown.Toggle className={styles.dropdownToggle}>
                هاست اشتراکی لینوکس ساده
              </Dropdown.Toggle>
              <Dropdown.Menu className={styles.dropdownMenu} align="right">
                {hosts.standard_linux_shared_hosts.map((host) => (
                  (<Link
                    key={host.link}
                    href={`/hosting/linux/standard#${host.link}`}
                  >
                    هاست اشتراکی ساده{host.title}
                  </Link>)
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </li>
          <li>
            <Dropdown className={styles.dropdown}>
              <Dropdown.Toggle className={styles.dropdownToggle}>
                هاست نیمه اختصاصی
              </Dropdown.Toggle>
              <Dropdown.Menu className={styles.dropdownMenu} align="right">
                {hosts.linux_vps_hosts.map((host) => (
                  (<Link
                    key={host.link}
                    href={`/hosting/linux/vps#${host.link}`}
                  >
                    هاست نیمه اختصاصی{host.title}
                  </Link>)
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </li>
          <li>
            <Link href="/hosting/linux/dedicated">
              هاست اختصاصی
            </Link>
          </li>
        </ul>
      );
    case 'linux_standard':
      return (
        <ul className={styles.nav}>
          {hosts.standard_linux_shared_hosts.map((host) => (
            <li key={host.title} data-main="true">
              <a
                href={`#${host.link}`}
                onClick={() => scrollToTargetElement(appIsScrollingFunction)}
              >
                هاست اشتراکی ساده {host.title}
              </a>
            </li>
          ))}
          <li>
            <Dropdown className={styles.dropdown}>
              <Dropdown.Toggle className={styles.dropdownToggle}>
                هاست اشتراکی لینوکس حرفه ای
              </Dropdown.Toggle>
              <Dropdown.Menu className={styles.dropdownMenu} align="right">
                {hosts.professional_linux_shared_hosts.map((host) => (
                  (<Link
                    key={host.link}
                    href={`/hosting/linux/professional#${host.link}`}
                  >
                    هاست اشتراکی حرفه ای{host.title}
                  </Link>)
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </li>
          <li>
            <Dropdown className={styles.dropdown}>
              <Dropdown.Toggle className={styles.dropdownToggle}>
                هاست نیمه اختصاصی
              </Dropdown.Toggle>
              <Dropdown.Menu className={styles.dropdownMenu} align="right">
                {hosts.linux_vps_hosts.map((host) => (
                  (<Link
                    key={host.link}
                    href={`/hosting/linux/vps#${host.link}`}
                  >
                    هاست نیمه اختصاصی{host.title}
                  </Link>)
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </li>
          <li>
            <Link href="/hosting/linux/dedicated">
              هاست اختصاصی
            </Link>
          </li>
        </ul>
      );
    case 'windows_professional':
      return (
        <ul className={styles.nav}>
          {hosts.professional_windows_shared_hosts.map((host) => (
            <li key={host.title} data-main="true">
              <a
                href={`#${host.link}`}
                onClick={() => scrollToTargetElement(appIsScrollingFunction)}
              >
                هاست اشتراکی حرفه ای ویندوز {host.title}
              </a>
            </li>
          ))}
          <li>
            <Dropdown className={styles.dropdown}>
              <Dropdown.Toggle className={styles.dropdownToggle}>
                هاست اشتراکی لینوکس ساده
              </Dropdown.Toggle>
              <Dropdown.Menu className={styles.dropdownMenu} align="right">
                {hosts.standard_linux_shared_hosts.map((host) => (
                  (<Link
                    key={host.link}
                    href={`/hosting/linux/standard#${host.link}`}
                  >
                    هاست اشتراکی ساده{host.title}
                  </Link>)
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </li>
          <li>
            <Dropdown className={styles.dropdown}>
              <Dropdown.Toggle className={styles.dropdownToggle}>
                هاست اشتراکی لینوکس حرفه ای
              </Dropdown.Toggle>
              <Dropdown.Menu className={styles.dropdownMenu} align="right">
                {hosts.professional_linux_shared_hosts.map((host) => (
                  (<Link
                    key={host.link}
                    href={`/hosting/linux/professional#${host.link}`}
                  >
                    هاست اشتراکی حرفه ای{host.title}
                  </Link>)
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </li>
          <li>
            <Dropdown className={styles.dropdown}>
              <Dropdown.Toggle className={styles.dropdownToggle}>
                هاست نیمه اختصاصی
              </Dropdown.Toggle>
              <Dropdown.Menu className={styles.dropdownMenu} align="right">
                {hosts.linux_vps_hosts.map((host) => (
                  (<Link
                    key={host.link}
                    href={`/hosting/linux/vps#${host.link}`}
                  >
                    هاست نیمه اختصاصی{host.title}
                  </Link>)
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </li>
        </ul>
      );
    case 'windows_standard':
      return (
        <ul className={styles.nav}>
          {hosts.standard_windows_shared_hosts.map((host) => (
            <li key={host.title} data-main="true">
              <a
                href={`#${host.link}`}
                onClick={() => scrollToTargetElement(appIsScrollingFunction)}
              >
                هاست اشتراکی ساده {host.title}
              </a>
            </li>
          ))}
          <li>
            <Dropdown className={styles.dropdown}>
              <Dropdown.Toggle className={styles.dropdownToggle}>
                هاست اشتراکی لینوکس ساده
              </Dropdown.Toggle>
              <Dropdown.Menu className={styles.dropdownMenu} align="right">
                {hosts.standard_linux_shared_hosts.map((host) => (
                  (<Link
                    key={host.link}
                    href={`/hosting/linux/professional#${host.link}`}
                  >
                    هاست اشتراکی ساده{host.title}
                  </Link>)
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </li>
          <li>
            <Dropdown className={styles.dropdown}>
              <Dropdown.Toggle className={styles.dropdownToggle}>
                هاست اشتراکی لینوکس حرفه ای
              </Dropdown.Toggle>
              <Dropdown.Menu className={styles.dropdownMenu} align="right">
                {hosts.professional_linux_shared_hosts.map((host) => (
                  (<Link
                    key={host.link}
                    href={`/hosting/linux/professional#${host.link}`}
                  >
                    هاست اشتراکی حرفه ای{host.title}
                  </Link>)
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </li>
          <li>
            <Dropdown className={styles.dropdown}>
              <Dropdown.Toggle className={styles.dropdownToggle}>
                هاست نیمه اختصاصی
              </Dropdown.Toggle>
              <Dropdown.Menu className={styles.dropdownMenu} align="right">
                {hosts.linux_vps_hosts.map((host) => (
                  (<Link
                    key={host.link}
                    href={`/hosting/linux/vps#${host.link}`}
                  >
                    هاست نیمه اختصاصی{host.title}
                  </Link>)
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </li>
        </ul>
      );
    default:
      return '';
  }
};

export const getPage = (type: page) => {
  switch (type) {
    case 'linux_professional':
      return 'لینوکس حرفه ای';
    case 'linux_standard':
      return 'لینوکس ساده';
    case 'windows_professional':
      return 'ویندوز حرفه ای';
    case 'windows_standard':
      return 'ویندوز معمولی';
    default:
      return '';
  }
};

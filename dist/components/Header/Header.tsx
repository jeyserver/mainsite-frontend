import Link from 'next/link';
import styles from './Header.module.scss';
import Slider from 'react-slick';
import { useEffect, useState } from 'react';
import OVHBanner from './OVHBanner/OVHBanner';

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return windowSize;
}

function NextArrow(props) {
  const { className, style, onClick } = props;

  return (
    <div
      className={`${className} ${styles.customArrow}`}
      style={{ ...style }}
      onClick={onClick}
    >
      <i className="fas fa-chevron-left"></i>
    </div>
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;

  return (
    <div
      className={`${className} ${styles.customArrow}`}
      style={{ ...style }}
      onClick={onClick}
    >
      <i className="fas fa-chevron-right"></i>
    </div>
  );
}

const Header = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const size = useWindowSize();

  useEffect(() => {
    let activeSlide = document.querySelectorAll(
      `.slick-slide[data-index="${selectedIndex}"]`
    )[0] as HTMLDivElement;
    let slickList = document.querySelectorAll(
      '.slick-list'
    )[0] as HTMLDivElement;
    slickList.style.height = `${activeSlide.clientHeight}px`;
  }, [size, selectedIndex]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: true,
    autoplay: false,
    autoplaySpeed: 5000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (a, b) => {
      let activeSlide = document.querySelectorAll(
        `.slick-slide[data-index="${b}"]`
      )[0] as HTMLDivElement;
      const slickList = document.querySelectorAll(
        '.slick-list'
      )[0] as HTMLDivElement;
      slickList.style.height = `${activeSlide.clientHeight}px`;
      setSelectedIndex(b);
    },
  };

  return (
    <header className={styles.header}>
      <Slider {...settings}>
        <div className="position-relative overflow-hidden target-slide-box">
          <div className="slide" id="slide-hosts-auto-backuping">
            <div className="text-center text-container">
              <h2 className="fnt-35 text-bold text-white">بکاپ اتوماتیک</h2>
              <h3 className="fnt-16 text-bold text-yellow">
                امنیت اطلاعات سازمان خود را بیمه کنید
              </h3>
              <a
                href="/fa/hosting/linux/professional"
                className="btn bg-yellow text-white fnt-16"
              >
                <i className="fa fa-rocket" aria-hidden="true"></i>
                خرید هاست میزبانی
              </a>
            </div>
            <div className="images">
              <img src="/images/cload.png" alt="بکاپگیری اتوماتیک" />
              <img src="/images/laptop.png" alt="بکاپ اتوماتیک" />
            </div>
          </div>
        </div>
        <div className="position-relative overflow-hidden target-slide-box">
          <div className={styles.realSharedHostingBG}></div>
          <div className={styles.sharedHostingCaption}>
            <div>
              <h3>هاست اشتراکی لینوکس</h3>
              <h4>ایده آل برای تازه وارد ها</h4>
              <p>نصاب یک کلیکی وردپرس و بازیابی بک‌آپ ها بصورت خودکار</p>
              <div className={styles.btns}>
                <Link href="/fa/hosting/linux/professional">
                  <a className={styles.professionalLink}>
                    <span>برای حرفه ای ها </span>
                    <i className="fas fa-user-secret"></i>
                  </a>
                </Link>
                <Link href="/fa/hosting/linux/standard">
                  <a className={styles.newcomersLink}>
                    <span>برای تازه وارد‌ها</span>
                    <i className="far fa-hand-point-up"></i>
                  </a>
                </Link>
              </div>
            </div>
            <div className={styles.robotImgWrapper}>
              <img src="/images/robot.png" alt="نصب خودکار سیستم عامل ها" />
            </div>
          </div>
        </div>
        <div className="position-relative overflow-hidden target-slide-box">
          <div className={styles.deliveryVirtualServersBG}></div>
          <div className={styles.deliveryVirtualServersCaption}>
            <div className={styles.captionWrapper}>
              <h3>تحویل آنی سرور های مجازی</h3>
              <ul>
                <li>
                  <i className="fas fa-check-square"></i>
                  <span>نصب خودکار تمام نسخه های CentOS ، Ubuntu ، Debian</span>
                </li>
                <li>
                  <i className="fas fa-check-square"></i>
                  <span> نصب دستی و سفارشی توسط شما</span>
                </li>
                <li>
                  <i className="fas fa-check-square"></i>
                  <span>نصب هر سیستم عامل دلخواه دیگر</span>
                </li>
                <li>
                  <i className="fas fa-check-square"></i>
                  <span>دسترسی VNC</span>
                </li>
              </ul>
              <Link href="/fa/server/vps">
                <a className={styles.linkBuyVirtualServers}>
                  <i className="far fa-hand-point-up"></i>
                  <span> خرید یک سرور مجازی جدید</span>
                </a>
              </Link>
            </div>
            <div className={styles.robotImgWrapper}>
              <img src="/images/robot-2.png" className={styles.robotImg} />
            </div>
          </div>
        </div>
        <div className="position-relative overflow-hidden target-slide-box">
          <OVHBanner />
        </div>
      </Slider>
    </header>
  );
};

export default Header;

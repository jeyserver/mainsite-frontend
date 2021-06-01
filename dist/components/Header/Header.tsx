import {
  faCheckSquare,
  faChevronLeft,
  faChevronRight,
  faHandPointUp,
  faRocket,
  faUserSecret,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { Carousel } from 'react-bootstrap';
import styles from './Header.module.scss';
import Slider from 'react-slick';
import { useEffect, useState } from 'react';

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
      <FontAwesomeIcon icon={faChevronLeft} width={18} />
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
      <FontAwesomeIcon icon={faChevronRight} width={18} />
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
    <header>
      <Slider {...settings}>
        <div className="position-relative overflow-hidden target-slide-box">
          <img
            className={styles.backupSlideBG}
            src="/images/upload-bg.png"
            alt="First slide"
          />
          <div className={styles.backupSlideCaption}>
            <div>
              <h3>بکاپ اتوماتیک</h3>
              <p>امنیت اطلاعات سازمان خود را بیمه کنید</p>
              <Link href="/fa/hosting/linux/professional">
                <a>
                  <span>خرید هاست میزبانی</span>
                  <FontAwesomeIcon icon={faRocket} />
                </a>
              </Link>
            </div>
            <img
              src="/images/cload.png"
              alt="بکاپگیری اتوماتیک"
              className={styles.cloadImg}
            />
            <img
              src="/images/laptop.png"
              alt="بکاپ اتوماتیک"
              className={styles.laptopImg}
            />
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
                    <FontAwesomeIcon icon={faUserSecret} />
                  </a>
                </Link>
                <Link href="/fa/hosting/linux/standard">
                  <a className={styles.newcomersLink}>
                    <span>برای تازه وارد‌ها</span>
                    <FontAwesomeIcon icon={faHandPointUp} />
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
                  <FontAwesomeIcon icon={faCheckSquare} width="12" />
                  <span>نصب خودکار تمام نسخه های CentOS ، Ubuntu ، Debian</span>
                </li>
                <li>
                  <FontAwesomeIcon icon={faCheckSquare} width="12" />
                  <span> نصب دستی و سفارشی توسط شما</span>
                </li>
                <li>
                  <FontAwesomeIcon icon={faCheckSquare} width="12" />
                  <span>نصب هر سیستم عامل دلخواه دیگر</span>
                </li>
                <li>
                  <FontAwesomeIcon icon={faCheckSquare} width="12" />
                  <span>دسترسی VNC</span>
                </li>
              </ul>
              <Link href="/fa/server/vps">
                <a className={styles.linkBuyVirtualServers}>
                  <FontAwesomeIcon icon={faHandPointUp} width="16" />
                  <span> خرید یک سرور مجازی جدید</span>
                </a>
              </Link>
            </div>
            <div className={styles.robotImgWrapper}>
              <img src="/images/robot-2.png" className={styles.robotImg} />
            </div>
          </div>
        </div>
      </Slider>
    </header>
  );
};

export default Header;

import Link from 'next/link';
import styles from './Header.module.scss';
import Slider from 'react-slick';
import { useEffect, useState } from 'react';
import HetzenerBanner from './HetzenerBanner/HetzenerBanner';
import OVHBanner from './OVHBanner/OVHBanner';
import SharedHostingBanner from './SharedHostingBanner/SharedHostingBanner';
import DeliveryVirtualServerBanner from './DeliveryVirtualServerBanner/DeliveryVirtualServerBanner';
import AutomaticBackupBanner from './AutomaticBackupBanner/AutomaticBackupBanner';

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
      <i className="fas fa-chevron-right"></i>
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
      <i className="fas fa-chevron-left"></i>
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
    autoplay: true,
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
          <AutomaticBackupBanner />
        </div>
        <div className="position-relative overflow-hidden target-slide-box">
          <SharedHostingBanner />
        </div>
        <div className="position-relative overflow-hidden target-slide-box">
          <DeliveryVirtualServerBanner />
        </div>
        <div className="position-relative overflow-hidden target-slide-box">
          <HetzenerBanner />
        </div>
        <div className="position-relative overflow-hidden target-slide-box">
          <OVHBanner />
        </div>
      </Slider>
    </header>
  );
};

export default Header;

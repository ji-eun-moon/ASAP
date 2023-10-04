import React, { useState } from 'react';
import 'styles/common/ScrollToTop.scss';
import { ReactComponent as TopArrow } from 'assets/icons/TopArrow.svg';

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // 화면 스크롤 이벤트를 감지하고 버튼을 보이게/숨기게 합니다.
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  window.addEventListener('scroll', toggleVisibility);

  return (
    <div className="scroll-to-top">
      {isVisible && (
        // <button type="button" onClick={scrollToTop} className="scroll-button">
        <TopArrow onClick={scrollToTop} className="scroll-button up" />
        // </button>
      )}
    </div>
  );
}

export default ScrollToTop;

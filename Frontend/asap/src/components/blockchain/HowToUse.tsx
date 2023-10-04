import React from 'react';
import 'styles/blockchain/HowToUse.scss';
import { CSSTransition } from 'react-transition-group';

interface HowToUseProps {
  isOpen: boolean;
}

function HowToUse({ isOpen }: HowToUseProps) {
  return (
    <CSSTransition in={isOpen} timeout={300} classNames="fade" unmountOnExit>
      <div className="w-10/12 howtouse unmount">
        <div>
          1. 조회할 API와 기간을 선택 후{' '}
          <button type="button" className="check-button">
            검증하기
          </button>{' '}
          버튼을 클릭하세요
        </div>
        <div>2. 검증결과를 확인하세요</div>
      </div>
    </CSSTransition>
  );
}

export default HowToUse;

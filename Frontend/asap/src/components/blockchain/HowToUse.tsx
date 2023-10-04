import React from 'react';
import 'styles/blockchain/HowToUse.scss';
import { CSSTransition } from 'react-transition-group';
import { ReactComponent as Fold } from 'assets/icons/fold.svg';
import { ReactComponent as Test } from 'assets/icons/test.svg';

interface HowToUseProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function HowToUse({ isOpen, setIsOpen }: HowToUseProps) {
  return (
    <CSSTransition in={isOpen} timeout={400} classNames="fade" unmountOnExit>
      <div className="w-10/12 howtouse unmount">
        <div className="w-full flex items-center">
          <div className="number">1.</div>
          <div>
            조회할 API와 기간을 선택 후{' '}
            <button type="button" className="check-button">
              검증하기
            </button>{' '}
            버튼을 클릭하세요
          </div>
        </div>
        <div className="w-full flex items-start">
          <div className="number">2.</div>
          <div className="w-11/12">
            <div>검증결과와 상세 데이터를 조회하실 수 있습니다</div>
            <div className="check-back data my-4">
              <div>
                ※ ASAP에서는 일주일 간격으로 API 사용량을 블록에 저장합니다
              </div>
              <div className="mb-3">
                ※ 블록에 사용량 저장시 사용량을 비롯한 API 정보를 해시값으로
                변환하여 저장합니다
              </div>
              <div className="pl-3">
                즉, 블록에 저장된 Hash값과 정산에 사용된 데이터의 Hash값이
                동일하다면 정산에 사용된{' '}
                <span className="color-text">데이터가 변조가 되지 않았음</span>
                을 증명합니다
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex items-start">
          <div className="number">3.</div>
          <div className="w-11/12 flex flex-col">
            <div>
              정산에 사용된 데이터 또는 원하는 데이터를 입력 후{' '}
              <button type="button" className="check-button">
                변환하기
              </button>{' '}
              버튼을 클릭하면 Hash값으로 직접 변환하여 확인도 가능합니다
            </div>
            <Test className="w-auto h-auto" />
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="fold-button up mt-10"
          >
            <Fold />
          </button>
        </div>
      </div>
    </CSSTransition>
  );
}

export default HowToUse;

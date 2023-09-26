import React from 'react';
import 'styles/main/HowToUse.scss';
import { ReactComponent as DownArrow } from 'assets/main/downarrow.svg';
import { ReactComponent as Question } from 'assets/main/question.svg';
import { ReactComponent as RightArrow } from 'assets/main/RightArrow.svg';
import SearchBar from 'components/common/SearchBar';
import Card from 'components/common/Card';

// HowToUse 이미지
import { ReactComponent as Search } from 'assets/main/ApiSearch.svg';
import { ReactComponent as Apply } from 'assets/main/Apply.svg';
import { ReactComponent as Credit } from 'assets/main/Credit.svg';
import { ReactComponent as Test } from 'assets/main/Test.svg';

function HowToUse() {
  return (
    <div className="all-container">
      <div className="center">
        <DownArrow />
      </div>
      <div className="center text-2xl font-bold py-4">
        ASAP에서 당신의 비즈니스를 시작해보세요 !
      </div>
      <div className="center pb-14">
        <SearchBar />
      </div>
      <div className="how-to-use">
        <div className="flex items-baseline pb-5">
          <div className="title-text">How To Use</div>
          <Question className="w-12 h-auto" />
        </div>
        <div className="cards">
          <Card text="API 검색">
            <Search />
          </Card>
          <RightArrow />
          <Card text="사용 신청">
            <Apply />
          </Card>
          <RightArrow />
          <Card text="결제 수단 등록">
            <Credit />
          </Card>
          <RightArrow />
          <Card text="API 테스트">
            <Test />
          </Card>
        </div>
      </div>
    </div>
  );
}

export default HowToUse;

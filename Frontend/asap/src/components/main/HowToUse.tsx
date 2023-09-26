import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'styles/main/HowToUse.scss';
import useGetApiList from 'hooks/api/api/useGetApiList';
import { ReactComponent as DownArrow } from 'assets/main/downarrow.svg';
import { ReactComponent as Question } from 'assets/main/question.svg';
import { ReactComponent as RightArrow } from 'assets/main/RightArrow.svg';
import SearchBar from 'components/common/SearchBar';
import Card from 'components/common/Card';
import { Fade } from 'react-awesome-reveal';
// import Carousel from 'components/common/Carousel';

// HowToUse 이미지
import { ReactComponent as Search } from 'assets/main/ApiSearch.svg';
import { ReactComponent as Apply } from 'assets/main/Apply.svg';
import { ReactComponent as Credit } from 'assets/main/Credit.svg';
import { ReactComponent as Test } from 'assets/main/Test.svg';

function HowToUse() {
  const navigate = useNavigate();
  const { apiList } = useGetApiList();
  console.log(apiList);
  const categoryList = ['계좌', '지도', '차량', '카드'];
  const onCategoryHandler = (page: string) => {
    navigate('/api_list', { state: { category: page } });
  };

  const scrollToHowToUse = () => {
    const howToUseSection = document.getElementById('howToUse');
    if (howToUseSection) {
      howToUseSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="all-container" id="howToUse">
      <Fade cascade damping={0.15}>
        <div className="center pb-5">
          <DownArrow className="arrow" onClick={scrollToHowToUse} />
        </div>
        <div className="center text-3xl font-bold pt-3 pb-10">
          ASAP에서 당신의 비즈니스를 시작해보세요 !
        </div>
        <div className="center pb-14 flex-col items-center">
          <SearchBar />
          <div>
            {categoryList.map((category) => (
              <button
                type="button"
                key={category}
                className="tag-button"
                onClick={() => onCategoryHandler(category)}
              >
                #&nbsp;{category}
              </button>
            ))}
          </div>
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
            <Card text="API 사용">
              <Test />
            </Card>
          </div>
        </div>
      </Fade>
      {/* <Carousel apiList={apiList} /> */}
    </div>
  );
}

export default HowToUse;

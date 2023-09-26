import React from 'react';
import Slider from 'react-slick';
import ApiCard from 'components/main/ApiCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface ApiData {
  apiId: string;
  category: string;
  content: string;
  tags: string;
  title: string;
}

interface CarouselProps {
  apiList: ApiData[] | undefined;
}

function Carousel({ apiList }: CarouselProps) {
  return (
    <div style={{ width: '900px' }}>
      <Slider
        infinite
        slidesToShow={3}
        slidesToScroll={1}
        speed={400}
        arrows
        autoplay
        autoplaySpeed={3000}
        prevArrow={
          <button type="button" className="slick-prev">
            Previous
          </button>
        }
        nextArrow={
          <button type="button" className="slick-next">
            Next
          </button>
        }
      >
        {apiList?.map((api) => (
          <div>
            <ApiCard
              apiId={api.apiId}
              title={api.title}
              category={api.category}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Carousel;

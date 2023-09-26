import React from 'react';
// import Car from 'assets/icons/Car.svg';
import CategoryImg from 'components/api/CategoryImg';

interface cardInfo {
  category: string;
  title: string;
  content: string;
  tags: string;
}
function ApiListCard({ category, title, content, tags }: cardInfo) {
  return (
    <div className="lg:hover:scale-105 transition-transform bg-white font-semibold text-center rounded-3xl border shadow-lg p-10 max-w-xs w-full h-72 flex flex-col justify-center items-center cursor-pointer">
      {/* <img src={Car} alt="car logo" className="h-24 w-56" /> */}
      <CategoryImg category={category} />
      <h1 className="text-2xl text-gray-700 mb-1"> {title} </h1>
      <h3 className="text-base text-gray-400 "> {content} </h3>
      <div className="flex">
        {JSON.parse(tags).map((tag: string) => (
          <p key={tag} className="text-sm" style={{ color: '#3888B5' }}>
            #{tag}&nbsp;&nbsp;
          </p>
        ))}
      </div>
      {/* <button className="bg-indigo-600 px-8 py-2 mt-8 rounded-3xl text-gray-100 font-semibold uppercase tracking-wide">
          Hire Me
        </button> */}
    </div>
  );
}

export default ApiListCard;

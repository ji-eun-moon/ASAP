// 제공자 - 동일 카테고리 비교
// 카테고리 평균 조회

import axiosInstance from 'utils/axiosInstance';
import { useState, useEffect } from 'react';
import useDetailStore from 'store/chart/useDetailStore';
import useCategoryStore from 'store/chart/useCategoryStore';

interface categoryAvgInfo {
  apiId: number;
  year: string;
  month: string;
}

const useCategoryAvg = () => {
  const [categoryAvgLoading, setCategoryAvgLoading] = useState<boolean>(true);

  const { apiId } = useDetailStore();
  const { year, month } = useCategoryStore();

  const categoryAvg = async (paramsObject: categoryAvgInfo) => {
    try {
      const response = await axiosInstance({
        method: 'GET',
        url: '/api/v1/apis/average/category',
        params: paramsObject,
      });
      setCategoryAvgLoading(false);

      console.log('다른 카테고리 평균 조회 성공', response.data);
    } catch (error) {
      console.log('다른 카테고리 평균 조회 실패', error);
    }
  };
  useEffect(() => {
    categoryAvg({ apiId, year, month });
  }, [apiId, year, month]);
  return { categoryAvgLoading, categoryAvg };
};

export default useCategoryAvg;

// //신규 사용자 조회
// import axiosInstance from 'utils/axiosInstance';
// import { useState, useEffect, useCallback } from 'react';
// import useDetailStore from 'store/chart/useDetailStore';
// // import useCategoryStore from 'store/chart/useCategoryStore';

// // interface categoryAvgInfo {
// //   apiId: number;
// // }

// const useCategoryAvg = () => {
//   const [categoryAvgLoading, setCategoryAvgLoading] = useState<boolean>(true);

//   const { apiId } = useDetailStore();

//   const categoryAvg = useCallback(async () => {
//     try {
//       const response = await axiosInstance({
//         method: 'GET',
//         url: `/api/v1/purpose/new/${apiId}`,
//       });
//       setCategoryAvgLoading(false);

//       console.log('신규 사용자 조회 성공', response.data);
//     } catch (error) {
//       console.log('신규 사용자 조회 실패', error);
//     }
//   }, [apiId]);
//   useEffect(() => {
//     categoryAvg();
//   }, [categoryAvg]);
//   return { categoryAvgLoading, categoryAvg };
// };

// export default useCategoryAvg;

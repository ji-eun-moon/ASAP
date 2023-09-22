import { useEffect, useState } from 'react';
import axiosInstance from 'utils/axiosInstance';

interface APIApprove {
  applyId: number;
  category: string;
}

const useAdminApiApprove = () => {
  const [approveCategory, setApproveCategory] = useState([]);

  const adminApiApprove = async ({ applyId, category }: APIApprove) => {
    try {
      const response = await axiosInstance({
        method: 'PUT',
        url: '/api/v1/apply/approve',
        data: {
          applyId,
          category,
        },
      });
      if (response.status === 200) {
        console.log('API 승인 성공');
      } else {
        console.log('API 승인 실패');
      }
    } catch (error) {
      console.log('서버 오류');
    }
  };

  const adminApiApproveCategory = async () => {
    try {
      const response = await axiosInstance({
        method: 'GET',
        url: '/api/v1/category/list',
      });
      if (response.status === 200) {
        console.log('api 승인 카테고리 불러오기 성공');
        console.log('카테고리', response.data);
        setApproveCategory(response.data);
      } else {
        console.log('api 승인 카테고리 불러오기 실패');
      }
    } catch (error) {
      console.log('서버 오류');
    }
  };
  useEffect(() => {
    adminApiApproveCategory();
  }, []);

  return { adminApiApprove, adminApiApproveCategory, approveCategory };
};

export default useAdminApiApprove;

// interface APIDetail {
//   api: string;
//   input: string;
//   output: string;
//   price: number;
//   progress: string;
//   title: string;
//   content: string;
//   provideDate: string;
//   createDate: 'T' | string;
//   id: string;
//   name: string;
//   tags: string;
// }

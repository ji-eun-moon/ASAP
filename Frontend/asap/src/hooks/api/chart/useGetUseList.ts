import axiosInstance from 'utils/axiosInstance';
import { useState, useEffect } from 'react';

interface IApi {
  apiId: number;
  title: string;
}

/**
 * 사용자가 사용중인 리스트
 * @returns 사용자가 사용중인 리스트, 로딩 여부
 */

const useGetUseList = () => {
  const [useListLoading, setUseListLoading] = useState<boolean>(true);
  const [useList, setUseList] = useState<IApi[] | null>();

  const getUseList = async () => {
    try {
      const response = await axiosInstance({
        method: 'GET',
        url: '/api/v1/purpose/useList',
      });
      setUseListLoading(false);
      setUseList(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUseList();
  }, []);

  return { useListLoading, useList };
};

export default useGetUseList;

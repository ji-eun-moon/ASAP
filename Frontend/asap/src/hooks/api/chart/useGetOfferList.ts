import axiosInstance from 'utils/axiosInstance';
import { useState, useEffect } from 'react';

interface IApi {
  apiId: number;
  title: string;
}

/**
 * 제공자가 제공중인 api 리스트
 * @returns 제공중인 리스트, 로딩 여부
 */

const useGetOfferList = () => {
  const [offerListLoading, setOfferListLoading] = useState<boolean>(true);
  const [offerList, setOfferList] = useState<IApi[] | null>();

  const getOfferList = async () => {
    try {
      const response = await axiosInstance({
        method: 'GET',
        url: '/api/v1/apis/offerList',
      });
      setOfferListLoading(false);
      setOfferList(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOfferList();
  }, []);

  return { offerListLoading, offerList };
};

export default useGetOfferList;

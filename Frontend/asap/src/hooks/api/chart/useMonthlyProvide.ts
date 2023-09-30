import axiosInstance from 'utils/axiosInstance';
import { useEffect, useState, useCallback } from 'react';
import useMonthlyStore from 'store/chart/useMonthlyStore';

interface monthly {
  year: string;
  month: string;
}
interface IApiResponse {
  apiId: number;
  walletId: number;
  price: number;
  title: string;
}

interface IMonthlyProvide {
  amount: number;
  apiResponse: IApiResponse;
  price: number;
}

/**
 * 제공자 - 월별 제공량 조회
 * month 포함 이전 3개월 조회
 * @returns 월간 제공량, 월간 제공량 로딩
 */

const useMonthlyProvide = () => {
  const {
    year,
    month,
    setMonthDate,
    setOneBeforeMonthDate,
    setTwoBeforeMonthDate,
    setMonthUsage,
    setOneBeforeMonthUsage,
    setTwoBeforeMonthUsage,
  } = useMonthlyStore();
  const [monthlyLoading, setMonthlyLoading] = useState<boolean>(true);
  const [monthlyProvide, setMonthlyProvide] = useState<Array<{
    month: string;
    data: IMonthlyProvide[];
  }> | null>();

  const getMonthlyProvide = useCallback(
    async (paramsObject: monthly) => {
      try {
        const response = await axiosInstance({
          method: 'GET',
          url: '/api/v1/apis/providing/monthly',
          params: paramsObject,
        });
        // 월별로 데이터 변환
        const monthlyData: Array<{ month: string; data: IMonthlyProvide[] }> =
          Object.keys(response.data).map((key) => {
            return { month: key, data: response.data[key] };
          });
        setMonthlyProvide(monthlyData);
        // monthlyData를 기반으로 스토어 상태 업데이트
        if (monthlyData[0]) {
          setMonthDate(monthlyData[0].month);
          setMonthUsage(monthlyData[0].data);
        }
        if (monthlyData[1]) {
          setOneBeforeMonthDate(monthlyData[1].month);
          setOneBeforeMonthUsage(monthlyData[1].data);
        }
        if (monthlyData[2]) {
          setTwoBeforeMonthDate(monthlyData[2].month);
          setTwoBeforeMonthUsage(monthlyData[2].data);
        }
        setMonthlyLoading(false);
        // console.log('사용자 월별 제공량 조회 성공', response.data);
      } catch (error) {
        console.log('사용자 월별 제공량 조회 실패', error);
      }
    },
    [
      setMonthUsage,
      setOneBeforeMonthUsage,
      setTwoBeforeMonthUsage,
      setMonthDate,
      setOneBeforeMonthDate,
      setTwoBeforeMonthDate,
    ],
  );

  useEffect(() => {
    getMonthlyProvide({
      year,
      month,
    });
  }, [year, month, getMonthlyProvide]);

  return {
    monthlyLoading,
    monthlyProvide,
  };
};

export default useMonthlyProvide;

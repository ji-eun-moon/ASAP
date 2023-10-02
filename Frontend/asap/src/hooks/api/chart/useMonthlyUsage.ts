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

interface IMonthlyUsage {
  amount: number;
  apiResponse: IApiResponse;
  price: number;
}

/**
 * 사용자 - 월별 사용량 조회
 * month 포함 이전 3개월 조회
 * @returns 월간 사용량, 월간 사용량 로딩
 */

const useMonthlyUsage = () => {
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
  const [monthlyUsage, setMonthlyUsage] = useState<Array<{
    month: string;
    data: IMonthlyUsage[];
  }> | null>();

  const getMonthlyUsage = useCallback(
    async (paramsObject: monthly) => {
      try {
        const response = await axiosInstance({
          method: 'GET',
          url: '/api/v1/apis/usage/monthly',
          params: paramsObject,
        });
        // 월별로 데이터 변환
        const monthlyData: Array<{ month: string; data: IMonthlyUsage[] }> =
          Object.keys(response.data).map((key) => {
            return { month: key, data: response.data[key] };
          });
        setMonthlyUsage(monthlyData);
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
        // console.log('사용자 월별 사용량 조회 성공', response.data);
      } catch (error) {
        console.log('사용자 월별 사용량 조회 실패', error);
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
    getMonthlyUsage({
      year,
      month,
    });
  }, [year, month, getMonthlyUsage]);

  return {
    monthlyLoading,
    monthlyUsage,
  };
};

export default useMonthlyUsage;

// 제공자 - 신규 사용자 조회
// 신규 사용자 조회

import axiosInstance from 'utils/axiosInstance';
import { useState, useEffect, useCallback } from 'react';
import useDetailStore from 'store/chart/useDetailStore';
import useNewUserStore from 'store/chart/useNewUserStore';

const useNewUser = () => {
  const [newUserLoading, setNewUserLoading] = useState<boolean>(true);

  const { apiId } = useDetailStore();
  const {
    setTwoBeforeMonthDate,
    setOneBeforeMonthDate,
    setMonthDate,
    setTwoBeforeMonthCount,
    setOneBeforeMonthCount,
    setMonthCount,
  } = useNewUserStore();

  const newUser = useCallback(async () => {
    try {
      const response = await axiosInstance({
        method: 'GET',
        url: `/api/v1/purpose/new/${apiId}`,
      });
      if (response.data[0]) {
        setTwoBeforeMonthDate(response.data[0].date);
        setTwoBeforeMonthCount(response.data[0].count);
        console.log('두달전', response.data[0]);
      }
      if (response.data[1]) {
        setOneBeforeMonthDate(response.data[1].date);
        setOneBeforeMonthCount(response.data[1].count);
        console.log('한달전', response.data[1]);
      }
      if (response.data[2]) {
        setMonthDate(response.data[2].date);
        setMonthCount(response.data[2].count);
        console.log('지금달', response.data[2]);
      }
      setNewUserLoading(false);

      console.log('신규 사용자 조회 성공', response.data);
    } catch (error) {
      console.log('신규 사용자 조회 실패', error);
    }
  }, [
    setTwoBeforeMonthDate,
    setOneBeforeMonthDate,
    setMonthDate,
    setTwoBeforeMonthCount,
    setOneBeforeMonthCount,
    setMonthCount,
    apiId,
  ]);
  useEffect(() => {
    newUser();
  }, [newUser]);
  return { newUserLoading, newUser };
};

export default useNewUser;

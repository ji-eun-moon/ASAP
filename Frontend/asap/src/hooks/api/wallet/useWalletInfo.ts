import axiosInstance from 'utils/axiosInstance';
import { useState, useEffect } from 'react';

interface ISupplyApply {
  address: string;
  balance: number;
  createdAt: Date;
}

const useWalletInfo = () => {
  const [walletInfo, setWalletInfo] = useState<ISupplyApply | null>(null);

  const getWalletInfo = async () => {
    try {
      const response = await axiosInstance({
        method: 'GET',
        url: '/api/v1/wallet',
      });
      setWalletInfo(response.data);
      console.log(response.data);
    } catch (error) {
      console.log('서버 오류:', error);
    }
  };

  useEffect(() => {
    getWalletInfo();
  }, []);

  return { getWalletInfo, walletInfo };
};

export default useWalletInfo;

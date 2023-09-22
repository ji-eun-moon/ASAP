import React, { useEffect, useState } from 'react';
// import { Button } from '@material-tailwind/react';
import menus from 'router/data/mypage-menus';
import Header from 'components/common/Header';
import SideBar from 'components/nav/SideBar';
import useGetWallet from 'hooks/api/wallet/useGetWallet';
import useWeb3 from 'hooks/api/wallet/useWeb3';

function AccountWallet() {
  const { wallet } = useGetWallet();
  const { getBalance } = useWeb3();
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    if (wallet) {
      const fetchBalance = async () => {
        try {
          const bal = await getBalance(wallet);
          console.log(bal);
          setBalance(Number(bal) / 10 ** 18);
        } catch (error) {
          console.error('에러 발생:', error);
        }
      };
      fetchBalance();
    }
  }, [wallet, getBalance]);

  return (
    <div>
      <Header title="지갑 정보" />
      <div className="container mx-auto page-container grid grid-cols-4">
        <div className="col-span-1 flex justify-start items-start ml-8">
          <SideBar menus={menus} />
        </div>
        <div className="col-span-3">
          <h1>나의 지갑 정보</h1>
          <h2>잔액</h2>
          <p>{wallet}</p>
          <p>{balance}</p>
        </div>
      </div>
    </div>
  );
}

export default AccountWallet;

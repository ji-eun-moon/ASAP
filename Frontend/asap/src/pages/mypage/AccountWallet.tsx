import React, { useEffect, useState } from 'react';
import { Button } from '@material-tailwind/react';
import menus from 'router/data/mypage-menus';
import Header from 'components/common/Header';
import SideBar from 'components/nav/SideBar';
import { ReactComponent as Wallet } from 'assets/icons/Oallet.svg';
import useGetWallet from 'hooks/api/wallet/useGetWallet';
import useWeb3 from 'hooks/api/wallet/useWeb3';
import useAccountInfo from 'hooks/api/mypage/useAccountInfo';

function AccountWallet() {
  const { wallet } = useGetWallet();
  const { getBalance } = useWeb3();
  const { memberInfo } = useAccountInfo();
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
      {/* 헤더 */}
      <Header title="지갑 정보" />
      <div className="container mx-auto page-container grid grid-cols-4">
        {/* 좌측 사이드바 */}
        <div className="col-span-1 flex justify-start items-start ml-8">
          <SideBar menus={menus} />
        </div>
        {/* 우측 지갑 정보 */}
        <div className="col-span-3">
          <div className="text-2xl font-bold pb-4">등록된 지갑</div>
          <div className="flex justify-between items-center bg-gray-100 rounded-lg pr-5">
            {/* 지갑 이미지 */}
            <div className="w-1/3 flex justify-center">
              <Wallet className="w-7/12" />
            </div>
            {/* 지갑 정보 - 주소 */}
            <div className="w-2/3 pr-8 flex flex-col">
              <div className="text-2xl font-bold">
                {memberInfo?.name}님의 지갑
              </div>
              <div className="text-xl text-gray-500">{wallet}</div>
              {/* 지갑 정보 - 잔액 */}
              <div className="flex justify-end text-2xl font-bold pb-4">
                {balance} LEGO
              </div>
              {/* 충전, 송금 버튼 */}
              <div className="flex">
                <Button
                  className="w-6/12 text-lg"
                  style={{ backgroundColor: '#004AAD' }}
                >
                  충전하기
                </Button>
                <Button
                  className="w-6/12 text-lg ml-3"
                  style={{ backgroundColor: '#004AAD' }}
                >
                  출금하기
                </Button>
              </div>
            </div>
          </div>
          {/* 아래 text */}
          <div className="mt-4 text-sm text-gray-600 font-medium">
            ※ API key와 지갑 주소가 동일하므로 지갑 주소 관리에 주의하세요.
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountWallet;

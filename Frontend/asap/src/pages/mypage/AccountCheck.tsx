import React from 'react';
import Header from 'components/common/Header';
import useWeb3 from 'hooks/api/wallet/useWeb3';
import { Button } from '@material-tailwind/react';

function AccountWallet() {
  const { createAccount } = useWeb3();

  const onClickHandler = () => {
    createAccount('a');
  };
  return (
    <div>
      <Header title="지갑 관리" />
      <div className="container mx-auto page-container grid grid-cols-4">
        <div className="col-span-3">
          <Button onClick={onClickHandler}>지갑 확인</Button>
        </div>
      </div>
    </div>
  );
}

export default AccountWallet;

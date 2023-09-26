import Web3 from 'web3';

const useWeb3 = () => {
  const web3 = new Web3(
    new Web3.providers.HttpProvider('https://j9c202.p.ssafy.io/lego/'),
  );

  // 코인베이스 계정 가져오기
  const getCoinBase = async () => {
    const coinBase = await web3.eth.getCoinbase();
    return coinBase;
  };

  // 잔액 조회하기
  const getBalance = async (account: string) => {
    const balance = await web3.eth.getBalance(account);
    return balance;
  };

  const createAccount = async (password: string) => {
    try {
      const coinBase = await getCoinBase();
      const bal = await web3.eth.getBalance(coinBase);
      console.log('coinBase: ', coinBase, 'balance: ', bal);

      // 비밀번호로 계정 생성하기
      const account = await web3.eth.personal.newAccount(password);
      console.log(account, 'useWeb3 계정 생성');

      await web3.eth.personal.unlockAccount(coinBase, 'pass', 300);

      const Eth = web3.utils.toWei('1', 'ether');
      console.log('실행 체크');

      // 코인베이스 계정에서 새로 생성한 계정으로 이더 전송
      const receipt = await web3.eth.sendTransaction({
        from: coinBase,
        to: account,
        value: Eth,
      });

      console.log(receipt, '영수증');
      console.log(account);
      return account;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return { createAccount, getBalance };
};

export default useWeb3;

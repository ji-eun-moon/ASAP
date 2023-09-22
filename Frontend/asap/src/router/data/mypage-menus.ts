interface IMenu {
  name: string;
  path: string;
}

const menus: IMenu[] = [
  { name: '기본 정보', path: '/mypage/account' },
  { name: '키 관리', path: '/mypage/keys' },
  { name: '결제 수단 관리', path: '/mypage/credit' },
  { name: '결제 내역', path: '/mypage/payment' },
  { name: '지갑 관리', path: '/mypage/wallet' },
];

export default menus;

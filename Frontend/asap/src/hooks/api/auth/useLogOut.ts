import axiosInstance from 'utils/axiosInstance';

const useLogOut = () => {
  const logOut = async () => {
    try {
      const response = await axiosInstance({
        method: 'POST',
        url: 'https://j9c202.p.ssafy.io/api/v1/member/logout',
      });
      if (response.status === 200) {
        sessionStorage.clear();
        console.log('로그아웃 성공:', response.data);
      }
    } catch (error) {
      console.log('서버 오류:', error);
    }
  };

  return { logOut };
};

export default useLogOut;

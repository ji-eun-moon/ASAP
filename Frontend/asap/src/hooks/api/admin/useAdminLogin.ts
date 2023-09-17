// import axios from 'axios';
import axiosInstance from 'utils/axiosInstance';

interface adminInfo {
  adminId: string;
  adminPassword: string;
}

const useAdminLogin = () => {
  const adminLogin = async ({ adminId, adminPassword }: adminInfo) => {
    try {
      const response = await axiosInstance({
        method: 'POST',
        url: '/api/v1/admin', // 아직 안만들어짐
        data: {
          adminId,
          adminPassword,
        },
      });
      if (response.status === 200) {
        console.log('관리자 로그인 성공');
      } else {
        console.log('관리자 로그인 실패');
      }
    } catch (error) {
      console.error('서버 오류:', error);
    }
  };

  return { adminLogin };
};

export default useAdminLogin;

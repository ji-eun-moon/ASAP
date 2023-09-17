import axiosInstance from 'utils/axiosInstance';

interface UserInfo {
  apiId: string;
  purpose: string;
  unit: string;
  industry: string;
}

const useSetUserInfo = () => {
  const setUserInfo = async ({ apiId, purpose, unit, industry }: UserInfo) => {
    try {
      const response = await axiosInstance({
        method: 'POST',
        url: '/api/v1/purpose/use',
        data: { apiId, purpose, unit, industry },
      });
      console.log(response);
    } catch (error) {
      console.log('서버 오류 :', error);
    }
  };

  return { setUserInfo };
};

export default useSetUserInfo;

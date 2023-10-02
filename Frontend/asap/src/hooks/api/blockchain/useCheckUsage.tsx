import axiosInstance from 'utils/axiosInstance';

const useCheckUsage = () => {
  const checkUsage = async () => {
    try {
      const response = await axiosInstance({
        method: 'GET',
        url: '/api/v1/transaction',
      });
      console.log(response.data);
    } catch (error) {
      console.log('서버 오류:', error);
    }
  };

  return { checkUsage };
};

export default useCheckUsage;

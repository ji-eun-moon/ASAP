import axiosInstance from 'utils/axiosInstance';

const useDeleteCredit = () => {
  const deleteCreditCard = async () => {
    try {
      const response = await axiosInstance({
        method: 'DELETE',
        url: `/api/v1/credit`,
      });
      console.log('삭제성공', response.data);
    } catch (error) {
      console.log('서버 오류:', error);
    }
  };
  return { deleteCreditCard };
};

export default useDeleteCredit;

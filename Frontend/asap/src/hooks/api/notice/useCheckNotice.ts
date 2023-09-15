import axiosInstance from 'utils/axiosInstance';

type TNoticeId = number;

const useCheckNotice = () => {
  const checkNotice = async (noticeId: TNoticeId) => {
    try {
      await axiosInstance({
        method: 'PUT',
        url: `/api/v1/notice/check/${noticeId}`,
      });
    } catch (error) {
      console.log('서버 오류:', error);
    }
  };
  return { checkNotice };
};

export default useCheckNotice;

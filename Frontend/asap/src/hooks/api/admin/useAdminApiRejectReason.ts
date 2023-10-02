import axiosInstance from 'utils/axiosInstance';

interface rejectInfo {
  applyId: number;
  title: string;
  content: string;
}

const useAdminApiRejectReason = () => {
  const adminApiRejectReason = async ({
    applyId,
    title,
    content,
  }: rejectInfo) => {
    console.log();
    try {
      const response = await axiosInstance({
        method: 'POST',
        url: '/api/v1/apply/reject',
        data: { applyId, title, content },
      });
      if (response.status === 202) {
        console.log('z', applyId, title, content);
        console.log('api 거절 이유 전송 완료');
      } else {
        console.log('z', applyId, title, content);
        console.log('api 거절 이유 전송 실패');
      }
    } catch (error) {
      console.log('서버 오류', error);
    }
  };
  return { adminApiRejectReason };
};

export default useAdminApiRejectReason;

import axiosInstance from 'utils/axiosInstance';

interface postInfo {
  applyId: number;
  progress: string;
}
const useAdminApiProgress = () => {
  const adminApiProgress = async ({ applyId, progress }: postInfo) => {
    console.log(applyId, progress);
    try {
      const response = await axiosInstance({
        method: 'PUT',
        url: '/api/v1/apply/progress',
        data: { applyId, progress },
      });
      if (response.status === 200) {
        console.log('진행 상태 변경 완료');
      } else {
        console.log('진행 상태 변경 실패');
      }
    } catch (error) {
      console.log('서버 오류', error);
    }
  };
  return { adminApiProgress };
};

export default useAdminApiProgress;

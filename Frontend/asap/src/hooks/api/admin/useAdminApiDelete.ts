import axiosInstance from 'utils/axiosInstance';

const useAdminApiDelete = () => {
  const adminApiDelete = async (apiId: number) => {
    try {
      const response = await axiosInstance({
        method: 'DELETE',
        url: `/api/v1/admin/delete/${apiId}`,
        data: { adminPassword: 'babo' },
      });
      console.log(response);
      // if (response.status === 204) {
      //   console.log('api 삭제 완료');
      // } else {
      //   console.log('api 삭제 실패');
      // }
    } catch (error) {
      console.log('서버 오류', error);
    }
  };
  return { adminApiDelete };
};

export default useAdminApiDelete;

import axiosInstance from 'utils/axiosInstance';

interface IModifyMember {
  name: string;
  email: string;
}
const useModifyAccount = () => {
  const modifyMemberInfo = async ({ name, email }: IModifyMember) => {
    try {
      const response = await axiosInstance({
        method: 'POST',
        url: '/api/v1/member/me',
        data: { name, email },
      });
      console.log(response.data);
    } catch (error) {
      console.log('서버 오류:', error);
    }
  };

  return { modifyMemberInfo };
};

export default useModifyAccount;

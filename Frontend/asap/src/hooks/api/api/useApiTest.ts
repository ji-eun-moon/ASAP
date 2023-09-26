import axios, { AxiosError } from 'axios';
import axiosInstance from 'utils/axiosInstance';
import useTestStore from 'store/api/useTestStore';

interface ITest {
  url: string | undefined;
  params: Record<string, string>;
}
const useApiTest = () => {
  const { setTestResponse, setStatus } = useTestStore();
  const apiTest = async ({ url, params }: ITest) => {
    try {
      const response = await axiosInstance({
        method: 'GET',
        url,
        data: params,
      });
      setTestResponse(JSON.stringify(response.data));
      setStatus(response.status);
      console.log(response);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError: AxiosError = error;
        setTestResponse(JSON.stringify(axiosError));
        setStatus(axiosError.response?.status || 500);
        console.log('서버 오류:', axiosError);
      } else {
        console.error('An unexpected error occurred:', error);
      }
    }
    return false;
  };
  return { apiTest };
};

export default useApiTest;

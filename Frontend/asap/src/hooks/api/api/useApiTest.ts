import axios, { AxiosError } from 'axios';
import useTestStore from 'store/api/useTestStore';

interface ITest {
  url: string | undefined;
  params: Record<string, string>;
  wallet: string;
}
const useApiTest = () => {
  const { setTestResponse, setStatus, setLoading, decTrial } = useTestStore();

  const extractStatus = (input: string): number => {
    try {
      const match = input.match(/"status":(\d+)/);
      return match ? parseInt(match[1], 10) : 200;
    } catch {
      return 200;
    }
  };

  const apiTest = async ({ url, params, wallet }: ITest) => {
    try {
      const response = await axios({
        method: 'GET',
        url,
        params,
        headers: {
          Authorization: wallet,
        },
      });
      console.log(response.data);
      setTestResponse(JSON.stringify(response.data));
      if (typeof response.data === 'string') {
        setStatus(extractStatus(response.data));
      } else {
        setStatus(response.status);
      }
      decTrial();
      setLoading(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError: AxiosError = error;
        setTestResponse(JSON.stringify(axiosError));
        setStatus(axiosError.response?.status || 500);
        setLoading(false);
        console.log('서버 오류:', axiosError);
        decTrial();
      } else {
        console.error('An unexpected error occurred:', error);
      }
    }
    return false;
  };
  return { apiTest };
};

export default useApiTest;

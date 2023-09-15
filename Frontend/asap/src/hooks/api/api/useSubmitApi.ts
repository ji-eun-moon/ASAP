import axiosInstance from 'utils/axiosInstance';

interface ApiInfo {
  title: string;
  content: string;
  input: string;
  output: string;
  price: number;
  api: string;
  tags: string[];
}
const useSubmitApi = () => {
  const submitApi = async ({
    title,
    content,
    input,
    output,
    price,
    api,
    tags,
  }: ApiInfo) => {
    try {
      const response = await axiosInstance({
        method: 'POST',
        url: '/api/v1/apply/submit',
        data: { title, content, input, output, price, api, tags },
      });
      console.log(response);
    } catch (error) {
      console.log('서버 오류 :', error);
    }
  };

  return { submitApi };
};

export default useSubmitApi;

import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

interface IApi {
  id: string;
  title: string;
}

const useGetApiDetail = () => {
  const [apiDetail, setApiDetail] = useState<IApi[] | null>(null);
  const { apiId } = useParams() as { apiId: string };
  const getApiDetail = async (id: string) => {
    try {
      const response = await axios({
        method: 'GET',
        url: `https://j9c202.p.ssafy.io/api/v1/apis/detail/${id}`,
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzUxMiJ9.eyJpZCI6InNvbmciLCJpYXQiOjE2OTQ2NjAyNjYsImV4cCI6MTY5NDc0NjY2Nn0.4p5van0ej6X_vw4pv0TKJqM3HfRsvUsJX7pjp1uhVfQY4HTAGLG4wrleA_sRCwpyFCFil7bGfpOS39C7np-vJg',
        },
      });
      setApiDetail(response.data);
      console.log(response.data);
    } catch (error) {
      console.log('서버 오류:', error);
    }
  };

  useEffect(() => {
    getApiDetail(apiId);
  }, [apiId]);

  return { apiDetail, getApiDetail, apiId };
};

export default useGetApiDetail;

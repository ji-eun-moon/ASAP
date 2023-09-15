import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

interface apiItem {
  id: string;
  title: string;
  usage: string;
}

const useGetApiUsage = () => {
  const [apiUsage, setApiUsage] = useState<apiItem[] | null>(null);
  const { apiId } = useParams() as { apiId: string };
  const getApiUsage = async (id: string) => {
    try {
      const response = await axios({
        method: 'GET',
        url: `https://j9c202.p.ssafy.io/api/v1/apis/guide/${id}`, // api 미완성
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzUxMiJ9.eyJpZCI6InNvbmciLCJpYXQiOjE2OTQ2NTYzNDUsImV4cCI6MTY5NDY1NjQzMX0.fqrHERJQhDKF3iWhu4S0pQ0r_z2uifyNFB8OEG2xHPuqQshhePLKDw6uH0sbh94KEpOcGgp2TYkgAzYBSv4Zgw',
        },
      });
      setApiUsage(response.data);
    } catch (error) {
      console.log('서버 오류:', error);
    }
  };

  useEffect(() => {
    getApiUsage(apiId);
  }, [apiId]);

  return { getApiUsage, apiId, apiUsage };
};

export default useGetApiUsage;

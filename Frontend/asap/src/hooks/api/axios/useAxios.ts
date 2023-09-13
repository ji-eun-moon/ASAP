import { useState, useEffect } from 'react';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import axiosInstance from 'utils/axiosInstance';

const useAxios = (axiosParams: AxiosRequestConfig) => {
  const [response, setResponse] = useState<AxiosResponse>();
  const [error, setError] = useState<AxiosError | unknown>();
  const [loading, setLoading] = useState(true);

  const fetchResponse = async (params: AxiosRequestConfig) => {
    try {
      const result = await axiosInstance.request(params);
      setResponse(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResponse(axiosParams);
  }, [axiosParams]);

  return { response, error, loading };
};

export default useAxios;

import { axiosReq } from "../api/axiosDefaults";
import { useEffect, useState } from "react";

const useReq = (url, dependencies = [url]) => {
  const [response, setResponse] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const doRequest = async () => {
    setLoading(true);
    try {
      const response = await axiosReq.get(url);

      setResponse(response.data);
    } catch (error) {
      setError(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    doRequest();
  }, dependencies);

  return {
    data: response,
    loading,
    error,
    refresh: doRequest,
  };
};

export default useReq;

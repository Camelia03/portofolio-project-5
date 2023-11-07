import { axiosReq } from "../api/axiosDefaults";
import { useEffect, useState } from "react";

const useReq = (url) => {
  const [response, setResponse] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const doRequest = async () => {
      try {
        const response = await axiosReq.get(url);

        setResponse(response.data);
      } catch (error) {
        setError(error);
      }

      setLoading(false);
    };

    doRequest();
  }, []);

  return {
    data: response,
    loading,
    error,
  };
};

export default useReq;

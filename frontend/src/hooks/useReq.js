import { axiosReq } from "../api/axiosDefaults";
import { useEffect, useState } from "react";

const useReq = (url, dependencies = [url]) => {
  const [response, setResponse] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const doRequest = async () => {
    // Start loading
    setLoading(true);

    // Fetch some data
    try {
      const response = await axiosReq.get(url);

      setResponse(response.data);
    } catch (error) {
      setError(error);
    }

    // Stop loading
    setLoading(false);
  };

  // Redo request if dependencies change, by default the url
  useEffect(() => {
    doRequest();
  }, dependencies);

  return {
    data: response,
    loading,
    error,
    refresh: doRequest,
    update: setResponse,
  };
};

export default useReq;

import { useEffect, useState } from "react";
import { useAuth } from "../store";
import { apiClient } from "../config";

const useFetch = (url) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [data, setData] = useState([]);

  const { token } = useAuth();

  const fetchAllPosts = async () => {
    setIsLoading(true);

    try {
      const res = await apiClient(url);

      if (res.data.status !== 200) {
        throw new Error(res.data.message);
      }

      const { results } = res.data.data;

      setData(results);
      setIsLoading(false);
    } catch (err) {
      setErrorMessage(err.message);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

  return {
    isLoading,
    errorMessage,
    data,
    setData,
  };
};

export default useFetch;

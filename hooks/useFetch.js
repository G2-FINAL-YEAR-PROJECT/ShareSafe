import { authFetch } from "../axios";
import { useEffect, useState } from "react";
import { useAuth } from "../store";

const useFetch = (url) => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [data, setData] = useState([]);

  const { token } = useAuth();

  const fetchAllPosts = async () => {
    setIsLoading(true);

    try {
      const res = await authFetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
  };
};

export default useFetch;

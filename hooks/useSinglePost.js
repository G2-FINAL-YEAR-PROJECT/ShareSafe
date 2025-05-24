import { apiClient } from "../config";
import { useState, useEffect } from "react";

const useSinglePost = (url, id) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [singlePost, setSinglePost] = useState(null);

  useEffect(() => {
    async function fetchSinglePost() {
      setIsLoading(true);
      try {
        const res = await apiClient(`${url}/${id}`);

        if (res.data.status !== 200) {
          throw new Error(res.data.message);
        }

        const { data } = res.data;

        setSinglePost(data);
        setIsLoading(false);
      } catch (error) {
        setErrorMessage(error.message);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSinglePost();
  }, [id]);

  return {
    isLoading,
    errorMessage,
    singlePost,
  };
};

export default useSinglePost;

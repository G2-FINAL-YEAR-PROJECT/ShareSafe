import { useState, useEffect } from "react";
import { apiClient } from "../config";

const useComments = (route, postId, dependency) => {
  const [commentList, setCommentList] = useState([]);
  const [loadingComment, setLoadingComment] = useState(false);
  const [commentError, setCommentError] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      setLoadingComment(true);
      try {
        const res = await apiClient(`${route}/${postId}`);

        if (res.data?.status !== 200) {
          throw new Error(res.data?.message);
        }

        setCommentList(res.data?.data);
        setLoadingComment(false);
      } catch (error) {
        console.log(error?.message);
        setCommentError(error?.message);
        setLoadingComment(false);
      } finally {
        setLoadingComment(false);
      }
    };
    if (dependency) {
      fetchComments();
    }
    fetchComments();
  }, [dependency]);

  return {
    commentList,
    loadingComment,
    setCommentList,
    commentError,
  };
};

export default useComments;

import { useState } from "react";
import { apiClient } from "../config";

const useFollow = () => {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollowUser = async (id) => {
    try {
      const res = await apiClient.put(`users/follow`, {
        users: [id],
      });

      console.log(res.data, id);

      if (res.data.status === 200) {
        setIsFollowing(true);
      }

      if (res.data.status !== 200) {
        throw new Error(res.data.message);
      }
    } catch (error) {
      console.log("error", error.message);
    }
  };

  return { setIsFollowing, isFollowing, handleFollowUser };
};

export default useFollow;

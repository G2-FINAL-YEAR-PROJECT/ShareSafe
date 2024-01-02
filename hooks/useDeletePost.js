import { apiClient } from "../config";
import { useNavigation } from "@react-navigation/native";

const useDeletePost = () => {
  const navigation = useNavigation();

  const handlePostDelete = async (page, url, postId, updateData) => {
    try {
      const res = await apiClient.delete(`${url}/${postId}`);

      if (res.data.status === 200) {
        alert("post deleted successfully");
        if (page === "PostDetails" || page === "EmergencyDetails") {
          navigation.goBack();
          return;
        }

        if (updateData) {
          updateData((prevPosts) =>
            prevPosts.filter((post) => post.id !== postId)
          );
        }
      }

      if (res.data.status !== 200) {
        throw new Error(res.data.message);
      }
    } catch (error) {
      alert("Error deleting post");
      console.log(error.message);
    }
  };

  return { handlePostDelete };
};

export default useDeletePost;

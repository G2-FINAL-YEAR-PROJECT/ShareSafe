import { Image } from "react-native";
import { useState, useEffect } from "react";

const useAspectRatio = (defaultAspectRatio, post) => {
  const [aspectRatio, setAspectRatio] = useState(defaultAspectRatio);

  useEffect(() => {
    if (post && post?.postImage) {
      Image.getSize(post?.postImage, (width, height) => {
        const calculatedAspectRatio = width / height;
        setAspectRatio(calculatedAspectRatio);
      });
    }
  }, [post]);

  return {
    aspectRatio,
  };
};

export default useAspectRatio;

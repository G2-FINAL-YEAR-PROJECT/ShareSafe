import { UPLOAD_PRESET, CLOUD_NAME } from "@env";

export const uploadToCloudinary = async (imageUri) => {
  try {
    const newFile = {
      uri: imageUri,
      type: `test/${imageUri?.split(".")?.pop()}`,
      name: `test.${imageUri?.split(".")?.pop()}`,
    };

    const data = new FormData();
    data.append("file", newFile);
    data.append("upload_preset", UPLOAD_PRESET);
    data.append("cloud_name");
    data.append("folder", CLOUD_NAME);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/shareupload/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );

    const resData = await response.json();

    if (resData?.error) {
      throw new Error("error creating post");
    }

    return resData?.secure_url;
  } catch (error) {
    throw new Error(error);
  }
};

import * as ImagePicker from "expo-image-picker";

const usePickImage = (updatePreview) => {
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,

        aspect: [3, 4],
        quality: 1,
      });

      if (!result?.canceled) {
        updatePreview(result.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { pickImage };
};

export default usePickImage;

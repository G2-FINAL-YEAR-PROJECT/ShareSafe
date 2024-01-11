export const getProfilePic = (profilePicture) => {
  return profilePicture
    ? { uri: profilePicture }
    : require("../assets/images/placeholder.jpg");
};

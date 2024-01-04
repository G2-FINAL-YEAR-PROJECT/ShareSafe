import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS } from "../../constants";
import { useNavigation } from "@react-navigation/native";

const placeholder = require("../../assets/images/placeholder.jpg");

const CommentCard = ({ comment }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ProfileTabStack", {
            screen: "Profile",
            params: { user: comment?.user },
          })
        }
      >
        <Image
          style={styles.image}
          source={
            comment?.user?.profilePicture
              ? { uri: comment?.user?.profilePicture }
              : placeholder
          }
        />
      </TouchableOpacity>
      <View style={styles.user}>
        <Text numberOfLines={1} style={styles.name}>
          {comment?.user?.fullName}
        </Text>
        <Text style={styles.comment}>{comment?.text}</Text>
      </View>
    </View>
  );
};

export default CommentCard;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 5,
    flexDirection: "row",

    gap: 7,
    alignItems: "center",
    padding: 10,
  },
  user: {
    flexBasis: "60%",
  },
  name: {
    fontSize: 12,
    fontFamily: "semibold",
  },

  image: {
    width: 40,
    height: 40,
    borderRadius: 55,
    resizeMode: "contain",
  },
  comment: {
    fontSize: 12,
    fontFamily: "regular",
    marginTop: -4,
  },
});

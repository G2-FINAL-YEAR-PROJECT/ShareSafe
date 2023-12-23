import { View, Text } from "react-native";
import { COLORS, SIZES } from "../../constants";

const Profile = () => {
  return (
    <View style={[SIZES.safeAreaView, { backgroundColor: COLORS.white }]}>
      <Text>Profile</Text>
    </View>
  );
};

export default Profile;

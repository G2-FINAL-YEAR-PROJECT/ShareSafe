import { View, Text } from "react-native";
import { COLORS, SIZES } from "../../constants";

const LikesTab = () => {
  return (
    <View style={[SIZES.safeAreaView, { backgroundColor: COLORS.white }]}>
      <Text>LikesTab</Text>
    </View>
  );
};

export default LikesTab;

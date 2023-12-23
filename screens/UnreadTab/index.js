import { View, Text } from "react-native";
import { COLORS, SIZES } from "../../constants";

const UnreadTab = () => {
  return (
    <View style={[SIZES.safeAreaView, { backgroundColor: COLORS.white }]}>
      <Text>UnreadTab</Text>
    </View>
  );
};

export default UnreadTab;

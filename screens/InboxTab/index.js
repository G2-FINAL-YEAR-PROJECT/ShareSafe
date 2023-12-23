import { View, Text } from "react-native";
import { COLORS, SIZES } from "../../constants";

const InboxTab = () => {
  return (
    <View style={[SIZES.safeAreaView, { backgroundColor: COLORS.white }]}>
      <Text>InboxTab</Text>
    </View>
  );
};

export default InboxTab;

import { View, Text } from "react-native";
import { COLORS, SIZES } from "../../constants";

const ReportsTab = () => {
  return (
    <View style={[SIZES.safeAreaView, { backgroundColor: COLORS.white }]}>
      <Text>ReportsTab</Text>
    </View>
  );
};

export default ReportsTab;

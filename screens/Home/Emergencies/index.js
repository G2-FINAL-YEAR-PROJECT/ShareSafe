import { View, Text } from "react-native";
import { COLORS, SIZES } from "../../../constants";

const Emergencies = () => {
  return (
    <View style={[SIZES.safeAreaView, { backgroundColor: COLORS.white }]}>
      <Text>Emergencies</Text>
    </View>
  );
};

export default Emergencies;

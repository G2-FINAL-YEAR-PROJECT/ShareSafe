import { View, Text } from "react-native";
import { SIZES, COLORS } from "../../constants";

const ArchiveTab = () => {
  return (
    <View style={[SIZES.safeAreaView, { backgroundColor: COLORS.white }]}>
      <Text>ArchiveTab</Text>
    </View>
  );
};

export default ArchiveTab;

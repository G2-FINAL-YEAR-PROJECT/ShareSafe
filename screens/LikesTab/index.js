import { View, Text } from "react-native";
import { COLORS, SIZES } from "../../constants";
import { useRoute } from "@react-navigation/native";
import { useAuth } from "../../store";

const LikesTab = () => {
  const { userProfile } = useAuth();

  return (
    <View style={[SIZES.safeAreaView, { backgroundColor: COLORS.white }]}>
      <Text>LikesTab</Text>
    </View>
  );
};

export default LikesTab;

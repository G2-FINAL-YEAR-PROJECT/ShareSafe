import { Text, View } from "react-native";
import { COLORS, SIZES } from "../../constants";

const Home = () => {
  return (
    <View style={[SIZES.safeAreaView, { backgroundColor: COLORS.white }]}>
      <Text>Home</Text>
    </View>
  );
};

export default Home;

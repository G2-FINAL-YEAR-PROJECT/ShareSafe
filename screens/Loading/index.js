import { View, ActivityIndicator } from "react-native";
import { COLORS } from "../../constants";

const Loading = ({ color }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.white,
      }}
    >
      <ActivityIndicator
        size={"large"}
        color={color ? color : COLORS.primary}
      />
    </View>
  );
};

export default Loading;

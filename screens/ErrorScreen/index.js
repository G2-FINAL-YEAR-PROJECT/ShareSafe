import { View, Text } from "react-native";
import { COLORS } from "../../constants";

const ErrorScreen = ({ message }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.white,
      }}
    >
      <Text style={{ color: COLORS.red, fontFamily: "semibold", fontSize: 18 }}>
        {message}
      </Text>
    </View>
  );
};

export default ErrorScreen;

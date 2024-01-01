import { View, Text, Image } from "react-native";
import { COLORS } from "../../constants";

const oops = require("../../assets/images/oops.jpg");

const TemplateScreen = ({ message }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.white,
      }}
    >
      <Image
        source={oops}
        style={{ width: 300, height: 300, resizeMode: "cover" }}
      />
      <Text
        style={{ color: COLORS.primary, fontFamily: "semibold", fontSize: 17 }}
      >
        {message}
      </Text>
    </View>
  );
};

export default TemplateScreen;

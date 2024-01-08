import { View, Image } from "react-native";
import { COLORS } from "../../constants";

const search = require("../../assets/images/search.jpg");

const EmptySearch = () => {
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
        source={search}
        style={{ width: 300, height: 300, resizeMode: "cover" }}
      />
    </View>
  );
};

export default EmptySearch;

import { View, Text } from "react-native";
import { globalStyles } from "../../constants";

const Welcome = () => {
  return (
    <View style={globalStyles.container}>
      <View>
        <Text style={globalStyles.h1}>Hi Miko, Welcome</Text>
        <Text style={globalStyles.p}>Select who to follow</Text>
      </View>
    </View>
  );
};

export default Welcome;

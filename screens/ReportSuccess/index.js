import { StyleSheet, Text, View, Image, Linking } from "react-native";
import { COLORS, SIZES } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { Button } from "../../ui";

const ReportSuccess = ({ navigation }) => {
  const phone = (
    <Ionicons name="ios-call-sharp" size={24} color={COLORS.white} />
  );

  const { params } = useRoute();

  const handleCall = () => {
    Linking.openURL(`tel:${params.channelContact}`);
  };

  return (
    <View
      style={[
        SIZES.safeAreaView,
        {
          backgroundColor: COLORS.white,
          justifyContent: "center",
          alignItems: "center",
        },
      ]}
    >
      <Image source={require("../../assets/images/success.png")} />
      <Text
        style={{
          width: "50%",
          textAlign: "center",
          fontSize: 28,
          fontFamily: "semibold",
          marginTop: 18,
        }}
      >
        Report Submitted
      </Text>
      <View style={{ width: "100%", marginTop: 17 }}>
        <Button icon={phone} textStyle={{ fontSize: 14 }} onPress={handleCall}>
          {params.channelName}
        </Button>
        <Button onPress={() => navigation.navigate("Home")}>Go Home</Button>
      </View>
    </View>
  );
};

export default ReportSuccess;

const styles = StyleSheet.create({});

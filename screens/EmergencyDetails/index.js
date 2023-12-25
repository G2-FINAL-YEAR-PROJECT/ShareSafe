import { View, Text } from "react-native";
import { EmergencyPostCard } from "../../ui";
import { useRoute } from "@react-navigation/native";
import { COLORS, SIZES } from "../../constants";
import React from "react";

const EmergencyDetails = () => {
  const route = useRoute();
  const { post } = route.params;
  return (
    <View
      style={[
        SIZES.safeAreaView,
        { paddingTop: 8, backgroundColor: COLORS.white },
      ]}
    >
      <EmergencyPostCard post={post} emergencyDetailIsActive />
    </View>
  );
};

export default EmergencyDetails;

import { StyleSheet, Text, ScrollView } from "react-native";
import { COLORS, SIZES } from "../../constants";
import React from "react";

const EditProfile = () => {
  return (
    <ScrollView
      style={[
        SIZES.safeAreaView,
        { paddingTop: 8, backgroundColor: COLORS.white },
      ]}
    >
      <Text>EditProfile</Text>
    </ScrollView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({});

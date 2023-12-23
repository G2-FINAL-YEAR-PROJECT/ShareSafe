import { StyleSheet, Text, View } from "react-native";
import { COLORS, SIZES } from "../../constants";

const Search = () => {
  return (
    <View style={[SIZES.safeAreaView, { backgroundColor: COLORS.white }]}>
      <Text>Search</Text>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({});

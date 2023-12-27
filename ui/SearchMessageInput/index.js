import { StyleSheet, TextInput, View } from "react-native";
import { COLORS } from "../../constants";

const SearchMessageInput = ({
  inputIsFocused,
  placeholder,
  value,
  handleChange,
  handleFocus,
  handleBlur,
}) => {
  return (
    <View style={styles.searchContainer(inputIsFocused)}>
      <TextInput
        style={styles.searchInput}
        placeholderTextColor="#252525"
        cursorColor={COLORS.black}
        placeholder={placeholder}
        value={value}
        onChangeText={(text) => handleChange(text)}
        onFocus={() => handleFocus()}
        onBlur={() => handleBlur()}
      />
    </View>
  );
};

export default SearchMessageInput;

const styles = StyleSheet.create({
  searchContainer: (inputIsFocused) => {
    return {
      borderWidth: inputIsFocused ? 2 : 1,
      borderColor: inputIsFocused ? COLORS.black : COLORS.gray2,
      borderRadius: 5,
    };
  },

  searchInput: {
    width: "100%",
    backgroundColor: "transparent",
    paddingVertical: 12,
    fontSize: 12,
    fontFamily: "medium",
    paddingLeft: 25,
    paddingRight: 13,
  },
});

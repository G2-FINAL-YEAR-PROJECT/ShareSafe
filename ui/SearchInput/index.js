import { StyleSheet, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants";

const SearchInput = ({
  value,
  placeholder,
  inputIsFocused,
  handleChange,
  handleBlur,
  handleFocus,
}) => {
  return (
    <View style={styles.inputContainer(inputIsFocused)}>
      <TextInput
        style={styles.input}
        placeholderTextColor={COLORS.black2}
        cursorColor={COLORS.black}
        placeholder={placeholder}
        value={value}
        onChangeText={(text) => handleChange(text)}
        onFocus={() => handleFocus()}
        onBlur={() => handleBlur()}
      />
      <Ionicons name="search" size={24} color={COLORS.black2} />
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  inputContainer: (inputIsFocused) => {
    return {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: inputIsFocused ? 2 : 1,
      borderColor: inputIsFocused ? COLORS.black : COLORS.gray4,
      borderRadius: 5,
      paddingRight: 13,
    };
  },

  input: {
    flex: 1,
    paddingLeft: 18,
    paddingVertical: 12,
    fontSize: 12,
    fontFamily: "medium",
  },
});

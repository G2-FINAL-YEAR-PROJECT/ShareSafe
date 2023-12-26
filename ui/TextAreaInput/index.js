import { StyleSheet, View, TextInput } from "react-native";
import { COLORS } from "../../constants";

const TextAreaInput = ({
  value,
  placeholder,
  numberOfLines,
  cursorColor,
  borderColor,
  height,
  inputIsFocused,
  handleChange,
  handleBlur,
  handleFocus,
}) => {
  return (
    <View style={styles.inputContainer(inputIsFocused, borderColor, height)}>
      <TextInput
        style={styles.reportInput}
        multiline={true}
        numberOfLines={numberOfLines}
        placeholderTextColor="rgba(0, 0, 0, 0.50)"
        cursorColor={cursorColor ? cursorColor : COLORS.black}
        placeholder={placeholder}
        value={value}
        onChangeText={(text) => handleChange(text)}
        onFocus={() => handleFocus()}
        onBlur={() => handleBlur()}
      />
    </View>
  );
};

export default TextAreaInput;

const styles = StyleSheet.create({
  inputContainer: (inputIsFocused, borderColor, height) => {
    return {
      height: height,
      // marginTop: 12,
      paddingHorizontal: 12,
      paddingVertical: 10,
      borderColor: borderColor ? borderColor : COLORS.black,
      borderWidth: inputIsFocused ? 2 : 1.5,
      borderRadius: 10,
      backgroundColor: COLORS.white,
    };
  },
  reportInput: {
    fontSize: 15,
    textAlignVertical: "top",
  },
});

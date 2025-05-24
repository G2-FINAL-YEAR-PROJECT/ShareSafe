import { StyleSheet, View, TextInput } from "react-native";
import { COLORS } from "../../constants";

const TextAreaInput = ({
  value,
  placeholder,
  numberOfLines,
  cursorColor,
  borderColor,
  height,
  padding,
  hideBorder,
  inputIsFocused,
  handleChange,
  handleBlur,
  handleFocus,
}) => {
  return (
    <View
      style={styles.inputContainer(
        inputIsFocused,
        borderColor,
        height,
        hideBorder,
        padding
      )}
    >
      <TextInput
        style={styles.reportInput}
        multiline={true}
        numberOfLines={numberOfLines}
        placeholderTextColor="rgba(0, 0, 0, 0.50)"
        cursorColor={cursorColor ? cursorColor : COLORS.black}
        placeholder={placeholder}
        value={value}
        onChangeText={(text) => handleChange(text)}
        onFocus={() => handleFocus && handleFocus()}
        onBlur={() => handleBlur && handleBlur()}
      />
    </View>
  );
};

export default TextAreaInput;

const styles = StyleSheet.create({
  inputContainer: (
    inputIsFocused,
    borderColor,
    height,
    hideBorder,
    padding
  ) => {
    return {
      height: height,
      paddingHorizontal: padding ?? 12,
      paddingVertical: padding ?? 10,
      borderWidth: hideBorder ? null : inputIsFocused ? 2 : 1.5,
      borderColor: borderColor ? borderColor : COLORS.black,
      borderRadius: 10,
      backgroundColor: COLORS.white,
    };
  },
  reportInput: {
    fontSize: 15,
    textAlignVertical: "top",
  },
});

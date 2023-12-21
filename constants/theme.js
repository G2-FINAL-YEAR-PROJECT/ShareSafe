import { Dimensions } from "react-native";
const { height, width } = Dimensions.get("window");

export const COLORS = {
  primary: "#4141FF",

  gray: "#EBEBEB",
  gray2: "#D0D5DD",
  gray3: "#BBB4B5",
  gray4: "#999DA3",

  white: "#FFFFFF",
  offWhite: "#eeeeee",
  black: "#000000",
  red: "#e81e4d",
  green: "#24FF00",
};

export const SIZES = {
  xSmall: 10,
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 44,
  height,
  width,

  safeAreaView: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 50 : 0,
    paddingHorizontal: 22,
  },
};

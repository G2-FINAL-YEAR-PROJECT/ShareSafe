import { Dimensions } from "react-native";
const { height, width } = Dimensions.get("window");

export const COLORS = {
  primary: "#4141FF",

  gray: "#EBEBEB",
  gray2: "#D0D5DD",
  gray3: "#BBB4B5",
  gray4: "#919194",
  gray5: "#999DA3",
  gray6: "#C1C1C5",
  gray8: "#79797B",

  white: "#FFFFFF",
  offWhite: "#eeeeee",
  black: "#000000",
  black2: "#252525",
  red: "#e81e4d",
  green: "#24FF00",
  aConBg: "#F7E7D0",
  aConText: "#85715A",
  conBg: "#4CAF50",
  conText: "#C8E6C9",
  respondBg: "#FFC107",
  respondText: "#FFF59D",
  resolveBg: "#009688",
  resolveText: "#B2DFDB",
  dismissBg: "#F44336",
  dismissText: "#FFEBEE",
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

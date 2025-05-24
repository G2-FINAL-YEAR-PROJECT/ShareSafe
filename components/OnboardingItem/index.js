import {
  View,
  Text,
  Image,
  useWindowDimensions,
  StyleSheet,
} from "react-native";

const OnboardingItem = ({ item }) => {
  const { width } = useWindowDimensions();
  return (
    <View style={[styles.container, { width }]}>
      <Image
        source={item.image}
        style={[styles.image, { width: width / 1.07, resizeMode: "contain" }]}
      />
      <View style={{ flex: 0.15, marginVertical: 27 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    flex: 0.7,
    justifyContent: "center",
  },

  title: {
    fontSize: 23,
    letterSpacing: 0.374,
    textAlign: "center",
    fontFamily: "semibold",
  },
  description: {
    letterSpacing: 0.374,
    fontFamily: "regular",
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 36,
  },
});
export default OnboardingItem;

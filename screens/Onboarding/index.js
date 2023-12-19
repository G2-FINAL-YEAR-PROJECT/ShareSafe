import { View, FlatList, Animated } from "react-native";
import { useState, useRef } from "react";
import { onboardingData } from "../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { OnboardingItem, Paginator } from "../../components";
import { Button } from "../../ui";
import styles from "./styles";

const Onboarding = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  async function handleNext() {
    if (currentIndex < onboardingData.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      try {
        await AsyncStorage.setItem("@viewedOnboarding", "true");
        navigation.navigate("Login");
      } catch (err) {
        console.log("Error @setItem: ", err);
      }
    }
  }

  async function handleGetStarted() {
    try {
      await AsyncStorage.setItem("@viewedOnboarding", "true");
      navigation.navigate("Login");
    } catch (err) {
      console.log("Error @setItem: ", err);
    }
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 3 }}>
        <FlatList
          data={onboardingData}
          renderItem={({ item }) => <OnboardingItem item={item} />}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
            }
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>
      <View style={styles.navBox}>
        <View style={{ marginHorizontal: 18 }}>
          <Button onPress={handleGetStarted}>Get started</Button>

          <View style={styles.navItem}>
            <Paginator data={onboardingData} scrollX={scrollX} />
            <Button
              buttonStyle={styles.nextBtn}
              textStyle={{ fontSize: 14 }}
              onPress={handleNext}
            >
              Next
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Onboarding;

import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { COLORS, globalStyles } from "../../constants";
import { useAuth } from "../../store";
import { Button } from "../../ui";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiClient } from "../../config";

const Welcome = () => {
  const navigator = useNavigation();
  const { userData } = useAuth();
  const [loading, setLoading] = useState(false);
  const [welcomeData, setWelcomeData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await apiClient.get("/users/recommended");
      const data = res.data.data;
      setWelcomeData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const onItemClick = (id) => {
    let updatedSelection;
    if (selectedItems.includes(id)) {
      updatedSelection = selectedItems.filter((itemId) => itemId !== id);
    } else {
      updatedSelection = [...selectedItems, id];
    }
    setSelectedItems(updatedSelection);
  };

  const handleSubmit = async () => {
    if (selectedItems.length < 3) {
      alert("Select at least 3 accounts to follow!");
      return;
    }
    setLoading(true);
    try {
      const res = await apiClient.put("/users/follow", { users: selectedItems });
      if (res.data.status !== 200) {
        alert("An error occurred. Please try again");
        return;
      }
      // Go to home screen
      await AsyncStorage.removeItem("@showWelcomeScreen");
      navigator.navigate("BottomTabStack");
    } catch (error) {
      console.log("showWelcomeScreen: ", error);
      alert("An error occurred. Please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={[globalStyles.h2, { textAlign: "center" }]}>
          Welcome, {userData?.fullName}
        </Text>

        <Text style={styles.heading}>Select who to follow</Text>
        <Text style={styles.sub}>We have made available the reliable sources just for you</Text>

        <View style={styles.welcomeGrid}>
          {welcomeData.map((item) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.7}
              style={{ marginBottom: 16, marginRight: 15 }}
              onPress={() => onItemClick(item.id)}
            >
              <Text style={[styles.gridItem, selectedItems.includes(item.id) && styles.selected]}>
                {item.fullName}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Button onPress={handleSubmit} loading={loading} buttonStyle={{ marginTop: 45 }}>
          Continue
        </Button>
      </View>
    </ScrollView>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
    paddingTop: 40,
  },
  heading: {
    fontSize: 26,
    fontFamily: "medium",
    textAlign: "center",
    marginTop: 35,
  },
  sub: {
    ...globalStyles.p,
    textAlign: "center",
    paddingBottom: 10,
  },
  welcomeGrid: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 30,
  },
  gridItem: {
    padding: 10,
    paddingHorizontal: 25,
    fontSize: 17,
    fontFamily: "medium",
    borderRadius: 22,
    overflow: "hidden",
    color: COLORS.black,
    backgroundColor: COLORS.gray2,
  },
  selected: {
    color: COLORS.white,
    backgroundColor: COLORS.primary,
  },
});

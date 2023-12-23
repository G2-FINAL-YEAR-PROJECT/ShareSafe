import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { COLORS, globalStyles } from "../../constants";
import { useAuth } from "../../store";
import { Button } from "../../ui";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Welcome = () => {
  const navigator = useNavigation();
  const { userData } = useAuth();
  const [selectedItems, setSelectedItems] = useState([]);

  const welcomeData = [
    { id: "40", name: "Lasu News" },
    { id: "29", name: "Lasu Connect" },
    { id: "79", name: "Punch" },
    { id: "33", name: "Lasusu" },
    { id: "85", name: "Nigeria Police" },
    { id: "47", name: "The Nations" },
    { id: "26", name: "LASEMA" },
    { id: "36", name: "Tribune" },
    { id: "72", name: "Lasu Connect" },
    { id: "67", name: "The Punch" },
    { id: "42", name: "TVC" },
    { id: "61", name: "Lasu Health Center" },
    // { id: "142", name: "TVC" },
    // { id: "185", name: "Nigeria Police" },
    // { id: "140", name: "Lasu News" },
    // { id: "167", name: "Lasusu" },
    // { id: "136", name: "Tribune" },
  ];

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
    // console.log("selectedItems: ", selectedItems);
    if (selectedItems.length < 3) {
      alert("Select at least 3 accounts to follow!");
      return;
    }

    // TODO: API call
    await AsyncStorage.setItem("@hideWelcomeScreen", "true");
    navigator.navigate("BottomTabStack");
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={[globalStyles.h2, { textAlign: "center" }]}>
          Hi {userData?.fullName}, Welcome
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
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Button onPress={handleSubmit} buttonStyle={{ marginTop: 45 }}>
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
    paddingTop: 35,
  },
  heading: {
    fontSize: 26,
    fontFamily: "medium",
    textAlign: "center",
    marginTop: 40,
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

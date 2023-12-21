import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS, globalStyles } from "../../constants";
import { useAuth } from "../../store";
import { Button } from "../../ui";
import { useState } from "react";

const Welcome = () => {
  const { userData, logout } = useAuth();
  const [selectedItems, setSelectedItems] = useState([]);

  console.log("Welcome: ", userData);
  console.log("selectedItems: ", selectedItems);

  const welcomeData = [
    { id: "40", name: "Lasu News" },
    { id: "29", name: "Lasu Connect" },
    { id: "79", name: "Punch" },
    { id: "33", name: "Lasusu" },
    { id: "85", name: "Nigeria Police" },
    { id: "47", name: "The Nations" },
    { id: "26", name: "LASEMA" },
    { id: "36", name: "Tribune" },
    { id: "42", name: "TVC" },
    { id: "67", name: "Lasusu" },
    { id: "61", name: "Nigeria Police" },
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

  const handleSubmit = () => {
    //
    console.log("selectedItems: ", selectedItems);
  };

  return (
    <View style={styles.container}>
      <View>
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
              style={{ marginBottom: 18, marginRight: 15 }}
              onPress={() => onItemClick(item.id)}
            >
              <Text style={[styles.gridItem, selectedItems.includes(item.id) && styles.selected]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Button onPress={handleSubmit} buttonStyle={{ marginTop: 60 }}>
          Continue
        </Button>
        {/* <Button onPress={() => logout()}>Logout</Button> */}
      </View>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
    marginTop: 60,
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
  },
  welcomeGrid: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 45,
  },
  gridItem: {
    padding: 10,
    paddingHorizontal: 25,
    fontSize: 17,
    fontFamily: "medium",
    borderRadius: 26,
    color: COLORS.black,
    backgroundColor: COLORS.gray2,
  },
  selected: {
    color: COLORS.white,
    backgroundColor: COLORS.primary,
  },
});

import { View, FlatList } from "react-native";
import { useState } from "react";
import { emergencyList } from "../../../data";
import { EmergencyPostCard, SearchInput } from "../../../ui";
import { COLORS, SIZES } from "../../../constants";

const Emergencies = () => {
  const [searchString, setSearchString] = useState("");
  const [inputIsFocused, setInputIsFocused] = useState(false);

  return (
    <View
      style={[
        SIZES.safeAreaView,
        {
          backgroundColor: COLORS.white,
          paddingTop: 28,
          paddingBottom: 90,
        },
      ]}
    >
      <View style={{ marginBottom: 30 }}>
        <SearchInput
          value={searchString}
          placeholder="Search emergencies"
          inputIsFocused={inputIsFocused}
          handleChange={(text) => setSearchString(text)}
          handleFocus={() => setInputIsFocused(true)}
          handleBlur={() => setInputIsFocused(false)}
        />
      </View>

      <FlatList
        data={emergencyList}
        renderItem={({ item }) => <EmergencyPostCard post={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Emergencies;

import { View, FlatList } from "react-native";
import { emergencyList } from "../../data";
import { EmergencyPostCard } from "../../ui";
import { COLORS, SIZES } from "../../constants";

const ReportsTab = () => {
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
      <FlatList
        data={emergencyList}
        renderItem={({ item }) => <EmergencyPostCard post={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default ReportsTab;

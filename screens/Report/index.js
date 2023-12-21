import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { COLORS, SIZES } from "../../constants";
import { reportType } from "../../data";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Button } from "../../ui";

const Report = () => {
  const [reportTypeId, setReportTypeId] = useState("");
  const [inputIsFocused, setInputIsFocused] = useState(false);
  const [locationIsFocused, setLocationIsFocused] = useState(false);

  const [reportText, setReportText] = useState("");
  const [locationText, setLocationText] = useState("");

  const handleChooseReportType = (id) => {
    setReportTypeId((prevId) => (prevId === id ? "" : id));
  };
  return (
    <View style={[SIZES.safeAreaView, styles.view]}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View>
          <Text
            style={[
              styles.titleText(18, "semibold", 0.5),
              { color: COLORS.black },
            ]}
          >
            Choose report type
          </Text>
          <View style={styles.categories}>
            {reportType.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => handleChooseReportType(item.id)}
              >
                <View style={styles.reportTypeBox(item.id, reportTypeId)}>
                  <Text
                    style={[
                      styles.titleText(
                        15,
                        "medium",
                        0.5,
                        item.id,
                        reportTypeId
                      ),
                      {
                        textAlign: "center",
                        paddingVertical: 4,
                        paddingHorizontal: 15,
                      },
                    ]}
                  >
                    {item.type}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.reportContainer}>
          <Text
            style={[
              styles.titleText(18, "semibold", 0.5),
              { color: COLORS.black },
            ]}
          >
            Describe report
          </Text>
          <View style={styles.inputContainer(inputIsFocused)}>
            <TextInput
              style={styles.reportInput}
              multiline={true}
              numberOfLines={70}
              placeholderTextColor="rgba(0, 0, 0, 0.50)"
              cursorColor={COLORS.black}
              placeholder="Help will be readily available, kindly 
describe your situation..."
              value={reportText}
              onChangeText={(text) => setReportText(text)}
              onFocus={() => setInputIsFocused(true)}
              onBlur={() => setInputIsFocused(false)}
            />
          </View>
        </View>

        <View style={styles.reportContainer}>
          <Text
            style={[
              styles.titleText(18, "semibold", 0.5),
              { color: COLORS.black },
            ]}
          >
            Channel to report to
          </Text>
        </View>

        <View style={styles.reportContainer}>
          <Text
            style={[
              styles.titleText(18, "semibold", 0.5),
              { color: COLORS.black },
            ]}
          >
            Location
          </Text>
          <View style={styles.locationContainer(locationIsFocused)}>
            <TextInput
              style={styles.locationInput}
              placeholderTextColor="#252525"
              cursorColor={COLORS.black}
              placeholder="Search Location"
              value={locationText}
              onChangeText={(text) => setLocationText(text)}
              onFocus={() => setLocationIsFocused(true)}
              onBlur={() => setLocationIsFocused(false)}
            />
            <Ionicons name="search" size={24} color="#252525" />
          </View>
        </View>

        <View style={{ marginTop: 17 }}>
          <Text
            style={[
              styles.titleText(18, "semibold", 0.5),
              { color: COLORS.black },
            ]}
          >
            Share file (Video, Audio, Image)
          </Text>
        </View>

        <Button buttonStyle={{ marginTop: 43 }}>Submit</Button>
      </ScrollView>
    </View>
  );
};

export default Report;

const styles = StyleSheet.create({
  view: {
    backgroundColor: COLORS.white,
    paddingTop: 15,
    width: SIZES.width,
    paddingBottom: 80,
  },

  titleText: (size, weight, spacing, itemId, reportId) => {
    return {
      fontSize: size,
      fontFamily: weight,
      letterSpacing: spacing,
      color: itemId === reportId ? COLORS.white : COLORS.black,
    };
  },

  categories: {
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
    marginTop: 10,
  },

  reportTypeBox: (itemId, reportId) => {
    return {
      borderWidth: 2,
      borderColor: COLORS.primary,
      borderRadius: 50,
      backgroundColor: itemId === reportId ? COLORS.primary : "transparent",
    };
  },

  reportContainer: {
    marginTop: 21,
  },

  inputContainer: (inputIsFocused) => {
    return {
      height: 130,
      marginTop: 12,
      paddingHorizontal: 12,
      paddingVertical: 10,
      borderColor: COLORS.black,
      borderWidth: inputIsFocused ? 2 : 1,
      borderRadius: 10,
    };
  },
  reportInput: {
    fontSize: 15,
    textAlignVertical: "top",
  },

  locationContainer: (locationIsFocused) => {
    return {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: locationIsFocused ? 2 : 1,
      borderColor: locationIsFocused ? COLORS.black : COLORS.gray4,
      borderRadius: 5,
      paddingRight: 13,
      marginTop: 15,
    };
  },

  locationInput: {
    flex: 1,
    paddingLeft: 18,
    paddingVertical: 12,
    fontSize: 12,
    fontFamily: "medium",
  },
});

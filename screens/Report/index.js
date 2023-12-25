import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Button, SearchInput } from "../../ui";
import { COLORS, SIZES } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import { reportType, channels } from "../../data";
import { useState, useEffect } from "react";

import SelectDropdown from "react-native-select-dropdown";
import styles from "./styles";

const Report = ({ navigation }) => {
  const [reportTypeId, setReportTypeId] = useState("");
  const [inputIsFocused, setInputIsFocused] = useState(false);
  const [locationIsFocused, setLocationIsFocused] = useState(false);

  const [reportText, setReportText] = useState("");
  const [locationText, setLocationText] = useState("");
  const [channelValue, setChannelValue] = useState("");
  const [channelContact, setChannelContact] = useState("");

  const filteredChannel = channels[reportTypeId];

  const handleChooseReportType = (id) => {
    setReportTypeId((prevId) => (prevId === id ? "" : id));
    setChannelValue("");
  };

  useEffect(() => {
    navigation.addListener("focus", () => {
      setReportTypeId("");
      setInputIsFocused(false);
      setLocationIsFocused(false);
      setReportText("");
      setLocationText("");
      setChannelValue("");
      setChannelContact("");
    });
  }, [navigation]);

  const handleSubmit = () => {
    navigation.navigate("ReportSuccess", { channelValue, channelContact });
  };
  return (
    <View style={[SIZES.safeAreaView, styles.view]}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* CHOOSE REPORT TYPE */}
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

        {/* DESCRIBE REPORT */}
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

        {/* CHANNEL TO REPORT */}

        <View style={styles.reportContainer}>
          <Text
            style={[
              styles.titleText(18, "semibold", 0.5),
              { color: COLORS.black },
            ]}
          >
            Channel to report to
          </Text>

          <View style={{ marginTop: 14 }}>
            <SelectDropdown
              data={
                reportTypeId
                  ? filteredChannel
                  : ["Please choose report type first"]
              }
              onSelect={(selectedItem) => {
                if (!selectedItem.name) {
                  alert("Please choose report type first");
                  return;
                }
                setChannelValue(selectedItem.name);
                setChannelContact(selectedItem.contact);
                console.log(selectedItem.name);
              }}
              buttonTextAfterSelection={(selectedItem) => {
                return selectedItem.name ? selectedItem.name : selectedItem;
              }}
              rowTextForSelection={(item) => {
                return item.name ? item.name : item;
              }}
              renderDropdownIcon={() => (
                <Ionicons
                  name="chevron-down-outline"
                  size={24}
                  color={channelValue ? COLORS.white : COLORS.black}
                />
              )}
              buttonStyle={styles.buttonStyle(channelValue)}
              buttonTextStyle={styles.buttonTextStyle(channelValue)}
              dropdownStyle={{ marginTop: -22, borderRadius: 10 }}
              rowTextStyle={styles.rowTextStyle}
              selectedRowStyle={styles.selectedRowStyle}
              selectedRowTextStyle={styles.selectedRowTextStyle}
              defaultButtonText="Select channel..."
            />
          </View>
        </View>

        {/* CHOOSE LOCATION */}
        <View style={styles.reportContainer}>
          <Text
            style={[
              styles.titleText(18, "semibold", 0.5),
              { color: COLORS.black },
            ]}
          >
            Location
          </Text>
          <View style={{ marginTop: 15 }}>
            <SearchInput
              value={locationText}
              inputIsFocused={locationIsFocused}
              placeholder="Search Location"
              handleChange={(text) => setLocationText(text)}
              handleFocus={() => setLocationIsFocused(true)}
              handleBlur={() => setLocationIsFocused(false)}
            />
          </View>
        </View>

        {/* SHARE FILE */}
        <View style={{ marginTop: 17 }}>
          <Text
            style={[
              styles.titleText(18, "semibold", 0.5),
              { color: COLORS.black },
            ]}
          >
            Share file (Video, Audio, Image)
          </Text>

          <TouchableOpacity style={{ maxWidth: "36%", marginTop: 17 }}>
            <View style={styles.upload}>
              <Text style={styles.uploadText}>Choose file</Text>
              <Ionicons
                name="attach-sharp"
                size={22}
                color={COLORS.white}
                style={{ transform: [{ rotate: "45deg" }] }}
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* SUBMIT REPORT */}
        <Button buttonStyle={{ marginTop: 43 }} onPress={handleSubmit}>
          Submit
        </Button>
      </ScrollView>
    </View>
  );
};

export default Report;

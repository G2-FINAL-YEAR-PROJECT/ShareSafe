import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Button, SearchInput, TextAreaInput } from "../../ui";
import { COLORS, SIZES } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import { reportType, channels } from "../../data";
import { useState, useEffect } from "react";

import SelectDropdown from "react-native-select-dropdown";
import styles from "./styles";
import { apiClient } from "../../config";

const Report = ({ navigation }) => {
  const [reportTypeId, setReportTypeId] = useState("");
  const [inputIsFocused, setInputIsFocused] = useState(false);
  const [locationIsFocused, setLocationIsFocused] = useState(false);

  const [reportText, setReportText] = useState("");
  const [channelValue, setChannelValue] = useState("");
  const [channelContact, setChannelContact] = useState("");

  const [locationText, setLocationText] = useState("");
  const [locationOptions, setLocationOptions] = useState([]);
  const [locationPosition, setLocationPosition] = useState("");

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

    return () => {
      navigation.removeListener("focus");
    };
  }, [navigation]);

  const handleSubmit = () => {
    navigation.navigate("ReportSuccess", { channelValue, channelContact });
  };

  const fetchLocationSuggestions = async (text) => {
    const query = encodeURIComponent(text);
    const APIkey = "PaA8Afj9ZNhZCar4RZURXdGUuZAaTNLI";
    // console.log("query: ", query);
    try {
      const url = `https://api.tomtom.com/search/2/search/${query}.json?countrySet=NG&key=${APIkey}&limit=6`;
      const res = await apiClient.get(url);
      let results = res.data.results.map((item) => {
        return {
          name: item.poi?.name || item?.address?.freeformAddress,
          address: item?.address?.freeformAddress,
          position: item?.position,
          type: item?.type,
        };
      });
      // console.log(results);
      setLocationOptions(results);
    } catch (error) {}
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

          <View style={{ marginTop: 12 }}>
            <TextAreaInput
              value={reportText}
              inputIsFocused={inputIsFocused}
              placeholder="Help will be readily available, kindly describe your situation..."
              numberOfLines={70}
              height={130}
              handleChange={(text) => setReportText(text)}
              handleFocus={() => setInputIsFocused(true)}
              handleBlur={() => setInputIsFocused(false)}
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
            <SelectDropdown
              data={locationOptions}
              onSelect={(selectedItem, index) => {
                // console.log(selectedItem, index);
                setLocationText(selectedItem);
                setLocationPosition(selectedItem.position); // {"lat": 6.484363, "lon": 3.199292}
              }}
              defaultButtonText={"Search Location"}
              onChangeSearchInputText={(text) => {
                // console.log(text);
                if (text.length > 3) {
                  fetchLocationSuggestions(text);
                }
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                if (selectedItem.type == "POI") {
                  return (
                    <>
                      {selectedItem.name} -{" "}
                      <Text style={{ fontSize: 13 }}>
                        {selectedItem?.address}
                      </Text>
                    </>
                  );
                } else {
                  return selectedItem.name;
                }
              }}
              rowTextForSelection={(item, index) => {
                // console.log("rowTextForSelection:", item);
                if (item.type == "POI") {
                  return (
                    <>
                      {item.name} -{" "}
                      <Text style={{ fontSize: 13, color: "#5b5b5b" }}>
                        {item?.address}
                      </Text>
                    </>
                  );
                } else {
                  return item.name;
                }
              }}
              dropdownIconPosition={"right"}
              buttonStyle={styles.buttonStyle(locationText)}
              buttonTextStyle={styles.buttonTextStyle(locationText)}
              dropdownStyle={{ marginTop: -30, borderRadius: 10 }}
              rowTextStyle={rowTextStyle}
              search
              searchPlaceHolder={"Search here"}
              searchPlaceHolderColor={"darkgrey"}
              renderDropdownIcon={(isOpened) => (
                <Ionicons
                  name="search"
                  size={22}
                  color={locationText ? COLORS.white : COLORS.black}
                />
              )}
              renderSearchInputLeftIcon={() => (
                <Ionicons name={"search"} size={18} />
              )}
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

const rowTextStyle = {
  fontSize: 14,
  fontFamily: "regular",
  textAlign: "left",
  paddingLeft: 8,
  textTransform: "capitalize",
};

export default Report;

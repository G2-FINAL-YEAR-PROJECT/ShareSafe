import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { Button, TextAreaInput } from "../../ui";
import { COLORS, SIZES } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import { reportType } from "../../data";
import { apiClient } from "../../config";
import { useState, useEffect } from "react";
import SelectDropdown from "react-native-select-dropdown";
import styles from "./styles";
import { usePickImage } from "../../hooks";
import { fetchAddress } from "../../services";
import { useLocationContext } from "../../store";
import { uploadToCloudinary } from "../../helpers";

const Report = ({ navigation, route }) => {
  const [reportTypeId, setReportTypeId] = useState("");
  const [inputIsFocused, setInputIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [reportText, setReportText] = useState("");
  const [channelValue, setChannelValue] = useState({});

  const [locationText, setLocationText] = useState("");
  const [locationOptions, setLocationOptions] = useState([]);
  const [locationPosition, setLocationPosition] = useState({});

  const [filteredChannel, setFilteredChannel] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);

  const { currentLocation } = useLocationContext();

  // console.log(currentLocation);
  // console.log(locationPosition);

  const handleChooseReportType = (id) => {
    setReportTypeId((prevId) => (prevId === id ? "" : id));
  };

  useEffect(() => {
    setPreviewImage(route?.params?.imageUri);
  }, [route?.params?.imageUri]);

  const { pickImage } = usePickImage(setPreviewImage);

  useEffect(() => {
    const getChannels = async () => {
      try {
        const res = await apiClient(`/users?category=${reportTypeId}`);
        if (res.data.status !== 200) {
          throw new Error(res.data.message);
        }

        setFilteredChannel(res.data.data.results);
      } catch (error) {
        console.log(error.message);
      }
    };

    if (reportTypeId !== "") {
      getChannels();
    }
  }, [reportTypeId]);

  const postIsValid =
    reportText.trim().length > 0 && locationText.trim().length && channelValue;

  const clearInput = () => {
    setReportTypeId("");
    setInputIsFocused(false);
    setReportText("");
    setLocationText("");
    setChannelValue({});
    setFilteredChannel([]);
    setLocationPosition({});
    setLocationOptions([]);
    setLocationText("");
    setPreviewImage(null);
  };

  const handleSubmit = async () => {
    if (!postIsValid) {
      alert("Please fill all required fields");
      return;
    }

    setIsLoading(true);
    try {
      const imageUrl = await uploadToCloudinary(previewImage);
      const address = await fetchAddress(locationPosition);

      const boundingBox = address?.boundingbox?.map((item) => Number(item));

      let payload = {
        location: locationText,
        status: "PENDING",
        channel: channelValue?.id,
        description: reportText,
        boundaryPoint: boundingBox,
      };

      if (previewImage?.trim().length > 0) {
        payload.file = imageUrl;
      }
      const res = await apiClient.post("/emergency", payload);
      if (res.data?.status !== 200) {
        throw new Error(res.data?.message);
      }
      clearInput();
      setIsLoading(false);
      navigation.navigate("ReportSuccess", {
        channelName: channelValue?.fullName,
        channelContact: channelValue?.phoneNumber,
      });
    } catch (error) {
      alert(error.message);
      console.log("this error", error.message);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
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
                reportTypeId && filteredChannel.length > 0
                  ? filteredChannel
                  : filteredChannel.length < 1 &&
                    reportTypeId.trim().length !== 0
                  ? ["No respondent for this category"]
                  : ["Choose report type first"]
              }
              onSelect={(selectedItem) => {
                if (!selectedItem?.fullName) {
                  alert("Please choose report type first");
                  return;
                }
                const data = {
                  fullName: selectedItem?.fullName,
                  phoneNumber: selectedItem?.phoneNumber,
                  id: selectedItem?.id,
                };
                setChannelValue(data);
              }}
              buttonTextAfterSelection={(selectedItem) => {
                return selectedItem?.fullName
                  ? selectedItem?.fullName
                  : selectedItem;
              }}
              rowTextForSelection={(item) => {
                return item?.fullName ? item?.fullName : item;
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
              data={
                locationOptions?.length > 0 ? locationOptions : currentLocation
              }
              onSelect={(selectedItem) => {
                let location;
                if (selectedItem?.address) {
                  location = `${selectedItem?.name} - ${selectedItem?.address}`;
                } else {
                  location = selectedItem?.name;
                }

                setLocationText(location);
                setLocationPosition(selectedItem.position); // {"lat": 6.484363, "lon": 3.199292}
              }}
              defaultButtonText={"Search Location"}
              onChangeSearchInputText={(text) => {
                if (text.length > 3) {
                  fetchLocationSuggestions(text);
                }
              }}
              buttonTextAfterSelection={(selectedItem) => {
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
        <View style={{ marginTop: 25 }}>
          <Text
            style={[
              styles.titleText(18, "semibold", 0.5),
              { color: COLORS.black },
            ]}
          >
            Share file (Image)
          </Text>

          <View style={styles.mediaBtn}>
            <TouchableOpacity
              style={[styles.media, styles.camera]}
              onPress={() =>
                navigation.navigate("CameraScreen", { from: "Report" })
              }
            >
              <Ionicons name="camera" size={24} color={COLORS.white} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.media, styles.gallery]}
              onPress={pickImage}
            >
              <Ionicons name="images-outline" size={24} color={COLORS.white} />
            </TouchableOpacity>
          </View>

          {/* IMAGE PREVIEW GOES HERE */}

          {previewImage && (
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: previewImage }}
                style={{ width: "100%", height: 500, borderRadius: 10 }}
              />

              <TouchableOpacity
                style={styles.closeImage}
                onPress={() => setPreviewImage(null)}
              >
                <Ionicons
                  name="close-circle-outline"
                  size={35}
                  color={COLORS.primary}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* SUBMIT REPORT */}
        <Button
          buttonStyle={{ marginTop: 43 }}
          loading={isLoading}
          onPress={handleSubmit}
        >
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

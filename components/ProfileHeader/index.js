import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants";
import { useAuth } from "../../store";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { authFetch } from "../../axios";
import styles from "./styles";

const ProfileHeader = () => {
  const route = useRoute();
  const user = route?.params?.params?.user;

  const { userData, logout } = useAuth();
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentUser, setCurrentUser] = useState(userData);

  const fetchSingleUser = async (id) => {
    setIsLoading(true);

    try {
      const res = await authFetch(`/users/${id}`);

      if (res.data.status !== 200) {
        throw new Error(res.data.message);
      }

      setCurrentUser(res.data.data);
      setIsLoading(false);
    } catch (err) {
      setErrorMessage(err.message);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id !== userData.id) {
      fetchSingleUser(user?.id);
    }
  }, []);

  return (
    <View
      style={{
        marginBottom: 30,
        marginTop: 20,
        minWidth: "100%",
        paddingRight: 34,
      }}
    >
      <TouchableOpacity
        style={{ marginBottom: 25 }}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
      </TouchableOpacity>
      {/* PROFILE CARD STARTS */}

      <View style={[styles.cardBox]}>
        {isLoading ? (
          <ActivityIndicator size="small" color={COLORS.white} />
        ) : (
          <>
            <View style={styles.user}>
              <Image
                source={
                  currentUser?.profilePicture
                    ? { uri: currentUser?.profilePicture }
                    : girl
                }
                style={styles.image}
              />
              <View style={{ flexBasis: "40%" }}>
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 14,
                    fontFamily: "bold",
                    color: COLORS.white,
                  }}
                >
                  {currentUser?.fullName}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 11,
                    fontFamily: "regular",
                    color: "#D7D7D7",
                  }}
                >
                  {currentUser?.email}
                </Text>
              </View>
            </View>

            <View style={styles.profileAction}>
              {currentUser?.id !== userData?.id && (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("ChatDetails", {
                      userId: currentUser?.id,
                    })
                  }
                >
                  <Ionicons name="chatbubbles" size={24} color={COLORS.white} />
                </TouchableOpacity>
              )}

              {currentUser?.id !== userData?.id && (
                <TouchableOpacity style={styles.followBtn}>
                  <Text style={styles.followText}>Follow</Text>
                </TouchableOpacity>
              )}

              {currentUser?.id === userData?.id && (
                <TouchableOpacity
                  onPress={() => navigation.navigate("EditProfile")}
                >
                  <MaterialCommunityIcons
                    name="pencil-outline"
                    size={24}
                    color={COLORS.white}
                  />
                </TouchableOpacity>
              )}
            </View>
          </>
        )}
      </View>
      {/* PROFILE CARD ENDS */}

      {/* METRICS STARTS */}
      {isLoading ? (
        <ActivityIndicator size="small" color={COLORS.primary} />
      ) : (
        <View style={styles.metric}>
          <Text style={styles.following("regular")}>
            {currentUser?.followers?.length} followers
          </Text>
          <Text style={styles.following("regular")}>
            {currentUser?.following?.length} following
          </Text>
          <TouchableOpacity style={styles.logout} onPress={() => logout()}>
            <Text style={[styles.following("medium"), { color: COLORS.white }]}>
              Log Out
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ProfileHeader;

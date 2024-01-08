import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants";
import { useAuth } from "../../store";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import styles from "./styles";
import { apiClient } from "../../config";
import { useFollow } from "../../hooks";
import placeHolderImg from "../../assets/images/placeholder.jpg";

const ProfileHeader = () => {
  const route = useRoute();
  const user = route?.params?.params?.user;

  const { userData, logout } = useAuth();
  const navigation = useNavigation();
  const { isFollowing, handleFollowUser, setIsFollowing } = useFollow();

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentUser, setCurrentUser] = useState(userData);

  const fetchSingleUser = async (id) => {
    try {
      const res = await apiClient(`/users/${id}`);

      if (res.data.status !== 200) {
        throw new Error(res.data.message);
      }
      const { data } = res.data;
      setCurrentUser(data);
      setIsFollowing(data?.followers?.includes(userData?.id));
      setIsLoading(false);
    } catch (err) {
      setErrorMessage(err.message);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnfollow = async () => {
    try {
      const res = await apiClient.put(`users/unfollow`, {
        users: [currentUser?.id],
      });

      if (res.data.status === 200) {
        setIsFollowing((prev) => !prev);
      }

      if (res.data.status !== 200) {
        throw new Error(res.data.message);
      }
    } catch (error) {
      console.log("error", error.message);
    }
  };

  const triggerUnfollowAlert = () => {
    Alert.alert(
      `Unfollow ${currentUser?.fullName} `,
      "Are you sure about this",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            handleUnfollow();
          },
        },
      ],
      { cancelable: false }
    );
  };

  useEffect(() => {
    fetchSingleUser(user?.id);
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
          <ActivityIndicator
            size={25}
            color={COLORS.white}
            style={{ paddingVertical: 10, marginHorizontal: "50%" }}
          />
        ) : (
          <>
            <View style={styles.user}>
              <Image
                source={
                  currentUser?.profilePicture
                    ? { uri: currentUser?.profilePicture }
                    : placeHolderImg
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

              {currentUser?.id !== userData?.id && !isFollowing && (
                <TouchableOpacity
                  style={styles.followBtn}
                  onPress={() => handleFollowUser(currentUser?.id)}
                >
                  <Text style={styles.followText}>Follow</Text>
                </TouchableOpacity>
              )}

              {isFollowing && (
                <TouchableOpacity
                  style={styles.followBtn}
                  onPress={triggerUnfollowAlert}
                >
                  <Text style={styles.followText}>Following</Text>
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
      {!isLoading && (
        <View style={styles.metric}>
          <Text style={styles.following("regular")}>
            {currentUser?.followers?.length}{" "}
            {currentUser?.followers?.length > 1 ? "followers" : "follower"}
          </Text>
          <Text style={styles.following("regular")}>
            {currentUser?.following?.length} following
          </Text>

          {currentUser?.id === userData?.id && (
            <TouchableOpacity style={styles.logout} onPress={() => logout()}>
              <Text
                style={[styles.following("medium"), { color: COLORS.white }]}
              >
                Log Out
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

export default ProfileHeader;

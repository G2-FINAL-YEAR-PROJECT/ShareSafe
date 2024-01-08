import { StyleSheet, View, ScrollView, TextInput, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../../constants";
import { useState, useEffect } from "react";
import { apiClient } from "../../config";
import { UserCard } from "../../ui";
import TemplateScreen from "../TemplateScreen";
import ErrorScreen from "../ErrorScreen";
import Loading from "../Loading";
import { EmptySearch } from "../../components";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [users, setUsers] = useState([]);
  const [searchIsFocused, setSearchIsFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchUser = async () => {
    setLoading(true);
    try {
      const res = await apiClient(`/users?search=${searchValue}`);
      if (res.data?.status !== 200) {
        throw new Error(res.data?.message);
      }

      // console.log(res.data?.data?.results);
      setLoading(false);
      if (searchValue.trim() !== "") {
        setUsers(res.data?.data?.results);
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.log(error?.message);
      alert(error?.message);
      setErrorMessage(error?.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUser();
    }, 200);

    return () => clearTimeout(timer);
  }, [searchValue]);
  return (
    <ScrollView
      style={[
        SIZES.safeAreaView,
        {
          backgroundColor: COLORS.white,
          paddingTop: 20,
        },
      ]}
    >
      <View style={styles.searchContainer(searchIsFocused)}>
        <Ionicons name="search" size={24} color="#252525" />
        <TextInput
          style={styles.searchInput}
          placeholderTextColor="#252525"
          cursorColor={COLORS.black}
          placeholder="Search"
          value={searchValue}
          onChangeText={(text) => setSearchValue(text)}
          onFocus={() => setSearchIsFocused(true)}
          onBlur={() => setSearchIsFocused(false)}
        />
      </View>

      <View style={{ marginTop: 30, marginBottom: 100 }}>
        {loading ? (
          <Loading />
        ) : errorMessage ? (
          <ErrorScreen message={errorMessage} />
        ) : searchValue.trim() !== "" && users?.length < 1 ? (
          <TemplateScreen message="User doesn't exist" />
        ) : searchValue?.trim() !== "" && users?.length > 0 ? (
          <View style={{ rowGap: 10 }}>
            {users?.map((user) => (
              <UserCard key={user?.id} currentUser={user} />
            ))}
          </View>
        ) : (
          <EmptySearch />
        )}
      </View>
    </ScrollView>
  );
};

export default Search;

const styles = StyleSheet.create({
  searchContainer: (searchIsFocused) => {
    return {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: searchIsFocused ? 2 : 1,
      borderColor: searchIsFocused ? COLORS.black : "rgba(154, 154, 154, 0.50)",
      borderRadius: 5,
      paddingLeft: 18,
      paddingRight: 13,
      backgroundColor: COLORS.offWhite,
    };
  },

  searchInput: {
    flex: 1,
    backgroundColor: "transparent",
    paddingLeft: 10,
    paddingVertical: 12,
    fontSize: 12,
    fontFamily: "medium",
  },
});

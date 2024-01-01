import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants";

const PostActionModal = ({
  toggleDrawer,
  handlePostAction,
  isDrawerOpen,
  handleDelete,
  forEmergency,
  posterId,
  userData,
  post,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isDrawerOpen}
      onRequestClose={toggleDrawer}
    >
      <TouchableWithoutFeedback onPress={toggleDrawer}>
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <TouchableOpacity
              onPress={toggleDrawer}
              style={styles.drawerHandle}
            >
              <Ionicons name="chevron-down" size={24} color={COLORS.primary} />
            </TouchableOpacity>

            {forEmergency && userData?.id === post?.channel?.id && (
              <>
                <TouchableOpacity
                  onPress={() => handlePostAction("confirmed")}
                  style={[styles.drawerOption, styles.confirmed]}
                >
                  <Text
                    style={{ fontFamily: "semibold", color: COLORS.conText }}
                  >
                    Confirm
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handlePostAction("responding")}
                  style={[styles.drawerOption, styles.responding]}
                >
                  <Text
                    style={{
                      fontFamily: "semibold",
                      color: COLORS.respondText,
                    }}
                  >
                    Responding
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handlePostAction("resolved")}
                  style={[styles.drawerOption, styles.resolved]}
                >
                  <Text
                    style={{
                      fontFamily: "semibold",
                      color: COLORS.resolveText,
                    }}
                  >
                    Resolved
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handlePostAction("dismissed")}
                  style={[styles.drawerOption, styles.dismiss]}
                >
                  <Text
                    style={{
                      fontFamily: "semibold",
                      color: COLORS.dismissText,
                    }}
                  >
                    Dismissed
                  </Text>
                </TouchableOpacity>
              </>
            )}

            {userData?.id === posterId && (
              <TouchableOpacity
                onPress={handleDelete}
                style={styles.drawerOption}
              >
                <Text style={{ fontFamily: "semibold", color: COLORS.red }}>
                  Delete
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default PostActionModal;

const styles = StyleSheet.create({
  // DRAWER

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modal: {
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 5,
    width: "80%",
    rowGap: 8,
    paddingHorizontal: 10,
  },
  drawerHandle: {
    alignItems: "center",
    padding: 10,
  },
  drawerOption: {
    padding: 10,
    borderRadius: 50,
    alignItems: "center",
  },

  // DRAWER ENDS

  confirmed: {
    backgroundColor: COLORS.conBg,
    borderWidth: 2,
    borderColor: COLORS.conText,
  },
  responding: {
    backgroundColor: COLORS.respondBg,
    borderWidth: 2,
    borderColor: COLORS.respondText,
  },
  resolved: {
    backgroundColor: COLORS.resolveBg,
    borderWidth: 2,
    borderColor: COLORS.resolveText,
  },
  dismiss: {
    backgroundColor: COLORS.dismissBg,
    borderWidth: 2,
    borderColor: COLORS.dismissText,
  },
});

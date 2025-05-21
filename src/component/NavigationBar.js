import { Ionicons } from "@expo/vector-icons";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import GradientText from "../component/GradientText";

const NavigationBar = ({ onProfilePress, rightLabel = null, onLogoPress }) => (
  <SafeAreaView style={styles.navbarContainer}>
    <View style={styles.navbar}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity onPress={onLogoPress} activeOpacity={0.7}>
          <GradientText
            text="PayToWin"
            style={styles.logoText}
            colors={["#14E585", "#9E01B7"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />
        </TouchableOpacity>
        {rightLabel}
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={onProfilePress}>
        <Ionicons
          name="person-circle"
          size={22}
          color="#fff"
          style={{ marginRight: 6 }}
        />
        <Text style={styles.loginButtonText}>Profile</Text>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  navbarContainer: {
    backgroundColor: "#181A2A",
    paddingBottom: 8,
  },
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#181A2A",
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: "space-between",
  },
  logoText: {
    fontSize: 22,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  loginButton: {
    backgroundColor: "#14E585",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 18,
    marginLeft: 12,
    elevation: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  loginButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default NavigationBar;

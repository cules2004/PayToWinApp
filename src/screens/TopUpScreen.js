import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { gameConfigs, paymentMethods } from "../data/gameConfigs";

const gameLogos = {
  1: require("../../assets/Images/GCL.jpg"),
  2: require("../../assets/Images/MU.jpg"),
  3: require("../../assets/Images/DivineWind.jpg"),
  4: require("../../assets/Images/Logo6.jpg"),
  5: require("../../assets/Images/AreaBreakoutLogo.jpg"),
  6: require("../../assets/Images/WildRiftLogo.jpg"),
  7: require("../../assets/Images/PlayTogetherLogo.jpg"),
  8: require("../../assets/Images/TeamFightTacticsLogo.jpg"),
  9: require("../../assets/Images/LeagueOfRuneterraLogo.jpg"),
  10: require("../../assets/Images/TopEleventLogo.jpg"),
  11: require("../../assets/Images/RobloxLogo.jpg"),
  12: require("../../assets/Images/PubgLogo.jpg"),
  13: require("../../assets/Images/LeagueOfLegendLogo.jpg"),
  14: require("../../assets/Images/ValorantLogo.jpg"),
  15: require("../../assets/Images/Bomber.jpg"),
  16: require("../../assets/Images/CyberDream.jpg"),
  17: require("../../assets/Images/KVPV.jpg"),
  18: require("../../assets/Images/MetalSlug.jpg"),
  19: require("../../assets/Images/Revelation.jpg"),
  20: require("../../assets/Images/OMG3Q.jpg"),
  21: require("../../assets/Images/DivineDragon.jpg"),
};

const TopUpScreen = ({ navigation, route }) => {
  const { gameId, gameInfo } = route.params;
  const game = gameConfigs[gameId];

  console.log("TopUpScreen - gameId:", gameId);
  console.log("TopUpScreen - game:", game);
  console.log("TopUpScreen - gameLogos[gameId]:", gameLogos[gameId]);

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!game) {
      console.warn("Không tìm thấy game với id:", gameId);
      Alert.alert("Error", "Game information not found", [
        {
          text: "Go back",
          onPress: () => navigation.goBack(),
        },
      ]);
    }
  }, [game, navigation, gameId]);

  if (!game) {
    return null;
  }

  const handlePackageSelect = useCallback((pkg) => {
    setSelectedPackage(pkg);
  }, []);

  const handlePaymentSelect = useCallback((payment) => {
    setSelectedPayment(payment);
  }, []);

  const handleTopUp = async (amount, paymentMethod) => {
    try {
      setLoading(true);

      // Tạo giao dịch mới với ID duy nhất
      const newTransaction = {
        id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        date: new Date().toISOString(),
        amount: amount,
        description: `Top up via ${paymentMethod.name}`,
        status: "completed",
        paymentMethod: paymentMethod.id,
        gameInfo: gameInfo.title,
      };

      // Lưu giao dịch vào AsyncStorage
      const session = await AsyncStorage.getItem("currentUser");
      if (session) {
        const { email } = JSON.parse(session);
        const storedTransactions = await AsyncStorage.getItem(
          `transactions_${email}`
        );
        const transactions = storedTransactions
          ? JSON.parse(storedTransactions)
          : [];
        transactions.unshift(newTransaction);
        await AsyncStorage.setItem(
          `transactions_${email}`,
          JSON.stringify(transactions)
        );
      }

      // Giả lập xử lý giao dịch
      setTimeout(() => {
        setLoading(false);
        Alert.alert("Success", "Top up successful!", [
          {
            text: "OK",
            onPress: () => navigation.replace("HomePage"),
          },
        ]);
      }, 1500);
    } catch (error) {
      console.error("Error processing transaction:", error);
      setLoading(false);
      Alert.alert(
        "Error",
        "Unable to process transaction. Please try again later."
      );
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const renderPackageGrid = (packages, numColumns = 2) => {
    const data = [...packages];
    if (data.length % numColumns !== 0) {
      data.push({ id: "empty", empty: true });
    }
    const rows = [];
    for (let i = 0; i < data.length; i += numColumns) {
      rows.push(data.slice(i, i + numColumns));
    }
    return rows.map((row, rowIndex) => (
      <View key={`row-${rowIndex}`} style={{ flexDirection: "row" }}>
        {row.map((pkg, colIndex) =>
          pkg.empty ? (
            <View
              key={`empty-${rowIndex}-${colIndex}`}
              style={[
                styles.packageCard,
                {
                  backgroundColor: "transparent",
                  elevation: 0,
                  shadowOpacity: 0,
                  borderWidth: 0,
                },
              ]}
            />
          ) : (
            <TouchableOpacity
              key={`package-${pkg.id}`}
              style={[
                styles.packageCard,
                selectedPackage?.id === pkg.id && styles.packageCardSelected,
              ]}
              onPress={() => handlePackageSelect(pkg)}
              activeOpacity={0.85}
            >
              <Image
                source={pkg.image || gameLogos[gameId]}
                style={styles.packageImage}
                resizeMode="contain"
              />
              <Text style={styles.packageAmount}>
                {pkg.amount} {game.currency}
              </Text>
              <Text style={styles.packageLabel}>
                Package {pkg.amount} {game.currency}
              </Text>
              <Text style={styles.packagePrice}>{formatPrice(pkg.price)}</Text>
            </TouchableOpacity>
          )
        )}
      </View>
    ));
  };

  const renderPaymentMethod = useCallback(
    ({ item: methodId }) => {
      const method = paymentMethods[methodId];
      return (
        <TouchableOpacity
          key={`payment-${methodId}`}
          style={[
            styles.payment,
            selectedPayment?.id === method.id && styles.selectedPayment,
          ]}
          onPress={() => handlePaymentSelect(method)}
        >
          <Image source={method.icon} style={styles.paymentIcon} />
          <Text style={styles.paymentName}>{method.name}</Text>
        </TouchableOpacity>
      );
    },
    [selectedPayment, handlePaymentSelect]
  );

  const renderSectionHeader = useCallback(
    ({ section: { title } }) => (
      <Text style={styles.sectionTitle}>{title}</Text>
    ),
    []
  );

  const sections = [
    {
      title: "Game Information",
      data: [null],
      renderItem: () => (
        <View style={styles.gameInfo}>
          <Image source={gameInfo.image} style={styles.gameLogo} />
          <Text style={styles.currency}>{game.currency}</Text>
        </View>
      ),
    },
    {
      title: "Payment Methods",
      data: game.paymentMethods,
      renderItem: renderPaymentMethod,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.title}>{gameInfo.title}</Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Game Info Section */}
        <View style={styles.gameInfoContainer}>
          <Image source={gameInfo.image} style={styles.gameLogo} />
          <Text style={styles.currency}>{game.currency}</Text>
        </View>

        {/* Player ID Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Player ID / Username</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter your player ID or username"
              placeholderTextColor="#8B9CB6"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
        </View>

        {/* Package List Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Select Package</Text>
          {renderPackageGrid(game.packages, 2)}
        </View>

        {/* Payment Methods Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Payment Methods</Text>
          {game.paymentMethods.map((methodId) => (
            <View key={`payment-container-${methodId}`}>
              {renderPaymentMethod({ item: methodId })}
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Footer with Top Up Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.topUpButton,
            (!selectedPackage || !selectedPayment || loading) &&
              styles.disabledButton,
          ]}
          onPress={() => handleTopUp(selectedPackage.price, selectedPayment)}
          disabled={!selectedPackage || !selectedPayment || loading}
        >
          {loading ? (
            <Text style={styles.topUpButtonText}>Đang Tải...</Text>
          ) : (
            <Text style={styles.topUpButtonText}>
              {selectedPackage
                ? `Top Up ${formatPrice(selectedPackage.price)}`
                : "Select Package"}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181A2A",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#23243A",
    backgroundColor: "#1F2133",
  },
  backButton: {
    marginRight: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#23243A",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  scrollContent: {
    paddingBottom: 24,
  },
  gameInfoContainer: {
    alignItems: "center",
    padding: 24,
    backgroundColor: "#1F2133",
    marginBottom: 16,
  },
  gameLogo: {
    width: 120,
    height: 120,
    borderRadius: 20,
    marginBottom: 12,
  },
  currency: {
    color: "#8B9CB6",
    fontSize: 16,
    fontWeight: "500",
  },
  inputContainer: {
    padding: 16,
    backgroundColor: "#1F2133",
    marginBottom: 16,
  },
  inputLabel: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  inputWrapper: {
    backgroundColor: "#23243A",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2A2D42",
  },
  input: {
    padding: 16,
    color: "#FFFFFF",
    fontSize: 16,
  },
  sectionContainer: {
    padding: 16,
    backgroundColor: "#1F2133",
    marginBottom: 16,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  packageCard: {
    flex: 1,
    margin: 6,
    backgroundColor: "#23243A",
    borderRadius: 12,
    alignItems: "center",
    padding: 12,
    borderWidth: 1,
    borderColor: "#2A2D42",
  },
  packageCardSelected: {
    borderWidth: 2,
    borderColor: "#1EB1FC",
    backgroundColor: "#1A1C2E",
  },
  packageImage: {
    width: 150,
    height: 150,
    marginBottom: 8,
    borderRadius: 20,
  },
  packageAmount: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 2,
    textAlign: "center",
  },
  packageLabel: {
    color: "#8B9CB6",
    fontSize: 12,
    marginBottom: 4,
    textAlign: "center",
  },
  packagePrice: {
    color: "#1EB1FC",
    fontWeight: "bold",
    fontSize: 16,
  },
  payment: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginBottom: 8,
    backgroundColor: "#23243A",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2A2D42",
  },
  selectedPayment: {
    borderWidth: 2,
    borderColor: "#1EB1FC",
    backgroundColor: "#1A1C2E",
  },
  paymentIcon: {
    width: 32,
    height: 32,
    marginRight: 16,
  },
  paymentName: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#23243A",
    backgroundColor: "#1F2133",
  },
  topUpButton: {
    backgroundColor: "#1EB1FC",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#1EB1FC",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  disabledButton: {
    backgroundColor: "#23243A",
    shadowOpacity: 0,
  },
  topUpButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default TopUpScreen;

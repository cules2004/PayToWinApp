import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Alert,
  FlatList,
  ScrollView,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { gameConfigs, paymentMethods } from '../data/gameConfigs';

const gameLogos = {
  '1': require('../../assets/Images/GCL.jpg'),
  '2': require('../../assets/Images/MU.jpg'),
  '3': require('../../assets/Images/DivineWind.jpg'),
  '4': require('../../assets/Images/Logo6.jpg'),
  '5': require('../../assets/Images/AreaBreakoutLogo.jpg'),
  '6': require('../../assets/Images/WildRiftLogo.jpg'),
  '7': require('../../assets/Images/PlayTogetherLogo.jpg'),
  '8': require('../../assets/Images/TeamFightTacticsLogo.jpg'),
  '9': require('../../assets/Images/LeagueOfRuneterraLogo.jpg'),
  '10': require('../../assets/Images/TopEleventLogo.jpg'),
  '11': require('../../assets/Images/RobloxLogo.jpg'),
  '12': require('../../assets/Images/PubgLogo.jpg'),
  '13': require('../../assets/Images/LeagueOfLegendLogo.jpg'),
  '14': require('../../assets/Images/ValorantLogo.jpg'),
  '15': require('../../assets/Images/Bomber.jpg'),
  '16': require('../../assets/Images/CyberDream.jpg'),
  '17': require('../../assets/Images/KVPV.jpg'),
  '18': require('../../assets/Images/MetalSlug.jpg'),
  '19': require('../../assets/Images/Revelation.jpg'),
  '20': require('../../assets/Images/OMG3Q.jpg'),
  '21': require('../../assets/Images/DivineDragon.jpg'),
};

const TopUpScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { gameId, gameInfo } = route.params;
  const game = gameConfigs[gameId];

  console.log('TopUpScreen - gameId:', gameId);
  console.log('TopUpScreen - game:', game);
  console.log('TopUpScreen - gameLogos[gameId]:', gameLogos[gameId]);

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);

  useEffect(() => {
    if (!game) {
      console.warn('Không tìm thấy game với id:', gameId);
      Alert.alert(
        'Error',
        'Game information not found',
        [
          {
            text: 'Go back',
            onPress: () => navigation.goBack(),
          },
        ]
      );
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

  const handleTopUp = useCallback(() => {
    if (!selectedPackage || !selectedPayment) return;
    
    // TODO: Implement payment logic
    console.log('Top up:', {
      game: game.name,
      package: selectedPackage,
      payment: selectedPayment
    });
  }, [selectedPackage, selectedPayment, game]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  // Helper để render grid 2 cột bằng View
  const renderPackageGrid = (packages, numColumns = 2) => {
    const data = [...packages];
    if (data.length % numColumns !== 0) {
      data.push({ id: 'empty', empty: true });
    }
    const rows = [];
    for (let i = 0; i < data.length; i += numColumns) {
      rows.push(data.slice(i, i + numColumns));
    }
    return rows.map((row, rowIndex) => (
      <View key={rowIndex} style={{ flexDirection: 'row' }}>
        {row.map((pkg, colIndex) =>
          pkg.empty ? (
            <View key={`empty-${rowIndex}-${colIndex}`} style={[styles.packageCard, { backgroundColor: 'transparent', elevation: 0, shadowOpacity: 0, borderWidth: 0 }]} />
          ) : (
            <TouchableOpacity
              key={pkg.id.toString()}
              style={[
                styles.packageCard,
                selectedPackage?.id === pkg.id && styles.packageCardSelected
              ]}
              onPress={() => handlePackageSelect(pkg)}
              activeOpacity={0.85}
            >
              <Image source={pkg.image} style={styles.packageImage} resizeMode="contain" />
              <Text style={styles.packageAmount}>{pkg.amount} {game.currency}</Text>
              <Text style={styles.packageLabel}>Package {pkg.amount} {game.currency}</Text>
              <Text style={styles.packagePrice}>{formatPrice(pkg.price)}</Text>
            </TouchableOpacity>
          )
        )}
      </View>
    ));
  };

  const renderPaymentMethod = useCallback(({ item: methodId }) => {
    const method = paymentMethods[methodId];
    return (
      <TouchableOpacity
        style={[
          styles.payment,
          selectedPayment?.id === method.id && styles.selectedPayment
        ]}
        onPress={() => handlePaymentSelect(method)}
      >
        <Image source={method.icon} style={styles.paymentIcon} />
        <Text style={styles.paymentName}>{method.name}</Text>
      </TouchableOpacity>
    );
  }, [selectedPayment, handlePaymentSelect]);

  const renderSectionHeader = useCallback(({ section: { title } }) => (
    <Text style={styles.sectionTitle}>{title}</Text>
  ), []);

  const sections = [
    {
      title: 'Thông tin game',
      data: [null],
      renderItem: () => (
        <View style={styles.gameInfo}>
          <Image 
            source={gameInfo.image} 
            style={styles.gameLogo}
          />
          <Text style={styles.currency}>{game.currency}</Text>
        </View>
      ),
    },
    {
      title: 'Phương thức thanh toán',
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
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
        <View style={styles.gameInfo}>
          <Image 
            source={gameInfo.image} 
            style={styles.gameLogo}
          />
          <Text style={styles.currency}>{game.currency}</Text>
        </View>
        {/* Title danh sách gói */}
        <Text style={styles.sectionTitle}>Package List</Text>
        {/* Danh sách gói nạp dạng grid */}
        {renderPackageGrid(game.packages, 2)}
        {/* Phương thức thanh toán */}
        <Text style={styles.sectionTitle}>Payment Methods</Text>
        {game.paymentMethods.map((methodId) => renderPaymentMethod({ item: methodId }))}
        <View style={{ height: 16 }} />
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.topUpButton,
            (!selectedPackage || !selectedPayment) && styles.disabledButton
          ]}
          onPress={handleTopUp}
          disabled={!selectedPackage || !selectedPayment}
        >
          <Text style={styles.topUpButtonText}>
            Top Up {selectedPackage ? formatPrice(selectedPackage.price) : '0đ'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A2A',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#23243A',
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    paddingBottom: 20,
  },
  gameInfo: {
    alignItems: 'center',
    padding: 20,
  },
  gameLogo: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginBottom: 8,
  },
  currency: {
    color: '#8B9CB6',
    fontSize: 16,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  packagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  packageCard: {
    flex: 1,
    margin: 8,
    backgroundColor: '#23243A',
    borderRadius: 14,
    alignItems: 'center',
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
    elevation: 4,
  },
  packageCardSelected: {
    borderWidth: 2,
    borderColor: '#1EB1FC',
  },
  packageImage: {
    width: 100,
    height: 100,
    marginBottom: 8,
    borderRadius: 8,
  },
  packageAmount: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 2,
    textAlign: 'center',
  },
  packageLabel: {
    color: '#8B9CB6',
    fontSize: 14,
    marginBottom: 4,
    textAlign: 'center',
  },
  packagePrice: {
    color: '#1EB1FC',
    fontWeight: 'bold',
    fontSize: 16,
  },
  payment: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 8,
    backgroundColor: '#23243A',
    borderRadius: 12,
  },
  selectedPayment: {
    borderWidth: 1,
    borderColor: '#1EB1FC',
  },
  paymentIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  paymentName: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#23243A',
  },
  topUpButton: {
    backgroundColor: '#1EB1FC',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#23243A',
  },
  topUpButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TopUpScreen; 
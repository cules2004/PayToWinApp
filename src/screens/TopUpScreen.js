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
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { gameConfigs, paymentMethods } from '../data/gameConfigs';

// Tạm thời comment phần import ảnh
/*
const gameLogos = {
  'valorant': require('../../assets/Images/ValorantLogo.jpg'),
  'lol': require('../../assets/Images/LeagueOfLegendLogo.jpg'),
  'mobile-legends': require('../../assets/Images/MobileLegendsLogo.jpg'),
  'area-breakout': require('../../assets/Images/AreaBreakoutLogo.jpg'),
  'wild-rift': require('../assets/Images/WildRiftLogo.jpg'),
  'play-together': require('../assets/Images/PlayTogetherLogo.jpg'),
  'teamfight-tactics': require('../assets/Images/TeamFightTacticsLogo.jpg'),
  'league-of-runeterra': require('../assets/Images/LeagueOfRuneterraLogo.jpg'),
  'top-eleven': require('../assets/Images/TopEleventLogo.jpg'),
  'roblox': require('../assets/Images/RobloxLogo.jpg'),
  'pubg': require('../assets/Images/PubgLogo.jpg'),
};
*/

const TopUpScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { gameId } = route.params;
  const game = gameConfigs[gameId];

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);

  useEffect(() => {
    if (!game) {
      Alert.alert(
        'Lỗi',
        'Không tìm thấy thông tin game',
        [
          {
            text: 'Quay lại',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    }
  }, [game, navigation]);

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

  const renderPackage = useCallback(({ item: pkg }) => (
    <TouchableOpacity
      style={[
        styles.package,
        selectedPackage?.id === pkg.id && styles.selectedPackage
      ]}
      onPress={() => handlePackageSelect(pkg)}
    >
      <Text style={styles.packageAmount}>
        {pkg.amount} {game.currency}
      </Text>
      <Text style={styles.packagePrice}>
        {formatPrice(pkg.price)}
      </Text>
      {pkg.bonus > 0 && (
        <View style={styles.bonus}>
          <Text style={styles.bonusText}>
            +{pkg.bonus} {game.currency}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  ), [selectedPackage, game.currency, handlePackageSelect]);

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
          {/* Tạm thời comment phần hiển thị ảnh */}
          {/* <Image 
            source={gameLogos[gameId]} 
            style={styles.gameLogo}
          /> */}
          <Text style={styles.currency}>{game.currency}</Text>
        </View>
      ),
    },
    {
      title: 'Chọn gói nạp',
      data: game.packages,
      renderItem: renderPackage,
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
        <Text style={styles.title}>{game.name}</Text>
      </View>

      <SectionList
        sections={sections}
        renderItem={({ item, section }) => section.renderItem({ item })}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={(item, index) => item?.id || index.toString()}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled={false}
      />

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
            Nạp {selectedPackage ? formatPrice(selectedPackage.price) : '0đ'}
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
  package: {
    flex: 1,
    padding: 8,
    margin: 8,
    backgroundColor: '#23243A',
    borderRadius: 12,
  },
  selectedPackage: {
    borderWidth: 1,
    borderColor: '#1EB1FC',
  },
  packageAmount: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  packagePrice: {
    color: '#8B9CB6',
    fontSize: 14,
  },
  bonus: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#1EB1FC',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  bonusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
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
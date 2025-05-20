import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, SafeAreaView, TextInput, Dimensions, Modal, Alert, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import GradientText from '../component/GradientText';
import ProfileModal from '../component/ProfileModal';
import NavigationBar from '../component/NavigationBar';
import SearchBar from '../component/SearchBar';
import Carousel from '../component/Carousel';
import GameList from '../component/GameList';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

const HEADER_HEIGHT = 120; // Tổng chiều cao của header (NavigationBar + SearchBar)
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const HomePageScreen = ({ route, navigation }) => {
  const [showNav, setShowNav] = useState(true);
  const [search, setSearch] = useState('');
  const lastOffset = useRef(0);
  const screenWidth = useRef(Dimensions.get('window').width).current;
  const [showProfile, setShowProfile] = useState(false);
  const [email, setEmail] = useState(route?.params?.email || '');
  const [randomId, setRandomId] = useState('');
  const scrollY = useRef(new Animated.Value(0)).current;
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchEmail = async () => {
      if (route?.params?.email) {
        setEmail(route.params.email);
      } else {
        const session = await AsyncStorage.getItem('currentUser');
        if (session) {
          const { email: storedEmail } = JSON.parse(session);
          setEmail(storedEmail);
        }
      }
    };
    if (isFocused) fetchEmail();
  }, [route?.params?.email, isFocused]);

  useEffect(() => {
    // Generate a random 16-character alphanumeric ID
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let id = '';
    for (let i = 0; i < 16; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setRandomId(id);
  }, []);

  const handleLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => {
            setShowProfile(false);
            navigation.replace('Login');
          }
        }
      ]
    );
  };

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
    extrapolate: 'clamp',
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT / 2, HEADER_HEIGHT],
    outputRange: [1, 0.5, 0],
    extrapolate: 'clamp',
  });

  const renderHeader = () => (
    <View style={styles.contentHeader}>
      <Text style={styles.featureTitle}>Featured</Text>
      <Carousel />
    </View>
  );

  const renderGameList = () => (
    <View style={styles.gameListContainer}>
      <GameList searchQuery={search} />
    </View>
  );

  const benefits = [
    {
      icon: 'gift-outline',
      label: 'Amazing deals',
    },
    {
      icon: 'trophy-outline',
      label: 'Exclusive items',
    },
    {
      icon: 'swap-horizontal-outline',
      label: 'Direct payment',
    },
    {
      icon: 'pricetag-outline',
      label: 'Best price',
    },
  ];

  const renderBenefitsSection = () => (
    <View style={styles.benefitsSection}>
      <Text style={styles.benefitsTitle}>BENEFITS WHEN DEPOSITING AT PAYTOWIN</Text>
      <View style={styles.benefitsGrid}>
        {benefits.map((item, idx) => (
          <View key={item.label} style={styles.benefitBox}>
            <LinearGradient
              colors={['#FF9800', '#FF512F']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.iconWrapper}
            >
              <Ionicons name={item.icon} size={38} color="#fff" />
            </LinearGradient>
            <Text style={styles.benefitLabel}>{item.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderItem = ({ item }) => {
    switch (item.type) {
      case 'header':
        return renderHeader();
      case 'gameList':
        return (
          <>
            {renderGameList()}
            {renderBenefitsSection()}
          </>
        );
      default:
        return null;
    }
  };

  const data = [
    { id: 'header', type: 'header' },
    { id: 'gameList', type: 'gameList' }
  ];

  return (
    <View style={styles.container}>
      <Animated.View style={[
        styles.headerContainer,
        {
          transform: [{ translateY: headerTranslateY }],
          opacity: headerOpacity,
        }
      ]}>
        <NavigationBar 
          onProfilePress={() => setShowProfile(true)} 
          onLogoPress={() => navigation.replace('HomePage')} 
        />
        <SearchBar value={search} onChangeText={setSearch} />
      </Animated.View>

      <AnimatedFlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      />

      <ProfileModal
        visible={showProfile}
        onClose={() => setShowProfile(false)}
        email={email}
        randomId={randomId}
        onLogout={handleLogout}
        onManageAccount={() => {
          setShowProfile(false);
          navigation.navigate('AccountScreen', { email });
        }}
        activeTab={navigation?.getState?.()?.routes?.[navigation.getState().index]?.name === 'AccountScreen' ? 'account' : undefined}
        navigation={navigation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A2A',
    position: 'relative',
  },
  contentContainer: {
    padding: 16,
    paddingTop: HEADER_HEIGHT + 16,
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: '#181A2A',
    paddingTop: 16,
  },
  contentHeader: {
    marginTop: 16,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 10,
    marginLeft: 8,
    color: '#fff',
  },
  gameListContainer: {
    marginTop: 20,
  },
  benefitsSection: {
    marginTop: 32,
    marginBottom: 16,
  },
  benefitsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 18,
    letterSpacing: 1,
  },
  benefitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  benefitBox: {
    width: '48%',
    aspectRatio: 1,
    backgroundColor: '#F7F8FA',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  iconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  benefitLabel: {
    color: '#23243A',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default HomePageScreen; 
import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, SafeAreaView, TextInput, Dimensions, Modal, Alert, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import GradientText from '../component/GradientText';
import ProfileModal from '../component/ProfileModal';
import NavigationBar from '../component/NavigationBar';
import SearchBar from '../component/SearchBar';
import Carousel from '../component/Carousel';
import GameList from '../component/GameList';

const HEADER_HEIGHT = 120; // Tổng chiều cao của header (NavigationBar + SearchBar)
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const HomePageScreen = ({ route, navigation }) => {
  const [showNav, setShowNav] = useState(true);
  const [search, setSearch] = useState('');
  const lastOffset = useRef(0);
  const screenWidth = useRef(Dimensions.get('window').width).current;
  const [showProfile, setShowProfile] = useState(false);
  const email = route?.params?.email || 'user@email.com';
  const [randomId, setRandomId] = useState('');
  const scrollY = useRef(new Animated.Value(0)).current;

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
      <GameList />
    </View>
  );

  const renderItem = ({ item }) => {
    switch (item.type) {
      case 'header':
        return renderHeader();
      case 'gameList':
        return renderGameList();
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
        onManageAccount={() => { setShowProfile(false); navigation.navigate('AccountScreen'); }}
        onManagePayment={() => { setShowProfile(false); navigation.navigate('ManagePaymentScreen'); }}
        activeTab={navigation?.getState?.()?.routes?.[navigation.getState().index]?.name === 'AccountScreen' ? 'account' :
                  navigation?.getState?.()?.routes?.[navigation.getState().index]?.name === 'ManagePaymentScreen' ? 'payment' : undefined}
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
});

export default HomePageScreen; 
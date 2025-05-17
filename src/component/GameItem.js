import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { gameConfigs } from '../data/gameConfigs';

const GameItem = ({ game }) => {
  const navigation = useNavigation();
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const handlePress = () => {
    // Truyền toàn bộ thông tin game sang TopUpScreen
    navigation.navigate('TopUp', { 
      gameId: game.id.toString(),
      gameInfo: game // Truyền thêm thông tin game
    });
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1}
    >
      <Animated.View style={[styles.container, { transform: [{ scale: scaleAnim }] }]}>
        <Image source={game.image} style={styles.logo} />
        <Text style={styles.title} numberOfLines={1}>
          {game.title}
        </Text>
        <View style={styles.platformContainer}>
          <Ionicons 
            name={game.platform === 'PC' ? 'desktop-outline' : 'phone-portrait-outline'} 
            size={14} 
            color="#8B9CB6" 
          />
          <Text style={styles.platform}>{game.platform}</Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 160,
    height: 180,
    backgroundColor: '#23243A',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logo: {
    width: 110,
    height: 110,
    borderRadius: 8,
    marginBottom: 8,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
    width: '100%',
  },
  platformContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(139, 156, 182, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  platform: {
    color: '#8B9CB6',
    fontSize: 12,
    marginLeft: 4,
  },
});

export default GameItem; 
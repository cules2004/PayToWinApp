// screens/HomeScreen.js
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';  
import { Image } from 'react-native';
import GradientText from '../component/GradientText';      
import Spinner from '../component/Spinner';

const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('GettingStarted'); // Switch after 3 seconds
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <LinearGradient
      colors={['#1A1A2E', '#16213E']}
      style={styles.container}
    >
      <Image
        source={require('../../assets/Images/4493f57208853f34c4d903e07ef90afc.png')}
        style={styles.characterImage}
        resizeMode="contain"
      />
      <View style={styles.textContainer}>
        <Text style={styles.welcomeText}>
          Welcome to 🖐️
        </Text>
        <GradientText
          text="PayToWin"
          style={styles.titleText}
          colors={['#00DDEB', '#BF00FF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
        <Text style={styles.descriptionText}>
        By Gamer, For Gamer
        </Text>
        <Spinner size={60} />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  characterImage: {
    width: 650,
    height: 480,
    alignSelf: 'center',
  },
  textContainer: {
    position: 'absolute',
    bottom: 100,
    alignItems: 'center',
    paddingHorizontal: 20,
    width: '100%',
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 15,
  },
  titleText: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  descriptionText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: '80%',
  },
});

export default HomeScreen;
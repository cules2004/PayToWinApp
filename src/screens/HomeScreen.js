// screens/HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';  
import { Image } from 'react-native';
import { GradientText } from './Gradient';      
// const HomeScreen = () => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>Chào mừng đến với PayToWin!</Text>
//     </View>
//   );
// };
const HomeScreen = () => {
  return (
    <LinearGradient
      colors={['#1A1A2E', '#16213E']}
      style={styles.container}
    >
      <Image
        source={require('C:/Users/admin/PayToWinApp/assets/Images/splashscreen.png')}
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
        Chơi game đỉnh nạp cực xịn cùng PayToWinApp!
        </Text>
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
    position: 'absolute',
    width: 587,
    height: 430.26,
    left: -125,
    top: 248,
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
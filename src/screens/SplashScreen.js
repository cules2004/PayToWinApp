// screens/SplashScreen.js
import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const SplashScreen = () => {
  return (
    <LinearGradient
      colors={['#0A0C2B', '#2A2D5D']}
      style={styles.container}
    >
      <Text style={styles.title}>PayToWin</Text>
      <ActivityIndicator size="large" color="#fff" style={styles.spinner} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'urbanist',
    //  backgroundColor: 'rgba(255, 255, 255, 0.1)',
    //  backgroundClip: 'text',
    //  textFillColor: 'transparent',
  },
  spinner: {
    marginTop: 90,
  },
});

export default SplashScreen;

// App.js
import React, { useState, useEffect } from 'react';
// import * as Font from 'expo-font';
// import AppLoading from 'expo-app-loading';
// import React from 'react';
import { SafeAreaView } from 'react-native';
import SplashScreen from './screens/SplashScreen';

export default function App() {
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SplashScreen />
    </SafeAreaView>
  );
}
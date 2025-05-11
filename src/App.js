// // App.js
// import React, { useState, useEffect } from 'react';
// // import * as Font from 'expo-font';
// // import AppLoading from 'expo-app-loading';
// // import React from 'react';
// import { SafeAreaView } from 'react-native';
// import SplashScreen from './screens/SplashScreen';
// import HomeScreen from './screens/HomeScreen';
// import { createStackNavigator } from '@react-navigation/stack';
// import { NavigationContainer } from '@react-navigation/native';
// // export default function App() {
  
// //   return (
// //     <SafeAreaView style={{ flex: 1 }}>
// //       <SplashScreen/>
// //     </SafeAreaView>
// //   );
// // }
// const Stack = createStackNavigator();

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="Splash" component={SplashScreen} />
//         <Stack.Screen name="Home" component={HomeScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;
// src/App.js
import React from 'react';
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  return <AppNavigator />;
}
// screens/SplashScreen.js
import React, {useEffect} from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import GradientText from '../component/GradientText';
import HomeScreen from './HomeScreen';
import Spinner from '../component/Spinner';


//   
// return (
//     <LinearGradient
//       colors={['#0A0C2B', '#2A2D5D']}
//       style={styles.container}
//     >
//       <Text style={styles.title}>{title}</Text>
//     {/* <GradientText text = {title} style = {styles.title} /> */}
//       <ActivityIndicator size="large" color="#fff" style={styles.spinner} />
//     </LinearGradient>
//   );
// };


const SplashScreen = ({ navigation }) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Home'); // Chuyển sang HomeScreen
    }, 3000);

    return () => clearTimeout(timer); // Dọn dẹp timer
  }, [navigation]);

  return (
    <View
      style={styles.container}
    >
      <GradientText text = "PayToWin" style = {styles.title} />
      {/* <Text style={styles.title}>{title}</Text> */}
    {/* <GradientText text = {title} style = {styles.title} /> */}
      <Spinner size={120} />
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#0A0C2B'
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

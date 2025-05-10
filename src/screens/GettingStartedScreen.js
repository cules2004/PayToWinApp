import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const GettingStartedScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        BE PART OF OUR COMMUNITY{"\n"}
        TAKE YOUR GAMING JOURNEY TO THE NEXT LEVEL{"\n"}
        <Text style={styles.subtitle}>WITH THRILLING NEW ADVENTURES </Text>
      </Text>
      <Image
        source={require('C:/Users/admin/PayToWinApp/assets/Images/GettingStartedImage.png')}
        style={styles.characterImage}
        resizeMode="contain"
      />
      <TouchableOpacity style={styles.button} activeOpacity={0.8}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A2A',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 60,
  },
  title: {
    color: '#2D6FD3',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    width: '90%',
    marginBottom: 10,
    lineHeight: 28,
  },
  subtitle: {
    color: '#23254A',
    fontWeight: 'bold',
  },
  characterImage: {
    width: 420,
    height: 420,
    marginTop: 50,
    marginBottom: 20,
  },
  button: {
    position: 'absolute',
    bottom: 70,
    alignSelf: 'center',
    backgroundColor: '#6C2BD7',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#14E585',
    paddingVertical: 14,
    paddingHorizontal: 40,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default GettingStartedScreen;

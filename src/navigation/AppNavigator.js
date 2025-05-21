import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../screens/SplashScreen";
import HomeScreen from "../screens/HomeScreen";
import GettingStartedScreen from "../screens/GettingStartedScreen";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import VerifyEmailScreen from "../screens/VerifyEmailScreen";
import HomePageScreen from "../screens/HomePageScreen";
import AccountScreen from "../screens/AccountScreen";
import TopUpScreen from "../screens/TopUpScreen";
import PersonalInfoScreen from "../screens/PersonalInfoScreen";
import PaymentManagement from "../screens/PaymentManagement";
import SecurityScreen from "../screens/SecurityScreen";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#181A2A" },
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="GettingStarted" component={GettingStartedScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="VerifyEmail" component={VerifyEmailScreen} />
      <Stack.Screen name="HomePage" component={HomePageScreen} />
      <Stack.Screen name="AccountScreen" component={AccountScreen} />
      <Stack.Screen name="TopUp" component={TopUpScreen} />
      <Stack.Screen name="PersonalInfo" component={PersonalInfoScreen} />
      <Stack.Screen name="PaymentManagement" component={PaymentManagement} />
      <Stack.Screen name="SecurityScreen" component={SecurityScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;

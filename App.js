// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/
import 'react-native-gesture-handler';

// Import React and Component
import React, {useEffect} from 'react';

// Import Navigators from React Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// Import Screens
import SplashScreen from './Screen/SplashScreen';
import IntroScreen from './Screen/IntroScreen';
import LoginScreen from './Screen/LoginScreen';
import OtpScreen from './Screen/OtpScreen';
import ForgotScreen from './Screen/ForgotScreen';
import RegisterScreen from './Screen/RegisterScreen';
import LoginWithPasswordScreen from './Screen/LoginWithPasswordScreen';
import TabNavigationRoutes from './Screen/TabNavigationRoutes';
import { ErrorProvider } from './Screen/Contexts/ErrorContext';
import { Appearance } from 'react-native';

// Kyc Screens
import KycOtp from './Screen/Kyc/Otp';
import IdentityForm from './Screen/Kyc/IdentityForm';
import AddressInfo from './Screen/Kyc/AddressInfo';
import AgreementsView from './Screen/Kyc/AgreementsView';
import IdentityDetailForm from './Screen/Kyc/IdentityDetailForm';
import VerifyScreen from './Screen/Kyc/VerifyScreen';

const Stack = createStackNavigator();


const Auth = () => {
  useEffect(() => {
    Appearance.setColorScheme('light');
    console.log("colorScheme");
    console.log(Appearance.getColorScheme());
  },
  [])
  // Stack Navigator for Login and Sign up Screen
  return (
    <Stack.Navigator initialRouteName="LoginScreen"
    screenOptions={{
      contentStyle:{
        backgroundColor:'#FFFFFF'
      }, gestureEnabled:false
   }}
    >
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false, gestureEnabled:false}}
      />
       
      <Stack.Screen
        name="OtpScreen"
        component={OtpScreen}
        options={{headerShown: false, gestureEnabled:false}}
      />
      <Stack.Screen
        name="ForgotScreen"
        component={ForgotScreen}
        options={{headerShown: false, gestureEnabled:false}}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{headerShown: false, gestureEnabled:false}}
        
      /> 
      <Stack.Screen
        name="LoginWithPasswordScreen"
        component={LoginWithPasswordScreen}
        options={{headerShown: false, gestureEnabled:false}}
        
      />
    </Stack.Navigator>
  );
};

const Kyc = () => {
  return (
    <Stack.Navigator initialRouteName="VerifyScreen"
    screenOptions={{
      contentStyle:{
        backgroundColor:'#FFFFFF'
      }
   }}
    >
       <Stack.Screen
          name="KycOtp"
          component={KycOtp}
          options={{headerShown: false}}
        />
       <Stack.Screen
          name="IdentityForm"
          component={IdentityForm}
          options={{headerShown: false}}
        />
       <Stack.Screen
          name="AgreementsView"
          component={AgreementsView}
          options={{headerShown: false}}
        />
       <Stack.Screen
          name="AddressInfo"
          component={AddressInfo}
          options={{headerShown: false}}
        />
       <Stack.Screen
          name="IdentityDetailForm"
          component={IdentityDetailForm}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="VerifyScreen"
          component={VerifyScreen}
          options={{headerShown: false}}
        />
    </Stack.Navigator>
  );
};


/* Switch Navigator for those screens which needs to be switched only once
  and we don't want to switch back once we switch from them to the next one */
const App = () => {

  useEffect(() => {
    Appearance.setColorScheme('light');
    console.log("colorScheme");
    console.log(Appearance.getColorScheme()); 
  },
  [])
  return (
    <ErrorProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Kyc"
      screenOptions={{
        contentStyle:{
          backgroundColor:'#FFFFFF'
        }
     }}>
      
        {/* SplashScreen which will come once for 5 Seconds */}
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          // Hiding header for Splash Screen
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="IntroScreen"
          component={IntroScreen}
          // Hiding header for Splash Screen
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TabNavigationRoutes"
          component={TabNavigationRoutes}
          // Hiding header for Navigation Drawer as we will use our custom header
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Kyc"
          component={Kyc}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </ErrorProvider>
  );
};

export default App;

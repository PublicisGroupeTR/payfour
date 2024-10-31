// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/
import 'react-native-gesture-handler';

// Import React and Component
import React from 'react';

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

const Stack = createStackNavigator();

const Auth = () => {
  // Stack Navigator for Login and Sign up Screen
  return (
    <Stack.Navigator initialRouteName="LoginScreen"
    screenOptions={{
      contentStyle:{
        backgroundColor:'#FFFFFF'
      }
   }}
    >
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
       
      <Stack.Screen
        name="OtpScreen"
        component={OtpScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ForgotScreen"
        component={ForgotScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{headerShown: false}}
        
      /> 
      <Stack.Screen
        name="LoginWithPasswordScreen"
        component={LoginWithPasswordScreen}
        options={{headerShown: false}}
        
      />
    </Stack.Navigator>
  );
};

/* Switch Navigator for those screens which needs to be switched only once
  and we don't want to switch back once we switch from them to the next one */
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen"
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

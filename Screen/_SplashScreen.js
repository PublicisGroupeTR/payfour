/* eslint-disable react-native/no-inline-styles */
// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, useEffect} from 'react';
import {ActivityIndicator, View, StyleSheet, Image} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({navigation}) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      console.log('splash');

      /*AsyncStorage.getItem('auth_token').then(value =>
        navigation.replace(value === null ? 'Auth' : 'TabNavigationRoutes'),
        //navigation.replace('TabNavigationRoutes'),
      );*/
      AsyncStorage.getAllKeys((err, keys) => {
        AsyncStorage.multiGet(keys, (err, stores) => {
          let obj = {};
          stores.map((result, i, store) => {
            // get at each store's key/value so you can work with it
            
            let key = store[i][0];
            let value = store[i][1];
            obj[key] = value;          
          });

          console.log("storage");
          console.log(obj);
          //if(obj.tutorial === 'null'){
            navigation.navigate('IntroScreen');
          /*}else if (obj.phone !== 'null' && obj.uniqueMPANumber !== 'null'){
            //navigation.replace('LoginWithPasswordScreen')
            navigation.navigate('Auth', { screen: 'LoginWithPasswordScreen' })
            //navigation.navigate('Auth', { screen: 'RegisterScreen' })
            //navigation.navigate('Auth', { screen: 'BiometricsScreen' })
          }else{
            navigation.navigate('Auth', { screen: 'LoginScreen' });
          }*/
        });
      });
      //navigation.replace('Auth');
    }, 5000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/img/logo_splash.png')}
        style={{width: '50%', resizeMode: 'contain', margin: 30}}
      />
      <ActivityIndicator
        animating={animating}
        color="#ffffff"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#254f8e',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});

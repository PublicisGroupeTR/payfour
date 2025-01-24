/* eslint-disable react-native/no-inline-styles */
// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, useEffect} from 'react';
import {ActivityIndicator, View, StyleSheet, Image, ImageBackground, Text} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'react-native-axios';
import { useError } from './Contexts/ErrorContext';
import { basicPost, apiGet, apiPost } from './utils/api.js';

const SplashScreen = ({navigation}) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);
  const [loading, setLoading] = useState(false);

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
          //navigation.navigate('IntroScreen');


          if(!obj.tutorial){
            navigation.navigate('IntroScreen');
          // }else if (obj.phone !== 'null' && obj.uniqueMPANumber !== 'null'){
          //   //navigation.replace('LoginWithPasswordScreen')
          //   navigation.navigate('Auth', { screen: 'LoginWithPasswordScreen' })
          //   //navigation.navigate('Auth', { screen: 'RegisterScreen' })
          //   //navigation.navigate('Auth', { screen: 'BiometricsScreen' })
          // }else{
          //   navigation.navigate('Auth', { screen: 'LoginScreen' });
          // }
          }else if(obj.phone && obj.deviceId && obj.uniqueMPANumber){
            begin();
          }else{
             navigation.navigate('Auth', { screen: 'LoginScreen' });
           }
        });
      });
      //navigation.replace('Auth');
    }, 5000);
  }, [navigation]);
 const begin =()=>{
  setLoading(true);
  AsyncStorage.getAllKeys((err, keys) => {
    AsyncStorage.multiGet(keys, (err, stores) => {
      let obj = {};
      stores.map((result, i, store) => {
        // get at each store's key/value so you can work with it
        
        let key = store[i][0];
        let value = store[i][1];
        obj[key] = value;          
      });
      let dataToSend ={
        "phone": obj.phone,
        "deviceId": obj.deviceId,
        "uniqueMPANumber": obj.uniqueMPANumber,
        "dgpaysAgreements": true
      }
      console.log("datatosend");
      console.log(dataToSend);
      basicPost('auth/begin', dataToSend, onBegin, onBeginError, obj);
  //**/     axios.post('https://api-app.payfour.com/api/auth/begin', dataToSend)
  //     .then(response => {
  //       setLoading(false);
  //         console.log(response.data);
  //         if(response.data.data.sendOTP){
  //           navigation.navigate('Auth', { 
  //             screen: 'OtpScreen',
  //             params: {phone: obj.phone}
  //           });
            
  //         }else{
  //           navigation.navigate('Auth', { screen: 'LoginWithPasswordScreen' })
  //           //navigation.navigate('Auth', { screen: 'RegisterScreen' })
  //         }
  //         //setLogin();
  //         /*let dds = dId.toString();
  //         console.log("dds", dds)
  //         AsyncStorage.setItem('deviceId', dds).then(() =>{
  //           var ph = (countryCode+userPhone).replace('(', "").replace(")", "").replace(/ /g, '');
  //           console.log("set phone", ph);
  //           AsyncStorage.setItem('phone', ph).then(() =>{
  //             console.log("navigate to otp");
  //             navigation.navigate("OtpScreen", {
  //               phone: ph,
  //             });
  //           });
  //         });*/
  //       });
  //     });
  // })
  // .catch(error => {
  //   setLoading(false);
  //   console.error("Error sending data: ", error);
  //   console.log(error.response);
  //   let msg="";
  //   (error.response.data.errors.message) ? msg += error.response.data.errors.message+"\n" : msg += "Ödeme hatası \n"; (error.response.data.errors.paymentError) ? msg += error.response.data.errors.paymentError+"\n" : msg += ""; 
  //   //Alert.alert(msg);
  //   showError(msg);
  // });
    });
  });
 }
 const onBeginError =()=>{
  setLoading(false);
  navigation.navigate('Auth', { screen: 'LoginScreen' });
 }
 const onBegin =(response, obj)=>{
  setLoading(false);
  console.log(response.data);
  if(response.data.data.sendOTP){
    navigation.navigate('Auth', { 
      screen: 'OtpScreen',
      params: {phone: obj.phone}
    });
    
  }else{
    navigation.navigate('Auth', { screen: 'LoginWithPasswordScreen' })
    //navigation.navigate('Auth', { screen: 'RegisterScreen' })
  }
 }
  return (
    <View style={styles.container}>
      <ImageBackground
       style={[styles.bgimg, {flex:1, width:'100%', justifyContent:'flex-end'}]}
       resizeMode="cover"
       source={require('../assets/img/export/intro.png')}>
      {/* <Image
        source={require('../assets/img/logo_splash.png')}
        style={{width: '50%', resizeMode: 'contain', margin: 30}}
      /> */}
      <ActivityIndicator
        animating={animating}
        color="#ffffff"
        size="large"
        style={styles.activityIndicator}
      />
      {/* <View style={{paddingBottom:100}}>
        <Text style={{color:'#fff', textAlign:'center', fontSize:14, paddingLeft:40, paddingRight:40}}>Payfour'a hoş geldiniz!</Text>
        <Text style={{color:'#fff', textAlign:'center', fontSize:14, paddingLeft:40, paddingRight:40}}>
        CarrefourSA'larda yepyeni ödeme deneyimi ve avantajları ile kazançlı alışverişler sizi bekliyor.
        </Text>
      </View> */}
      </ImageBackground>
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

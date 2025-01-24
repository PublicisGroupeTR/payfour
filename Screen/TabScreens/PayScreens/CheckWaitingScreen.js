/* eslint-disable react-native/no-inline-styles */
// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  Linking,
  Modal,
  Dimensions,
  StyleSheet,
  Alert
} from 'react-native';
import { registerStyles } from '../../Components/RegisterStyles.js';

import {styles} from '../../Components/Styles.js';
import Loader from '../../Components/Loader.js';
import SubtabHeader from '../../Components/SubtabHeader.js';

import axios from 'react-native-axios';
import MaskInput from 'react-native-mask-input';
import LinearGradient from 'react-native-linear-gradient';
import {Dropdown} from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiGet } from '../../utils/api.js';

const CheckWaitingScreen = ({navigation}) => { 

  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [payfourId, setPayfourId] = useState('');

 
  useEffect(() => {   
    const unsubscribe = navigation.addListener('focus', () => {
      
        setLoading(true);
        AsyncStorage.getItem('token').then(value =>{
          const config = {
            headers: { Authorization: `Bearer ${value}` }
          };
          console.log("getwaitings");
          apiGet('payments/getwaitings', onGetWaitings);
          
    
        });
      
    });
  });
  const onGetWaitings = (response) =>{
            console.log("getwaitings");
            console.log(response.data);
            console.log(response.data.data.length);
            setTimeout(function(){setLoading(false);}, 2000);
            if(response.data.data.length > 0){
              let pObj = response.data.data[0];
              console.log(pObj);
              navigation.navigate('wallet', { 
                screen: 'Waiting',
                params: pObj
              })
            }else{
              navigation.navigate('PayOptionsScreen2');
            }
  }
  return(
    <SafeAreaView style={{flex: 1}}>      
      
    <Loader loading={loading} />
    
              </SafeAreaView>
  )
  
};

export default CheckWaitingScreen;

/* eslint-disable react-native/no-inline-styles */
// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useEffect, useRef, useState} from 'react';
import {View, Text, SafeAreaView, Image, Linking} from 'react-native';
import {styles} from '../Components/Styles.js';
import TabHeader from '../Components/TabHeader.js';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'react-native-axios';
//import {MasterPassSDK} from '@macellan/masterpass-sdk';
import { MasterpassProvider } from '@kerim-keskin/react-masterpass'
//https://test-client.bubbleads.co/Scripts/masterpass-javascript-sdk-web.min.js
import { api } from '@kerim-keskin/react-masterpass'

const MasterpassScreen3 = ({navigation}) => {

  const masterpassRef = useRef();
  const [phone, setPhone] = useState('');
  const [mpToken, setMptoken] = useState('');
  const [loading, setLoading] = useState(false);
  const config = {
    serviceUrl: 'https://mp-test-sdk.masterpassturkiye.com', 
    clientId: '347102188', 
    version: '36.4',
    clientType: '1',
    sendSmsLanguage: 'tur', // tur, eng etc.
    clientIp: '', // optional
  }
  
  useEffect(() => {   
    const unsubscribe = navigation.addListener('focus', () => { 
          
      // MasterPassSDK.setAddress('https://mp-test-sdk.masterpassturkiye.com/');
      // MasterPassSDK.setClientId('347102188');
      console.log('Masterpass token get'); 
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
          setPhone(obj.phone);
          const config = {
            headers: { Authorization: `Bearer ${obj.token}` }
          };
          
          axios.get('https://payfourapp.test.kodegon.com/api/payments/generatemasterpasstoken', config)
          .then(response => {
            console.log(response);
            console.log(response.data);
            if(response.data.success){
              //navigation.navigate('Success');
              //setSuccessModalVisible(true);
              console.log("masterpass token");
              console.log(response.data.data.accessToken);
              setMptoken(response.data.data.accessToken);
              setLoading(false);
              checkMasterpass();
              /*AsyncStorage.setItem('biometricsKey', publicKey).then(()=>{
                  navigation.navigate('TabNavigationRoutes');
              });*/
            }else{
              setLoading(false);
              console.log("masterpass token error")
              console.log(response);
              Alert.alert(response.data.data.errors.message);
            }
          })
          .catch(error => {
            setLoading(false);
            console.error("Error sending data: ", error);
            console.error("Error sending data: ", error.response);
            console.error("Error sending data: ", error.response.data.errors.message);
            //console.log(JSON.parse(error.response));
            let msg="";
            (error.response.data.errors.message) ? msg += error.response.data.errors.message+"\n" : msg += "Ödeme hatası \n"; (error.response.data.errors.paymentError) ? msg += error.response.data.errors.paymentError+"\n" : msg += ""; Alert.alert(msg);
      
            
            //Alert.alert("Error sending data: ", error);
          });
        }).then(response => {
            
            
          })
    .catch(error => {
      
      
    }); 
        });
      });
      
   
    return unsubscribe;
  }, [navigation]);
  
  const onMpEvent = async (data) => {
    console.log("mpevent");
    console.log(data);
    if (data.status === 'ready') {
        // ready to check mp registration

        //masterpassRef.checkMasterpass().catch(console.warn);
        //console.log(masterpassRef)
        //masterpassRef.registrationCheck();
        checkMasterpass();
    }
}
const checkMasterpass = async () => {
  // check registration
  //console.log(MasterPassSDK);
  console.log(phone);
  console.log(mpToken);
  console.log("checkMasterpass");
  linkAccount();
  /*const listResponse = await MasterPassSDK.listCards({
    msisdn: phone, // Mobile number
    token: mpToken, // Authentication token received from your backend server    
  });
  console.log(listResponse)*/
  
};
const linkAccount = async () => {
  console.log("linkAccount");
  const params = {
    token: mpToken, // required
    msisdn: phone, // required

    // optional params

    // cardAliasName: '',
    // sendSms: 'Y',
    // referenceNo: '',
    // fp: '',
  }

  const { data, errorMessage, errorCode, validationToken, validationType, url3D } = await api.account.link({ params })
  
  console.log("res");
  console.log(data);
  console.log(errorMessage);
  console.log(errorCode);
  console.log(validationToken);
  console.log(validationType);
  console.log(url3D);
  // do something
}

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <TabHeader routetarget="Balance" name="Masterpass Test" count="0" />
      <View style={{paddingTop:60}}>
        <Text style={{textAlign:'center', fontSize:18, fontWeight:'700'}}>
          Masterpass Test
        </Text>

        <MasterpassProvider config={config}>
          {/* your child component */}
        </MasterpassProvider>
      </View>
    </SafeAreaView>
  );
};

export default MasterpassScreen3;

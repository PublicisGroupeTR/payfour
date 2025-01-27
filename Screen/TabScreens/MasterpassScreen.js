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
import {CardAction, MasterPassTurkey, OtpAction, PurchaseAction, RegistrationCheckAction} from 'react-native-masterpass-turkey';

//https://test-client.bubbleads.co/Scripts/masterpass-javascript-sdk-web.min.js


const MasterpassScreen = ({navigation}) => {

  const masterpassRef = useRef();
  const [phone, setPhone] = useState('');
  const [mpToken, setMptoken] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {   
    const unsubscribe = navigation.addListener('focus', () => { 
          
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
          
          axios.get('https://api-app.payfour.com/api/payments/generatemasterpasstoken', config)
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
  console.log("checkMasterpass");
  console.log(masterpassRef.current);
  const check = await masterpassRef.current.registrationCheck();
  console.log("check");
  console.log(check);
  // is user already authorized to list cards
  const isActionListCards = check.action === RegistrationCheckAction.listCards;
  this.setState({
    mpHasAccount: check.result,
    mpIsLinked: isActionListCards,
    mpCanShowSave: true,
  });

  // list masterpass cards
  if (check.result && isActionListCards) {
    return this.listMasterpassCards().catch(console.warn);
  }
};

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <TabHeader routetarget="Balance" name="Masterpass Test" count="0" />
      <View style={{paddingTop:60}}>
        <Text style={{textAlign:'center', fontSize:18, fontWeight:'700'}}>
          Masterpass Test
        </Text>
      </View>
      {mpToken != '' ? 
      <MasterPassTurkey
          ref={masterpassRef}
          token={mpToken}
          referenceNo='server generated ref number'
          userId={phone}
          sendSmsLanguage='tur'
          sendSms='N'
          clientId='1234567'
          sdkUrl='https://test-client.bubbleads.co/Scripts/MasterPass/mfs-client.min.js'
          jqueryUrl='https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'
          //serviceUrl='https://mp-test-backend.masterpassturkiye.com/payment/api/'
          serviceUrl='https://mp-test-sdk.masterpassturkiye.com'
          macroMerchantId='347102188'
          clientIp='123.12.12.123'
          onEvent={onMpEvent} />

          :
          <View></View>}
    </SafeAreaView>
  );
};

export default MasterpassScreen;

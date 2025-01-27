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
import {MasterPassSDK} from '@macellan/masterpass-sdk';
import {RSAKey} from 'react-native-rsa'
import { sha256, sha256Bytes } from 'react-native-sha256';
import { WebView } from 'react-native-webview';
//https://test-client.bubbleads.co/Scripts/masterpass-javascript-sdk-web.min.js


const MasterpassScreen2 = ({navigation}) => {

  const webview = useRef();
  const [phone, setPhone] = useState('');
  const [mpToken, setMptoken] = useState('');
  const [payfourId, setPayfourId] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({token:'', phone:'', payfourId:''});
  
  useEffect(() => {   
    const unsubscribe = navigation.addListener('focus', () => { 

      webview.current.postMessage("Hello from RN");

      //MasterPassSDK.setAddress('https://mp-test-sdk.masterpassturkiye.com/');
      //MasterPassSDK.setClientId('347102188');
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
            let u = user;
            user.phone = obj.phone;
            user.payfourId = obj.payfourId;
          /*setPhone(obj.phone);
          setPayfourId(obj.payfourId);*/
          setUser(u);

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
              //checkMasterpass();
              let u = user;
              user.token = response.data.data.accessToken;
              setUser(u);
              checkUser();
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
const checkUser = async () => {
  console.log("checkUser");
  console.log(user);
  /*console.log(phone);
  console.log(payfourId);*/
  console.log(">>>>>>>>>>");
  let tk = user.token.replace('Bearer ', '');
  let ph = user.phone.replace('+', '');
  console.log(tk);
  console.log(ph);
  console.log("checkUser");

  const config = {
    headers: { Authorization: `Bearer ${tk}` }
  };
  axios.get('https://mp-test-sdk.masterpassturkiye.com/account/api/Card?accountKey='+ph+'&accountKeyType=Msisdn&userId='+ user.payfourId+'&merchantId=347102188', config)
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
              //checkMasterpass();
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
            //console.error("Error sending data: ", error);
            console.error("Error sending: ", error.response);
            //console.error("Error sending data: ", error.response.config);
            console.error("Error sending data: ", error.response.data);
            console.error("Error sending exception: ", error.response.data.exception);
            console.error("Error sending data: ", error.response.data.exception.code);
            //console.log(JSON.parse(error.response));

            //if(error.response.data.exception.code == 'ACCOUNT_NOT_FOUND' || error.response.data.statusCode =='404') addCard();
            if(error.response.data.exception.code == 'ACCOUNT_NOT_FOUND' || error.response.data.statusCode =='404'){
              console.log("go to add card");
              webview.current.postMessage("addCard");
            } 
            //let msg="";
            //(error.response.data.errors.message) ? msg += error.response.data.errors.message+"\n" : msg += "Ödeme hatası \n"; (error.response.data.errors.paymentError) ? msg += error.response.data.errors.paymentError+"\n" : msg += ""; Alert.alert(msg);
      
            
            //Alert.alert("Error sending data: ", error);
          });
}
const addCard = ()=>{
  console.log("addCard");
  /*curl --location 'https://mp-test-sdk.masterpassturkiye.com/account/api/Card' \
--header 'Authorization: Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJNZXJjaGFudElkIjoiMzQ3MDA3MDQiLCJBY2NvdW50S2V5IjoiOTA1MzA4Nzc2ODk3IiwiSXNNc2lzZG5WYWxpZGF0ZWQiOiJGYWxzZSIsIkF1dGhlbnRpY2F0aW9uTWV0aG9kIjoiTm90RGVmaW5lZCIsIlNlY3VyZTNkVHlwZSI6Ik5vdERlZmluZWQiLCJJc090cFZhbGlkYXRlZCI6IkZhbHNlIiwiSXNDdXN0b20iOiJGYWxzZSIsIkN1cnJlbmN5Q29kZSI6Ik5PTkUiLCJIYXNoIjoiZGFkNGhobmR0ZjEwNkxRVmpzTEsycTArUGd6WGtFZ1hzazlkaEJqTElGV0xSbXk4YUpnVzg9IiwiVXNlcklkIjoiQ1kveWdjVXp0VHJBdE52MG5YQkNjdz09IiwiZXhwIjoxNzExNTQ0NzA2LCJpc3MiOiJodHRwczovL21wLXRlc3QubWFzdGVycGFzc3R1cmtpeWUuY29tL29hdXRoL3JlYWxtcy9tZXJjaGFudC1hcGktcmVhbG0iLCJhdWQiOiJNZXJjaGFudEF1ZGllbmNlIn0.c9AJn60SjAWyQJBT6KRPCAz84pf2GFItbrIxzV05kQRbqmMsy1Q2j_6_LDzJJiSKr82oNCKnSOgE0yMJ1ZQllw' \
--header 'Content-Type: application/json' \
--data '{
    "merchantId": "34707096",
    "requestReferenceNumber": "122323",
    "accountKey": "905398986523",
    "accountKeyType":"Msisdn",
    "cardNumber":"32c3933b24775cc82c5b70cb9bd5ed42ae8e014676772e61cb074b9500921291e4a8b6ee7e775ab140e2627a9a6142627035e43a3252a4474b06a3b90470d8f4f331e121bfc64f73f64ef6f1b825558830cc775de3602d9602fef25cceba626915e50370ac2e7faa8c9de4bd81b1ac3de6387d5166fb4bd870d7693e7d8c5859dac6a055b3f64a8167a3c8acfa1fffbd35b3df7f21160d2b61152c20aef7403d4756e77dc8bff6a6b8a6d342a16aeccb",
    "expiryDate": "2905",
    "cvc":"000",
    "accountAliasName": "papara",
    "cardHolderName": "papara",
    "merchantUserId": "9894",
    "sourceChannel": "Web"
}'*/
//'https://api-app.payfour.com/api/payments/addcard'
webview.current.postMessage("check;check");
var RSAKey = require('react-native-rsa');
      const bits = 2048;
      const exponent = '10001'; // must be a string
      var rsa = new RSAKey();
      var r = rsa.generate(bits, exponent);
      //var publicKey = rsa.RSAGetPublicString(); // return json encoded string
      //var privateKey = rsa.RSAGetPrivateString(); // return json encoded string
      console.log("rsa keys");
      /*console.log(publicKey);
      console.log(privateKey);*/
      rsa.setPublicString(JSON.stringify('F619C53A37BAB059C583DA9AC4E2920FFC9D57E00885E82F7A0863DEAC43CE06374E45A1417DAC907C6CAC0AF1DDF1D7152192FED7A1D9255C97BC27E420E0742B95ED3C53C62995F42CB6EEDB7B1FBDD3E4F4A4AA935650DA81E763CA7074690032F6A6AF72802CC50394C2AFA5C9450A990E6F969A38571C8BC9E381125D2BEEC348AF919D7374FF10DC3E0B4367566CE929AD6EA323A475A677EB41C20B42D44E82E8A53DD52334D927394FCADF09'));
      var originText = 'sample String Value';
      var encrypted = rsa.encrypt('4043082041362020');
      console.log("encrypted");
      console.log(encrypted);
      var encryptedcvc = rsa.encrypt('872');
let tk = user.token.replace('Bearer ', '');
  let ph = user.phone.replace('+', '');
  const config = {
    headers: { Authorization: `Bearer ${tk}` }
  };
  
let dataToSend = {
  "merchantId": "347102188",
  "requestReferenceNumber":Math.floor(Math.random() * (999999 - 111111 + 1) + 111111),
  "accountKey":ph,
  "accountKeyType":"Msisdn",
  "cardNumber": encrypted,
  "expiryDate": "2508",
  "cvc":encryptedcvc,
  "accountAliasName": "bonus",
  "cardHolderName": "Salih Kağan Çam",
  "merchantUserId": user.payfourId,
    "sourceChannel": "Web"
}
console.log(dataToSend);
/*{
  "token": "string",
  "referenceNumber": "string",
  "cardNumber": "string",
  "cardHolderName": "string",
  "expire": "string",
  "cvv": "string",
  "accountAliasName": "string"
}*/
axios.post('https://mp-test-sdk.masterpassturkiye.com/account/api/Card',dataToSend, config)
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
        

}
const checkMasterpass = async () => {
  // check registration
  console.log(MasterPassSDK);
  console.log(phone);
  console.log(mpToken);
  let tk = mpToken.replace('Bearer ', '');
  let ph = phone.replace('+', '');
  console.log(tk);
  console.log(ph);
  console.log("checkMasterpass");
  /*const listResponse = await MasterPassSDK.listCards({
    msisdn: phone, // Mobile number
    token: mpToken, // Authentication token received from your backend server    
  });
  console.log(listResponse)*/
  const config = {
    headers: { Authorization: `Bearer ${tk}` }
  };
  axios.put('https://mp-test-sdk.masterpassturkiye.com/account/api/Account/LinkToMerchant',{"accountKey":ph, "merchantId": "347102188",}, config)
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
};
const onMessage = (message) => {
  console.log("onmessage");
  console.log(message);
}
const testMessage =() =>{
  console.log("testMessage");
  console.log(webview);
  console.log(webview.current);
  if(webview.current) webview.current.postMessage("addCard;check");
}
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <TabHeader routetarget="Balance" name="Masterpass Test" count="0" />
      <View style={{paddingTop:60}}>
        <Text style={{textAlign:'center', fontSize:18, fontWeight:'700'}}>
          Masterpass Test webview
        </Text>
        <View style={{ 
          width:300,
          height:300,
          backgroundColor:'#ff0000'
         }}>
        <WebView 
        //source={{ uri: 'https://test-client.bubbleads.co/message.html' }} 
        source={require("../../message.html")}
        ref={webview}
        onMessage={onMessage}
        style={{ 
          flex:1,
          backgroundColor:'#00ff00'
         }} 
        />
        <TouchableOpacity style={{width:100, height:20, backgroundColor:'#ababab'}}
        onPress={() => {
          console.log("press test")
          testMessage();
        }}>
          
        </TouchableOpacity>
      </View>
      </View>
    </SafeAreaView>
  );
};

export default MasterpassScreen2;

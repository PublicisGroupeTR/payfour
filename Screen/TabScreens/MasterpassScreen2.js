/* eslint-disable react-native/no-inline-styles */
// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useEffect, useRef, useState} from 'react';
import {View, Text, SafeAreaView, Pressable, ScrollView, KeyboardAvoidingView, Alert, Image, Modal, FlatList, StyleSheet, Dimensions, TextInput, Keyboard, TouchableOpacity, Linking} from 'react-native';
import {styles} from '../Components/Styles.js';
import TabHeader from '../Components/TabHeader.js';
import Loader from '../Components/Loader';
import SubtabHeader from '../Components/SubtabHeader';
import { registerStyles } from '../Components/RegisterStyles';
import { useError } from '../Contexts/ErrorContext';
//import {TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'react-native-axios';
//import {MasterPassSDK} from '@macellan/masterpass-sdk';
import {RSAKey} from 'react-native-rsa'
import { sha256, sha256Bytes } from 'react-native-sha256';
import { WebView } from 'react-native-webview';
import MaskInput, { createNumberMask } from 'react-native-mask-input';
//https://test-client.bubbleads.co/Scripts/masterpass-javascript-sdk-web.min.js
import {createStackNavigator} from '@react-navigation/stack';
import { Modalize } from 'react-native-modalize';

const Stack = createStackNavigator();

const ListCards = ({navigation, route }) => {

  const webview = useRef();
  const [phone, setPhone] = useState('');
  const [mpToken, setMptoken] = useState('');
  const [iframeUrl, setIframeUrl] = useState('');
  const [payfourId, setPayfourId] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({token:'', phone:'', payfourId:''});
  const [deleteData, setDeleteData] = useState({cardAlias:'', accountKey:''});
  const scrollRef = useRef(); 
  const [cardData, setCardData] = React.useState([]);
  const scrollRef2 = useRef(); 
  const [carrefourCardData, setCarrefourCardData] = React.useState([]);
  const [cardType, setCardType] = React.useState('carrefour');
  const [cardListType, setCardListType] = React.useState('carrefour');
  const [currentObj, setCurrentObj] = useState({"type":"", "data":{}});
  const [cardDeleteModalVisible, setCardDeleteModalVisible] = useState(false);
  const [lastCardResetModalVisible, setLastCardResetModalVisible] = useState(false);
  const [lastCardDeleteModalVisible, setLastCardDeleteModalVisible] = useState(false);
  const [otpModalVisible, setOtpModalVisible] = useState(false);
  const [verifyAccountModalVisible, setVerifyAccountModalVisible] = useState(false);
  const [resetMasterPassModalVisible, setResetMasterPassModalVisible] = useState(false);
  const [otpToken, setOtpToken] = useState("");
  const [otp, setOtp] = useState("");
  const [stopOtpTimer, setStopOtpTimer] = useState(false);
  const [timerCount, setTimerCount] = useState(180);
  const [timerText, setTimerText] = useState('03:00');
  const [resetTimer, setResetTimer] = useState(false);
  
  useEffect(() => {
    console.log(">>>>>>>> MasterPassScreen2");
    console.log(route);
    console.log(route.params);
    if(route.params && route.params != undefined && route.params != "undefined" && route.params.card == "true"){
      setCardType('bank');
      setCardListType('bank');
    }
    console.log(">>>>>>>> MasterPassScreen2");

    const unsubscribe = navigation.addListener('focus', () => { 

      //webview.current.postMessage("Hello from RN");

      //MasterPassSDK.setAddress('https://mp-test-sdk.masterpassturkiye.com/');
      //MasterPassSDK.setClientId('347102188');
      getCarrefourCards();
      
      });
      
   
    return unsubscribe;
  }, [navigation]);
  const resetOtpTimer = ()=>{
    setResetTimer(false);
    setTimerCount(180);
    startOtpTimer();
    console.log("resetotp");
    
  }
  const startOtpTimer = ()=>{
    if(!stopOtpTimer){
      let interval = setInterval(() => {
        setTimerCount(lastTimerCount => {
            //console.log(lastTimerCount);
            let tt;
            let m = Math.floor(lastTimerCount / 60);
            let mt = "0"+m;
            let r = lastTimerCount - (m*60);
            let s = r < 10 ? "0"+r : r;
            tt = mt+":"+s;
            //console.log(tt);
            setTimerText(tt);
            if (lastTimerCount == 0) {
                //your redirection to Quit screen
                clearInterval(interval);
                setTimerText("00:00");
                setResetTimer(true);
            } else {
                return lastTimerCount - 1
            }
        })
      }, 1000) //each count lasts for a second
      //cleanup the interval on complete
      return () => clearInterval(interval);
    }
  } 
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
const checkMasterpassToken = ()=>{
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
              //checkMasterpass();
              /*AsyncStorage.setItem('biometricsKey', publicKey).then(()=>{
                  navigation.navigate('TabNavigationRoutes');
              });*/
            }else{
              setLoading(false);
              console.log("masterpass token error")
              console.log(response);
              //Alert.alert(response.data.data.errors.message);
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
}
const getCardType = (number) => {
  const re = /\*/gi;
  let num = number.replace(re, "0");
  var cards = {
      visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
      mastercard: /^5[1-5][0-9]{14}$/,
      amex: /^3[47][0-9]{13}$/,
      // diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
      // discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
      // jcb: /^(?:2131|1800|35\d{3})\d{11}$/
  };
  for (var card in cards) {
      if (cards[card].test(num)) {
          return card;
      }
  }
};
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
            if(response.data.statusCode == "200"){
              //navigation.navigate('Success');
              //setSuccessModalVisible(true);
              console.log("masterpass token");
              console.log(response.data.result);
              console.log(response.data.result.cards);
              setLoading(false);
              if(response.data.result.cards.length > 0){
                //addCard();
                console.log("list cards");
                let crds = response.data.result.cards;
                for(var i=0;i< crds.length;i++){
                  crds[i].issuer = getCardType(crds[i].maskedCardNumber);
                  switch (crds[i].issuer){
                    case "visa":
                      crds[i].logo = require('../../assets/img/export/logo_visa.png');
                      break;
                      case "mastercard":
                      crds[i].logo = require('../../assets/img/export/add_masterpass.png');
                      break;
                      case "amex":
                      crds[i].logo = require('../../assets/img/export/logo_amex.png');
                      break;
                      default:
                      crds[i].logo = require('../../assets/img/export/logo_visa.png');
                      break;
                  }
                }
                console.log("cards +++");
                console.log(crds);
                setCardData(crds);
                //getCarrefourCards();
              }
                addCard();
              
              //checkMasterpass();
              /*AsyncStorage.setItem('biometricsKey', publicKey).then(()=>{
                  navigation.navigate('TabNavigationRoutes');
              });*/
            }else{
              setLoading(false);
              console.log("masterpass token error")
              console.log(response);
              //Alert.alert(response.data.data.errors.message);
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

            if(error.response.data.statusCode == "404"){
              if(error.response.data.exception){
                if(error.response.data.exception.code){
                  if(error.response.data.exception.code == "USER_NOT_FOUND"){
                    setResetMasterPassModalVisible(true);
                  }else if(error.response.data.exception.code == "ACCOUNT_NOT_LINKED_TO_MERCHANT"){
                    //setResetMasterPassModalVisible(true);
                    checkMasterpass();                    
                  }
                }
              }
            }
            //console.log(JSON.parse(error.response));

            //if(error.response.data.exception.code == 'ACCOUNT_NOT_FOUND' || error.response.data.statusCode =='404') addCard();
            /*if(error.response.data.exception.code == 'ACCOUNT_NOT_FOUND' || error.response.data.statusCode =='404'){
              console.log("go to add card");
              //webview.current.postMessage("addCard");
              addCard();
            } */

            addCard();

            //let msg="";
            //(error.response.data.errors.message) ? msg += error.response.data.errors.message+"\n" : msg += "Ödeme hatası \n"; (error.response.data.errors.paymentError) ? msg += error.response.data.errors.paymentError+"\n" : msg += ""; Alert.alert(msg);
      
            
            //Alert.alert("Error sending data: ", error);
          });
}
const getCarrefourCards = () =>{
  setLoading(true);
  AsyncStorage.getItem('token').then(value =>{
      
    const config = {
      headers: { Authorization: `Bearer ${value}` }
    };
    axios.get('https://api-app.payfour.com/api/account/getloyaltycards', config)
          .then(response => {
            console.log("getLoyaltyCards");
            console.log(response);
            console.log(response.data);
            
            let arr = response.data.data;
            for(var i=0; i < arr.length;i++){
              arr[i].logo = require('../../assets/img/export/carrefour_bireysel.png');
            }
            console.log(arr);
            setCarrefourCardData(arr);

            setLoading(false);
            checkMasterpassToken();
          }).catch(error => {
            setLoading(false);
            console.error("Error sending data: ", error);
            console.error("Error sending data: ", error.response);
            console.error("Error sending data: ", error.response.data.errors.message);
            //console.log(JSON.parse(error.response));
            let msg="";
            (error.response.data.errors.message) ? msg += error.response.data.errors.message+"\n" : msg += "Ödeme hatası \n"; (error.response.data.errors.paymentError) ? msg += error.response.data.errors.paymentError+"\n" : msg += ""; Alert.alert(msg);
      
            
            //Alert.alert("Error sending data: ", error);
          });
        
        });
}
const addCard = ()=>{
  console.log("addCard");
  AsyncStorage.getItem('token').then(value =>{
      
    const config = {
      headers: { Authorization: `Bearer ${value}` }
    };
  console.log(mpToken);
//'https://api-app.payfour.com/api/payments/addcard'
//webview.current.postMessage("check;check");

let tk = user.token.replace('Bearer ', '');
  let ph = user.phone.replace('+', '');
  
  
// let dataToSend = {
//   "merchantId": "347102188",
//   "requestReferenceNumber":Math.floor(Math.random() * (999999 - 111111 + 1) + 111111),
//   "accountKey":ph,
//   "accountKeyType":"Msisdn",
//   "cardNumber": encrypted,
//   "expiryDate": "2508",
//   "cvc":encryptedcvc,
//   "accountAliasName": "bonus",
//   "cardHolderName": "Salih Kağan Çam",
//   "merchantUserId": user.payfourId,
//     "sourceChannel": "Web"
// }
console.log(dataToSend);
let dataToSend ={
  "token": tk,
  "referenceNumber": Math.floor(Math.random() * (999999 - 111111 + 1) + 111111),
  "cardNumber": "4870742041362027",
  "cardHolderName": "Salih Kağan Çam",
  "expire": "2508",
  "cvv": "262",
  "accountAliasName": "bonusgold"
}
axios.post('https://api-app.payfour.com/api/payments/addcard',dataToSend, config)
          .then(response => {
            console.log(response);
            console.log(response.data);
            if(response.data.success){
              //navigation.navigate('Success');
              //setSuccessModalVisible(true);
              console.log("addcard url");
              console.log(response.data.data.url);
              setIframeUrl(response.data.data.url);
              setLoading(false);
              //Alert.alert("addcard end");
              //checkMasterpass();
              //setTimeout(function(){testPayment();}, 5000);
              //if(currentObj.type="addCard") setTimeout(function(){sendPayment();}, 5000);
            }else{
              setLoading(false);
              console.log("masterpass token error")
              console.log(response);
              //Alert.alert(response.data.data.errors.message);
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
        
        });

        /*{"data": 
        {"url": 
        "https://api-app.payfour.com/masterpass/addcard/2bf6a86d-93f2-4335-a182-4dac75d35f28"}, 
        "status": 200, 
        "success": true
        }*/
}
const checkMasterpass = async () => {
  // check registration
  //console.log(MasterPassSDK);
  console.log("checkMasterpass");
  //console.log(phone);
  //console.log(mptoken);
  let tk = user.token.replace('Bearer ', '');
  let ph = user.phone.replace('+', '');
  console.log(tk);
  console.log(ph);
  
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
            console.log("LinkToMerchant response")
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
            }else if(response.data.statusCode == "202"){
              setLoading(false);
              console.log("masterpass otp needed")
              //console.log(response);
              //Alert.alert(response.data.data.errors.message);
              if(response.data.result.responseCode == "5001" || response.data.result.responseCode == "5010"){
                
                if(response.data.result.responseCode == "5001"){
                console.log("payment otp");
                
                //confirmPayment();
                //setTimeout(potpMessage, 2000);
                //setTimeout(function(){potpMessage(response.data.result.token);},3000);
                console.log("response.data.result");
                console.log(response.data.result);
                setOtpToken(response.data.result.token);
                setOtpModalVisible(true);
                startOtpTimer();
                //postPaymentOtp("123456",response.data.result.token);
                //setTimeout(sendOtp, 2000);
              }else if(response.data.result.responseCode == "5010"){
                //Alert.alert("5010 - 3ds onayı gerekli");
                console.log(returnUrl);
                console.log(response.data.result.url3d+"&returnUrl="+returnUrl);
                setUrl3d(response.data.result.url3d+"&returnUrl="+returnUrl);
                //checkOrderCompletion(currentObj.data.orderId);
               }
  
              }
            }
            //checkUser();
          })
          .catch(error => {
            setLoading(false);
            console.error("Error sending data: ", error);
            console.error("Error sending data: ", error.response);
            console.error("Error sending data: ", error.response.data.errors.message);
            //console.log(JSON.parse(error.response));
            let msg="";
            (error.response.data.errors.message) ? msg += error.response.data.errors.message+"\n" : msg += "Ödeme hatası \n"; (error.response.data.errors.paymentError) ? msg += error.response.data.errors.paymentError+"\n" : msg += ""; Alert.alert(msg);
      
            //checkUser();
            //Alert.alert("Error sending data: ", error);
          });
};
const sendOtp = () =>{
  console.log("sendOtp");
  let tk = user.token.replace('Bearer ', '');
  let dataToSend = {
    "otpCode": "123456",
  }
  console.log("sendOtp : "+'https://mp-test-sdk.masterpassturkiye.com/verify/api/VerifyOtp/request')
  const config = {
    headers: { Authorization: `Bearer ${tk}` }
  };
  axios.post('https://mp-test-sdk.masterpassturkiye.com/verify/api/Verify/',dataToSend, config)
          .then(response => {
            console.log(response);
            console.log(response.data);
            
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
const sendPayment = () =>{
  let tk = user.token.replace('Bearer ', '');
  let ph = user.phone.replace('+', '');

  let refNo = Math.floor(Math.random() * (999999 - 111111 + 1) + 111111)
  let dataToSend = {
    "MerchantId": "347102188",
    "RequestReferenceNo":refNo,
    "AccountKey":ph,
    "Amount": "500",
    "authenticationMethod":"otp",
    "CardAlias": "sanal",
    "SourceChannel": "Android"
  }
  console.log("currentObj before send");
  console.log(currentObj);
  setCurrentObj({
    type:'payment',
    data:dataToSend
  });
  console.log(currentObj);
  console.log(">>>>>>>>>>>>>>>");
  console.log("SendPayment : "+'https://mp-test-sdk.masterpassturkiye.com/payment/api/Payment/request')
  const config = {
    headers: { Authorization: `Bearer ${tk}` }
  };
  axios.post('https://mp-test-sdk.masterpassturkiye.com/payment/api/Payment/request',dataToSend, config)
          .then(response => {
            console.log(response);
            console.log(response.data);
            /* {"buildId": "554", 
            "correlationId": "3f74723e-f396-426a-a117-b8ac0dbb5db7", 
            "exception": null, 
            "message": "Accepted", 
            "requestId": null, 
            "result": {
            "description": "Telefonunuza gelen tek kullanımlık şifreyi girerek kart doğrulama işlemini tamamlayınız", 
            "maskedNumber": "************2021", 
            "responseCode": "5001", 
            "retrievalReferenceNumber": "200004357017", 
            "terminalGroupId": null, 
            "token": "bd82f9ecdce44377b8a8555db39572c5", 
            "url3d": null, 
            "url3dFail": null, 
            "url3dSuccess": null}, 
            "statusCode": 202, 
            "version": null}*/
            console.log("currentObj after result");
            console.log(currentObj);
            let d = currentObj;
            d.type="payment";
            d.data.token = response.data.result.token;
            d.data.cardNumber = response.data.result.maskedNumber;
            d.data.orderId = refNo;
            d.data.amount = "500";
            setCurrentObj(d);
            /*setCurrentObj({
              type:'payment',
              data:response.data.result
            });*/
            console.log("response.data.result.responseCode");
            console.log(response.data.result.responseCode);
            console.log("currentObj");
            console.log(currentObj);
            setLoading(false);
            if(response.data.result.responseCode == "5001" || response.data.result.responseCode == "5010"){
             if(response.data.result.responseCode == "5001"){
              console.log("payment otp");
              
              confirmPayment();
              //setTimeout(otpMessage, 2000);
              //setTimeout(sendOtp, 2000);
             }else if(response.data.result.responseCode == "5010"){
              Alert.alert("5010 - 3ds onayı gerekli");
             }

            }else{
              console.log("payment error somewhere");
              setLoading(false);
            }
            //otpMessage();
            /*if(response.data.success){
              //navigation.navigate('Success');
              //setSuccessModalVisible(true);
              console.log("Payment");
              setLoading(false);
            }else{
              setLoading(false);
              console.log("Payment error")
              console.log(response);
              //Alert.alert(response.data.data.errors.message);
            }*/
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
const confirmPayment = () =>{
  AsyncStorage.getItem('token').then(value =>{
      
    const config = {
      headers: { Authorization: `Bearer ${value}` }
    };
    // let dataToSend ={
    //   "token": tk,
    //   "referenceNumber": Math.floor(Math.random() * (999999 - 111111 + 1) + 111111),
    //   "cardNumber": "5440782041362021",
    //   "cardHolderName": "Salih Kağan Çam",
    //   "expire": "2507",
    //   "cvv": "889",
    //   "accountAliasName": "sanal"
    // }
    let dataToSend ={
      "masterpassUserToken":user.token.replace('Bearer ', ''),
      "paymentToken": currentObj.data.token,
      "orderId": currentObj.data.orderId,
      "cardNumber": currentObj.data.cardNumber,
      "amount": currentObj.data.amount,
      "isDirectPayment": false
    }
    console.log(dataToSend);

/* {"buildId": "554", 
            "correlationId": "3f74723e-f396-426a-a117-b8ac0dbb5db7", 
            "exception": null, 
            "message": "Accepted", 
            "requestId": null, 
            "result": {
            "description": "Telefonunuza gelen tek kullanımlık şifreyi girerek kart doğrulama işlemini tamamlayınız", 
            "maskedNumber": "************2021", 
            "responseCode": "5001", 
            "retrievalReferenceNumber": "200004357017", 
            "terminalGroupId": null, 
            "token": "bd82f9ecdce44377b8a8555db39572c5", 
            "url3d": null, 
            "url3dFail": null, 
            "url3dSuccess": null}, 
            "statusCode": 202, 
            "version": null}*/

    axios.post('https://api-app.payfour.com/api/payments/addbudgetwithcreditcard',dataToSend, config)
              .then(response => {
                console.log(response);
                console.log(response.data);
                if(response.data.success){
                  //navigation.navigate('Success');
                  //setSuccessModalVisible(true);
                  //console.log("addcard url");
                  /*console.log(response.data.data.url);
                  setIframeUrl(response.data.data.url);*/
                  setLoading(false);
                  //checkMasterpass();
                  /*AsyncStorage.setItem('biometricsKey', publicKey).then(()=>{
                      navigation.navigate('TabNavigationRoutes');
                  });*/
                  //setTimeout(function(){testPayment();}, 5000);
                  //setTimeout(function(){sendPayment();}, 5000);
                  setTimeout(otpMessage, 2000);
                }else{
                  setLoading(false);
                  console.log("masterpass token error")
                  console.log(response);
                  //Alert.alert(response.data.data.errors.message);
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
          
            
              });
            
            });

}
const onMessage = (message) => {
  console.log("onmessage");
  console.log(message);
  console.group("currentObj");
  console.log(currentObj);

  /*if(currentObj.type != null){
    switch(currentObj.type){
      case "payment":
        console.log("confirmPayment");
        confirmPayment();
        break;
    }
  }else */
  if(message.nativeEvent.data == "202") {
    //sendVerify();
    otpMessage();
  }else if(message.nativeEvent.data == "200") {
    setCardDeleteModalVisible(false);
    console.log("onDeleteSuccess");
    console.log(cardData);
    console.log(cardData.length);
    if(cardData.length < 2){
      setCardData([]);
      navigation.navigate('Discover');
    }else{
      checkUser();
    }
  }else if(message.nativeEvent.data == "404") {
    //Alert.alert("Hata:", "404")
    setResetMasterPassModalVisible(true);
  }
}
const testPayment = () =>{
  console.log("testPayment")
  /*[{"cardAlias": "sanal", "cardBin": "544078", "cardIssuerIcaNumber": "2030", "cardState": "Activated", "cardType": "Credit", "cardValidationType": "OTP", "eftCode": null, "expireDate": null, "expireSoon": false, "isCardCreditOrSupportedDebit": true, "isDefaultCard": true, "isDefaultMoneySendCard": false, "isEightDigit": false, "isExpired": false, "isIssuerOtpSupported": true, "isMasterpassMember": true, "maskedCardNumber": "544078********21", "productName": "BNSSANAL", "sourceMerchantId": 0, "sourceMerchantName": null, "systemEntryDatetime": null, "uniqueCardNumber": "E2CA0B101682706FEEA78AE8AE65F5AC9DCF99A5FAE5134AF5E588879A044C0B"}]*/
  let obj = {
    cardAlias : "sanal",
    accountKey: "905337745616",
    amount: "1000"
  }
  let postData = JSON.stringify(obj);
  console.log("postData");
  console.log(postData);
  console.log("payment;"+postData);
  if(webview.current) webview.current.postMessage("payment;"+postData);
}
const testMessage =() =>{
  console.log("testMessage");
  console.log(webview);
  console.log(webview.current);
  if(webview.current) webview.current.postMessage("addCard;check");
}
const otpMessage = () =>{
  console.log("otpMessage");
  if(webview.current) webview.current.postMessage("otp;123456");
}
const postLinkingOtp = (otp, ptoken)=>{
  console.log("postLinkingOtp");
  console.log(otp);
  console.log(ptoken);

  //'https://mp-test-sdk.masterpassturkiye.com/user-authorization/api/Payment/verify'
  let tk = user.token.replace('Bearer ', '');
  const config = {
    headers: { Authorization: `Bearer ${tk}` }
  };
  let dataToSend = {
    "otpCode": "123456",
    "token": ptoken
  }
  console.log("currentObj before send");
  console.log(currentObj);
  setCurrentObj({
    type:'payment',
    data:dataToSend
  });
  setLoading(true);
  console.log(dataToSend);
  console.log(">>>>>>>>>>>>>>>");
  console.log("postLinkingOtp : "+'https://mp-test-sdk.masterpassturkiye.com/user-authorization/api/LinkAccount/verify')
  /*curl --location 'https://mp-test-sdk.masterpassturkiye.com/user-authorization/api/LinkAccount/verify' \
--header 'Authorization: Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJNZXJjaGFudElkIjoiMzQ3MTAyMTEwIiwiQWNjb3VudEtleSI6IjkwNTQ0NjU2NTQ2MCIsIklzTXNpc2RuVmFsaWRhdGVkIjoiRmFsc2UiLCJBdXRoZW50aWNhdGlvbk1ldGhvZCI6Ik5vdERlZmluZWQiLCJTZWN1cmUzZFR5cGUiOiJOb3REZWZpbmVkIiwiSXNPdHBWYWxpZGF0ZWQiOiJGYWxzZSIsIklzQ3VzdG9tIjoiRmFsc2UiLCJDdXJyZW5jeUNvZGUiOiJOT05FIiwiSGFzaCI6ImlwbDd2YWg5OWdSUlA3d1pxU3RUeG83T2t6akM2eG1wWGJ2dFZqOW1PSnpmZ2JiU3lrMWxzPSIsIlVzZXJJZCI6IllRaVZWai9ZWXRseGx3RWgweDhkSVE9PSIsImV4cCI6MTcxMDkzODk3NSwiaXNzIjoiaHR0cHM6Ly9tcC10ZXN0Lm1hc3RlcnBhc3N0dXJraXllLmNvbS9vYXV0aC9yZWFsbXMvbWVyY2hhbnQtYXBpLXJlYWxtIiwiYXVkIjoiTWVyY2hhbnRBdWRpZW5jZSJ9.I2ClXwYKX4Rhb2yG6b5nxPkq3PlQC7AbP0BUq29fOPB8xjf8behVbqKPzcoM1sQom8u9oC_QvPh_KMxHY7GBDg' \
--header 'Content-Type: application/json' \
--data '{
    "token": "9011c15a693a4de5b9e439d0355842a6",
    "otpCode": "123456"
}'*/
  
   axios.post('https://mp-test-sdk.masterpassturkiye.com/user-authorization/api/LinkAccount/verify',dataToSend, config)
           .then(response => {
             console.log(response);
             console.log(response.data);
             console.log("currentObj after result");
             console.log(currentObj);
               console.log("payment otp");
               setLoading(false);
               console.log("response.data.result");
               console.log(response.data.result);
               //confirmPayment(response.data.result.token);
               setOtpModalVisible(false);
               setVerifyAccountModalVisible(true);
              checkUser();
           })
           .catch(error => {
             setLoading(false);
             //setOtpModalVisible(false);

             console.error("Error sending data: ", error);
             console.error("Error sending data: ", error.response);
             console.error("Error sending data: ", error.response.data.errors.message);
             //console.log(JSON.parse(error.response));
             let msg="";
             (error.response.data.errors.message) ? msg += error.response.data.errors.message+"\n" : msg += "Ödeme hatası \n"; (error.response.data.errors.paymentError) ? msg += error.response.data.errors.paymentError+"\n" : msg += ""; Alert.alert(msg);
             showError(msg);
            
             //Alert.alert("Error sending data: ", error);
           });
}
const deleteCreditCard = (cardAlias) =>{
  console.log("deleteCreditCard");
  console.log(cardData);
    console.log(cardData.length);

  let ph = user.phone.replace('+', '');
  setDeleteData({
    cardAlias : cardAlias,
    accountKey: ph,
  });
  if(cardData.length < 2){
    //setLastCardDeleteModalVisible(true);
    setLastCardResetModalVisible(true);
  }else{
    setCardDeleteModalVisible(true);
  }
}
const confirmDeleteCard = () =>{

  let postData = JSON.stringify(deleteData);
  if(webview.current) webview.current.postMessage("delete;"+postData);
}
const confirmUnlinkAccount = () =>{
  console.log("confirmUnlinkAccount");
//   curl --location 'https://mp-test-backend.masterpassturkiye.com/account/api/Account/Unlink' \
// --header 'Authorization: Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJNZXJjaGFudElkIjoiMzQ3MTAyMTEwIiwiQWNjb3VudEtleSI6IjkwNTQ0NjU2NTQ2MCIsIklzTXNpc2RuVmFsaWRhdGVkIjoiRmFsc2UiLCJBdXRoZW50aWNhdGlvbk1ldGhvZCI6Ik5vdERlZmluZWQiLCJTZWN1cmUzZFR5cGUiOiJOb3REZWZpbmVkIiwiSXNPdHBWYWxpZGF0ZWQiOiJGYWxzZSIsIklzQ3VzdG9tIjoiRmFsc2UiLCJDdXJyZW5jeUNvZGUiOiJOT05FIiwiSGFzaCI6ImlwbDd2YWg5OWdSUlA3d1pxU3RUeG83T2t6akM2eG1wWGJ2dFZqOW1PSnpmZ2JiU3lrMWxzPSIsIlVzZXJJZCI6IllRaVZWai9ZWXRseGx3RWgweDhkSVE9PSIsImV4cCI6MTcxMDkzODk3NSwiaXNzIjoiaHR0cHM6Ly9tcC10ZXN0Lm1hc3RlcnBhc3N0dXJraXllLmNvbS9vYXV0aC9yZWFsbXMvbWVyY2hhbnQtYXBpLXJlYWxtIiwiYXVkIjoiTWVyY2hhbnRBdWRpZW5jZSJ9.I2ClXwYKX4Rhb2yG6b5nxPkq3PlQC7AbP0BUq29fOPB8xjf8behVbqKPzcoM1sQom8u9oC_QvPh_KMxHY7GBDg' \
// --header 'Content-Type: application/json' \
// --data '{
//     "merchantId": "34704277",
//     "accountKey":  "905388113551"
// }'
  
  let dataToSend = {
    "merchantId": "347102188",
    "accountKey": user.phone.replace('+', '')
  }
  let tk = user.token.replace('Bearer ', '');
  const config = {
    headers: { Authorization: `Bearer ${tk}` }
  };
  console.log(dataToSend);
  AsyncStorage.getItem('token').then(value =>{
      
    const config = {
      headers: { Authorization: `Bearer ${value}` }
    };
  //axios.post('https://mp-test-backend.masterpassturkiye.com/account/api/Account/Unlink',dataToSend, config)
  axios.post('https://api-app.payfour.com/api/payments/unlink',{}, config)
           .then(response => {
             console.log(response);
             console.log(response.data);             
               setLoading(false);
               console.log("response.data.result");
               console.log(response.data.result);
               //confirmPayment(response.data.result.token);
               setCardData([]);
               setCardDeleteModalVisible(false);
               //setVerifyAccountModalVisible(true);
               navigation.navigate('Discover');
           })
           .catch(error => {
             setLoading(false);
             //setOtpModalVisible(false);

             console.error("Error sending data: ", error);
             console.error("Error sending data: ", error.response);
             console.error("Error sending data: ", error.response.data.errors.message);
             //console.log(JSON.parse(error.response));
             let msg="";
             (error.response.data.errors.message) ? msg += error.response.data.errors.message+"\n" : msg += "Ödeme hatası \n"; (error.response.data.errors.paymentError) ? msg += error.response.data.errors.paymentError+"\n" : msg += ""; Alert.alert(msg);
             showError(msg);
            
             //Alert.alert("Error sending data: ", error);
           });
  });
}
const Item = ({id, cardAlias, maskedCardNumber, issuer, logo}) => (
  <View 
    key={id}
    style={{
      borderRadius:16,
      height:88,
      width:'100%',
      backgroundColor:'#fff',
      padding:16,
      paddingRight:24,
      marginBottom:16,
    }}>
    <View style={{
      width:'100%',
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
    }}>
      <TouchableOpacity 
      style={{flexDirection:'row',
      alignItems:'center',}}
      onPress={()=>{
          console.log(cardAlias);
          //sendPayment();
          navigation.navigate('Payment',{
            id: id,
            cardAlias: cardAlias,
            maskedCardNumber:maskedCardNumber,
            issuer:issuer,
            logo:logo
          });
        }
      }>
        <View style={{width:56, height:56, borderRadius:56,marginRight:16, alignItems:'center', justifyContent:'center'}}>
          <Image 
          source={logo}
          style={{
            width: '90%',
            height: '90%',
            resizeMode: 'contain',
          }}
        />
        </View>
        <View style={{marginBottom:8}}>
          <View style={{
            marginBottom:8,
          }}>
            <Text style={{fontSize:12, color:'#0B1929'}}>
              {cardAlias}
            </Text>
          </View>
          <View style={{
          }}>
            <Text style={{fontSize:12, color:'#909EAA'}}>
              {maskedCardNumber}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={{
        width: 24,
        height: 24,
      }}
      onPress={()=>{
        console.log(cardAlias);
        deleteCreditCard(cardAlias);
      }}
      >
        <Image 
        source={require('../../assets/img/export/trash.png')}
        style={{
          width: 24,
          height: 24,
          resizeMode: 'contain',
        }}
        />
      </TouchableOpacity>
    </View>
    </View>
);
const CarrefourItem = ({id, cardType, netBonus, logo}) => (
  <View 
    key={id}
    style={{
      borderRadius:16,
      width:'100%',
      backgroundColor:'#fff',
      padding:16,
      paddingRight:24,
      marginBottom:16,
    }}>
    <View style={{
      width:'100%',
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
    }}>
      <TouchableOpacity 
      disabled={true}
      style={{flexDirection:'row',
      alignItems:'center',}}
      onPress={()=>{
          console.log(id);
          
        }
      }>
        <View style={{width:56, height:56, borderRadius:56,marginRight:16, alignItems:'center', justifyContent:'center'}}>
          <Image 
          source={logo}
          style={{
            width: '90%',
            height: '90%',
            resizeMode: 'contain',
          }}
        />
        </View>
        <View style={{marginBottom:8}}>
          <View style={{
            marginBottom:2,
          }}>
            <Text style={{fontSize:14, color:'#0B1929'}}>
              {cardType}
            </Text>
          </View>
          <View style={{
            marginBottom:2,
          }}>
            <Text style={{fontSize:12, color:'#909EAA'}}>
              {id}
            </Text>
          </View>
          <View style={{
          }}>
            <Text style={{fontSize:12, color:'#004F97'}}>
              Toplam Puan : {netBonus}TL
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      {/* <TouchableOpacity style={{
        width: 32,
        height: 32,
      }}
      >
        <Image 
        source={require('../../assets/img/export/arrow_right_dark.png')}
        style={{
          width: 32,
          height: 32,
          resizeMode: 'contain',
          tintColor:'#004F97'
        }}
        />
      </TouchableOpacity> */}
    </View>
    </View>
);
const renderCarrefourCards = () => {
  if (carrefourCardData.length >0) {
    return (
      
      <FlatList
          data={carrefourCardData}
          ref={scrollRef2}
          renderItem={({item}) => (
            <CarrefourItem id={item.cardNumber} cardType={item.cardType} netBonus={item.netBonus} logo={item.logo}/>
          )}
          keyExtractor={item => item.cardNumber}
          style={{paddingLeft: 30,
            paddingRight: 30, marginLeft:-30, marginRight:-30}}
          initialNumToRender={20}
          
        />
    );
  } else {
    return (
      <View
        style={{
          padding: 18,
          height: 54,
          color: '#1D1D25',
        }}>
        <Text
          style={{
            fontSize: 14,
            color: '#0B1929',
            fontWeight: '700',
            paddingLeft: 0,
          }}>
          Kayıtlı kart bulunamadı.
        </Text>
      </View>
    );
  }
};
const renderCards = () => {
  if (cardData.length >0) {
    return (
      
      <FlatList
          data={cardData}
          ref={scrollRef}
          renderItem={({item}) => (
            <Item id={item.uniqueCardNumber} cardAlias={item.cardAlias} maskedCardNumber={item.maskedCardNumber} issuer={item.issuer} logo={item.logo}/>
          )}
          keyExtractor={item => item.uniqueCardNumber}
          style={{paddingLeft: 30,
            paddingRight: 30, marginLeft:-30, marginRight:-30}}
          initialNumToRender={20}
          
        />
    );
  } else {
    return (
      <View
        style={{
          padding: 18,
          height: 54,
          color: '#1D1D25',
        }}>
        <Text
          style={{
            fontSize: 14,
            color: '#0B1929',
            fontWeight: '700',
            paddingLeft: 0,
          }}>
          Kayıtlı kart bulunamadı.
        </Text>
      </View>
    );
  }
};
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <Modal
            animationType="slide"
            transparent={true}
            visible={otpModalVisible}
            onRequestClose={() => {
              setOtpModalVisible(!otpModalVisible);
            }}>
            <View
              style={{
                flex: 1,                
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                backgroundColor: 'rgba(92, 92, 92, 0.56)',
              }}>
              <View
                style={{
                  backgroundColor:'#fff',
                  borderTopLeftRadius: 24,
                  borderTopRightRadius: 24,
                  paddingTop: 16,
                  paddingBottom: 16,
                  paddingLeft: 16,
                  paddingRight: 16,
                  width: '100%',
                }}>
                  
                  <View style={{
                    paddingTop:24,
                    paddingBottom:24,
                    alignItems:'center',
                    justifyContent:'center',
                  }}>
                    <Image 
                        source={require('../../assets/img/export/masterpass_logo.png')}
                        style={{
                          width: 209,
                          height: 36,
                          resizeMode: 'contain',
                          marginBottom:24,
                        }}
                        />
                        <Text style={{
                          fontSize:14,
                          fontWeight:'700',
                          lineHeight:20,
                          color:'#0B1929',
                          marginBottom:8,
                        }}>
                          Masterpass'e kayıtlı kartlarınız var
                        </Text>
                        <Text style={{
                          fontSize:14,
                          lineHeight:20,
                          color:'#909EAA',
                          paddingLeft:24,
                          paddingRight:24,
                          textAlign:'center',
                        }}>
                          Kartlarınızı Payfour’da görüntüleyebilmek için bankanız tarafından gönderilen tek seferlik doğrulama kodunu giriniz.
                      </Text>
                  </View>
                  <View style={[regstyles.registerInputStyle, {borderColor: '#EBEBEB',}]}>            
                    <TextInput
                      style={{                      
                        fontSize: 14,
                        lineHeight:8, 
                        padding:0,
                        color: '#909EAA',
                      }}
                      onChangeText={Otp => setOtp(Otp)}
                      placeholder="Doğrulama Kodu" //12345
                      placeholderTextColor="#909EAA"
                      keyboardType="numeric"
                      onSubmitEditing={Keyboard.dismiss}
                      blurOnSubmit={false}
                      underlineColorAndroid="#f000"
                      returnKeyType="next"
                    />
                    
                  </View>
                  <Text style={{color:'#0B1929',  fontSize:14, lineHeight:24, textAlign:'center',marginBottom:24}}>Kalan Süre : {timerText}</Text>
                  
                  <View style={{flexDirection:'row'}}>
                  <TouchableOpacity
                  style={[
                    styles.buttonStyle,
                    {
                      width: '50%',
                      height: 52,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 2,
                      borderColor: '#fff',
                      backgroundColor: '#fff',
                      padding:0,
                    },
                  ]}
                  //onPress={() => otpMessage()}
                  onPress={() => postLinkingOtp(otp, otpToken)}>
                  <Text
                    style={{fontSize: 14, color: '#004F97'}}>
                    Tekrar Gönder
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.buttonStyle,
                    {
                      width: '50%',
                      height: 52,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 2,
                      borderColor: '#004F97',
                      backgroundColor: '#004F97',
                      padding:0,
                    },
                  ]}
                  //onPress={() => otpMessage()}
                  onPress={() => postLinkingOtp(otp, otpToken)}>
                  <Text
                    style={{fontSize: 14, color: '#ffffff'}}>
                    Doğrula
                  </Text>
                </TouchableOpacity>
               </View>
              </View>
            </View>
      </Modal>
      <Modal
          animationType="slide"
          transparent={true}
          visible={cardDeleteModalVisible}
          onRequestClose={() => {
            setCardDeleteModalVisible(!cardDeleteModalVisible);
          }}>
            <View
              style={{
                flex: 1,                
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                backgroundColor: 'rgba(92, 92, 92, 0.56)',
              }}>
          
      
      
      <View style={{
        borderTopLeftRadius:24,
        borderTopRightRadius:24,
        backgroundColor:'#fff',
        paddingTop:32,
        paddingBottom:32,
        paddingLeft:16,
        paddingRight:16,
        position:'absolute',
        bottom:0,
        width:'100%',
        alignItems:'center',
      }}>
        <Image 
          source={require('../../assets/img/export/masterpass_logo.png')}
          style={{
            width: 209,
            height: 36,
            resizeMode: 'contain',
            marginBottom:24,
          }}
          />
        
        <View>
        <Text style={{fontSize:16, color:'#004F97', textAlign:'center', fontWeight:'500', marginBottom:48}}>
        {deleteData.cardAlias} kartınızı Masterpass altyapısından silmek istediğinize emin misiniz?
        </Text>        
        </View>
        <View style={{flexDirection:'row'}}>
          <TouchableOpacity
          // style={{                    
          //   backgroundColor:'#004F97',
          //   alignItems:'center',
          //   justifyContent:'center',
          //   borderRadius:8,
          //   width:'100%',
          //   height:52, 
          // marginBottom: 24}}
            style={[regstyles.buttonStyle, {padding:0, alignItems:'center', justifyContent:'center', height:52,marginLeft:0,marginRight:10, marginBottom: 0, backgroundColor: '#004F97', flex:1}]}              
            activeOpacity={0.5}
            onPress={()=>{
              setCardDeleteModalVisible(false);
              //navigation.navigate('ListCards');
              console.log("send delete");
              confirmDeleteCard();
              }}>
            <Text style={{color:'#fff', fontSize:14}}>Evet</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[regstyles.buttonStyle, {padding:0, alignItems:'center', justifyContent:'center', height:52,marginLeft:0,marginRight:0, marginBottom: 0, borderWidth:1, borderColor:'#004F97',backgroundColor: '#fff', flex:1}]}              
            activeOpacity={0.5}
            onPress={()=>{
              console.log("close success");
              setCardDeleteModalVisible(false);
              }}>
            <Text style={{fontSize:14,color: '#004F97'}}>Hayır</Text>
          </TouchableOpacity>
        </View>
      </View>
      </View>
      </Modal>
      <Modal
          animationType="slide"
          transparent={true}
          visible={lastCardResetModalVisible}
          onRequestClose={() => {
            setLastCardResetModalVisible(!lastCardResetModalVisible);
          }}>
            <View
              style={{
                flex: 1,                
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                backgroundColor: 'rgba(92, 92, 92, 0.56)',
              }}>
          
      
      
      <View style={{
        borderTopLeftRadius:24,
        borderTopRightRadius:24,
        backgroundColor:'#fff',
        paddingTop:32,
        paddingBottom:32,
        paddingLeft:16,
        paddingRight:16,
        position:'absolute',
        bottom:0,
        width:'100%',
        alignItems:'center',
      }}>
        <Image 
          source={require('../../assets/img/export/masterpass_logo.png')}
          style={{
            width: 209,
            height: 36,
            resizeMode: 'contain',
            marginBottom:24,
          }}
          />
        
        <View>
        <Text style={{fontSize:16, color:'#004F97', textAlign:'center', fontWeight:'500', marginBottom:48}}>
        Son kartınızı sildiğinizde Masterpass'teki tüm bağlantılarınız sıfırlanacaktır. Bunun yerine Payfour ile olan bağlantınızı kaldırmak ister misiniz?
        </Text>        
        </View>
        <View style={{flexDirection:'row'}}>
          <TouchableOpacity
          // style={{                    
          //   backgroundColor:'#004F97',
          //   alignItems:'center',
          //   justifyContent:'center',
          //   borderRadius:8,
          //   width:'100%',
          //   height:52, 
          // marginBottom: 24}}
            style={[regstyles.buttonStyle, {padding:0, alignItems:'center', justifyContent:'center', height:52,marginLeft:0,marginRight:10, marginBottom: 0, backgroundColor: '#004F97', flex:1}]}              
            activeOpacity={0.5}
            onPress={()=>{
              setLastCardResetModalVisible(false);
              //navigation.navigate('ListCards');
              console.log("send delete");
              confirmUnlinkAccount();
              }}>
            <Text style={{color:'#fff', fontSize:14}}>Evet</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[regstyles.buttonStyle, {padding:0, alignItems:'center', justifyContent:'center', height:52,marginLeft:0,marginRight:0, marginBottom: 0, borderWidth:1, borderColor:'#004F97',backgroundColor: '#fff', flex:1}]}              
            activeOpacity={0.5}
            onPress={()=>{
              console.log("close success");
              setLastCardResetModalVisible(false);
              setLastCardDeleteModalVisible(true);
              }}>
            <Text style={{fontSize:14,color: '#004F97'}}>Hayır</Text>
          </TouchableOpacity>
        </View>
      </View>
      </View>
      </Modal>
      <Modal
          animationType="slide"
          transparent={true}
          visible={lastCardDeleteModalVisible}
          onRequestClose={() => {
            setLastCardDeleteModalVisible(!lastCardDeleteModalVisible);
          }}>
            <View
              style={{
                flex: 1,                
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                backgroundColor: 'rgba(92, 92, 92, 0.56)',
              }}>
          
      
      
      <View style={{
        borderTopLeftRadius:24,
        borderTopRightRadius:24,
        backgroundColor:'#fff',
        paddingTop:32,
        paddingBottom:32,
        paddingLeft:16,
        paddingRight:16,
        position:'absolute',
        bottom:0,
        width:'100%',
        alignItems:'center',

      }}>
        <Image 
          source={require('../../assets/img/export/masterpass_logo.png')}
          style={{
            width: 209,
            height: 36,
            resizeMode: 'contain',
            marginBottom:24,
          }}
          />
        
        <View>
        <Text style={{fontSize:16, color:'#004F97', textAlign:'center', fontWeight:'500', marginBottom:48}}>
        Son kartınızın silinmesi ile birlikte Masterpass hesabınız da silinecektir. Onaylıyor musunuz?
        </Text>        
        </View>
        <View style={{flexDirection:'row'}}>
          <TouchableOpacity
          // style={{                    
          //   backgroundColor:'#004F97',
          //   alignItems:'center',
          //   justifyContent:'center',
          //   borderRadius:8,
          //   width:'100%',
          //   height:52, 
          // marginBottom: 24}}
            style={[regstyles.buttonStyle, {padding:0, alignItems:'center', justifyContent:'center', height:52,marginLeft:0,marginRight:10, marginBottom: 0, backgroundColor: '#004F97', flex:1}]}              
            activeOpacity={0.5}
            onPress={()=>{
              setLastCardDeleteModalVisible(false);
              //navigation.navigate('ListCards');
              console.log("send delete");
              confirmDeleteCard();
              }}>
            <Text style={{color:'#fff', fontSize:14}}>Evet</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[regstyles.buttonStyle, {padding:0, alignItems:'center', justifyContent:'center', height:52,marginLeft:0,marginRight:0, marginBottom: 0, borderWidth:1, borderColor:'#004F97',backgroundColor: '#fff', flex:1}]}              
            activeOpacity={0.5}
            onPress={()=>{
              console.log("close success");
              setLastCardDeleteModalVisible(false);
              }}>
            <Text style={{fontSize:14,color: '#004F97'}}>Hayır</Text>
          </TouchableOpacity>
        </View>
      </View>
      </View>
      </Modal>
      <Modal
          animationType="slide"
          transparent={true}
          visible={resetMasterPassModalVisible}
          onRequestClose={() => {
            setResetMasterPassModalVisible(!resetMasterPassModalVisible);
          }}>                     
            
          <View
            style={{
              flex: 1,                
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              backgroundColor: 'rgba(0, 79, 151, 0.6)',
            }}>
            <View
              style={{
                backgroundColor:'#fff',
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24,
                paddingTop: 32,
                paddingBottom: 16,
                paddingLeft: 16,
                paddingRight: 16,
                width: '100%',
              }}>
                
                <View style={{
                    marginBottom:24,
                    }}>
                      <Text style={{
                        fontSize:16,
                        fontWeight:'700',
                        color:'#004F97',
                        marginBottom:16,
                        textAlign:'center',
                      }}>
                        Masterpass hesabınızı <Text style={{textDecorationLine:'underline'}}>linkten</Text> sıfırlayabilirsiniz.
                      </Text>
                                    
                </View>
                
              <TouchableOpacity
                  style={[
                    styles.buttonStyle,
                    {
                      width: '100%',
                      height: 52,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 2,
                      borderColor: '#004F97',
                      backgroundColor: '#004F97',
                      padding:0,
                    },
                  ]}
                  onPress={() => setResetMasterPassModalVisible(false)}>
                  <Text
                    style={{fontSize: 14, color: '#fff'}}>
                    Tamam
                  </Text>
                </TouchableOpacity>                  
              
            </View>
          </View>
    </Modal>
    <Modal
          animationType="slide"
          transparent={true}
          visible={verifyAccountModalVisible}
          onRequestClose={() => {
            setVerifyAccountModalVisible(!verifyAccountModalVisible);
          }}>
            <View
              style={{
                flex: 1,                
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                backgroundColor: 'rgba(92, 92, 92, 0.56)',
              }}>
          
      
      
      <View style={{
        borderTopLeftRadius:24,
        borderTopRightRadius:24,
        backgroundColor:'#fff',
        paddingTop:32,
        paddingBottom:32,
        paddingLeft:16,
        paddingRight:16,
        position:'absolute',
        bottom:0,
        width:'100%',
        alignItems:'center',

      }}>
        <Image 
          source={require('../../assets/img/export/masterpass_logo.png')}
          style={{
            width: 209,
            height: 36,
            resizeMode: 'contain',
            marginBottom:24,
          }}
          />
        <View style={{alignItems:'center', marginBottom:16}}>
          <Image
              source={require('../../assets/img/export/success_checkmark.png')}
              style={{
                width: 80,
                height: 80,
                resizeMode:'contain',
              }}
          />
        </View>
        <View>
        <Text style={{fontSize:16, color:'#004F97', textAlign:'center', fontWeight:'500', marginBottom:16}}>
          Hesabınız başarılı bir şekilde doğrulandı
        </Text>
        <Text style={{fontSize:14, color:'#909EAA', textAlign:'center', marginBottom:48}}>
        Kayıtlı kartlarınızla güvenli bir şekilde ödeme yapabilirsiniz.
        </Text>        
        </View>
        <TouchableOpacity
          style={[regstyles.buttonStyle, {padding:0, marginLeft:0,marginRight:0, width:'100%', marginBottom: 10, backgroundColor: '#004F97', flex:1}]}              
          activeOpacity={0.5}
          onPress={()=>{
            console.log("close success");
            setVerifyAccountModalVisible(false);
            navigation.navigate('ListCards');
            }}>
          <Text style={regstyles.buttonTextStyle}>Kapat</Text>
        </TouchableOpacity>
      </View>
      </View>
      </Modal>
      <Loader loading={loading} />
      {
        route.params && route.params.prev ? 
        <SubtabHeader routetarget="Profile" name="Kartlarım" count="0" />
        :
        <SubtabHeader routetarget="Discover" name="Kartlarım" count="0" />      
      }
      <View style={{padding:16, backgroundColor: '#EAEAEA'}}>
        <View style={{borderRadius:16}}>
            
            <View style={{
              padding:8,
              borderTopLeftRadius:8,
              borderTopRightRadius:8,
              backgroundColor:'#F2F4F6',
              flexDirection:'row',
              justifyContent:'space-between',
              width:'100%'
            }}>
              <TouchableOpacity 
              style={{
                alignItems:'center', 
                justifyContent:'center',
                borderRadius:8,
                height:46,
                width:(Dimensions.get('window').width -64) / 2,
                backgroundColor: cardType==='carrefour'? '#fff' : '#F2F4F6',
              }}
              onPress={()=>{
                //setTransactionType('all');
                setCardListType('carrefour');
                setCardType('carrefour');
              }
              }
              >
                <Text style={{
                  fontSize:12,
                  color: cardType==='carrefour'? '#004F97':'#909EAA',
                }}
                >
                  CarrefourSA Kartlarım
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
              style={{
                alignItems:'center', 
                justifyContent:'center',
                borderRadius:8,
                height:46,
                width:(Dimensions.get('window').width -64) / 2,
                backgroundColor: cardType==='bank'? '#fff' : '#F2F4F6',
              }}
              onPress={()=>{
                setCardListType('bank');
                setCardType('bank');
              }}
              >
                <Text style={{
                  fontSize:12,
                  color: cardType==='bank'? '#004F97':'#909EAA',
                }}
                >
                  Banka / Kredi Kartlarım
                </Text>
              </TouchableOpacity>           

            </View>
          <View style={{ 
            width:1,
            height:1,
            backgroundColor:'#ff0000'
          }}>
          <WebView 
          source={{ uri: iframeUrl }} 
          //source={require("../../message.html")}
          ref={webview}
          onMessage={(event)=>{
            console.log("onMessage");
            console.log(event);
            let message  = event.nativeEvent.data;
            onMessage(event);
                      
        }}
          style={{ 
            flex:1,
            backgroundColor:'#00ff00',
            display: iframeUrl == '' ? 'none' : 'flex',
          }} 
          />
          <TouchableOpacity style={{width:1, height:1, backgroundColor:'#ababab'}}
          onPress={() => {
            console.log("press test");
            testMessage();
          }}>
            
          </TouchableOpacity>
        </View>
        </View>
      </View>
      <View style={{
        paddingTop:12,
        paddingBottom:100,
        paddingLeft:16,
        paddingRight:16,
        flex:1,
        width:'100%',
        backgroundColor: '#EAEAEA'
      }}
      >
      <ScrollView 
      //style={{cardListType == "bank"? }}
      >
        <View style={{display:cardListType == 'carrefour'? 'flex' : 'none'}}>
        {renderCarrefourCards()} 
        </View>
        <View style={{display:cardListType == 'bank'? 'flex' : 'none'}}>
          {/* <Text style={{color:'#004F97', fontSize:14, marginBottom:8, fontWeight:'500'}}>
            Kredi Kartlarım
          </Text> */}
          {renderCards()} 
          <View style={{
            alignItems:'center'
        }}>
          <Image 
            source={require('../../assets/img/export/masterpass_logo.png')}
            style={{
              width: 102,
              height: 24,
              resizeMode: 'contain',
              marginBottom:8,
            }}
            />
          <Text style={{color:'#0B1929', fontSize:12, textAlign:'center'}}>
          Kart bilgileriniz Mastercard’ın dijital ödeme altyapısı olan <Text style={{color:'#004F97'}}> </Text>
          <Text style={{color:'#004F97', fontWeight:500, textDecorationLine:'underline'}}
          onPress={()=>Linking.openURL('https://www.mastercard.com.tr/tr-tr.html')}>Masterpass</Text>’te güvenle saklanmaktadır.
          </Text>
          <View style={{paddingTop:40, paddingBottom:40,width:'100%'}}>
          <TouchableOpacity style={{width:'100%', height:64, padding:16, borderRadius:12, backgroundColor:'#fff',
            flexDirection:'row', alignItems:'center', justifyContent:'space-between'
          }}
            onPress={() => {            
              navigation.navigate('AddCards')
            }}>
              <Text style={{fontSize:14, color:'#004F97'}}>
              Banka / Kredi Kartı Ekle
              </Text>
              <Image 
            source={require('../../assets/img/export/add_iban.png')}
            style={{
              width: 24,
              height: 24,
              resizeMode: 'contain',
            }}
            />
            </TouchableOpacity>
          </View>
          
          </View>
        </View>
      </ScrollView>
      </View>
      
    </SafeAreaView>
  );
};

const AddCards = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [cardSuccessModalVisible, setCardSuccessModalVisible] = useState(false);
  const [cardAlreadyAddedModalVisible, setCardAlreadyAddedModalVisible] = useState(false);
  const [validName, setValidName] = useState(true);
  const [validNumber, setValidNumber] = useState(true);
  const [validCvc, setValidCvc] = useState(true);
  const [validDate, setValidDate] = useState(true);
  const [validNick, setValidNick] = useState(true);
  
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardDate, setCardDate] = useState('');
  const [cardCVC, setCardCVC] = useState('');
  const [cardNick, setCardNick] = useState('');
  
  const addwebview = useRef();
  const [phone, setPhone] = useState('');
  const [mpToken, setMptoken] = useState('');
  const [mpSave, setMpSave] = useState(false);
  const [iframeUrl, setIframeUrl] = useState('');
  const [payfourId, setPayfourId] = useState('');
  const [user, setUser] = useState({token:'', phone:'', payfourId:''});
  const scrollRef = useRef();

  const [otp, setOtp] = useState(false);
  const [stopOtpTimer, setStopOtpTimer] = useState(false);
  const [timerCount, setTimerCount] = useState(180);
  const [timerText, setTimerText] = useState('03:00');
  const [resetTimer, setResetTimer] = useState(false);
  const [resetMasterPassModalVisible, setResetMasterPassModalVisible] = useState(false);

  const rulesModalizeRef = useRef(null);
  
  useEffect(() => {   
    const unsubscribe = navigation.addListener('focus', () => { 

      //webview.current.postMessage("Hello from RN");

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
              //checkUser();
              /*AsyncStorage.setItem('biometricsKey', publicKey).then(()=>{
                  navigation.navigate('TabNavigationRoutes');
              });*/
            }else{
              setLoading(false);
              console.log("masterpass token error")
              console.log(response);
              //Alert.alert(response.data.data.errors.message);
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

  const resetOtpTimer = ()=>{
    setResetTimer(false);
    setTimerCount(180);
    startOtpTimer();
    console.log("resetotp");
    
  }
  const startOtpTimer = ()=>{
    if(!stopOtpTimer){
      let interval = setInterval(() => {
        setTimerCount(lastTimerCount => {
            //console.log(lastTimerCount);
            let tt;
            let m = Math.floor(lastTimerCount / 60);
            let mt = "0"+m;
            let r = lastTimerCount - (m*60);
            let s = r < 10 ? "0"+r : r;
            tt = mt+":"+s;
            //console.log(tt);
            setTimerText(tt);
            if (lastTimerCount == 0) {
                //your redirection to Quit screen
                clearInterval(interval);
                setTimerText("00:00");
                setResetTimer(true);
            } else {
                return lastTimerCount - 1
            }
        })
      }, 1000) //each count lasts for a second
      //cleanup the interval on complete
      return () => clearInterval(interval);
    }
  }
  const addCard = ()=>{
    let err = false;
    if(cardName.length < 5){setValidName(false); err = true;}
    if(!checkValidCard(cardNumber)) err = true;
    if(cardDate.length <4){setValidDate(false); err = true;}
    if(!checkValidCVC(cardCVC)) err = true;
    if(!mpSave) err = true;
    if(cardNick.length < 3){setValidNick(false); err = true;}

    if(err) return;

    if(user)
    console.log("addCard");
    AsyncStorage.getItem('token').then(value =>{
        
      const config = {
        headers: { Authorization: `Bearer ${value}` }
      };
    console.log(mpToken);
  //'https://api-app.payfour.com/api/payments/addcard'
  //webview.current.postMessage("check;check");
  
  let tk = user.token.replace('Bearer ', '');
    let ph = user.phone.replace('+', '');
    
    
  // let dataToSend = {
  //   "merchantId": "347102188",
  //   "requestReferenceNumber":Math.floor(Math.random() * (999999 - 111111 + 1) + 111111),
  //   "accountKey":ph,
  //   "accountKeyType":"Msisdn",
  //   "cardNumber": encrypted,
  //   "expiryDate": "2508",
  //   "cvc":encryptedcvc,
  //   "accountAliasName": "bonus",
  //   "cardHolderName": "Salih Kağan Çam",
  //   "merchantUserId": user.payfourId,
  //     "sourceChannel": "Web"
  // }
  
  let dt = cardDate.split('/');
  let dataToSend ={
    "token": tk,
    "referenceNumber": Math.floor(Math.random() * (999999 - 111111 + 1) + 111111),
    "cardNumber": cardNumber,
    "cardHolderName": cardName,
    "expire": dt[1]+dt[0],
    "cvv": cardCVC,
    "accountAliasName": cardNick
  }
  console.log(dataToSend);
  axios.post('https://api-app.payfour.com/api/payments/addcard',dataToSend, config)
            .then(response => {
              console.log(response);
              console.log(response.data);
              if(response.data.success){
                //navigation.navigate('Success');
                //setSuccessModalVisible(true);
                console.log("addcard url");
                console.log(response.data.data.url);
                setIframeUrl(response.data.data.url);
                setLoading(false);
                //addcardMessage();
                //checkMasterpass();
                //setTimeout(function(){addcardMessage();}, 3000);
                //if(currentObj.type="addCard") setTimeout(function(){sendPayment();}, 5000);
              }else{
                setLoading(false);
                console.log("masterpass token error")
                console.log(response);
                //Alert.alert(response.data.data.errors.message);
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
          
          });
  
          /*{"data": 
          {"url": 
          "https://api-app.payfour.com/masterpass/addcard/2bf6a86d-93f2-4335-a182-4dac75d35f28"}, 
          "status": 200, 
          "success": true
          }*/
  }
  
  const addcardMessage =() =>{
    console.log("addcardMessage");
    console.log(addwebview);
    console.log(addwebview.current);
    if(addwebview.current) addwebview.current.postMessage("addCard;check");
  }
  const onMessage = (message) => {
    console.log("onmessage");
    console.log(message);
    console.group("currentObj");
    //console.log(currentObj);
  
    /*if(currentObj.type != null){
      switch(currentObj.type){
        case "payment":
          console.log("confirmPayment");
          confirmPayment();
          break;
      }
    }else */
    if(message.nativeEvent.data == "202") {
      //sendVerify();
      //otpMessage();
      setModalVisible(true);
      resetOtpTimer();
    }else if(message.nativeEvent.data == "200" ) {
      setModalVisible(false);
      resetOtpTimer();
      //navigation.navigate('ListCards');
      setCardSuccessModalVisible(true);
    }else if (message.nativeEvent.data == "400"){
      setModalVisible(false);
      resetOtpTimer();
      //navigation.navigate('ListCards');
      setCardAlreadyAddedModalVisible(true);
    }else if(message.nativeEvent.data == "404") {
      //Alert.alert("Hata:", "404")
      setResetMasterPassModalVisible(true);
    }
  }
  
  const checkValidCard = (ccNumb) => {
    var valid = "0123456789"  // Valid digits in a credit card number
    var len = ccNumb.length;  // The length of the submitted cc number
    var iCCN = parseInt(ccNumb);  // integer of ccNumb
    var sCCN = ccNumb.toString();  // string of ccNumb
    sCCN = sCCN.replace (/^\s+|\s+$/g,'');  // strip spaces
    var iTotal = 0;  // integer total set at zero
    var bNum = true;  // by default assume it is a number
    var bResult = false;  // by default assume it is NOT a valid cc
    var temp;  // temp variable for parsing string
    var calc;  // used for calculation of each digit
    
    // Determine if the ccNumb is in fact all numbers
    for (var j=0; j<len; j++) {
      temp = "" + sCCN.substring(j, j+1);
      if (valid.indexOf(temp) == "-1"){bNum = false;}
    }
    
    // if it is NOT a number, you can either alert to the fact, or just pass a failure
    if(!bNum){
      /*alert("Not a Number");*/bResult = false;
    }
    
    // Determine if it is the proper length 
    if((len == 0)&&(bResult)){  // nothing, field is blank AND passed above # check
      bResult = false;
    } else{  // ccNumb is a number and the proper length - let's see if it is a valid card number
      if(len >= 15){  // 15 or 16 for Amex or V/MC
        for(var i=len;i>0;i--){  // LOOP throught the digits of the card
          calc = parseInt(iCCN) % 10;  // right most digit
          calc = parseInt(calc);  // assure it is an integer
          iTotal += calc;  // running total of the card number as we loop - Do Nothing to first digit
          i--;  // decrement the count - move to the next digit in the card
          iCCN = iCCN / 10;                               // subtracts right most digit from ccNumb
          calc = parseInt(iCCN) % 10 ;    // NEXT right most digit
          calc = calc *2;                                 // multiply the digit by two
          // Instead of some screwy method of converting 16 to a string and then parsing 1 and 6 and then adding them to make 7,
          // I use a simple switch statement to change the value of calc2 to 7 if 16 is the multiple.
          switch(calc){
            case 10: calc = 1; break;       //5*2=10 & 1+0 = 1
            case 12: calc = 3; break;       //6*2=12 & 1+2 = 3
            case 14: calc = 5; break;       //7*2=14 & 1+4 = 5
            case 16: calc = 7; break;       //8*2=16 & 1+6 = 7
            case 18: calc = 9; break;       //9*2=18 & 1+8 = 9
            default: calc = calc;           //4*2= 8 &   8 = 8  -same for all lower numbers
          }                                               
        iCCN = iCCN / 10;  // subtracts right most digit from ccNum
        iTotal += calc;  // running total of the card number as we loop
      }  // END OF LOOP
      if ((iTotal%10)==0){  // check to see if the sum Mod 10 is zero
        bResult = true;  // This IS (or could be) a valid credit card number.
      } else {
        bResult = false;  // This could NOT be a valid credit card number
        }
      }
    console.log(ccNumb+" valid card "+ bResult);
    //return bResult;
    setValidNumber(bResult);
    console.log(validNumber);
    return bResult;
  };
};
const checkValidCVC = (cvc) =>{
  let bResult = true;
  cvc.length < 3? bResult = false : bResult=true;
  setValidCvc(bResult);
    console.log(validCvc);
    return bResult;
}
  const otpMessage = () =>{
    console.log("otpMessage");
    if(addwebview.current) addwebview.current.postMessage("otp;123456");
  }
  return(
    <SafeAreaView style={{flex: 1, backgroundColor: '#efeff3'}}>
      <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View
              style={{
                flex: 1,                
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                backgroundColor: 'rgba(92, 92, 92, 0.56)',
              }}>
              <View
                style={{
                  backgroundColor:'#fff',
                  borderTopLeftRadius: 24,
                  borderTopRightRadius: 24,
                  paddingTop: 16,
                  paddingBottom: 16,
                  paddingLeft: 16,
                  paddingRight: 16,
                  width: '100%',
                }}>
                  
                  <View style={{
                    paddingTop:24,
                    paddingBottom:24,
                    alignItems:'center',
                    justifyContent:'center',
                  }}>
                    <Image 
                        source={require('../../assets/img/export/masterpass_logo.png')}
                        style={{
                          width: 209,
                          height: 36,
                          resizeMode: 'contain',
                          marginBottom:24,
                        }}
                        />
                        <Text style={{
                          fontSize:14,
                          fontWeight:'700',
                          lineHeight:20,
                          color:'#0B1929',
                          marginBottom:8,
                        }}>
                          Kart Doğrulama
                        </Text>
                        <Text style={{
                          fontSize:14,
                          lineHeight:20,
                          color:'#909EAA',
                          paddingLeft:24,
                          paddingRight:24,
                          textAlign:'center',
                        }}>
                          Banka tarafından kart sahibine gönderilen tek seferlik doğrulama kodunu giriniz.
                      </Text>
                  </View>
                  <View style={[regstyles.registerInputStyle, {borderColor: '#EBEBEB',}]}>            
                    <TextInput
                      style={{                      
                        fontSize: 14,
                        lineHeight:8, 
                        padding:0,
                        color: '#909EAA',
                      }}
                      onChangeText={Otp => setOtp(Otp)}
                      placeholder="Doğrulama Kodu" //12345
                      placeholderTextColor="#909EAA"
                      keyboardType="numeric"
                      onSubmitEditing={Keyboard.dismiss}
                      blurOnSubmit={false}
                      underlineColorAndroid="#f000"
                      returnKeyType="next"
                    />
                    
                  </View>
                  <Text style={{color:'#0B1929',  fontSize:14, lineHeight:28, textAlign:'center',marginBottom:24}}>Kalan Süre : {timerText}</Text>
                  
                  <View style={{flexDirection:'row'}}>
                  <TouchableOpacity
                  style={[
                    styles.buttonStyle,
                    {
                      width: '50%',
                      height: 52,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 2,
                      borderColor: '#fff',
                      backgroundColor: '#fff',
                      padding:0,
                    },
                  ]}
                  onPress={() => otpMessage()}>
                  <Text
                    style={{fontSize: 14, color: '#004F97'}}>
                    Tekrar Gönder
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.buttonStyle,
                    {
                      width: '50%',
                      height: 52,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 2,
                      borderColor: '#004F97',
                      backgroundColor: '#004F97',
                      padding:0,
                    },
                  ]}
                  onPress={() => otpMessage()}>
                  <Text
                    style={{fontSize: 14, color: '#ffffff'}}>
                    Doğrula
                  </Text>
                </TouchableOpacity>
               </View>
              </View>
            </View>
      </Modal>
      <Modal
          animationType="slide"
          transparent={true}
          visible={cardSuccessModalVisible}
          onRequestClose={() => {
            setCardSuccessModalVisible(!cardSuccessModalVisible);
          }}>
            <View
              style={{
                flex: 1,                
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                backgroundColor: 'rgba(92, 92, 92, 0.56)',
              }}>
          
      
      
      <View style={{
        borderTopLeftRadius:24,
        borderTopRightRadius:24,
        backgroundColor:'#fff',
        paddingTop:32,
        paddingBottom:32,
        paddingLeft:16,
        paddingRight:16,
        position:'absolute',
        bottom:0,
        width:'100%',
        alignItems:'center',

      }}>
        <Image 
          source={require('../../assets/img/export/masterpass_logo.png')}
          style={{
            width: 209,
            height: 36,
            resizeMode: 'contain',
            marginBottom:24,
          }}
          />
        <View style={{alignItems:'center', marginBottom:16}}>
          <Image
              source={require('../../assets/img/export/success_checkmark.png')}
              style={{
                width: 80,
                height: 80,
                resizeMode:'contain',
              }}
          />
        </View>
        <View>
        <Text style={{fontSize:16, color:'#004F97', textAlign:'center', fontWeight:'500', marginBottom:48}}>
        Kartınız başarılı bir şekilde eklendi!
        </Text>        
        </View>
        <TouchableOpacity
          style={[regstyles.buttonStyle, {padding:0, marginLeft:0,marginRight:0, marginBottom: 10, backgroundColor: '#004F97', flex:1}]}              
          activeOpacity={0.5}
          onPress={()=>{
            console.log("close success");
            setCardSuccessModalVisible(false);
            navigation.navigate('ListCards');
            }}>
          <Text style={regstyles.buttonTextStyle}>Kapat</Text>
        </TouchableOpacity>
      </View>
      </View>
      </Modal>
      <Modal
          animationType="slide"
          transparent={true}
          visible={cardAlreadyAddedModalVisible}
          onRequestClose={() => {
            setCardAlreadyAddedModalVisible(!cardAlreadyAddedModalVisible);
          }}>
            <View
              style={{
                flex: 1,                
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                backgroundColor: 'rgba(92, 92, 92, 0.56)',
              }}>
          
      
      
      <View style={{
        borderTopLeftRadius:24,
        borderTopRightRadius:24,
        backgroundColor:'#fff',
        paddingTop:32,
        paddingBottom:32,
        paddingLeft:16,
        paddingRight:16,
        position:'absolute',
        bottom:0,
        width:'100%',
        alignItems:'center',

      }}>
        <Image 
          source={require('../../assets/img/export/masterpass_logo.png')}
          style={{
            width: 209,
            height: 36,
            resizeMode: 'contain',
            marginBottom:24,
          }}
          />
        <View style={{alignItems:'center', marginBottom:16}}>
          <Image
              source={require('../../assets/img/export/success_checkmark.png')}
              style={{
                width: 80,
                height: 80,
                resizeMode:'contain',
              }}
          />
        </View>
        <View>
        <Text style={{fontSize:16, color:'#004F97', textAlign:'center', fontWeight:'500', marginBottom:48}}>
        Kartınız zaten ekli, seçerek devam edebilirsiniz.
        </Text>        
        </View>
        <TouchableOpacity
          style={[regstyles.buttonStyle, {padding:0, marginLeft:0,marginRight:0, marginBottom: 10, backgroundColor: '#004F97', flex:1}]}              
          activeOpacity={0.5}
          onPress={()=>{
            console.log("close success");
            setCardAlreadyAddedModalVisible(false);
            navigation.navigate('ListCards');
            }}>
          <Text style={regstyles.buttonTextStyle}>Kapat</Text>
        </TouchableOpacity>
      </View>
      </View>
      </Modal>
      <Modal
          animationType="slide"
          transparent={true}
          visible={resetMasterPassModalVisible}
          onRequestClose={() => {
            setResetMasterPassModalVisible(!resetMasterPassModalVisible);
          }}>                     
            
          <View
            style={{
              flex: 1,                
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              backgroundColor: 'rgba(0, 79, 151, 0.6)',
            }}>
            <View
              style={{
                backgroundColor:'#fff',
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24,
                paddingTop: 32,
                paddingBottom: 16,
                paddingLeft: 16,
                paddingRight: 16,
                width: '100%',
              }}>
                
                <View style={{
                    marginBottom:24,
                    }}>
                      <Text style={{
                        fontSize:16,
                        fontWeight:'700',
                        color:'#004F97',
                        marginBottom:16,
                        textAlign:'center',
                      }}>
                        Masterpass hesabınızı <Text style={{textDecorationLine:'underline'}}>linkten</Text> sıfırlayabilirsiniz.
                      </Text>
                                    
                </View>
                
              <TouchableOpacity
                  style={[
                    styles.buttonStyle,
                    {
                      width: '100%',
                      height: 52,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 2,
                      borderColor: '#004F97',
                      backgroundColor: '#004F97',
                      padding:0,
                    },
                  ]}
                  onPress={() => setResetMasterPassModalVisible(false)}>
                  <Text
                    style={{fontSize: 14, color: '#fff'}}>
                    Tamam
                  </Text>
                </TouchableOpacity>                  
              
            </View>
          </View>
    </Modal>

      <Modalize ref={rulesModalizeRef}
      snapPoint={0}
      modalStyle={{backgroundColor:(0,0,0,0)}}>
        <View
              style={{
                flex: 1,                
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                width:Dimensions.get('window').width
              }}>
              <View
                style={{
                  backgroundColor:'#fff',
                  borderTopLeftRadius: 24,
                  borderTopRightRadius: 24,
                  paddingTop: 33,
                  paddingLeft: 16,
                  paddingRight: 16,
                  width:'100%',
                  
                }}>
                  
                  <View style={{
                      flexDirection:'row',
                      justifyContent:'space-between',
                      }}>
                        <Text style={{
                          fontSize:14,
                          fontWeight:'700',
                          color:'#0B1929',
                          lineHeight:20,
                          textAlign:'left',
                          marginBottom:24,
                        }}>
                          Kullanım Koşulları
                        </Text>
                        <TouchableOpacity 
                      style={{
                        width:24,
                        height:24,
                      }}
                      onPress={() => {
                        console.log('close');
                        rulesModalizeRef.current?.close();}}>                  
                        <Image 
                        source={require('../../assets/img/export/close.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          tintColor:'#0B1929'
                        }}
                      />
                    </TouchableOpacity>
                       </View> 
                      <View style={{marginBottom:24}}>
                        <Text style={{
                          fontSize:12,
                          color:'#909EAA',
                          marginBottom:8,
                        }}>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Libero justo laoreet sit amet cursus sit amet dictum. Vitae sapien pellentesque habitant morbi. Ac odio tempor orci dapibus ultrices. 

Enim ut tellus elementum sagittis vitae. 
In massa tempor nec feugiat nisl pretium fusce id velit. 
Tristique sollicitudin nibh sit amet commodo nulla facilisi nullam. 
Netus et malesuada fames ac turpis egestas sed tempus urna. Turpis massa tincidunt dui ut.
Fermentum posuere urna nec tincidunt praesent semper feugiat.

Purus viverra accumsan in nisl nisi scelerisque eu ultrices vitae. Nisl suscipit adipiscing bibendum est. Tempus imperdiet nulla malesuada pellentesque elit. Fringilla urna porttitor rhoncus dolor purus. Nec feugiat nisl pretium fusce id. Egestas pretium aenean pharetra magna ac. Arcu ac tortor dignissim convallis aenean. Nisi quis eleifend quam adipiscing vitae proin. Urna cursus eget nunc scelerisque viverra mauris in aliquam sem. Enim eu turpis egestas pretium. Nunc mattis enim ut tellus. Orci ac auctor augue mauris augue neque. Consequat interdum varius sit amet mattis vulputate. At urna condimentum mattis pellentesque id nibh tortor. Mattis pellentesque id nibh tortor id aliquet. Cras sed felis eget velit aliquet.
                        </Text>
                        <Text style={{
                          fontSize:12,
                          color:'#909EAA',
                          marginBottom:8,
                        }}>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Libero justo laoreet sit amet cursus sit amet dictum. Vitae sapien pellentesque habitant morbi. Ac odio tempor orci dapibus ultrices. 

Enim ut tellus elementum sagittis vitae. 
In massa tempor nec feugiat nisl pretium fusce id velit. 
Tristique sollicitudin nibh sit amet commodo nulla facilisi nullam. 
Netus et malesuada fames ac turpis egestas sed tempus urna. Turpis massa tincidunt dui ut.
Fermentum posuere urna nec tincidunt praesent semper feugiat.

Purus viverra accumsan in nisl nisi scelerisque eu ultrices vitae. Nisl suscipit adipiscing bibendum est. Tempus imperdiet nulla malesuada pellentesque elit. Fringilla urna porttitor rhoncus dolor purus. Nec feugiat nisl pretium fusce id. Egestas pretium aenean pharetra magna ac. Arcu ac tortor dignissim convallis aenean. Nisi quis eleifend quam adipiscing vitae proin. Urna cursus eget nunc scelerisque viverra mauris in aliquam sem. Enim eu turpis egestas pretium. Nunc mattis enim ut tellus. Orci ac auctor augue mauris augue neque. Consequat interdum varius sit amet mattis vulputate. At urna condimentum mattis pellentesque id nibh tortor. Mattis pellentesque id nibh tortor id aliquet. Cras sed felis eget velit aliquet.
                        </Text>
                        <Text style={{
                          fontSize:12,
                          color:'#909EAA',
                          marginBottom:8,
                        }}>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Libero justo laoreet sit amet cursus sit amet dictum. Vitae sapien pellentesque habitant morbi. Ac odio tempor orci dapibus ultrices. 

Enim ut tellus elementum sagittis vitae. 
In massa tempor nec feugiat nisl pretium fusce id velit. 
Tristique sollicitudin nibh sit amet commodo nulla facilisi nullam. 
Netus et malesuada fames ac turpis egestas sed tempus urna. Turpis massa tincidunt dui ut.
Fermentum posuere urna nec tincidunt praesent semper feugiat.

Purus viverra accumsan in nisl nisi scelerisque eu ultrices vitae. Nisl suscipit adipiscing bibendum est. Tempus imperdiet nulla malesuada pellentesque elit. Fringilla urna porttitor rhoncus dolor purus. Nec feugiat nisl pretium fusce id. Egestas pretium aenean pharetra magna ac. Arcu ac tortor dignissim convallis aenean. Nisi quis eleifend quam adipiscing vitae proin. Urna cursus eget nunc scelerisque viverra mauris in aliquam sem. Enim eu turpis egestas pretium. Nunc mattis enim ut tellus. Orci ac auctor augue mauris augue neque. Consequat interdum varius sit amet mattis vulputate. At urna condimentum mattis pellentesque id nibh tortor. Mattis pellentesque id nibh tortor id aliquet. Cras sed felis eget velit aliquet.
                        </Text>
                       
               
                      </View>
                  </View>
                  
              <View style={{
                  backgroundColor:'#fff',
                  paddingTop:24,
                  paddingBottom:80,
                  paddingLeft:16,
                  paddingRight:16,
                  width:'100%',
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 15,
                  },
                  shadowOpacity: 1,
                  shadowRadius: 30,                  
                  elevation: 18,
                }}>
                <TouchableOpacity
                  style={[
                    styles.buttonStyle,
                    {
                      width: '100%',
                      height: 52,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 2,
                      borderColor: '#004F97',
                      backgroundColor: '#004F97',
                      padding:0,
                      elevation:1,
                    },
                  ]}
                  onPress={() => rulesModalizeRef.current?.close()}>
                  <Text
                    style={{fontSize: 14, color: '#ffffff'}}>
                    Kapat
                  </Text>
                </TouchableOpacity>
               </View>
               
            </View>
      </Modalize>
    <Loader loading={loading} />
    <SubtabHeader routetarget="ListCards" name="Banka / Kredi Kartı ile Yükle" count="0" />
    {/* <ScrollView 
keyboardShouldPersistTaps="handled"
style={[registerStyles.scrollView]}>
<KeyboardAvoidingView enabled  behavior="padding" style={{ flex: 1, minHeight:Dimensions.get('window').height }}> */}
  <ScrollView keyboardShouldPersistTaps="handled" style={[styles.scrollView, {paddingBottom:32}]}>
        <KeyboardAvoidingView enabled>
    <View style={{paddingTop: 16,
      paddingBottom: 116,
      paddingLeft: 16, 
      paddingRight: 16,}}>
          <View
              style={{
                backgroundColor:'#fff',
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24,
                borderBottomLeftRadius: 24,
                borderBottomRightRadius: 24,
                paddingTop: 16,
                paddingBottom: 16,
                paddingLeft: 16,
                paddingRight: 16,
                width: '100%',
              }}>
                  
                  <View style={{
                  }}>
                    
                        <Text style={{
                          fontSize:16,
                          fontWeight:'700',
                          lineHeight:20,
                          color:'#004F97',
                          marginBottom:12,
                          paddingLeft:16,
                          textAlign:'left'
                        }}>
                          Kart Bilgileri
                        </Text>
                        
                  </View>
                  <View style={[regstyles.registerInputStyle, {borderColor: validName ? '#EBEBEB': '#ff0000',paddingBottom:0}]}>                     
                    <Text style={{                                           
                        fontSize: 12,
                        lineHeight:14, 
                        padding:0,
                        color: '#909EAA', 
                        position:'absolute',
                        top:12,                     
                        left:16,
                        pointerEvents:"none",
                        //fontFamily:'UbuntuRegular'
                    }}>
                      Kart Üzerindeki İsim
                    </Text>
                    <TextInput
                    style={{                      
                      fontSize: 14,
                      lineHeight:18, 
                      
                      color: '#0B1929',
                    }}
                    //style={{fontFamily:'UbuntuRegular'}}
                        value={cardName}
                        //onChangeText={UserName => setCardName(UserName)}
                        onChangeText={UserName => {
                          let isValid = /^[A-Za-zğüşöçİĞÜŞÖÇ ]*$/.test(UserName);
                          console.log(UserName);
                          console.log(isValid);
                          if(isValid)setCardName(UserName);
                          (UserName.length > 4)?setValidName(true) : setValidName(false);
                        }}
                        placeholder="Ad Soyad" //12345
                        placeholderTextColor="#909EAA"
                        keyboardType="default"
                        onSubmitEditing={Keyboard.dismiss}
                        blurOnSubmit={false}
                        underlineColorAndroid="#f000"
                        returnKeyType="next"
                      />
                  </View>
                  <View style={[regstyles.registerInputStyle, {borderColor: validNumber ? '#EBEBEB': '#ff0000',paddingBottom:0,}]}>  
                    <Text style={{                                           
                          fontSize: 12,
                          lineHeight:12, 
                          padding:0,
                          color: '#909EAA', 
                          position:'absolute',
                          top:14,                     
                          left:16,
                          pointerEvents:"none",
                      }}>
                        Kart Numarası
                      </Text>          
                    <TextInput 
                    style={{                      
                      fontSize: 14,
                      lineHeight:18, 
                      
                      color: '#0B1929',
                    }}
                      value={cardNumber}                     
                      onChangeText={CardNumber =>{
                        let cn = CardNumber.replace(/[^0-9]/g, '');
                        setCardNumber(cn);
                        //checkValidCard(cn);
                      }}
                      onBlur={()=>{
                        checkValidCard(cardNumber);
                      }}
                      maxLength={16}
                      placeholder="Kart No." //12345
                      placeholderTextColor="#909EAA"
                      keyboardType="numeric"
                      onSubmitEditing={Keyboard.dismiss}
                      blurOnSubmit={false}
                      underlineColorAndroid="#f000"
                      returnKeyType="next"
                    />
                  </View>
                  <View style={{
                    flexDirection:'row',
                    justifyContent:'space-between'
                  }}>
                    <View style={[regstyles.registerInputStyle, {borderColor: validDate ? '#EBEBEB': '#ff0000',width:'48%'}]}> 
                    <MaskInput
                        style={{                      
                          fontSize: 14,
                        lineHeight:14, 
                          padding:0,
                          color: '#0B1929',
                        }}
                        value={cardDate}
                        keyboardType="numeric"
                        placeholder="AA/YY"
                        placeholderTextColor="#909EAA"
                        onChangeText={(masked, unmasked) => {
                          //setUserPhone(masked); // you can use the unmasked value as well
                          setCardDate(masked);
                          (unmasked.length > 3)?setValidDate(true) : setValidDate(false);
                          // assuming you typed "9" all the way:
                          console.log(masked); // (99) 99999-9999
                          console.log(unmasked); // 99999999999
                          //checkPhone();
                        }}
                        mask={[/\d/, /\d/,'/', /\d/, /\d/]}
                      />           
                      {/* <TextInput
                        style={{                      
                          fontSize: 14,
                          lineHeight:8, 
                          padding:0,
                          color: '#909EAA',
                        }}
                        onChangeText={CardDate => {
                          setCardDate(CardDate);
                        }}
                        placeholder="AA/YY" //12345
                        placeholderTextColor="#909EAA"
                        keyboardType="default"
                        onSubmitEditing={Keyboard.dismiss}
                        blurOnSubmit={false}
                        underlineColorAndroid="#f000"
                        returnKeyType="next"
                      /> */}
                    </View>
                    
                    <View style={[regstyles.registerInputStyle, {borderColor: validCvc ? '#EBEBEB': '#ff0000',width:'48%'}]}>            
                      <TextInput
                        style={{                      
                          fontSize: 14,
                          lineHeight:18, 
                          padding:0,
                          color: '#0B1929',
                        }}
                        value={cardCVC}
                        maxLength={3}
                        onChangeText={CardCVC => {
                          let cn = CardCVC.replace(/[^0-9]/g, '');
                          setCardCVC(cn);
                          checkValidCVC(cn);
                        }}
                        placeholder="CVV" //12345
                        placeholderTextColor="#909EAA"
                        keyboardType="numeric"
                        onSubmitEditing={Keyboard.dismiss}
                        blurOnSubmit={false}
                        underlineColorAndroid="#f000"
                        returnKeyType="next"
                      />
                    </View>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center", paddingVertical: 15 }}>
                  <View>
                    {/* <Checkbox checked={mpSave} onChange={v => this.setMpSave(v)} /> */}
                    <Pressable
                    style={{
                    width:20,
                    height:20,
                    marginRight:8,
                    backgroundColor:mpSave ? '#015096':'#dadee7',
                    borderRadius:5,
                    alignItems:'center',
                    justifyContent:'center'
                    }}
                    onPress={()=>setMpSave(!mpSave)}>
                      <Image
                      source={require('../../assets/img/export/check.png')}
                      style={{
                      width: mpSave ? 14 : 0,
                      height: mpSave ? 10 : 0,
                      resizeMode: 'contain',
                      }}
                      />
                  </Pressable>
                  </View>
                  <View style={{ flex: 1, flexDirection: "row", alignItems: "center", marginLeft: 8 }}>
                    <Text style={{fontSize:12,color:'#0B1929',}}>
                      <Text style={{ color:'#004F97', fontWeight:'700', textDecorationLine: "underline" }}
                            //onPress={() => rulesModalizeRef.current?.open()}
                            onPress={() => Linking.openURL('https://www.masterpassturkiye.com/terms-and-conditions')}
                            >
                        Kullanım Koşulları'nı
                      </Text> okudum, kartımı Masterpass’e kaydetmek istiyorum.
                    </Text>
                  </View>

                </View>
                  <View style={[regstyles.registerInputStyle, {borderColor: validNick ? '#EBEBEB': '#ff0000',}]}>            
                    <TextInput
                      style={{                      
                        fontSize: 14,
                        lineHeight:18, 
                        padding:0,
                        color: '#0B1929',
                      }}
                      value={cardNick}
                      onChangeText={CardNick => {
                        (CardNick.length > 2)?setValidNick(true) : setValidNick(false);
                        setCardNick(CardNick);
                      }}
                      placeholder="Karta İsim Verin ( kişisel, iş vb.)" //12345
                      placeholderTextColor="#909EAA"
                      keyboardType="default"
                      onSubmitEditing={Keyboard.dismiss}
                      blurOnSubmit={false}
                      underlineColorAndroid="#f000"
                      returnKeyType="next"
                    />
                  </View>
                  <View style={{
            alignItems:'center',
            marginBottom:36,
        }}>
          <Image 
            source={require('../../assets/img/export/masterpass_logo.png')}
            style={{
              width: 102,
              height: 24,
              resizeMode: 'contain',
              marginBottom:8,
            }}
            />
          <Text style={{color:'#0B1929', fontSize:12, textAlign:'center'}}>
          Kart bilgileriniz Mastercard’ın dijital ödeme altyapısı olan <Text style={{color:'#004F97'}}> </Text>
          <Text style={{color:'#004F97', fontWeight:500, textDecorationLine:'underline'}}
          onPress={()=>Linking.openURL('https://www.mastercard.com.tr/tr-tr.html')}>Masterpass</Text>’te güvenle saklanmaktadır.
          </Text>
          
          
          </View>
                <TouchableOpacity
                  style={[
                    styles.buttonStyle,
                    {
                      width: '100%',
                      height: 52,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 2,
                      borderColor: '#004F97',
                      backgroundColor: '#004F97',
                      padding:0,
                    },
                  ]}
                  onPress={() => {
                    if(validName&&validNumber&&validDate&&validCvc&&validNick)
                    addCard();
                    }}>
                  <Text
                    style={{fontSize: 14, color: '#ffffff'}}>
                    Kart Ekle
                  </Text>
                </TouchableOpacity>
               <View style={{ 
            width:1,
            height:1,
            backgroundColor:'#ff0000'
          }}>
          <WebView 
          source={{ uri: iframeUrl }} 
          //source={require("../../message.html")}
          ref={addwebview}
          onLoadEnd={(syntheticEvent) => {
            // update component to be aware of loading status
            //const { nativeEvent } = syntheticEvent;
            //this.isLoading = nativeEvent.loading;
            addcardMessage();
          }}
          onMessage={(event)=>{
            console.log("onMessage");
            console.log(event);
            let message  = event.nativeEvent.data;
            onMessage(event);
                      
        }}
          style={{ 
            flex:1,
            backgroundColor:'#00ff00',
            display: iframeUrl == '' ? 'none' : 'flex',
          }} 
          />
          
        </View>
              </View>
              </View>
              </KeyboardAvoidingView>
              </ScrollView>
              </SafeAreaView>
  )
}
const Payment = ({route, navigation}) => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardDate, setCardDate] = useState('');
  const [cardCVC, setCardCVC] = useState('');
  const [cardNick, setCardNick] = useState('');
  const [amount, setAmount] = useState('');
  const payWebview = useRef();
  const [phone, setPhone] = useState('');
  const [mpToken, setMptoken] = useState('');
  const [iframeUrl, setIframeUrl] = useState('');
  const [payfourId, setPayfourId] = useState('');
  const [url3d, setUrl3d] = useState('');
  const [user, setUser] = useState({token:'', phone:'', payfourId:''});
  const scrollRef = useRef();
  const [cardData, setCardData] = React.useState([]);
  const [cardType, setCardType] = React.useState('bank');
  const [currentObj, setCurrentObj] = useState({"type":"", "data":{}});
  const [otp, setOtp] = useState("");
  const [otpToken, setOtpToken] = useState("");
  const [stopOtpTimer, setStopOtpTimer] = useState(false);
  const [timerCount, setTimerCount] = useState(180);
  const [timerText, setTimerText] = useState('03:00');
  const [resetTimer, setResetTimer] = useState(false);
const { showError } = useError();
  const { id, cardAlias, maskedCardNumber, issuer, logo } = route.params;
  useEffect(() => {   
    console.log(route.params);
    const unsubscribe = navigation.addListener('focus', () => { 

      //webview.current.postMessage("Hello from RN");

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
              //checkUser();
              /*AsyncStorage.setItem('biometricsKey', publicKey).then(()=>{
                  navigation.navigate('TabNavigationRoutes');
                  
              });*/
              addCard();
            }else{
              setLoading(false);
              console.log("masterpass token error")
              console.log(response);
              //Alert.alert(response.data.data.errors.message);
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
  
  const addCard = ()=>{
    console.log("addCard");
    AsyncStorage.getItem('token').then(value =>{
        
      const config = {
        headers: { Authorization: `Bearer ${value}` }
      };
    console.log(mpToken);
  //'https://api-app.payfour.com/api/payments/addcard'
  //webview.current.postMessage("check;check");
  
  let tk = user.token.replace('Bearer ', '');
    let ph = user.phone.replace('+', '');
    
    
  // let dataToSend = {
  //   "merchantId": "347102188",
  //   "requestReferenceNumber":Math.floor(Math.random() * (999999 - 111111 + 1) + 111111),
  //   "accountKey":ph,
  //   "accountKeyType":"Msisdn",
  //   "cardNumber": encrypted,
  //   "expiryDate": "2508",
  //   "cvc":encryptedcvc,
  //   "accountAliasName": "bonus",
  //   "cardHolderName": "Salih Kağan Çam",
  //   "merchantUserId": user.payfourId,
  //     "sourceChannel": "Web"
  // }
  console.log(dataToSend);
  let dataToSend ={
    "token": tk,
    "referenceNumber": Math.floor(Math.random() * (999999 - 111111 + 1) + 111111),
    "cardNumber": "4870742041362027",
    "cardHolderName": "Salih Kağan Çam",
    "expire": "2508",
    "cvv": "262",
    "accountAliasName": "bonusgold"
  }
  axios.post('https://api-app.payfour.com/api/payments/addcard',dataToSend, config)
            .then(response => {
              console.log(response);
              console.log(response.data);
              if(response.data.success){
                //navigation.navigate('Success');
                //setSuccessModalVisible(true);
                console.log("addcard url");
                console.log(response.data.data.url);
                setIframeUrl(response.data.data.url);
                setLoading(false);
                //checkMasterpass();
                //setTimeout(function(){testPayment();}, 5000);
                //if(currentObj.type="addCard") setTimeout(function(){sendPayment();}, 5000);
              }else{
                setLoading(false);
                console.log("masterpass token error")
                console.log(response);
                //Alert.alert(response.data.data.errors.message);
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
          
          });
  
          /*{"data": 
          {"url": 
          "https://api-app.payfour.com/masterpass/addcard/2bf6a86d-93f2-4335-a182-4dac75d35f28"}, 
          "status": 200, 
          "success": true
          }*/
  }

  const resetOtpTimer = ()=>{
    setResetTimer(false);
    setTimerCount(180);
    startOtpTimer();
    console.log("resetotp");
    
  }
  const startOtpTimer = ()=>{
    if(!stopOtpTimer){
      let interval = setInterval(() => {
        setTimerCount(lastTimerCount => {
            //console.log(lastTimerCount);
            let tt;
            let m = Math.floor(lastTimerCount / 60);
            let mt = "0"+m;
            let r = lastTimerCount - (m*60);
            let s = r < 10 ? "0"+r : r;
            tt = mt+":"+s;
            //console.log(tt);
            setTimerText(tt);
            if (lastTimerCount == 0) {
                //your redirection to Quit screen
                clearInterval(interval);
                setTimerText("00:00");
                setResetTimer(true);
            } else {
                return lastTimerCount - 1
            }
        })
      }, 1000) //each count lasts for a second
      //cleanup the interval on complete
      return () => clearInterval(interval);
    }
  }
  const sendPayment = () =>{
    //let tk = user.token.replace('Bearer ', '');
    if(amount < 50){
      //Alert.alert("minimum");
      showError('Lütfen 50 TL ve üzeri bir tutar yükleyiniz.');
    }else{
    let am = amount+"00";
    let dataToSend = {      
      "isDirectPayment": false,
      "amount": am     
    }
    AsyncStorage.getItem('token').then(value =>{
        
      const config = {
        headers: { Authorization: `Bearer ${value}` }
      };
    
    console.log(config);
    setLoading(true);
    axios.post('https://api-app.payfour.com/api/payments/generatemasterpassorder',dataToSend, config)
            .then(response => {
              console.log(response);
              console.log(response.data);
              /*{"data": {
              "orderId": "53e73d23-ec6f-488d-85a8-07476bc2095e", 
              "returnUrl": "https://api-app.payfour.com/masterpass/completepayment"}, 
              "status": 200, 
              "success": true}*/
              sendPaymentToMasterPass(response.data.data.orderId, response.data.data.returnUrl);
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
      });   
    }
  }
  const sendPaymentToMasterPass = (orderId, returnUrl) =>{
    let tk = user.token.replace('Bearer ', '');
    let ph = user.phone.replace('+', '');
  
    let refNo = Math.floor(Math.random() * (999999 - 111111 + 1) + 111111)
    let orderNo = Math.floor(Math.random() * (999999 - 111111 + 1) + 111111)
    
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>");
    let am = amount+"00";
    console.log(amount);
    console.log(am);
    console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<");

    let dataToSend = {
      "MerchantId": "347102188",
      "RequestReferenceNo":refNo,
      "AccountKey":ph,
      "Amount": am,
      "terminalGroupId": "102188638556903343042785",
      "AuthenticationMethod":"otp",
      "CardAlias": cardAlias,
      "SourceChannel": "Android",
      "CurrencyCode": "TRY",
      "OrderNo": orderId,
    }
    console.log(dataToSend);
    /*console.log("currentObj before send");
    console.log(currentObj);*/
    
    console.log("currentobj after orderid");
    //console.log(currentObj);
    /*setCurrentObj({
      type:'payment',
      data:dataToSend
    });*/
    currentObj.type = 'payment';
    currentObj.data = dataToSend;
    currentObj.data.orderId = orderId;
    console.log(currentObj);
    console.log(">>>>>>>>>>>>>>>");
    console.log("SendPayment : "+'https://mp-test-sdk.masterpassturkiye.com/payment/api/Payment/request')
    const config = {
      headers: { Authorization: `Bearer ${tk}` }
    };
    setLoading(true);
    axios.post('https://mp-test-sdk.masterpassturkiye.com/payment/api/Payment/request',dataToSend, config)
            .then(response => {
              console.log(response);
              console.log(response.data);
              /* {"buildId": "554", 
              "correlationId": "3f74723e-f396-426a-a117-b8ac0dbb5db7", 
              "exception": null, 
              "message": "Accepted", 
              "requestId": null, 
              "result": {
              "description": "Telefonunuza gelen tek kullanımlık şifreyi girerek kart doğrulama işlemini tamamlayınız", 
              "maskedNumber": "************2021", 
              "responseCode": "5001", 
              "retrievalReferenceNumber": "200004357017", 
              "terminalGroupId": null, 
              "token": "bd82f9ecdce44377b8a8555db39572c5", 
              "url3d": null, 
              "url3dFail": null, 
              "url3dSuccess": null}, 
              "statusCode": 202, 
              "version": null}*/
              console.log("currentObj after result");
              console.log(currentObj);
              let d = currentObj;
              d.type="payment";
              d.data.token = response.data.result.token;
              d.data.cardNumber = response.data.result.maskedNumber;
              //d.data.orderId = orderNo;
              d.data.amount = amount;
              setCurrentObj(d);
              /*setCurrentObj({
                type:'payment',
                data:response.data.result
              });*/
              console.log("response.data.result.responseCode");
            console.log(response.data.result.responseCode);
              console.log("currentObj");
              console.log(currentObj);
              setLoading(false);
              if(response.data.result.responseCode == "5001" || response.data.result.responseCode == "5010"){
                
                if(response.data.result.responseCode == "5001"){
                console.log("payment otp");
                
                //confirmPayment();
                //setTimeout(potpMessage, 2000);
                //setTimeout(function(){potpMessage(response.data.result.token);},3000);
                console.log("response.data.result");
                console.log(response.data.result);
                setOtpToken(response.data.result.token);
                setModalVisible(true);
                startOtpTimer();
                //postPaymentOtp("123456",response.data.result.token);
                //setTimeout(sendOtp, 2000);
              }else if(response.data.result.responseCode == "5010"){
                //Alert.alert("5010 - 3ds onayı gerekli");
                console.log(returnUrl);
                console.log(response.data.result.url3d+"&returnUrl="+returnUrl);
                setUrl3d(response.data.result.url3d+"&returnUrl="+returnUrl);
                //checkOrderCompletion(currentObj.data.orderId);
               }
  
              }else{
                console.log("payment error somewhere");
                setLoading(false);
              }
              //otpMessage();
              /*if(response.data.success){
                //navigation.navigate('Success');
                //setSuccessModalVisible(true);
                console.log("Payment");
                setLoading(false);
              }else{
                setLoading(false);
                console.log("Payment error")
                console.log(response);
                //Alert.alert(response.data.data.errors.message);
              }*/
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
  const checkOrderCompletion = (orderId)=>{
    setTimeout(function(){
      AsyncStorage.getItem('token').then(value =>{
        
        const config = {
          headers: { Authorization: `Bearer ${value}` }
        };
      
      //setLoading(true);
      axios.get('https://api-app.payfour.com/api/payments/getmasterpassorder/'+orderId, config)
      .then(response => {
        console.log(response);
        console.log(response.data);
        if(!response.data.data(isCompleted))checkOrderCompletion(orderId);
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
    },3000)
    });
  }
  const postPaymentOtp = (otp, ptoken)=>{
    console.log("postpaymentotp");
    console.log(otp);
    console.log(ptoken);

    //'https://mp-test-sdk.masterpassturkiye.com/user-authorization/api/Payment/verify'
    let tk = user.token.replace('Bearer ', '');
    let dataToSend = {
      "otpCode": "123456",
      "token": ptoken
    }
    console.log("currentObj before send");
    console.log(currentObj);
    setCurrentObj({
      type:'payment',
      data:dataToSend
    });
    setLoading(true);
    console.log(dataToSend);
    console.log(">>>>>>>>>>>>>>>");
    console.log("postPaymentOtp : "+'https://mp-test-sdk.masterpassturkiye.com/user-authorization/api/Payment/verify')
    const config = {
      headers: { Authorization: `Bearer ${tk}` }
    };
    axios.post('https://mp-test-sdk.masterpassturkiye.com/user-authorization/api/Payment/verify',dataToSend, config)
            .then(response => {
              console.log(response);
              console.log(response.data);
              console.log("currentObj after result");
              console.log(currentObj);
              //if(response.data.result.responseCode == "5001"){
                console.log("payment otp");
                setLoading(false);
                console.log("response.data.result");
                console.log(response.data.result);
                confirmPayment(response.data.result.token);
                setModalVisible(false);
                //confirmPayment();
                //setTimeout(potpMessage, 2000);
                //setTimeout(function(){potpMessage(response.data.result.token);},3000);
                //setTimeout(sendOtp, 2000);
  
              /*}else{
                console.log("payment error somewhere");
                setLoading(false);
              }*/
            })
            .catch(error => {
              setLoading(false);
              setModalVisible(false);

              console.error("Error sending data: ", error);
              console.error("Error sending data: ", error.response);
              console.error("Error sending data: ", error.response.data.errors.message);
              //console.log(JSON.parse(error.response));
              let msg="";
              (error.response.data.errors.message) ? msg += error.response.data.errors.message+"\n" : msg += "Ödeme hatası \n"; (error.response.data.errors.paymentError) ? msg += error.response.data.errors.paymentError+"\n" : msg += ""; Alert.alert(msg);
        
              
              //Alert.alert("Error sending data: ", error);
            });
  }
  const confirmPayment = (ptoken) =>{
    AsyncStorage.getItem('token').then(value =>{
        
      const config = {
        headers: { Authorization: `Bearer ${value}` }
      };
      // let dataToSend ={
      //   "token": tk,
      //   "referenceNumber": Math.floor(Math.random() * (999999 - 111111 + 1) + 111111),
      //   "cardNumber": "5440782041362021",
      //   "cardHolderName": "Salih Kağan Çam",
      //   "expire": "2507",
      //   "cvv": "889",
      //   "accountAliasName": "sanal"
      // }
      let am = currentObj.data.amount+"00";
      let dataToSend ={
        "masterpassUserToken":user.token.replace('Bearer ', ''),
        "paymentToken": ptoken,
        "orderId": currentObj.data.orderId,
        "cardNumber": currentObj.data.cardNumber,
        "amount": am,
        "isDirectPayment": false
      }
      console.log(dataToSend);
  
  /* {"buildId": "554", 
              "correlationId": "3f74723e-f396-426a-a117-b8ac0dbb5db7", 
              "exception": null, 
              "message": "Accepted", 
              "requestId": null, 
              "result": {
              "description": "Telefonunuza gelen tek kullanımlık şifreyi girerek kart doğrulama işlemini tamamlayınız", 
              "maskedNumber": "************2021", 
              "responseCode": "5001", 
              "retrievalReferenceNumber": "200004357017", 
              "terminalGroupId": null, 
              "token": "bd82f9ecdce44377b8a8555db39572c5", 
              "url3d": null, 
              "url3dFail": null, 
              "url3dSuccess": null}, 
              "statusCode": 202, 
              "version": null}*/
  
      axios.post('https://api-app.payfour.com/api/payments/addbudgetwithcreditcard',dataToSend, config)
                .then(response => {
                  console.log(response);
                  console.log(response.data);
                  //if(response.data.success){
                    //navigation.navigate('Success');
                    //setSuccessModalVisible(true);
                    //console.log("addcard url");
                    /*console.log(response.data.data.url);
                    setIframeUrl(response.data.data.url);*/
                    setLoading(false);
                    //checkMasterpass();
                    /*AsyncStorage.setItem('biometricsKey', publicKey).then(()=>{
                        navigation.navigate('TabNavigationRoutes');
                    });*/
                    //setTimeout(function(){testPayment();}, 5000);
                    //setTimeout(function(){sendPayment();}, 5000);
                    //setTimeout(otpMessage, 2000);
                  //}else{
                    setLoading(false);
                    //console.log("masterpass token error");
                    console.log(response);
                    setSuccessModalVisible(true);
                    //Alert.alert(response.data.data.errors.message);
                  //}
                })
                .catch(error => {
                  setLoading(false);
                  console.error("Error sending data: ", error);
                  console.error("Error sending data: ", error.response);
                  console.error("Error sending data: ", error.response.data.errors.message);
                  //console.log(JSON.parse(error.response));
                  let msg="";
                  (error.response.data.errors.message) ? msg += error.response.data.errors.message+"\n" : msg += "Ödeme hatası \n"; (error.response.data.errors.paymentError) ? msg += error.response.data.errors.paymentError+"\n" : msg += ""; Alert.alert(msg);
            
              
                });
              
              });
  
  }
  
  const addcardMessage =() =>{
    console.log("addcardMessage");
    console.log(payWebview);
    console.log(payWebview.current);
    if(payWebview.current) payWebview.current.postMessage("addCard;check");
  }
  const onMessage = (message) => {
    console.log("onmessage");
    console.log(message);
    //console.group("currentObj");
    //console.log(currentObj);
  
    /*if(currentObj.type != null){
      switch(currentObj.type){
        case "payment":
          console.log("confirmPayment");
          confirmPayment();
          break;
      }
    }else */
    if(message.nativeEvent.data == "202") {
      //sendVerify();
      //otpMessage();
      setModalVisible(true);
      resetOtpTimer();
    }
  }
  const on3dMessage = (message) => {
    console.log("on3dmessage");
    console.log(message);    
    console.log(message.nativeEvent.data);  
    console.log(message.nativeEvent.data.isSuccess);  
    let res = JSON.parse(message.nativeEvent.data);
    console.log("res");
    console.log(res);
    console.log(res.isSuccess);
    console.log(res.errorMessage);
    if(res.isSuccess == true){
      console.log("3d success");
      setUrl3d("");
      setSuccessModalVisible(true);
    }else{
      console.log("3d fail");
      setUrl3d("");
      Alert.alert(res.errorMessage);
    }
    
  }
  const potpMessage = (token) =>{
    console.log("potpMessage");
    console.log(token);
    let m = "potp;"+token+";123456";
    if(payWebview.current) payWebview.current.postMessage(m);
  }
  // const tlMask = createNumberMask({
  //   prefix: [''],
  //   delimiter: '.',
  //   separator: ',',
  //   precision: 2,
  // })
  const tlMask = createNumberMask({
    prefix: [''],
    delimiter: '.',
    separator: '',
    precision: 0,
  })
  return(
    <SafeAreaView style={{flex: 1, backgroundColor: '#efeff3'}}>
      <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View
              style={{
                flex: 1,                
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                backgroundColor: 'rgba(92, 92, 92, 0.56)',
              }}>
              <View
                style={{
                  backgroundColor:'#fff',
                  borderTopLeftRadius: 24,
                  borderTopRightRadius: 24,
                  paddingTop: 16,
                  paddingBottom: 16,
                  paddingLeft: 16,
                  paddingRight: 16,
                  width: '100%',
                }}>
                  
                  <View style={{
                    paddingTop:24,
                    paddingBottom:24,
                    alignItems:'center',
                    justifyContent:'center',
                  }}>
                    <Image 
                        source={require('../../assets/img/export/masterpass_logo.png')}
                        style={{
                          width: 209,
                          height: 36,
                          resizeMode: 'contain',
                          marginBottom:24,
                        }}
                        />
                        <Text style={{
                          fontSize:14,
                          fontWeight:'700',
                          lineHeight:20,
                          color:'#0B1929',
                          marginBottom:8,
                        }}>
                          Kart Doğrulama
                        </Text>
                        <Text style={{
                          fontSize:14,
                          lineHeight:20,
                          color:'#909EAA',
                          paddingLeft:24,
                          paddingRight:24,
                          textAlign:'center',
                        }}>
                          Banka tarafından kart sahibine gönderilen tek seferlik doğrulama kodunu giriniz.
                      </Text>
                  </View>
                  <View style={[regstyles.registerInputStyle, {borderColor: '#EBEBEB',}]}>            
                    <TextInput
                      style={{                      
                        fontSize: 14,
                        lineHeight:8, 
                        padding:0,
                        color: '#909EAA',
                      }}
                      onChangeText={Otp => setOtp(Otp)}
                      placeholder="Doğrulama Kodu" //12345
                      placeholderTextColor="#909EAA"
                      keyboardType="numeric"
                      onSubmitEditing={Keyboard.dismiss}
                      blurOnSubmit={false}
                      underlineColorAndroid="#f000"
                      returnKeyType="next"
                    />
                    
                  </View>
                  <Text style={{color:'#0B1929',  fontSize:14, lineHeight:24, textAlign:'center',marginBottom:24}}>Kalan Süre : {timerText}</Text>
                  
                  <View style={{flexDirection:'row'}}>
                  <TouchableOpacity
                  style={[
                    styles.buttonStyle,
                    {
                      width: '50%',
                      height: 52,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 2,
                      borderColor: '#fff',
                      backgroundColor: '#fff',
                      padding:0,
                    },
                  ]}
                  //onPress={() => otpMessage()}
                  onPress={() => postPaymentOtp(otp, otpToken)}>
                  <Text
                    style={{fontSize: 14, color: '#004F97'}}>
                    Tekrar Gönder
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.buttonStyle,
                    {
                      width: '50%',
                      height: 52,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 2,
                      borderColor: '#004F97',
                      backgroundColor: '#004F97',
                      padding:0,
                    },
                  ]}
                  //onPress={() => otpMessage()}
                  onPress={() => postPaymentOtp(otp, otpToken)}>
                  <Text
                    style={{fontSize: 14, color: '#ffffff'}}>
                    Doğrula
                  </Text>
                </TouchableOpacity>
               </View>
              </View>
            </View>
      </Modal>
      <Modal
          animationType="slide"
          transparent={true}
          visible={successModalVisible}
          onRequestClose={() => {
            setSuccessModalVisible(!successModalVisible);
          }}>
            <View
              style={{
                flex: 1,                
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                backgroundColor: 'rgba(92, 92, 92, 0.56)',
              }}>
          
      
      
      <View style={{
        borderTopLeftRadius:24,
        borderTopRightRadius:24,
        backgroundColor:'#fff',
        paddingTop:32,
        paddingBottom:32,
        paddingLeft:16,
        paddingRight:16,
        position:'absolute',
        bottom:0,
        width:'100%',
        alignItems:'center',

      }}>
        <Image 
          source={require('../../assets/img/export/masterpass_logo.png')}
          style={{
            width: 209,
            height: 36,
            resizeMode: 'contain',
            marginBottom:24,
          }}
          />
        <View style={{alignItems:'center', marginBottom:16}}>
          <Image
              source={require('../../assets/img/export/success_checkmark.png')}
              style={{
                width: 80,
                height: 80,
                resizeMode:'contain',
              }}
          />
        </View>
        <View>
        <Text style={{fontSize:16, color:'#004F97', textAlign:'center', fontWeight:'500', marginBottom:48}}>
        Ödemeniz başarılı bir şekilde tamamlandı!
        </Text>        
        </View>
        <TouchableOpacity
          style={[regstyles.buttonStyle, {padding:0, marginLeft:0,marginRight:0, marginBottom: 10, backgroundColor: '#004F97', flex:1}]}              
          activeOpacity={0.5}
          onPress={()=>{
            console.log("close success");
            setSuccessModalVisible(false);
            navigation.navigate('Balance');
            }}>
          <Text style={regstyles.buttonTextStyle}>Kapat</Text>
        </TouchableOpacity>
      </View>
      </View>
      </Modal>
    <Loader loading={loading} />
    <SubtabHeader routetarget="ListCards" name="Banka / Kredi Kartı ile Yükle" count="0" />
    <ScrollView
keyboardShouldPersistTaps="handled"
style={registerStyles.scrollView}>
<KeyboardAvoidingView enabled  behavior="padding" style={{ flex: 1, minHeight:Dimensions.get('window').height }}>
    <View style={{paddingTop: 16,
      paddingBottom: 16,
      paddingLeft: 16,
      paddingRight: 16,}}>
          <View
              style={{
                backgroundColor:'#fff',
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24,
                borderBottomLeftRadius: 24,
                borderBottomRightRadius: 24,
                paddingTop: 16,
                paddingBottom: 16,
                paddingLeft: 16,
                paddingRight: 16,
                width: '100%',
              }}>
                  
                  <View style={{
                  }}>
                    
                        <Text style={{
                          fontSize:16,
                          fontWeight:'700',
                          lineHeight:20,
                          color:'#004F97',
                          marginBottom:12,
                          textAlign:'left'
                        }}>
                          Kart Bilgileri
                        </Text>
                        
                  </View>
                  <View 
                  key={id}
                  style={{
                    borderRadius:16,
                    height:88,
                    width:'100%',
                    backgroundColor:'#fff',
                    padding:16,
                    paddingRight:24,
                    marginBottom:16,
                  }}>
                  <View style={{
                    width:'100%',
                    flexDirection:'row',
                    justifyContent:'space-between',
                    alignItems:'center',
                  }}>
                <TouchableOpacity 
                style={{flexDirection:'row',
                alignItems:'center',}}
                onPress={()=>{
                    console.log(cardAlias);
                    //sendPayment();
                  }
                }>
        <View style={{width:56, height:56, borderRadius:56, alignItems:'center', justifyContent:'center',marginRight:16}}>
          <Image 
            source={logo}
            style={{
              width: '90%',
              height: '90%',
              resizeMode: 'contain',
            }}/>
        </View>
        <View style={{marginBottom:8}}>
          <View style={{
            marginBottom:8,
          }}>
            <Text style={{fontSize:12, color:'#0B1929'}}>
              {cardAlias}
            </Text>
          </View>
          <View style={{
          }}>
            <Text style={{fontSize:12, color:'#909EAA'}}>
              {maskedCardNumber}
            </Text>
          </View>
        </View>
      </TouchableOpacity>      
    </View>
    </View>
                  <View style={[regstyles.registerInputStyle, {borderColor: '#EBEBEB',paddingBottom:0}]}>                     
                    <Text style={{                                           
                        fontSize: 12,
                        lineHeight:12, 
                        padding:0,
                        color: '#909EAA', 
                        position:'absolute',
                        top:14,                     
                        left:16,
                        pointerEvents:"none",
                    }}>
                      Yüklenecek Miktar
                    </Text>
                    {/* <TextInput
                        value={amount}
                        onChangeText={Amount => setAmount(Amount)}
                        placeholder="Miktar" //12345
                        placeholderTextColor="#909EAA"
                        keyboardType="numeric"
                        onSubmitEditing={Keyboard.dismiss}
                        blurOnSubmit={false}
                        underlineColorAndroid="#f000"
                        returnKeyType="next"
                      /> */}
                      <MaskInput
                        style={{                      
                          // fontSize: 14,
                          // lineHeight:14, 
                          // padding:0,
                          // color: '#909EAA',
                        }}
                        value={amount}
                        keyboardType="numeric"
                        placeholder="Miktar"
                        onChangeText={(masked, unmasked) => {
                          //setUserPhone(masked); // you can use the unmasked value as well
                          setAmount(unmasked)
                          // assuming you typed "9" all the way:
                          console.log(masked); // (99) 99999-9999
                          console.log(unmasked); // 99999999999
                          //checkPhone();
                        }}
                        mask={tlMask}
                      />
                  </View>
                  
                
                <TouchableOpacity
                  style={[
                    styles.buttonStyle,
                    {
                      width: '100%',
                      height: 52,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 2,
                      borderColor: '#004F97',
                      backgroundColor: '#004F97',
                      padding:0,
                    },
                  ]}
                  onPress={() => sendPayment(cardAlias)}>
                  <Text
                    style={{fontSize: 14, color: '#ffffff'}}>
                    Yükle
                  </Text>
                </TouchableOpacity>
               <View style={{ 
            width:1,
            height:1,
            backgroundColor:'#ff0000'
          }}>
            
          <WebView 
          source={{ uri: iframeUrl }} 
          javaScriptEnabled={true}
          //source={require("../../message.html")}
          ref={payWebview}
          onLoadEnd={(syntheticEvent) => {
            // update component to be aware of loading status
            //const { nativeEvent } = syntheticEvent;
            //this.isLoading = nativeEvent.loading;
            //addcardMessage();
            console.log("iframe loaded");
          }}
          onMessage={(event)=>{
            console.log("onMessage");
            console.log(event);
            let message  = event.nativeEvent.data;
            onMessage(event);
                      
        }}
          style={{ 
            flex:1,
            backgroundColor:'#00ff00',
            display: iframeUrl == '' ? 'none' : 'flex',
          }} 
          />
          
        </View>
              </View>
              </View>
              </KeyboardAvoidingView>
              </ScrollView>
              { 
                (url3d != "") ? 
                <View style={{
                  position:'absolute',
                  top:0,
                  left:0,
                  width:Dimensions.get('window').width,
                  height:Dimensions.get('window').height,
                }}>
                  <WebView 
                source={{ uri: url3d }} 
                javaScriptEnabled={true}
                
                //ref={payWebview}
                onLoadEnd={(syntheticEvent) => {
                  // update component to be aware of loading status
                  //const { nativeEvent } = syntheticEvent;
                  //this.isLoading = nativeEvent.loading;
                  //addcardMessage();
                  console.log("3d iframe loaded");
                }}
                onMessage={(event)=>{
                  console.log("on3dMessage");
                  console.log(event);
                  let message  = event.nativeEvent.data;
                  on3dMessage(event);
                            
                }}
                style={{ 
                  flex:1,
                  //backgroundColor:'#0000ff',
                }} 
                />
                </View>
                :
                <View>

                </View>
              }
              </SafeAreaView>
  )
}

const MasterpassScreen2 = ({navigation}) => {
  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     navigation.navigate('Balance');
  //   });
  //   return unsubscribe;
  // }, [navigation]);

  return (
    <Stack.Navigator initialRouteName="ListCards">
      <Stack.Screen
        name="ListCards"
        component={ListCards}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddCards"
        component={AddCards}
        options={{headerShown: false}}
      /> 
      <Stack.Screen
        name="Payment"
        component={Payment}
        options={{headerShown: false}}
      />     
    </Stack.Navigator>
  );
};
const regstyles = StyleSheet.create({
  registerInputStyle:{
    backgroundColor:'#fff',
    paddingTop:17,
    paddingBottom:17, 
    paddingLeft:12, 
    paddingRight:12,    
    borderWidth: 1,
    borderRadius: 10,
    marginBottom:16,
  },
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    alignContent: 'center',
  },
  topStyle: {
    alignContent: 'center',
    paddingTop: 39,
    paddingBottom: 30,
    borderColor: '#EBEBEB',
    borderBottomWidth: 1,
  },
  centerStyle: {
    alignContent: 'center',
  },
  sectionStyle: {
    flexDirection: 'column',
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#1D1D25',
    borderWidth: 0,
    color: '#FFFFFF',
    height: 52,
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 35,
    marginRight: 35,
    marginBottom: 25,
  },
  
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 15,
    fontWeight: '500',
    fontSize: 14,
  },
  inputTitleStyle: {
    color: '#7E797F',
    fontSize: 12,
    marginBottom: 10,
  },
  inputStyle: {
    color: '#1D1D25',
    paddingTop: 30,
    paddingBottom: 30,
    fontFamily: 'Helvetica-Bold',
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    borderLeftWidth: 0,
    borderRightWidth: 0,
    marginBottom: 48,
    opacity: 1,
  },
  bottomStyle: {
    alignItems: 'center',
    marginBottom: 30,
  },
  copyrightTextStyle: {
    color: '#7E797F',
    textAlign: 'center',
    fontWeight: 'light',
    fontSize: 10,
    alignSelf: 'center',
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
});
export default MasterpassScreen2;

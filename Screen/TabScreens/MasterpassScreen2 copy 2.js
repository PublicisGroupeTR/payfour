/* eslint-disable react-native/no-inline-styles */
// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useEffect, useRef, useState} from 'react';
import {View, Text, SafeAreaView, ScrollView, KeyboardAvoidingView, Image, Linking, FlatList, StyleSheet, Dimensions, TextInput, Keyboard, TouchableOpacity} from 'react-native';
import {styles} from '../Components/Styles.js';
import TabHeader from '../Components/TabHeader.js';
import Loader from '../Components/Loader';
import SubtabHeader from '../Components/SubtabHeader';
import { registerStyles } from '../Components/RegisterStyles';

//import {TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'react-native-axios';
import {MasterPassSDK} from '@macellan/masterpass-sdk';
import {RSAKey} from 'react-native-rsa'
import { sha256, sha256Bytes } from 'react-native-sha256';
import { WebView } from 'react-native-webview';
import MaskInput from 'react-native-mask-input';
//https://test-client.bubbleads.co/Scripts/masterpass-javascript-sdk-web.min.js
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const ListCards = ({navigation}) => {

  const webview = useRef();
  const [phone, setPhone] = useState('');
  const [mpToken, setMptoken] = useState('');
  const [iframeUrl, setIframeUrl] = useState('');
  const [payfourId, setPayfourId] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({token:'', phone:'', payfourId:''});
  const scrollRef = useRef(); 
  const [cardData, setCardData] = React.useState([]);
  const [cardType, setCardType] = React.useState('bank');
  const [currentObj, setCurrentObj] = useState({"type":"", "data":{}});
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
              checkUser();
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
                setCardData(response.data.result.cards);
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
        "https://api-app.payfour.com//masterpass/addcard/2bf6a86d-93f2-4335-a182-4dac75d35f28"}, 
        "status": 200, 
        "success": true
        }*/
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
            console.log("currentObj");
            console.log(currentObj);
            if(response.data.result.responseCode == "5001"){
              console.log("payment otp");
              setLoading(false);
              confirmPayment();
              //setTimeout(otpMessage, 2000);
              //setTimeout(sendOtp, 2000);

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
const Item = ({id, cardAlias, maskedCardNumber, issuer}) => (
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
          sendPayment();
        }
      }>
        <View style={{width:56, height:56, borderRadius:56, backgroundColor:'#EAEAEA',marginRight:16}}></View>
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
      }}>
        <Image 
        source={require('../../assets/img/export/arrow_right_dark.png')}
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
const renderCards = () => {
  if (cardData.length >0) {
    return (
      
      <FlatList
          data={cardData}
          ref={scrollRef}
          renderItem={({item}) => (
            <Item id={item.uniqueCardNumber} cardAlias={item.cardAlias} maskedCardNumber={item.maskedCardNumber} issuer={item.issuer}/>
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
            paddingLeft: 20,
          }}>
          Kayıtlı kart bulunamadı.
        </Text>
      </View>
    );
  }
};
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#EAEAEA'}}>
      <Loader loading={loading} />
      <SubtabHeader routetarget="Balance" name="Kartlarım" count="0" />
      <View style={{padding:16}}>
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
              }
              }
              >
                <Text style={{
                  fontSize:12,
                  color: cardType==='carrefour'? '#004F97':'#909EAA',
                }}
                >
                  CarrefourSa Kartlarım
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
            width:100,
            height:100,
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
          <TouchableOpacity style={{width:100, height:20, backgroundColor:'#ababab'}}
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
      }}
      >
        <Text style={{color:'#004F97', fontSize:14, marginBottom:8, fontWeight:'500'}}>
          Kredi Kartlarım
        </Text>
        {renderCards()} 
      </View>
    </SafeAreaView>
  );
};

const AddCards = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardDate, setCardDate] = useState('');
  const [cardCVC, setCardCVC] = useState('');
  const [cardNick, setCardNick] = useState('');
  const webview = useRef();
  const [phone, setPhone] = useState('');
  const [mpToken, setMptoken] = useState('');
  const [iframeUrl, setIframeUrl] = useState('');
  const [payfourId, setPayfourId] = useState('');
  const [user, setUser] = useState({token:'', phone:'', payfourId:''});
  const scrollRef = useRef();

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
                addcardMessage();
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
          "https://api-app.payfour.com//masterpass/addcard/2bf6a86d-93f2-4335-a182-4dac75d35f28"}, 
          "status": 200, 
          "success": true
          }*/
  }
  const setRegistration = ()=>{

  }
  const addcardMessage =() =>{
    console.log("addcardMessage");
    console.log(webview);
    console.log(webview.current);
    if(webview.current) webview.current.postMessage("addCard;check");
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
    }
  }
  const otpMessage = () =>{
    console.log("otpMessage");
    if(webview.current) webview.current.postMessage("otp;123456");
  }
  return(
    <SafeAreaView style={{flex: 1, backgroundColor: '#efeff3'}}>
    <Loader loading={loading} />
    <SubtabHeader routetarget="ListCards" name="Kredi / Banka Kartı Ekle" count="0" />
    <ScrollView
keyboardShouldPersistTaps="handled"
style={registerStyles.scrollView}>
<KeyboardAvoidingView enabled>
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
                  <View style={[regstyles.registerInputStyle, {borderColor: '#EBEBEB',paddingBottom:0}]}>                     
                    <Text style={{                                           
                        fontSize: 12,
                        lineHeight:12, 
                        padding:0,
                        color: '#909EAA', 
                        position:'absolute',
                        top:14,                     
                        left:16
                    }}>
                      Kart Üzerindeki İsim
                    </Text>
                    <TextInput
                        value={cardName}
                        onChangeText={UserName => setCardName(UserName)}
                        placeholder="Ad Soyad" //12345
                        placeholderTextColor="#909EAA"
                        keyboardType="default"
                        onSubmitEditing={Keyboard.dismiss}
                        blurOnSubmit={false}
                        underlineColorAndroid="#f000"
                        returnKeyType="next"
                      />
                  </View>
                  <View style={[regstyles.registerInputStyle, {borderColor: '#EBEBEB',paddingBottom:0,}]}>  
                    <Text style={{                                           
                          fontSize: 12,
                          lineHeight:12, 
                          padding:0,
                          color: '#909EAA', 
                          position:'absolute',
                          top:14,                     
                          left:16
                      }}>
                        Kart Numarası
                      </Text>          
                    <TextInput                      
                      onChangeText={CardNumber => setCardNumber(CardNumber)}
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
                    <View style={[regstyles.registerInputStyle, {borderColor: '#EBEBEB',width:'48%'}]}> 
                    <MaskInput
                        style={{                      
                          fontSize: 14,
                        lineHeight:14, 
                          padding:0,
                          color: '#909EAA',
                        }}
                        value={cardDate}
                        keyboardType="numeric"
                        placeholder="AA/YY"
                        onChangeText={(masked, unmasked) => {
                          //setUserPhone(masked); // you can use the unmasked value as well
                          setCardDate(masked)
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
                    <View style={[regstyles.registerInputStyle, {borderColor: '#EBEBEB',width:'48%'}]}>            
                      <TextInput
                        style={{                      
                          fontSize: 14,
                          lineHeight:8, 
                          padding:0,
                          color: '#909EAA',
                        }}
                        onChangeText={CardCVC => setCardCVC(CardCVC)}
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
                  <View style={[regstyles.registerInputStyle, {borderColor: '#EBEBEB',}]}>            
                    <TextInput
                      style={{                      
                        fontSize: 14,
                        lineHeight:8, 
                        padding:0,
                        color: '#909EAA',
                      }}
                      onChangeText={CardNick => setCardNick(CardNick)}
                      placeholder="Karta İsim Verin ( kişisel, iş vb.)" //12345
                      placeholderTextColor="#909EAA"
                      keyboardType="default"
                      onSubmitEditing={Keyboard.dismiss}
                      blurOnSubmit={false}
                      underlineColorAndroid="#f000"
                      returnKeyType="next"
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
                  onPress={() => addCard()}>
                  <Text
                    style={{fontSize: 14, color: '#ffffff'}}>
                    Kart Ekle
                  </Text>
                </TouchableOpacity>
               <View style={{ 
            width:10,
            height:10,
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
          
        </View>
              </View>
              </View>
              </KeyboardAvoidingView>
              </ScrollView>
              </SafeAreaView>
  )
}
const Payment = ({navigation}) => {

}
const MasterpassScreen2 = ({navigation}) => {
  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     navigation.navigate('Balance');
  //   });
  //   return unsubscribe;
  // }, [navigation]);

  return (
    <Stack.Navigator initialRouteName="AddCards">
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
    height: 65,
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 35,
    marginRight: 35,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 20,
    fontFamily: 'Helvetica-Bold',
    fontWeight: 'bold',
    fontSize: 16,
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

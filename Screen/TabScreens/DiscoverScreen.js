/* eslint-disable react-native/no-inline-styles */
// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Linking,
  Modal,
  AppState,
  Dimensions,
  Keyboard,
  Alert,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import AsyncStorage from '@react-native-async-storage/async-storage';
//import {SelectList} from 'react-native-dropdown-select-list';
import {Dropdown} from 'react-native-element-dropdown';
import Loader from '../Components/Loader.js';
import TabHeader from '../Components/TabHeader.js';
import ProfileScreen from './ProfileScreen.js';
import CheckWaitingScreen from './PayScreens/CheckWaitingScreen.js';
import PayScreen from './PayScreens/PayScreen.js';
import PayOptionsScreen from './PayScreens/PayOptionsScreen.js';
import PayOptionsScreen2 from './PayScreens/PayOptionsScreen2.js';
import IbanScreen from './PayScreens/IbanScreen.js';
import CashScreen from './PayScreens/CashScreen.js';
import {ScrollView} from 'react-native-gesture-handler';
//import Clipboard from '@react-native-clipboard/clipboard';
import {styles} from '../Components/Styles.js';
import Linkwhite from '../../assets/img/svg/linkwhite.svg';

import LinearGradient from 'react-native-linear-gradient';
//import Carousel from 'react-native-snap-carousel';
import { useKeenSliderNative } from "keen-slider-extended/react-native"
//import { useKeenSliderNative } from "./lib/react-native"
import axios from 'react-native-axios';
import MaskInput from 'react-native-mask-input';
import Clipboard from '@react-native-clipboard/clipboard';
import messaging from '@react-native-firebase/messaging';
import Carousel, {useOnPressConfig} from '@timotismjntk/react-native-carousel';

import { useFocusEffect } from '@react-navigation/native';
import { BackHandler } from 'react-native';
import NotificationScreen from './NotificationScreen.js';

const Stack = createStackNavigator();
const Discover = ({route, navigation}) => {
  const [selected, setSelected] = React.useState('');
  const [unreadcount, setUnreadCount] = React.useState(0);
  const [secureBalance, setSecureBalance] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [slData, setSlData] = React.useState([]);
  const [pslData, setPslData] = React.useState([]);

  const [creditStatus, setCreditStatus] = useState(0);

  const [offerLink, setOfferLink] = useState('');
  const [campaignDetailData, setCampaignDetailData] = useState({title:'', longDescription:'', imageUrl:'https://reimg-carrefour.mncdn.com/bannerimage/Carre4433_0_MC/8862580539442.jpg', time:'', barLines:[], targetAward:0, memberCurrentCount:0});

  const [userName, setUsername] = useState('');
  const [userSurname, setUsersurname] = useState('');
  const [userTCKN, setUserTCKN] = useState('');
  const [userBirth, setUserBirth] = useState('');
  const [userId, setUserId] = useState('');
  const [initials, setInitials] = useState('');
  const [payfourId, setPayfourId] = useState('');
  const [isPremium, setIsPremium] = useState(false);

  const [transactions, setTransactions] = useState({ type: "İşlem bulunmamaktadır.", amount: "", date:"İşlem bulunmamaktadır." });
  const [userData, setUserData] = useState({ });
  const [userLinkError, setUserLinkError] = useState(false);
  const [userBrandError, setUserBrandError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState('0,00');
  const [bonus, setBonus] = useState('0,00');
  const [available, setAvailable] = useState('0,00');
  const [errortext, setErrortext] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('Marka Seçiniz');
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [modalVisible, setModalVisible] = useState(false);

  const [payModalVisible, setPayModalVisible] = useState(false);
  const [ibanModalVisible, setIbanModalVisible] = useState(false);
  const [cashModalVisible, setCashModalVisible] = useState(false);
  const [iban, setIban] = useState('');

  const [showTooltip1, setShowTooltip1] = useState(false);
  const [showTooltip2, setShowTooltip2] = useState(false);
  const [showTooltip3, setShowTooltip3] = useState(false);

  const [addModalVisible, setAddModalVisible] = useState(false);
  
  const [carrefourCardData, setCarrefourCardData] = useState([]);
  //const [payfourId, setPayfourId] = useState('');
  //const [ibanModalVisible, setIbanModalVisible] = useState(false);

  const dw = Dimensions.get('window').width;
  const sw = Dimensions.get('window').width*0.437;
  const sh = Dimensions.get('window').width*0.562;
  const slides = 4;
  const slider = useKeenSliderNative({
     slides: {
      number: slides,
      perView: 2,
      spacing: 15,
    },
  })
  const slider2 = useKeenSliderNative({
    slides: {
     number: slides,
     perView: 2,
     spacing: 15,
   },
 })
  const slimages = [
    require('../../assets/img/export/Campaignv3_dummy1.png'),
    require('../../assets/img/export/Campaignv3_dummy2.png'),
    require('../../assets/img/export/Campaignv3_dummy1.png'),
  ]
  const colors = ['#407CFE', '#FF6540', '#6AFC52', '#3FD2FA', '#FF3E5E', '#8A45FF']
  const onPressConfig = useOnPressConfig();

  useFocusEffect(
    React.useCallback(() => {
        const onBackPress = () => {
        // Return true to disable the default back button behavior
        return true;
        };
        BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
    );
  useEffect(() => {   
    const unsubscribe = navigation.addListener('focus', () => {
      // do something
      console.log('Hello World!');
      console.log(dw);
      console.log(Dimensions.get('window').width);
      setLoading(true);
      AsyncStorage.getItem('payfourId').then(value =>{
        setPayfourId(value);
        AsyncStorage.getItem('token').then(value =>{
          const config = {
            headers: { Authorization: `Bearer ${value}` }
          };
          console.log("getbalance");
          axios.get('http://payfourapp.test.kodegon.com/api/account/getbalance', config).then(response => {
            console.log(response.data);
            console.log(response.data.data);
            if(response.data.data.balance != null){
              let b = parseFloat(response.data.data.balance).toFixed(2);
              //let b = parseFloat("1890").toFixed(2);
              let f = new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', currencyDisplay:'code',minimumFractionDigits:2 }).format(
                  b,
                )
              let fr= f.replace('TRY', '').trim();              
              //setBalance("100.000.000,00");
              setBalance(fr);
            }
            setLoading(false);
            //checkPremiumCampaigns();
            checkNotificationCount();
           //checkCampaigns();
          })
          .catch(error => {
            console.error("Error sending data: ", error);
            let msg="";
            (error.response.data.errors.message) ? msg += error.response.data.errors.message+"\n" : msg += "Ödeme hatası \n"; (error.response.data.errors.paymentError) ? msg += error.response.data.errors.paymentError+"\n" : msg += ""; Alert.alert(msg);
          });

        });
      });
    });
    return unsubscribe;
  }, [navigation]);
  const checkCurrency = data =>{
    if(parseInt(data) < 1000){
      let arr= data.toString().split(".");
      //Alert.alert(arr[0]+" "+arr[1]);
      console.log(arr);
      //let add = arr[1] ? ","+arr[1] : ",00";
      let frc;
      //Alert.alert(arr[1]);
      if(arr[1] && arr[1].charAt(0) != "0"){
        frc = parseInt(arr[1]) < 10 ? arr[1]+"0":arr[1];
      }else if(arr[1]){
        frc = arr[1];
      }else{
        frc = "00";
      }
      let add = arr[1] ? ","+frc : ",00";
      return arr[0]+add
    }else{
      let arr= data.toString().split(".");
      console.log(arr)
      let t = Math.floor(parseInt(data) / 1000);
      let o = parseInt(data) - (t*1000);
      let b;
      if(o < 1){
        b = "000";
      }else if(o < 10){
        b = "00"+o
      }else if(o < 100){
        b="0"+o;
      }else b = o
      let frc;
      if(arr[1] && arr[1].charAt(0) != "0"){
        frc = arr[1] < 10 ? arr[1]+"0":arr[1];
      }else{
        frc = "00";
      }
      let add = arr[1] ? ","+frc : ",00";
      let f = t+"."+b+add
      console.log(f)
      return f;
    }
  }
  const checkNotificationCount= () => {
    setLoading(true);
    AsyncStorage.getItem('token').then(value =>{
      const config = {
        headers: { Authorization: `Bearer ${value}` }
      };
      console.log("checkNotificationCount");
      //axios.get('http://payfourapp.test.kodegon.com/api/campaigns/premiumcampaigns', config).then(response => {
      axios.get('http://payfourapp.test.kodegon.com/api/notifications/unreadcount', config).then(response => {
        console.log(response.data);
        console.log(response.data.data);
        setUnreadCount(response.data.data);
        checkPremiumCampaigns();
      })
      .catch(error => {
        console.error("Error sending data: ", error);
        let msg="";
        (error.response.data.errors.message) ? msg += error.response.data.errors.message+"\n" : msg += "Ödeme hatası \n"; (error.response.data.errors.paymentError) ? msg += error.response.data.errors.paymentError+"\n" : msg += ""; Alert.alert(msg);
      });

    });
  }
  const checkPremiumCampaigns= () => {
    setLoading(true);
    AsyncStorage.getItem('token').then(value =>{
      const config = {
        headers: { Authorization: `Bearer ${value}` }
      };
      console.log("premiumcampaigns");
      //axios.get('http://payfourapp.test.kodegon.com/api/campaigns/premiumcampaigns', config).then(response => {
        axios.get('http://payfourapp.test.kodegon.com/api/campaigns?page=1&pageSize=4&isPremium=true&sort=DateDescending', config).then(response => {
        console.log(response.data);
        console.log(response.data.data);
        console.log(response.data.data.items);
        let sl = response.data.data.items;
        for(var i=0; i < sl.length;i++){
          //sl[i].key = sl[i].campaignCode;
          let th = sl[i].thumbnailUrl;
          sl[i].thumbnailUrl=th.trim();
          
          let dt = new Date(sl[i].expireDate);
          let t = (((dt.getDate()<10)? "0"+dt.getDate() : dt.getDate())) +'.'+(((dt.getMonth()+1)<10)? "0"+(dt.getMonth()+1) :(dt.getMonth()+1))+'.'+dt.getFullYear();
          sl[i].time = t;
        }
        if(sl.length < 2){
          sl.push({...sl[0]});
          sl.push({...sl[0]});
          sl.push({...sl[0]});
        }else if(sl.length < 3){
          sl.push({...sl[0]});
          sl.push({...sl[1]});
        }else if(sl.length < 4){
          sl.push({...sl[0]});
        }
        for(var i=0; i < sl.length;i++){
          sl[i].uid = "premium"+(10+i);
        }
        console.log("psl");
        console.log(sl.length);
        console.log(sl);
        setPslData(sl);
        setLoading(false);
        checkCampaigns();
      })
      .catch(error => {
        console.error("Error sending data: ", error);
        let msg="";
        (error.response.data.errors.message) ? msg += error.response.data.errors.message+"\n" : msg += "Ödeme hatası \n"; (error.response.data.errors.paymentError) ? msg += error.response.data.errors.paymentError+"\n" : msg += ""; Alert.alert(msg);
      });

    });
  }
  const checkCampaigns= () => {
    setLoading(true);
    AsyncStorage.getItem('token').then(value =>{
      const config = {
        headers: { Authorization: `Bearer ${value}` }
      };
      console.log("campaigns");
      axios.get('http://payfourapp.test.kodegon.com/api/campaigns?page=1&pageSize=4&isSpecial=true&sort=DateDescending', config).then(response => {
        console.log(response.data);
        console.log(response.data.data);
        console.log(response.data.data.items);
        let sl = response.data.data.items;
        for(var i=0; i < sl.length;i++){
          //sl[i].key = sl[i].campaignCode;
          let th = sl[i].thumbnailUrl;
          sl[i].thumbnailUrl=th.trim();
          let dt = new Date(sl[i].expireDate);
          let t = (((dt.getDate()<10)? "0"+dt.getDate() : dt.getDate())) +'.'+(((dt.getMonth()+1)<10)? "0"+(dt.getMonth()+1) :(dt.getMonth()+1))+'.'+dt.getFullYear();
          sl[i].time = t;
        }
        if(sl.length < 2){
          sl.push({...sl[0]});
          sl.push({...sl[0]});
          sl.push({...sl[0]});
        }else if(sl.length < 3){
          sl.push({...sl[0]});
          sl.push({...sl[1]});
        }else if(sl.length < 4){
          sl.push({...sl[0]});
        }
        for(var i=0; i < sl.length;i++){
          sl[i].uid = "campaign"+(10+i);
        }
        console.log("psl");
        console.log(sl.length);
        console.log(sl);
        setSlData(sl);
        setLoading(false);
        checkTransactions();
      })
      .catch(error => {
        console.error("Error sending data: ", error);
        let msg="";
        (error.response.data.errors.message) ? msg += error.response.data.errors.message+"\n" : msg += "Ödeme hatası \n"; (error.response.data.errors.paymentError) ? msg += error.response.data.errors.paymentError+"\n" : msg += ""; Alert.alert(msg);
      });

    });
  }
  const checkTransactions = () => {
    setLoading(true);
    AsyncStorage.getItem('token').then(value =>{
      const config = {
        headers: { Authorization: `Bearer ${value}` }
      };
      let date = new Date();
      let calcDate = new Date(Date.now() - 29 * 24 * 60 * 60 * 1000);
      let startDate =
          calcDate.getFullYear() +
          '-' +
          (calcDate.getMonth() + 1) +
          '-' +
          calcDate.getDate();
      let endDate =
          date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
          console.log("gettransactions");
      axios.get('http://payfourapp.test.kodegon.com/api/account/gettransactions?startDate='+startDate+'&endDate='+endDate+'&page=0&pageSize=12', config).then(response => {
        console.log(response.data);
        console.log(response.data.data);
        /*if(response.data.data.balance != null){
          let b = parseFloat(response.data.data.balance).toFixed(2).replace('.', ',');
          setBalance(b);
        }
        setLoading(false);
        checkPayment();*/
        let d = response.data.data.items;
        if(d.length > 0){
          let dObj = {}
          let date = new Date(d[0].dateTime);
          dObj.type=d[0].txnName;
          let f = new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', currencyDisplay:'code',minimumFractionDigits:2 }).format(
            d[0].amount,
          )
        let fr= f.replace('TRY', '').trim();
          dObj.amount=fr;
          let day = date.getDate()<10?"0"+date.getDate() : date.getDate();
          let month = (date.getMonth() + 1)<10?"0"+(date.getMonth() + 1) : (date.getMonth() + 1);

          dObj.date = day+'.'+month+'.'+date.getFullYear();
          console.log("transactionObj");
          console.log(dObj);
          setTransactions(dObj);
        }
        setLoading(false);
        //checkPayment();
        //checkMainCampaign();
        getCarrefourCards();
      })
      .catch(error => {
        console.error("Error sending data: ", error);
        let msg="";
        (error.response.data.errors.message) ? msg += error.response.data.errors.message+"\n" : msg += "Ödeme hatası \n"; (error.response.data.errors.paymentError) ? msg += error.response.data.errors.paymentError+"\n" : msg += ""; Alert.alert(msg);
      });

    });
  }
  const getCarrefourCards = () =>{
    setLoading(true);
    AsyncStorage.getItem('token').then(value =>{
        
      const config = {
        headers: { Authorization: `Bearer ${value}` }
      };
      axios.get('https://payfourapp.test.kodegon.com/api/account/getloyaltycards', config)
            .then(response => {
              console.log("getLoyaltyCards");
              console.log(response);
              console.log(response.data);
              
              if(response.data){
                if(response.data.data){
                  let bonus = 0;
                  let arr = response.data.data;
                  for(var i=0; i < arr.length;i++){
                    arr[i].logo = require('../../assets/img/export/carrefour_bireysel.png');
                    bonus+=arr[i].netBonus;
                  }
                  console.log(arr);
                  setCarrefourCardData(arr);
                  if(bonus > 0){
                    let f = new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', currencyDisplay:'code',minimumFractionDigits:2 }).format(
                      bonus,
                    )
                  let fr= f.replace('TRY', '').trim();
                  setBonus(fr);
                  }
                }
              }
              setLoading(false);
              checkMainCampaign();
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
  const checkMainCampaign = () =>{

    console.log("checkMainCampaign");
    //http://payfourapp.test.kodegon.com/api/campaigns/maincampaign
    AsyncStorage.getItem('token').then(value =>{
      const config = {
        headers: { Authorization: `Bearer ${value}` }
      };
      axios.get('http://payfourapp.test.kodegon.com/api/campaigns/maincampaign', config).then(response => {
        console.log(response);
        console.log(response.data);
        console.log(response.data.data);
       /*{"id": 56, "memberCurrentCount": 0, "targetAward": 100, "targetCount": 4}*/
        let sl = response.data.data;
        console.log("targetCount");
        console.log(sl.targetCount);
        sl.barLines = [];
        let lineArr = [];

        for(var i=0; i < parseInt(sl.targetCount)+1; i++){
          console.log(i);
          sl.barLines.push({point: i, key:"barLine"+Date.now()+i});
        }
        //sl.barLines = lineArr;
        //setBarLines(lineArr);
        //sl.memberCurrentCount = 4
        console.log("sl.barLines");
        console.log(sl.barLines);
        setCampaignDetailData(sl);
        setLoading(false);
        checkPayment();
        //checkFirebaseToken();
        //requestUserPermission();
        //getWaiting();
        
      })
      .catch(error => {
        console.error("Error sending data: ", error);
        let msg="";
        (error.response.data.errors.message) ? msg += error.response.data.errors.message+"\n" : msg += "Ödeme hatası \n"; (error.response.data.errors.paymentError) ? msg += error.response.data.errors.paymentError+"\n" : msg += ""; Alert.alert(msg);
      });
    });
  }
  async function requestUserPermission() {
    console.log('>>>>>>> permission <<<<<<<<<')
    const authorizationStatus = await messaging().requestPermission();
  
    /*if (authorizationStatus) {
      console.log('Permission status:', authorizationStatus);
      
    }*/
      console.log('Permission status:', authorizationStatus);
    if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
      console.log('User has notification permissions enabled.');
    } else if (authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL) {
      console.log('User has provisional notification permissions.');
    } else {
      console.log('User has notification permissions disabled');
    }
    checkFirebaseToken();
  }
  const checkFirebaseToken = async () =>{
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log("fcmToken");
      console.log(fcmToken);
       //navigation.navigate('IntroScreen');
    
    AsyncStorage.getItem('token').then(value =>{
      const config = {
        headers: { Authorization: `Bearer ${value}` }
      };
      console.log("setFirebaseToken");
      axios.post('http://payfourapp.test.kodegon.com/api/devices/setfcmtoken', { "fcmToken": fcmToken },config).then(response => {
        console.log(response.data);
        console.log(response.data.data);
        checkPayment();
       //checkCampaigns();
      })
      .catch(error => {
        console.error("Error sending data: ", error);
        let msg="";
        (error.response.data.errors.message) ? msg += error.response.data.errors.message+"\n" : msg += "Ödeme hatası \n"; (error.response.data.errors.paymentError) ? msg += error.response.data.errors.paymentError+"\n" : msg += ""; Alert.alert(msg);
        checkPayment();
      });

    });
  }else{
    checkPayment();
  }
  }

  const checkPayment = () =>{
    console.log("checkpayment");
    console.log("route.name");
    console.log(route);
    console.log(route.params);
    console.log(navigation);
    //console.log(props)
    console.log(this.props)
    //console.log(navigation.getParam('screen'));
    
    //let payment = (route && route.params && route.params.checkpayment)? true : false;

    //if(route.name == "payment"){
      setLoading(true);
      AsyncStorage.getItem('token').then(value =>{
        const config = {
          headers: { Authorization: `Bearer ${value}` }
        };
        console.log("getuser");
        axios.get('http://payfourapp.test.kodegon.com/api/account/getuser', config).then(response => {
          console.log(response.data);
          console.log(response.data.data);
          console.log(response.data.data.tckn);
          setUserData(response.data.data);
          setIban(response.data.data.defaultBankAccountNumber);
          console.log('!!!!!!!!!!!');
          console.log(response.data.data.segment)
          if(response.data.data.segment == 2) setIsPremium(true);
          let u = response.data.data;
          if(u.firstName != null && u.firstName != "" && u.lastName != null && u.lastName != ""){
            let ch = u.firstName.charAt(0)+u.lastName.charAt(0);
            console.log("initials");
            console.log(ch);
            setInitials(ch);
          }
          /*if(response.data.data.registrationCompleted == null || response.data.data.registrationCompleted == "undefined" || !response.data.data.registrationCompleted){
            console.log("show full register");
            setModalVisible(true);
          }else{*/
          setLoading(false);
          //checkMainCampaign();
          checkCurrentLimit(u.loanApplication, u.potentialLimit);
            //getWaiting();
          //}
        })
        .catch(error => {
          setLoading(false);
          console.error("Error sending data: ", error);
          let msg="";
          (error.response.data.errors.message) ? msg += error.response.data.errors.message+"\n" : msg += "Ödeme hatası \n"; (error.response.data.errors.paymentError) ? msg += error.response.data.errors.paymentError+"\n" : msg += ""; Alert.alert(msg);
        });

      });
      
    //}
  }
  const checkCurrentLimit = (userCreditData, userLimitData) => {
    console.log("checkCurrentLimit");
    console.log("-------");
    AsyncStorage.getItem('token').then(value =>{
      const config = {
        headers: { Authorization: `Bearer ${value}` }
      };

      axios.get('https://payfourapp.test.kodegon.com/api/loans/getavailablecreditlimit', config).then(response => {
        console.log("getavailablecreditlimit");
        console.log(response.data);
        console.log(response.data.data);
        if(response.data.data.availableAllotmentAmount){
          setAvailable(new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', currencyDisplay:'code',minimumFractionDigits:2 }).format(
            response.data.data.availableAllotmentAmount,
          ).replace('TRY', '').trim())
        }

        //checkUserCreditStatus(userCreditData, userLimitData, response.data.data);
        checkUserCreditStatus(userCreditData, userLimitData, response.data.data);
        
      })
      .catch(error => {
        console.error("Error sending data: ", error);
        let msg="";
        (error.response.data.errors.message) ? msg += error.response.data.errors.message+"\n" : msg += "Ödeme hatası \n"; (error.response.data.errors.paymentError) ? msg += error.response.data.errors.paymentError+"\n" : msg += ""; Alert.alert(msg);
        getWaiting();
      });

    });
  }
  const checkUserCreditStatus= (userCreditData, userLimitData) =>{
    console.log("checkUserCreditStatus");
    console.log(userCreditData);
    console.log(userLimitData);
    console.log("-------");
    /*userLimitData = 1000;
    userCreditData = null;
    availableLimit.availableAllotmentAmount = 5;*/
    let hasCredit = (userCreditData != null && userCreditData != undefined && userCreditData != "undefined");
    let hasActiveCredit = hasCredit && userCreditData.status == 2;
    let hasLimit = (userLimitData != null && userLimitData != undefined && userLimitData != "undefined");

    console.log(hasLimit);
    console.log(hasCredit);
    console.log(hasActiveCredit);

    if((!hasLimit && !hasCredit)){
      console.log("cs1");
      //setCreditStatus(1);
      getWaiting(1);    
    }else if(hasLimit && !hasCredit){
      console.log("cs3");
      //setCreditStatus(2);
      getWaiting(3);
    }else if(hasCredit){ 
      console.log("cs2");
      //setCreditStatus(3);
      getWaiting(2);
    }
    // console.log("CREDITSTATE");
    // console.log(creditState);
    //getWaiting();

  }
  const getWaiting = (cs) =>{
    console.log("getWaiting "+cs);
    setLoading(true);
    setCreditStatus(cs);
    //setCreditStatus(3);
    AsyncStorage.getItem('token').then(value =>{
      const config = {
        headers: { Authorization: `Bearer ${value}` }
      };
      axios.get('http://payfourapp.test.kodegon.com/api/payments/getwaitings', config).then(response => {
        console.log("getwaitings");
        console.log(response.data);
        console.log(response.data.data.length);
        console.log("balance ? ");
        console.log(balance);
        setLoading(false);
        console.log("cs");
        console.log(cs);
        //setCreditStatus(cs);
        console.log("CREDITSTATE2");
        console.log(creditStatus);
        /*response.data.data = [
          {"amount": 220, "channelTypeId": 6, "dateUTC": "2024-12-06T13:01:58.7072503", "paymentId": 1696, "storeCode": "1014", "storeName": " CarrefourSA İstanbul Merter"}, 
          {"amount": 22, "channelTypeId": 6, "dateUTC": "2024-12-06T13:02:08.4449536", "paymentId": 1697, "storeCode": "1012", "storeName": " CarrefourSA İstanbul Acıbadem"}, 
          {"amount": 10, "channelTypeId": 6, "dateUTC": "2024-12-06T13:02:16.8198694", "paymentId": 1698, "storeCode": "1015"}
          ];*/
        if(response.data.data.length > 0){
          let pObj = response.data.data[0];
          pObj.balance = balance;
          console.log(pObj);
          navigation.navigate('wallet', { 
            screen: 'Waiting',
            params: pObj
          })
        }else{
          if(route.name == "payment") setPayModalVisible(true);
        }
      })
      .catch(error => {
        setLoading(false);
        console.error("Error sending data: ", error);
        let msg="";
        (error.response.data.errors.message) ? msg += error.response.data.errors.message+"\n" : msg += "Ödeme hatası \n"; (error.response.data.errors.paymentError) ? msg += error.response.data.errors.paymentError+"\n" : msg += ""; Alert.alert(msg);
      });

    });
  }
  const setRegistration = () =>{
    setLoading(true);
    AsyncStorage.getItem('token').then(value =>{
      const config = {
        headers: { Authorization: `Bearer ${value}` }
      };
      console.log(userBirth);
      let a = userBirth.split('/');
      let dt = a[2]+"-"+a[0]+"-"+a[1];
      console.log(dt);
      let d = new Date(dt);
      let fd = d.toISOString()
      let dataToSend = {
        tckn: userTCKN,
        firstName: userName,
        lastName: userSurname,
        birthdate: fd,
        gender: "Male",
        address: "",
        cityId: 1,
        agreements: {
          openConsent: true,
          commercialElectronic: true,
          paymentServices: true
        }
      }
      console.log("data");
      console.log(dataToSend);
      /*{
        "tckn": "string",
        "firstName": "string",
        "lastName": "string",
        "email": "string",
        "gender": "Male",
        "birthDate": "2024-08-27T10:30:01.350Z",
        "address": "string",
        "cityId": 0,
        "agreements": {
          "openConsent": true,
          "commercialElectronic": true,
          "paymentServices": true
        }
      }*/
        console.log("completeregistration");
      axios.post('http://payfourapp.test.kodegon.com/api/account/completeregistration', dataToSend, config).then(response => {
        console.log(response.data);
        setUserData(response.data.data);
        setLoading(false);
        setModalVisible(false);
        setPayModalVisible(true);
      })
      .catch(error => {
        console.error("Error sending data: ", error);
        console.error("Error sending data: ", error.response);
        console.error("Error sending data: ", error.response.data);
        console.error("Error sending data: ", error.response.data.errors);
        setLoading(false);
        let msg="";
        (error.response.data.errors.message) ? msg += error.response.data.errors.message+"\n" : msg += "Ödeme hatası \n"; (error.response.data.errors.paymentError) ? msg += error.response.data.errors.paymentError+"\n" : msg += ""; Alert.alert(msg);
      });

    });
  }
  const renderItem = item => {
    return (
      <View
        style={{
          padding: 20,
          height: 54,
          color: '#1D1D25',
        }}>
        <Text
          style={{
            fontSize: 12,
            color: '#1D1D25',
          }}>
          {item.value}
        </Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#e2eaf3',paddingBottom:60,}}>
      <Modal
            animationType="slide"
            transparent={true}
            visible={payModalVisible}
            onRequestClose={() => {
              setModalVisible(!payModalVisible);
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
                        source={require('../../assets/img/export/payfourid_icon.png')}
                        style={{
                          width: 93,
                          height: 93,
                          resizeMode: 'contain',
                          marginBottom:14,
                        }}
                        />
                  </View>
                  <View style={{
                      marginBottom:24,
                      }}>
                        <Text style={{
                          fontSize:20,
                          fontWeight:'700',
                          color:'#004F97',
                          marginBottom:16,
                          textAlign:'center',
                        }}>
                          Payfour ile online ya da 
                          kasada ödeme yapabilirsiniz!
                        </Text>
                        <Text style={{
                          fontSize:16,
                          lineHeight:20,
                          color:'#004F97',
                          paddingLeft:24,
                          paddingRight:24,
                          textAlign:'center',
                          marginBottom:26,
                        }}>
                          Mağazalarımızdan veya CarrefourSA'ya ait online platformlardan yapacağınız alışverişlerinizi Payfour ile ödemek için aşağıdaki Payfour numarasını veya telefon numaranızı kasiyere söylemeniz veya platformlardaki ilgili alana girmeniz yeterli olacaktır.
                      </Text>
                      <View style={{
                        padding:16,
                        borderRadius:8,
                        backgroundColor:'#F2F4F6',
                        flexDirection:'row',
                        alignItems:'center',
                        justifyContent:'center',
                      }}>
                        <Text style={{
                          fontSize:16,
                          color:'#0B1929',
                        }}>
                          Payfour No:
                        </Text>
                        <Text style={{
                          fontSize:16,
                          color:'#004F97',
                        }}>
                          {payfourId}
                        </Text>
                      </View>
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
                  onPress={() => setPayModalVisible(false)}>
                  <Text
                    style={{fontSize: 14, color: '#ffffff'}}>
                    Kapat
                  </Text>
                </TouchableOpacity>
               
              </View>
            </View>
      </Modal>
      <Modal
            animationType="slide"
            transparent={true}
            visible={addModalVisible}
            onRequestClose={() => {
              setAddModalVisible(!addModalVisible);
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
                  paddingTop: 68,
                  paddingBottom: 16,
                  paddingLeft: 16,
                  paddingRight: 16,
                  width: '100%',
                }}>
                  <View style={{
                      marginBottom:16,
                      }}>
                        <Text style={{
                          fontSize:16,
                          fontWeight:'700',
                          color:'#004F97',
                          lineHeight:20,
                          textAlign:'center',
                        }}>
                          Para Yükle
                        </Text>
                        <Text style={{
                          fontSize:14,
                          lineHeight:20,
                          color:'#909eaa',
                          paddingLeft:24,
                          paddingRight:24,
                          textAlign:'center',
                          marginBottom:26,
                        }}>
                          Cüzdana para yüklemek için yükleme yöntemini seçiniz.
                      </Text>
                      <View style={{
                        padding:16,
                        borderRadius:8,
                        borderColor:'#E4E4E8',
                        borderWidth:1,
                        marginBottom:12,
                      }}>
                        <TouchableOpacity                            
                          onPress={()=>{
                            setAddModalVisible(!addModalVisible);
                            navigation.navigate('wallet', { 
                              screen: 'MasterpassScreen2',
                              params: { 
                                screen: 'ListCards',
                                params: {
                                  card: 'true',
                                }, },
                            })
                            /*navigation.navigate('Account', {
                              screen: 'Settings',
                              params: { user: 'jane' },
                            });*/
                          }}>
                        <View style={{
                          flexDirection:'row',
                          alignItems:'center',
                          justifyContent:'space-between',
                          paddingBottom:8,  
                          borderBottomWidth:1,
                          borderBottomColor:'#E4E4E8',                        
                        }}>
                          <View style={{
                            flexDirection:'row',
                            alignItems:'center',
                          }}>
                            <Image
                              source={require('../../assets/img/export/add_masterpass.png')}
                              style={{
                                width: 24,
                                height: 24,
                                resizeMode: 'contain',
                                marginRight:8,
                              }}
                            />
                            <Text style={{
                              fontSize:14,
                              color:'#004F97',
                            }}>
                              Banka / Kredi Kartı ile Yükle
                            </Text>
                          </View>
                          
                            <Image
                                source={require('../../assets/img/export/arrow_right_dark.png')}
                                style={{
                                  width: 24,
                                  height: 24,
                                  resizeMode: 'contain',
                                }}
                              />
                          
                      </View>
                      
                        <Text style={{
                          fontSize:14,
                          color:'#909eaa',
                          borderTopWidth:1,
                          borderTopColor:'#E4E4E8',
                          paddingTop:8,
                        }}>
                          Masterpass’e kayıtlı kredi ya da banka kartı bilgilerin ile hızlıca para yükleyebilirsiniz.
                        </Text>
                        </TouchableOpacity>
                      </View>
                      
                      <View style={{
                        padding:16,
                        borderRadius:8,
                        borderColor:'#E4E4E8',
                        borderWidth:1,
                        marginBottom:12,
                      }}>
                        
                        <TouchableOpacity
                            
                            onPress={() => {
                              setAddModalVisible(false);
                              setIbanModalVisible(true);}}>
                        <View style={{
                          flexDirection:'row',
                          alignItems:'center',
                          justifyContent:'space-between',
                          paddingBottom:8,
                          borderBottomWidth:1,
                          borderBottomColor:'#E4E4E8',                            
                        }}>
                          
                          <View style={{
                            flexDirection:'row',
                            alignItems:'center',
                          }}>
                            <Image
                              source={require('../../assets/img/export/add_iban.png')}
                              style={{
                                width: 24,
                                height: 24,
                                resizeMode: 'contain',
                                marginRight:8,
                              }}
                            />
                            <Text style={{
                              fontSize:14,
                              color:'#004F97',
                            }}>
                              Havale / EFT ile Yükle
                            </Text>
                          </View>
                          
                            <Image
                                source={require('../../assets/img/export/arrow_right_dark.png')}
                                style={{
                                  width: 24,
                                  height: 24,
                                  resizeMode: 'contain',
                                }}
                              />
                          
                      </View>
                      
                        <Text style={{
                          fontSize:14,
                          color:'#909eaa',
                          borderTopWidth:1,
                          borderTopColor:'#E4E4E8',
                          paddingTop:8,
                        }}>
                          Belirtilen IBAN numarasına Havale / EFT yoluyla para göndererek para yükleyebilirsiniz.
                        </Text>
                        </TouchableOpacity>
                      </View>
                      <View style={{
                        padding:16,
                        borderRadius:8,
                        borderColor:'#E4E4E8',
                        borderWidth:1,                        
                      }}>
                        <TouchableOpacity                            
                            onPress={() => {
                              setAddModalVisible(false);
                              setCashModalVisible(true);}}>
                        <View style={{
                          flexDirection:'row',
                          alignItems:'center',
                          justifyContent:'space-between',
                          paddingBottom:8, 
                          borderBottomWidth:1,
                          borderBottomColor:'#E4E4E8',                           
                        }}>
                          <View style={{
                            flexDirection:'row',
                            alignItems:'center',
                          }}>
                            <Image
                              source={require('../../assets/img/export/add_register.png')}
                              style={{
                                width: 24,
                                height: 24,
                                resizeMode: 'contain',
                                marginRight:8,
                              }}
                            />
                            <Text style={{
                              fontSize:14,
                              color:'#004F97',
                            }}>
                              Kasadan Para Yükle
                            </Text>
                          </View>
                          
                            <Image
                                source={require('../../assets/img/export/arrow_right_dark.png')}
                                style={{
                                  width: 24,
                                  height: 24,
                                  resizeMode: 'contain',
                                }}
                              />
                          
                      </View>
                      
                        <Text style={{
                          fontSize:14,
                          color:'#909eaa',
                          borderTopWidth:1,
                          borderTopColor:'#E4E4E8',
                          paddingTop:8,
                        }}>
                          Kasadan para yüklemek için kasadaki görevliye payfour bilgilerinizi veriniz.
                        </Text>
                        </TouchableOpacity>
                      </View>
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
                  onPress={() => setAddModalVisible(false)}>
                  <Text
                    style={{fontSize: 14, color: '#ffffff'}}>
                    Kapat
                  </Text>
                </TouchableOpacity>
               
              </View>
            </View>
      </Modal>
      <Modal
            animationType="slide"
            transparent={true}
            visible={cashModalVisible}
            onRequestClose={() => {
              setCashModalVisible(!cashModalVisible);
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
                        source={require('../../assets/img/export/payfourid_icon.png')}
                        style={{
                          width: 93,
                          height: 93,
                          resizeMode: 'contain',
                          marginBottom:14,
                        }}
                        />
                  </View>
                  <View style={{
                      marginBottom:24,
                      }}>
                        <Text style={{
                          fontSize:20,
                          fontWeight:'700',
                          color:'#004F97',
                          marginBottom:16,
                          textAlign:'center',
                        }}>
                          Payfour ile online ya da 
                          kasada ödeme yapabilirsiniz!
                        </Text>
                        <Text style={{
                          fontSize:16,
                          lineHeight:20,
                          color:'#004F97',
                          paddingLeft:24,
                          paddingRight:24,
                          textAlign:'center',
                          marginBottom:26,
                        }}>
                          Mağazalarımızdan veya CarrefourSA'ya ait online platformlardan yapacağınız alışverişlerinizi Payfour ile ödemek için aşağıdaki Payfour numarasını veya telefon numaranızı kasiyere söylemeniz veya platformlardaki ilgili alana girmeniz yeterli olacaktır.
                      </Text>
                      <View style={{
                        padding:16,
                        borderRadius:8,
                        backgroundColor:'#F2F4F6',
                        flexDirection:'row',
                        alignItems:'center',
                        justifyContent:'center',
                      }}>
                        <Text style={{
                          fontSize:16,
                          color:'#0B1929',
                        }}>
                          Payfour No:
                        </Text>
                        <Text style={{
                          fontSize:16,
                          color:'#004F97',
                        }}>
                          {payfourId}
                        </Text>
                      </View>
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
                  onPress={() => setCashModalVisible(false)}>
                  <Text
                    style={{fontSize: 14, color: '#ffffff'}}>
                    Kapat
                  </Text>
                </TouchableOpacity>
               
              </View>
            </View>
      </Modal>
      <Modal
            animationType="slide"
            transparent={true}
            visible={ibanModalVisible}
            onRequestClose={() => {
              setIbanModalVisible(!ibanModalVisible);
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
                        source={require('../../assets/img/export/payfoureft_icon.png')}
                        style={{
                          width: 93,
                          height: 93,
                          resizeMode: 'contain',
                          marginBottom:14,
                        }}
                        />
                  </View>
                  <View style={{
                      marginBottom:24,
                      }}>
                        <Text style={{
                          fontSize:20,
                          fontWeight:'700',
                          color:'#004F97',
                          marginBottom:16,
                          textAlign:'center',
                        }}>
                          Havale / EFT Para yükleme bilgileri
                        </Text>
                        <Text style={{
                          fontSize:12,
                          color:'#909EAA',
                          paddingLeft:24,
                          paddingRight:24,
                          textAlign:'center',
                          marginBottom:26,
                        }}>
                          Payfour hesabına para yüklemek için, bankacılık uygulamanıza giriş yaparak size ait banka hesabınız üzerinden aşağıda yer alan hesap bilgilerini kullanarak yükleme yapabilirsiniz.
                      </Text>
                      <Text style={{
                          fontSize:14,
                          fontWeight:'700',
                          color:'#004F97',
                          marginBottom:8,
                          textAlign:'left',
                        }}>
                          Vakıfbank
                        </Text>
                    <View style={[regstyles.registerInputStyle, {borderColor: '#EBEBEB', paddingBottom:10, paddingTop:28,}]}>                       
                      <Text style={{                                           
                          fontSize: 12,
                          lineHeight:12, 
                          padding:0,
                          color: '#909EAA', 
                          position:'absolute',
                          top:14,                     
                          left:14
                      }}>
                        IBAN numarası
                      </Text>
                      <Text
                        style={{                      
                          fontSize: 14,
                          padding:0,
                          color: '#0B1929',
                        }}
                      >
                        TR810001500158007331469750
                      </Text>
                      <TouchableOpacity style={{
                        width:30,
                        height:30,
                        alignItems:'center',
                        justifyContent:'center',
                        position:'absolute',
                        right:10,
                        top:'90%'
                      }}
                      onPress={()=> {
                        Clipboard.setString('TR810001500158007331469750')
                        setShowTooltip1(true);
                        setTimeout(function(){
                          setShowTooltip1(false);
                        }, 3000);
                      }}>
                        <View style={{
                          position:'absolute',
                          backgroundColor:'#004F97',
                          borderRadius:8,
                          width:65,
                          alignItems:'center',
                          justifyContent:'center',
                          padding:4,
                          top:-24,
                          display: showTooltip1 ? 'flex':'none',
                        }}>
                          <Text style={{color:'#fff', fontSize:11}}>Kopyalandı</Text>
                        </View>
                        <Image 
                        source={require('../../assets/img/export/copytoclipboard.png')}
                        style={{
                          width: 16,
                          height: 16,
                          resizeMode: 'contain',
                        }}
                      />
                      </TouchableOpacity>
                    </View>
                    <View style={[regstyles.registerInputStyle, {borderColor: '#EBEBEB', paddingBottom:10,paddingTop:28,}]}>                       
                      <Text style={{                                           
                          fontSize: 12,
                          lineHeight:12, 
                          padding:0,
                          color: '#909EAA', 
                          position:'absolute',
                          top:14,                     
                          left:14
                      }}>
                        Alıcı hesap Adı
                      </Text>
                      <Text
                        style={{                      
                          fontSize: 14,
                          padding:0,
                          color: '#0B1929',
                          width:'80%'
                        }}
                      >
                        CarrefourSA Carrefour Sabancı Ticaret Merkezi A.Ş.
                      </Text>
                      <TouchableOpacity style={{
                        width:30,
                        height:30,
                        alignItems:'center',
                        justifyContent:'center',
                        position:'absolute',
                        right:10,
                        top:'70%'
                      }}
                      onPress={()=> {Clipboard.setString('CarrefourSA Carrefour Sabancı Ticaret Merkezi A.Ş.')
                        setShowTooltip2(true);
                        setTimeout(function(){
                          setShowTooltip2(false);
                        }, 3000);
                      }}>
                        <View style={{
                          position:'absolute',
                          backgroundColor:'#004F97',
                          borderRadius:8,
                          width:65,
                          alignItems:'center',
                          justifyContent:'center',
                          padding:4,
                          top:-24,
                          display: showTooltip2 ? 'flex':'none',
                        }}>
                          <Text style={{color:'#fff', fontSize:11}}>Kopyalandı</Text>
                        </View>
                        <Image 
                        source={require('../../assets/img/export/copytoclipboard.png')}
                        style={{
                          width: 16,
                          height: 16,
                          resizeMode: 'contain',
                        }}
                      />
                      </TouchableOpacity>
                    </View>
                    <View style={[regstyles.registerInputStyle, {borderColor: '#EBEBEB', paddingBottom:10,paddingTop:28,}]}>                       
                      <Text style={{                                           
                          fontSize: 12,
                          lineHeight:12, 
                          padding:0,
                          color: '#909EAA', 
                          position:'absolute',
                          top:14,                     
                          left:14
                      }}>
                        Açıklama
                      </Text>
                      <Text
                        style={{                      
                          fontSize: 14,
                          padding:0,
                          color: '#0B1929',
                          width:'80%'
                        }}
                      >
                        {iban}
                      </Text>
                      <TouchableOpacity style={{
                        width:30,
                        height:30,
                        alignItems:'center',
                        justifyContent:'center',
                        position:'absolute',
                        right:10,
                        top:'90%'
                      }}
                      onPress={()=> {Clipboard.setString(iban)
                        setShowTooltip3(true);
                        setTimeout(function(){
                          setShowTooltip3(false);
                        }, 3000);
                      }}>
                        <View style={{
                          position:'absolute',
                          backgroundColor:'#004F97',
                          borderRadius:8,
                          width:65,
                          alignItems:'center',
                          justifyContent:'center',
                          padding:4,
                          top:-24,
                          display: showTooltip3 ? 'flex':'none',
                        }}>
                          <Text style={{color:'#fff', fontSize:11}}>Kopyalandı</Text>
                        </View>
                        <Image 
                        source={require('../../assets/img/export/copytoclipboard.png')}
                        style={{
                          width: 16,
                          height: 16,
                          resizeMode: 'contain',
                        }}
                      />
                      </TouchableOpacity>
                    </View>
                      {/* <View style={{
                        padding:16,
                        borderRadius:8,
                        backgroundColor:'#F2F4F6',
                        flexDirection:'row',
                        alignItems:'center',
                        justifyContent:'center',
                      }}>
                        <Text style={{
                          fontSize:16,
                          color:'#0B1929',
                        }}>
                        </Text>
                        <Text style={{
                          fontSize:16,
                          color:'#004F97',
                        }}>
                          {iban}
                        </Text>
                      </View> */}
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
                  onPress={() => setIbanModalVisible(false)}>
                  <Text
                    style={{fontSize: 14, color: '#ffffff'}}>
                    Kapat
                  </Text>
                </TouchableOpacity>
               
              </View>
            </View>
      </Modal>
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
                    flexDirection:'row',
                    justifyContent:'flex-end',
                  }}>
                    <TouchableOpacity 
                      style={{
                        width:24,
                        height:24,
                      }}
                      onPress={() => {
                        console.log('close');
                        setModalVisible(false);
                        navigation.navigate('discover')}}>                  
                        <Image 
                        source={require('../../assets/img/export/close.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                        }}
                      />
                    </TouchableOpacity>
                </View>
                  <View style={{
                    paddingTop:24,
                    paddingBottom:24,
                    alignItems:'center',
                    justifyContent:'center',
                  }}>
                    <Image 
                        source={require('../../assets/img/export/information_large.png')}
                        style={{
                          width: 80,
                          height: 80,
                          resizeMode: 'contain',
                          marginBottom:16,
                        }}
                        />
                        <Text style={{
                          fontSize:14,
                          fontWeight:'700',
                          lineHeight:20,
                          color:'#0B1929',
                          marginBottom:8,
                        }}>
                          Bilgilerini Gir
                        </Text>
                        <Text style={{
                          fontSize:14,
                          lineHeight:20,
                          color:'#909EAA',
                          paddingLeft:24,
                          paddingRight:24,
                          textAlign:'center',
                        }}>
                          İşlemi gerçekleştirebilmek için bilgilerini girmen gereklidir.
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
                      onChangeText={UserName => setUsername(UserName)}
                      placeholder="Ad" //12345
                      placeholderTextColor="#909EAA"
                      keyboardType="default"
                      onSubmitEditing={Keyboard.dismiss}
                      blurOnSubmit={false}
                      underlineColorAndroid="#f000"
                      returnKeyType="next"
                    />
                  </View>
                  <View style={[regstyles.registerInputStyle, {borderColor: '#EBEBEB',}]}>            
                    <TextInput
                      style={{                      
                        fontSize: 14,
                        lineHeight:8, 
                        padding:0,
                        color: '#909EAA',
                      }}
                      onChangeText={UserSurname => setUsersurname(UserSurname)}
                      placeholder="Soyad" //12345
                      placeholderTextColor="#909EAA"
                      keyboardType="default"
                      onSubmitEditing={Keyboard.dismiss}
                      blurOnSubmit={false}
                      underlineColorAndroid="#f000"
                      returnKeyType="next"
                    />
                  </View>
                  <View style={[regstyles.registerInputStyle, {borderColor: '#EBEBEB',}]}>            
                    <TextInput
                      style={{                      
                        fontSize: 14,
                        lineHeight:8, 
                        padding:0,
                        color: '#909EAA',
                      }}
                      onChangeText={UserTCKN => setUserTCKN(UserTCKN)}
                      placeholder="TCKN" //12345
                      placeholderTextColor="#909EAA"
                      keyboardType="default"
                      onSubmitEditing={Keyboard.dismiss}
                      blurOnSubmit={false}
                      underlineColorAndroid="#f000"
                      returnKeyType="next"
                    />
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
                      Doğum Tarihi (GG/AA/YYYY)
                    </Text>
                    <MaskInput
                        value={userBirth}
                        keyboardType="numeric"
                        onChangeText={(masked, unmasked) => {
                          //setUserPhone(masked); // you can use the unmasked value as well
                          setUserBirth(masked)
                          // assuming you typed "9" all the way:
                          console.log(masked); // (99) 99999-9999
                          console.log(unmasked); // 99999999999
                          //checkPhone();
                        }}
                        mask={[/\d/, /\d/,'/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                      />
                  </View>
                <View style={{
                  flexDirection:'row',
                  alignItems:'flex-start',
                  paddingTop:16,
                  marginBottom:24,
                }}>
                  <Image 
                    source={require('../../assets/img/export/information.png')}
                    style={{
                      width: 16,
                      height: 16,
                      resizeMode: 'contain',
                      marginRight:10,
                    }}
                    />
                    <Text style={{
                          fontSize:14,
                          lineHeight:20,
                          color:'#909EAA',
                        }}>
                          İşlemi gerçekleştirebilmek için bu bilgileri doğru girmen önemlidir.
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
                  onPress={() => setRegistration()}>
                  <Text
                    style={{fontSize: 14, color: '#ffffff'}}>
                    Kaydını Tamamla
                  </Text>
                </TouchableOpacity>
               
              </View>
            </View>
      </Modal>
      <View style={{height:52}}>
        <View style={{
          display: 'flex', 
          flex:1,         
          flexDirection: 'row',
          justifyContent: 'space-between', 
          alignItems:'center', 
          paddingLeft:16, 
          paddingRight:16, }}> 
          <View style={{width: 90,
                height: 32,}}>
            <Image 
              source={require('../../assets/img/export/payfour_logo.png')}
              style={{
                width: 90,
                height: 32,
                resizeMode: 'contain',
              }}
            />
          </View>
          <View style={{
                  flexDirection:'row',
                  alignItems:'center'}}>
            <TouchableOpacity style={{width: 24,
                  height: 24,marginRight:8}}
                  onPress={()=> navigation.navigate('Notification')}>
              {unreadcount > 0 ? 
              <Image
                source={require('../../assets/img/export/notification.png')}
                style={{
                  width: 24,
                  height: 24,
                  resizeMode: 'contain',
                }}              
              />:
              <Image
                source={require('../../assets/img/export/notification_none.png')}
                style={{
                  width: 24,
                  height: 24,
                  resizeMode: 'contain',
                }}              
              />}
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => {navigation.navigate('Profile')}}
            style={{width:30, height:30,}}>
              <View style={{backgroundColor:'#004F97', width:30, height:30, borderRadius:30, alignItems:'center', justifyContent:'center'}}>
              {initials != '' ? <Text style={{color:'#fff', fontSize:16}}>{initials}</Text> :
                <Image
                    source={require('../../assets/img/export/avatar.png')}
                    style={{
                      width: 30,
                      height: 30,
                    }}
                  />}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Loader loading={loading} />
      <ScrollView keyboardShouldPersistTaps="handled" style={[styles.scrollView, {paddingBottom:120}]}>
        <View style={ {paddingTop: 20}}>
        <View style={[styles.sectionStyle,{marginBottom:16,
              shadowColor:'#909EAA',
              shadowOffset:{
                width:20,
                height:20,
              },
              shadowOpacity:0.5,
              shadowRadius:10,
              elevation:10,
              }]}>
             <View style={{
              backgroundColor:'#004F97',
              borderTopLeftRadius:20,
              borderTopRightRadius:20,
              paddingTop:12,
              paddingBottom:12,
              paddingLeft:16,
              paddingRight:16,
              flexDirection:'row',
              justifyContent:'space-between',
              alignItems:'center',
              display: available=="0,00"? 'none' : 'flex',
              }}>
                <Text style={{color:'#fff', fontSize:12}}>
                  Ön Onaylı Alışveriş Kredisi 
                </Text>
                <Text style={{color:'#fff', fontSize:16, fontWeight:'700'}}>
                  {available} TL
                </Text>
            </View>
            <View style={{
              backgroundColor:'#fff',
              borderTopLeftRadius: available=="0,00"? 20 : 0,
              borderTopRightRadius:available=="0,00"? 20 : 0,
              borderBottomLeftRadius:20,
              borderBottomRightRadius:20,
              paddingTop:16,
              paddingBottom:16,
              paddingLeft:16,
              paddingRight:16,
              
              }}>
                <View style={{flexDirection:'row',
              justifyContent:'space-between',
              alignItems:'flex-start',}}>
                  <View style={{width:Dimensions.get('screen').width-212,flexDirection:'column', alignItems:'flex-start', justifyContent:'space-between'}}>
                    <View style={{width:Dimensions.get('screen').width-212,}}>
                      <Text style={{color:'#909EAA', fontSize:12}}>
                        Güncel Bakiye
                      </Text>
                      <View style={{flexDirection:'row',alignItems:'flex-end',}}>
                        <Text 
                        //editable={false}
                        numberOfLines={1}
                        adjustsFontSizeToFit={true}
                        //secureTextEntry={secureBalance}                        
                        style={{color:'#0B1929',
                          //backgroundColor:'#ff0000',
                        //fontSize: Dimensions.get('window').width > 375 ?32: ((Dimensions.get('window').width > 360)?28:24), 
                        fontSize:32,
                        width:Dimensions.get('screen').width-212,
                        fontWeight:'700',
                        }}>
                          {secureBalance ? '*'.repeat(balance.length) : balance}
                          {(!secureBalance)?
                          <Text style={{color:'#0B1929', fontSize:16, fontWeight:'700', verticalAlign:'sub'}}>
                            TL
                          </Text>
                          :
                          <Text style={{color:'#0B1929', fontSize:16, fontWeight:'700', verticalAlign:'sub'}}>                            
                          </Text>
                          }
                        </Text>
                        
                      </View>
                    </View>
                    
                  </View>
                  <View style={{alignItems:'flex-end'}}>
                    <TouchableOpacity 
                      style={{width:32, height:32, backgroundColor:'#F2F4F6', borderRadius:32, alignItems:'center', justifyContent:'center', marginBottom:8}}
                      onPress={()=> setSecureBalance(!secureBalance)}>
                        {/* {if(secureBalance){
                          return()

                        }else{

                        }} */}
                        {secureBalance? <Image 
                      source={require('../../assets/img/export/eye_off.png')}
                      style={{
                        width:16,
                        height:16
                      }}>
                      </Image> : 
                      <Image 
                      source={require('../../assets/img/export/eye.png')}
                      style={{
                        width:16,
                        height:16
                      }}>
                      </Image>}
                      {/* <Image 
                      source={require('../../assets/img/export/eye.png')}
                      style={{
                        width:16,
                        height:16
                      }}> 
                      </Image>*/}
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={{
                      width:145,
                      height:40,
                      borderRadius:5,
                      backgroundColor:'#005BAA',
                      alignItems:'center',
                      alignContent:'center',
                      justifyContent:'center',
                      marginBottom:16,
                    }}
                    onPress={() => setAddModalVisible(true)}
                    >
                      <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                        <Image 
                      source={require('../../assets/img/export/account_summary_plus.png')}
                      style={{
                        width:16,
                        height:16,
                        marginRight:5
                      }}>
                      </Image>
                      <Text style={{fontSize:14, color:'#fff'}}>
                        Para Yükle
                      </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{
                      borderTopWidth:1,
                      borderColor:'#E4E4E8',
                      paddingTop:12,
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                    }}>
                      <View style={{
                        flexDirection:'row',
                        alignItems:'center',
                      }}>
                      <Image 
                        source={require('../../assets/img/export/icon_card.png')}
                        style={{
                          width:16,
                          resizeMode:'contain',
                          height:16,
                          marginRight:4,
                        }}></Image>
                      <Text style={{fontSize:14, color:'#004F97'}}>Bireysel Kart Toplam Puanı:</Text>
                      </View>
                      <View style={{
                        flexDirection:'row',
                        alignItems:'center',
                        
                      }}>
                      
                      <Text style={{fontSize:12, color:'#004F97', fontWeight:'700'}}>{bonus} TL</Text>
                      <Image 
                        source={require('../../assets/img/export/information.png')}
                        style={{
                          width:16,
                          resizeMode:'contain',
                          height:16,
                          marginLeft:2,
                        }}></Image>
                      </View>
                    </View>
                {/* <View style={{flexDirection:'row',
              justifyContent:'space-between',
              alignItems:'flex-start',}}>
                  <View>
                      <View style={{flexDirection:'row',}}>                        
                        <Text style={{color:'#909EAA', fontSize:14}}>
                          Son İşlem
                        </Text>
                      </View>
                      <Text style={{color:'#909EAA', fontSize:14}}>
                        {transactions.type} {transactions.amount} {transactions.amount == ""? "" : "TL"}
                      </Text>
                  </View>
                  <View>
                    <TouchableOpacity
                    onPress={() => navigation.navigate('wallet', { screen: 'Balance' })}>
                      <Text style={{color:'#004F97', fontSize:14, textAlign:'right'}}>
                        Tümünü Gör
                      </Text>
                    </TouchableOpacity>
                  </View>
              </View> */}
            </View>
          </View>
          <View style={
            [styles.sectionStyle,{marginBottom:24, flexDirection:'row', justifyContent:'center', display:creditStatus != 1 && creditStatus != 3? 'none' : 'flex'}]
          }>
            <TouchableOpacity 
            style={{width:'49%', marginRight:'2%', display:creditStatus == 1? 'flex' : 'none'}}
            onPress={() => navigation.navigate('wallet', { screen: 'CreditScreen',params: {
              screen: 'IntroHazirLimit', }})}
            >
              <Image 
              source={require('../../assets/img/export/button_limit.png')}
              style={{
                width:'100%',
                resizeMode:'contain',
                height:52
              }}>
              </Image>
            </TouchableOpacity>
            <TouchableOpacity style={{width:'49%', display:creditStatus == 1 || creditStatus == 3? 'flex' : 'none'}}
            onPress={() => navigation.navigate('wallet', { screen: 'CreditScreen',params: {
              screen: 'IntroSonraOde', }})}>
              <Image 
              source={require('../../assets/img/export/button_later.png')}
              style={{
                width:'100%',
                resizeMode:'contain',
                height:52
              }}>
              </Image>
            </TouchableOpacity>
          </View>
          
          <View style={{
            backgroundColor:'#F8F8F8',
            paddingTop:20,
            borderTopLeftRadius:20,
            borderTopRightRadius:20, 
            paddingBottom:40     
          }}>
            {/* <View style={{flex:1, marginBottom:16}}>
              <Image 
                source={require('../../assets/img/export/awards.png')}
                style={{
                  resizeMode:'contain',
                  width:(Dimensions.get('window').width - 32),
                  height:(Dimensions.get('window').width - 32)*0.218,
                  left:16
                }}>
                </Image>
                
            </View> */}
            <TouchableOpacity style={{}}
            onPress={()=> {
              console.log('maincampaign');
              console.log(campaignDetailData);
              let navObj = {
                screen: 'CampaignDetail',
                  params: {id: campaignDetailData.id, source:'discover'}
              }
              console.log(navObj);
              navigation.navigate('campaign', navObj)
              }}>
              <View style={{paddingLeft:16, paddingRight:16}}>
                <View style={{paddingBottom:20}}>
                  <View style={{
                  backgroundColor:'#F2F4F6',
                  paddingTop:16,
                  paddingBottom:16,
                  paddingLeft:16,
                  paddingRight:16,              
                  borderRadius:6, 
                  backgroundColor:'#e3ecf4'
                }}>
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                  <View style={{width:Dimensions.get('window').width - 120}}>
                    <Text style={{
                      fontSize:14,
                      lineHeight:16,
                      color:'#0B1929',
                      textAlign:'center',
                      marginBottom:12,
                    }}>
                      
                      Ödemenizi <Text style={{fontWeight:700, color:'#004F97'}}>Payfour</Text> ile yaparak puan kazanın.
                    </Text>
                    <View style={{paddingBottom:20}}>
                      <View style={{
                        width:'100%',
                        height:8,
                        backgroundColor:'#fff',
                        borderRadius:12
                        }}>
                        {/* barbg */}
                        <View style={{
                          width:'100%',
                          height:8,
                          position:'absolute',
                          top:0,
                          left:0,
                          zIndex:5,
                          borderRadius:12,
                          overflow:'hidden',
                        }}>
                          {/* barfill */}
                          
                          <LinearGradient 
                          start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 0.0}}
                          locations={[0,0.34,1]}
                          colors={['#7EBEF5', '#005BAA', '#ED1C67']} 
                          style={{
                            width:campaignDetailData.barLines.length > 0 ? (Dimensions.get('window').width - 120) / (campaignDetailData.barLines.length-1) * campaignDetailData.memberCurrentCount :0,
                            //width:'100%',
                            height:8,
                            borderTopLeftRadius:12,
                            borderBottomLeftRadius:12,
                          }}>

                          </LinearGradient>
                        </View>
                        <View style={{
                          width:'100%',
                          height:8,
                          position:'absolute',
                          top:0,
                          left:0,
                          borderRadius:12,
                          zIndex:6
                        }}>
                          {/* barlines */}
                          {
                          [...Array(campaignDetailData.barLines.length).keys()].map(key => {
                            /*console.log("barLines ");
                            console.log(campaignDetailData.barLines);
                            console.log("barLines "+campaignDetailData.barLines.length);
                            console.log("key "+key);
                            console.log(campaignDetailData.barLines[key].key);*/
                          return (
                            campaignDetailData.barLines.length > 0 && key != 0 && key !=campaignDetailData.barLines.length-1? 
                            <View key={campaignDetailData.barLines[key].key}
                            style={{
                              position:'absolute',
                              top:0,
                              //left:20 * campaignDetailData.barLines[key].point,
                              left: campaignDetailData.barLines.length > 0 ? (Dimensions.get('window').width - 120) / (campaignDetailData.barLines.length-1) * campaignDetailData.barLines[key].point : 0,
                              //left: campaignDetailData.barLines.length > 0 ? ((Dimensions.get('window').width - 120) / (campaignDetailData.barLines.length - 1) * campaignDetailData.barLines[key].point)-5 : 0,
                              height:8,
                              width:2,
                              backgroundColor: campaignDetailData.memberCurrentCount > 0 ? '#fff' : '#e3ecf4'
                            }}>
                              {/* <Text style={{textAlign:'center'}}>{campaignDetailData.barLines[key].point}</Text> */}
                            </View>
                            : <View key={campaignDetailData.barLines[key].key}></View>
                          )
                        })
                        }
                          
                        </View>
                        
                        <View style={{
                          width:'100%',
                          height:8,
                          position:'absolute',
                          top:0,
                          left:0,
                          borderRadius:12
                        }}>
                        {
                          [...Array(campaignDetailData.barLines.length).keys()].map(key => {
                            /*console.log("barLines ");
                            console.log(campaignDetailData.barLines);
                            console.log("barLines "+campaignDetailData.barLines.length);
                            console.log("key "+key);
                            console.log(campaignDetailData.barLines[key].key);*/
                          return (
                            campaignDetailData.barLines.length > 0 && campaignDetailData.barLines[key].point != "0"? 
                            <View key={"b"+campaignDetailData.barLines[key].key}
                            style={{
                              position:'absolute',
                              top:20,
                              //left:20 * campaignDetailData.barLines[key].point,
                              //left: (Dimensions.get('window').width - 132) / (campaignDetailData.barLines.length-1) * campaignDetailData.barLines[key].point,
                              //left: campaignDetailData.barLines.length > 0 ? (Dimensions.get('window').width - 126) / (campaignDetailData.barLines.length-1) * campaignDetailData.barLines[key].point : 0,
                              left: campaignDetailData.barLines.length > 0 ? ((Dimensions.get('window').width - 120) / (campaignDetailData.barLines.length - 1) * campaignDetailData.barLines[key].point)-5 : 0,
                              height:16,
                              width:12,
                            }}>
                              <Text style={{
                                fontSize:10,
                                color:'#004F97', 
                                textAlign:'center',
                              }}>{campaignDetailData.barLines[key].point}</Text>
                            </View>
                            : <View key={"b"+campaignDetailData.barLines[key].key}></View>
                          )
                        })
                        }
                        </View>
                      </View>
                    </View>
                    </View>
                  
                  <View style={{width:45, height:45, alignItems:'center', justifyContent:'center'}}>
                    <Image 
                      source={require('../../assets/img/export/main_campaign_badge.png')}
                      style={{
                        resizeMode:'contain',
                        width:45,
                        height:45,
                        top:0,
                        left:0,
                        position:'absolute',

                      }}>
                      </Image>
                      <View style={{}}>
                        <Text style={{color:'#fff', fontSize:10, fontWeight:'700', textAlign:'center'}}>{campaignDetailData.targetAward} TL</Text>
                        <Text style={{color:'#fff', fontSize:8, textAlign:'center'}}>Puan</Text>
                      </View>
                  </View>
                  </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            
            
              
             
            <LinearGradient colors={['#067FC4', '#431836']} style={styles.linearGradient}>
              <View style={{paddingLeft:16, paddingRight:16, paddingTop:16, paddingBottom:16}}>
                <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', marginBottom:8}}>
                  <Text style={[styles.titleText, {color:'#fff', fontWeight:'700'}]}>
                    Platin Kampanyalar
                  </Text>
                  <TouchableOpacity 
                  onPress={() => navigation.navigate('campaign', { 
                    screen: 'CampaignList',
                    params: {
                      filters:{isAw:true, isSp:false}
                    }
                  })}
                  style={{
                    flexDirection:'row',
                    alignItems:'center',
                  }}>
                    <Text style={{fontSize:12, color:'#fff', marginRight:4}}>
                      Tümü
                    </Text>
                    <Image 
                      source={require('../../assets/img/export/right_arrow_white.png')}
                      style={{
                        resizeMode:'contain',
                        width:16,
                        height:16,
                      }}>
                      </Image>
                  </TouchableOpacity>
                
                </View>
                <View style={[slstyles.slider, {marginBottom:20,paddingBottom:40, overflow:'visible'}]} {...slider.containerProps}>
                {
                  [...Array(slides).keys()].map(key => {
                    /*console.log("psldata "+pslData.length);
                    console.log("key "+key);*/
                  return (
                    pslData.length > 0 ? 
                    <View key={pslData[key].uid} {...slider.slidesProps[key]}>
                      <View style={{...slstyles.slide}} 
                      {...onPressConfig(() => {
                        console.log("onPress");
                        console.log(pslData[key])
                        try {
                          //if (item?.img) {
                            //Linking.openURL(item.img);
                            let sid= pslData[key].id;
                            let navObj = {
                              screen: 'CampaignDetail',
                                params: {id: sid, source:'discover'}
                            }
                            //console.log(navObj);
                            navigation.navigate('campaign', navObj)
                          //}
                        } catch (error) {}
                      })}>
                      <View >
                        <Image 
                          // source={slimages[key]}
                          source={{
                            uri: pslData[key].thumbnailUrl,
                          }}
                          style={[slstyles.slideImg, {
                            resizeMode: 'cover',
                          }]}
                        />
                        </View>                          
                          <Text style={{
                            fontSize:12,
                            lineHeight:18,
                            color:'#0B1929',
                            marginBottom:8,
                            minHeight:36,
                          }}>
                            {pslData[key].title}
                          </Text>
                          <View style={{
                            flexDirection:'row',
                            alignItems:'center',
                            justifyContent:'flex-start',
                          }}>
                          <Image 
                          source={require('../../assets/img/export/time-oclock.png')}
                          style={{
                            resizeMode:'contain',
                            width:10,
                            height:10,
                            marginRight:4,
                            tintColor: '#28303F',
                          }}>
                          </Image>
                            <Text style={{
                              fontSize:10,
                              color:'#909EAA',
                            }}>
                            Son gün {pslData[key].time}
                            </Text>
                          </View>
                      
                      </View>
                    </View>
                    : <View key={"Premium_empty"+key}></View>
                  )
                })
                }
              </View>
                {/* <TouchableOpacity style={{ flex:1, flexDirection:'row', display:isPremium?'none':'flex'}}
                onPress={()=>{
                  navigation.navigate('Profile', { 
                    screen: 'ProfilePlatinum',
                    //screen: 'MasterpassScreen2',
                    //screen: 'MasterPassExample',
                  })
                }}>
                <Image 
                source={require('../../assets/img/export/premium.png')}
                style={{
                  resizeMode:'contain',
                  width:(Dimensions.get('window').width - 32),
                  height:(Dimensions.get('window').width - 32)*0.139,
                }}>
                </Image>
                </TouchableOpacity> */}
                <TouchableOpacity style={{display:isPremium?'none':'flex'}}
                onPress={()=> navigation.navigate('Profile', { 
                  screen: 'ProfilePlatinum',
                  //screen: 'MasterpassScreen2',
                  //screen: 'MasterPassExample',
                })}>
                <View style={{
                  width:(Dimensions.get('window').width - 32),
                  height:(Dimensions.get('window').width - 32)*0.15,
                }}>
                <Image
                        source={require('../../assets/img/export/item.png')}
                        style={{
                          resizeMode:'contain',
                    width:(Dimensions.get('window').width - 32),
                    height:(Dimensions.get('window').width - 32)*0.15,
                        }}
                    />
              </View>
              </TouchableOpacity>
                
              </View>
            </LinearGradient>
          
            <View style={{paddingLeft:16, paddingRight:16, paddingTop:16, paddingBottom:16}}>
              <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', marginBottom:8}}>
                <Text style={[styles.titleText, {color:'#0B1929', fontWeight:'700'}]}>
                  Sana Özel Kampanyalar
                </Text>
                <TouchableOpacity 
                  onPress={() => navigation.navigate('campaign', { 
                    screen: 'CampaignList',
                    params: {
                      filters:{isAw:false, isSp:true}
                    }
                  })}
                  style={{
                    flexDirection:'row',
                    alignItems:'center',
                  }}>
                  <Text style={{fontSize:12, color:'#004F97'}}>
                    Tümü
                  </Text>
                  <Image 
                      source={require('../../assets/img/export/right_arrow_blue.png')}
                      style={{
                        resizeMode:'contain',
                        width:16,
                        height:16,
                      }}>
                      </Image>
                </TouchableOpacity>
              </View>
              <View style={{paddingBottom:20}}>
                
                <View style={[slstyles.slider, {paddingBottom:40, overflow:'visible'}]} {...slider2.containerProps}>
                {
                    [...Array(slides).keys()].map(key => {
                      /*console.log("sldata "+slData.length);
                      console.log("sldata "+slData);
                      console.log("sldata ");
                      console.log(slData[key])
                      console.log("key "+key);*/
                    return (
                      slData.length > 0 ? 
                      <View key={slData[key].uid} {...slider2.slidesProps[key]}>
                        <View style={{...slstyles.slide}} 
                        {...onPressConfig(() => {
                          console.log("onPress");
                          console.log(slData[key])
                          try {
                            //if (item?.img) {
                              //Linking.openURL(item.img);
                              let sid= slData[key].id;
                              let navObj = {
                                screen: 'CampaignDetail',
                                  params: {id: sid, source:'discover'}
                              }
                              //console.log(navObj);
                              navigation.navigate('campaign', navObj)
                            //}
                          } catch (error) {}
                        })}>
                          <View onPress={() => {
                        let sid= slData[key].id;
                        //console.log("sliderid "+sid);
                        let navObj = {
                          screen: 'CampaignDetail',
                            params: {id: sid, source:'discover'}
                        }
                        //console.log(navObj);
                        navigation.navigate('campaign', navObj)}}>
                          <Image 
                            // source={slimages[key]}
                            source={{
                              uri: slData[key].thumbnailUrl,
                            }}
                            style={[slstyles.slideImg, {
                              resizeMode: 'cover',
                            }]}
                          />
                          </View>
                            {/* <View style={{
                              flexDirection:'row',
                              alignItems:'center',
                              justifyContent:'space-between',
                              marginBottom:8,
                            }}>
                              <View style={{
                                width:32,
                                height:32, 
                                borderRadius:32,
                                borderWidth:1,
                                borderColor:'#F2F4F6',
                              }}></View>
                              <View style={{
                                borderRadius:4,
                                backgroundColor:'rgba(26,167,63,0.2)',
                                paddingLeft:8,
                                paddingRight:8,
                                paddingTop:4,
                                paddingBottom:4,
                              }}>
                                <Text style={{
                                  color:'#1AA73F',
                                  fontSize:10,
                                }}>
                                  Akaryakıt
                                </Text>
                              </View>
                            </View> */}
                            <Text style={{
                              fontSize:12,
                              lineHeight:18,
                              color:'#0B1929',
                              marginBottom:8,
                            }}>
                              {slData[key].title}
                            </Text>
                            <View style={{
                              flexDirection:'row',
                              alignItems:'center',
                              justifyContent:'flex-start',
                            }}>
                            <Image 
                            source={require('../../assets/img/export/time-oclock.png')}
                            style={{
                              resizeMode:'contain',
                              width:10,
                              height:10,
                              marginRight:4,
                              tintColor: '#28303F',
                            }}>
                            </Image>
                              <Text style={{
                                fontSize:10,
                                color:'#909EAA',
                              }}>
                              Son gün {slData[key].time}
                              </Text>
                            </View>
                        
                        </View>
                      </View>
                      : <View key={"Foryou_empty"+key}></View>
                    )
                  })
                  }
                </View>
              </View>
            </View>
            <TouchableOpacity style={{flex:1, paddingLeft:16, paddingRight:16, marginBottom:16}}>
              <Image 
                source={require('../../assets/img/export/nearest.png')}
                style={{
                  resizeMode:'contain',
                  width:(Dimensions.get('window').width - 32),
                  height:(Dimensions.get('window').width - 32)*0.202,
                  marginBottom:16
                }}>
                </Image>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );

}
const DiscoverScreen = ({navigation}) => {
  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     navigation.navigate('Balance');
  //   });
  //   return unsubscribe;
  // }, [navigation]);

  return (
    <Stack.Navigator initialRouteName="Discover">
      <Stack.Screen
        name="Discover"
        component={Discover}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CheckWaitingScreen"
        component={CheckWaitingScreen}
        //options={{headerShown: false}}
        options={{ headerShown: false, presentation: 'transparentModal' }}
      />
      <Stack.Screen
        name="PayScreen"
        component={PayScreen}
        //options={{headerShown: false}}
        options={{ headerShown: false, presentation: 'transparentModal' }}
      />
      <Stack.Screen
        name="PayOptionsScreen"
        component={PayOptionsScreen}
        //options={{headerShown: false}}
        options={{ headerShown: false, presentation: 'transparentModal' }}
      />
      <Stack.Screen
        name="PayOptionsScreen2"
        component={PayOptionsScreen2}
        //options={{headerShown: false}}
        options={{ headerShown: false, presentation: 'transparentModal' }}
      />
      <Stack.Screen
        name="Notification"
        component={NotificationScreen}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name="IbanScreen"
        component={IbanScreen}
        //options={{headerShown: false}}
        options={{ headerShown: false, presentation: 'transparentModal' }}
      />
      <Stack.Screen
        name="CashScreen"
        component={CashScreen}
        //options={{headerShown: false}}
        options={{ headerShown: false, presentation: 'transparentModal' }}
      /> */}
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
const slstyles = {
  slider: {
    backgroundColor: 'transparent',
    overflow: 'hidden',
    width: '100%',
    height: Dimensions.get('window').width*0.5,
    //minHeight: Dimensions.get('window').width*0.5,
    //height:'100%',
  },
  slide: {
    width: (Dimensions.get('window').width*0.437),
    padding:8,
    // alignItems: 'center',
    // justifyContent: 'center',
    overflow:'visible',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
    backgroundColor:'#fff',
    borderRadius:8,
    marginBottom:20,
    //height:'140%'
    
  },
  slideImg:{
    width: Dimensions.get('window').width*0.394,
    //height:Dimensions.get('window').width*0.186,
    height:Dimensions.get('window').width*0.32,
    borderRadius:4,
    marginBottom:8,
  },
  text: {
    color: 'white',
    fontSize: 30,
  },
}

export default DiscoverScreen;


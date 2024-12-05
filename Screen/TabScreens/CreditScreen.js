/* eslint-disable react-native/no-inline-istyles */
// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useEffect, useState, useRef} from 'react';
import {ActivityIndicator, View, Stylesheet, Modal, Image, Pressable, ImageBackground, TouchableOpacity, Text, TextInput, Dimensions, StyleSheet, SafeAreaView, Keyboard, KeyboardAvoidingView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createStackNavigator} from '@react-navigation/stack';
import {styles} from '../Components/Styles.js';
import Loader from '../Components/Loader.js';
import TabHeader from '../Components/TabHeader.js';
import Clipboard from '@react-native-clipboard/clipboard';
import {ScrollView} from 'react-native-gesture-handler';
import Swiper from 'react-native-swiper';

import axios from 'react-native-axios';
import MaskInput from 'react-native-mask-input';
import SubtabHeader from '../Components/SubtabHeader.js';
import {Dropdown} from 'react-native-element-dropdown';

const Stack = createStackNavigator();

const Intro = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [animating, setAnimating] = useState(true);
  const [slideEnd, setSlideEnd] = useState(false);
  const [userKVKKAgreement, setUserKVKKAgreement] = useState(false);
  const sliderRef = useRef();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      
    });
    return unsubscribe;
  }, [navigation]);


  return (
    <View style={istyles.container}>
      <ImageBackground
       style={[istyles.bgimg, {flex:1, width:'100%', backgroundColor:'#fff'}]}
       resizeMode="cover"
       source={require('../../assets/img/export/hazir_limit_bg.png')}>
        {/* <View style={{
          flexDirection:'row',
          justifyContent:'space-between',
          alignItems:'center',
          paddingRight:16,
        }}>
        <Image
          source={require('../../assets/img/export/payfour_logo.png')}
          style={{width: 113, height:40, resizeMode: 'contain', margin: 30}}
        />
        <TouchableOpacity style={{
          width:57,
          height:28,
          backgroundColor:'#dce9f3',
          borderRadius:16,
          alignItems:'center',
          justifyContent:'center',
        }}
        //onPress={skipIntro}
        >
          <Text style={{fontSize:14, color:'#004F97'}}>Atla</Text>
        </TouchableOpacity>
        </View> */}
        <Swiper 
        style={istyles.wrapper}
        ref={sliderRef}
        loop={false}
        onMomentumScrollEnd={(e, state, context) =>{
          /*console.log('index:', state.index);
          console.log('total:', state.total);
          let end = (state.index+1) == state.total;
          console.log("end? "+end);*/
          //console.log(sliderRef.current.);
        }}
        onIndexChanged={(index) =>{
          console.log('index:', index);
          let end =  index ==3;
          console.log("end? "+end);
          setSlideEnd(end);
        }}
        paginationStyle={{
          //top:'-90%',
          top:50,
          bottom:'auto',
          width: Dimensions.get('window').width - 16,
          paddingLeft:16
        }}
        dot={
          <View
            style={{
              backgroundColor: "#fff",
              width: '50%',
              height: 6,
              borderRadius: 4,
              marginLeft: 6,
              marginRight: 6,
              marginTop: 3,
              marginBottom: 3,
              opacity:0.5
            }}
          />
        }
        activeDot={
          <View
            style={{
              backgroundColor: '#fff',
              width: '50%',
              height: 6,
              borderRadius: 6,
              marginLeft: 6,
              marginRight: 6,
              marginTop: 3,
              marginBottom: 3
            }}
          />
        }>
          <View style={[istyles.slide1, {paddingTop:100}]}>
            <View style={{flexDirection:'row', alignItems:'center', width:'100%', paddingLeft:16, marginBottom:20}}>
              <Image
              source={require('../../assets/img/export/hazir_limit_icon.png')}
              style={{
                width: 36, 
                height:36, 
                marginRight:10,
                resizeMode: 'contain'}}
              /> 
              <Text style={{fontSize:14, color:'#004F97'}}>Hazır Limit</Text>
            </View>
            <Image
          source={require('../../assets/img/export/hazir_limit_1.png')}
          style={{
            width: Dimensions.get('window').height*0.364, 
            height:Dimensions.get('window').height * 0.309, 
            resizeMode: 'contain'}}
          /> 
          <View style={istyles.header}>
              <Text style={istyles.text}>Hazır Limit Nedir? 
              Ne İşe Yarar?</Text>
            </View>
          <View style={istyles.bottomTextHolder}>
            <Text style={[istyles.bottomText, {fontSize:14, marginBottom:16}]}>
            Hazır Limit, CarrefourSA alışverişlerinizde başvuru adımlarınızı tamamladıktan sonra kullanabileceğiniz size özel tanımlanan alışveriş kredisi limit tutarınızdır. Alışveriş yaptıktan sonra ödemesini size özel sunulan vade oranı, erteleme ve taksit seçeneklerine göre gerçekleştirebilirsiniz.
            </Text>
            <Text style={[istyles.bottomText, {fontSize:14}]}>
            Nakit ya da kredi kartı limiti kullanmak istemiyorsanız veya kredi kartınız yoksa hazır limit sayesinde alışverişinizi yapıp ödemesini sonra gerçekleştirebilirsiniz.
            </Text>
          </View>
          </View>
          <View style={[istyles.slide2, {paddingTop:100}]}>
          <View style={{flexDirection:'row', alignItems:'center', width:'100%', paddingLeft:16, marginBottom:20}}>
              <Image
              source={require('../../assets/img/export/hazir_limit_icon.png')}
              style={{
                width: 36, 
                height:36, 
                marginRight:10,
                resizeMode: 'contain'}}
              /> 
              <Text style={{fontSize:14, color:'#004F97'}}>Hazır Limit</Text>
            </View>
            <Image
          source={require('../../assets/img/export/hazir_limit_2.png')}
          style={{
            width: Dimensions.get('window').height*0.4049, 
            height:Dimensions.get('window').height * 0.326, 
            resizeMode: 'contain'}}
        />
        <View style={istyles.header}>
              <Text style={istyles.text}>Hazır Limit Geri Ödemesini Nasıl Yaparım?</Text>
            </View>
        <View style={istyles.bottomTextHolder}>
            <Text style={[istyles.bottomText, {fontSize:14, marginBottom:32}]}>
            Size özel sunulan taksit ve vade seçeneklerinden dilediğinizi seçtikten sonra size özel üretilen IBAN'a geri ödemenizi hızlı ve kolay şekilde gerçekleştirebilirsiniz.
            </Text>
          </View>
          <View style={{
                  marginBottom:22,
                  alignItems:'center',
                  flexDirection:'row',
                  paddingRight:32,
                  paddingLeft:32,
                  }}>
                  <Pressable
                    style={{
                    width:20,
                    height:20,
                    marginRight:8,
                    backgroundColor:userKVKKAgreement ? '#015096':'#dadee7',
                    borderRadius:5,
                    alignItems:'center',
                    justifyContent:'center'
                    }}
                    onPress={()=>setUserKVKKAgreement(!userKVKKAgreement)}>
                      <Image
                      source={require('../../assets/img/export/check.png')}
                      style={{
                      width: userKVKKAgreement ? 14 : 0,
                      height: userKVKKAgreement ? 10 : 0,
                      resizeMode: 'contain',
                      }}
                      />
                  </Pressable>  
                  <Text style={{
                  fontWeight:'300',
                  color:'#1E242F',
                  fontSize:12,
                  
                  }}>
                  Kişisel verilerin korunması, işlenmesi ve aktarılmasına ilişkin <Text style={{color:'#015096', textDecorationLine:'underline', fontWeight:'700'}}>Açık Rıza Formu’nu</Text> onaylıyorum.
                  </Text>
                  </View>
            <View>
            <TouchableOpacity
                style={[styles.buttonStyle, {width:Dimensions.get('window').width - 32, backgroundColor: '#004F97'}]}
                //disabled={!toggleSubmit}
                activeOpacity={0.5}
                onPress={()=>{
                  navigation.navigate('CreditForm');
                }
                  }>
                <Text style={styles.buttonTextStyle}>Hazır Limitini Öğren</Text>
              </TouchableOpacity>
            </View>
          </View>
          
        </Swiper>
      
      </ImageBackground>
    </View>
  );
};
const Intro2 = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [animating, setAnimating] = useState(true);
  const [slideEnd, setSlideEnd] = useState(false);
  const sliderRef = useRef();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      
    });
    return unsubscribe;
  }, [navigation]);


  return (
    <View style={istyles.container}>
      <ImageBackground
       style={[istyles.bgimg, {flex:1, width:'100%', backgroundColor:'#fff'}]}
       resizeMode="cover"
       source={require('../../assets/img/export/sonra_ode_bg.png')}>
        {/* <View style={{
          flexDirection:'row',
          justifyContent:'space-between',
          alignItems:'center',
          paddingRight:16,
        }}>
        <Image
          source={require('../../assets/img/export/payfour_logo.png')}
          style={{width: 113, height:40, resizeMode: 'contain', margin: 30}}
        />
        <TouchableOpacity style={{
          width:57,
          height:28,
          backgroundColor:'#dce9f3',
          borderRadius:16,
          alignItems:'center',
          justifyContent:'center',
        }}
        //onPress={skipIntro}
        >
          <Text style={{fontSize:14, color:'#004F97'}}>Atla</Text>
        </TouchableOpacity>
        </View> */}
        <Swiper 
        style={istyles.wrapper}
        ref={sliderRef}
        loop={false}
        onMomentumScrollEnd={(e, state, context) =>{
          /*console.log('index:', state.index);
          console.log('total:', state.total);
          let end = (state.index+1) == state.total;
          console.log("end? "+end);*/
          //console.log(sliderRef.current.);
        }}
        onIndexChanged={(index) =>{
          console.log('index:', index);
          let end =  index ==3;
          console.log("end? "+end);
          setSlideEnd(end);
        }}
        paginationStyle={{
          //top:'-90%',
          top:50,
          bottom:'auto',
          width: Dimensions.get('window').width - 16,
          paddingLeft:16
        }}
        dot={
          <View
            style={{
              backgroundColor: "#fff",
              width: '50%',
              height: 6,
              borderRadius: 4,
              marginLeft: 6,
              marginRight: 6,
              marginTop: 3,
              marginBottom: 3,
              opacity:0.5
            }}
          />
        }
        activeDot={
          <View
            style={{
              backgroundColor: '#fff',
              width: '50%',
              height: 6,
              borderRadius: 6,
              marginLeft: 6,
              marginRight: 6,
              marginTop: 3,
              marginBottom: 3
            }}
          />
        }>
          <View style={[istyles.slide1, {paddingTop:100}]}>
          <View style={{flexDirection:'row', alignItems:'center', width:'100%', paddingLeft:16, marginBottom:20}}>
              <Image
              source={require('../../assets/img/export/sonra_ode_icon.png')}
              style={{
                width: 36, 
                height:36, 
                marginRight:10,
                resizeMode: 'contain'}}
              /> 
              <Text style={{fontSize:14, color:'#004F97'}}>Şimdi Al Sonra Öde</Text>
            </View>
            <Image
          source={require('../../assets/img/export/hazir_limit_1.png')}
          style={{
            width: Dimensions.get('window').height*0.364, 
            height:Dimensions.get('window').height * 0.309, 
            resizeMode: 'contain'}}
          /> 
          <View style={istyles.header}>
              <Text style={istyles.text}>Şimdi Al Sonra Öde Nedir? 
              Ne İşe Yarar?</Text>
            </View>
          <View style={istyles.bottomTextHolder}>
            <Text style={[istyles.bottomText, {fontSize:14, marginBottom:16}]}>
            Şimdi Al Sonra Öde, Hazır Limitinize uygun şekilde yapacağınız alışverişleri size uygun taksit ve vade seçenekleri ile hemen alıp ödemesini daha sonra yapabileceğiniz bir ayrıcalıktır.
            </Text>            
          </View>
          </View>
          <View style={[istyles.slide2, {paddingTop:100}]}>
          <View style={{flexDirection:'row', alignItems:'center', width:'100%', paddingLeft:16, marginBottom:20}}>
              <Image
              source={require('../../assets/img/export/sonra_ode_icon.png')}
              style={{
                width: 36, 
                height:36, 
                marginRight:10,
                resizeMode: 'contain'}}
              /> 
              <Text style={{fontSize:14, color:'#004F97'}}>Şimdi Al Sonra Öde</Text>
            </View>
            <Image
          source={require('../../assets/img/export/hazir_limit_2.png')}
          style={{
            width: Dimensions.get('window').height*0.4049, 
            height:Dimensions.get('window').height * 0.326, 
            resizeMode: 'contain'}}
        />
        <View style={istyles.header}>
              <Text style={istyles.text}>Şimdi Al Sonra Öde'nin Geri Ödemesini Nasıl Yapabilirim?</Text>
            </View>
        <View style={istyles.bottomTextHolder}>
            <Text style={[istyles.bottomText, {fontSize:14, marginBottom:32}]}>
            Size özel sunulan taksit ve vade seçeneklerinden dilediğinizi seçtikten sonra size özel üretilen IBAN'a geri ödemenizi hızlı ve kolay şekilde gerçekleştirebilirsiniz.
            </Text>
          </View>
            <View>
            <TouchableOpacity
                style={[styles.buttonStyle, {width:Dimensions.get('window').width - 32, backgroundColor: '#004F97'}]}
                //disabled={!toggleSubmit}
                activeOpacity={0.5}
                onPress={()=>{
                  navigation.navigate('Kvc')
                }
                  }>
                <Text style={styles.buttonTextStyle}>Şimdi Kredi Kullan</Text>
              </TouchableOpacity>
            </View>
          </View>
          
        </Swiper>
      
      </ImageBackground>
    </View>
  );
};
const CreditForm = ({route, navigation}) => {
  const [loading, setLoading] = useState(false);
  const [offerData, setOfferData] = useState({
    advertiser_id: '0',
    commission: '0',
    commission_model: ' ',
    default_url: '',
    description: '',
    offer_id: '',
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const [otp, setOtp] = useState(false);
  const [stopOtpTimer, setStopOtpTimer] = useState(false);
  const [timerCount, setTimerCount] = useState(180);
  const [timerText, setTimerText] = useState('03:00');
  const [resetTimer, setResetTimer] = useState(false);

  const [educationData, setEducationData] = useState([]);
  const [jobData, setJobData] = useState([]);
  const [titleData, setTitleData] = useState([]);

  const [selectedEducation, setSelectedEducation] = useState('');
  const [selectedJob, setSelectedJob] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('');

  const [userTCKN, setUserTCKN] = useState('');
  const [userBirth, setUserBirth] = useState('');

  const [income, setIncome] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [tempToken, setTempToken] = useState('');

  const [userKVKKAgreement, setUserKVKKAgreement] = useState(false);
  const [dgfinShareAgreement, setDgfinShareAgreement] = useState(false);
  const [dgfinUserAgreement, setDgfinUserAgreement] = useState(false);
  const [dgfinCreditAgreement, setDgfinCreditAgreement] = useState(false);
  const [dgfinKVKKAgreement, setDgfinKVKKAgreement] = useState(false);

  const eduRef = useRef();
  const jobRef = useRef();
  const titleRef = useRef();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fillEducation();
      
    });
    return unsubscribe;
  }, []);
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
  const fillEducation = () =>{
    setLoading(true);   
    AsyncStorage.getItem('token').then(value =>{
      const config = {
        headers: { Authorization: `Bearer ${value}` }
      };    
      axios.get('https://payfourapp.test.kodegon.com/api/loans/educationlevels', config).then(response => {
        setLoading(false);
        console.log("oneducation");
        console.log(response);
        console.log(response.data.data);
        setEducationData(response.data.data);
        fillJobs();
      })
      .catch(error => {
        setLoading(false);
        //console.error("Error sending data: ", error);
        let msg="";
        (error.response.data.errors.message) ? msg += error.response.data.errors.message+"\n" : msg += "Ödeme hatası \n"; (error.response.data.errors.paymentError) ? msg += error.response.data.errors.paymentError+"\n" : msg += ""; Alert.alert(msg);
      });
    });
  }
  const fillJobs = () =>{
    setLoading(true);   
    AsyncStorage.getItem('token').then(value =>{
      const config = {
        headers: { Authorization: `Bearer ${value}` }
      };    
      axios.get('https://payfourapp.test.kodegon.com/api/loans/occupations', config).then(response => {
        setLoading(false);
        console.log("onoccupations");
        console.log(response);
        console.log(response.data.data);
        setJobData(response.data.data);
        fillRoles();
      })
      .catch(error => {
        setLoading(false);
        //console.error("Error sending data: ", error);
        let msg="";
        (error.response.data.errors.message) ? msg += error.response.data.errors.message+"\n" : msg += "Ödeme hatası \n"; (error.response.data.errors.paymentError) ? msg += error.response.data.errors.paymentError+"\n" : msg += ""; Alert.alert(msg);
      });
    });
  }
  const fillRoles = () =>{
    setLoading(true);   
    AsyncStorage.getItem('token').then(value =>{
      const config = {
        headers: { Authorization: `Bearer ${value}` }
      };    
      axios.get('https://payfourapp.test.kodegon.com/api/loans/occupationroles', config).then(response => {
        setLoading(false);
        console.log("onoccupationroles");
        console.log(response);
        console.log(response.data.data);
        setTitleData(response.data.data);
        sendOtp();
      })
      .catch(error => {
        setLoading(false);
        //console.error("Error sending data: ", error);
        let msg="";
        (error.response.data.errors.message) ? msg += error.response.data.errors.message+"\n" : msg += "Ödeme hatası \n"; (error.response.data.errors.paymentError) ? msg += error.response.data.errors.paymentError+"\n" : msg += ""; Alert.alert(msg);
      });
    });
  }
  const sendOtp = () =>{
    console.log("sendotpforpotentiallimit");
    setLoading(true);   
    AsyncStorage.getItem('token').then(value =>{
      const config = {
        headers: { Authorization: `Bearer ${value}` }
      };    
      axios.post('https://payfourapp.test.kodegon.com/api/loans/sendotpforpotentiallimit', {},config).then(response => {
        setLoading(false);
        console.log("sendotpforpotentiallimit");
        console.log(response);
        console.log(response.data.data);
        setTransactionId(response.data.data.transactionId);
        setModalVisible(true);
        startOtpTimer();
        //setTitleData(response.data.data);
        //fillRoles();
      })
      .catch(error => {
        setLoading(false);
        console.error("Error sending data: ", error);
        console.error("Error sending data: ", error.response);
        let msg="";
        (error.response.data.errors.message) ? msg += error.response.data.errors.message+"\n" : msg += "Ödeme hatası \n"; (error.response.data.errors.paymentError) ? msg += error.response.data.errors.paymentError+"\n" : msg += ""; Alert.alert(msg);
      });
    });
  }
  const verifyOtp = () =>{
    setLoading(true);   
    AsyncStorage.getItem('token').then(value =>{
      const config = {
        headers: { Authorization: `Bearer ${value}` }
      };    
      const sendData={
        transactionId: transactionId,
        code: otp
      }
      console.log("otp send data");
      console.log(sendData);

      axios.post('https://payfourapp.test.kodegon.com/api/loans/verifyotpforpotentiallimit', sendData, config).then(response => {
        setLoading(false);
        console.log("sendotpforpotentiallimit");
        console.log(response);
        console.log(response.data.data);
        setTempToken(response.data.data.tempToken);
        setModalVisible(false);
        //setModalVisible(true);
        //setTitleData(response.data.data);
        //fillRoles();
      })
      .catch(error => {
        setLoading(false);
        console.error("Error sending data: ", error);
        console.error("Error sending data: ", error.response);
        console.error("Error sending data: ", error.response.data.errors.message);
        let msg="";
        (error.response.data.errors.message) ? msg += error.response.data.errors.message+"\n" : msg += "Ödeme hatası \n"; (error.response.data.errors.paymentError) ? msg += error.response.data.errors.paymentError+"\n" : msg += ""; Alert.alert(msg);
      });
    });
  }
  const sendData = () =>{
    //navigation.navigate('CreditSuccess');
    console.log("sendData");
    /*{
      "tempToken": "string",
      "tckn": "string",
      "birthDate": "2024-10-29T12:14:01.781Z",
      "email": "string",
      "incomes": [
        {
          "incomeTypeId": 0,
          "amount": 0
        }
      ],
      "occupationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "educationLevelId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "occupationRoleId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }*/
      console.log(userBirth);
      let fb = userBirth.replace(/\//g, "");
          let a = fb;
          console.log(a);
          let y = a.substring(4, 8);
          let m = a.substring(2, 4);
          let day = a.substring(0, 2);
        console.log("birthDate");
        console.log(y);
        console.log(m);
        console.log(day);
    
          let dt = y+"-"+day+"-"+m;
          console.log(dt);
          let d = new Date(dt);
          let fd = d.toISOString()

   let sendData={
    tempToken:tempToken,
    tckn:userTCKN,
    birthDate:fd,
    email:"",
    incomes: [
        {
          "incomeTypeId": 0,
          "amount": income
        }
    ],
    occupationId:selectedJob.id,
    educationLevelId:selectedEducation.id,
    occupationRoleId:selectedTitle.id,
   }

   setLoading(true);   
    AsyncStorage.getItem('token').then(value =>{
      const config = {
        headers: { Authorization: `Bearer ${value}` }
      };  
      axios.post('https://payfourapp.test.kodegon.com/api/loans/createpotentiallimit', sendData, config).then(response => {
        setLoading(false);
        console.log("createpotentiallimit");
        console.log(response);
        console.log(response.data.data);
        //setModalVisible(true);
        //setTitleData(response.data.data);
        //fillRoles();
        navigation.navigate('CreditSuccess');
      })
      .catch(error => {
        setLoading(false);
        console.error("Error sending data: ", error);
        console.error("Error sending data: ", error.response);
        console.error("Error sending data: ", error.response.data.errors.message);
        let msg="";
        (error.response.data.errors.message) ? msg += error.response.data.errors.message+"\n" : msg += "Ödeme hatası \n"; (error.response.data.errors.paymentError) ? msg += error.response.data.errors.paymentError+"\n" : msg += ""; Alert.alert(msg);
      });
    });
  }
  const renderItem = item => {
    return (
      <View
      key={item.id}
        style={{
          padding: 18,
          height: 54,
          color: '#1D1D25',
        }}>
        <Text
          style={{
            fontSize: 12,
            color: '#1D1D25',
          }}>
          {item.name}
        </Text>
      </View>
    );
  };
  return (
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
                          Gönderilen tek seferlik doğrulama kodunu giriniz.
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
                      onChangeText={Otp => {
                        setOtp(Otp);
                        //verifyOtp(Otp);
                      }}
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
                  onPress={() => verifyOtp(otp)}>
                  <Text
                    style={{fontSize: 14, color: '#ffffff'}}>
                    Doğrula
                  </Text>
                </TouchableOpacity>
               </View>
              </View>
            </View>
      </Modal>
      <Loader loading={loading} />      
      <SubtabHeader routetarget="discover" name="Limitini Öğren" count="0" />

      <ScrollView keyboardShouldPersistTaps="handled" style={[styles.scrollView, {paddingBottom:32}]}>
      <KeyboardAvoidingView enabled>
    <View style={{paddingTop: 16,
      paddingBottom: 120,
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
                    padddingTop:16,
                    paddingBottom:16,
                  }}>
                    
                        <Text style={{
                          fontSize:16,
                          fontWeight:'700',
                          lineHeight:20,
                          color:'#004F97',
                          marginBottom:10,
                          textAlign:'center'
                        }}>
                          Payfour Limitini öğrenmek için gerekli bilgileri doldur.
                        </Text>
                        <Text style={{
                          fontSize:12,
                          color:'#909EAA',
                          textAlign:'center'
                        }}>
                          Payfour hesabına para yükle keyifle kullan.
                        </Text>
                  </View>
                  <View style={{
                    paddingTop:12,
                    paddingBottom:12,
                    paddingLeft:12,
                    paddingRight:12,
                    borderRadius:8,
                    backgroundColor:'#F2F9FF',
                    flexDirection:'row',
                    alignItems:'center',
                    marginBottom:12,
                  }}>
                    <Image 
                        source={require('../../assets/img/export/information_dark.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                        }}
                        />
                        <Text style={{
                          fontSize:12,
                          lineHeight:20,
                          color:'#0B1929',
                          paddingLeft:8,
                          paddingRight:32,
                          textAlign:'ieft',
                        }}>
                          100.000 TL’ye varan Payfour Limitini hemen öğrenebilirsin.
                      </Text>
                  </View>
                  <View style={[regstyles.registerInputStyle, {borderColor: '#EBEBEB',}]}>            
                    <TextInput
                      style={{                      
                        fontSize: 14,
                        lineHeight:8, 
                        padding:0,
                        paddingLeft:4,
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
                  <Dropdown
                    style={{
                      borderColor: '#EBEBEB',
                      borderWidth: 1,
                      padding: 16,
                      fontSize: 14,
                      borderRadius: 10,
                      height: 54,
                      color: '#1D1D25',
                      marginBottom: 18,
                    }}
                    placeholderStyle={{
                      fontSize: 14,
                      color: '#909EAA',
                    }}
                    selectedTextStyle={{
                      fontSize: 14,
                      color: '#1D1D25',
                    }}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={educationData}
                    maxHeight={300}
                    labelField="name"
                    valueField="id"
                    placeholder={'Eğitim'}
                    searchPlaceholder="Search..."
                    value={selectedEducation}
                    ref={eduRef}
                    onChange={item => {
                      console.log('selected');
                      console.log(item);
                      setSelectedEducation(item);
                    }}
                    renderItem={renderItem}
                  />
                  <Dropdown
                    style={{
                      borderColor: '#EBEBEB',
                      borderWidth: 1,
                      padding: 16,
                      fontSize: 14,
                      borderRadius: 10,
                      height: 54,
                      color: '#1D1D25',
                      marginBottom: 18,
                    }}
                    placeholderStyle={{
                      fontSize: 14,
                      color: '#909EAA',
                    }}
                    selectedTextStyle={{
                      fontSize: 14,
                      color: '#1D1D25',
                    }}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={jobData}
                    maxHeight={300}
                    labelField="name"
                    valueField="id"
                    placeholder={'Meslek'}
                    searchPlaceholder="Search..."
                    value={selectedJob}
                    ref={jobRef}
                    onChange={item => {
                      console.log('selected');
                      console.log(item);
                      setSelectedJob(item);
                    }}
                    renderItem={renderItem}
                  />
                  <Dropdown
                    style={{
                      borderColor: '#EBEBEB',
                      borderWidth: 1,
                      padding: 16,
                      fontSize: 14,
                      borderRadius: 10,
                      height: 54,
                      color: '#1D1D25',
                      marginBottom: 18,
                    }}
                    placeholderStyle={{
                      fontSize: 14,
                      color: '#909EAA',
                    }}
                    selectedTextStyle={{
                      fontSize: 14,
                      color: '#1D1D25',
                    }}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={titleData}
                    maxHeight={300}
                    labelField="name"
                    valueField="id"
                    placeholder={'Ünvan'}
                    searchPlaceholder="Search..."
                    value={selectedTitle}
                    ref={titleRef}
                    onChange={item => {
                      console.log('selected');
                      console.log(item);
                      setSelectedTitle(item);
                    }}
                    renderItem={renderItem}
                  />
                  <View style={[regstyles.registerInputStyle, {borderColor: '#EBEBEB',}]}>            
                    <TextInput
                      style={{                      
                        fontSize: 14,
                        lineHeight:8, 
                        padding:0,                        
                        paddingLeft:4,
                        color: '#909EAA',
                      }}
                      onChangeText={Income => setIncome(Income)}
                      placeholder="Gelir" //12345
                      placeholderTextColor="#909EAA"
                      keyboardType="numeric"
                      onSubmitEditing={Keyboard.dismiss}
                      blurOnSubmit={false}
                      underlineColorAndroid="#f000"
                      returnKeyType="next"
                    />
                  </View>
                  <View style={{
                  marginBottom:22,
                  alignItems:'center',
                  flexDirection:'row',
                  paddingRight:16,
                  }}>
                  <Pressable
                    style={{
                    width:20,
                    height:20,
                    marginRight:8,
                    backgroundColor:userKVKKAgreement ? '#015096':'#dadee7',
                    borderRadius:5,
                    alignItems:'center',
                    justifyContent:'center'
                    }}
                    onPress={()=>setUserKVKKAgreement(!userKVKKAgreement)}>
                      <Image
                      source={require('../../assets/img/export/check.png')}
                      style={{
                      width: userKVKKAgreement ? 14 : 0,
                      height: userKVKKAgreement ? 10 : 0,
                      resizeMode: 'contain',
                      }}
                      />
                  </Pressable>  
                  <Text style={{
                  fontWeight:'300',
                  color:'#1E242F',
                  fontSize:12,
                  }}>
                  Kişisel verilerin korunması, işlenmesi ve aktarılmasına ilişkin <Text style={{color:'#015096', textDecorationLine:'underline', fontWeight:'700'}}>Açık Rıza Formu’nu</Text> onaylıyorum.
                  </Text>
                  </View>
                  <View style={{
                  marginBottom:22,
                  alignItems:'center',
                  flexDirection:'row',
                  paddingRight:16,
                  }}>
                  <Pressable
                    style={{
                    width:20,
                    height:20,
                    marginRight:8,
                    backgroundColor:dgfinShareAgreement ? '#015096':'#dadee7',
                    borderRadius:5,
                    alignItems:'center',
                    justifyContent:'center'
                    }}
                    onPress={()=>setDgfinShareAgreement(!dgfinShareAgreement)}>
                      <Image
                      source={require('../../assets/img/export/check.png')}
                      style={{
                      width: dgfinShareAgreement ? 14 : 0,
                      height: dgfinShareAgreement ? 10 : 0,
                      resizeMode: 'contain',
                      }}
                      />
                  </Pressable>  
                  <Text style={{
                  fontWeight:'300',
                  color:'#1E242F',
                  fontSize:12,
                  }}>
                  Dgfin Kredi kullanımı için verilerimin Dgpara ve Dgfin ile paylaşmasına ve işlenmesini onaylıyorum.
                  </Text>
                  </View>
                  <View style={{
                  marginBottom:22,
                  alignItems:'center',
                  flexDirection:'row',
                  paddingRight:16,
                  }}>
                  <Pressable
                    style={{
                    width:20,
                    height:20,
                    marginRight:8,
                    backgroundColor:dgfinUserAgreement ? '#015096':'#dadee7',
                    borderRadius:5,
                    alignItems:'center',
                    justifyContent:'center'
                    }}
                    onPress={()=>setDgfinUserAgreement(!dgfinUserAgreement)}>
                      <Image
                      source={require('../../assets/img/export/check.png')}
                      style={{
                      width: dgfinUserAgreement ? 14 : 0,
                      height: dgfinUserAgreement ? 10 : 0,
                      resizeMode: 'contain',
                      }}
                      />
                  </Pressable>  
                  <Text style={{
                  fontWeight:'300',
                  color:'#1E242F',
                  fontSize:12,
                  }}>
                  Dgfin kullanıcı sözleşmesi
                  </Text>
                  </View>
                  <View style={{
                  marginBottom:22,
                  alignItems:'center',
                  flexDirection:'row',
                  paddingRight:16,
                  }}>
                  <Pressable
                    style={{
                    width:20,
                    height:20,
                    marginRight:8,
                    backgroundColor:dgfinCreditAgreement ? '#015096':'#dadee7',
                    borderRadius:5,
                    alignItems:'center',
                    justifyContent:'center'
                    }}
                    onPress={()=>setDgfinCreditAgreement(!dgfinCreditAgreement)}>
                      <Image
                      source={require('../../assets/img/export/check.png')}
                      style={{
                      width: dgfinCreditAgreement ? 14 : 0,
                      height: dgfinCreditAgreement ? 10 : 0,
                      resizeMode: 'contain',
                      }}
                      />
                  </Pressable>  
                  <Text style={{
                  fontWeight:'300',
                  color:'#1E242F',
                  fontSize:12,
                  }}>
                  Dgfin genel kredi sözleşmesi
                  </Text>
                  </View>
                  <View style={{
                  marginBottom:22,
                  alignItems:'center',
                  flexDirection:'row',
                  paddingRight:16,
                  }}>
                  <Pressable
                    style={{
                    width:20,
                    height:20,
                    marginRight:8,
                    backgroundColor:dgfinKVKKAgreement ? '#015096':'#dadee7',
                    borderRadius:5,
                    alignItems:'center',
                    justifyContent:'center'
                    }}
                    onPress={()=>setDgfinKVKKAgreement(!dgfinKVKKAgreement)}>
                      <Image
                      source={require('../../assets/img/export/check.png')}
                      style={{
                      width: dgfinKVKKAgreement ? 14 : 0,
                      height: dgfinKVKKAgreement ? 10 : 0,
                      resizeMode: 'contain',
                      }}
                      />
                  </Pressable>  
                  <Text style={{
                  fontWeight:'300',
                  color:'#1E242F',
                  fontSize:12,
                  }}>
                  Dgfin <Text style={{color:'#015096', textDecorationLine:'underline', fontWeight:'700'}}>Kişisel Verilerin Korunması Kanunu</Text> ve<Text style={{color:'#015096', textDecorationLine:'underline', fontWeight:'700'}}>Açık Rıza Formu’nu</Text> onaylıyorum.
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
                    sendData();
                    //sendOtp();
                    }}>
                  <Text
                    style={{fontSize: 14, color: '#ffffff'}}>
                    Limitini Öğren
                  </Text>
                </TouchableOpacity>
               
              </View>
              </View>
              </KeyboardAvoidingView>
      </ScrollView>

    </SafeAreaView>
  );
};
const CreditSuccess = ({route, navigation}) =>{
  const handleSubmitPress = () =>{
    navigation.navigate('discover');
  }
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#efeff3'}}> 
      <SubtabHeader routetarget="discover" name="Limitini Öğren" count="0" />

      <ScrollView keyboardShouldPersistTaps="handled" style={[styles.scrollView, {paddingBottom:32}]}>
      <KeyboardAvoidingView enabled>
    <View style={{paddingTop: 16,
      paddingBottom: 120,
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
                minHeight:Dimensions.get('window').height - 200,
                flexDirection:'column',
                justifyContent:'space-between',
              }}>
                  <View style={{}}>
                    <View style={{marginBottom:24}}>
                    <View style={{flexDirection:'row', justifyContent:'center'}}>
                      <Image
                          source={require('../../assets/img/export/payment_success.png')}
                          style={{
                            width: 56,
                            height: 56,
                            resizeMode:'contain',
                            marginBottom:10,
                          }}
                      />
                      </View>
                    <Text style={{
                      textAlign:'center',
                      color:'#004F97',
                      fontSize:16,
                      fontWeight:'700'
                    }}>
                      Talebiniz Alınmıştır</Text>
                    </View>
                    <View style={{
                      borderRadius:8,
                      backgroundColor:'#F2F9FF',
                      padding:16,
                      alignItems:'center',
                      justifyContent:'center',
                      height:134,
                    }}>
                      <Text style={{textAlign:'center', color:'#0B1929', fontSize:12, marginBottom:12}}>
                      Verdiğiniz bilgiler için teşekkürler. Talebiniz değerlendirmeye alınmıştır.
                      </Text>
                      <Text style={{textAlign:'center', color:'#0B1929', fontSize:12}}>
                          En kısa sürede sizi sms ile bilgilendireceğiz.
                      </Text>
                    </View>
                  </View>                 
                  
                  <View style={{}}>
                    <TouchableOpacity
                      style={{marginBottom: 24}}>
                        <Text style={{color:'#004F97', fontSize:14, fontWeight:'700', textAlign:'center', textDecorationLine:'underline'}}>
                        Limitini nasıl yükseltebilirsin?
                        </Text>
                      </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.buttonStyle, {marginBottom: 24, backgroundColor: '#004F97',}]}
                      activeOpacity={0.5}
                      onPress={handleSubmitPress}>
                      <Text style={styles.buttonTextStyle}>Kapat</Text>
                    </TouchableOpacity>
                  </View>
               
              </View>
              </View>
              </KeyboardAvoidingView>
      </ScrollView>

    </SafeAreaView>
  );
}
const CreditScreen = ({navigation}) => {
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <Stack.Navigator initialRouteName="IntroHazirLimit">
      <Stack.Screen
        name="IntroHazirLimit"
        component={Intro}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="IntroSonraOde"
        component={Intro2}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CreditForm"
        component={CreditForm}
        options={{headerShown: false}}
      /> 
      <Stack.Screen
        name="CreditSuccess"
        component={CreditSuccess}
        options={{headerShown: false}}
      />     
    </Stack.Navigator>
  );
};
export default CreditScreen;

const istyles = StyleSheet.create({
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
  wrapper: {},
  slide1: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
  },
  slide2: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
  },
 
  header:{
    justifyContent: 'center',
    alignItems: 'center',
    height:Dimensions.get('window').height*0.098,
    width:'100%'
  },
  text: {
    color: '#004F97',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign:'center',
    paddingLeft:32,
    paddingRight:32,
  },
  bottomTextHolder:{
    paddingLeft:24,
    paddingRight:24,
  },
  bottomText:{
    color:'#0B1929',
    fontSize:14,
    textAlign:'center',
  }
})
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
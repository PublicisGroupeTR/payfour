/* eslint-disable react-native/no-inline-styles */
// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, createRef, useEffect, useRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Linking,
  Modal,
  Dimensions,
  ImageBackground,
  Alert,
  Platform,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Loader from './Components/Loader';
import {SafeAreaView} from 'react-native-safe-area-context';
import TabHeader from './Components/TabHeader';
import { OtpInput } from "react-native-otp-entry";
import axios from 'react-native-axios';

const LoginWithPasswordScreen = ({navigation}) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userEmailError, setUserEmailError] = useState(false);
  const [otpError, setOtpError] = useState(false);
  
  const [otp, setOtp] = useState(false);
  const [stopOtpTimer, setStopOtpTimer] = useState(false);
  const [userPasswordError, setUserPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [toggleSubmit, setToggleSubmit] = useState(false);

  const [timerCount, setTimerCount] = useState(180);
  const [timerText, setTimerText] = useState('03:00');
  const [resetTimer, setResetTimer] = useState(false);

  const passwordInputRef = useRef();
  
  const forgotPassword = () =>{

    /*{
      "phone": "string",
      "deviceId": 0,
      "uniqueMPANumber": "string"
    }*/
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
          let dataToSend = {
            "phone": obj.phone,
            "deviceId": obj.deviceId,
            "uniqueMPANumber": obj.uniqueMPANumber
          }
          //sendData(obj);
          sendForgot(dataToSend);
        });
      });
    //navigation.navigate("OtpScreen", {'forgot':true});
  }
  const sendForgot = (dataToSend) => {
    setLoading(true);
    axios.post('https://api-app.payfour.com/api/auth/forgotpassword', dataToSend)
    .then(response => {
      setLoading(false);
        console.log(response.data);        
      if(response.data.error){
        Alert.alert(response.data.error.message);
      }else{
        /*AsyncStorage.setItem('token', response.data.data.accessToken).then(() =>{
          AsyncStorage.setItem('payfourId', response.data.data.payfourId.toString()).then(() =>{
            navigation.navigate('TabNavigationRoutes');  
          });
        }); */
        navigation.navigate("OtpScreen", {'forgot':true});     
      }
    })
    .catch(error => {
      console.error("Error sending data: ", error);
      Alert.alert('Girilen şifre hatalı. Lütfen kontrol edin.');
    });
  }
  const handleSubmitPassword = () => {
    console.log("otp submit");
    setTimerCount(0);
    setLoading(true);
    
    AsyncStorage.getItem('uniqueMPANumber').then(value =>{
      let dataToSend = {"uniqueMPANumber":value};
      retrieveDeviceId(dataToSend);
    });
  }
  const retrieveDeviceId = (dataToSend) => {
    AsyncStorage.getItem('deviceId').then(value =>{
      dataToSend.deviceId = value;
      retrievePhone(dataToSend);
    });
  }
  const retrievePhone = (dataToSend) => {
    AsyncStorage.getItem('phone').then(value =>{
      dataToSend.phone = value;
      sendData(dataToSend);
    });
  }
  const resetUser = () => {
    setLoading(true);
    AsyncStorage.removeItem('uniqueMPANumber').then(()=>{
      AsyncStorage.removeItem('phone').then(()=>{
          AsyncStorage.removeItem('deviceId').then(()=>{
          passwordInputRef.current.clear();
          setLoading(false);
          navigation.navigate('LoginScreen');
        })
      })
    })
  }
  const sendData = (dataToSend) => {
    /*{
      "deviceId": 11,
      "uniqueMPANumber": "e0f94235b6d5a4557540be988cdc790738fca3669dc3012e5f494056f1aed1d4",
      "phone": "+905337745616",
      "password": "738291"
    }*/
      
   dataToSend.password = otp;
    console.log("datatosend");
    console.log(dataToSend);

    axios.post('https://api-app.payfour.com/api/auth/loginwithpassword', dataToSend)
    .then(response => {
      
      setLoading(false);
        console.log(response.data);        
      if(response.data.error){
        Alert.alert(response.data.error.message);
        if(response.data.error.message.search('valid') >-1){
          console.log("invalid found");
          resetUser();
        }
      }else{
        passwordInputRef.current.clear();
        setOtp(''); 
        setLoading(false);
        AsyncStorage.setItem('token', response.data.data.accessToken).then(() =>{
          AsyncStorage.setItem('payfourId', response.data.data.payfourId.toString()).then(() =>{
            navigation.navigate('TabNavigationRoutes');  
          });
        });      
      }
    })
    .catch(error => {
      setLoading(false);
      console.error("Error sending data: ", error);
      let msg="";
      (error.response.data.errors.message) ? msg += error.response.data.errors.message+"\n" : msg += "Ödeme hatası \n"; (error.response.data.errors.paymentError) ? msg += error.response.data.errors.paymentError+"\n" : msg += ""; 
      //Alert.alert(msg);
      let reset=false;
      if(msg.search('valid') >-1){
        console.log("invalid found error");
        reset = true;
      }
      Alert.alert(
        msg,
        '', // <- this part is optional, you can pass an empty string
        [
          {text: 'OK', onPress: () => {if(reset) resetUser()}},
        ],
        {cancelable: false},
      );
      
    });     
    
  };


  return (
    <View style={styles.mainBody}>
      <ImageBackground
       style={styles.bgimg}
       resizeMode="cover"
       source={require('../assets/img/export/login_bg.png')}>
      <SafeAreaView syle={{flex: 1, backgroundColor: '#ffffff'}}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(92, 92, 92, 0.56)',
              paddingLeft: 48,
              paddingRight: 48,
            }}>
            <View
              style={{
                backgroundColor: '#ffffff',
                borderRadius: 10,
                paddingTop: 41,
                paddingBottom: 49,
                paddingLeft: 36,
                paddingRight: 36,
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
              <Image
                source={require('../assets/img/info.png')}
                style={{
                  width: 27,
                  height: 27,
                  marginBottom: 24,
                }}
              />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '700',
                  color: '#1D1D25',
                  marginBottom: 18,
                }}>
                Uyarı
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '400',
                  color: '#1D1D25',
                  marginBottom: 33,
                }}>
                Lütfen bilgilerinizi kontrol edin.
              </Text>

              <TouchableOpacity
                style={[
                  styles.buttonStyle,
                  {
                    width: '100%',
                    height: 55,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 2,
                    borderColor: '#1D1D25',
                    backgroundColor: '#1D1D25',
                  },
                ]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text
                  style={{fontSize: 16, fontWeight: '700', color: '#ffffff'}}>
                  TEKRAR DENE
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.buttonStyle,
                  {
                    width: '100%',
                    height: 55,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 2,
                    borderColor: '#1D1D25',
                    backgroundColor: '#ffffff',
                  },
                ]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  /*Linking.openURL(
                    'https://panel.gelirortaklari.com/users/forgot_password',
                  );*/
                  openLink('https://panel.gelirortaklari.com/users/forgot_password')
                }}>
                <Text
                  style={{fontSize: 16, fontWeight: '700', color: '#1D1D25'}}>
                  ŞİFREMİ UNUTTUM
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <TabHeader routetarget="LoginScreen" name="" count="0" />
        <Loader loading={loading} />
        <ScrollView
          keyboardShouldPersistTaps="handled"
          style={styles.scrollView}
          >
          <KeyboardAvoidingView style={{ flex: 1, height:Dimensions.get('window').height }}>
            <View
              style={{
                flex: 1,
                paddingTop: 68,
                paddingBottom: 30,
                flexDirection:'column',
                justifyContent:'space-between',
                
              }}>
              <View>
                <View style={{
                  marginBottom:16,
                  paddingLeft:24,
                  paddingRight:24
                }}>
                  <Text
                  style={{
                    color:'#0B1929',
                    fontWeight:'700',
                    fontSize:18,
                    lineHeight:24,
                    textAlign:'center',
                    marginBottom:12
                  }} 
                  >Şifrenizi Giriniz</Text>
                  
                </View>
                <View style={[styles.centerStyle, {paddingLeft:34, paddingRight:34}]}>
                  <View style={{paddingTop:12, paddingBottom:12}}>
                    <OtpInput
                    numberOfDigits={6}
                    focusColor="#015096"
                    focusStickBlinkingDuration={500}
                    ref = {passwordInputRef}
                    onFocus={()=> {console.log('focus'); }}
                    onTextChange={(text) => {console.log(text);setOtpError(false);}}
                    onFilled={(text) => {
                      console.log(`OTP is ${text}`); 
                      setOtp(text); 
                      setToggleSubmit(true);
                      Keyboard.dismiss();
                    }}
                    textInputProps={{
                      accessibilityLabel: "Password",
                      secureTextEntry:true,
                    }}
                    theme={{
                      containerStyle: styles.container,
                      pinCodeContainerStyle: {
                        backgroundColor:'#fff',
                        borderColor: otpError? '#E42932':'#DADEE7'
                      },
                      pinCodeTextStyle: styles.pinCodeText,
                      focusStickStyle: styles.focusStick,
                      focusedPinCodeContainerStyle: {
                        borderColor:"#015096"
                      },
                    }}
                  />

                  <View style={{marginTop:24}}>
                    <TouchableOpacity
                        style={{marginBottom:12}}
                        onPress={() =>{
                          console.log("reset user");
                          resetUser();
                        }
                        }>
                        <Text
                          style={{
                            fontSize: 12,
                            color: '#242424',
                            fontFamily:'Ubuntu-Bold', 
                            textAlign:'center'
                          }}>
                          Başka bir kullanıcı ile devam et
                        </Text>
                      </TouchableOpacity>
                    <TouchableOpacity 
                    style={{}}
                    onPress={forgotPassword}
                    >
                      <Text style={{color:'#242424',  fontSize:12, lineHeight:24, textAlign:'center'}}>
                        Şifremi Unuttum?
                      </Text>
                    </TouchableOpacity>                  
                  </View>
                  </View>
                </View>
              </View>
              <View>
                <TouchableOpacity
                  style={[styles.buttonStyle, {marginBottom: Platform.OS === 'ios' ? 140 : 120, backgroundColor: toggleSubmit ? '#004F97' : '#dadee7',}]}
                  
                  activeOpacity={0.5}
                  onPress={handleSubmitPassword}>
                  <Text style={styles.buttonTextStyle}>Devam Et</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
      </ImageBackground>
      </View>
  );
};
export default LoginWithPasswordScreen;

const styles = StyleSheet.create({
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

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
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';

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

  const [biometricData, setBiometricData] = useState(false);
  const [biometricType, setBiometricType] = useState('');
  const [biometricInput, setBiometricInput] = useState(false);
  const [biometricKey, setBiometricKey] = useState(false);

  const passwordInputRef = useRef();
  useEffect(() => {   
    const unsubscribe = navigation.addListener('focus', () => { 
      //AsyncStorage.removeItem('biometricsKey');
      //AsyncStorage.removeItem('biometricsKey');     
      console.log('Login biometrics check'); 
      
      enableBiometricAuth();
    });
    return unsubscribe;
  }, [navigation]);
  const enableBiometricAuth = () => {
    const rnBiometrics = new ReactNativeBiometrics();
    /*rnBiometrics.deleteKeys()
        .then((resultObject) => {
           const { keysDeleted } = resultObject

           if (keysDeleted) {
             console.log('Successful deletion')
           } else {
             console.log('Unsuccessful deletion because there were no keys to delete')
           }
         })*/
    rnBiometrics.isSensorAvailable()
      .then((resultObject) => {
        const { available, biometryType } = resultObject;
  
        if(Platform.OS == 'ios'){
          if (available && biometryType === BiometryTypes.FaceID) {      
            console.log('Has FaceID authentication');
            //Alert.alert('Has FaceID authentication');
                setBiometricData(true);
                setBiometricType('FaceID');
          }else if (available && biometryType === BiometryTypes.Biometrics) {
            console.log('Biometrics authentication is supported.');
            //Alert.alert('Has ios Biometrics authentication');
            setBiometricData(true);
            setBiometricType('TouchID'); 
          }else{
            console.log('no biometrics supported');
            Alert.alert('no biometrics supported');
          }
        }else{
        if (available && biometryType === BiometryTypes.TouchID) {
          //console.log('TouchID', 'Would you like to enable TouchID authentication for the next time?');
          console.log('Has TouchID authentication'); 
          //Alert.alert('Has TouchID authentication'); 
          setBiometricData(true);
          setBiometricType('TouchID');         
        } else if (available && biometryType === BiometryTypes.Biometrics) {
          console.log('Biometrics authentication is supported.');
          //Alert.alert('Has android Biometrics authentication');
          setBiometricData(true);
          setBiometricType('TouchID'); 
          
        } else{
          console.log('no biometrics');
          Alert.alert('no biometrics supported');
        }
      }
        
      })
      .catch((error) => {
        console.error('Error:', error);
        Alert.alert('Error', 'An error occurred while checking biometrics availability.');
      });
  };
  const checkRecordedBiometrics = async () =>{
    
    AsyncStorage.getItem('biometricsKey').then(value =>{
      console.log("recorded biometrics key");
      console.log(value);

      if(value === null){
        Alert.alert('Uyarı', 'Biometrik girişiniz şifreyle giriş yaptıktan sonra etkinleştirilecektir.');
      } else {
        //AsyncStorage.getItem('deviceId').then(value =>{
          //setDeviceId(value); 
          //sendPublicKeyToServer(value);
          setBiometricInput(true);
          //checkRecordedBiometrics();
          handleBiometricAuth();
        //});
      }
    });
  }
  const handleBiometricAuth = async () => {
    
    try {
      const rnBiometrics = new ReactNativeBiometrics();
      const { success, error } = await rnBiometrics.simplePrompt({ promptMessage: 'Authenticate to continue' });
  
      if (success) {
        const resultObject = await rnBiometrics.biometricKeysExist()
        const { keysExist } = resultObject
        if (keysExist) {
        console.log('Keys exist', resultObject)
        console.log(resultObject);
        /*Alert.alert('Success', 'Biometric authentication successful', [          
          {text: 'OK', onPress: () => loginWithFingerprint()},
        ]);*/
        loginWithFingerprint();
        /*const payload = "react@example.com"
        rnBiometrics.createSignature({
          promptMessage: 'Sign in',
          payload
        })
        .then((resultObject) => {
          const { success, signature } = resultObject
          if (success) {
            console.log("signature: ", signature)
            verifySignatureWithServer(signature)
          }
        })*/
    } 
    
    else {
        console.log('Generating New Keys..')
        rnBiometrics.createKeys()
        .then((resultObject) => {
          const { publicKey } = resultObject
          console.log("Public Key:", publicKey)
          //console.log("blabla")
          // Alert.alert('Success', 'Biometric authentication successful', [          
          //   {text: 'OK', onPress: () => sendPublicKeyToServer(publicKey)},
          // ]);
          sendPublicKeyToServer(publicKey)
        })
    }
        //Alert.alert( 'Success', 'Biometric authentication successful');
        /*rnBiometrics.createKeys()
        .then((resultObject) => {
          const { publicKey } = resultObject;
          console.log("key for server");
          //AsyncStorage.setItem('biometricsKey', publicKey).then(()=>{

            console.log("get biometricsKey");
            console.log(publicKey)
            sendPublicKeyToServer(publicKey)          
          //});
        })*/
        return true;
      } else {
        Alert.alert('Authentication failed', 'Biometric authentication failed');
        return false;
      }
    } catch (error) {
      console.error('[handleBiometricAuth] Error:', error);
      Alert.alert('Error', 'Biometric authentication failed from device');
      return false;
    }
  
  };
  const sendPublicKeyToServer = (publicKey) => {
    AsyncStorage.getItem('biometricsKey').then(value =>{
      ///navigation.replace(value === null ? 'Auth' : 'TabNavigationRoutes'),
      console.log("hasRecordedBiometrics");
      console.log(value);
      //setUniqueMPANumber(value);
      //console.log("mpa get");
      //console.log(uniqueMPANumber);
      if(value === null){
        setPublicKeyOnServer(publicKey);
      } else {
        loginWithFingerprint(publicKey);
      }
    });
  }
  const setPublicKeyOnServer = (publicKey) => {
    console.log("setPublicKeyOnServer");
    console.log(publicKey);
    AsyncStorage.getItem('token').then(value =>{
      
      const config = {
        headers: { Authorization: `Bearer ${value}` }
      };
      
      let dataToSend ={
        "key": publicKey
      }
      axios.post('https://api-app.payfour.com/api/account/setfingerprint', dataToSend, config)
      .then(response => {
        console.log(response);
        console.log(response.data);
        if(response.data.success){
          //navigation.navigate('Success');
          //setSuccessModalVisible(true);
          setLoading(false);
          AsyncStorage.setItem('biometricsKey', publicKey).then(()=>{
              navigation.navigate('TabNavigationRoutes');
          });
        }else{
          setLoading(false);
          console.log("fingerprint error")
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
    });
    //'https://api-app.payfour.com/api/account/setfingerprint'
    /*{
      "key": "string"
    }*/

  }
  const loginWithFingerprint = () => {
      console.log("loginWithFingerprint");
      //console.log(publicKey);
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
            console.log("storage");
            console.log(obj);
            //sendData(obj);
            const config = {
              headers: { Authorization: `Bearer ${obj.token}` }
            };
            
            let dataToSend ={
              "deviceId": obj.deviceId,
              "uniqueMPANumber": obj.uniqueMPANumber,
              "phone": obj.phone,
              "fingerPrintKey": obj.biometricsKey
            }
            console.log("fingerprint login data");
            console.log(dataToSend);
            axios.post('https://api-app.payfour.com/api/auth/loginwithfingerprint', dataToSend)
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
              AsyncStorage.setItem('token', response.data.data.token).then(() =>{
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
        });
      });
      /*{
    "deviceId": 0,
    "uniqueMPANumber": "string",
    "phone": "string",
    "fingerPrintKey": "string"
}*/
    //'https://api-app.payfour.com/api/account/setfingerprint'
    /*{
      "key": "string"
      }*/
    
  }
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
        Alert.alert(response.data.error.message);
        if(response.data.error.message.search('valid') >-1){
          console.log("invalid found");
          resetUser();
        }
      }else{
        
        navigation.navigate("OtpScreen", {'forgot':true});     
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
            console.log("onlogin with password");
            console.log(biometricInput);
            if(biometricInput){
              handleBiometricAuth();
            }else{
              console.log("homepage");
              navigation.navigate('TabNavigationRoutes');  
            }
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
                    autoFocus={false}
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
                <View style={{
                  display: biometricData ? 'flex' : 'none',
                  flexDirection:'row',
                  justifyContent:'space-between',
                  alignItems:'center',
                  paddingLeft: 35,
                  paddingRight: 35,
                  marginBottom:16,
                }}>
                <Text style={{color:'#242424',  fontSize:12, lineHeight:24, textAlign:'center'}}>
                    {biometricType} ile giriş
                </Text>
                <TouchableOpacity 
                    style={{
                      width:48,
                      height:28,
                      borderRadius:24,
                      borderWidth:1,
                      borderColor:biometricInput? '#004F97' : '#dadee7',
                      backgroundColor:biometricInput? '#004F97' : '#dadee7'
                      //borderColor:biometricInput? '#ff0000' : '#aaa',
                      //backgroundColor:biometricInput? '#ff0000' : '#aaa'
                    }}
                    onPress={()=>{
                      console.log("biometricInput");
                      console.log(biometricInput);
                      if(!biometricInput){
                        setBiometricInput(true);
                        checkRecordedBiometrics();
                      }else{
                        setBiometricInput(false);
                      }
                    }}
                    >
                      <View style={{
                        width:20,
                        height:20,
                        borderRadius:20,
                        //backgroundColor:'#015096',
                        backgroundColor:'#fff',
                        position:'absolute',
                        top:3,
                        left: biometricInput ? 24 : 4
                      }}>
                      </View>
                      </TouchableOpacity>
                </View>
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

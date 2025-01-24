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
  Alert
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Loader from '../../Components/Loader';
import {SafeAreaView} from 'react-native-safe-area-context';
import TabHeader from '../../Components/TabHeader';
import { OtpInput } from "react-native-otp-entry";
import axios from 'react-native-axios';

import OTPTextView from 'react-native-otp-textinput';

const LimitOtpScreen = ({navigation, route}) => {
  const [userEmail, setUserEmail] = useState('');
  const [userEmailError, setUserEmailError] = useState(false);
  const [otpError, setOtpError] = useState(false);
  const [userPassword, setUserPassword] = useState('');
  const [phone, setPhone] = useState('');
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
  const [transactionId, setTransactionId] = useState('');

  const otpInputRef = useRef();
  const otpInputRef2 = useRef();

  useEffect(() => {
    console.log("otp")
    console.log(route);
    console.log(route.params);
    AsyncStorage.getItem('phone').then(value =>{
      setPhone(value);
      resetOtpTimer();
      sendOtp();
    });
    //otpInputRef.current.clear();
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
  const resendOtp = () => {
    console.log("otp resend");
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
        route.params.forgot ? resendForgot(obj) : resendData(obj);
      });
    });

  }
  const resendForgot = (obj) => {
    console.log("forgot resend");
    /*let dataToSend ={
      "phone": ph,
      "deviceId": dId,
      "uniqueMPANumber": mpa,
      "dgpaysAgreements": true
    }*/
    let dataToSend = {
      phone: obj.phone, 
      deviceId: obj.deviceId,
      uniqueMPANumber: obj.uniqueMPANumber,
    };
    console.log(dataToSend);

    axios.post('https://api-app.payfour.com/api/auth/forgotpassword', dataToSend)
    .then(response => {
      setLoading(false);
        console.log(response.data);
        //setLogin();
        setStopOtpTimer(false);
        resetOtpTimer();
    })
    .catch(error => {
      console.error("Error sending data: ", error);
      let msg="";
      (error.response.data.errors.message) ? msg += error.response.data.errors.message+"\n" : msg += "Ödeme hatası \n"; (error.response.data.errors.paymentError) ? msg += error.response.data.errors.paymentError+"\n" : msg += ""; Alert.alert(msg);
    });
  }
  const resendData = (obj) => {
    /*let dataToSend ={
      "phone": ph,
      "deviceId": dId,
      "uniqueMPANumber": mpa,
      "dgpaysAgreements": true
    }*/
    let dataToSend = {
      phone: obj.phone, 
      deviceId: obj.deviceId,
      uniqueMPANumber: obj.uniqueMPANumber,
      dgpaysAgreements: true,
    };
    console.log(dataToSend);

    axios.post('https://api-app.payfour.com/api/auth/begin', dataToSend)
    .then(response => {
      setLoading(false);
        console.log(response.data);
        //setLogin();
        setStopOtpTimer(false);
        resetOtpTimer();
    })
    .catch(error => {
      console.error("Error sending data: ", error);
      let msg="";
      (error.response.data.errors.message) ? msg += error.response.data.errors.message+"\n" : msg += "Ödeme hatası \n"; (error.response.data.errors.paymentError) ? msg += error.response.data.errors.paymentError+"\n" : msg += ""; Alert.alert(msg);
    });
  }
  // const handleSubmitOtp = () => {
  //   console.log("creditotp submit");
  //   setTimerCount(0);
  //   setLoading(true);
  //   console.log(route.params.params.transactionId);
  //  let dataToSend = {
  //   "transactionId": route.params.params.transactionId,
  //   "code": otp
  // }
  //   console.log("datatosend");
  //   console.log(dataToSend);
  //   AsyncStorage.getItem('token').then(value =>{
  //     const config = {
  //       headers: { Authorization: `Bearer ${value}` }
  //     };
  //     axios.post('https://api-app.payfour.com/api/loans/verifyotpforloginreset', dataToSend, config)
  //     .then(response => {
  //       setLoading(false);
  //         console.log(response.data); 
  //         //otpInputRef.current.clear();
  //         setOtp('');       
  //       if(response.data.error){
  //         otpInputRef2.current.clear();
  //         Alert.alert(response.data.error.message);
  //       }else{
  //         checkFirstInstallmentDate(response.data.data.tokenId);
          
  //       }
  //     })
  //     .catch(error => {
  //       setLoading(false);
  //       otpInputRef2.current.clear();
  //       console.error("Error sending data: ", error);
  //       Alert.alert('Girilen kod hatalı. Lütfen kontrol edin.');
  //       console.log(otpInputRef)
  //     });     
  //   });
  // };
  const sendOtp = () =>{
    console.log("sendotpforpotentiallimit");
    setLoading(true);   
    AsyncStorage.getItem('token').then(value =>{
      const config = {
        headers: { Authorization: `Bearer ${value}` }
      };    
      axios.post('https://api-app.payfour.com/api/loans/sendotpforpotentiallimit', {},config).then(response => {
        setLoading(false);
        console.log("sendotpforpotentiallimit");
        console.log(response);
        console.log(response.data.data);
        setTransactionId(response.data.data.transactionId);
        //setModalVisible(true);
        //startOtpTimer();
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
  const handleSubmitOtp = () =>{
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

      axios.post('https://api-app.payfour.com/api/loans/verifyotpforpotentiallimit', sendData, config).then(response => {
        setLoading(false);
        console.log("sendotpforpotentiallimit");
        console.log(response);
        console.log(response.data.data);
        //setTempToken(response.data.data.tempToken);
        navigation.navigate('CreditForm', {tempToken:response.data.data.tempToken});
        //setModalVisible(false);
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
  const checkFirstInstallmentDate = (tokenId)=>{
    console.log("checkFirstInstallmentDate");
    console.log(tokenId);
    AsyncStorage.getItem('token').then(value =>{
      const config = {
        headers: { Authorization: `Bearer ${value}` }
      };
      axios.post('https://api-app.payfour.com/api/loans/calculatefirstinstallmentdate', {tokenId:tokenId}, config)
      .then(response => {
        setLoading(false);
          console.log(response.data); 

                
        if(response.data.error){
          otpInputRef2.current.clear();
          Alert.alert(response.data.error.message);
        }else{
          navigation.navigate('CreditInstallmentsScreen', {
            params:{
              transactionId:route.params.params.transactionId,
              paymentId: route.params.params.paymentId,
              firstInstallmentDate:response.data.data.calculatedInstallmentDate,
              amount:route.params.params.amount,
              tokenId:tokenId
            }
          })
          
        }
      })
      .catch(error => {
        setLoading(false);
        otpInputRef2.current.clear();
        console.error("Error sending data: ", error);
        Alert.alert('Girilen kod hatalı. Lütfen kontrol edin.');
      });     
    });
  }
  const [otpInput, setOtpInput] = useState('');

  const input = useRef<OTPTextView>(null);

  const clear = () => input.current?.clear();

  const updateOtpText = () => input.current?.setValue(otpInput);

  const showTextAlert = () => otpInput && Alert.alert(otpInput);

  const handleCellTextChange = async (text, i) => {
    /*if (i === 0) {
      const clippedText = await Clipboard.getString();
      if (clippedText.slice(0, 1) === text) {
        input.current?.setValue(clippedText, true);
      }
    }*/
  };

  return (
    <View style={styles.mainBody}>
      <ImageBackground
       style={styles.bgimg}
       resizeMode="cover"
       source={require('../../../assets/img/export/login_bg.png')}>
      <SafeAreaView syle={{flex: 1}}>
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
                source={require('../../../assets/img/info.png')}
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
        <TabHeader routetarget="IntroHazirLimit" name="OtpScreen" count="0" />
        <Loader loading={loading} />
        <ScrollView
            keyboardShouldPersistTaps="handled"
            style={{flexGrow:1}}>
          <View enabled  behavior="padding" style={{ flex: 1, minHeight:Dimensions.get('window').height,paddingBottom:100 }}>
            <View
              style={{
                flex: 1,
                paddingTop: 68,
                paddingBottom: 120,
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
                  >Cep telefonunuzu doğrulayın</Text>
                  <Text style={{
                    fontSize:14,
                    fontWeight:'300',
                    color:'#909EAA',
                    textAlign:'center',
                    lineHeight:20,
                    paddingLeft:24,
                    paddingRight:24
                  }}>
                  İşlemlerinize devam edebilmek için 
                  <Text style={{
                    fontSize:14,
                    fontWeight:'700',
                    color:'#0B1929'
                  }}> {phone} </Text>numaralı telefona gelen
                  6 haneli kodu giriniz.
                  </Text>
                </View>
                
                <View style={[styles.centerStyle, {paddingLeft:34, paddingRight:34}]}>
                  <View style={{paddingTop:12, paddingBottom:12}}>
                    {/* <OtpInput
                    ref={otpInputRef}
                    numberOfDigits={6}
                    focusColor="#015096"
                    focusStickBlinkingDuration={500}
                    autoFocus={false}
                    onFocus={()=> {console.log('focus'); }}
                    onTextChange={(text) => {console.log(text);setOtpError(false);}}
                    onFilled={(text) => {
                      console.log(`OTP is ${text}`); 
                      setOtp(text); 
                      setToggleSubmit(true);
                      Keyboard.dismiss();
                    }}
                    textInputProps={{
                      accessibilityLabel: "One-Time Password",
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
                  /> */}
                  <OTPTextView
                    ref={otpInputRef2}
                    containerStyle={otpstyles.textInputContainer}
                    textInputStyle={otpstyles.roundedTextInput}
                    tintColor="#015096"
                    offTintColor={'#DADEE7'}
                    handleTextChange={(text) => {
                      setOtpInput(text);
                      console.log(`OTP is ${text}`); 
                      setOtp(text);
                      if(text.length >5){ 
                      setToggleSubmit(true);
                      Keyboard.dismiss();
                      }
                    }}
                    handleCellTextChange={handleCellTextChange}
                    inputCount={6}
                    keyboardType="numeric"
                  />
                  
                  <View style={{marginTop:12}}>
                  {resetTimer ? (
                    <TouchableOpacity 
                    style={{}}
                    onPress={resendOtp}
                    >
                      <Text style={{color:'#015096',  fontSize:14, lineHeight:24, textAlign:'center'}}>
                        Tekrar Gönder
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <Text style={{color:'#015096',  fontSize:14, lineHeight:24, textAlign:'center'}}>{timerText}</Text>
                  )}
                  </View>
                  </View>
                </View>
              </View>
              <View>
                <TouchableOpacity
                  style={[styles.buttonStyle, {marginBottom: 60, backgroundColor: toggleSubmit ? '#004F97' : '#dadee7',}]}
                  
                  activeOpacity={0.5}
                  onPress={handleSubmitOtp}>
                  <Text style={styles.buttonTextStyle}>Devam Et</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      </ImageBackground>
      </View>
  );
};
export default LimitOtpScreen;

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
const otpstyles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 5,
    paddingVertical: 20,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    color: '#333333',
    marginBottom: 10,
  },
  textInputContainer: {
    height:50,
    marginBottom: 20,
    width:Dimensions.get('window').width -90,
  },
  roundedTextInput: {
    borderRadius: 10,
    borderWidth: 1,
    borderBottomWidth:1,
    paddingTop:5,
    paddingBottom:5,
    height:70,
    width:Dimensions.get('window').width > 395? '16.5%' : '15%',
    marginRight:Dimensions.get('window').width > 395? 5 : 4,
    backgroundColor:'#fff',
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    width: '60%',
    gap: 20,
  },
  textInput: {
    height: 40,
    width: '80%',
    borderColor: '#000',
    borderWidth: 0,
    padding: 10,
    fontSize: 16,
    letterSpacing: 5,
    marginBottom: 10,
    textAlign: 'center',
  },
});
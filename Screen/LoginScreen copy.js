/* eslint-disable react-native/no-inline-styles */
// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, createRef, useEffect} from 'react';
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
  ImageBackground,
  Pressable,
  Dimensions,
  Alert,
  Platform
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Loader from './Components/Loader';
import {SafeAreaView} from 'react-native-safe-area-context';

import Toplogo from '../assets/img/svg/toplogo.svg';
import { sha256, sha256Bytes } from 'react-native-sha256';
import DeviceInfo from 'react-native-device-info';
import {CountryPicker} from "react-native-country-codes-picker";

import MaskInput from 'react-native-mask-input';
import axios from 'react-native-axios';
import { useKeenSliderNative } from "keen-slider-extended/react-native"
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';

const LoginScreen = ({navigation}) => {
  const [uniqueMPANumber, setUniqueMPANumber] = useState(null);
  const [fingerprint, setFingerprint] = useState(null);
  const [deviceId, setDeviceId] = useState(null);
  const [userPhone, setUserPhone] = useState('');
  const [userPhoneError, setUserPhoneError] = useState(false);
  const [userAgreement, setUserAgreement] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [countryCode, setCountryCode] = useState('+90');
  const [modalVisible, setModalVisible] = useState(false);
  const [show, setShow] = useState(false);

  const passwordInputRef = createRef();

  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [toggleSubmit, setToggleSubmit] = useState(false);
  const [slData, setSlData] = React.useState([]);

  const slides=4;
  const slider = useKeenSliderNative({
    slides: {
     number: slides,
     perView: 2,
     spacing: 15,
   },
 })
  useEffect(() => {   
    const unsubscribe = navigation.addListener('focus', () => {      
      console.log('Hello World!'); 
      setLoading(true);       
      axios.get('http://payfourapp.test.kodegon.com/api/campaigns/getcampaignsforanonymusers?pageSize=4').then(response => {
        console.log(response.data);
        console.log(response.data.data);
        //console.log(response.data.data.items);
        let sl = response.data.data;
        for(var i=0; i < sl.length;i++){
          sl[i].key = sl[i].campaignCode;
          let dt = new Date(sl[i].expireDate);
          let t = (((dt.getDate()<10)? "0"+dt.getDate() : dt.getDate())) +'.'+(((dt.getMonth()+1)<10)? "0"+(dt.getMonth()+1) :(dt.getMonth()+1))+'.'+dt.getFullYear();
          sl[i].time = t;
        }
        console.log(sl);
        setSlData(sl);
        setLoading(false);
          })
      .catch(error => {
        setLoading(false);
        //console.error("Error sending data: ", error);
        let msg="";
        (error.response.data.errors.message) ? msg += error.response.data.errors.message+"\n" : msg += "Ödeme hatası \n"; (error.response.data.errors.paymentError) ? msg += error.response.data.errors.paymentError+"\n" : msg += ""; Alert.alert(msg);
      });
    });
    return unsubscribe;
  }, [navigation]);

  const resetUser = () => {
    setLoading(true);
    AsyncStorage.removeItem('uniqueMPANumber').then(()=>{
      setLoading(false);
    })
  }
  const handleSubmitPress = () => {

    
    setErrortext('');
    if (!userPhone || !countryCode) {
      //alert('Please fill Email');
      setUserPhoneError(true);
      return;
    }else{
      setLoading(true);
      //AsyncStorage.removeItem('uniqueMPANumber');
      AsyncStorage.getItem('uniqueMPANumber').then(value =>{
        ///navigation.replace(value === null ? 'Auth' : 'TabNavigationRoutes'),
        console.log("uniqueMPANumber");
        console.log(value);
        setUniqueMPANumber(value);
        console.log("mpa get");
        console.log(uniqueMPANumber);
        if(value === null){
          const rnBiometrics = new ReactNativeBiometrics();
          rnBiometrics.deleteKeys()
          .then((resultObject) => {
            const { keysDeleted } = resultObject

            if (keysDeleted) {
              console.log('Successful deletion')
            } else {
              console.log('Unsuccessful deletion because there were no keys to delete')
            }
            //navigation.navigate('LoginScreen');
            setUniqueMPANumberValue();
          })
          
        } else {
          //AsyncStorage.getItem('deviceId').then(value =>{
            //setDeviceId(value); 
            setInit(value);
          //});
        }
      });
    }   
  }
  const setUniqueMPANumberValue = () =>{
    console.log("setuniquempanumber");
    /*1.adım: Random bir sayı üretilir.
    2.adım: user_id bilgisi okunur.
    Android ise: ro.build.id iOS ise: UIDevice.current.identifierForVendor?.uuidString
    3.adım: app veya bundle id bilgisi okur.
    4.adım: 1,2,3. adımlardaki değerler ile telefon numarası(veya firma cuzdan_id) bilgileri birleştirilir.
    Random Number + User_id + PhoneNumber (Cuzdan_id) + App_id
    5.adım: Oluşan değer SHA256 algoritması ile hashlenir.*/
    //let rand = randomIntFromInterval(0,100);
    let fp, mpa;
    //let fingerprint, uniqueMPANumber;

    DeviceInfo.getAndroidId().then((androidId) => {
      // androidId here
      console.log("setUniqueMPANumberValue");
      let bundleId = DeviceInfo.getBundleId();
      //let rand = Math.floor(Math.random() * (100 - 0 + 1) + 0);
      let rand = new Date().getTime();
      let ph = (countryCode+userPhone).replace('(', "").replace(")", "").replace(/ /g, '');
      console.log("formatted");
      console.log(ph);
      console.log("rand");
      console.log(rand);
      mpa = rand+""+androidId+""+countryCode+userPhone+""+bundleId;
      console.log("mpa");
      console.log(mpa);

      sha256(mpa).then( hash => {
          console.log("mpa hash");
          console.log(hash);
          AsyncStorage.setItem('uniqueMPANumber', hash).then(() =>{
              setUniqueMPANumber(hash);
              console.log("mpa set");
              console.log(uniqueMPANumber);
              setInit(hash);
            }
          )       
      });

    });
  }
  const setInit = (value) =>{
      let phoneId = DeviceInfo.getDeviceId();
      let rand = Math.floor(Math.random() * (100 - 0 + 1) + 0);
      fp = rand+""+phoneId;
      console.log("fp");
      console.log(fp);

      sha256(fp).then( hash => {
        console.log("fingerprint hash");
        console.log(hash);
        setFingerprint(hash);

        console.log("vals");
        console.log(uniqueMPANumber);
        console.log(value);
        console.log(hash);
        let dataToSend = {
            "fingerPrint": hash,
            "uniqueMPANumber": value
        }
        console.log("dataToSend");
        console.log(dataToSend);

            axios.post('http://payfourapp.test.kodegon.com/api/auth/init', dataToSend)
            .then(response => {
              console.log(response.data);
              console.log(response.data.data);
              setLoading(false);
              setDeviceId(response.data.data.deviceId);
              setLogin(response.data.data.deviceId, value);
            })
            .catch(error => {
              setLoading(false);
              console.error("Error sending data: ", error);
              let msg="";
              (error.response.data.errors.message) ? msg += error.response.data.errors.message+"\n" : msg += "Ödeme hatası \n"; (error.response.data.errors.paymentError) ? msg += error.response.data.errors.paymentError+"\n" : msg += ""; Alert.alert(msg);
            });
        /*fetch('http://payfourapp.test.kodegon.com/api/auth/init', {
          method: 'POST',
          body: {
            "fingerPrint": "4e8a1a0d25086770445106345030fbdaf020d9ceac3fe4797df48c81161a55ff",
            "uniqueMPANumber": "2edbac61d141eeea479a9f4e9507d8839c39480204597e1f3ca11818e842e0c5"
          },
          headers: {
            //Header Defination
            'accept':'text/plain',
            'Content-type': 'application/*+json',
          },
        })
          .then(response => response.json())
          .then(responseJson => {
            //Hide Loader
            setLoading(false);
            console.log(responseJson);
            console.log(responseJson.error);
            setDeviceId(response.data.deviceId);
            setLogin();
            
          })
          .catch(error => {
            //Hide Loader
            setLoading(false);
            console.error(error);
          });*/
      });
  }  

  function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  const checkPhone = () =>{
    console.log("checkPhone");
    console.log(countryCode.length);
    console.log(userPhone.length);
    (countryCode.length > 0 && userPhone.length > 13)? setToggleSubmit(true) : setToggleSubmit(false);
  }
  const setAgreement = (val) =>{
    setUserAgreement(val);
    console.log(val);
  }
  const setLogin = (dId, mpa) =>{
    //let dataToSend = {email: userPhone, password: userPassword};
    console.log("setLogin");
    console.log(mpa);
    setLoading(true);
    var ph = (countryCode+userPhone).replace('(', "").replace(")", "").replace(/ /g, '');
    let dataToSend ={
      "phone": ph,
      "deviceId": dId,
      "uniqueMPANumber": mpa,
      "dgpaysAgreements": true
    }
    console.log("datatosend");
    console.log(dataToSend)
    axios.post('http://payfourapp.test.kodegon.com/api/auth/begin', dataToSend)
    .then(response => {
      setLoading(false);
        console.log(response.data);
        //setLogin();
        let dds = dId.toString();
        console.log("dds", dds)
        AsyncStorage.setItem('deviceId', dds).then(() =>{
          var ph = (countryCode+userPhone).replace('(', "").replace(")", "").replace(/ /g, '');
          console.log("set phone", ph);
          AsyncStorage.setItem('phone', ph).then(() =>{
            console.log("navigate to otp");
            navigation.navigate("OtpScreen", {
              phone: ph,
            });
          });
        });
    })
    .catch(error => {
      setLoading(false);
      console.error("Error sending data: ", error);
      console.log(error.response);
      let msg="";
      (error.response.data.errors.message) ? msg += error.response.data.errors.message+"\n" : msg += "Ödeme hatası \n"; (error.response.data.errors.paymentError) ? msg += error.response.data.errors.paymentError+"\n" : msg += ""; Alert.alert(msg);
    });
    /*fetch('http://payfourapp.test.kodegon.com/api/auth/begin', {
      method: 'POST',
      body: dataToSend,
      headers: {
        //Header Defination
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        //Hide Loader
        setLoading(false);
        console.log(responseJson);
        console.log(responseJson.error);
        //setLogin();
        AsyncStorage.setItem('deviceId', deviceId).then(() =>{
          AsyncStorage.setItem('phone', countryCode+userPhone).then(() =>{
            navigation.navigate("OtpScreen");
          });
        });
        
      })
      .catch(error => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });*/
  };

  
  return (
  
    <View style={styles.mainBody}>
      <ImageBackground
       style={styles.bgimg}
       resizeMode="cover"
       source={require('../assets/img/export/login_bg.png')}>
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
          <Loader loading={loading} />
          <ScrollView
            keyboardShouldPersistTaps="handled"
            style={{flexGrow:1}}>
              
            <KeyboardAvoidingView enabled  behavior="padding" style={{ flex: 1, minHeight:Dimensions.get('window').height }}>
              <View style={{
                  alignItems: 'center',
                  height:52,
                  paddingTop:10,
                  passingbottom:10,
                  justifyContent: 'space-between',
                  marginBottom:24,
                  }}>
                  {/* <Toplogo width={72} height={60} style={{marginBottom: 30}} /> */}
                  <Image
                    source={require('../assets/img/export/payfour_logo.png')}
                    style={{
                      width: 90,
                      height: 32,
                      resizeMode: 'contain',
                    }}
                  />
                </View>
              <View
                style={{
                  flex: 1,
                  paddingTop: 0,
                  paddingBottom: 30,
                }}>
                

                <View style={styles.centerStyle}>
                  <Text
                    style={{
                      fontFamily: 'Ubuntu-Bold',
                      fontWeight:700,
                      fontSize: 18,
                      marginBottom: 12,
                      color: '#1D1D25',
                      textAlign: 'center',
                      paddingLeft: 10,
                      paddingRight: 10,
                    }}>
                    Giriş Yap / Kayıt Ol
                  </Text>
                  <Text
                      style={[
                        styles.inputTitleStyle,
                        {
                          fontSize: 14,
                          lineHeight:20,
                          fontFamily:'Ubuntu-Regular',
                          fontWeight: '400',
                          marginBottom: 14,
                          textAlign: 'center',
                          paddingLeft: 10,
                          paddingRight: 10,
                          color: '#909EAA',
                        },
                      ]}>
                      Telefon numaranı girerek 
                      <Text
                      style={[
                        styles.inputTitleStyle,
                        {
                          fontFamily:'Ubuntu-Bold',
                          fontSize: 14,
                          fontWeight: '700',
                          color: '#0B1929',
                        },
                      ]}> Payfour’u</Text> kullanmaya hemen başlayabilirsin.
                    </Text>
                  <View style={styles.sectionStyle}>
                    
                    <View style={{
                      borderColor: userPhoneError ? '#ff0000' : (toggleSubmit ? '#004F97':'#EBEBEB'),
                      backgroundColor:'#ffffff',
                      borderWidth: 1,
                      
                      fontSize: 12,
                      borderRadius: 10,
                      height: 60,
                      color: '#0B1929',
                      marginBottom: 16,
                      display: 'flex',
                      flexDirection: 'row',
                    }}>
                      <TouchableOpacity
                        onPress={() => setShow(true)}
                        style={{
                            width: '30%',
                            backgroundColor: '#F2F4F6',
                            padding: 19,
                            marginLeft:0,
                            height:58,
                            borderTopLeftRadius:10,
                            borderBottomLeftRadius:10,
                            marginRight:10
                        }}
                      >
                        <Text style={{
                            color: '#0B1929',
                            fontSize: 16
                        }}>
                          {countryCode}
                      </Text>
                      </TouchableOpacity>
                      {/* <TextInput
                        style={{                          
                          padding: 20,
                          fontSize: 16,
                          borderRadius: 10,
                          height: 60,
                          color: '#1D1D25',
                        }}
                        onFocus={() => setUserPhoneError(false)}
                        onChangeText={userPhone => setUserPhone(userPhone)}
                        autoCapitalize="none"
                        placeholder="Tel"
                        placeholderTextColor="#7E797F"
                        keyboardType="numeric"
                        returnKeyType="next"
                        onSubmitEditing={() =>
                          passwordInputRef.current &&
                          passwordInputRef.current.focus()
                        }
                        underlineColorAndroid="#f000"
                        blurOnSubmit={false}
                      />                  */}
                      <MaskInput
                        value={userPhone}
                        keyboardType="numeric"
                        onChangeText={(masked, unmasked) => {
                          setUserPhone(masked); // you can use the unmasked value as well
                          
                          // assuming you typed "9" all the way:
                          console.log(masked); // (99) 99999-9999
                          console.log(unmasked); // 99999999999
                          checkPhone();
                        }}
                        mask={['(', /\d/, /\d/, /\d/,')', ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/]}
                      />
                    </View>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems:'center',
                        marginBottom: 16,
                      }}>
                      {/* <TouchableOpacity
                        style={{marginBottom:24}}
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
                          }}>
                          Başka bir kullanıcı ile devam et
                        </Text>
                      </TouchableOpacity> */}
                      {/* <TouchableOpacity
                        onPress={() =>
                          console.log("forgot")
                        }>
                        <Text
                          style={{
                            fontSize: 12,
                            color: '#242424',
                            fontFamily:'Ubuntu-Bold',
                          }}>
                          Şifremi Unuttum
                        </Text>
                      </TouchableOpacity> */}
                    </View>
                    <View style={{
                      marginBottom:24,
                      alignItems:'center',
                      flexDirection:'row'
                    }}>
                      <Pressable
                        style={{
                          width:20,
                          height:20,
                          marginRight:8,
                          backgroundColor:userAgreement ? '#015096':'#dadee7',
                          borderRadius:5,
                          alignItems:'center',
                          justifyContent:'center'
                        }}
                        onPress={()=>setAgreement(!userAgreement)}>
                        <Image
                          source={require('../assets/img/export/check.png')}
                          style={{
                            width: userAgreement ? 14 : 0,
                            height: userAgreement ? 10 : 0,
                            resizeMode: 'contain',
                          }}
                        />
                      </Pressable>
                      
                      <Text style={{
                        fontWeight:'300',
                        color:'#1E242F',
                        fontSize:12,
                        fontFamily:'Ubuntu-Regular',
                      }}>
                        Bilgilerimin DGPays ile paylaşılmasına izin veriyorum.
                      </Text>
                    </View>
                    
                    
                  </View>
                </View>
                <View>
                  <TouchableOpacity
                      style={[styles.buttonStyle, {marginBottom: 24, backgroundColor: toggleSubmit ? '#004F97' : '#dadee7',}]}
                      disabled={!toggleSubmit}
                      activeOpacity={0.5}
                      onPress={handleSubmitPress}>
                      <Text style={styles.buttonTextStyle}>Devam Et</Text>
                    </TouchableOpacity>
                </View>
                {slData.length > 0 ? 
                <View style={{paddingLeft:24, paddingRight:8, paddingBottom:40}}>
                  <Text style={{color:'#0B1929', fontSize:14, fontWeight:'700', marginBottom:24,}}>
                  Kampanyalar
                  </Text>
                  <View style={[slstyles.slider, {paddingBottom:16, paddingTop:24}]} {...slider.containerProps}>
                  {
                    [...Array(slides).keys()].map(key => {
                      console.log("sldata "+slData.length);
                      console.log("slData[key].id "+slData[key].id);
                    return (
                      slData.length > 0 ? 
                      <View key={slData[key].id} {...slider.slidesProps[key]}>
                        <View style={{...slstyles.slide}}>
                        
                          <Image 
                            // source={slimages[key]}
                            source={{
                              uri: slData[key].thumbnailUrl,
                            }}
                            style={[slstyles.slideImg, {
                              resizeMode: 'cover',
                            }]}
                          />
                          
                            
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
                            source={require('../assets/img/export/time-oclock.png')}
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
                      : <View></View>
                    )
                  })
                  }
                  </View>
                </View>
                   : <View></View>}
                <CountryPicker
                  show={show}
                  // when picker button press you will get the country object with dial code
                  pickerButtonOnPress={(item) => {
                    setCountryCode(item.dial_code);
                    checkPhone();
                    setShow(false);
                  }}
                  initialState={'+90'}
                  searchMessage={'Ülke kodu'}
                  popularCountries={['tr', 'en', 'ru', 'de']}
                />
                
              </View>
              
            </KeyboardAvoidingView>
            
          </ScrollView>
          
        </SafeAreaView>
      </ImageBackground>
    </View>
    
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  bgimg: {
    flex: 1,
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
    backgroundColor: '#004F97',
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
    fontFamily: 'Ubuntu-Bold',
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
    fontFamily: 'Ubuntu-Bold',
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
    paddingLeft:24,
    paddingRight:8,
    backgroundColor: 'transparent',
    overflow: 'hidden',
    width: '100%',
    //height: Dimensions.get('window').width*0.392,
    minHeight: 185,
    //height:'100%',
    flexGrow:1,
  },
  slide: {
    width: (Dimensions.get('window').width*0.437),
    minHeight:205,
    padding:8,
    // alignItems: 'center',
    // justifyContent: 'center',

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
  },
  slideImg:{
    width: Dimensions.get('window').width*0.394,
    height:Dimensions.get('window').width*0.186,
    borderRadius:4,
    marginBottom:8,
  },
  text: {
    color: 'white',
    fontSize: 30,
  },
}

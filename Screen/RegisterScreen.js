/* eslint-disable react-native/no-inline-styles */
// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, { useState, createRef, useRef } from "react";
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
  Pressable,
  ImageBackground,
  Platform,
  Alert,
  Dimensions
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import Loader from "./Components/Loader";
import { SafeAreaView } from "react-native-safe-area-context";

import Eye from "../assets/img/svg/eye.svg";
import Toplogo from "../assets/img/svg/toplogo.svg";
import { registerStyles } from "./Components/RegisterStyles";
import PayfourUyelikVeKullaniciSozlesmesi from './Legals/PayfourUyelikVeKullaniciSozlesmesi.js';
import PazarlamaAydinlatmaMetni from './Legals/PazarlamaAydinlatmaMetni.js';
import CarrefoursaIletisimIzni from './Legals/CarrefoursaIletisimIzni.js';
import CarrefoursaKartUyelikSozlesmesi from './Legals/CarrefoursaKartUyelikSozlesmesi.js';
import CarrefoursaKartUyelikKVKKAydinlatmaMetni from './Legals/CarrefoursaKartUyelikKVKKAydinlatmaMetni.js';
import { Modalize } from 'react-native-modalize';
import axios from "react-native-axios";

const RegisterScreen = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState("");
  const [userEmailError, setUserEmailError] = useState(false);
  const [userPassword, setUserPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [userSurname, setUserSurname] = useState("");
  const [userPasswordAgain, setUserPasswordagain] = useState("");
  const [UserRefcode, setUserUserRefcode] = useState("");
  const [userPasswordError, setUserPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState("");
  const [secureText, setSecureText] = useState(true);
  const [secureText2, setSecureText2] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);

  const [userKVKKAgreement, setUserKVKKAgreement] = useState(false);
  const [userPaymentAgreement, setUserPaymentAgreement] = useState(false);
  const [userInfo, setUserInfo] = useState(false);
  const [marketingInfo, setMarketingInfo] = useState(false); 
  const [carrefourUserInfo, setCarrefourUserInfo] = useState(false);
  
  const passwordInputRef = createRef();

  const userAgreementModalizeRef = useRef(null);
  const userInfoModalizeRef = useRef(null);
  const marketingInfoModalizeRef = useRef(null);
  const marketingAgreementModalizeRef = useRef(null);
  const carrefourUserAgreementModalizeRef = useRef(null);
  const carrefourUserInfoModalizeRef = useRef(null);

  const [userAgreement, setUserAgreement] = useState(false);
  const [marketingAgreement, setMarketingAgreement] = useState(false);
  const [carrefourUserAgreement, setCarrefourUserAgreement] = useState(false);

  const [userAgreementError, setUserAgreementError] = useState(false);
  const [userMarketingError, setUserMarketingError] = useState(false);
  const [carrefourUserAgreementError, setCarrefourUserAgreementError] = useState(false);
  

  const handleSubmitPress = () => {
    setErrortext("");  
    let err = false;  
    console.log(userPassword);
    console.log(userPasswordAgain);
    if(userPassword.length < 6){
      err = true;
      setUserPasswordError(true);
    }
    if(userPasswordAgain.length < 6){
      err = true;
      setUserPasswordError(true);
    }
    if(userPassword != userPasswordAgain){
      err = true;
      setUserPasswordError(true);
    }
    if(!userAgreement){
      err = true;
      setUserAgreementError(true);
    }
    /*if(!marketingAgreement){
      err = true;
      setUserMarketingError(true);
    }*/
    if(!carrefourUserAgreement){
      err = true;
      setCarrefourUserAgreementError(true);
    }
    if(!err){
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
          sendData(obj);
        });
      });
    }
    /*{
"tempToken": "string",
"deviceId": 0,
"uniqueMPANumber": "string",
"email": "string",
"password": "string",
"referenceCode": "string",
"agreements": {
"openConsent": true,
"commercialElectronic": true,
"paymentServices": true
}
}*/
    let dataToSend = { email: userEmail, password: userPassword };
  };
  const sendData = (obj) => {
    /*{
"tempToken": "string",
"deviceId": 0,
"uniqueMPANumber": "string",
"email": "string",
"password": "string",
"referenceCode": "string",
"agreements": {
"openConsent": true,
"commercialElectronic": true,
"paymentServices": true
}*/
    setLoading(true);
    let dataToSend = {
      tempToken: obj.tempToken,
      deviceId: obj.deviceId,
      uniqueMPANumber: obj.uniqueMPANumber,
      password: userPassword,
      firstName: userName,
      lastName: userSurname,
      referenceCode: UserRefcode,
    };
    if (userEmail != "") dataToSend.email = userEmail;
    console.log(dataToSend);
    let agreements = {
      openConsent: userKVKKAgreement,
      commercialElectronic: userAgreement,
      paymentServices: userPaymentAgreement,
    };
    dataToSend.agreements = agreements;

    console.log("register data");
    console.log(dataToSend);
    //https://api-app.payfour.com/api/auth/addcustomerbasic
    axios
      .post(
        "https://api-app.payfour.com/api/auth/addcustomerbasic",
        dataToSend
      )
      .then((response) => {
        console.log(response.data);
        console.log(response.data.data);
        setLoading(false);
        //AsyncStorage.setItem('accessToken', response.data.data.accessToken).then(() =>{
        navigation.navigate("LoginWithPasswordScreen");
        //})
      })
      .catch((error) => {
        console.error("Error sending data: ", error);
        console.error("Error sending data: ", error.response);
        console.error("Error sending data: ", error.response.data);
        console.error("Error sending data: ", error.response.data.errors);
        setLoading(false);
        let msg = "";
        error.response.data.errors.message
          ? (msg += error.response.data.errors.message + "\n")
          : (msg += "Ödeme hatası \n");
        error.response.data.errors.paymentError
          ? (msg += error.response.data.errors.paymentError + "\n")
          : (msg += "");
        Alert.alert(msg);
      });
  };
  const openLink = async (link) => {};
  const setUAgreement = (val) => {
    setUserAgreement(val);
    console.log(val);
  };
  const setKAgreement = (val) => {
    setUserKVKKAgreement(val);
    console.log(val);
  };
  const setPAgreement = (val) => {
    setUserPaymentAgreement(val);
    console.log(val);
  };
  return (
    <View style={registerStyles.mainBody}>
      <ImageBackground
        style={registerStyles.bgimg}
        resizeMode="cover"
        source={require("../assets/img/export/login_bg.png")}
      >
        <SafeAreaView syle={{ flex: 1, backgroundColor: "#ffffff" }}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              //Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(92, 92, 92, 0.56)",
                paddingLeft: 48,
                paddingRight: 48,
              }}
            >
              <View
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: 10,
                  paddingTop: 41,
                  paddingBottom: 49,
                  paddingLeft: 36,
                  paddingRight: 36,
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../assets/img/info.png")}
                  style={{
                    width: 27,
                    height: 27,
                    marginBottom: 24,
                  }}
                />
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "700",
                    color: "#1D1D25",
                    marginBottom: 18,
                  }}
                >
                  Uyarı
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "400",
                    color: "#1D1D25",
                    marginBottom: 33,
                  }}
                >
                  Lütfen bilgilerinizi kontrol edin.
                </Text>

                <TouchableOpacity
                  style={[
                    registerStyles.buttonStyle,
                    {
                      width: "100%",
                      height: 55,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderWidth: 2,
                      borderColor: "#1D1D25",
                      backgroundColor: "#1D1D25",
                    },
                  ]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "700",
                      color: "#ffffff",
                    }}
                  >
                    TEKRAR DENE
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    registerStyles.buttonStyle,
                    {
                      width: "100%",
                      height: 55,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderWidth: 2,
                      borderColor: "#1D1D25",
                      backgroundColor: "#ffffff",
                    },
                  ]}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    /*Linking.openURL(
'https://panel.gelirortaklari.com/users/forgot_password',
);*/
                    openLink(
                      "https://panel.gelirortaklari.com/users/forgot_password"
                    );
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "700",
                      color: "#1D1D25",
                    }}
                  >
                    ŞİFREMİ UNUTTUM
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <Modalize ref={userAgreementModalizeRef}
      snapPoint={0}
      modalStyle={{}}>
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
                          CARREFOURSA PAYFOUR ÜYELİK VE KULLANICI SÖZLEŞMESİ
                        </Text>
                        <TouchableOpacity 
                      style={{
                        width:24,
                        height:24,
                      }}
                      onPress={() => {
                        console.log('close');
                        userAgreementModalizeRef.current?.close();}}>                  
                        <Image 
                        source={require('../assets/img/export/close.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          tintColor:'#0B1929'
                        }}
                      />
                    </TouchableOpacity>
                       </View> 
                      
                      
                     <PayfourUyelikVeKullaniciSozlesmesi /> 
                  </View> 
                  
                  
              <View style={{
                  backgroundColor:'#fff',
                  paddingTop:24,
                  paddingBottom:80,
                  paddingLeft:0,
                  paddingRight:0,
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
                  onPress={() => {
                    setUAgreement(true);
                    userAgreementModalizeRef.current?.close();
                    }}>
                  <Text
                    style={{fontSize: 14, color: '#ffffff'}}>
                    Okudum, onaylıyorum
                  </Text>
                </TouchableOpacity>
               </View>
               
            </View>
          </Modalize>
          <Modalize ref={marketingInfoModalizeRef}
      snapPoint={0}
      modalStyle={{}}>
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
                          CARREFOURSA PAZARLAMA AYDINLATMA METNİ
                        </Text>
                        <TouchableOpacity 
                      style={{
                        width:24,
                        height:24,
                      }}
                      onPress={() => {
                        console.log('close');
                        marketingInfoModalizeRef.current?.close();}}>                  
                        <Image 
                        source={require('../assets/img/export/close.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          tintColor:'#0B1929'
                        }}
                      />
                    </TouchableOpacity>
                       </View> 
                      
                      
                     <PazarlamaAydinlatmaMetni /> 
                  </View> 
                  
                  
              <View style={{
                  backgroundColor:'#fff',
                  paddingTop:24,
                  paddingBottom:80,
                  paddingLeft:0,
                  paddingRight:0,
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
                  onPress={() => marketingInfoModalizeRef.current?.close()}>
                  <Text
                    style={{fontSize: 14, color: '#ffffff'}}>
                    Okudum, onaylıyorum
                  </Text>
                </TouchableOpacity>
               </View>
               
            </View>
          </Modalize>
          <Modalize ref={marketingAgreementModalizeRef}
      snapPoint={0}
      modalStyle={{
        flex: 1,  
        flexDirection:'column',           
        justifyContent: 'flex-end',
        alignItems: 'flex-end',}}>
        <View
              style={{
                flex: 1,     
                flexDirection:'column',           
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
                          CARREFOURSA İLETİŞİM İZNİ METNİ
                        </Text>
                        <TouchableOpacity 
                      style={{
                        width:24,
                        height:24,
                      }}
                      onPress={() => {
                        console.log('close');
                        marketingAgreementModalizeRef.current?.close();}}>                  
                        <Image 
                        source={require('../assets/img/export/close.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          tintColor:'#0B1929'
                        }}
                      />
                    </TouchableOpacity>
                       </View> 
                      
                      
                     <CarrefoursaIletisimIzni /> 
                  </View> 
                  
                  
              <View style={{
                  backgroundColor:'#fff',
                  paddingTop:24,
                  paddingBottom:80,
                  paddingLeft:0,
                  paddingRight:0,
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
                  onPress={() => {
                    setMarketingAgreement(true);
                    marketingAgreementModalizeRef.current?.close();
                  }}>
                  <Text
                    style={{fontSize: 14, color: '#ffffff'}}>
                    Okudum, onaylıyorum
                  </Text>
                </TouchableOpacity>
               </View>
               
            </View>
          </Modalize>
          <Modalize ref={carrefourUserAgreementModalizeRef}
      snapPoint={0}
      modalStyle={{}}>
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
                          CARREFOURSA KART ÜYELİK SÖZLEŞMESİ
                        </Text>
                        <TouchableOpacity 
                      style={{
                        width:24,
                        height:24,
                      }}
                      onPress={() => {
                        console.log('close');
                        carrefourUserAgreementModalizeRef.current?.close();}}>                  
                        <Image 
                        source={require('../assets/img/export/close.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          tintColor:'#0B1929'
                        }}
                      />
                    </TouchableOpacity>
                       </View> 
                      
                      
                     <CarrefoursaKartUyelikSozlesmesi /> 
                  </View> 
                  
                  
              <View style={{
                  backgroundColor:'#fff',
                  paddingTop:24,
                  paddingBottom:80,
                  paddingLeft:0,
                  paddingRight:0,
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
                  onPress={() => {
                    setCarrefourUserAgreement(true);
                    carrefourUserAgreementModalizeRef.current?.close();
                    }}>
                  <Text
                    style={{fontSize: 14, color: '#ffffff'}}>
                    Okudum, onaylıyorum
                  </Text>
                </TouchableOpacity>
               </View>
               
            </View>
          </Modalize>
          <Modalize ref={carrefourUserInfoModalizeRef}
      snapPoint={0}
      modalStyle={{}}>
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
                          CARREFOURSA KART ÜYELİĞİ KİŞİSEL VERİLERİN KORUNMASI AYDINLATMA METNİ
                        </Text>
                        <TouchableOpacity 
                      style={{
                        width:24,
                        height:24,
                      }}
                      onPress={() => {
                        console.log('close');
                        carrefourUserInfoModalizeRef.current?.close();}}>                  
                        <Image 
                        source={require('../assets/img/export/close.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          tintColor:'#0B1929'
                        }}
                      />
                    </TouchableOpacity>
                       </View> 
                      
                      
                     <CarrefoursaKartUyelikKVKKAydinlatmaMetni /> 
                  </View> 
                  
                  
              <View style={{
                  backgroundColor:'#fff',
                  paddingTop:24,
                  paddingBottom:80,
                  paddingLeft:0,
                  paddingRight:0,
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
                  onPress={() => carrefourUserInfoModalizeRef.current?.close()}>
                  <Text
                    style={{fontSize: 14, color: '#ffffff'}}>
                    Okudum, onaylıyorum
                  </Text>
                </TouchableOpacity>
               </View>
               
            </View>
          </Modalize>
          <Loader loading={loading} />

          <ScrollView
            keyboardShouldPersistTaps="handled"
            style={registerStyles.scrollView}
          >
            <KeyboardAvoidingView enabled>
              <View style={{padding:0}}>
                <Text
                  style={{
                    color: "#1D1E32",
                    fontSize: 18,
                    fontWeight: "700",
                    marginBottom: 16,
                    textAlign: "center",
                    paddingTop: 12,
                  }}
                >
                  Üye Ol
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: "space-between",
                  paddingTop: 16,
                  paddingBottom: 30,
                  paddingLeft:24,
                  paddingRight:24,
                }}
              >
                <View>
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#1D1E32",
                      textAlign: "left",
                      maxWidth:300,
                    }}
                  >
                    Bilgilerinizi doldurarak 
                  
                  
                    <Text style={{ fontWeight: "700" }}> Payfour </Text>
                    üyeliğinizi tamamlayınız.
                  </Text>
                  <View style={[registerStyles.sectionStyle, {marginLeft:0, marginRight:0}]}>
                    <View
                      style={[
                        registerStyles.registerInputStyle,
                        {
                          height:56,
                          paddingTop:8,
                          paddingBottom:8,
                          minHeight:56,
                          marginBottom: 4,
                          borderColor: userPasswordError
                            ? "#ff0000"
                            : "#015096",
                        },
                      ]}
                    >
                      <Text
                        style={[
                          registerStyles.inputTitleStyle,
                          {
                            fontSize: 12,
                            //marginBottom: 14,
                            lineHeight:14,
                            marginBottom: 0,
                            color: "#909EAA",
                          },
                        ]}
                      >
                        Şifre
                      </Text>
                      <TouchableOpacity
                        style={{
                          position: "absolute",
                          top: 16,
                          right: 20,
                          zIndex: 10,
                        }}
                        onPress={() => setSecureText(!secureText)}
                      >
                        {secureText? <Image 
                              source={require('../assets/img/export/eye_off.png')}
                              style={{
                                width:24,
                                height:24
                              }}>
                              </Image> : 
                              <Image 
                              source={require('../assets/img/export/eye.png')}
                              style={{
                                width:24,
                                height:24
                              }}>
                              </Image>}
                        {/* <Image
                          source={require("../assets/img/export/eye.png")}
                          style={{
                            width: 24,
                            height: 24,
                            resizeMode: "contain",
                          }}
                        /> */}
                      </TouchableOpacity>
                      <TextInput
                        style={[
                          Platform.OS == "ios"
                            ? registerStyles.inputIos
                            : registerStyles.inputAndroid,
                            {
                              fontSize:14,
                            
                            }]
                        }
                        onFocus={() => setUserPasswordError(false)}
                        onChangeText={(UserPassword) =>
                          setUserPassword(UserPassword)
                        }
                        placeholder="" //12345
                        placeholderTextColor="#7E797F"
                        keyboardType="numeric"
                        ref={passwordInputRef}
                        onSubmitEditing={Keyboard.dismiss}
                        blurOnSubmit={false}
                        secureTextEntry={secureText}
                        underlineColorAndroid="#f000"
                        returnKeyType="next"
                        maxLength={6}
                      />
                      {errortext !== "" ? (
                        <Text style={registerStyles.errorTextStyle}>
                          {" "}
                          {errortext}{" "}
                        </Text>
                      ) : null}
                    </View>
                    {/* */}
                    <View style={{}}>
                      <Text style={{ fontSize: 12, color: "#909EAA" }}>
                        {`\u2022`} Şifreniz 6 rakamdan oluşmalıdır.
                      </Text>
                      <Text style={{ fontSize: 12, color: "#909EAA" }}>
                        {`\u2022`} Şifreniz ardışık rakamlardan oluşmamalıdır.
                      </Text>
                      <Text style={{ fontSize: 12, color: "#909EAA" }}>
                        {`\u2022`} Şifre aynı rakamlardan oluşmamalıdır.
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          color: "#909EAA",
                          marginBottom: 14,
                        }}
                      >
                        {`\u2022`} Şifrenizin geçerlilik süresi 3 aydır.
                      </Text>
                    </View>
                    <View
                      style={[
                        registerStyles.registerInputStyle,
                        {
                          height:56,
                          paddingTop:8,
                          paddingBottom:8,
                          minHeight:56,
                          marginBottom: 16,
                          borderColor: userPasswordError
                            ? "#ff0000"
                            : "#015096",
                        },
                      ]}
                    >
                      <Text
                        style={[
                          registerStyles.inputTitleStyle,
                          {
                            fontSize: 12,
                            //marginBottom: 14,
                            lineHeight:14,
                            marginBottom: 0,
                            color: "#909EAA",
                          },
                        ]}
                      >
                        Şifre Tekrar
                      </Text>
                      <TouchableOpacity
                        style={{
                          position: "absolute",
                          top: 16,
                          right: 20,
                          zIndex: 10,
                        }}
                        onPress={() => setSecureText2(!secureText2)}
                      >
                        {secureText2? <Image 
                              source={require('../assets/img/export/eye_off.png')}
                              style={{
                                width:24,
                                height:24
                              }}>
                              </Image> : 
                              <Image 
                              source={require('../assets/img/export/eye.png')}
                              style={{
                                width:24,
                                height:24
                              }}>
                              </Image>}
                        {/* <Eye width={22} height={12} /> */}
                        {/* <Image
                          source={require("../assets/img/export/eye.png")}
                          style={{
                            width: 24,
                            height: 24,
                            resizeMode: "contain",
                          }}
                        /> */}
                      </TouchableOpacity>
                      <TextInput
                        style={[
                          Platform.OS == "ios"
                            ? registerStyles.inputIos
                            : registerStyles.inputAndroid,
                            {
                              fontSize:14,
                            
                            }]}
                        onFocus={() => setUserPasswordError(false)}
                        onChangeText={(UserPasswordAgain) =>
                          setUserPasswordagain(UserPasswordAgain)
                        }
                        placeholder="" //12345
                        placeholderTextColor="#7E797F"
                        keyboardType="numeric"
                        ref={passwordInputRef}
                        onSubmitEditing={Keyboard.dismiss}
                        blurOnSubmit={false}
                        secureTextEntry={secureText2}
                        underlineColorAndroid="#f000"
                        returnKeyType="next"
                        maxLength={11}
                      />
                      {errortext !== "" ? (
                        <Text style={registerStyles.errorTextStyle}>
                          {" "}
                          {errortext}{" "}
                        </Text>
                      ) : null}
                    </View>
                    <View
                      style={[
                        registerStyles.registerInputStyle,
                        { height:56,
                          paddingTop:8,
                          paddingBottom:8,
                          minHeight:56,
                          marginBottom: 16,
                          borderColor: "#EBEBEB" },
                      ]}
                    >
                      <Text
                        style={[
                          registerStyles.inputTitleStyle,
                          {
                            
                            fontSize: 12,
                            //marginBottom: 14,
                            lineHeight:14,
                            marginBottom: 4,
                            color: "#909EAA",
                          },
                        ]}
                      >
                        Ad (İsteğe Bağlı)
                      </Text>
                      <TextInput
                        style={[
                          Platform.OS == "ios"
                            ? registerStyles.inputIos
                            : registerStyles.inputAndroid,
                            {
                              fontSize:14,
                              color:'#1D1E32'
                            
                            }]
                        }
                        //onChangeText={(UserName) => setUserName(UserName)}
                        value={userName}
                        onChangeText={UserName => {
                          let isValid = /^[A-Za-zğüşöçİĞÜŞÖÇ ]*$/.test(UserName);
                          console.log(UserName);
                          console.log(isValid);
                          if(isValid)setUserName(UserName);
                        }}
                        placeholder=""
                        placeholderTextColor="#7E797F"
                        onSubmitEditing={Keyboard.dismiss}
                        blurOnSubmit={false}
                        underlineColorAndroid="#f000"
                        returnKeyType="next"
                      />
                    </View>
                    <View
                      style={[
                        registerStyles.registerInputStyle,
                        { height:56,
                          paddingTop:8,
                          paddingBottom:8,
                          minHeight:56,
                          marginBottom: 16,
                          borderColor: "#EBEBEB" },
                      ]}
                    >
                      <Text
                        style={[
                          registerStyles.inputTitleStyle,
                          {
                            
                            fontSize: 12,
                            //marginBottom: 14,
                            lineHeight:14,
                            marginBottom: 4,
                            color: "#909EAA",
                          },
                        ]}
                      >
                        Soyad (İsteğe Bağlı)
                      </Text>
                      <TextInput
                        style={[
                          Platform.OS == "ios"
                            ? registerStyles.inputIos
                            : registerStyles.inputAndroid,
                            {
                              fontSize:14,
                              color:'#1D1E32'
                            }]
                        }
                        // onChangeText={(UserSurname) =>
                        //   setUserSurname(UserSurname)
                        // }
                        value={userSurname}
                        onChangeText={UserSurname => {
                          let isValid = /^[A-Za-zğüşöçİĞÜŞÖÇ ]*$/.test(UserSurname);
                          console.log(UserSurname);
                          console.log(isValid);
                          if(isValid)setUserSurname(UserSurname);
                        }}
                        placeholder=""
                        placeholderTextColor="#7E797F"
                        onSubmitEditing={Keyboard.dismiss}
                        blurOnSubmit={false}
                        underlineColorAndroid="#f000"
                        returnKeyType="next"
                      />
                    </View>
                    <View
                      style={[
                        registerStyles.registerInputStyle,
                        { height:56,
                          paddingTop:8,
                          paddingBottom:8,
                          minHeight:56,
                          marginBottom: 16,
                          borderColor: "#EBEBEB" },
                      ]}
                    >
                      <Text
                        style={[
                          registerStyles.inputTitleStyle,
                          {
                            fontSize: 12,
                            //marginBottom: 14,
                            lineHeight:14,
                            marginBottom: 0,
                            color: "#909EAA",
                          },
                        ]}
                      >
                        E-posta (İsteğe Bağlı)
                      </Text>
                      <TextInput
                        style={[
                          Platform.OS == "ios"
                            ? registerStyles.inputIos
                            : registerStyles.inputAndroid,
                            {
                              fontSize:14,
                              color:'#1D1E32'
                            }]
                        }
                        onChangeText={(UserEmail) => setUserEmail(UserEmail)}
                        placeholder=""
                        placeholderTextColor="#7E797F"
                        keyboardType="email"
                        onSubmitEditing={Keyboard.dismiss}
                        blurOnSubmit={false}
                        underlineColorAndroid="#f000"
                        returnKeyType="next"
                      />
                    </View>
                    <View
                      style={[
                        registerStyles.registerInputStyle,
                        { height:56,
                          paddingTop:8,
                          paddingBottom:8,
                          minHeight:56,
                          marginBottom: 16,
                          borderColor: "#EBEBEB" },
                      ]}
                    >
                      <Text
                        style={[
                          registerStyles.inputTitleStyle,
                          {
                            fontSize: 12,
                            //marginBottom: 14,
                            lineHeight:14,
                            marginBottom: 0,
                            color: "#909EAA",
                          },
                        ]}
                      >
                        Referans Kodu (İsteğe Bağlı)
                      </Text>
                      <TextInput
                        style={[
                          Platform.OS == "ios"
                            ? registerStyles.inputIos
                            : registerStyles.inputAndroid,
                            {
                              fontSize:14,
                              color:'#1D1E32'
                            }]
                        }
                        onChangeText={(UserRefcode) =>
                          setUserUserRefcode(UserRefcode)
                        }
                        placeholder="" //12345
                        placeholderTextColor="#7E797F"
                        keyboardType="default"
                        onSubmitEditing={Keyboard.dismiss}
                        blurOnSubmit={false}
                        underlineColorAndroid="#f000"
                        returnKeyType="next"
                      />
                    </View>

                    
                    <View
                      style={{
                        marginBottom: 22,
                        alignItems: "center",
                        flexDirection: "row",
                      }}
                    >
                      <Pressable
                        style={{
                          width: 20,
                          height: 20,
                          marginRight: 8,
                          borderRadius: 5,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                    source={require('../assets/img/export/information.png')}
                    style={{
                      width: 16,
                      height: 16,
                      resizeMode:'contain'
                    }}
                  />
                      </Pressable>
                      <TouchableOpacity
                        style={{
                          fontWeight: "300",
                          color: "#1E242F",
                          fontSize: 12,
                          flexDirection:'row',
                        }}
                        onPress={() => marketingInfoModalizeRef.current?.open()}
                      >
                         <Text style={{
                          fontWeight: "300",
                          color: "#1E242F",
                          fontSize: 12,
                          flexDirection:'row',
                        }}>
                        <Text
                          style={{
                            fontWeight: "400",
                            color: "#015096",
                            textDecorationLine: "underline",
                            fontSize: 12,
                          }}
                        >
                          Payfour Üyelik Aydınlatma Metni
                        </Text>
                        'ni onaylıyorum.</Text>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        marginBottom: 22,
                        alignItems: "center",
                        flexDirection: "row",
                      }}
                    >
                      <Pressable
                        style={{
                          width: 20,
                          height: 20,
                          marginRight: 8,
                          backgroundColor: userAgreement
                            ? "#015096"
                            : "#dadee7",
                          borderRadius: 5,
                          alignItems: "center",
                          justifyContent: "center",
                          borderWidth:1,
                          borderColor:userAgreementError ? '#ff0000' : 'transparent',
                        }}
                        onPress={() => {
                          setUserAgreementError(false);
                          setUAgreement(!userAgreement);}
                        }
                      >
                        <Image
                          source={require("../assets/img/export/check.png")}
                          style={{
                            width: userAgreement ? 14 : 0,
                            height: userAgreement ? 10 : 0,
                            resizeMode: "contain",
                          }}
                        />
                      </Pressable>
                      <TouchableOpacity
                        style={{
                          fontWeight: "300",
                          color: userAgreementError ? '#ff0000' : "#1E242F",
                          fontSize: 12,
                          flexDirection:'row',
                        }}
                        onPress={()=>{userAgreementModalizeRef.current?.open()}}
                      >
                         <Text style={{
                          fontWeight: "300",
                          color: userAgreementError ? '#ff0000' : "#1E242F",
                          fontSize: 12,
                          flexDirection:'row',
                        }}>
                        <Text
                          style={{
                            fontWeight: "400",
                            color: userAgreementError ? '#ff0000' : "#015096",
                            textDecorationLine: "underline",
                            fontSize: 12,
                          }}
                        >
                          Payfour Üyelik ve Kullanıcı Sözleşmesi
                        </Text>
                        'ni onaylıyorum.</Text>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        marginBottom: 22,
                        alignItems: "center",
                        flexDirection: "row",
                        paddingRight:20
                      }}
                    >
                      <Pressable
                        style={{
                          width: 20,
                          height: 20,
                          marginRight: 8,
                          borderRadius: 5,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                    source={require('../assets/img/export/information.png')}
                    style={{
                      width: 16,
                      height: 16,
                      resizeMode:'contain'
                    }}
                  />
                      </Pressable>
                      <TouchableOpacity
                        style={{
                          fontWeight: "300",
                          color: "#1E242F",
                          fontSize: 12,
                          flexDirection:'row',
                        }}
                        onPress={() => carrefourUserInfoModalizeRef.current?.open()}
                      >
                         <Text style={{
                          fontWeight: "300",
                          color: "#1E242F",
                          fontSize: 12,
                        }}>
                        <Text
                          style={{
                            fontWeight: "400",
                            color: "#015096",
                            textDecorationLine: "underline",
                            fontSize: 12,
                          }}
                        >
                          CarrefourSA Kart Üyelik Aydınlatma Metni
                        </Text>
                          'ni onaylıyorum.</Text>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        marginBottom: 22,
                        alignItems: "center",
                        flexDirection: "row",
                        paddingRight:20
                      }}
                    >
                      <Pressable
                        style={{
                          width: 20,
                          height: 20,
                          marginRight: 8,
                          backgroundColor: carrefourUserAgreement
                            ? "#015096"
                            : "#dadee7",
                          borderRadius: 5,
                          alignItems: "center",
                          justifyContent: "center",
                          borderWidth:1,
                          borderColor:carrefourUserAgreementError ? '#ff0000' : 'transparent',
                          
                        }}
                        onPress={() => {
                          setCarrefourUserAgreementError(false);
                          setCarrefourUserAgreement(!carrefourUserAgreement)}}
                      >
                        <Image
                          source={require("../assets/img/export/check.png")}
                          style={{
                            width: carrefourUserAgreement ? 14 : 0,
                            height: carrefourUserAgreement ? 10 : 0,
                            resizeMode: "contain",
                          }}
                        />
                      </Pressable>
                      <TouchableOpacity
                        style={{
                          fontWeight: "300",
                          color: carrefourUserAgreementError ? '#ff0000' :"#1E242F",
                          fontSize: 12,
                          flexDirection:'row',
                        }}
                        onPress={() => carrefourUserAgreementModalizeRef.current?.open()}
                      >
                         <Text style={{
                          fontWeight: "300",
                          color: carrefourUserAgreementError ? '#ff0000' :"#1E242F",
                          fontSize: 12,
                        }}>
                        <Text
                          style={{
                            fontWeight: "400",
                            color: carrefourUserAgreementError ? '#ff0000' :"#015096",
                            textDecorationLine: "underline",
                            fontSize: 12,
                          }}
                        >
                          CarrefourSA Kart Üyelik Sözleşmesi
                        </Text>
                          'ni onaylıyorum.</Text>
                      </TouchableOpacity>
                    </View>

                    <View
                      style={{
                        marginBottom: 22,
                        alignItems: "center",
                        flexDirection: "row",
                      }}
                    >
                      <Pressable
                        style={{
                          width: 20,
                          height: 20,
                          marginRight: 8,
                          borderRadius: 5,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                    source={require('../assets/img/export/information.png')}
                    style={{
                      width: 16,
                      height: 16,
                      resizeMode:'contain'
                    }}
                  />
                      </Pressable>
                      <TouchableOpacity
                        style={{
                          fontWeight: "300",
                          color: "#1E242F",
                          fontSize: 12,
                          flexDirection:'row',
                        }}
                        onPress={() => marketingInfoModalizeRef.current?.open()}
                      >
                         <Text style={{
                          fontWeight: "300",
                          color: "#1E242F",
                          fontSize: 12,
                          flexDirection:'row',
                        }}>
                        <Text
                          style={{
                            fontWeight: "400",
                            color: "#015096",
                            textDecorationLine: "underline",
                            fontSize: 12,
                          }}
                        >
                          Pazarlama Aydınlatma Metni
                        </Text>
                        'ni onaylıyorum.</Text>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        marginBottom: 22,
                        alignItems: "center",
                        flexDirection: "row",
                        paddingRight:20
                      }}
                    >
                      <Pressable
                        style={{
                          width: 20,
                          height: 20,
                          marginRight: 8,
                          backgroundColor: marketingAgreement
                            ? "#015096"
                            : "#dadee7",
                          borderRadius: 5,
                          alignItems: "center",
                          justifyContent: "center",
                          borderWidth:1,
                          borderColor:userMarketingError ? '#ff0000' : 'transparent',
                        }}
                        onPress={() => {
                          setUserMarketingError(false);
                          setMarketingAgreement(!marketingAgreement);
                        }}
                      >
                        <Image
                          source={require("../assets/img/export/check.png")}
                          style={{
                            width: marketingAgreement ? 14 : 0,
                            height: marketingAgreement ? 10 : 0,
                            resizeMode: "contain",
                          }}
                        />
                      </Pressable>
                      <TouchableOpacity
                        style={{
                          fontWeight: "300",
                          color: "#1E242F",
                          fontSize: 12,
                          flexDirection:'row',
                        }}
                        onPress={() => marketingAgreementModalizeRef.current?.open()}
                      >
                         <Text style={{
                          fontWeight: "300",
                          color: "#1E242F",
                          fontSize: 12,
                        }}>
                        <Text
                          style={{
                            fontWeight: "400",
                            color: "#015096",
                            textDecorationLine: "underline",
                            fontSize: 12,
                          }}
                        >
                          İletişim İzni
                        </Text>
                         {" "}kapsamında CarrefourSA tarafından pazarlama amaçlı ileti almak istiyorum.</Text>
                      </TouchableOpacity>
                    </View>
                    
                    
                    <TouchableOpacity
                      style={[
                        styles.buttonStyle,
                        { marginBottom: 40, backgroundColor: "#004F97", width:'100%', paddingLeft:0, marginLeft:0, },
                      ]}
                      activeOpacity={0.5}
                      onPress={handleSubmitPress}
                    >
                      <Text style={styles.buttonTextStyle}>
                        Hesap Oluştur
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};
export default RegisterScreen;

const styles = StyleSheet.create({
  registerInputStyle: {
    backgroundColor: "#fff",
    paddingTop: 10,
    paddingBottom: 8,
    paddingLeft: 12,
    paddingRight: 12,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 16,
    minHeight: 60,
  },
  mainBody: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ffffff",
    alignContent: "center",
  },
  topStyle: {
    alignContent: "center",
    paddingTop: 39,
    paddingBottom: 30,
    borderColor: "#EBEBEB",
    borderBottomWidth: 1,
  },
  centerStyle: {
    alignContent: "center",
  },
  sectionStyle: {
    flexDirection: "column",
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
    color: "#7E797F",
    fontSize: 12,
    marginBottom: 10,
  },
  inputStyle: {
    color: "#1D1D25",
    paddingTop: 30,
    paddingBottom: 30,
    fontFamily: "Helvetica-Bold",
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#EBEBEB",
    borderLeftWidth: 0,
    borderRightWidth: 0,
    marginBottom: 48,
    opacity: 1,
  },
  inputAndroid: {
    fontSize: 16,
    lineHeight: 8,
    padding: 0,
    color: "#015096",
  },
  inputIos: {
    fontSize: 16,
    lineHeight: 18,
    padding: 0,
    paddingTop: 24,
    marginTop: 4,
    color: "#015096",
    paddingTop: 5,
    paddingBottom: 5,
  },
  bottomStyle: {
    alignItems: "center",
    marginBottom: 30,
  },
  copyrightTextStyle: {
    color: "#7E797F",
    textAlign: "center",
    fontWeight: "light",
    fontSize: 10,
    alignSelf: "center",
  },
  errorTextStyle: {
    color: "red",
    textAlign: "center",
    fontSize: 14,
  },
});

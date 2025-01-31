/* eslint-disable react-native/no-inline-styles */
// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, createRef} from 'react';
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
  Modal,
  ImageBackground,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Loader from './Components/Loader';
import {SafeAreaView} from 'react-native-safe-area-context';

import { useError } from './Contexts/ErrorContext';
import { basicPost} from './utils/api.js';

const ForgotScreen = ({navigation}) => {
  const { showError } = useError();
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userPasswordAgain, setUserPasswordAgain] = useState('');
  const [userPasswordError, setUserPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [secureText2, setSecureText2] = useState(true);
  
  const [modalVisible, setModalVisible] = useState(false);

  const passwordInputRef = createRef();

  const handleSubmitPress = () => {
    setErrortext('');
    console.log(userPassword);
    console.log(userPasswordAgain);
    console.log(userPassword == userPasswordAgain);
    if (!userPassword || !userPasswordAgain) {
      if (!userPasswordAgain) {
        //alert('Please fill Email');
        setUserPasswordError(true);
      }
      if (!userPassword) {
        //alert('Please fill Password');
        setUserPasswordError(true);
      }
      return;
    }else if(userPassword != userPasswordAgain){
      setUserPasswordError(true);
      return;
    }
    /*setLoading(true);*/

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
    let dataToSend = {email: userEmail, password: userPassword};
    
  };
  const sendData = (obj) =>{
    /*{
  "deviceId": 0,
  "uniqueMPANumber": "string",
  "tempToken": "string",
  "newPassword": "string"
}*/
setLoading(true);
    let dataToSend = {
      tempToken: obj.tempToken, 
      deviceId: obj.deviceId,
      uniqueMPANumber: obj.uniqueMPANumber,
      newPassword: userPassword,
    };    

    console.log("forgot data");
    console.log(dataToSend);

    basicPost('auth/resetpassword', dataToSend, onResetPassword);
    
  }
  const onResetPassword = (response) => {
    console.log(response.data);
    console.log(response.data.data);
    setLoading(false);
    navigation.navigate("LoginWithPasswordScreen");

  }
  const openLink = async link => {
    
  };
  
  return (
    <View style={styles.mainBody}>
      <ImageBackground
       style={[styles.bgimg, {flex:1}]}
       resizeMode="cover"
       source={require('../assets/img/export/login_bg.png')}>
      <SafeAreaView syle={{flex: 1, backgroundColor: '#ffffff'}}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            //Alert.alert('Modal has been closed.');
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
        <Loader loading={loading} />
                

        <ScrollView
          keyboardShouldPersistTaps="handled"
          style={styles.scrollView}>
          <KeyboardAvoidingView enabled>
          <View>
            <Text style={{color:'#1D1E32', fontSize:18, fontWeight:'700', marginBottom:16, textAlign:'center', paddingTop:12}}>
              Şifre Yenile
            </Text>
          </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'space-between',
                paddingTop: 16,
                paddingBottom: 30,
              }}>           

              <View>
                <Text
                  style={{
                    fontFamily: 'Helvetica',
                    fontSize: 14,
                    marginBottom: 14,
                    color: '#1D1E32',
                    textAlign: 'center',
                    paddingLeft: 16,
                    paddingRight: 16,
                  }}>
                  Yeni şifrenizi belirleyerek, <Text style={{fontWeight:'700'}}>Payfour </Text>ayrıcalıklarından yararlanmaya devam edin!
                </Text>
                <View style={styles.sectionStyle}>
                <View style={[styles.registerInputStyle, {marginBottom:4, borderColor: userPasswordError ? '#ff0000' : '#015096',}]}>                  
                  <Text
                    style={[
                      styles.inputTitleStyle,
                      {
                        fontSize: 12,
                        //marginBottom: 14,
                        marginBottom: 0,
                        color: '#909EAA',
                      },
                    ]}>
                    Şifre
                  </Text>
                  <TouchableOpacity
                    style={{
                      position: 'absolute',
                      top: 20,
                      right: 20,
                      zIndex: 10,
                    }}
                    onPress={() => setSecureText(!secureText)}>
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
                  </TouchableOpacity>
                  <TextInput
                    style={{                      
                      fontSize: 16,
                      lineHeight:8, 
                      padding:0,
                      color: '#015096',
                    }}
                    onFocus={() => setUserPasswordError(false)}
                    onChangeText={UserPassword => setUserPassword(UserPassword)}
                    placeholder="" //12345
                    placeholderTextColor="#7E797F"
                    keyboardType="numeric"
                    ref={passwordInputRef}
                    onSubmitEditing={Keyboard.dismiss}
                    blurOnSubmit={false}
                    secureTextEntry={secureText}
                    underlineColorAndroid="#f000"
                    returnKeyType="next"
                  />
                  {errortext !== '' ? (
                    <Text style={styles.errorTextStyle}> {errortext} </Text>
                  ) : null}
                  </View>
                  {/*  */}
                  <View style={{}}>
                    <Text style = {{fontSize:12, color:'#909EAA'}}>{`\u2022`} Şifreniz 6 rakamdan oluşmalıdır.</Text>
                    <Text style = {{fontSize:12, color:'#909EAA'}}>{`\u2022`} Şifreniz ardışık rakamlardan oluşmamalıdır.</Text>
                    <Text style = {{fontSize:12, color:'#909EAA'}}>{`\u2022`} Şifre aynı rakamlardan oluşmamalıdır.</Text>
                    <Text style = {{fontSize:12, color:'#909EAA', marginBottom: 14,}}>{`\u2022`} Şifrenizin geçerlilik süresi 3 aydır.</Text>
                  </View>
                  <View style={[styles.registerInputStyle, {borderColor: userPasswordError ? '#ff0000' : '#015096', marginBottom:36}]}>                  
                  <Text
                    style={[
                      styles.inputTitleStyle,
                      {
                        fontSize: 12,
                        //marginBottom: 14,
                        marginBottom: 0,
                        color: '#909EAA',
                      },
                    ]}>
                    Şifre Tekrar
                  </Text>
                  <TouchableOpacity
                    style={{
                      position: 'absolute',
                      top: 20,
                      right: 20,
                      zIndex: 10,
                    }}
                    onPress={() => setSecureText2(!secureText2)}>
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
                  </TouchableOpacity>
                  <TextInput
                    style={{                      
                      fontSize: 16,
                      lineHeight:8, 
                      padding:0,
                      color: '#015096',
                    }}
                    onFocus={() => setUserPasswordError(false)}
                    onChangeText={UserPasswordAgain => setUserPasswordAgain(UserPasswordAgain)}
                    placeholder="" //12345
                    placeholderTextColor="#7E797F"
                    keyboardType="numeric"
                    ref={passwordInputRef}
                    onSubmitEditing={Keyboard.dismiss}
                    blurOnSubmit={false}
                    secureTextEntry={secureText2}
                    underlineColorAndroid="#f000"
                    returnKeyType="next"
                  />
                  {errortext !== '' ? (
                    <Text style={styles.errorTextStyle}> {errortext} </Text>
                  ) : null}
                  </View>
                  
                  {/* <TouchableOpacity
                    style={[styles.buttonStyle, {marginBottom: 40}]}
                    activeOpacity={0.5}
                    onPress={handleSubmitPress}>
                    <Text style={styles.buttonTextStyle}>Şifre Değiştir</Text>
                  </TouchableOpacity> */}
                  <TouchableOpacity
                  style={[styles.buttonStyle, {marginBottom: 60, backgroundColor: '#004F97'}]}
                  
                  activeOpacity={0.5}
                  onPress={handleSubmitPress}>
                    <Text style={styles.buttonTextStyle}>Şifre Değiştir</Text>
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
export default ForgotScreen;

const styles = StyleSheet.create({
  registerInputStyle:{
    backgroundColor:'#fff',
    paddingTop:10,
    paddingBottom:8, 
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
    marginBottom: 25,
    width:'100%',
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

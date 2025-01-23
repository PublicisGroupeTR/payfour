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
  Pressable,
  ImageBackground,
  Alert,
  Dimensions,
  
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {SafeAreaView} from 'react-native-safe-area-context';

import Loader from '../../Components/Loader.js';
import SubtabHeader from '../../Components/SubtabHeader.js';


import axios from 'react-native-axios';
import { apiGet, apiPost } from '../../utils/api.js';

const CreditChangePasswordScreen = ({navigation, route}) => {
  const [userCurrentPassword, setUserCurrentPassword] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userPasswordAgain, setUserPasswordAgain] = useState('');
  const [userPasswordError, setUserPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [secureText2, setSecureText2] = useState(true);
  const [secureText3, setSecureText3] = useState(true);

  const passwordInputRef = createRef();
useEffect(() => {
    console.log("CreditChangePasswordScreen")
    console.log(route);
    console.log(route.params);
  }, []);
  const handleSubmitPress = () => {
    console.log("handleSubmitPress");
    console.log(route.params);
    setErrortext(''); 
    if(userCurrentPassword == "" || userPassword == "" || userPasswordAgain == ""){
      setUserPasswordError(true);
    }else if(userPassword != userPasswordAgain){
      setUserPasswordError(true);
    }else{
      sendData();   
    }
  };
  const sendData = () =>{
    /*{
  "oldPassword": "string",
  "newPassword": "string"
}*/
    setLoading(true);
    AsyncStorage.getItem('token').then(value =>{
      const config = {
        headers: { Authorization: `Bearer ${value}` }
      };
    let dataToSend = {
      userName: route.params.params.userName,
      oldPassword: userCurrentPassword, 
      newPassword: userPassword,
    };    

    console.log("forgot data");
    console.log(dataToSend);
    //https://api-app.payfour.com/api/auth/addcustomerbasic
    apiPost('loans/sendotpforreset', dataToSend, onResetOtpSent);
    
    });
  }
  const onResetOtpSent = (response) =>{
    console.log(response.data);
        console.log(response.data.data);
        setLoading(false);

        console.log("otp params");
        console.log(response.data.data.transactionId);
        console.log(route.params.params.paymentId);
        console.log(route.params.params.amount);

        navigation.navigate('CreditOtpScreen', {
          params:{
            transactionId:response.data.data.transactionId,
            paymentId: route.params.params.paymentId,
            amount:route.params.params.amount
          }
        })
  }
  return (

    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}> 
        
        <Loader loading={loading} />
        <SubtabHeader routetarget="ProfileHome" name="Şifre Değiştir" count="0" />       

        <ScrollView
          keyboardShouldPersistTaps="handled"
          style={styles.scrollView}>
          <KeyboardAvoidingView enabled style={{flex:1}}>
            <View style={{padding:16, backgroundColor: '#efeff3', flex:1}}>
              <View>
                <Text style={{color:'#004F97', fontSize:16, fontWeight:'700', marginBottom:16, paddingTop:12}}>
                Kredi giriş şifreni güncellemelisin
                </Text>
                <View style={{}}>
                  <Text style = {{fontSize:12, color:'#909EAA'}}>{`\u2022`} Şifreniz 6 rakamdan oluşmalıdır.</Text>
                  <Text style = {{fontSize:12, color:'#909EAA'}}>{`\u2022`} Şifreniz ardışık rakamlardan oluşmamalıdır.</Text>
                  <Text style = {{fontSize:12, color:'#909EAA'}}>{`\u2022`} Şifre aynı rakamlardan oluşmamalıdır.</Text>
                  <Text style = {{fontSize:12, color:'#909EAA', marginBottom: 14,}}>{`\u2022`} Şifrenizin geçerlilik süresi 3 aydır.</Text>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'space-between',
                  paddingTop: 12,
                  paddingBottom: 30,
                }}>           

                <View>
                  
                  <View style={styles.sectionStyle}>
                  <View style={[styles.registerInputStyle, {marginBottom:12, borderColor: userPasswordError ? '#ff0000' : '#E4E4E8',}]}>                  
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
                      Mevcut Şifre
                    </Text>
                    <Pressable
                      style={{
                        position: 'absolute',
                        top: 20,
                        right: 20,
                        zIndex: 10,
                      }}
                      onPress={() => setSecureText(!secureText)}>
                        {secureText? <Image 
                      source={require('../../../assets/img/export/eye_off.png')}
                      style={{
                        width:24,
                        height:24
                      }}>
                      </Image> : 
                      <Image 
                      source={require('../../../assets/img/export/eye.png')}
                      style={{
                        width:24,
                        height:24
                      }}>
                      </Image>}
                      {/* <Image
                        source={require('../../../assets/img/export/eye.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                        }}
                      /> */}
                    </Pressable>
                    <TextInput
                      style={{                      
                        fontSize: 16,
                        lineHeight:8, 
                        padding:0,
                        color: '#015096',
                      }}
                      maxLength={6}
                      onFocus={() => setUserPasswordError(false)}
                      onChangeText={UserCurrentPassword => setUserCurrentPassword(UserCurrentPassword)}
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
                    <View style={[styles.registerInputStyle, {marginBottom:12, borderColor: userPasswordError ? '#ff0000' : '#E4E4E8',}]}>                  
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
                      Yeni Şifre
                    </Text>
                    <Pressable
                      style={{
                        position: 'absolute',
                        top: 20,
                        right: 20,
                        zIndex: 10,
                      }}
                      onPress={() => setSecureText2(!secureText2)}>
                        {secureText2? <Image 
                      source={require('../../../assets/img/export/eye_off.png')}
                      style={{
                        width:24,
                        height:24
                      }}>
                      </Image> : 
                      <Image 
                      source={require('../../../assets/img/export/eye.png')}
                      style={{
                        width:24,
                        height:24
                      }}>
                      </Image>}
                      {/* <Image
                        source={require('../../../assets/img/export/eye.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                        }}
                      /> */}
                    </Pressable>
                    <TextInput
                      style={{                      
                        fontSize: 16,
                        lineHeight:8, 
                        padding:0,
                        color: '#015096',
                      }}
                      maxLength={6}
                      onFocus={() => setUserPasswordError(false)}
                      onChangeText={UserPassword => setUserPassword(UserPassword)}
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
                    
                    
                    <View style={[styles.registerInputStyle, {borderColor: userPasswordError ? '#ff0000' : '#E4E4E8', marginBottom:36}]}>                  
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
                      Yeni Şifre Tekrar
                    </Text>
                    <Pressable
                      style={{
                        position: 'absolute',
                        top: 20,
                        right: 20,
                        zIndex: 10,
                      }}
                      onPress={() => setSecureText3(!secureText3)}>
                      {/* <Eye width={22} height={12} /> */}
                      {secureText3? <Image 
                      source={require('../../../assets/img/export/eye_off.png')}
                      style={{
                        width:24,
                        height:24
                      }}>
                      </Image> : 
                      <Image 
                      source={require('../../../assets/img/export/eye.png')}
                      style={{
                        width:24,
                        height:24
                      }}>
                      </Image>}
                      {/* <Image
                        source={require('../../../assets/img/export/eye.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                        }}
                      /> */}
                    </Pressable>
                    <TextInput
                      style={{                      
                        fontSize: 16,
                        lineHeight:8, 
                        padding:0,
                        color: '#015096',
                      }}
                      maxLength={6}
                      onFocus={() => setUserPasswordError(false)}
                      onChangeText={UserPasswordAgain => setUserPasswordAgain(UserPasswordAgain)}
                      placeholder="" //12345
                      placeholderTextColor="#7E797F"
                      keyboardType="numeric"
                      ref={passwordInputRef}
                      onSubmitEditing={Keyboard.dismiss}
                      blurOnSubmit={false}
                      secureTextEntry={secureText3}
                      underlineColorAndroid="#f000"
                      returnKeyType="next"
                    />
                    {errortext !== '' ? (
                      <Text style={styles.errorTextStyle}> {errortext} </Text>
                    ) : null}
                    </View>
                    
                    
                    <TouchableOpacity
                    style={[styles.buttonStyle, {marginBottom: 60, backgroundColor: '#004F97'}]}
                    
                    activeOpacity={0.5}
                    onPress={handleSubmitPress}>
                      <Text style={styles.buttonTextStyle}>Onayla</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
  );
};
export default CreditChangePasswordScreen;

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
    width:'100%'
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
    //marginTop: 20,
  },
  buttonStyle: {
    backgroundColor: '#1D1D25',
    borderWidth: 0,
    color: '#FFFFFF',
    height: 65,
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 0,
    marginRight: 0,
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

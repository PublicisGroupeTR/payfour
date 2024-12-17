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
  Linking,
  Modal,
  Pressable,
  ImageBackground,
  Alert,
  Dimensions
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {SafeAreaView} from 'react-native-safe-area-context';

import Loader from '../../Components/Loader.js';
import SubtabHeader from '../../Components/SubtabHeader.js';
import { registerStyles } from '../../Components/RegisterStyles';

import axios from 'react-native-axios';

const ProfileChangePassword = ({navigation}) => {
  const [userEmail, setUserEmail] = useState('');
  const [userEmailError, setUserEmailError] = useState(false);
  const [userCurrentPassword, setUserCurrentPassword] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userPasswordAgain, setUserPasswordAgain] = useState('');
  const [UserRefcode, setUserUserRefcode] = useState('');
  const [userPasswordError, setUserPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [secureText2, setSecureText2] = useState(true);
  const [secureText3, setSecureText3] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const [userAgreement, setUserAgreement] = useState(false);
  const [userKVKKAgreement, setUserKVKKAgreement] = useState(false);
  const [userPaymentAgreement, setUserPaymentAgreement] = useState(false);
  const passwordInputRef = createRef();

  const handleSubmitPress = () => {
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
      oldPassword: userCurrentPassword, 
      newPassword: userPassword,
    };    

    console.log("forgot data");
    console.log(dataToSend);
    //https://payfourapp.test.kodegon.com/api/auth/addcustomerbasic
    axios.post('https://payfourapp.test.kodegon.com/api/auth/changepassword', dataToSend, config)
      .then(response => {
        console.log(response.data);
        console.log(response.data.data);
        setLoading(false);
        //AsyncStorage.setItem('accessToken', response.data.data.accessToken).then(() =>{
          navigation.navigate("LoginWithPasswordScreen");
        //})
      })
      .catch(error => {
        setLoading(false);
        console.error("Error sending data: ", error);
        console.log(error.response);
        let msg="";
        (error.response.data.errors.message) ? msg += error.response.data.errors.message+"\n" : msg += "Ödeme hatası \n"; (error.response.data.errors.paymentError) ? msg += error.response.data.errors.paymentError+"\n" : msg += ""; Alert.alert(msg);
      });
    });
  }
  
  return (

    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>  
        
        <Loader loading={loading} />
        <SubtabHeader routetarget="ProfileHome" name="Şifre Değiştir" count="0" />       

        <ScrollView
          keyboardShouldPersistTaps="handled"
          style={[registerStyles.scrollView, {backgroundColor: '#efeff3'}]}>
          <KeyboardAvoidingView enabled style={{flex:1}}>
            <View style={{padding:16, flex:1}}>
              <View>
                <Text style={{color:'#004F97', fontSize:16, fontWeight:'700', marginBottom:16, paddingTop:12}}>
                Uygulama giriş şifreni güncelleyebilirsin
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
                  <View style={[styles.registerInputStyle, , {marginBottom:12, borderColor: userPasswordError ? '#ff0000' : '#E4E4E8',}]}>                  
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
                  <TouchableOpacity
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
                        width:16,
                        height:16
                      }}>
                      </Image> : 
                      <Image 
                      source={require('../../../assets/img/export/eye.png')}
                      style={{
                        width:16,
                        height:16
                      }}>
                      </Image>}
                  </TouchableOpacity>
                  <TextInput
                    style={Platform.OS == 'ios' ? registerStyles.inputIos
                    : registerStyles.inputAndroid }
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
                  <View style={[styles.registerInputStyle, , {marginBottom:12, borderColor: userPasswordError ? '#ff0000' : '#E4E4E8',}]}>                  
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
                  <TouchableOpacity
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
                        width:16,
                        height:16
                      }}>
                      </Image> : 
                      <Image 
                      source={require('../../../assets/img/export/eye.png')}
                      style={{
                        width:16,
                        height:16
                      }}>
                      </Image>}
                  </TouchableOpacity>
                  <TextInput
                    style={Platform.OS == 'ios' ? registerStyles.inputIos
                    : registerStyles.inputAndroid }
                    maxLength={6}
                    onFocus={() => setUserPasswordError(false)}
                    onChangeText={UserPasswordAgain => setUserPassword(UserPasswordAgain)}
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
                  <View style={[styles.registerInputStyle, , {marginBottom:12, borderColor: userPasswordError ? '#ff0000' : '#E4E4E8',}]}>                  
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
                  <TouchableOpacity
                    style={{
                      position: 'absolute',
                      top: 20,
                      right: 20,
                      zIndex: 10,
                    }}
                    onPress={() => setSecureText3(!secureText3)}>
                    {secureText3? <Image 
                      source={require('../../../assets/img/export/eye_off.png')}
                      style={{
                        width:16,
                        height:16
                      }}>
                      </Image> : 
                      <Image 
                      source={require('../../../assets/img/export/eye.png')}
                      style={{
                        width:16,
                        height:16
                      }}>
                      </Image>}
                  </TouchableOpacity>
                  <TextInput
                    style={Platform.OS == 'ios' ? registerStyles.inputIos
                    : registerStyles.inputAndroid }
                    maxLength={6}
                    onFocus={() => setUserPasswordError(false)}
                    onChangeText={UserPassword => setUserPasswordAgain(UserPassword)}
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
export default ProfileChangePassword;

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
    justifyContent:'center',
    borderRadius: 10,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 0,
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

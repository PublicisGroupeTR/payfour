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
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Loader from './Components/Loader';
import {SafeAreaView} from 'react-native-safe-area-context';
import Eye from '../assets/img/svg/eye.svg';
import Toplogo from '../assets/img/svg/toplogo.svg';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';


const LoginScreen = ({navigation}) => {
  const [userEmail, setUserEmail] = useState('');
  const [userEmailError, setUserEmailError] = useState(false);
  const [userPassword, setUserPassword] = useState('');
  const [userPasswordError, setUserPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const passwordInputRef = createRef();

  const handleSubmitPress = () => {
    setErrortext('');
    if (!userEmail || !userPassword) {
      if (!userEmail) {
        //alert('Please fill Email');
        setUserEmailError(true);
      }
      if (!userPassword) {
        //alert('Please fill Password');
        setUserPasswordError(true);
      }
      return;
    }
    setLoading(true);
    let dataToSend = {email: userEmail, password: userPassword};
    let formBody = [];
    for (let key in dataToSend) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    fetch('https://api.gelirortaklari.com/auth', {
      method: 'POST',
      body: formBody,
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
        // If server response message same as Data Matched
        if (responseJson.error === undefined) {
          AsyncStorage.setItem('userId', JSON.stringify(responseJson.userId));
          AsyncStorage.setItem('affiliateId', responseJson.affiliateId);
          AsyncStorage.setItem('auth_token', responseJson.apiKey);
          console.log(responseJson.apiKey);
          navigation.replace('TabNavigationRoutes');
        } else {
          /*setErrortext('Please check your email id or password');
          console.log('Please check your email id or password');*/
          setModalVisible(true);
        }
      })
      .catch(error => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
  };

  const openLink = async link => {
    try {
      const url = link;
      if (await InAppBrowser.isAvailable()) {
        const result = await InAppBrowser.open(url, {
          // iOS Properties
          dismissButtonStyle: 'cancel',
          preferredBarTintColor: '#006dd6',
          preferredControlTintColor: 'white',
          readerMode: false,
          animated: true,
          modalPresentationStyle: 'fullScreen',
          modalTransitionStyle: 'coverVertical',
          modalEnabled: true,
          enableBarCollapsing: false,
          // Android Properties
          showTitle: true,
          toolbarColor: '#006dd6',
          secondaryToolbarColor: 'black',
          navigationBarColor: 'black',
          navigationBarDividerColor: 'white',
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: false,
          // Specify full animation resource identifier(package:anim/name)
          // or only resource name(in case of animation bundled with app).
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right',
          },
          headers: {
            'my-custom-header': 'my custom header value',
          },
        });
        /*await this.sleep(800);
        Alert.alert(JSON.stringify(result))*/
      } else {
        Linking.openURL(url);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <KeyboardAvoidingView behavior="padding" style={{flex: 1, padding: 0}}>
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
                  openLink(
                    'https://panel.gelirortaklari.com/users/forgot_password',
                  );
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
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              paddingTop: 66,
              paddingBottom: 30,
            }}>
            <View style={{alignItems: 'center'}}>
              <Toplogo width={72} height={60} style={{marginBottom: 30}} />

              {/* <Image
                source={require('../assets/img/top-logo.png')}
                style={{
                  width: 72,
                  height: 70,
                  resizeMode: 'contain',
                  marginBottom: 30,
                }}
              /> */}
            </View>

            <View style={styles.centerStyle}>
              <Text
                style={{
                  fontFamily: 'Helvetica',
                  fontSize: 16,
                  marginBottom: 40,
                  color: '#1D1D25',
                  textAlign: 'center',
                  paddingLeft: 10,
                  paddingRight: 10,
                }}>
                Sahip olduğunuz e-posta adresi ve şifre ile giriş
                yapabilirsiniz.
              </Text>
              <View style={styles.sectionStyle}>
                <Text
                  style={[
                    styles.inputTitleStyle,
                    {
                      fontSize: 14,
                      fontWeight: '700',
                      marginBottom: 14,
                      color: '#1D1D25',
                    },
                  ]}>
                  E-posta Adresi
                </Text>
                <TextInput
                  style={{
                    borderColor: userEmailError ? '#ff0000' : '#EBEBEB',
                    borderWidth: 1,
                    padding: 20,
                    fontSize: 12,
                    borderRadius: 10,
                    height: 54,
                    color: '#1D1D25',
                    marginBottom: 40,
                  }}
                  onFocus={() => setUserEmailError(false)}
                  onChangeText={UserEmail => setUserEmail(UserEmail)}
                  autoCapitalize="none"
                  placeholder="E-posta"
                  placeholderTextColor="#7E797F"
                  keyboardType="email-address"
                  returnKeyType="next"
                  onSubmitEditing={() =>
                    passwordInputRef.current && passwordInputRef.current.focus()
                  }
                  underlineColorAndroid="#f000"
                  blurOnSubmit={false}
                />
                <Text
                  style={[
                    styles.inputTitleStyle,
                    {
                      fontSize: 14,
                      fontWeight: '700',
                      marginBottom: 14,
                      color: '#1D1D25',
                    },
                  ]}>
                  Şifre
                </Text>
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    top: 180,
                    right: 20,
                    zIndex: 10,
                  }}
                  onPress={() => setSecureText(!secureText)}>
                  <Eye width={22} height={12} />

                  {/* <Image
                    source={require('../assets/img/eye.png')}
                    style={{
                      width: 24,
                      height: 24,
                      resizeMode: 'contain',
                    }}
                  /> */}
                </TouchableOpacity>
                <TextInput
                  style={{
                    borderColor: userPasswordError ? '#ff0000' : '#EBEBEB',
                    borderWidth: 1,
                    padding: 20,
                    fontSize: 12,
                    borderRadius: 10,
                    height: 54,
                    color: '#1D1D25',
                    marginBottom: 18,
                  }}
                  onFocus={() => setUserPasswordError(false)}
                  onChangeText={UserPassword => setUserPassword(UserPassword)}
                  placeholder="Şifre" //12345
                  placeholderTextColor="#7E797F"
                  keyboardType="default"
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
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    marginBottom: 50,
                  }}>
                  <TouchableOpacity
                    onPress={() =>
                      /*Linking.openURL(
                        'https://panel.gelirortaklari.com/users/forgot_password',
                      )*/
                      openLink(
                        'https://panel.gelirortaklari.com/users/forgot_password',
                      )
                    }>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '300',
                        color: '#7E797F',
                      }}>
                      Şifremi Unuttum
                    </Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={[styles.buttonStyle, {marginBottom: 40}]}
                  activeOpacity={0.5}
                  onPress={handleSubmitPress}>
                  <Text style={styles.buttonTextStyle}>GİRİŞ YAP</Text>
                </TouchableOpacity>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 40,
                  }}>
                  <TouchableOpacity
                    onPress={() =>
                      //Linking.openURL('https://panel.gelirortaklari.com/signup')
                      openLink('https://panel.gelirortaklari.com/signup')
                    }>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '400',
                        color: '#1D1D25',
                        textDecorationLine: 'underline',
                        textAlign: 'center',
                      }}>
                      Hesabın yok mu? Hemen üye ol
                    </Text>
                  </TouchableOpacity>
                  <Image
                    source={require('../assets/img/arrow.png')}
                    style={{
                      width: 5,
                      height: 8,
                      resizeMode: 'cover',
                      marginLeft: 5,
                      marginTop: 2,
                    }}
                  />
                </View>
                {/* <Text
                style={styles.registerTextStyle}
                onPress={() => navigation.navigate('RegisterScreen')}>
                New Here ? Register
              </Text> */}
              </View>
            </View>

            <TouchableOpacity
              onPress={() => Linking.openURL('mailto:go@publicisgroupe.com')}>
              <Text style={styles.copyrightTextStyle}>
                go@publicisgroupe.com
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};
export default LoginScreen;

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

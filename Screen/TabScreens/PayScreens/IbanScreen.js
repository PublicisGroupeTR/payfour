/* eslint-disable react-native/no-inline-styles */
// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  Linking,
  Modal,
  Dimensions,
  StyleSheet,
  Alert
} from 'react-native';
import { registerStyles } from '../../Components/RegisterStyles.js';

import {styles} from '../../Components/Styles.js';
import Loader from '../../Components/Loader.js';
import SubtabHeader from '../../Components/SubtabHeader.js';

import axios from 'react-native-axios';
import MaskInput from 'react-native-mask-input';
import LinearGradient from 'react-native-linear-gradient';
import {Dropdown} from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Clipboard from '@react-native-clipboard/clipboard';

const IbanScreen = ({navigation}) => { 

  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [showTooltip1, setShowTooltip1] = useState(false);
  const [showTooltip2, setShowTooltip2] = useState(false);
  const [showTooltip3, setShowTooltip3] = useState(false);
  const [iban, setIban] = useState('');

  useEffect(() => { 
    const unsubscribe = navigation.addListener('focus', () => {
  setLoading(true);
      AsyncStorage.getItem('token').then(value =>{
        const config = {
          headers: { Authorization: `Bearer ${value}` }
        };
        console.log("getuser");
        axios.get('https://api-app.payfour.com/api/account/getuser', config).then(response => {
          console.log(response.data);
          console.log(response.data.data);
          setIban(response.data.data.defaultBankAccountNumber);         
          
          setLoading(false);
          //}
        })
        .catch(error => {
          setLoading(false);
          console.error("Error sending data: ", error);
          let msg="";
          (error.response.data.errors.message) ? msg += error.response.data.errors.message+"\n" : msg += "Ödeme hatası \n"; (error.response.data.errors.paymentError) ? msg += error.response.data.errors.paymentError+"\n" : msg += ""; Alert.alert(msg);
        });

      });
    });
    });
  

  return(
    <SafeAreaView style={{flex: 1}}>      
      
    <Loader loading={loading} />
    {/* <SubtabHeader routetarget="ProfileHome" name="Kupon Kodu / Davet Kodu" count="0" /> */}
    <ScrollView
keyboardShouldPersistTaps="handled"
style={{}}
    contentContainerStyle={[registerStyles.scrollView, {backgroundColor:'transparent', flex:1,justifyContent: 'flex-end',
  alignItems: 'flex-end'}]}>
<KeyboardAvoidingView enabled>


<View
              style={{
                flex: 1,                
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                backgroundColor: 'rgba(0, 79, 151, 0.6)',
                
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
                  paddingBottom:100
                }}>
                  
                  <View style={{
                    paddingTop:24,
                    paddingBottom:24,
                    alignItems:'center',
                    justifyContent:'center',
                  }}>
                    <Image 
                        source={require('../../../assets/img/export/payfoureft_icon.png')}
                        style={{
                          width: 93,
                          height: 93,
                          resizeMode: 'contain',
                          marginBottom:14,
                        }}
                        />
                  </View>
                  <View style={{
                      marginBottom:24,
                      }}>
                        <Text style={{
                          fontSize:20,
                          fontWeight:'700',
                          color:'#004F97',
                          marginBottom:16,
                          textAlign:'center',
                        }}>
                          Havale / EFT Para yükleme bilgileri
                        </Text>
                        <Text style={{
                          fontSize:12,
                          color:'#909EAA',
                          paddingLeft:24,
                          paddingRight:24,
                          textAlign:'center',
                          marginBottom:26,
                        }}>
                          Payfour hesabına para yüklemek için, bankacılık uygulamanıza giriş yaparak size ait banka hesabınız üzerinden aşağıda yer alan hesap bilgilerini kullanarak yükleme yapabilirsiniz.
                      </Text>
                      <Text style={{
                          fontSize:14,
                          fontWeight:'700',
                          color:'#004F97',
                          marginBottom:8,
                          textAlign:'left',
                        }}>
                          Vakıfbank
                        </Text>
                    <View style={[regstyles.registerInputStyle, {borderColor: '#EBEBEB', paddingBottom:10, paddingTop:28,}]}>                       
                      <Text style={{                                           
                          fontSize: 12,
                          lineHeight:12, 
                          padding:0,
                          color: '#909EAA', 
                          position:'absolute',
                          top:14,                     
                          left:14
                      }}>
                        IBAN numarası
                      </Text>
                      <Text
                        style={{                      
                          fontSize: 14,
                          padding:0,
                          color: '#0B1929',
                        }}
                      >
                        TR810001500158007331469750
                      </Text>
                      <TouchableOpacity style={{
                        width:30,
                        height:30,
                        alignItems:'center',
                        justifyContent:'center',
                        position:'absolute',
                        right:10,
                        top:'90%'
                      }}
                      onPress={()=> {
                        Clipboard.setString('TR810001500158007331469750')
                        setShowTooltip1(true);
                        setTimeout(function(){
                          setShowTooltip1(false);
                        }, 3000);
                      }}>
                        <View style={{
                          position:'absolute',
                          backgroundColor:'#004F97',
                          borderRadius:8,
                          width:65,
                          alignItems:'center',
                          justifyContent:'center',
                          padding:4,
                          top:-24,
                          display: showTooltip1 ? 'flex':'none',
                        }}>
                          <Text style={{color:'#fff', fontSize:11}}>Kopyalandı</Text>
                        </View>
                        <Image 
                        source={require('../../../assets/img/export/copytoclipboard.png')}
                        style={{
                          width: 16,
                          height: 16,
                          resizeMode: 'contain',
                        }}
                      />
                      </TouchableOpacity>
                    </View>
                    <View style={[regstyles.registerInputStyle, {borderColor: '#EBEBEB', paddingBottom:10,paddingTop:28,}]}>                       
                      <Text style={{                                           
                          fontSize: 12,
                          lineHeight:12, 
                          padding:0,
                          color: '#909EAA', 
                          position:'absolute',
                          top:14,                     
                          left:14
                      }}>
                        Alıcı hesap Adı
                      </Text>
                      <Text
                        style={{                      
                          fontSize: 14,
                          padding:0,
                          color: '#0B1929',
                          width:'80%'
                        }}
                      >
                        CarrefourSA Carrefour Sabancı Ticaret Merkezi A.Ş.
                      </Text>
                      <TouchableOpacity style={{
                        width:30,
                        height:30,
                        alignItems:'center',
                        justifyContent:'center',
                        position:'absolute',
                        right:10,
                        top:'70%'
                      }}
                      onPress={()=> {Clipboard.setString('CarrefourSA Carrefour Sabancı Ticaret Merkezi A.Ş.')
                        setShowTooltip2(true);
                        setTimeout(function(){
                          setShowTooltip2(false);
                        }, 3000);
                      }}>
                        <View style={{
                          position:'absolute',
                          backgroundColor:'#004F97',
                          borderRadius:8,
                          width:65,
                          alignItems:'center',
                          justifyContent:'center',
                          padding:4,
                          top:-24,
                          display: showTooltip2 ? 'flex':'none',
                        }}>
                          <Text style={{color:'#fff', fontSize:11}}>Kopyalandı</Text>
                        </View>
                        <Image 
                        source={require('../../../assets/img/export/copytoclipboard.png')}
                        style={{
                          width: 16,
                          height: 16,
                          resizeMode: 'contain',
                        }}
                      />
                      </TouchableOpacity>
                    </View>
                    <View style={[regstyles.registerInputStyle, {borderColor: '#EBEBEB', paddingBottom:10,paddingTop:28,}]}>                       
                      <Text style={{                                           
                          fontSize: 12,
                          lineHeight:12, 
                          padding:0,
                          color: '#909EAA', 
                          position:'absolute',
                          top:14,                     
                          left:14
                      }}>
                        Açıklama
                      </Text>
                      <Text
                        style={{                      
                          fontSize: 14,
                          padding:0,
                          color: '#0B1929',
                          width:'80%'
                        }}
                      >
                        {iban}
                      </Text>
                      <TouchableOpacity style={{
                        width:30,
                        height:30,
                        alignItems:'center',
                        justifyContent:'center',
                        position:'absolute',
                        right:10,
                        top:'90%'
                      }}
                      onPress={()=> {Clipboard.setString(iban)
                        setShowTooltip3(true);
                        setTimeout(function(){
                          setShowTooltip3(false);
                        }, 3000);
                      }}>
                        <View style={{
                          position:'absolute',
                          backgroundColor:'#004F97',
                          borderRadius:8,
                          width:65,
                          alignItems:'center',
                          justifyContent:'center',
                          padding:4,
                          top:-24,
                          display: showTooltip3 ? 'flex':'none',
                        }}>
                          <Text style={{color:'#fff', fontSize:11}}>Kopyalandı</Text>
                        </View>
                        <Image 
                        source={require('../../../assets/img/export/copytoclipboard.png')}
                        style={{
                          width: 16,
                          height: 16,
                          resizeMode: 'contain',
                        }}
                      />
                      </TouchableOpacity>
                    </View>
                      {/* <View style={{
                        padding:16,
                        borderRadius:8,
                        backgroundColor:'#F2F4F6',
                        flexDirection:'row',
                        alignItems:'center',
                        justifyContent:'center',
                      }}>
                        <Text style={{
                          fontSize:16,
                          color:'#0B1929',
                        }}>
                        </Text>
                        <Text style={{
                          fontSize:16,
                          color:'#004F97',
                        }}>
                          {iban}
                        </Text>
                      </View> */}
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
                  onPress={() => {navigation.goBack()}}>
                  <Text
                    style={{fontSize: 14, color: '#ffffff'}}>
                    Kapat
                  </Text>
                </TouchableOpacity>
               
              </View>
            </View>

              </KeyboardAvoidingView>
              </ScrollView>
              </SafeAreaView>
  )
  
};

const profileStyles = StyleSheet.create({
  profileHolder:{
    borderRadius:16, 
    backgroundColor:'#fff', 
    paddingLeft:12, 
    paddingRight:12,
    marginBottom:16, 
    width:'100%'
  },
  profileBtn: {
    height:48,
    paddingTop:16,
    paddingBottom:16,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    borderBottomWidth:1,
    borderColor:'#E4E4E8',
  },
  profileLeft:{
    flexDirection:'row',
  },
  profileIconHolder:{
    paddingRight:24,
  },
  profileIcon:{
    width:24,
    height:24,    
  },
  profileText:{
    color:'#0B1929',
    fontSize:14,
    fontWeight:'700',
  },
  profileArrow:{
    width:24,
    height:24,
  },
  profileTitleHolder:{
    width:'100%',
    marginBottom:16,
  },
  profileTitle:{
    color:'#909EAA',
    fontSize:14,
    textAlign:'left',
  },
});
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
    width:'100%',
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
export default IbanScreen;

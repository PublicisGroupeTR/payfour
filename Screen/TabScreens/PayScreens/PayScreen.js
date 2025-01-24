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
import { apiGet } from '../../utils/api.js';

const PayScreen = ({navigation}) => { 

  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  
  const handleExit = () => {
    console.log('handleExit');

    setModalVisible(true);
  };
  const sendCode = () => {
    setLoading(true);
    AsyncStorage.getItem('token').then(value =>{
      
      const config = {
        headers: { Authorization: `Bearer ${value}` }
      };
    
    

  console.log(dataToSend);
  let dataToSend ={
    "code": code,
  }
  apiPost('account/redeemcode',dataToSend,onRedeemCode)
  
          
          });
  };
  const onRedeemCode = (response) => {
              console.log(response);
              console.log(response.data);
              if(response.data.success){
                console.log("coupon success")
                //navigation.navigate('Success');
                setSuccessModalVisible(true);
              }else{
                setLoading(false);
                console.log("coupon error")
              }
  }
  

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
                backgroundColor: 'rgba(0, 79, 151, 0.6)'
              }}>
              <View
                style={{
                  backgroundColor:'#fff',
                  borderTopLeftRadius: 24,
                  borderTopRightRadius: 24,
                  paddingTop: 68,
                  paddingBottom: 100,
                  paddingLeft: 16,
                  paddingRight: 16,
                  width: '100%',
                }}>
                  <View style={{
                      marginBottom:16,
                      }}>
                        <Text style={{
                          fontSize:16,
                          fontWeight:'700',
                          color:'#004F97',
                          lineHeight:20,
                          textAlign:'center',
                        }}>
                          Para Yükle
                        </Text>
                        <Text style={{
                          fontSize:14,
                          lineHeight:20,
                          color:'#909eaa',
                          paddingLeft:24,
                          paddingRight:24,
                          textAlign:'center',
                          marginBottom:26,
                        }}>
                          Cüzdana para yüklemek için yükleme yöntemini seçiniz.
                      </Text>
                      <View style={{
                        padding:16,
                        borderRadius:8,
                        borderColor:'#E4E4E8',
                        borderWidth:1,
                        marginBottom:12,
                      }}>
                        <TouchableOpacity                            
                             onPress={() => { navigation.navigate('CashScreen')
                             }}>
                        <View style={{
                          flexDirection:'row',
                          alignItems:'center',
                          justifyContent:'space-between',
                          paddingBottom:8,                          
                        }}>
                          <View style={{
                            flexDirection:'row',
                            alignItems:'center',
                          }}>
                            <Image
                              source={require('../../../assets/img/export/add_register.png')}
                              style={{
                                width: 24,
                                height: 24,
                                resizeMode: 'contain',
                                marginRight:8,
                              }}
                            />
                            <Text style={{
                              fontSize:14,
                              color:'#004F97',
                            }}>
                              Kasadan Para Yükle
                            </Text>
                          </View>
                          
                            <Image
                                source={require('../../../assets/img/export/arrow_right_dark.png')}
                                style={{
                                  width: 24,
                                  height: 24,
                                  resizeMode: 'contain',
                                }}
                              />
                          
                      </View>
                      </TouchableOpacity>
                        <Text style={{
                          fontSize:14,
                          color:'#909eaa',
                          borderTopWidth:1,
                          borderTopColor:'#E4E4E8',
                          paddingTop:8,
                        }}>
                          Kasadan para yüklemek için kasadaki görevliye payfour bilgilerinizi veriniz.
                        </Text>
                      </View>
                      <View style={{
                        padding:16,
                        borderRadius:8,
                        borderColor:'#E4E4E8',
                        borderWidth:1,
                        marginBottom:12,
                      }}>
                        
                        <TouchableOpacity
                            
                            onPress={() => { navigation.navigate('IbanScreen')
                              }}>
                        <View style={{
                          flexDirection:'row',
                          alignItems:'center',
                          justifyContent:'space-between',
                          paddingBottom:8,                          
                        }}>
                          
                          <View style={{
                            flexDirection:'row',
                            alignItems:'center',
                          }}>
                            <Image
                              source={require('../../../assets/img/export/add_iban.png')}
                              style={{
                                width: 24,
                                height: 24,
                                resizeMode: 'contain',
                                marginRight:8,
                              }}
                            />
                            <Text style={{
                              fontSize:14,
                              color:'#004F97',
                            }}>
                              Havale / EFT ile Yükle
                            </Text>
                          </View>
                          
                            <Image
                                source={require('../../../assets/img/export/arrow_right_dark.png')}
                                style={{
                                  width: 24,
                                  height: 24,
                                  resizeMode: 'contain',
                                }}
                              />
                          
                      </View>
                      </TouchableOpacity>
                        <Text style={{
                          fontSize:14,
                          color:'#909eaa',
                          borderTopWidth:1,
                          borderTopColor:'#E4E4E8',
                          paddingTop:8,
                        }}>
                          Belirtilen IBAN numarasına Havale / EFT yoluyla para göndererek para yükleyebilirsiniz.
                        </Text>
                      </View>
                      <View style={{
                        padding:16,
                        borderRadius:8,
                        borderColor:'#E4E4E8',
                        borderWidth:1,
                      }}>
                        <TouchableOpacity                            
                          onPress={()=>{
                            
                            navigation.navigate('wallet', { 
                              //screen: 'MasterpassScreen',
                              screen: 'MasterpassScreen2',
                              //screen: 'MasterPassExample',
                            })
                          }}>
                        <View style={{
                          flexDirection:'row',
                          alignItems:'center',
                          justifyContent:'space-between',
                          paddingBottom:8,                          
                        }}>
                          <View style={{
                            flexDirection:'row',
                            alignItems:'center',
                          }}>
                            <Image
                              source={require('../../../assets/img/export/add_masterpass.png')}
                              style={{
                                width: 24,
                                height: 24,
                                resizeMode: 'contain',
                                marginRight:8,
                              }}
                            />
                            <Text style={{
                              fontSize:14,
                              color:'#004F97',
                            }}>
                              Masterpass ile Yükle
                            </Text>
                          </View>
                          
                            <Image
                                source={require('../../../assets/img/export/arrow_right_dark.png')}
                                style={{
                                  width: 24,
                                  height: 24,
                                  resizeMode: 'contain',
                                }}
                              />
                          
                      </View>
                      </TouchableOpacity>
                        <Text style={{
                          fontSize:14,
                          color:'#909eaa',
                          borderTopWidth:1,
                          borderTopColor:'#E4E4E8',
                          paddingTop:8,
                        }}>
                          Masterpass’e kayıtlı kredi ya da banka kartı bilgilerin ile hızlıca para yükleyebilirsiniz.
                        </Text>
                      </View>
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
                  onPress={() => navigation.navigate('Discover')}>
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
export default PayScreen;

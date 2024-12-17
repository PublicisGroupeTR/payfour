/* eslint-disable react-native/no-inline-istyles */
// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useEffect, useState, useRef} from 'react';
import {Alert, Platform, ActivityIndicator, View, Stylesheet, Modal, Image, Pressable, ImageBackground, TouchableOpacity, Text, TextInput, Dimensions, StyleSheet, SafeAreaView, Keyboard, KeyboardAvoidingView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createStackNavigator} from '@react-navigation/stack';
import {styles} from '../Components/Styles.js';
import Loader from '../Components/Loader.js';
import TabHeader from '../Components/TabHeader.js';
import Clipboard from '@react-native-clipboard/clipboard';
import {ScrollView} from 'react-native-gesture-handler';
import Swiper from 'react-native-swiper';

import axios from 'react-native-axios';
import MaskInput from 'react-native-mask-input';
import SubtabHeader from '../Components/SubtabHeader.js';
import {Dropdown} from 'react-native-element-dropdown';
import OTPTextView from 'react-native-otp-textinput';
import { Modalize } from 'react-native-modalize';
import LimitSorgulaAydinlatmaMetni from '../Legals/LimitSorgulaAydinlatmaMetni.js';

const Stack = createStackNavigator();

const Intro = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [animating, setAnimating] = useState(true);
  const [slideEnd, setSlideEnd] = useState(false);
  const [userKVKKAgreement, setUserKVKKAgreement] = useState(false);
  const sliderRef = useRef();
  const consentModalizeRef = useRef(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      
    });
    return unsubscribe;
  }, [navigation]);


  return (
    <View style={istyles.container}>
      <Modalize ref={consentModalizeRef}
      snapPoint={0}
      modalStyle={{backgroundColor:(0,0,0,0)}}>
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
                          CARREFOURSA PAYFOUR LİMİT SORGULA AYDINLATMA METNİ
                        </Text>
                        <TouchableOpacity 
                      style={{
                        width:24,
                        height:24,
                      }}
                      onPress={() => {
                        console.log('close');
                        consentModalizeRef.current?.close();}}>                  
                        <Image 
                        source={require('../../assets/img/export/close.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          tintColor:'#0B1929'
                        }}
                      />
                    </TouchableOpacity>
                       </View> 
                      {/* <View style={{marginBottom:24}}>
                        <Text style={{
                          fontSize:12,
                          color:'#909EAA',
                          marginBottom:8,
                        }}>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Libero justo laoreet sit amet cursus sit amet dictum. Vitae sapien pellentesque habitant morbi. Ac odio tempor orci dapibus ultrices. 

Enim ut tellus elementum sagittis vitae. 
In massa tempor nec feugiat nisl pretium fusce id velit. 
Tristique sollicitudin nibh sit amet commodo nulla facilisi nullam. 
Netus et malesuada fames ac turpis egestas sed tempus urna. Turpis massa tincidunt dui ut.
Fermentum posuere urna nec tincidunt praesent semper feugiat.

Purus viverra accumsan in nisl nisi scelerisque eu ultrices vitae. Nisl suscipit adipiscing bibendum est. Tempus imperdiet nulla malesuada pellentesque elit. Fringilla urna porttitor rhoncus dolor purus. Nec feugiat nisl pretium fusce id. Egestas pretium aenean pharetra magna ac. Arcu ac tortor dignissim convallis aenean. Nisi quis eleifend quam adipiscing vitae proin. Urna cursus eget nunc scelerisque viverra mauris in aliquam sem. Enim eu turpis egestas pretium. Nunc mattis enim ut tellus. Orci ac auctor augue mauris augue neque. Consequat interdum varius sit amet mattis vulputate. At urna condimentum mattis pellentesque id nibh tortor. Mattis pellentesque id nibh tortor id aliquet. Cras sed felis eget velit aliquet.
                        </Text>
                        <Text style={{
                          fontSize:12,
                          color:'#909EAA',
                          marginBottom:8,
                        }}>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Libero justo laoreet sit amet cursus sit amet dictum. Vitae sapien pellentesque habitant morbi. Ac odio tempor orci dapibus ultrices. 

Enim ut tellus elementum sagittis vitae. 
In massa tempor nec feugiat nisl pretium fusce id velit. 
Tristique sollicitudin nibh sit amet commodo nulla facilisi nullam. 
Netus et malesuada fames ac turpis egestas sed tempus urna. Turpis massa tincidunt dui ut.
Fermentum posuere urna nec tincidunt praesent semper feugiat.

Purus viverra accumsan in nisl nisi scelerisque eu ultrices vitae. Nisl suscipit adipiscing bibendum est. Tempus imperdiet nulla malesuada pellentesque elit. Fringilla urna porttitor rhoncus dolor purus. Nec feugiat nisl pretium fusce id. Egestas pretium aenean pharetra magna ac. Arcu ac tortor dignissim convallis aenean. Nisi quis eleifend quam adipiscing vitae proin. Urna cursus eget nunc scelerisque viverra mauris in aliquam sem. Enim eu turpis egestas pretium. Nunc mattis enim ut tellus. Orci ac auctor augue mauris augue neque. Consequat interdum varius sit amet mattis vulputate. At urna condimentum mattis pellentesque id nibh tortor. Mattis pellentesque id nibh tortor id aliquet. Cras sed felis eget velit aliquet.
                        </Text>
                        <Text style={{
                          fontSize:12,
                          color:'#909EAA',
                          marginBottom:8,
                        }}>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Libero justo laoreet sit amet cursus sit amet dictum. Vitae sapien pellentesque habitant morbi. Ac odio tempor orci dapibus ultrices. 

Enim ut tellus elementum sagittis vitae. 
In massa tempor nec feugiat nisl pretium fusce id velit. 
Tristique sollicitudin nibh sit amet commodo nulla facilisi nullam. 
Netus et malesuada fames ac turpis egestas sed tempus urna. Turpis massa tincidunt dui ut.
Fermentum posuere urna nec tincidunt praesent semper feugiat.

Purus viverra accumsan in nisl nisi scelerisque eu ultrices vitae. Nisl suscipit adipiscing bibendum est. Tempus imperdiet nulla malesuada pellentesque elit. Fringilla urna porttitor rhoncus dolor purus. Nec feugiat nisl pretium fusce id. Egestas pretium aenean pharetra magna ac. Arcu ac tortor dignissim convallis aenean. Nisi quis eleifend quam adipiscing vitae proin. Urna cursus eget nunc scelerisque viverra mauris in aliquam sem. Enim eu turpis egestas pretium. Nunc mattis enim ut tellus. Orci ac auctor augue mauris augue neque. Consequat interdum varius sit amet mattis vulputate. At urna condimentum mattis pellentesque id nibh tortor. Mattis pellentesque id nibh tortor id aliquet. Cras sed felis eget velit aliquet.
                        </Text>
                       
               
                      </View> */}
                      <LimitSorgulaAydinlatmaMetni /> 
                  </View>
                  
              <View style={{
                  backgroundColor:'#fff',
                  paddingTop:24,
                  paddingBottom:80,
                  paddingLeft:16,
                  paddingRight:16,
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
                      width: '100%',
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
                  onPress={() => consentModalizeRef.current?.close()}>
                  <Text
                    style={{fontSize: 14, color: '#ffffff'}}>
                    Kapat
                  </Text>
                </TouchableOpacity>
               </View>
               
            </View>
      </Modalize>
      <ImageBackground
       style={[istyles.bgimg, {flex:1, width:'100%', backgroundColor:'#fff', paddingBottom:60}]}
       resizeMode="cover"
       source={require('../../assets/img/export/hazir_limit_bg.png')}>
        <ScrollView style={{flex:1}}>
        <View style={{flexDirection:'row', justifyContent:'flex-end',zIndex:2}}>
          <TouchableOpacity style={{width: 32,
                      height: 32, marginRight:8, marginTop:8,
                    paddingTop:60}}
          onPress={()=>{navigation.navigate('Discover')}}>
          <Image
            source={require('../../assets/img/export/close.png')}
            style={{
              width: 32,
              height: 32,
              resizeMode: 'contain',
            }}
          />
          </TouchableOpacity>
        </View>
        <Swiper 
        style={istyles.wrapper}
        ref={sliderRef}
        loop={false}
        onMomentumScrollEnd={(e, state, context) =>{
          /*console.log('index:', state.index);
          console.log('total:', state.total);
          let end = (state.index+1) == state.total;
          console.log("end? "+end);*/
          //console.log(sliderRef.current.);
        }}
        onIndexChanged={(index) =>{
          console.log('index:', index);
          let end =  index ==3;
          console.log("end? "+end);
          setSlideEnd(end);
        }}
        paginationStyle={{
          //top:'-90%',
          //top:20,
          zIndex:1,
          top:40,
          bottom:'auto',
          width: Dimensions.get('window').width - 16,
          paddingLeft:16
        }}
        dot={
          <View
            style={{
              backgroundColor: "#fff",
              width: '50%',
              height: 6,
              borderRadius: 4,
              marginLeft: 6,
              marginRight: 6,
              marginTop: 3,
              marginBottom: 3,
              opacity:0.5
            }}
          />
        }
        activeDot={
          <View
            style={{
              backgroundColor: '#fff',
              width: '50%',
              height: 6,
              borderRadius: 6,
              marginLeft: 6,
              marginRight: 6,
              marginTop: 3,
              marginBottom: 3
            }}
          />
        }>
         
          <View style={[istyles.slide1, {paddingTop:60}]}>
            <View style={{flexDirection:'row', alignItems:'center', width:'100%', paddingLeft:16, marginBottom:20}}>
              <Image
              source={require('../../assets/img/export/hazir_limit_icon.png')}
              style={{
                width: 36, 
                height:36, 
                marginRight:10,
                resizeMode: 'contain'}}
              /> 
              <Text style={{fontSize:14, color:'#004F97'}}>Hazır Limit</Text>
            </View>
            <Image
          source={require('../../assets/img/export/hazir_limit_1.png')}
          style={{
            width: Dimensions.get('window').height*0.3544, 
            height:Dimensions.get('window').height * 0.2834,
            resizeMode: 'contain'}}
          /> 
          <View style={istyles.header}>
              <Text style={istyles.text}>Hazır Limit Nedir? 
              Ne İşe Yarar?</Text>
            </View>
          <View style={istyles.bottomTextHolder}>
            <Text style={[istyles.bottomText, {fontSize:14, marginBottom:16}]}>
            Hazır Limit, CarrefourSA alışverişlerinizde başvuru adımlarınızı tamamladıktan sonra kullanabileceğiniz size özel tanımlanan alışveriş kredisi limit tutarınızdır. Alışveriş yaptıktan sonra ödemesini size özel sunulan vade oranı, erteleme ve taksit seçeneklerine göre gerçekleştirebilirsiniz.
            </Text>
            <Text style={[istyles.bottomText, {fontSize:14}]}>
            Nakit ya da kredi kartı limiti kullanmak istemiyorsanız veya kredi kartınız yoksa hazır limit sayesinde alışverişinizi yapıp ödemesini sonra gerçekleştirebilirsiniz.
            </Text>
          </View>
          <View style={{
                        padding:16,
                        flexDirection:'column',
                        alignItems:'center',
                        justifyContent:'center'
                      }}>
                          <Image
                              source={require('../../assets/img/export/dgfin_logo.png')}
                              style={{
                                width: 73,
                                height: 25,
                                resizeMode: 'contain',
                                marginBottom:6,
                              }}
                            />
                            <Text style={{
                            color:'#0B1929',
                            fontSize:12,
                            textAlign:'center',
                          }}>
                          dgfin BDDK onaylı finansman kuruluşudur.
                          </Text>
                      </View>
          </View>
          <View style={[istyles.slide2, {paddingTop:60}]}>
          <View style={{flexDirection:'row', alignItems:'center', width:'100%', paddingLeft:16, marginBottom:20}}>
              <Image
              source={require('../../assets/img/export/hazir_limit_icon.png')}
              style={{
                width: 36, 
                height:36, 
                marginRight:10,
                resizeMode: 'contain'}}
              /> 
              <Text style={{fontSize:14, color:'#004F97'}}>Hazır Limit</Text>
            </View>
            <Image
          source={require('../../assets/img/export/hazir_limit_2.png')}
          style={{
            width: Dimensions.get('window').height*0.3544, 
            height:Dimensions.get('window').height * 0.2834, 
            resizeMode: 'contain'}}
        />
        <View style={istyles.header}>
              <Text style={istyles.text}>Hazır Limit Geri Ödemesini Nasıl Yaparım?</Text>
            </View>
        <View style={istyles.bottomTextHolder}>
            <Text style={[istyles.bottomText, {fontSize:14, marginBottom:32}]}>
            Size özel sunulan taksit ve vade seçeneklerinden dilediğinizi seçtikten sonra size özel üretilen IBAN'a geri ödemenizi hızlı ve kolay şekilde gerçekleştirebilirsiniz.
            </Text>
          </View>
          <View style={{
                  marginBottom:22,
                  alignItems:'center',
                  flexDirection:'row',
                  paddingRight:32,
                  paddingLeft:32,
                  }}>
                  <View style={{
                        width:20,
                    height:20,
                    marginRight:8,
                    borderRadius:5,
                    alignItems:'center',
                    justifyContent:'center'}}>
                      <Image
                      source={require('../../assets/img/export/information.png')}
                      style={{
                      width: 20,
                      height: 20,
                      resizeMode: 'contain',
                      }}
                      />
                  </View>
                  <TouchableOpacity style={{fontSize:12}} onPress={()=>consentModalizeRef.current?.open()}>  
                  <Text style={{
                  fontWeight:'300',
                  color:'#1E242F',
                  fontSize:12,
                  
                  }}>                    
                    <Text style={{fontSize:12, color:'#015096', textDecorationLine:'underline', fontWeight:'700'}}>Payfour-Limit Sorgula Aydınlatma Metni'ni</Text> onaylıyorum.
                  </Text>
                  </TouchableOpacity>
                  {/* <Pressable
                    style={{
                    width:20,
                    height:20,
                    marginRight:8,
                    backgroundColor:userKVKKAgreement ? '#015096':'#dadee7',
                    borderRadius:5,
                    alignItems:'center',
                    justifyContent:'center'
                    }}
                    onPress={()=>setUserKVKKAgreement(!userKVKKAgreement)}>
                      <Image
                      source={require('../../assets/img/export/check.png')}
                      style={{
                      width: userKVKKAgreement ? 14 : 0,
                      height: userKVKKAgreement ? 10 : 0,
                      resizeMode: 'contain',
                      }}
                      />
                  </Pressable>
                  
                  <TouchableOpacity style={{fontSize:12}} onPress={()=>consentModalizeRef.current?.open()}>  
                  <Text style={{
                  fontWeight:'300',
                  color:'#1E242F',
                  fontSize:12,
                  
                  }}>
                  Kişisel verilerin korunması, işlenmesi ve aktarılmasına ilişkin 
                  
                    <Text style={{fontSize:12, color:'#015096', textDecorationLine:'underline', fontWeight:'700'}}> Açık Rıza Formu’nu</Text> onaylıyorum.
                  </Text>
                  </TouchableOpacity> */}
          </View>
            <View>
            <TouchableOpacity
                style={[styles.buttonStyle, {width:Dimensions.get('window').width - 32, backgroundColor: '#004F97'}]}
                //disabled={!toggleSubmit}
                activeOpacity={0.5}
                //disabled={!userKVKKAgreement}
                onPress={()=>{
                  //navigation.navigate('CreditForm');
                  navigation.navigate('CreditOtp');
                }
                  }>
                <Text style={styles.buttonTextStyle}>Hazır Limitini Öğren</Text>
              </TouchableOpacity>
            </View>
            <View style={{
                        padding:16,
                        flexDirection:'column',
                        alignItems:'center',
                        justifyContent:'center'
                      }}>
                          <Image
                              source={require('../../assets/img/export/dgfin_logo.png')}
                              style={{
                                width: 73,
                                height: 25,
                                resizeMode: 'contain',
                                marginBottom:6,
                              }}
                            />
                            <Text style={{
                            color:'#0B1929',
                            fontSize:12,
                            textAlign:'center',
                          }}>
                          dgfin BDDK onaylı finansman kuruluşudur.
                          </Text>
                      </View>
          </View>
        </Swiper>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};
const Intro2 = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [animating, setAnimating] = useState(true);
  const [slideEnd, setSlideEnd] = useState(false);
  const sliderRef = useRef();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      
    });
    return unsubscribe;
  }, [navigation]);


  return (
    <View style={istyles.container}>
      <ImageBackground
       style={[istyles.bgimg, {flex:1, width:'100%', backgroundColor:'#fff',paddingBottom:60}]}
       resizeMode="cover"
       source={require('../../assets/img/export/sonra_ode_bg.png')}>
        <ScrollView style={{flex:1}}>
        <View style={{flexDirection:'row', justifyContent:'flex-end'}}>
        <TouchableOpacity style={{
          paddingTop:50,
          paddingBottom:20,
          width: 32,
                    height: 32,marginRight:8, marginTop:8,}}
                onPress={()=>{navigation.navigate('Discover')}}>
                <Image
                  source={require('../../assets/img/export/close.png')}
                  style={{
                    width: 32,
                    height: 32,
                    resizeMode: 'contain',
                  }}
                />
                </TouchableOpacity>
        </View>
        <Swiper 
        style={istyles.wrapper}
        ref={sliderRef}
        loop={false}
        onMomentumScrollEnd={(e, state, context) =>{
          /*console.log('index:', state.index);
          console.log('total:', state.total);
          let end = (state.index+1) == state.total;
          console.log("end? "+end);*/
          //console.log(sliderRef.current.);
        }}
        onIndexChanged={(index) =>{
          console.log('index:', index);
          let end =  index ==3;
          console.log("end? "+end);
          setSlideEnd(end);
        }}
        paginationStyle={{
          //top:'-90%',
          top:20,
          bottom:'auto',
          width: Dimensions.get('window').width - 16,
          paddingLeft:16
        }}
        dot={
          <View
            style={{
              backgroundColor: "#fff",
              width: '50%',
              height: 6,
              borderRadius: 4,
              marginLeft: 6,
              marginRight: 6,
              marginTop: 3,
              marginBottom: 3,
              opacity:0.5
            }}
          />
        }
        activeDot={
          <View
            style={{
              backgroundColor: '#fff',
              width: '50%',
              height: 6,
              borderRadius: 6,
              marginLeft: 6,
              marginRight: 6,
              marginTop: 3,
              marginBottom: 3
            }}
          />
        }>
          <View style={[istyles.slide1, {paddingTop:50}]}>
          <View style={{flexDirection:'row', alignItems:'center', width:'100%', paddingLeft:16, marginBottom:20}}>
              <Image
              source={require('../../assets/img/export/sonra_ode_icon.png')}
              style={{
                width: 36, 
                height:36, 
                marginRight:10,
                resizeMode: 'contain'}}
              /> 
              <Text style={{fontSize:14, color:'#004F97'}}>Şimdi Al Sonra Öde</Text>
            </View>
            <Image
          source={require('../../assets/img/export/hazir_limit_1.png')}
          style={{
            width: Dimensions.get('window').height*0.364, 
            height:Dimensions.get('window').height * 0.309, 
            resizeMode: 'contain'}}
          /> 
          <View style={istyles.header}>
              <Text style={istyles.text}>Şimdi Al Sonra Öde Nedir? 
              Ne İşe Yarar?</Text>
            </View>
          <View style={istyles.bottomTextHolder}>
            <Text style={[istyles.bottomText, {fontSize:14, marginBottom:16}]}>
            Şimdi Al Sonra Öde, Hazır Limitinize uygun şekilde yapacağınız alışverişleri size uygun taksit ve vade seçenekleri ile hemen alıp ödemesini daha sonra yapabileceğiniz bir ayrıcalıktır.
            </Text>            
          </View>
          <View style={{
                        padding:16,
                        flexDirection:'column',
                        alignItems:'center',
                        justifyContent:'center'
                      }}>
                          <Image
                              source={require('../../assets/img/export/dgfin_logo.png')}
                              style={{
                                width: 73,
                                height: 25,
                                resizeMode: 'contain',
                                marginBottom:6,
                              }}
                            />
                            <Text style={{
                            color:'#0B1929',
                            fontSize:12,
                            textAlign:'center',
                          }}>
                          dgfin BDDK onaylı finansman kuruluşudur.
                          </Text>
                      </View>
          </View>
          <View style={[istyles.slide2, {paddingTop:50}]}>
          <View style={{flexDirection:'row', alignItems:'center', width:'100%', paddingLeft:16, marginBottom:20}}>
              <Image
              source={require('../../assets/img/export/sonra_ode_icon.png')}
              style={{
                width: 36, 
                height:36, 
                marginRight:10,
                resizeMode: 'contain'}}
              /> 
              <Text style={{fontSize:14, color:'#004F97'}}>Şimdi Al Sonra Öde</Text>
            </View>
            <Image
          source={require('../../assets/img/export/hazir_limit_2.png')}
          style={{
            width: Dimensions.get('window').height*0.4049, 
            height:Dimensions.get('window').height * 0.326, 
            resizeMode: 'contain'}}
        />
        <View style={istyles.header}>
              <Text style={istyles.text}>Şimdi Al Sonra Öde'nin Geri Ödemesini Nasıl Yapabilirim?</Text>
            </View>
        <View style={istyles.bottomTextHolder}>
            <Text style={[istyles.bottomText, {fontSize:14, marginBottom:32}]}>
            Size özel sunulan taksit ve vade seçeneklerinden dilediğinizi seçtikten sonra size özel üretilen IBAN'a geri ödemenizi hızlı ve kolay şekilde gerçekleştirebilirsiniz.
            </Text>
          </View>
            <View>
            <TouchableOpacity
                style={[styles.buttonStyle, {width:Dimensions.get('window').width - 32, backgroundColor: '#004F97'}]}
                //disabled={!toggleSubmit}
                activeOpacity={0.5}
                onPress={()=>{
                  //navigation.navigate('CreditForm');
                  navigation.navigate('Kyc')
                }
                  }>
                <Text style={styles.buttonTextStyle}>Şimdi Kredi Kullan</Text>
              </TouchableOpacity>
            </View>
            <View style={{
                        padding:16,
                        flexDirection:'column',
                        alignItems:'center',
                        justifyContent:'center'
                      }}>
                          <Image
                              source={require('../../assets/img/export/dgfin_logo.png')}
                              style={{
                                width: 73,
                                height: 25,
                                resizeMode: 'contain',
                                marginBottom:6,
                              }}
                            />
                            <Text style={{
                            color:'#0B1929',
                            fontSize:12,
                            textAlign:'center',
                          }}>
                          dgfin BDDK onaylı finansman kuruluşudur.
                          </Text>
                      </View>
          </View>
          
        </Swiper>
      </ScrollView>
      </ImageBackground>
    </View>
  );
};
const CreditOtp = ({navigation, route}) => {
  const [userEmail, setUserEmail] = useState('');
  const [userEmailError, setUserEmailError] = useState(false);
  const [otpError, setOtpError] = useState(false);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(false);
  const [stopOtpTimer, setStopOtpTimer] = useState(false);
  const [userPasswordError, setUserPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [toggleSubmit, setToggleSubmit] = useState(false);
  const [transactionId, setTransactionId] = useState('');

  const [timerCount, setTimerCount] = useState(180);
  const [timerText, setTimerText] = useState('03:00');
  const [resetTimer, setResetTimer] = useState(false);

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
  const sendOtp = () =>{
    console.log("sendotpforpotentiallimit");
    setLoading(true);   
    AsyncStorage.getItem('token').then(value =>{
      const config = {
        headers: { Authorization: `Bearer ${value}` }
      };    
      axios.post('https://payfourapp.test.kodegon.com/api/loans/sendotpforpotentiallimit', {},config).then(response => {
        setLoading(false);
        console.log("sendotpforpotentiallimit");
        console.log(response);
        console.log(response.data.data);
        setTransactionId(response.data.data.transactionId);
        //setModalVisible(true);
        startOtpTimer();
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
  const verifyOtp = () =>{
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

      axios.post('https://payfourapp.test.kodegon.com/api/loans/verifyotpforpotentiallimit', sendData, config).then(response => {
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
        route.params && route.params.forgot ? resendForgot(obj) : resendData(obj);
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

    axios.post('https://payfourapp.test.kodegon.com/api/auth/forgotpassword', dataToSend)
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

    axios.post('https://payfourapp.test.kodegon.com/api/auth/begin', dataToSend)
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
  const handleSubmitOtp = () => {
    console.log("otp submit");
    setTimerCount(0);
    
    AsyncStorage.getItem('uniqueMPANumber').then(value =>{
      //otpInputRef.current.clear();
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
  const sendData = (dataToSend) => {
   dataToSend.otpCode = otp;
    console.log("datatosend");
    console.log(dataToSend);
    let func = route.params.forgot ? 'verifycustomotp' : 'verifyotp';
    axios.post('https://payfourapp.test.kodegon.com/api/auth/'+func, dataToSend)
    .then(response => {
      setLoading(false);
        console.log(response.data); 
        //otpInputRef.current.clear();
        setOtp('');       
      if(response.data.error){
        Alert.alert(response.data.error.message);
      }else{
         
        if(route.params.forgot){
          AsyncStorage.setItem('tempToken', response.data.data.tempToken).then(() =>{
            navigation.navigate("ForgotScreen");
          });
        }else{
          if(response.data.data.isNewUser){
            AsyncStorage.setItem('tempToken', response.data.data.tempToken).then(() =>{
              console.log("set pfid", response.data.data.payfourId.toString());
              AsyncStorage.setItem('payfourId', response.data.data.payfourId.toString()).then(() =>{
                navigation.navigate("RegisterScreen");
              });
            });
          }else{
            AsyncStorage.setItem('payfourId', response.data.data.payfourId.toString()).then(() =>{
              navigation.navigate("LoginWithPasswordScreen");
            });
          }
        }
      }
    })
    .catch(error => {
      console.error("Error sending data: ", error);
      Alert.alert('Girilen kod hatalı. Lütfen kontrol edin.');
      console.log(otpInputRef)
    });     
    
  };
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
     source={require('../../assets/img/export/login_bg.png')}>
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
              source={require('../../assets/img/info.png')}
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
            style={{flexGrow:1}}>
        <KeyboardAvoidingView enabled  behavior="padding" style={{ flexGrow: 1, minHeight:Dimensions.get('window').height-100 }}>
            <View
              style={{
                flexGrow: 1,
                paddingTop: 0,
                paddingBottom: 140,
                flexDirection:'column',
                justifyContent:'space-between'
                
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
              <View style={{paddingLeft:24, paddingRight:24}}>
                <TouchableOpacity
                  style={[styles.buttonStyle, {marginBottom: 160, backgroundColor: toggleSubmit ? '#004F97' : '#dadee7', }]}
                  
                  activeOpacity={0.5}
                  onPress={verifyOtp}>
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
const CreditForm = ({route, navigation}) => {
  const [loading, setLoading] = useState(false);
  const [offerData, setOfferData] = useState({
    advertiser_id: '0',
    commission: '0',
    commission_model: ' ',
    default_url: '',
    description: '',
    offer_id: '',
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const [otp, setOtp] = useState(false);
  const [stopOtpTimer, setStopOtpTimer] = useState(false);
  const [timerCount, setTimerCount] = useState(180);
  const [timerText, setTimerText] = useState('03:00');
  const [resetTimer, setResetTimer] = useState(false);

  const [educationData, setEducationData] = useState([]);
  const [jobData, setJobData] = useState([]);
  const [titleData, setTitleData] = useState([]);

  const [selectedEducation, setSelectedEducation] = useState('');
  const [selectedJob, setSelectedJob] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('');

  const [userTCKN, setUserTCKN] = useState('');
  const [userBirth, setUserBirth] = useState('');

  const [income, setIncome] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [tempToken, setTempToken] = useState('');

  const [userKVKKAgreement, setUserKVKKAgreement] = useState(false);
  const [dgfinShareAgreement, setDgfinShareAgreement] = useState(false);
  const [dgfinUserAgreement, setDgfinUserAgreement] = useState(false);
  const [dgfinCreditAgreement, setDgfinCreditAgreement] = useState(false);
  const [dgfinKVKKAgreement, setDgfinKVKKAgreement] = useState(false);

  const [formEnabled, setFormEnabled] = useState(false);

  const eduRef = useRef();
  const jobRef = useRef();
  const titleRef = useRef();

  const consentModalizeRef = useRef(null);
  const kvkkModalizeRef = useRef(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log("CreditForm");
      console.log(route.params);
      setTempToken(route.params.tempToken);

      fillEducation();
      
    });
    return unsubscribe;
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
  const fillEducation = () =>{
    setLoading(true);   
    AsyncStorage.getItem('token').then(value =>{
      const config = {
        headers: { Authorization: `Bearer ${value}` }
      };    
      axios.get('https://payfourapp.test.kodegon.com/api/loans/educationlevels', config).then(response => {
        setLoading(false);
        console.log("oneducation");
        console.log(response);
        console.log(response.data.data);
        setEducationData(response.data.data);
        fillJobs();
      })
      .catch(error => {
        setLoading(false);
        //console.error("Error sending data: ", error);
        let msg="";
        (error.response.data.errors.message) ? msg += error.response.data.errors.message+"\n" : msg += "Ödeme hatası \n"; (error.response.data.errors.paymentError) ? msg += error.response.data.errors.paymentError+"\n" : msg += ""; Alert.alert(msg);
      });
    });
  }
  const fillJobs = () =>{
    setLoading(true);   
    AsyncStorage.getItem('token').then(value =>{
      const config = {
        headers: { Authorization: `Bearer ${value}` }
      };    
      axios.get('https://payfourapp.test.kodegon.com/api/loans/occupations', config).then(response => {
        setLoading(false);
        console.log("onoccupations");
        console.log(response);
        console.log(response.data.data);
        setJobData(response.data.data);
        fillRoles();
      })
      .catch(error => {
        setLoading(false);
        //console.error("Error sending data: ", error);
        let msg="";
        (error.response.data.errors.message) ? msg += error.response.data.errors.message+"\n" : msg += "Ödeme hatası \n"; (error.response.data.errors.paymentError) ? msg += error.response.data.errors.paymentError+"\n" : msg += ""; Alert.alert(msg);
      });
    });
  }
  const fillRoles = () =>{
    setLoading(true);   
    AsyncStorage.getItem('token').then(value =>{
      const config = {
        headers: { Authorization: `Bearer ${value}` }
      };    
      axios.get('https://payfourapp.test.kodegon.com/api/loans/occupationroles', config).then(response => {
        setLoading(false);
        console.log("onoccupationroles");
        console.log(response);
        console.log(response.data.data);
        setTitleData(response.data.data);
        //sendOtp();
      })
      .catch(error => {
        setLoading(false);
        //console.error("Error sending data: ", error);
        let msg="";
        (error.response.data.errors.message) ? msg += error.response.data.errors.message+"\n" : msg += "Ödeme hatası \n"; (error.response.data.errors.paymentError) ? msg += error.response.data.errors.paymentError+"\n" : msg += ""; Alert.alert(msg);
      });
    });
  }
  const sendOtp = () =>{
    console.log("sendotpforpotentiallimit");
    setLoading(true);   
    AsyncStorage.getItem('token').then(value =>{
      const config = {
        headers: { Authorization: `Bearer ${value}` }
      };    
      axios.post('https://payfourapp.test.kodegon.com/api/loans/sendotpforpotentiallimit', {},config).then(response => {
        setLoading(false);
        console.log("sendotpforpotentiallimit");
        console.log(response);
        console.log(response.data.data);
        setTransactionId(response.data.data.transactionId);
        setModalVisible(true);
        startOtpTimer();
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
  const verifyOtp = () =>{
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

      axios.post('https://payfourapp.test.kodegon.com/api/loans/verifyotpforpotentiallimit', sendData, config).then(response => {
        setLoading(false);
        console.log("sendotpforpotentiallimit");
        console.log(response);
        console.log(response.data.data);
        setTempToken(response.data.data.tempToken);
        setModalVisible(false);
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
  const sendData = () =>{
    //navigation.navigate('CreditSuccess');
    console.log("sendData");
    /*{
      "tempToken": "string",
      "tckn": "string",
      "birthDate": "2024-10-29T12:14:01.781Z",
      "email": "string",
      "incomes": [
        {
          "incomeTypeId": 0,
          "amount": 0
        }
      ],
      "occupationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "educationLevelId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "occupationRoleId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }*/
      console.log(userBirth);
      let fb = userBirth.replace(/\//g, "");
          let a = fb;
          console.log(a);
          let y = a.substring(4, 8);
          let m = a.substring(2, 4);
          let day = a.substring(0, 2);
        console.log("birthDate");
        console.log(y);
        console.log(m);
        console.log(day);
    
          let dt = y+"-"+day+"-"+m;
          console.log(dt);
          let d = new Date(dt);
          let fd = d.toISOString()

   let sendData={
    tempToken:tempToken,
    tckn:userTCKN,
    birthDate:fd,
    email:"",
    incomes: [
        {
          "incomeTypeId": 0,
          "amount": income
        }
    ],
    occupationId:selectedJob.id,
    educationLevelId:selectedEducation.id,
    occupationRoleId:selectedTitle.id,
   }

   setLoading(true);   
    AsyncStorage.getItem('token').then(value =>{
      const config = {
        headers: { Authorization: `Bearer ${value}` }
      };  
      axios.post('https://payfourapp.test.kodegon.com/api/loans/createpotentiallimit', sendData, config).then(response => {
        setLoading(false);
        console.log("createpotentiallimit");
        console.log(response);
        console.log(response.data.data);
        //setModalVisible(true);
        //setTitleData(response.data.data);
        //fillRoles();
        navigation.navigate('CreditSuccess');
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
  const formatIncome = (income) =>{
    let b = parseFloat(income).toFixed(2);
    //let b = parseFloat("1890").toFixed(2);
    let f = new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', currencyDisplay:'code',minimumFractionDigits:2 }).format(
        b,
      )
    let fr= f.replace('TRY', '').trim();              
    setIncome(fr);
  }
  const checkForm = ()=>{
    console.log(userBirth);
    console.log(userTCKN);
    console.log(income);
    console.log(selectedJob.id);
    console.log(selectedEducation.id);
    console.log(selectedTitle.id);
    if(userBirth != "" && userTCKN != "" && income != "" && selectedJob.id != undefined && selectedEducation.id != undefined && selectedTitle.id != undefined){
      setFormEnabled(true);
    }
 
  }
  const renderItem = item => {
    return (
      <View
      key={item.id}
        style={{
          padding: 18,
          height: 54,
          color: '#1D1D25',
        }}>
        <Text
          style={{
            fontSize: 12,
            color: '#1D1D25',
          }}>
          {item.name}
        </Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <Modalize ref={consentModalizeRef}
      snapPoint={0}
      modalStyle={{backgroundColor:(0,0,0,0)}}>
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
                          Açık Rıza Formu
                        </Text>
                        <TouchableOpacity 
                      style={{
                        width:24,
                        height:24,
                      }}
                      onPress={() => {
                        console.log('close');
                        consentModalizeRef.current?.close();}}>                  
                        <Image 
                        source={require('../../assets/img/export/close.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          tintColor:'#0B1929'
                        }}
                      />
                    </TouchableOpacity>
                       </View> 
                      <View style={{marginBottom:24}}>
                        <Text style={{
                          fontSize:12,
                          color:'#909EAA',
                          marginBottom:8,
                        }}>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Libero justo laoreet sit amet cursus sit amet dictum. Vitae sapien pellentesque habitant morbi. Ac odio tempor orci dapibus ultrices. 

Enim ut tellus elementum sagittis vitae. 
In massa tempor nec feugiat nisl pretium fusce id velit. 
Tristique sollicitudin nibh sit amet commodo nulla facilisi nullam. 
Netus et malesuada fames ac turpis egestas sed tempus urna. Turpis massa tincidunt dui ut.
Fermentum posuere urna nec tincidunt praesent semper feugiat.

Purus viverra accumsan in nisl nisi scelerisque eu ultrices vitae. Nisl suscipit adipiscing bibendum est. Tempus imperdiet nulla malesuada pellentesque elit. Fringilla urna porttitor rhoncus dolor purus. Nec feugiat nisl pretium fusce id. Egestas pretium aenean pharetra magna ac. Arcu ac tortor dignissim convallis aenean. Nisi quis eleifend quam adipiscing vitae proin. Urna cursus eget nunc scelerisque viverra mauris in aliquam sem. Enim eu turpis egestas pretium. Nunc mattis enim ut tellus. Orci ac auctor augue mauris augue neque. Consequat interdum varius sit amet mattis vulputate. At urna condimentum mattis pellentesque id nibh tortor. Mattis pellentesque id nibh tortor id aliquet. Cras sed felis eget velit aliquet.
                        </Text>
                        <Text style={{
                          fontSize:12,
                          color:'#909EAA',
                          marginBottom:8,
                        }}>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Libero justo laoreet sit amet cursus sit amet dictum. Vitae sapien pellentesque habitant morbi. Ac odio tempor orci dapibus ultrices. 

Enim ut tellus elementum sagittis vitae. 
In massa tempor nec feugiat nisl pretium fusce id velit. 
Tristique sollicitudin nibh sit amet commodo nulla facilisi nullam. 
Netus et malesuada fames ac turpis egestas sed tempus urna. Turpis massa tincidunt dui ut.
Fermentum posuere urna nec tincidunt praesent semper feugiat.

Purus viverra accumsan in nisl nisi scelerisque eu ultrices vitae. Nisl suscipit adipiscing bibendum est. Tempus imperdiet nulla malesuada pellentesque elit. Fringilla urna porttitor rhoncus dolor purus. Nec feugiat nisl pretium fusce id. Egestas pretium aenean pharetra magna ac. Arcu ac tortor dignissim convallis aenean. Nisi quis eleifend quam adipiscing vitae proin. Urna cursus eget nunc scelerisque viverra mauris in aliquam sem. Enim eu turpis egestas pretium. Nunc mattis enim ut tellus. Orci ac auctor augue mauris augue neque. Consequat interdum varius sit amet mattis vulputate. At urna condimentum mattis pellentesque id nibh tortor. Mattis pellentesque id nibh tortor id aliquet. Cras sed felis eget velit aliquet.
                        </Text>
                        <Text style={{
                          fontSize:12,
                          color:'#909EAA',
                          marginBottom:8,
                        }}>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Libero justo laoreet sit amet cursus sit amet dictum. Vitae sapien pellentesque habitant morbi. Ac odio tempor orci dapibus ultrices. 

Enim ut tellus elementum sagittis vitae. 
In massa tempor nec feugiat nisl pretium fusce id velit. 
Tristique sollicitudin nibh sit amet commodo nulla facilisi nullam. 
Netus et malesuada fames ac turpis egestas sed tempus urna. Turpis massa tincidunt dui ut.
Fermentum posuere urna nec tincidunt praesent semper feugiat.

Purus viverra accumsan in nisl nisi scelerisque eu ultrices vitae. Nisl suscipit adipiscing bibendum est. Tempus imperdiet nulla malesuada pellentesque elit. Fringilla urna porttitor rhoncus dolor purus. Nec feugiat nisl pretium fusce id. Egestas pretium aenean pharetra magna ac. Arcu ac tortor dignissim convallis aenean. Nisi quis eleifend quam adipiscing vitae proin. Urna cursus eget nunc scelerisque viverra mauris in aliquam sem. Enim eu turpis egestas pretium. Nunc mattis enim ut tellus. Orci ac auctor augue mauris augue neque. Consequat interdum varius sit amet mattis vulputate. At urna condimentum mattis pellentesque id nibh tortor. Mattis pellentesque id nibh tortor id aliquet. Cras sed felis eget velit aliquet.
                        </Text>
                       
               
                      </View>
                  </View>
                  
              <View style={{
                  backgroundColor:'#fff',
                  paddingTop:24,
                  paddingBottom:80,
                  paddingLeft:16,
                  paddingRight:16,
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
                      width: '100%',
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
                  onPress={() => consentModalizeRef.current?.close()}>
                  <Text
                    style={{fontSize: 14, color: '#ffffff'}}>
                    Kapat
                  </Text>
                </TouchableOpacity>
               </View>
               
            </View>
      </Modalize>
      <Modalize ref={kvkkModalizeRef}
      snapPoint={0}
      modalStyle={{backgroundColor:(0,0,0,0)}}>
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
                          Kişisel Verilerin Korunması Kanunu
                        </Text>
                        <TouchableOpacity 
                      style={{
                        width:24,
                        height:24,
                      }}
                      onPress={() => {
                        console.log('close');
                        kvkkModalizeRef.current?.close();}}>                  
                        <Image 
                        source={require('../../assets/img/export/close.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          tintColor:'#0B1929'
                        }}
                      />
                    </TouchableOpacity>
                       </View> 
                      <View style={{marginBottom:24}}>
                        <Text style={{
                          fontSize:12,
                          color:'#909EAA',
                          marginBottom:8,
                        }}>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Libero justo laoreet sit amet cursus sit amet dictum. Vitae sapien pellentesque habitant morbi. Ac odio tempor orci dapibus ultrices. 

Enim ut tellus elementum sagittis vitae. 
In massa tempor nec feugiat nisl pretium fusce id velit. 
Tristique sollicitudin nibh sit amet commodo nulla facilisi nullam. 
Netus et malesuada fames ac turpis egestas sed tempus urna. Turpis massa tincidunt dui ut.
Fermentum posuere urna nec tincidunt praesent semper feugiat.

Purus viverra accumsan in nisl nisi scelerisque eu ultrices vitae. Nisl suscipit adipiscing bibendum est. Tempus imperdiet nulla malesuada pellentesque elit. Fringilla urna porttitor rhoncus dolor purus. Nec feugiat nisl pretium fusce id. Egestas pretium aenean pharetra magna ac. Arcu ac tortor dignissim convallis aenean. Nisi quis eleifend quam adipiscing vitae proin. Urna cursus eget nunc scelerisque viverra mauris in aliquam sem. Enim eu turpis egestas pretium. Nunc mattis enim ut tellus. Orci ac auctor augue mauris augue neque. Consequat interdum varius sit amet mattis vulputate. At urna condimentum mattis pellentesque id nibh tortor. Mattis pellentesque id nibh tortor id aliquet. Cras sed felis eget velit aliquet.
                        </Text>
                        <Text style={{
                          fontSize:12,
                          color:'#909EAA',
                          marginBottom:8,
                        }}>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Libero justo laoreet sit amet cursus sit amet dictum. Vitae sapien pellentesque habitant morbi. Ac odio tempor orci dapibus ultrices. 

Enim ut tellus elementum sagittis vitae. 
In massa tempor nec feugiat nisl pretium fusce id velit. 
Tristique sollicitudin nibh sit amet commodo nulla facilisi nullam. 
Netus et malesuada fames ac turpis egestas sed tempus urna. Turpis massa tincidunt dui ut.
Fermentum posuere urna nec tincidunt praesent semper feugiat.

Purus viverra accumsan in nisl nisi scelerisque eu ultrices vitae. Nisl suscipit adipiscing bibendum est. Tempus imperdiet nulla malesuada pellentesque elit. Fringilla urna porttitor rhoncus dolor purus. Nec feugiat nisl pretium fusce id. Egestas pretium aenean pharetra magna ac. Arcu ac tortor dignissim convallis aenean. Nisi quis eleifend quam adipiscing vitae proin. Urna cursus eget nunc scelerisque viverra mauris in aliquam sem. Enim eu turpis egestas pretium. Nunc mattis enim ut tellus. Orci ac auctor augue mauris augue neque. Consequat interdum varius sit amet mattis vulputate. At urna condimentum mattis pellentesque id nibh tortor. Mattis pellentesque id nibh tortor id aliquet. Cras sed felis eget velit aliquet.
                        </Text>
                        <Text style={{
                          fontSize:12,
                          color:'#909EAA',
                          marginBottom:8,
                        }}>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Libero justo laoreet sit amet cursus sit amet dictum. Vitae sapien pellentesque habitant morbi. Ac odio tempor orci dapibus ultrices. 

Enim ut tellus elementum sagittis vitae. 
In massa tempor nec feugiat nisl pretium fusce id velit. 
Tristique sollicitudin nibh sit amet commodo nulla facilisi nullam. 
Netus et malesuada fames ac turpis egestas sed tempus urna. Turpis massa tincidunt dui ut.
Fermentum posuere urna nec tincidunt praesent semper feugiat.

Purus viverra accumsan in nisl nisi scelerisque eu ultrices vitae. Nisl suscipit adipiscing bibendum est. Tempus imperdiet nulla malesuada pellentesque elit. Fringilla urna porttitor rhoncus dolor purus. Nec feugiat nisl pretium fusce id. Egestas pretium aenean pharetra magna ac. Arcu ac tortor dignissim convallis aenean. Nisi quis eleifend quam adipiscing vitae proin. Urna cursus eget nunc scelerisque viverra mauris in aliquam sem. Enim eu turpis egestas pretium. Nunc mattis enim ut tellus. Orci ac auctor augue mauris augue neque. Consequat interdum varius sit amet mattis vulputate. At urna condimentum mattis pellentesque id nibh tortor. Mattis pellentesque id nibh tortor id aliquet. Cras sed felis eget velit aliquet.
                        </Text>
                       
               
                      </View>
                  </View>
                  
              <View style={{
                  backgroundColor:'#fff',
                  paddingTop:24,
                  paddingBottom:80,
                  paddingLeft:16,
                  paddingRight:16,
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
                      width: '100%',
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
                  onPress={() => kvkkModalizeRef.current?.close()}>
                  <Text
                    style={{fontSize: 14, color: '#ffffff'}}>
                    Kapat
                  </Text>
                </TouchableOpacity>
               </View>
               
            </View>
      </Modalize>
      <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View
              style={{
                flex: 1,                
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                backgroundColor: 'rgba(92, 92, 92, 0.56)',
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
                }}>
                  
                  <View style={{
                    paddingTop:24,
                    paddingBottom:24,
                    alignItems:'center',
                    justifyContent:'center',
                  }}>
                        <Text style={{
                          fontSize:14,
                          fontWeight:'700',
                          lineHeight:20,
                          color:'#0B1929',
                          marginBottom:8,
                        }}>
                          Kart Doğrulama
                        </Text>
                        <Text style={{
                          fontSize:14,
                          lineHeight:20,
                          color:'#909EAA',
                          paddingLeft:24,
                          paddingRight:24,
                          textAlign:'center',
                        }}>
                          Gönderilen tek seferlik doğrulama kodunu giriniz.
                      </Text>
                  </View>
                  <View style={[regstyles.registerInputStyle, {borderColor: '#EBEBEB',}]}>            
                    <TextInput
                      style={{                      
                        fontSize: 14,
                        lineHeight:8, 
                        padding:0,
                        color: '#909EAA',
                      }}
                      onChangeText={Otp => {
                        setOtp(Otp);
                        //verifyOtp(Otp);
                      }}
                      placeholder="Doğrulama Kodu" //12345
                      placeholderTextColor="#909EAA"
                      keyboardType="numeric"
                      onSubmitEditing={Keyboard.dismiss}
                      blurOnSubmit={false}
                      underlineColorAndroid="#f000"
                      returnKeyType="next"
                    />
                    
                  </View>
                  <Text style={{color:'#0B1929',  fontSize:14, lineHeight:24, textAlign:'center',marginBottom:24}}>Kalan Süre : {timerText}</Text>
                  
                  <View style={{flexDirection:'row'}}>
                  <TouchableOpacity
                  style={[
                    styles.buttonStyle,
                    {
                      width: '50%',
                      height: 52,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 2,
                      borderColor: '#fff',
                      backgroundColor: '#fff',
                      padding:0,
                    },
                  ]}
                  onPress={() => otpMessage()}>
                  <Text
                    style={{fontSize: 14, color: '#004F97'}}>
                    Tekrar Gönder
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.buttonStyle,
                    {
                      width: '50%',
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
                  onPress={() => verifyOtp(otp)}>
                  <Text
                    style={{fontSize: 14, color: '#ffffff'}}>
                    Doğrula
                  </Text>
                </TouchableOpacity>
               </View>
              </View>
            </View>
      </Modal>
      <Loader loading={loading} />      
      <SubtabHeader routetarget="discover" name="Limitini Öğren" count="0" />

      <ScrollView keyboardShouldPersistTaps="handled" style={[styles.scrollView, {paddingBottom:32, backgroundColor: '#efeff3'}]}>
      <KeyboardAvoidingView enabled>
    <View style={{paddingTop: 16,
      paddingBottom: 120,
      paddingLeft: 16,
      paddingRight: 16,}}>
          <View
              style={{
                backgroundColor:'#fff',
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24,
                borderBottomLeftRadius: 24,
                borderBottomRightRadius: 24,
                paddingTop: 16,
                paddingBottom: 16,
                paddingLeft: 16,
                paddingRight: 16,
                width: '100%',
              }}>
                  
                  <View style={{
                    padddingTop:16,
                    paddingBottom:16,
                  }}>
                    
                        <Text style={{
                          fontSize:16,
                          fontWeight:'700',
                          lineHeight:20,
                          color:'#004F97',
                          marginBottom:10,
                          textAlign:'center'
                        }}>
                          Payfour limitinizi öğrenmek için gerekli bilgilerinizi doldurunuz.
                        </Text>
                        {/* <Text style={{
                          fontSize:12,
                          color:'#909EAA',
                          textAlign:'center'
                        }}>
                          Payfour hesabına para yükle keyifle kullan.
                        </Text> */}
                  </View>
                  <View style={{
                    paddingTop:12,
                    paddingBottom:12,
                    paddingLeft:12,
                    paddingRight:12,
                    borderRadius:8,
                    backgroundColor:'#F2F9FF',
                    flexDirection:'row',
                    alignItems:'center',
                    marginBottom:12,
                  }}>
                    {/* <Image 
                        source={require('../../assets/img/export/information_dark.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                        }}
                        /> */}
                        <Text style={{
                          fontSize:12,
                          lineHeight:20,
                          color:'#0B1929',
                          paddingLeft:8,
                          paddingRight:32,
                          textAlign:'ieft',
                        }}>
                          Size özel hazır limitinizi hemen öğrenebilirsiniz.
                      </Text>
                  </View>
                  <View style={[regstyles.registerInputStyle, {borderColor: '#EBEBEB',}]}>            
                    <TextInput
                      style={{                      
                        fontSize: 14,
                        lineHeight:18, 
                        padding:0,
                        paddingLeft:4,
                        color: '#909EAA',
                      }}
                      onChangeText={UserTCKN => {setUserTCKN(UserTCKN); checkForm();}}
                      placeholder="TCKN" //12345
                      placeholderTextColor="#909EAA"
                      keyboardType="default"
                      onSubmitEditing={Keyboard.dismiss}
                      blurOnSubmit={false}
                      underlineColorAndroid="#f000"
                      returnKeyType="next"
                    />
                  </View>
                  <View style={[regstyles.registerInputStyle, {borderColor: '#EBEBEB',paddingBottom:0, paddingTop:28, height:60}]}>                      
                    
                    <Text style={{                                           
                        fontSize: 12,
                        lineHeight:12, 
                        padding:0,
                        color: '#909EAA', 
                        position:'absolute',
                        top:14,                     
                        left:12
                    }}>
                      Doğum Tarihi (GG/AA/YYYY)
                    </Text>
                    <MaskInput
                        value={userBirth}
                        keyboardType="numeric"
                        onChangeText={(masked, unmasked) => {
                          //setUserPhone(masked); // you can use the unmasked value as well
                          setUserBirth(masked)
                          // assuming you typed "9" all the way:
                          console.log(masked); // (99) 99999-9999
                          console.log(unmasked); // 99999999999
                          checkForm();
                          //checkPhone();
                        }}
                        mask={[/\d/, /\d/,'/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                      />
                  </View>
                  <Dropdown
                    style={{
                      borderColor: '#EBEBEB',
                      borderWidth: 1,
                      padding: 16,
                      fontSize: 14,
                      borderRadius: 10,
                      height: 54,
                      color: '#1D1D25',
                      marginBottom: 18,
                    }}
                    placeholderStyle={{
                      fontSize: 14,
                      color: '#909EAA',
                    }}
                    selectedTextStyle={{
                      fontSize: 14,
                      color: '#1D1D25',
                    }}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={educationData}
                    maxHeight={300}
                    labelField="name"
                    valueField="id"
                    placeholder={'Eğitim'}
                    searchPlaceholder="Search..."
                    value={selectedEducation}
                    ref={eduRef}
                    onChange={item => {
                      console.log('selected');
                      console.log(item);
                      setSelectedEducation(item);
                      checkForm();
                    }}
                    renderItem={renderItem}
                  />
                  <Dropdown
                    style={{
                      borderColor: '#EBEBEB',
                      borderWidth: 1,
                      padding: 16,
                      fontSize: 14,
                      borderRadius: 10,
                      height: 54,
                      color: '#1D1D25',
                      marginBottom: 18,
                    }}
                    placeholderStyle={{
                      fontSize: 14,
                      color: '#909EAA',
                    }}
                    selectedTextStyle={{
                      fontSize: 14,
                      color: '#1D1D25',
                    }}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={jobData}
                    maxHeight={300}
                    labelField="name"
                    valueField="id"
                    placeholder={'Meslek'}
                    searchPlaceholder="Search..."
                    value={selectedJob}
                    ref={jobRef}
                    onChange={item => {
                      console.log('selected');
                      console.log(item);
                      setSelectedJob(item);
                      checkForm();
                    }}
                    renderItem={renderItem}
                  />
                  <Dropdown
                    style={{
                      borderColor: '#EBEBEB',
                      borderWidth: 1,
                      padding: 16,
                      fontSize: 14,
                      borderRadius: 10,
                      height: 54,
                      color: '#1D1D25',
                      marginBottom: 18,
                    }}
                    placeholderStyle={{
                      fontSize: 14,
                      color: '#909EAA',
                    }}
                    selectedTextStyle={{
                      fontSize: 14,
                      color: '#1D1D25',
                    }}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={titleData}
                    maxHeight={300}
                    labelField="name"
                    valueField="id"
                    placeholder={'Ünvan'}
                    searchPlaceholder="Search..."
                    value={selectedTitle}
                    ref={titleRef}
                    onChange={item => {
                      console.log('selected');
                      console.log(item);
                      setSelectedTitle(item);
                      checkForm();
                    }}
                    renderItem={renderItem}
                  />
                  <View style={[regstyles.registerInputStyle, {borderColor: '#EBEBEB',}]}>            
                    <TextInput
                      style={{                      
                        fontSize: 14,
                        lineHeight:18, 
                        padding:0,                        
                        paddingLeft:4,
                        color: '#909EAA',
                      }}
                      onChangeText={Income => { setIncome(Income); checkForm();}}
                      value={income}
                      placeholder="Gelir" //12345
                      placeholderTextColor="#909EAA"
                      keyboardType="numeric"
                      onSubmitEditing={Keyboard.dismiss}
                      blurOnSubmit={false}
                      underlineColorAndroid="#f000"
                      returnKeyType="next"
                    />
                  </View>
                  <View style={{
                  marginBottom:22,
                  alignItems:'center',
                  flexDirection:'row',
                  paddingRight:16,
                  }}>
                  <Pressable
                    style={{
                    width:20,
                    height:20,
                    marginRight:8,
                    backgroundColor:userKVKKAgreement ? '#015096':'#dadee7',
                    borderRadius:5,
                    alignItems:'center',
                    justifyContent:'center'
                    }}
                    onPress={()=>setUserKVKKAgreement(!userKVKKAgreement)}>
                      <Image
                      source={require('../../assets/img/export/check.png')}
                      style={{
                      width: userKVKKAgreement ? 14 : 0,
                      height: userKVKKAgreement ? 10 : 0,
                      resizeMode: 'contain',
                      }}
                      />
                  </Pressable> 
                  <TouchableOpacity onPress={()=>consentModalizeRef.current?.open()}>
                  <Text style={{
                  fontWeight:'300',
                  color:'#1E242F',
                  fontSize:12,
                  }}>
                  Kişisel verilerin korunması, işlenmesi ve aktarılmasına ilişkin <Text style={{color:'#015096', textDecorationLine:'underline', fontWeight:'700'}}>Açık Rıza Formu’nu</Text> onaylıyorum.
                  </Text>
                  </TouchableOpacity>
                  </View>
                  <View style={{
                  marginBottom:22,
                  alignItems:'center',
                  flexDirection:'row',
                  paddingRight:16,
                  }}>
                  <Pressable
                    style={{
                    width:20,
                    height:20,
                    marginRight:8,
                    backgroundColor:dgfinShareAgreement ? '#015096':'#dadee7',
                    borderRadius:5,
                    alignItems:'center',
                    justifyContent:'center'
                    }}
                    onPress={()=>setDgfinShareAgreement(!dgfinShareAgreement)}>
                      <Image
                      source={require('../../assets/img/export/check.png')}
                      style={{
                      width: dgfinShareAgreement ? 14 : 0,
                      height: dgfinShareAgreement ? 10 : 0,
                      resizeMode: 'contain',
                      }}
                      />
                  </Pressable>  
                  <Text style={{
                  fontWeight:'300',
                  color:'#1E242F',
                  fontSize:12,
                  }}>
                  Dgfin Kredi kullanımı için verilerimin Dgpara ve Dgfin ile paylaşmasına ve işlenmesini onaylıyorum.
                  </Text>
                  </View>
                  <View style={{
                  marginBottom:22,
                  alignItems:'center',
                  flexDirection:'row',
                  paddingRight:16,
                  }}>
                  <Pressable
                    style={{
                    width:20,
                    height:20,
                    marginRight:8,
                    backgroundColor:dgfinUserAgreement ? '#015096':'#dadee7',
                    borderRadius:5,
                    alignItems:'center',
                    justifyContent:'center'
                    }}
                    onPress={()=>setDgfinUserAgreement(!dgfinUserAgreement)}>
                      <Image
                      source={require('../../assets/img/export/check.png')}
                      style={{
                      width: dgfinUserAgreement ? 14 : 0,
                      height: dgfinUserAgreement ? 10 : 0,
                      resizeMode: 'contain',
                      }}
                      />
                  </Pressable>  
                  <Text style={{
                  fontWeight:'300',
                  color:'#1E242F',
                  fontSize:12,
                  }}>
                  Dgfin kullanıcı sözleşmesi
                  </Text>
                  </View>
                  <View style={{
                  marginBottom:22,
                  alignItems:'center',
                  flexDirection:'row',
                  paddingRight:16,
                  }}>
                  <Pressable
                    style={{
                    width:20,
                    height:20,
                    marginRight:8,
                    backgroundColor:dgfinCreditAgreement ? '#015096':'#dadee7',
                    borderRadius:5,
                    alignItems:'center',
                    justifyContent:'center'
                    }}
                    onPress={()=>setDgfinCreditAgreement(!dgfinCreditAgreement)}>
                      <Image
                      source={require('../../assets/img/export/check.png')}
                      style={{
                      width: dgfinCreditAgreement ? 14 : 0,
                      height: dgfinCreditAgreement ? 10 : 0,
                      resizeMode: 'contain',
                      }}
                      />
                  </Pressable>  
                  <Text style={{
                  fontWeight:'300',
                  color:'#1E242F',
                  fontSize:12,
                  }}>
                  Dgfin genel kredi sözleşmesi
                  </Text>
                  </View>
                  <View style={{
                  marginBottom:22,
                  alignItems:'center',
                  flexDirection:'row',
                  paddingRight:16,
                  }}>
                  <Pressable
                    style={{
                    width:20,
                    height:20,
                    marginRight:8,
                    backgroundColor:dgfinKVKKAgreement ? '#015096':'#dadee7',
                    borderRadius:5,
                    alignItems:'center',
                    justifyContent:'center'
                    }}
                    onPress={()=>setDgfinKVKKAgreement(!dgfinKVKKAgreement)}>
                      <Image
                      source={require('../../assets/img/export/check.png')}
                      style={{
                      width: dgfinKVKKAgreement ? 14 : 0,
                      height: dgfinKVKKAgreement ? 10 : 0,
                      resizeMode: 'contain',
                      }}
                      />
                  </Pressable>
                  <Pressable style={{
                  fontWeight:'300',
                  color:'#1E242F',
                  fontSize:12,
                  lineHeight:12,
                  flexDirection:'column',
                  justifyContent:'flex-end'
                  }} onPress={()=> kvkkModalizeRef.current?.open()}>  
                  <Text style={{
                  fontWeight:'300',
                  color:'#1E242F',
                  fontSize:12,
                  }}>
                  Dgfin <Text style={{color:'#015096', textDecorationLine:'underline', fontWeight:'700', fontSize:12, lineHeight:12}}>Kişisel Verilerin Korunması Kanunu</Text> ve <Text style={{color:'#015096', textDecorationLine:'underline', fontWeight:'700'}}>Açık Rıza Formu’nu</Text> onaylıyorum.
                  </Text>
                  </Pressable>
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
                      borderColor: formEnabled? '#004F97' : '#909EAA',
                      backgroundColor: formEnabled? '#004F97' : '#909EAA',
                      padding:0,
                    },
                  ]}
                  disabled={!formEnabled}
                  onPress={() => {
                    sendData();
                    //sendOtp();
                    }}>
                  <Text
                    style={{fontSize: 14, color: '#ffffff'}}>
                    Limitini Öğren
                  </Text>
                </TouchableOpacity>
               
              </View>
              </View>
              </KeyboardAvoidingView>
      </ScrollView>

    </SafeAreaView>
  );
};
const CreditSuccess = ({route, navigation}) =>{
  const handleSubmitPress = () =>{
    navigation.navigate('discover');
  }
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#efeff3'}}> 
      <SubtabHeader routetarget="discover" name="Limitini Öğren" count="0" />

      <ScrollView keyboardShouldPersistTaps="handled" style={[styles.scrollView, {paddingBottom:32}]}>
      <KeyboardAvoidingView enabled>
    <View style={{paddingTop: 16,
      paddingBottom: 120,
      paddingLeft: 16,
      paddingRight: 16,}}>
          <View
              style={{
                backgroundColor:'#fff',
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24,
                borderBottomLeftRadius: 24,
                borderBottomRightRadius: 24,
                paddingTop: 16,
                paddingBottom: 16,
                paddingLeft: 16,
                paddingRight: 16,
                width: '100%',
                minHeight:Dimensions.get('window').height - 200,
                flexDirection:'column',
                justifyContent:'space-between',
              }}>
                  <View style={{}}>
                    <View style={{marginBottom:24}}>
                    <View style={{flexDirection:'row', justifyContent:'center'}}>
                      <Image
                          source={require('../../assets/img/export/payment_success.png')}
                          style={{
                            width: 56,
                            height: 56,
                            resizeMode:'contain',
                            marginBottom:10,
                          }}
                      />
                      </View>
                    <Text style={{
                      textAlign:'center',
                      color:'#004F97',
                      fontSize:16,
                      fontWeight:'700'
                    }}>
                      Talebiniz Alınmıştır</Text>
                    </View>
                    <View style={{
                      borderRadius:8,
                      backgroundColor:'#F2F9FF',
                      padding:16,
                      alignItems:'center',
                      justifyContent:'center',
                      height:134,
                    }}>
                      <Text style={{textAlign:'center', color:'#0B1929', fontSize:12, marginBottom:12}}>
                      Verdiğiniz bilgiler için teşekkürler. Talebiniz değerlendirmeye alınmıştır.
                      </Text>
                      <Text style={{textAlign:'center', color:'#0B1929', fontSize:12}}>
                          En kısa sürede sizi sms ile bilgilendireceğiz.
                      </Text>
                    </View>
                  </View>                 
                  
                  <View style={{}}>
                    <TouchableOpacity
                      style={{marginBottom: 24}}>
                        <Text style={{color:'#004F97', fontSize:14, fontWeight:'700', textAlign:'center', textDecorationLine:'underline'}}>
                        Limitini nasıl yükseltebilirsin?
                        </Text>
                      </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.buttonStyle, {marginBottom: 24, backgroundColor: '#004F97',}]}
                      activeOpacity={0.5}
                      onPress={handleSubmitPress}>
                      <Text style={styles.buttonTextStyle}>Kapat</Text>
                    </TouchableOpacity>
                  </View>
               
              </View>
              </View>
              </KeyboardAvoidingView>
      </ScrollView>

    </SafeAreaView>
  );
}
const CreditScreen = ({navigation}) => {
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <Stack.Navigator initialRouteName="IntroHazirLimit">
      <Stack.Screen
        name="IntroHazirLimit"
        component={Intro}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="IntroSonraOde"
        component={Intro2}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CreditOtp"
        component={CreditOtp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CreditForm"
        component={CreditForm}
        options={{headerShown: false}}
      /> 
      <Stack.Screen
        name="CreditSuccess"
        component={CreditSuccess}
        options={{headerShown: false}}
      />     
    </Stack.Navigator>
  );
};
export default CreditScreen;

const istyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#254f8e',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
  wrapper: {},
  slide1: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
  },
  slide2: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
  },
 
  header:{
    justifyContent: 'center',
    alignItems: 'center',
    height:Dimensions.get('window').height*0.098,
    width:'100%'
  },
  text: {
    color: '#004F97',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign:'center',
    paddingLeft:32,
    paddingRight:32,
  },
  bottomTextHolder:{
    paddingLeft:24,
    paddingRight:24,
  },
  bottomText:{
    color:'#0B1929',
    fontSize:14,
    textAlign:'center',
  }
})
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
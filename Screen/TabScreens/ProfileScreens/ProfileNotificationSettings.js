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
} from 'react-native';
import { registerStyles } from '../../Components/RegisterStyles';

import {styles} from '../../Components/Styles.js';
import Loader from '../../Components/Loader.js';
import SubtabHeader from '../../Components/SubtabHeader.js';

import axios from 'react-native-axios';
import MaskInput from 'react-native-mask-input';
import LinearGradient from 'react-native-linear-gradient';
import {Dropdown} from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { apiGet, apiPost } from '../../utils/api.js';

const ProfileNotificationSettings = ({navigation}) => { 

  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [campaign, setCampaign] = useState(true);
  const [payment, setPayment] = useState(true);
  const [offers, setOffers] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  
  useEffect(() => {   
    const unsubscribe = navigation.addListener('focus', () => {
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
          
          console.log("ProfileNotificationSettings");
          console.log(keys);
          console.log(obj.campaignSettings);
          console.log(obj.paymentSettings);

          if(obj.campaignSettings) setCampaign(obj.campaignSettings == "true"? true:false);
          if(obj.paymentSettings) setPayment(obj.paymentSettings == "true"? true:false);
        });
      });
    });
    return unsubscribe;
  }, [navigation]);

  const handleExit = () => {
    console.log('handleExit');

    setModalVisible(true);
  };
  const setCampaignData = (data) =>{
    console.log("campaignData"+data);
    setCampaign(data);
    AsyncStorage.setItem('campaignSettings', data? "true" : "false");
  }  
  const setPaymentData = (data) =>{
    console.log("paymentData"+data);

    setPayment(data);
    AsyncStorage.setItem('paymentSettings', data? "true" : "false");
  }

  const sendCode = () => {
    AsyncStorage.getItem('token').then(value =>{
      
      const config = {
        headers: { Authorization: `Bearer ${value}` }
      };
    
  
  console.log(dataToSend);
  let dataToSend ={
    "code": code,
  }
  apiPost('account/redeemcode',dataToSend,onRedeemCode);
  
          
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
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>      
      
    <Loader loading={loading} />
    <SubtabHeader routetarget="ProfileHome" name="Bildirim Ayarları" count="0" />
    <ScrollView
keyboardShouldPersistTaps="handled"
style={[registerStyles.scrollView, {backgroundColor: '#efeff3'}]}>
<KeyboardAvoidingView enabled>
    <View style={{paddingTop: 16,
      paddingBottom: 16,
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
                paddingLeft: 16,
                paddingRight: 16,
                paddingBottom: 16,
                marginBottom:16,
                width: '100%',
              }}>
                  
                  <View style={{
                    height:50,
                    
                    flexDirection:'row',
                    alignItems:'center',
                    justifyContent:'space-between',
                    borderBottomWidth:1,
                    borderBottomColor:'#F2F4F6',
                  }}>
                    
                        <Text style={{
                          fontSize:16,
                          fontWeight:'700',
                          lineHeight:20,
                          color:'#0B1929',
                          textAlign:'left',
                          width:140
                        }}>
                          Kampanyalar
                        </Text>
                        <TouchableOpacity 
                        style={{
                          width:80,
                          height:30,
                          borderRadius:30,
                          flexDirection:'row',
                          alignItems:'center',
                          
                        }}
                        onPress={()=>{ setCampaignData(!campaign)}}>
                          <View style={{
                            flexDirection:campaign?'row':'row-reverse',
                            alignItems:'center',
                            justifyContent:'space-between',
                            paddingLeft:3,
                            paddingRight:3,
                            width:80,
                            height:30,
                            borderRadius:30,
                            backgroundColor: campaign? '#004F97':'#E4E4E8'}}>
                            <Text style={{fontSize:14, color:'#fff', textAlign:'center', flexGrow:1}}>{campaign? 'Açık' : 'Kapalı'}</Text>
                            <View style={{
                              width:24,
                              height:24,
                              borderRadius:24,
                              backgroundColor:'#fff',
                              alignItems:'center',
                              justifyContent:'center',

                              }}>
                              <Image
                          source={ campaign? require('../../../assets/img/export/switch_check.png'):require('../../../assets/img/export/switch_off.png')}
                          style={{
                            width:16,
                            height:16,
                          }}
                        />
                            </View>
                          </View>
                        </TouchableOpacity>
                        
                  </View>
                  <View style={{
                    height:50,
                    
                    flexDirection:'row',
                    alignItems:'center',
                    justifyContent:'space-between',
                  }}>
                    
                        <Text style={{
                          fontSize:16,
                          fontWeight:'700',
                          lineHeight:20,
                          color:'#0B1929',
                          textAlign:'left',
                          width:100
                        }}>
                          Ödemeler
                        </Text>
                        <TouchableOpacity 
                        style={{
                          width:80,
                          height:30,
                          borderRadius:30,
                          flexDirection:'row',
                          alignItems:'center',
                          
                        }}
                        onPress={()=>{ setPaymentData(!payment)}}>
                          <View style={{
                            flexDirection:payment?'row':'row-reverse',
                            alignItems:'center',
                            justifyContent:'space-between',
                            paddingLeft:3,
                            paddingRight:3,
                            width:80,
                            height:30,
                            borderRadius:30,
                            backgroundColor: payment? '#004F97':'#E4E4E8'}}>
                            <Text style={{fontSize:14, color:'#fff', textAlign:'center', flexGrow:1}}>{payment? 'Açık' : 'Kapalı'}</Text>
                            <View style={{
                              width:24,
                              height:24,
                              borderRadius:24,
                              backgroundColor:'#fff',
                              alignItems:'center',
                              justifyContent:'center',

                              }}>
                              <Image
                          source={ payment? require('../../../assets/img/export/switch_check.png'):require('../../../assets/img/export/switch_off.png')}
                          style={{
                            width:16,
                            height:16,
                          }}
                        />
                            </View>
                          </View>
                        </TouchableOpacity>
                        
                  </View>
                  {/* <View style={{
                    height:50,
                    
                    flexDirection:'row',
                    alignItems:'center',
                    justifyContent:'space-between',
                  }}>
                    
                        <Text style={{
                          fontSize:16,
                          fontWeight:'700',
                          lineHeight:20,
                          color:'#0B1929',
                          textAlign:'left',
                          width:100
                        }}>
                          Fırsatlar
                        </Text>
                        <TouchableOpacity 
                        style={{
                          width:80,
                          height:30,
                          borderRadius:30,
                          flexDirection:'row',
                          alignItems:'center',
                          
                        }}
                        onPress={()=>{ setOffers(!offers)}}>
                          <View style={{
                            flexDirection:offers?'row':'row-reverse',
                            alignItems:'center',
                            justifyContent:'space-between',
                            paddingLeft:3,
                            paddingRight:3,
                            width:80,
                            height:30,
                            borderRadius:30,
                            backgroundColor: offers? '#004F97':'#E4E4E8'}}>
                            <Text style={{fontSize:14, color:'#fff', textAlign:'center', flexGrow:1}}>{offers? 'Açık' : 'Kapalı'}</Text>
                            <View style={{
                              width:24,
                              height:24,
                              borderRadius:24,
                              backgroundColor:'#fff',
                              alignItems:'center',
                              justifyContent:'center',

                              }}>
                              <Image
                          source={ offers? require('../../../assets/img/export/switch_check.png'):require('../../../assets/img/export/switch_off.png')}
                          style={{
                            width:16,
                            height:16,
                          }}
                        />
                            </View>
                          </View>
                        </TouchableOpacity>
                        
                  </View> */}


                  
                  
                
                
               
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
export default ProfileNotificationSettings;

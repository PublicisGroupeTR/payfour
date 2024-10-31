/* eslint-disable react-native/no-inline-styles */
// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useEffect, useRef, useState} from 'react';
import {View, Text, SafeAreaView, ScrollView, KeyboardAvoidingView, Image, Modal, FlatList, StyleSheet, Dimensions, TextInput, Keyboard, TouchableOpacity} from 'react-native';
import {styles} from '../../Components/Styles.js';
import TabHeader from '../../Components/TabHeader.js';
import Loader from '../../Components/Loader.js';
import SubtabHeader from '../../Components/SubtabHeader.js';
import { registerStyles } from '../../Components/RegisterStyles.js';

//import {TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'react-native-axios';
import {MasterPassSDK} from '@macellan/masterpass-sdk';
import {RSAKey} from 'react-native-rsa'
import { sha256, sha256Bytes } from 'react-native-sha256';
import { WebView } from 'react-native-webview';
import MaskInput, { createNumberMask } from 'react-native-mask-input';
//https://test-client.bubbleads.co/Scripts/masterpass-javascript-sdk-web.min.js


const ProfileCampaigns = ({navigation}) => {

  const webview = useRef();
  const [phone, setPhone] = useState('');
  const [transactionType, setTransactionType] = React.useState('all');
  const [mpToken, setMptoken] = useState('');
  const [iframeUrl, setIframeUrl] = useState('');
  const [payfourId, setPayfourId] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({token:'', phone:'', payfourId:''});
  const [deleteData, setDeleteData] = useState({cardAlias:'', accountKey:''});
  const scrollRef = useRef(); 
  const [cardData, setCardData] = React.useState([]);
  const scrollRef2 = useRef(); 
  const [carrefourCardData, setCarrefourCardData] = React.useState([]);
  const [cardType, setCardType] = React.useState('bank');
  const [cardListType, setCardListType] = React.useState('bank');
  const [currentObj, setCurrentObj] = useState({"type":"", "data":{}});
  const [cardDeleteModalVisible, setCardDeleteModalVisible] = useState(false);
  useEffect(() => {   
    const unsubscribe = navigation.addListener('focus', () => { 

      console.log('joined campaigns get'); 
      
      });   
    return unsubscribe;
  }, [navigation]);
  




  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <Modal
          animationType="slide"
          transparent={true}
          visible={cardDeleteModalVisible}
          onRequestClose={() => {
            setCardDeleteModalVisible(!cardDeleteModalVisible);
          }}>
            <View
              style={{
                flex: 1,                
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                backgroundColor: 'rgba(92, 92, 92, 0.56)',
              }}>
          
      
      
      <View style={{
        borderTopLeftRadius:24,
        borderTopRightRadius:24,
        backgroundColor:'#fff',
        paddingTop:32,
        paddingBottom:32,
        paddingLeft:16,
        paddingRight:16,
        position:'absolute',
        bottom:0,
        width:'100%'

      }}>
        <Image 
          source={require('../../../assets/img/export/masterpass_logo.png')}
          style={{
            width: 209,
            height: 36,
            resizeMode: 'contain',
            marginBottom:24,
          }}
          />
        
        <View>
        <Text style={{fontSize:16, color:'#004F97', textAlign:'center', fontWeight:'500', marginBottom:48}}>
        Paracard Bonus kartınızı Masterpass altyapısından silmek istediğinize emin misiniz?
        </Text>        
        </View>
        <View style={{flexDirection:'row'}}>
          <TouchableOpacity
            style={[regstyles.buttonStyle, {padding:0, marginLeft:0,marginRight:10, marginBottom: 0, backgroundColor: '#004F97', flex:1}]}              
            activeOpacity={0.5}
            onPress={()=>{
              setCardDeleteModalVisible(false);
              //navigation.navigate('ListCards');
              console.log("send delete");
              confirmDeleteCard();
              }}>
            <Text style={regstyles.buttonTextStyle}>Evet</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[regstyles.buttonStyle, {padding:0, marginLeft:0,marginRight:0, marginBottom: 0, borderWidth:1, borderColor:'#004F97',backgroundColor: '#fff', flex:1}]}              
            activeOpacity={0.5}
            onPress={()=>{
              console.log("close success");
              setCardDeleteModalVisible(false);
              }}>
            <Text style={[regstyles.buttonTextStyle,{color: '#004F97'}]}>Hayır</Text>
          </TouchableOpacity>
        </View>
      </View>
      </View>
      </Modal>
      <Loader loading={loading} />
      <SubtabHeader routetarget="ProfileHome" name="Katıldığım Kampanyalar" count="0" />
      <View style={{padding:16, backgroundColor: '#EAEAEA', flex:1}}>
      <View
              style={{
                backgroundColor:'#fff',
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24,
                borderBottomLeftRadius: 24,
                borderBottomRightRadius: 24,
                padding: 16,
                marginBottom:16,
                width: '100%',
              }}>
                  
                  <View style={{
                    flexDirection:'row',
                    justifyContent:'space-between',
                    alignItems:'center',
                    marginBottom:8,
                  }}>                    
                      <Text style={{
                        fontSize:12,
                        color:'#0B1929',
                        textAlign:'left'
                      }}>
                        Toplam Kazanılan Ödül
                      </Text>
                      <Text style={{fontSize:14, fontWeight:'700',color:'#004F97',}}>
                        0.00TL
                      </Text>
                        
                  </View>
                  <View style={{
                    flexDirection:'row',
                    justifyContent:'space-between',
                    alignItems:'center',
                  }}>                    
                      <Text style={{
                        fontSize:12,
                        color:'#0B1929',
                        textAlign:'left'
                      }}>
                        Kullanılablir Ödül
                      </Text>
                      <Text style={{fontSize:12, color:'#0B1929',}}>
                        0.00TL
                      </Text>
                        
                  </View>                                  
              </View>
        <View style={{borderRadius:16}}>
            
        <View style={{
            padding:8,
            borderRadius:8,
            backgroundColor:'#fff',
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center',
            width:'100%',
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.15,
            shadowRadius: 3.84,
            elevation: 8,
          }}>
            <TouchableOpacity 
            style={{
              alignItems:'center', 
              justifyContent:'center',
              borderRadius:8,
              height:46,
              width:'50%',
              backgroundColor: transactionType==='all'? '#004F97' : '#fff',
            }}
            onPress={()=>{
              setTransactionType('all');
              //getCampaigns(false);
            }}
            >
              <Text style={{
                fontSize:12,
                color: transactionType==='all'? '#fff':'#909EAA',
              }}
              >
                Tümü
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
            style={{
              alignItems:'center', 
              justifyContent:'center',
              borderRadius:8,
              height:46,
              width:'50%',
              backgroundColor: transactionType==='special'? '#004F97' : '#fff',
            }}
            onPress={()=>{
              setTransactionType('special');
              //getCampaigns(true);
            }}
            >
              <Text style={{
                fontSize:12,
                color: transactionType==='special'? '#fff':'#909EAA',
              }}
              >
                Payfour'a Özel
              </Text>
            </TouchableOpacity>            

          </View>
          <View
            style={{
              padding: 18,
              height: 54,
              color: '#1D1D25',
            }}>
            <Text
              style={{
                fontSize: 14,
                color: '#0B1929',
                fontWeight: '700',
                paddingLeft: 0,
              }}>
              Kayıtlı kampanya bulunamadı
            </Text>
          </View>
          
        </View>
      </View>
      
      
    </SafeAreaView>
  );
};




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
export default ProfileCampaigns;

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

import Clipboard from '@react-native-clipboard/clipboard';
import { apiGet } from '../../utils/api.js';

const ProfileCampaigns = ({navigation}) => {

  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(); 
  const [campaignData, setCampaignData] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  useEffect(() => {   
    const unsubscribe = navigation.addListener('focus', () => { 

      console.log('joined campaigns get'); 
      apiGet('campaigns/acceptedcampaigns?page=1&pageSize=12', onGetCampaigns)
      
      });   
    return unsubscribe;
  }, [navigation]);
  
  const onGetCampaigns = (response) =>{
    console.log(response.data.data.items);
    let sl = response.data.data.items;
    for(var i=0; i < sl.length;i++){
      sl[i].key = sl[i].id;      
    }
    console.log(sl);
    setCampaignData(sl);
    setLoading(false);
  }
const Item = ({title, description, key, voucherCodes}) => (
  <View key={key} style={{backgroundColor:'#fff', padding:16, borderRadius:16,}}>       
      <Text style={{
        fontSize:16,
        lineHeight:18,
        color:'#004F97',
        marginBottom:8,
      }}>
        {title}
      </Text>
      <Text style={{
        fontSize:12,
        lineHeight:18,
        color:'#0B1929',
        marginBottom:8,
      }}>
        {description}
      </Text>

      {voucherCodes ? 
      <View style={[regstyles.registerInputStyle, {borderColor: '#EBEBEB',paddingBottom:0, height:64, paddingTop:26, paddingLeft:16}]}>                     
        <Text style={{                                           
            fontSize: 12,
            lineHeight:12, 
            padding:0,
            color: '#909EAA', 
            position:'absolute',
            top:14,                     
            left:16,
            pointerEvents:"none",
        }}>
          Davet Kodu
        </Text>
        <Text style={{color:'#0B1929', fontSize:14, }}>
          {voucherCodes[0]}
        </Text>
          
          <TouchableOpacity style={{
            position:'absolute',
            top:10,
            right:12,
            width:107,
            height:40,
            alignItems:'center',
            justifyContent:'center'
          }}
          onPress={()=> {
            console.log("referral");
            //console.log(referral);
           Clipboard.setString(voucherCodes[0]);
               setSuccessModalVisible(true);
               }}>
              <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', borderRadius:6, borderWidth:1, borderColor:'#004F97',width:107,
            height:40,}}>
            <Image
              source={require('../../../assets/img/export/copytoclipboard.png')}
              style={{
                width:24,
                height:24,
                tintColor:'#004F97',
                marginRight:8,
              }}
            />
            <Text style={{color:'#004F97', fontSize:12}}>
              Kopyala
            </Text>
            </View>
          </TouchableOpacity>
      </View>
      :<View></View>}

  </View>
  );
const renderCampaigns = () => {
    if (campaignData.length > 0) {
      return (        
        <FlatList
            data={campaignData}
            ref={scrollRef}
            renderItem={({item}) => (
              //time, title, refno, img
              <Item title={item.title} description={item.description} voucherCodes={item.voucherCodes} />
            )}
            keyExtractor={item => item.id+Math.random()}
            style={{paddingLeft: 30,
              paddingRight: 30, marginLeft:-30, marginRight:-30}}
            // onEndReached={setPage}
            initialNumToRender={20}            
          />
      );
    } else {
      return (
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
      );
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <Modal
                animationType="slide"
                transparent={true}
                visible={successModalVisible}
                onRequestClose={() => {
                  setSuccessModalVisible(!successModalVisible);
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
              <View style={{
                    flexDirection:'row',
                    justifyContent:'flex-end',
                  }}>
                    <TouchableOpacity 
                      style={{
                        width:24,
                        height:24,
                      }}
                      onPress={() => {
                        console.log('close');
                        setSuccessModalVisible(false);
                        }}>                  
                        <Image 
                        source={require('../../../assets/img/export/close.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                        }}
                      />
                    </TouchableOpacity>
                </View>
              <View>
              <Text style={{fontSize:16, color:'#004F97', textAlign:'center', fontWeight:'500', marginBottom:48}}>
              Kodunuz başarıyla kopyalandı.
              </Text>        
              </View>
              {/* <TouchableOpacity
                style={[regstyles.buttonStyle, {padding:0, marginLeft:0,marginRight:0, marginBottom: 10, backgroundColor: '#004F97', flex:1}]}              
                activeOpacity={0.5}
                onPress={()=>{
                  console.log("close success");
                  setSuccessModalVisible(false);
                  //navigation.navigate('ProfileHome');
                  onShare();
                  }}>
                <Text style={regstyles.buttonTextStyle}>Paylaş</Text>
              </TouchableOpacity> */}
              <TouchableOpacity style={{                            
                backgroundColor:'#004F97',
                alignItems:'center',
                justifyContent:'center',
                borderRadius:8,
                width:'100%',
                height:52, 
              }}
              //onPress={()=>{navigation.navigate('ProfileHome', { filter:'platinum' })}}
              activeOpacity={0.5}
              onPress={()=>{
                console.log("close success");
                setSuccessModalVisible(false);
                //navigation.navigate('ProfileHome');
                //onShare();
                }}>
                <Text style={{color:'#fff', fontSize:14}}>
                Kapat
                </Text>
              </TouchableOpacity>
            </View>
            </View>
            </Modal>
      <Loader loading={loading} />
      <SubtabHeader routetarget="ProfileHome" name="Katıldığım Kampanyalar" count="0" />
      <View style={{padding:16, backgroundColor: '#EAEAEA', flex:1}}>
      
        <View style={{borderRadius:16}}>
            
        {renderCampaigns()}

          

          
        </View>
        <TouchableOpacity style={{
          
          backgroundColor:'#004F97',
          alignItems:'center',
          justifyContent:'center',
          borderRadius:8,
          width:'100%',
          height:52, 
          position:'absolute',
          bottom:120,
          left: 16
        }}
        //onPress={()=>{navigation.navigate('ProfileHome', { filter:'platinum' })}}
        onPress={() => navigation.navigate('campaign', { 
          screen: 'CampaignList',          
        })}
        >
          <Text style={{color:'#fff', fontSize:14}}>
          Keşfetmeye Başla
          </Text>
        </TouchableOpacity>
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

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
  Share,
  Alert,
} from 'react-native';
import { registerStyles } from '../../Components/RegisterStyles';

import {styles} from '../../Components/Styles.js';
import Loader from '../../Components/Loader.js';
import SubtabHeader from '../../Components/SubtabHeader.js';

import axios from 'react-native-axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Clipboard from '@react-native-clipboard/clipboard';
import { apiGet } from '../../utils/api.js';
import { Modalize } from 'react-native-modalize';
import DavetKurallari from '../../Legals/DavetKurallari.js';

const ProfileInvite = ({navigation}) => { 

  const [referral, setReferral] = useState('');
  const [loading, setLoading] = useState(false);
  const [inviteModalVisible, setInviteModalVisible] = useState(false);
  const [winModalVisible, setWinModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  
  const rulesModalizeRef = useRef(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // do something
      console.log('Hello World!');
      var obj = {};
      AsyncStorage.getItem('token').then(value =>{
        const config = {
          headers: { Authorization: `Bearer ${value}` }
        };
        console.log("getuser");
        apiGet('account/getuser', onGetUser);
        

      });
    });
    return unsubscribe;
  }, [navigation]);
  const onGetUser = (response)=>{
    console.log(response.data);
    console.log(response.data.data);
    console.log(response.data.data.tckn);
    setReferral(response.data.data.referralCode)
    //setUserData(response.data.data);
    //setIban(response.data.data.defaultBankAccountNumber);
    
    setLoading(false);
  }

  const copyCode = ()=>{
    Clipboard.setString(referral);
    setSuccessModalVisible(true);
  }
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
        referral+" davet kodum ile sen de Payfour’a üye ol, 10 TL Puan kazan. Kod 31.12.2025 tarihine kadar geçerlidir. Payfour’u indir: link",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  }

  return(
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}> 
    <Modal
          animationType="slide"
          transparent={true}
          visible={inviteModalVisible}
          onRequestClose={() => {
            setInviteModalVisible(!inviteModalVisible);
          }}>
            <View
              style={{
                flex: 1,                
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                backgroundColor: 'rgba(92, 92, 92, 0.56)',
              }}
              >
          
      
      
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
                      setInviteModalVisible(false);
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
            Davet kodunuzu kopyalayarak davet etmek istediğiniz arkadaşlarınızla ve sevdiklerinizle paylaşabilirsiniz.
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
              setInviteModalVisible(false);
              }}>
              <Text style={{color:'#fff', fontSize:14}}>
              Kapat
              </Text>
            </TouchableOpacity>
          </View>
      </View>
      </Modal> 
      <Modal
          animationType="slide"
          transparent={true}
          visible={winModalVisible}
          onRequestClose={() => {
            setWinModalVisible(!winModalVisible);
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
                  setWinModalVisible(false);
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
        Kodu paylaştığınız arkadaşınızın Payfour’a ilk defa üye olması ve üye olurken "Referans Kodu" alanına ilettiğiniz davet kodunu girmesi yeterli olacaktır.
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
          setWinModalVisible(false);
          }}>
          <Text style={{color:'#fff', fontSize:14}}>
          Kapat
          </Text>
        </TouchableOpacity>
      </View>
      </View>
      </Modal>    
      <Modal
          animationType="slide"
          transparent={true}
          visible={successModalVisible}
          onRequestClose={() => {
            setSuccessModalVisible(!successModalVisible);
          }}>
            <TouchableOpacity
              style={{
                flex: 1,                
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                backgroundColor: 'rgba(92, 92, 92, 0.56)',
              }}
              onPress={()=> setSuccessModalVisible(false)}>
          
      
      
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
            onShare();
            }}>
            <Text style={{color:'#fff', fontSize:14}}>
            Paylaş
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      </Modal>
      <Modalize ref={rulesModalizeRef}
      snapPoint={0}
      modalStyle={{}}>
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
                          Payfour’a Arkadaşını Davet Et, toplamda 100 TL Puan Kazan!
                        </Text>
                        <TouchableOpacity 
                      style={{
                        width:24,
                        height:24,                      
                        color: '#0B1929',
                      }}
                      onPress={() => {
                        console.log('close');
                        rulesModalizeRef.current?.close();}}>                  
                        <Image 
                        source={require('../../../assets/img/export/close.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          tintColor:'#0B1929'
                        }}
                      />
                    </TouchableOpacity>
                       </View> 
                      
                      
                     <DavetKurallari /> 
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
                  onPress={() => rulesModalizeRef.current?.close()}>
                  <Text
                    style={{fontSize: 14, color: '#ffffff'}}>
                    Kapat
                  </Text>
                </TouchableOpacity>
               </View>
               
            </View>
          </Modalize>
    <Loader loading={loading} />
    <SubtabHeader routetarget="ProfileHome" name="Arkadaşını Davet Et" count="0" />
    <ScrollView
keyboardShouldPersistTaps="handled"
style={[registerStyles.scrollView, {backgroundColor: '#F2F9FF'}]}>
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
                paddingBottom:16,
                marginBottom:16,
                width: '100%',
              }}>
                  

                  <View style={[regstyles.registerInputStyle, {borderColor: '#EBEBEB',paddingBottom:0, height:60, paddingTop:24, paddingLeft:16}]}>                     
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
                    <Text style={{color:'#004F97', fontSize:20, fontWeight:700}}>
                      {referral}
                    </Text>
                      
                      <TouchableOpacity style={{
                        position:'absolute',
                        top:16,
                        right:20,
                        width:32,
                        height:32,
                        alignItems:'center',
                        justifyContent:'center'
                      }}
                      onPress={()=> {
                        console.log("referral");
                        console.log(referral);
                        copyCode()}}>
                        <Image
                          source={require('../../../assets/img/export/copytoclipboard.png')}
                          style={{
                            width:16,
                            height:16,
                            tintColor:'#0B1929'
                          }}
                        />
                      </TouchableOpacity>
                  </View>
                  
                
                
               
              {/* </View>
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
                paddingBottom:24,
                marginBottom:16,
                width: '100%',
              }}> */}
                  

                  <Text style={{color:'#004F97', fontSize:12, fontWeight:700, marginBottom:8}}>
                  Arkadaşınızı davet edin, 100 TL Puan kazanın!
                  </Text>
                  <Text style={{color:'#909EAA', fontSize:12, marginBottom:16}}>
                  Arkadaşınızı Payfour’a davet edin, sizin davet kodunuzla üye olsun, hem siz hem de arkadaşınız 10 TL Puan kazansın!
                  </Text>

                  
                
                
               
              </View>
              <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:16}}>
                <TouchableOpacity style={{height:40, alignItems:'center', justifyContent:'center', backgroundColor:'#DFF0FF', borderRadius:6, width:'48%'}}
                onPress={()=>setInviteModalVisible(true)}>
                    <Text style={{color:'#004F97', fontSize:12, fontWeight:700}}>
                    Nasıl Davet Edeceğim?
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{height:40, alignItems:'center', justifyContent:'center', backgroundColor:'#DFF0FF', borderRadius:6, width:'48%'}}
                  onPress={()=>setWinModalVisible(true)}>
                    <Text style={{color:'#004F97', fontSize:12, fontWeight:700}}>
                    Nasıl Kazanacağım?
                    </Text>
                  </TouchableOpacity>
              </View>
              <TouchableOpacity style={{height:40, alignItems:'center', justifyContent:'center', borderWidth:1, borderColor:'#004F97',borderRadius:6, width:'100%'}}
                  onPress={()=>rulesModalizeRef.current?.open()}>
                    <Text style={{color:'#004F97', fontSize:12, fontWeight:700}}>
                    Kampanya Koşulları
                    </Text>
                  </TouchableOpacity>
              {/* <TouchableOpacity
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
                  //onPress={() => sendCode(code)}
                  >
                  <Text
                    style={{fontSize: 14, color: '#ffffff'}}>
                    Ödülü Yükle
                  </Text>
                </TouchableOpacity> */}
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
export default ProfileInvite;

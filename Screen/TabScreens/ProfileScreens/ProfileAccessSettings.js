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
  Platform,
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

const ProfileAccessSettings = ({navigation}) => { 

  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [camera, setCamera] = useState(false);
  const [people, setPeople] = useState(false);
  const [location, setLocation] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [photos, setPhotos] = useState(false);
  const [faceId, setFaceId] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [exitModalVisible, setExitModalVisible] = useState(false);
  const [eraseModalVisible, setEraseModalVisible] = useState(false);
  
  const handleExit = () => {
    console.log('handleExit');

    setModalVisible(true);
  };
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

          if(obj.camera) setCamera(obj.camera == "true"? true:false);
          if(obj.people) setPeople(obj.people == "true"? true:false);
          if(obj.location) setLocation(obj.location == "true"? true:false);
          if(obj.notifications) setNotifications(obj.notifications == "true"? true:false);
          if(obj.photos) setPhotos(obj.photos == "true"? true:false);
          if(obj.faceId) setFaceId(obj.faceId == "true"? true:false);
        });
      });
    });
    return unsubscribe;
  }, [navigation]);
  const setCameraData = (data) =>{
    console.log("setCameraData"+data);
    setCamera(data);
    AsyncStorage.setItem('camera', data? "true" : "false");
  }
  const setPeopleData = (data) =>{
    console.log("setPeopleData"+data);
    setPeople(data);
    AsyncStorage.setItem('people', data? "true" : "false");
  }
  const setLocationData = (data) =>{
    console.log("setLocationData"+data);
    setLocation(data);
    AsyncStorage.setItem('location', data? "true" : "false");
  }
  const setNotificationsData = (data) =>{
    console.log("setNotificationsData"+data);
    setNotifications(data);
    AsyncStorage.setItem('notifications', data? "true" : "false");
  }
  const setPhotosData = (data) =>{
    console.log("setPhotosData"+data);
    setPhotos(data);
    AsyncStorage.setItem('photos', data? "true" : "false");
  }
  const setFaceIdData = (data) =>{
    console.log("setFaceIdData"+data);
    setFaceId(data);
    AsyncStorage.setItem('faceId', data? "true" : "false");
  }
  return(
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>      
      <Modal
            animationType="slide"
            transparent={true}
            visible={exitModalVisible}
            onRequestClose={() => {
              setExitModalVisible(!exitModalVisible);
            }}>
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
                  paddingTop: 32,
                  paddingBottom: 16,
                  paddingLeft: 16,
                  paddingRight: 16,
                  width: Dimensions.get('window').width,
                }}>
                  
                  <View style={{
                      marginBottom:24,
                      }}>
                        <Text style={{
                          fontSize:16,
                          fontWeight:'700',
                          color:'#004F97',
                          marginBottom:16,
                          textAlign:'center',
                        }}>
                          Payfour hesabınızı silmek istediğinize emin misiniz?
                        </Text>
                                      
                  </View>
                  
                <View style={{width:'100%', paddingLeft:0, paddingRight:0, flexDirection:'row', justifyContent:'space-between'}}>

<TouchableOpacity
            style={[regstyles.buttonStyle, {padding:0, marginLeft:0,marginRight:10, backgroundColor: '#fff',borderWidth:1, borderColor:'#004F97', flex:1}]}              
            activeOpacity={0.5}
            onPress={() => setExitModalVisible(false)}>
            <Text style={[regstyles.buttonTextStyle, {color:'#004F97'}]}>Vazgeç</Text>
          </TouchableOpacity>
        <TouchableOpacity
            style={[regstyles.buttonStyle, { height: 52,padding:0, marginLeft:0,marginRight:0, backgroundColor: '#004F97', flex:1}]}              
            activeOpacity={0.5}
            onPress={()=> {
              setExitModalVisible(false);
              setEraseModalVisible(true);
            }}>
            <Text style={regstyles.buttonTextStyle}>Devam Et</Text>
          </TouchableOpacity>
                {/* <TouchableOpacity
                    style={[
                      styles.buttonStyle,
                      {
                        width: '48%',
                        height: 52,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderWidth: 2,
                        borderColor: '#004F97',
                        backgroundColor: '#fff',
                        padding:0,
                      },
                    ]}
                    onPress={() => setExitModalVisible(false)}>
                    <Text
                      style={{fontSize: 14, color: '#004F97'}}>
                      Vazgeç
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.buttonStyle,
                      {
                        width: '48%',
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
                    onPress={() => {setExitModalVisible(false);
                      setEraseModalVisible(true);
                    }}>
                    <Text
                      style={{fontSize: 14, color: '#ffffff'}}>
                      Devam Et
                    </Text>
                  </TouchableOpacity> */}
                </View>
              </View>
            </View>
      </Modal>
      <Modal
                  animationType="slide"
                  transparent={true}
                  visible={eraseModalVisible}
                  onRequestClose={() => {
                    setEraseModalVisible(!eraseModalVisible);
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
                              setEraseModalVisible(false);
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
                        <View style={{
                          paddingTop:24,
                          paddingBottom:24,
                          alignItems:'center',
                          justifyContent:'center',
                        }}>
                          {/* <Image 
                              source={require('../../../assets/img/export/information_large.png')}
                              style={{
                                width: 80,
                                height: 80,
                                resizeMode: 'contain',
                                marginBottom:16,
                              }}/> */}
                              <Text style={{fontSize:16, color:'#004F97', textAlign:'center', fontWeight:'500', marginBottom:16}}>                                      
                                Hesabınızı silmek için lütfen çağrı merkezimiz ile iletişime geçin.
                              </Text>
                              {/* <Text style={{
                                fontSize:14,
                                lineHeight:20,
                                color:'#909EAA',
                                paddingLeft:24,
                                paddingRight:24,
                                textAlign:'center',
                              }}>
                                Çağrı merkezimiz en kısa sürede sizinle iletişime geçecektir.
                            </Text> */}
                        </View>
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
                          },
                        ]}
                        // onPress={() => setEraseModalVisible(false)}
                        onPress={()=>{
                                    console.log("close success");
                                    setEraseModalVisible(false);
                                    Linking.openURL(`tel:4441000`);
                                    }}>
                        <Text
                          style={{fontSize: 14, color: '#ffffff'}}>
                          444 1 000
                        </Text>
                      </TouchableOpacity>                            
                    </View>
                  </View>
            </Modal>
    <Loader loading={loading} />
    <SubtabHeader routetarget="ProfileHome" name="Erişim Ayarları" count="0" />
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
                  
                  
                  {/* <View style={{
                    height:52,
                    
                    flexDirection:'row',
                    alignItems:'center',
                    justifyContent:'space-between',
                    borderBottomWidth:1,
                    borderBottomColor:'#F2F4F6',
                  }}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Image
                          source={require('../../../assets/img/export/icon_people.png')}
                          style={{
                            width: 24,
                            height: 24,
                            marginRight:10,
                            resizeMode: 'contain',
                          }}
                        />
                        <Text style={{
                          fontSize:14,
                          fontWeight:'700',
                          lineHeight:20,
                          color:'#0B1929',
                          textAlign:'left',
                          width:120
                        }}>
                          Kişiler
                        </Text>
                        </View>
                        <TouchableOpacity 
                        style={{
                          width:48,
                          height:30,
                          borderRadius:30,
                          flexDirection:'row',
                          alignItems:'center',
                          
                        }}
                        onPress={()=>{ setPeopleData(!people)}}>
                          <View style={{
                            flexDirection:people?'row-reverse':'row',
                            alignItems:'center',
                            justifyContent:'space-between',
                            paddingLeft:3,
                            paddingRight:3,
                            width:48,
                            height:28,
                            borderRadius:30,
                            backgroundColor: people? '#004F97':'#E4E4E8'}}>
                            <View style={{
                              width:24,
                              height:24,
                              borderRadius:24,
                              backgroundColor:'#fff',
                              alignItems:'center',
                              justifyContent:'center',

                              }}>
                              
                            </View>
                          </View>
                        </TouchableOpacity>
                        
                  </View> */}
                  <View style={{
                    height:52,
                    
                    flexDirection:'row',
                    alignItems:'center',
                    justifyContent:'space-between',
                    borderBottomWidth:1,
                    borderBottomColor:'#F2F4F6',
                  }}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Image
                          source={require('../../../assets/img/export/icon_notification.png')}
                          style={{
                            width: 24,
                            height: 24,
                            marginRight:10,
                            resizeMode: 'contain',
                          }}
                        />
                        <Text style={{
                          fontSize:14,
                          fontWeight:'700',
                          lineHeight:20,
                          color:'#0B1929',
                          textAlign:'left',
                          width:120
                        }}>
                          Bildirimler
                        </Text>
                        </View>
                        <TouchableOpacity 
                        style={{
                          width:48,
                          height:30,
                          borderRadius:30,
                          flexDirection:'row',
                          alignItems:'center',
                          
                        }}
                        onPress={()=>{ setNotificationsData(!notifications)}}>
                          <View style={{
                            flexDirection:notifications?'row-reverse':'row',
                            alignItems:'center',
                            justifyContent:'space-between',
                            paddingLeft:3,
                            paddingRight:3,
                            width:48,
                            height:28,
                            borderRadius:30,
                            backgroundColor: notifications? '#004F97':'#E4E4E8'}}>
                            <View style={{
                              width:24,
                              height:24,
                              borderRadius:24,
                              backgroundColor:'#fff',
                              alignItems:'center',
                              justifyContent:'center',

                              }}>
                              
                            </View>
                          </View>
                        </TouchableOpacity>
                        
                  </View>
                  <View style={{
                    height:52,
                    
                    flexDirection:'row',
                    alignItems:'center',
                    justifyContent:'space-between',
                    borderBottomWidth:1,
                    borderBottomColor:'#F2F4F6',
                  }}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Image
                          source={require('../../../assets/img/export/icon_location.png')}
                          style={{
                            width: 24,
                            height: 24,
                            marginRight:10,
                            resizeMode: 'contain',
                          }}
                        />
                        <Text style={{
                          fontSize:14,
                          fontWeight:'700',
                          lineHeight:20,
                          color:'#0B1929',
                          textAlign:'left',
                          width:120
                        }}>
                          Konum Servisleri
                        </Text>
                        </View>
                        <TouchableOpacity 
                        style={{
                          width:48,
                          height:30,
                          borderRadius:30,
                          flexDirection:'row',
                          alignItems:'center',
                          
                        }}
                        onPress={()=>{ setLocationData(!location)}}>
                          <View style={{
                            flexDirection:location?'row-reverse':'row',
                            alignItems:'center',
                            justifyContent:'space-between',
                            paddingLeft:3,
                            paddingRight:3,
                            width:48,
                            height:28,
                            borderRadius:30,
                            backgroundColor: location? '#004F97':'#E4E4E8'}}>
                            <View style={{
                              width:24,
                              height:24,
                              borderRadius:24,
                              backgroundColor:'#fff',
                              alignItems:'center',
                              justifyContent:'center',

                              }}>
                              
                            </View>
                          </View>
                        </TouchableOpacity>
                        
                  </View>
                  <View style={{
                    height:52,
                    
                    flexDirection:'row',
                    alignItems:'center',
                    justifyContent:'space-between',
                    borderBottomWidth:1,
                    borderBottomColor:'#F2F4F6',
                  }}>
                      <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Image
                          source={require('../../../assets/img/export/icon_camera.png')}
                          style={{
                            width: 24,
                            height: 24,
                            marginRight:10,
                            resizeMode: 'contain',
                          }}
                        />
                        <Text style={{
                          fontSize:14,
                          fontWeight:'700',
                          lineHeight:20,
                          color:'#0B1929',
                          textAlign:'left',
                          width:120
                        }}>
                          Kamera
                        </Text>
                      </View>
                        <TouchableOpacity 
                        style={{
                          width:48,
                          height:30,
                          borderRadius:30,
                          flexDirection:'row',
                          alignItems:'center',
                          
                        }}
                        onPress={()=>{ setCameraData(!camera)}}>
                          <View style={{
                            flexDirection:camera?'row-reverse':'row',
                            alignItems:'center',
                            justifyContent:'space-between',
                            paddingLeft:3,
                            paddingRight:3,
                            width:48,
                            height:28,
                            borderRadius:30,
                            backgroundColor: camera? '#004F97':'#E4E4E8'}}>                            
                            <View style={{
                              width:24,
                              height:24,
                              borderRadius:24,
                              backgroundColor:'#fff',
                              alignItems:'center',
                              justifyContent:'center',

                              }}>                              
                            </View>
                          </View>
                        </TouchableOpacity>
                        
                  </View>

                  <View style={{
                    height:52,
                    
                    flexDirection:'row',
                    alignItems:'center',
                    justifyContent:'space-between',
                    borderBottomWidth:1,
                    borderBottomColor:'#F2F4F6',
                  }}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Image
                          source={require('../../../assets/img/export/icon_photos.png')}
                          style={{
                            width: 24,
                            height: 24,
                            marginRight:10,
                            resizeMode: 'contain',
                          }}
                        />
                        <Text style={{
                          fontSize:14,
                          fontWeight:'700',
                          lineHeight:20,
                          color:'#0B1929',
                          textAlign:'left',
                          width:120
                        }}>
                          Fotoğraflar
                        </Text>
                        </View>
                        <TouchableOpacity 
                        style={{
                          width:48,
                          height:30,
                          borderRadius:30,
                          flexDirection:'row',
                          alignItems:'center',
                          
                        }}
                        onPress={()=>{ setPhotosData(!photos)}}>
                          <View style={{
                            flexDirection:photos?'row-reverse':'row',
                            alignItems:'center',
                            justifyContent:'space-between',
                            paddingLeft:3,
                            paddingRight:3,
                            width:48,
                            height:28,
                            borderRadius:30,
                            backgroundColor: photos? '#004F97':'#E4E4E8'}}>
                            <View style={{
                              width:24,
                              height:24,
                              borderRadius:24,
                              backgroundColor:'#fff',
                              alignItems:'center',
                              justifyContent:'center',

                              }}>
                              
                            </View>
                          </View>
                        </TouchableOpacity>
                        
                  </View>
                  <View style={{
                    height:52,
                    
                    flexDirection:'row',
                    alignItems:'center',
                    justifyContent:'space-between',
                    borderBottomWidth:1,
                    borderBottomColor:'#F2F4F6',
                  }}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                    {Platform.OS == 'ios'?
                        <Image
                          source={require('../../../assets/img/export/icon_faceid.png')}
                          style={{
                            width: 24,
                            height: 24,
                            marginRight:10,
                            resizeMode: 'contain',
                          }}
                        />
                        :
                        <Image
                          source={require('../../../assets/img/export/icon_touchid.png')}
                          style={{
                            width: 24,
                            height: 24,
                            marginRight:10,
                            resizeMode: 'contain',
                          }}
                        />
                        }
                        {Platform.OS == 'ios'?
                        <Text style={{
                          fontSize:14,
                          fontWeight:'700',
                          lineHeight:20,
                          color:'#0B1929',
                          textAlign:'left',
                          width:120
                        }}>
                          
                          Face ID
                        </Text>
                        :
                        <Text style={{
                          fontSize:14,
                          fontWeight:'700',
                          lineHeight:20,
                          color:'#0B1929',
                          textAlign:'left',
                          width:120
                        }}>                          
                          Touch ID
                        </Text>
                        }
                        </View>
                        <TouchableOpacity 
                        style={{
                          width:48,
                          height:30,
                          borderRadius:30,
                          flexDirection:'row',
                          alignItems:'center',
                          
                        }}
                        onPress={()=>{ setFaceIdData(!faceId)}}>
                          <View style={{
                            flexDirection:faceId?'row-reverse':'row',
                            alignItems:'center',
                            justifyContent:'space-between',
                            paddingLeft:3,
                            paddingRight:3,
                            width:48,
                            height:28,
                            borderRadius:30,
                            backgroundColor: faceId? '#004F97':'#E4E4E8'}}>
                            <View style={{
                              width:24,
                              height:24,
                              borderRadius:24,
                              backgroundColor:'#fff',
                              alignItems:'center',
                              justifyContent:'center',

                              }}>
                              
                            </View>
                          </View>
                        </TouchableOpacity>
                        
                  </View>
                  {/* <View style={{paddingTop:8, paddingBottom:8}}>
                    <Text style={{color:'#909EAA', fontSize:12}}>
                    Nunc mattis enim ut tellus. Orci ac auctor augue mauris augue neque. Consequat interdum varius sit amet mattis vulputate. 
                    <Text style={{fontWeight:'700'}}>At urna condimentum mattis pellentesque id nibh tortor.</Text> 
                    </Text>
                  </View> */}
                  <TouchableOpacity style={{
                    height:52,
                    
                    flexDirection:'row',
                    alignItems:'center',
                    justifyContent:'space-between',
                  }}
                  onPress={()=>{
                    //setEraseModalVisible(true);
                    setExitModalVisible(true);
                  }}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Image
                          source={require('../../../assets/img/export/icon_delete_account.png')}
                          style={{
                            width: 24,
                            height: 24,
                            marginRight:10,
                            resizeMode: 'contain',
                          }}
                        />
                        <Text style={{
                          fontSize:14,
                          fontWeight:'700',
                          lineHeight:20,
                          color:'#0B1929',
                          textAlign:'left',
                          width:120
                        }}>
                          Hesabımı Sil
                        </Text>
                        </View>
                        <View 
                        style={{
                          width:80,
                          height:30,
                          borderRadius:30,
                          flexDirection:'row',
                          alignItems:'center',
                          justifyContent:'flex-end'
                          
                        }}
                        >

                          <Image
                          source={require('../../../assets/img/export/right_arrow_blue.png')}
                          style={{
                            width: 24,
                            height: 24,
                            resizeMode: 'contain',
                          }}
                        />
                        </View>
                        
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
    height: 52,
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 35,
    marginRight: 35,
    marginBottom: 25,
  },
  
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 15,
    fontWeight: '500',
    fontSize: 14,
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
export default ProfileAccessSettings;

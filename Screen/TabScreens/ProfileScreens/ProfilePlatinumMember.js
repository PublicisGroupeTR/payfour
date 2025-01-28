/* eslint-disable react-native/no-inline-styles */
// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, useEffect, useRef, createRef} from 'react';
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

import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {SafeAreaView} from 'react-native-safe-area-context';

import Loader from '../../Components/Loader.js';
import SubtabHeader from '../../Components/SubtabHeader.js';
import PayScreen from '../PayScreens/PayScreen.js';
import PayOptionsScreen from '../PayScreens/PayOptionsScreen.js';
import Clipboard from '@react-native-clipboard/clipboard';
import { Modalize } from 'react-native-modalize';

import PayfourPlatinUyelikSozlesmesi from '../../Legals/PayfourPlatinUyelikSozlesmesi.js';

import axios from 'react-native-axios';

const ProfilePlatinumMemberScreen = ({navigation}) => {
  const [premium, setPremium] = useState('Annual'); 
  const [loading, setLoading] = useState(false); 
  const [iban, setIban] = useState('');
  const [payfourId, setPayfourId] = useState('');
  const [faqItem, setFaqItem] = useState(1);
  const [exitModalVisible, setExitModalVisible] = useState(false);
  const [exitSuccessModalVisible, setExitSuccessModalVisible] = useState(false);
  
  useEffect(() => {
    AsyncStorage.getItem('payfourId').then(value =>{
      setPayfourId(value);
      AsyncStorage.getItem('token').then(value =>{
        const config = {
          headers: { Authorization: `Bearer ${value}` }
        };
        console.log("getuser");
        axios.get('https://api-app.payfour.com/api/account/getuser', config).then(response => {
          console.log(response.data);
          console.log(response.data.data);
          
          setIban(response.data.data.defaultBankAccountNumber);
        })
        .catch(error => {
          setLoading(false);
          console.error("Error sending data: ", error);
          let msg="";
          (error.response.data.errors.message) ? msg += error.response.data.errors.message+"\n" : msg += "Ödeme hatası \n"; (error.response.data.errors.paymentError) ? msg += error.response.data.errors.paymentError+"\n" : msg += ""; Alert.alert(msg);
        });

      });
    });
  }, [navigation]);
const cancelPlatinum = () => {
  console.log("cancelPlatinum")
  setExitModalVisible(false);
  setExitSuccessModalVisible(true);
    //sendData();   
  };
  const handleSubmitPress = () => {
    
    sendData();   
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
      plan: premium, 
    };  

    console.log("forgot data");
    console.log(dataToSend);
    //https://api-app.payfour.com/api/auth/addcustomerbasic
    axios.post('https://api-app.payfour.com/api/account/purchasepremium', dataToSend, config)
      .then(response => {
        console.log(response.data);
        console.log(response.data.data);
        setLoading(false);
        if(response.data.success){
          navigation.navigate('ProfilePlatinumSuccess');
        }
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

      <SafeAreaView syle={{flex: 1, backgroundColor: '#ffffff'}}>
        
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
                  width: '100%',
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
                          Platin üyeliğinizi iptal etmek istediğinize emin misiniz?
                        </Text>
                                      
                  </View>
                  
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>

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
                    onPress={() => cancelPlatinum()}>
                    <Text
                      style={{fontSize: 14, color: '#ffffff'}}>
                      İptal Et
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
      </Modal>
      <Modal
            animationType="slide"
            transparent={true}
            visible={exitSuccessModalVisible}
            onRequestClose={() => {
              setExitSuccessModalVisible(!exitSuccessModalVisible);
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
                  width: '100%',
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
                          Platin üyelik iptal talebiniz alınmıştır. 24 Temmuz 2024 tarihine kadar Platin üyelik avantajlarından yararlanabilirsiniz.
                        </Text>
                                      
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
                    onPress={() => setExitSuccessModalVisible(false)}>
                    <Text
                      style={{fontSize: 14, color: '#fff'}}>
                      Tamam
                    </Text>
                  </TouchableOpacity>                  
                
              </View>
            </View>
      </Modal>
        <Loader loading={loading} />
        {/* <SubtabHeader routetarget="ProfileHome" name="Şifre Değiştir" count="0" />        */}

        <ScrollView
          keyboardShouldPersistTaps="handled"
          style={[styles.scrollView, {paddingBottom:100}]}>
            <View style={{padding:16, backgroundColor: '#F2F4F6', flex:1,paddingBottom:120}}>
              <View style={{marginBottom:24}}>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={{color:'#004F97', fontSize:16, fontWeight:'700', marginBottom:16, paddingTop:12}}>
                Payfour Platin Üyeliği
                </Text>
                <TouchableOpacity style={{width: 32,
                    height: 32,}}
                onPress={()=>{navigation.navigate('ProfileHome')}}>
                <Image
                  source={require('../../../assets/img/export/close.png')}
                  style={{
                    width: 32,
                    height: 32,
                    resizeMode: 'contain',
                  }}
                />
                </TouchableOpacity>
                </View>
                <View style={{
                  padding:16,
                  borderRadius:12,
                  backgroundColor:'#fff',
                  marginBottom:24,
                }}>
                  <Text style={{fontSize:14, color:'#0B1929', lineHeight:27, marginBottom:10}}>
                    <Text style={{fontWeight:'700'}}>06 Haziran 2024</Text>’den beri <Text style={{fontWeight:'700'}}>Platin</Text> üyesin
                  </Text>
                  <View style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-start'}}>
                    <Image
                      source={require('../../../assets/img/export/icon_check.png')}
                      style={{
                        width: 20,
                        height: 20,
                        resizeMode: 'contain',
                        marginRight:24,
                      }}
                    />
                    <Text style={{fontSize:14, color:'#0B1929', lineHeight:20, marginBottom:10, width:'80%'}}> 
                      <Text style={{fontWeight:'700'}}>25 Haziran 2024 - 24 Temmuz 2024</Text> dönemi için üyelik ücretin <Text style={{fontWeight:'700'}}>5 TL</Text> olarak alınmıştır.
                    </Text>
                  </View>
                  <View style={{width:20, height:30, alignItems:'center', justifyContent:'center'}}>
                    <View style={{width:1, height:30, borderLeftWidth:1, borderColor:'#8A8A94', borderStyle: 'dashed',  borderRadius: 1,}}></View>
                  </View>
                  <View style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-start'}}>
                    <Image
                      source={require('../../../assets/img/export/icon_clock.png')}
                      style={{
                        width: 20,
                        height: 20,
                        resizeMode: 'contain',
                        marginRight:24,
                      }}
                    />
                    <Text style={{fontSize:14, color:'#0B1929', lineHeight:20, marginBottom:10, width:'80%'}}> 
                      Üyeliğin <Text style={{fontWeight:'700'}}>25 Temmuz 2024</Text> ’te seçili ödeme kartından <Text style={{fontWeight:'700'}}>29,90 TL</Text> üyelik ücretin alınarak yenilecektir.
                    </Text>
                  </View>
                </View>
                
                <Text style={{color:'#004F97', fontSize:16, fontWeight:'700', marginBottom:24}}>
                Platin Avantajları
                </Text> 
                <View style={{}}>
                  <View style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-end', marginBottom:10}}>
                    <View style={{width:'25%'}}></View>
                    {/* <View style={{width:'25%'}}>
                      <Text style={{color:'#004F97', fontSize:12, fontWeight:'700', textAlign:'center'}}>Normal Üye</Text>                      
                    </View> */}
                    <View style={{width:'25%'}}>
                      <Text style={{color:'#004F97', fontSize:12, fontWeight:'700', textAlign:'center'}}>Platin Üye</Text>
                    </View>
                  </View>
                  <View style={{flexDirection:'row', alignItems:'center', marginBottom:10}}>
                    <View style={{width:'75%', paddingRight:20}}>
                      <Text style={{color:'#0B1929', fontSize:12}}>
                      CarrefourSA'lardaki alışverişlerinden %10 Nakit İade kazanımı
                      </Text>
                    </View>
                    {/* <View style={{width:'25%', alignItems:'center', justifyContent:'center'}}>
                      <View style={{width:12, height:2, borderRadius:3, backgroundColor:'#004F97'}}></View>
                    </View> */}
                    <View style={{width:'25%', alignItems:'center', justifyContent:'center'}}>
                      <Image
                          source={require('../../../assets/img/export/platin_check.png')}
                          style={{
                            width: 32,
                            height: 32,
                            resizeMode: 'contain',
                          }}
                        />
                    </View>
                  </View>
                  <View style={{flexDirection:'row', alignItems:'center', marginBottom:10}}>
                    <View style={{width:'75%', paddingRight:20}}>
                      <Text style={{color:'#0B1929', fontSize:12}}>
                      CarrefourSA Online Market uygulaması ve carrefoursa.com alışverişlerinde ücretsiz kargo
                      </Text>
                      </View>
                    {/* <View style={{width:'25%', alignItems:'center', justifyContent:'center'}}>
                      <View style={{width:12, height:2, borderRadius:3, backgroundColor:'#004F97'}}></View>
                    </View> */}
                    <View style={{width:'25%', alignItems:'center', justifyContent:'center'}}>
                      <Image
                          source={require('../../../assets/img/export/platin_check.png')}
                          style={{
                            width: 32,
                            height: 32,
                            resizeMode: 'contain',
                          }}
                        />
                    </View>
                  </View>
                  <View style={{flexDirection:'row', alignItems:'center', marginBottom:10}}>
                    <View style={{width:'75%', paddingRight:20}}>
                      <Text style={{color:'#0B1929', fontSize:12}}>
                      Her alışverişinden %10 Pegasus Bol Bol Puan kazanımı
                      </Text>
                    </View>
                    {/* <View style={{width:'25%', alignItems:'center', justifyContent:'center'}}>
                      <View style={{width:12, height:2, borderRadius:3, backgroundColor:'#004F97'}}></View>
                    </View> */}
                    <View style={{width:'25%', alignItems:'center', justifyContent:'center'}}>
                      <Image
                          source={require('../../../assets/img/export/platin_check.png')}
                          style={{
                            width: 32,
                            height: 32,
                            resizeMode: 'contain',
                          }}
                        />
                    </View>
                  </View>
                  
                </View>
                <Text style={{color:'#004F97', fontSize:16, fontWeight:'700', marginBottom:24}}>
                Sıkça Sorulan Sorular
                </Text>
                <View style={{}}>
                  <View style={{marginBottom:8, borderBottomWidth:1, borderColor:'#E4E4E8'}}>
                    <TouchableOpacity style={{
                      height:50,
                      
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      borderBottomWidth:1,
                      borderBottomColor:'#F2F4F6',
                    }}
                    onPress={()=>setFaqItem(1)}>
                      <Text style={{
                        fontSize:14,
                        fontWeight:700,
                        color:'#0B1929',
                        width:'85%',
                      }}>
                        Sıkça Sorulan Soru
                      </Text>
                      <Image
                        source={require('../../../assets/img/export/arrow_down_blue.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          transform: faqItem == 1? [{scaleY:1}] : [{scaleY:-1}]
                        }}
                      />
                    </TouchableOpacity>
                      
                    <View style={{
                      padding:16,
                      display:faqItem == 1? 'flex' : 'none',
                    }}>
                      <Text style={{
                        fontSize:12,
                      color:'#909EAA',}}>
                        Nunc mattis enim ut tellus. Orci ac auctor augue mauris augue neque. Consequat interdum varius sit amet mattis vulputate. At urna condimentum mattis pellentesque id nibh tortor. Mattis pellentesque id nibh tortor id aliquet. Cras sed felis eget velit aliquet.Purus viverra accumsan in nisl nisi scelerisque eu ultrices vitae. Nisl suscipit adipiscing bibendum est. 
                        </Text>
                    </View>
                          
                    
                  </View>
                  <View style={{marginBottom:8, borderBottomWidth:1, borderColor:'#E4E4E8'}}>
                    <TouchableOpacity style={{
                      height:50,
                      
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      borderBottomWidth:1,
                      borderBottomColor:'#F2F4F6',
                    }}
                    onPress={()=>setFaqItem(2)}>
                      <Text style={{
                        fontSize:14,
                        fontWeight:700,
                        color:'#0B1929',
                        width:'85%',
                      }}>
                        Sıkça Sorulan Soru
                      </Text>
                      <Image
                        source={require('../../../assets/img/export/arrow_down_blue.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          transform: faqItem == 2? [{scaleY:1}] : [{scaleY:-1}]
                        }}
                      />
                    </TouchableOpacity>
                      
                    <View style={{
                      padding:16,
                      display:faqItem == 2? 'flex' : 'none',
                    }}>
                      <Text style={{
                        fontSize:12,
                      color:'#909EAA',}}>
                        Nunc mattis enim ut tellus. Orci ac auctor augue mauris augue neque. Consequat interdum varius sit amet mattis vulputate. At urna condimentum mattis pellentesque id nibh tortor. Mattis pellentesque id nibh tortor id aliquet. Cras sed felis eget velit aliquet.Purus viverra accumsan in nisl nisi scelerisque eu ultrices vitae. Nisl suscipit adipiscing bibendum est. 
                        </Text>
                    </View>
                          
                    
                  </View>
                  <View style={{marginBottom:8, borderBottomWidth:1, borderColor:'#E4E4E8'}}>
                    <TouchableOpacity style={{
                      height:50,
                      
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      borderBottomWidth:1,
                      borderBottomColor:'#F2F4F6',
                    }}
                    onPress={()=>setFaqItem(3)}>
                      <Text style={{
                        fontSize:14,
                        fontWeight:700,
                        color:'#0B1929',
                        width:'85%',
                      }}>
                        Sıkça Sorulan Soru
                      </Text>
                      <Image
                        source={require('../../../assets/img/export/arrow_down_blue.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          transform: faqItem == 3? [{scaleY:1}] : [{scaleY:-1}]
                        }}
                      />
                    </TouchableOpacity>
                      
                    <View style={{
                      padding:16,
                      display:faqItem == 3? 'flex' : 'none',
                    }}>
                      <Text style={{
                        fontSize:12,
                      color:'#909EAA',}}>
                        Nunc mattis enim ut tellus. Orci ac auctor augue mauris augue neque. Consequat interdum varius sit amet mattis vulputate. At urna condimentum mattis pellentesque id nibh tortor. Mattis pellentesque id nibh tortor id aliquet. Cras sed felis eget velit aliquet.Purus viverra accumsan in nisl nisi scelerisque eu ultrices vitae. Nisl suscipit adipiscing bibendum est. 
                        </Text>
                    </View>
                          
                    
                  </View>
                  <View style={{marginBottom:8, borderBottomWidth:1, borderColor:'#E4E4E8'}}>
                    <TouchableOpacity style={{
                      height:50,
                      
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      borderBottomWidth:1,
                      borderBottomColor:'#F2F4F6',
                    }}
                    onPress={()=>setFaqItem(4)}>
                      <Text style={{
                        fontSize:14,
                        fontWeight:700,
                        color:'#0B1929',
                        width:'85%',
                      }}>
                        Sıkça Sorulan Soru
                      </Text>
                      <Image
                        source={require('../../../assets/img/export/arrow_down_blue.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          transform: faqItem == 4? [{scaleY:1}] : [{scaleY:-1}]
                        }}
                      />
                    </TouchableOpacity>
                      
                    <View style={{
                      padding:16,
                      display:faqItem == 4? 'flex' : 'none',
                    }}>
                      <Text style={{
                        fontSize:12,
                      color:'#909EAA',}}>
                        Nunc mattis enim ut tellus. Orci ac auctor augue mauris augue neque. Consequat interdum varius sit amet mattis vulputate. At urna condimentum mattis pellentesque id nibh tortor. Mattis pellentesque id nibh tortor id aliquet. Cras sed felis eget velit aliquet.Purus viverra accumsan in nisl nisi scelerisque eu ultrices vitae. Nisl suscipit adipiscing bibendum est. 
                        </Text>
                    </View>
                          
                    
                  </View>
                </View>
              </View>
              
             
              
                <TouchableOpacity
                    style={[styles.buttonStyle, {marginBottom: 24, backgroundColor: '#004F97'}]}
                activeOpacity={0.5}
                onPress={() => 
                   navigation.navigate('campaign', { 
                     screen: 'CampaignList',
                     params: {
                       filters:{isAw:true, isSp:false}
                     }
                   })
                  }>
                  <Text style={styles.buttonTextStyle}>Platin Kampanyalarını Keşfet</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.buttonStyle, {marginBottom: 60, backgroundColor: 'transparent', borderWidth:1, borderColor:'#004F97'}]}
                activeOpacity={0.5}
                onPress={() => setExitModalVisible(true)}>
                  <Text style={[styles.buttonTextStyle, {color:'#004F97'}]}>Üyeliğimi iptal etmek istiyorum</Text>
                </TouchableOpacity>
            </View>

        </ScrollView>
      </SafeAreaView>
  );
};
export default ProfilePlatinumMemberScreen;

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
    borderRadius: 10,
    marginLeft: 0,
    marginRight: 0,
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
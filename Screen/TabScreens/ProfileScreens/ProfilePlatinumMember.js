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
import { apiGet, apiPost } from '../../utils/api.js';

const ProfilePlatinumMemberScreen = ({navigation}) => {
  const [premium, setPremium] = useState('Annual'); 
  const [loading, setLoading] = useState(false); 
  const [iban, setIban] = useState('');
  const [payfourId, setPayfourId] = useState('');
  const [faqItem, setFaqItem] = useState(1);
  const [exitModalVisible, setExitModalVisible] = useState(false);
  const [exitSuccessModalVisible, setExitSuccessModalVisible] = useState(false);
  const months = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
  const [segmentInfo, setSegmentInfo] = useState({subStartDate:"01 Ocak 2025", segmentStartDate:"01 Ocak 2025", segmentEndDate:"01 Ocak 2025", segmentPrice:"0"});

  useEffect(() => {
    AsyncStorage.getItem('payfourId').then(value =>{
      setPayfourId(value);
      AsyncStorage.getItem('token').then(value =>{
        const config = {
          headers: { Authorization: `Bearer ${value}` }
        };
        console.log("getuser");
        apiGet('account/getuser', onGetUser)
        

      });
    });
  }, [navigation]);
  const onGetUser = (response) => {
    //console.log(response.data);
    console.log(response.data.data);
    
    setIban(response.data.data.defaultBankAccountNumber);
    if(response.data.data.segmentInfo){
      let d = response.data.data.segmentInfo;

      let ssd = new Date(d.startDateUTC);
      console.log(ssd.getDate()+"/"+ssd.getMonth()+"/"+ssd.getFullYear());
      let subStartDate = ssd.getDate()+" "+months[ssd.getMonth()]+" "+ssd.getFullYear();
      console.log(subStartDate);
      let std = new Date(d.lastTransaction.startDateUTC);
      console.log(std.getDate()+"/"+std.getMonth()+"/"+std.getFullYear());
      let segmentStartDate = std.getDate()+" "+months[std.getMonth()]+" "+std.getFullYear();
      console.log(segmentStartDate);
      let exd = new Date(d.lastTransaction.expireDateUTC);
      console.log(exd.getDate()+"/"+exd.getMonth()+"/"+exd.getFullYear());
      let segmentEndDate = exd.getDate()+" "+months[exd.getMonth()]+" "+exd.getFullYear();
      console.log(segmentEndDate);

      console.log(d.lastTransaction.price);
      let sInfo = {
        subStartDate: subStartDate,
        segmentStartDate: segmentStartDate,
        segmentEndDate: segmentEndDate,
        segmentPrice: d.lastTransaction.price
      }
      setSegmentInfo(sInfo);
    }
  }
const cancelPlatinum = () => {
  console.log("cancelPlatinum");
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
    apiPost('account/purchasepremium', dataToSend, onPurchasePremium);
    
    });
  }
  const onPurchasePremium = (response) =>{
    console.log(response.data);
        console.log(response.data.data);
        setLoading(false);
        if(response.data.success){
          navigation.navigate('ProfilePlatinumSuccess');
        }
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
                    <Text style={{fontWeight:'700'}}>{segmentInfo.subStartDate}</Text>’den beri <Text style={{fontWeight:'700'}}>Platin</Text> üyesiniz
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
                      <Text style={{fontWeight:'700'}}>{segmentInfo.segmentStartDate} - {segmentInfo.segmentEndDate}</Text> dönemi için üyelik ücretiniz <Text style={{fontWeight:'700'}}>{segmentInfo.segmentPrice} TL</Text> olarak alınmıştır.
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
                      Üyeliğiniz <Text style={{fontWeight:'700'}}>{segmentInfo.segmentEndDate}</Text>’te güncel üyelik ücretiniz alınarak yenilenecektir.
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
                      CarrefourSA'lardaki alışverişlerinden %10 Puan kazanımı
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
                      CarrefourSA çağrı merkezinde öncelik ayrıcalığı
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
                      Çeşitli markalarda özel fırsatlar ve teklifler
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
                                        minHeight:50, paddingBottom:8,
                                        
                                        flexDirection:'row',
                                        alignItems:'center',
                                        justifyContent:'space-between',
                                        borderBottomWidth:1,
                                        borderBottomColor:'#F2F4F6',
                                      }}
                                      onPress={()=>faqItem==47? setFaqItem(0):setFaqItem(47)}>
                                        <Text style={{
                                          fontSize:14,
                                          fontWeight:700,
                                          color:'#0B1929',
                                          width:'85%',
                                        }}>
                                          Payfour Platin nedir ve nasıl olunur?
                                         </Text>
                                        <Image
                                          source={require('../../../assets/img/export/arrow_down_blue.png')}
                                          style={{
                                            width: 24,
                                            height: 24,
                                            resizeMode: 'contain',
                                            transform: faqItem == 47? [{scaleY:-1}] : [{scaleY:1}]
                                          }}
                                        />
                                      </TouchableOpacity>
                                        
                                      <View style={{
                                        padding:16,
                                        display:faqItem == 47? 'flex' : 'none',
                                      }}>
                                        <Text style={{
                                          fontSize:12,
                                        color:'#909EAA',}}>                       
                                         Payfour Platin, size özel kampanya ve avantajlardan faydalanabileceğiniz üyelik programıdır. Aylık veya yıllık abonelik ile Payfour Platin müşterisi olunabilmektedir.
                                        </Text>
                                      </View>                        
                  </View>
                  <View style={{marginBottom:8, borderBottomWidth:1, borderColor:'#E4E4E8'}}>
                    <TouchableOpacity style={{
                      minHeight:50, paddingBottom:8,
                      
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      borderBottomWidth:1,
                      borderBottomColor:'#F2F4F6',
                    }}
                    onPress={()=>faqItem==48? setFaqItem(0):setFaqItem(48)}>
                      <Text style={{
                        fontSize:14,
                        fontWeight:700,
                        color:'#0B1929',
                        width:'85%',
                      }}>
                        Payfour Platin nedir ve nasıl olunur?
                        </Text>
                      <Image
                        source={require('../../../assets/img/export/arrow_down_blue.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          transform: faqItem == 48? [{scaleY:-1}] : [{scaleY:1}]
                        }}
                      />
                    </TouchableOpacity>
                      
                    <View style={{
                      padding:16,
                      display:faqItem == 48? 'flex' : 'none',
                    }}>
                      <Text style={{
                        fontSize:12,
                      color:'#909EAA',}}>                       
                        Payfour Platin, size özel kampanya ve avantajlardan faydalanabileceğiniz üyelik programıdır. Aylık veya yıllık abonelik ile Payfour Platin müşterisi olunabilmektedir.
                      </Text>
                    </View>                        
                  </View>
                  <View style={{marginBottom:8, borderBottomWidth:1, borderColor:'#E4E4E8'}}>
                    <TouchableOpacity style={{
                      minHeight:50, paddingBottom:8,
                      
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      borderBottomWidth:1,
                      borderBottomColor:'#F2F4F6',
                    }}
                    onPress={()=>faqItem==49? setFaqItem(0):setFaqItem(49)}>
                      <Text style={{
                        fontSize:14,
                        fontWeight:700,
                        color:'#0B1929',
                        width:'85%',
                      }}>
                        Payfour Platin ayrıcalıkları nelerdir?
                        </Text>
                      <Image
                        source={require('../../../assets/img/export/arrow_down_blue.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          transform: faqItem == 49? [{scaleY:-1}] : [{scaleY:1}]
                        }}
                      />
                    </TouchableOpacity>
                      
                    <View style={{
                      padding:16,
                      display:faqItem == 49? 'flex' : 'none',
                    }}>
                      <Text style={{
                        fontSize:12,
                      color:'#909EAA',}}>                       
                        Payfour Platin müşterilerinin alışverişlerinden puan kazanımı, online alışverişlerde ücretsiz kargo, çağrı merkezinde öncelik avantajları bulunmaktadır. Bu avantajlara ek dönemsel olarak iş birlikleri ve kampanyalar ile çeşitli markalarda fırsatlar sunulmaktadır.
                        </Text>
                    </View>                        
                  </View>
                  <View style={{marginBottom:8, borderBottomWidth:1, borderColor:'#E4E4E8'}}>
                    <TouchableOpacity style={{
                      minHeight:50, paddingBottom:8,
                      
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      borderBottomWidth:1,
                      borderBottomColor:'#F2F4F6',
                    }}
                    onPress={()=>faqItem==50? setFaqItem(0):setFaqItem(50)}>
                      <Text style={{
                        fontSize:14,
                        fontWeight:700,
                        color:'#0B1929',
                        width:'85%',
                      }}>
                        Payfour Platin ücreti ne kadardır?
                        </Text>
                      <Image
                        source={require('../../../assets/img/export/arrow_down_blue.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          transform: faqItem == 50? [{scaleY:-1}] : [{scaleY:1}]
                        }}
                      />
                    </TouchableOpacity>
                      
                    <View style={{
                      padding:16,
                      display:faqItem == 50? 'flex' : 'none',
                    }}>
                      <Text style={{
                        fontSize:12,
                      color:'#909EAA',}}>                       
                        Payfour Platin, ilk ay ücreti 9 TL’dir. İlk ay sonrası aylık üyelik paketi 39 TL, yıllık üyelik paketi ise 351 TL’dir.
                        </Text>
                    </View>                        
                  </View>
                  <View style={{marginBottom:8, borderBottomWidth:1, borderColor:'#E4E4E8'}}>
                    <TouchableOpacity style={{
                      minHeight:50, paddingBottom:8,
                      
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      borderBottomWidth:1,
                      borderBottomColor:'#F2F4F6',
                    }}
                    onPress={()=>faqItem==51? setFaqItem(0):setFaqItem(51)}>
                      <Text style={{
                        fontSize:14,
                        fontWeight:700,
                        color:'#0B1929',
                        width:'85%',
                      }}>
                        Payfour Platin üyeliğimi nasıl iptal edebilirim?
                        </Text>
                      <Image
                        source={require('../../../assets/img/export/arrow_down_blue.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          transform: faqItem == 51? [{scaleY:-1}] : [{scaleY:1}]
                        }}
                      />
                    </TouchableOpacity>
                      
                    <View style={{
                      padding:16,
                      display:faqItem == 51? 'flex' : 'none',
                    }}>
                      <Text style={{
                        fontSize:12,
                      color:'#909EAA',}}>                       
                        Payfour içerisinden “Platin Aboneliğimi İptal Et” butonuna tıklayarak, üyeliğinizi istediğiniz zaman iptal edebilirsiniz.
                        </Text>
                    </View>                        
                  </View>
                </View>
              </View>
              
             
              
                <TouchableOpacity
                    style={{                    
                      backgroundColor:'#004F97',
                      alignItems:'center',
                      justifyContent:'center',
                      borderRadius:8,
                      width:'100%',
                      height:52, 
                    marginBottom: 24}}
                activeOpacity={0.5}
                onPress={() => 
                   navigation.navigate('campaign', { 
                     screen: 'CampaignList',
                     params: {
                       filters:{isAw:true, isSp:false}
                     }
                   })
                  }>
                  <Text style={{color:'#fff', fontSize:14}}>Platin Kampanyalarını Keşfet</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{alignItems:'center',
                      justifyContent:'center',
                      borderRadius:8,
                      width:'100%',
                      height:52,marginBottom: 60, backgroundColor: 'transparent', borderWidth:1, borderColor:'#004F97'}}
                activeOpacity={0.5}
                onPress={() => setExitModalVisible(true)}>
                  <Text style={{color:'#004F97', fontSize:14}}>Üyeliğimi iptal etmek istiyorum</Text>
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
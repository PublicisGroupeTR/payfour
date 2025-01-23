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
import { Modalize } from 'react-native-modalize';
import PayfourUyelikVeKullaniciSozlesmesi from '../../Legals/PayfourUyelikVeKullaniciSozlesmesi.js';
import PazarlamaAydinlatmaMetni from '../../Legals/PazarlamaAydinlatmaMetni.js';
import CarrefoursaIletisimIzni from '../../Legals/CarrefoursaIletisimIzni.js';
import CarrefoursaKartUyelikSozlesmesi from '../../Legals/CarrefoursaKartUyelikSozlesmesi.js';
import CarrefoursaKartUyelikKVKKAydinlatmaMetni from '../../Legals/CarrefoursaKartUyelikKVKKAydinlatmaMetni.js';

const ProfileLegal = ({navigation}) => { 

  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [campaign, setCampaign] = useState(false);
  const [payment, setPayment] = useState(false);
  const [offers, setOffers] = useState(false);
  const [rulesModalVisible, setRulesModalVisible] = useState(false);
  const [electronicModalVisible, setElectronicModalVisible] = useState(false);
  const [carrefourModalVisible, setCarrefourModalVisible] = useState(false);
  const [dgpaysModalVisible, setDgpaysModalVisible] = useState(false);
  const [membershipModalVisible, setMembershipModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  
  const rulesModalizeRef = useRef(null);
  const electronicModalizeRef = useRef(null);
  const carrefourModalizeRef = useRef(null);
  const membershipModalizeRef = useRef(null);

  const userAgreementModalizeRef = useRef(null);
  const userInfoModalizeRef = useRef(null);
  const marketingInfoModalizeRef = useRef(null);
  const marketingAgreementModalizeRef = useRef(null);
  const carrefourUserAgreementModalizeRef = useRef(null);
  const carrefourUserInfoModalizeRef = useRef(null);

  const handleExit = () => {
    console.log('handleExit');

    //setModalVisible(true);
  };
  
  

  return(
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>  
      <Modalize ref={userAgreementModalizeRef}
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
                          CARREFOURSA PAYFOUR ÜYELİK VE KULLANICI SÖZLEŞMESİ
                        </Text>
                        <TouchableOpacity 
                      style={{
                        width:24,
                        height:24,
                      }}
                      onPress={() => {
                        console.log('close');
                        userAgreementModalizeRef.current?.close();}}>                  
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
                      
                      
                     <PayfourUyelikVeKullaniciSozlesmesi /> 
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
                  onPress={() => userAgreementModalizeRef.current?.close()}>
                  <Text
                    style={{fontSize: 14, color: '#ffffff'}}>
                    Kapat
                  </Text>
                </TouchableOpacity>
               </View>
               
            </View>
          </Modalize>
          <Modalize ref={marketingInfoModalizeRef}
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
                          CARREFOURSA PAZARLAMA AYDINLATMA METNİ
                        </Text>
                        <TouchableOpacity 
                      style={{
                        width:24,
                        height:24,
                      }}
                      onPress={() => {
                        console.log('close');
                        marketingInfoModalizeRef.current?.close();}}>                  
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
                      
                      
                     <PazarlamaAydinlatmaMetni /> 
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
                  onPress={() => marketingInfoModalizeRef.current?.close()}>
                  <Text
                    style={{fontSize: 14, color: '#ffffff'}}>
                    Kapat
                  </Text>
                </TouchableOpacity>
               </View>
               
            </View>
          </Modalize>
          <Modalize ref={marketingAgreementModalizeRef}
      snapPoint={0}
      modalStyle={{
        flex: 1,  
        flexDirection:'column',           
        justifyContent: 'flex-end',
        alignItems: 'flex-end',}}>
        <View
              style={{
                flex: 1,     
                flexDirection:'column',           
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                width:Dimensions.get('window').width,
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
                          CARREFOURSA İLETİŞİM İZNİ METNİ
                        </Text>
                        <TouchableOpacity 
                      style={{
                        width:24,
                        height:24,
                      }}
                      onPress={() => {
                        console.log('close');
                        marketingAgreementModalizeRef.current?.close();}}>                  
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
                      
                      
                       <View style={legalStyles.container}>
      <View style={legalStyles.section}>
      {/* <Text style={legalStyles.title}>CARREFOURSA İLETİŞİM İZNİ METNİ</Text> */}
      </View>
      <View style={legalStyles.section}>
      <Text style={legalStyles.paragraph}>Kişisel verilerimin CarrefourSA Carrefour Sabancı Ticaret Merkezi Anonim Şirketi (“Şirket”) tarafından doğrudan veya dolaylı pazarlama faaliyetlerinin gerçekleştirilmesi amacıyla işlenmesi suretiyle iletişim bilgilerime; reklam, promosyon, kampanya ve benzeri nitelikte genel ve özel kampanyalar, avantajlar, ürün, hizmet tanıtımları, reklâm, pazar araştırması anketleri ve diğer müşteri memnuniyeti uygulamalarına ilişkin olarak kısa mesaj (SMS), mobil uygulama, anlık bildirim, e-posta, otomatik makinelerden arama, telefonla arama, bluetooth, beacon kablosuz ağlar, sosyal medya vb. her türlü elektronik iletişim aracı ile ticari elektronik ileti gönderilmesine ve kişisel verilerimin Şirket’in hizmet aldığı tedarikçilere aktarılmasına  onay veriyorum.</Text>
      </View>
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
                  onPress={() => marketingAgreementModalizeRef.current?.close()}>
                  <Text
                    style={{fontSize: 14, color: '#ffffff'}}>
                    Kapat
                  </Text>
                </TouchableOpacity>
               </View>
               
            </View>
          </Modalize>
          <Modalize ref={carrefourUserAgreementModalizeRef}
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
                  height:'100%'
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
                          CARREFOURSA KART ÜYELİK SÖZLEŞMESİ
                        </Text>
                        <TouchableOpacity 
                      style={{
                        width:24,
                        height:24,
                      }}
                      onPress={() => {
                        console.log('close');
                        carrefourUserAgreementModalizeRef.current?.close();}}>                  
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
                      
                      
                     <CarrefoursaKartUyelikSozlesmesi /> 
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
                  onPress={() => carrefourUserAgreementModalizeRef.current?.close()}>
                  <Text
                    style={{fontSize: 14, color: '#ffffff'}}>
                    Kapat
                  </Text>
                </TouchableOpacity>
               </View>
               
            </View>
          </Modalize>
          <Modalize ref={carrefourUserInfoModalizeRef}
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
                          CARREFOURSA KART ÜYELİĞİ KİŞİSEL VERİLERİN KORUNMASI AYDINLATMA METNİ
                        </Text>
                        <TouchableOpacity 
                      style={{
                        width:24,
                        height:24,
                      }}
                      onPress={() => {
                        console.log('close');
                        carrefourUserInfoModalizeRef.current?.close();}}>                  
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
                      
                      
                     <CarrefoursaKartUyelikKVKKAydinlatmaMetni /> 
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
                  onPress={() => carrefourUserInfoModalizeRef.current?.close()}>
                  <Text
                    style={{fontSize: 14, color: '#ffffff'}}>
                    Kapat
                  </Text>
                </TouchableOpacity>
               </View>
               
            </View>
          </Modalize>
    <Loader loading={loading} />
    <SubtabHeader routetarget="ProfileHome" name="Sözleşmelerim" count="0" />
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
                  <TouchableOpacity style={{
                    minHeight:52,
                    
                    flexDirection:'row',
                    alignItems:'center',
                    justifyContent:'space-between',
                    borderBottomWidth:1,
                    borderBottomColor:'#F2F4F6',
                    marginBottom:8,
                  }}
                  onPress={() => {
                    //setRulesModalVisible(!rulesModalVisible);
                    userAgreementModalizeRef.current?.open();
                     }}>
                      <View style={{flexDirection:'row', alignItems:'center'}}>                        
                        <View>
                          <Text style={{
                            fontSize:14,
                            fontWeight:'700',
                            lineHeight:20,
                            color:'#0B1929',
                            textAlign:'left',
                            width:180
                          }}>
                            Payfour Üyelik ve Kullanıcı Sözleşmesi
                          </Text>
                        </View>
                      </View>
                      <Image
                        source={require('../../../assets/img/export/arrow_right_dark.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          tintColor:'#004F97'
                        }}
                      />  
                  </TouchableOpacity>
                  <TouchableOpacity style={{
                    minHeight:52,
                    
                    flexDirection:'row',
                    alignItems:'center',
                    justifyContent:'space-between',
                    borderBottomWidth:1,
                    borderBottomColor:'#F2F4F6',
                    marginBottom:8,
                  }}
                  onPress={() => {
                    //setElectronicModalVisible(!electronicModalVisible) 
                    marketingInfoModalizeRef.current?.open();
                    }}>
                      <View style={{flexDirection:'row', alignItems:'center'}}>                        
                        <View>
                          <Text style={{
                            fontSize:14,
                            fontWeight:'700',
                            lineHeight:20,
                            color:'#0B1929',
                            textAlign:'left',
                            width:180
                          }}>
                            Payfour Üyelik Aydınlatma Metni
                          </Text>
                        </View>
                      </View>
                      <Image
                        source={require('../../../assets/img/export/arrow_right_dark.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          tintColor:'#004F97'
                        }}
                      />  
                  </TouchableOpacity>
                  <TouchableOpacity style={{
                    minHeight:52,
                    
                    flexDirection:'row',
                    alignItems:'center',
                    justifyContent:'space-between',
                    borderBottomWidth:1,
                    borderBottomColor:'#F2F4F6',
                    marginBottom:8,
                  }}
                  onPress={() => {
                    //setCarrefourModalVisible(!carrefourModalVisible) 
                    marketingInfoModalizeRef.current?.open()}}>
                      <View style={{flexDirection:'row', alignItems:'center'}}>
                        
                        <View>
                          <Text style={{
                            fontSize:14,
                            fontWeight:'700',
                            lineHeight:20,
                            color:'#0B1929',
                            textAlign:'left',
                            width:180
                          }}>
                            Pazarlama Aydınlatma Metni
                          </Text>
                        </View>
                      </View>
                      <Image
                        source={require('../../../assets/img/export/arrow_right_dark.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          tintColor:'#004F97'
                        }}
                      />  
                  </TouchableOpacity>
                  <TouchableOpacity style={{
                    minHeight:52,
                    
                    flexDirection:'row',
                    alignItems:'center',
                    justifyContent:'space-between',
                    marginBottom:8,
                    borderBottomWidth:1,
                    borderBottomColor:'#F2F4F6',
                  }}
                  onPress={() => {
                    //setDgpaysModalVisible(!dgpaysModalVisible);
                    marketingAgreementModalizeRef.current?.open() 
                    }}>
                      <View style={{flexDirection:'row', alignItems:'center'}}>                       
                        <View>
                          <Text style={{
                            fontSize:14,
                            fontWeight:'700',
                            lineHeight:20,
                            color:'#0B1929',
                            textAlign:'left',
                            width:180
                          }}>
                            İletişim İzni
                          </Text>
                        </View>
                      </View>
                      <Image
                        source={require('../../../assets/img/export/arrow_right_dark.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          tintColor:'#004F97'
                        }}
                      />  
                  </TouchableOpacity>
                  <TouchableOpacity style={{
                    minHeight:52,
                    
                    flexDirection:'row',
                    alignItems:'center',
                    justifyContent:'space-between',
                    marginBottom:8,
                    borderBottomWidth:1,
                    borderBottomColor:'#F2F4F6',
                  }}
                  onPress={() => {
                    //setDgpaysModalVisible(!dgpaysModalVisible);
                    carrefourUserAgreementModalizeRef.current?.open() 
                    }}>
                      <View style={{flexDirection:'row', alignItems:'center'}}>                       
                        <View>
                          <Text style={{
                            fontSize:14,
                            fontWeight:'700',
                            lineHeight:20,
                            color:'#0B1929',
                            textAlign:'left',
                            width:180
                          }}>
                            CarrefourSA Kart Üyelik Sözleşmesi
                          </Text>
                        </View>
                      </View>
                      <Image
                        source={require('../../../assets/img/export/arrow_right_dark.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          tintColor:'#004F97'
                        }}
                      />  
                  </TouchableOpacity>
                  <TouchableOpacity style={{
                    minHeight:52,
                    
                    flexDirection:'row',
                    alignItems:'center',
                    justifyContent:'space-between',
                    marginBottom:8,
                  }}
                  onPress={() => {
                    //setDgpaysModalVisible(!dgpaysModalVisible);
                    carrefourUserInfoModalizeRef.current?.open() 
                    }}>
                      <View style={{flexDirection:'row', alignItems:'center'}}>                       
                        <View>
                          <Text style={{
                            fontSize:14,
                            fontWeight:'700',
                            lineHeight:20,
                            color:'#0B1929',
                            textAlign:'left',
                            width:180
                          }}>
                            CarrefourSA Kart Üyelik Aydınlatma Metni
                          </Text>
                        </View>
                      </View>
                      <Image
                        source={require('../../../assets/img/export/arrow_right_dark.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          tintColor:'#004F97'
                        }}
                      />  
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
const legalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor:'#fff'
  },
  subtitle: {
    fontSize: 14,
    fontWeight:'700',
    color:'#0B1929',
    marginBottom: 10,
    textAlign: 'left',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color:'#0B1929',
    marginVertical: 10,
  },
  paragraph: {
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 10,
  },
  bold: {
    fontWeight: '700',
  },
  footer: {
    fontSize: 12,
    marginTop: 20,
    textAlign: 'center',
  },
  });
export default ProfileLegal;

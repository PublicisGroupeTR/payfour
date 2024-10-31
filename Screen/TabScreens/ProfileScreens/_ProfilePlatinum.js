/* eslint-disable react-native/no-inline-styles */
// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, createRef} from 'react';
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

import AsyncStorage from '@react-native-async-storage/async-storage';

import {SafeAreaView} from 'react-native-safe-area-context';

import Loader from '../../Components/Loader.js';
import SubtabHeader from '../../Components/SubtabHeader.js';


import axios from 'react-native-axios';

const ProfilePlatinum = ({navigation}) => {
  const [premium, setPremium] = useState('Annual');
  const [userEmailError, setUserEmailError] = useState(false);
  const [userCurrentPassword, setUserCurrentPassword] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userPasswordAgain, setUserPasswordAgain] = useState('');
  const [UserRefcode, setUserUserRefcode] = useState('');
  const [userPasswordError, setUserPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  

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
    //https://payfourapp.test.kodegon.com/api/auth/addcustomerbasic
    axios.post('https://payfourapp.test.kodegon.com/api/account/purchasepremium', dataToSend, config)
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
        
        <Loader loading={loading} />
        {/* <SubtabHeader routetarget="ProfileHome" name="Şifre Değiştir" count="0" />        */}

        <ScrollView
          keyboardShouldPersistTaps="handled"
          style={[styles.scrollView, {paddingBottom:100}]}>
            <View style={{padding:16, backgroundColor: '#F2F4F6', flex:1,paddingBottom:120}}>
              <View style={{marginBottom:24}}>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={{color:'#004F97', fontSize:16, fontWeight:'700', marginBottom:16, paddingTop:12}}>
                Platin Kullanıcı nedir?
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
                <Text style = {{fontSize:12, color:'#0B1929'}}>Payfour üyelerine özel avantajların ve ayrıcalıkların sunulduğu programdır, Payfour üyesi olan herkes istediği zaman Platinli olabilir.</Text>
                <Text style={{color:'#004F97', fontSize:16, fontWeight:'700', marginBottom:16, paddingTop:12}}>
                Platin Avantajları
                </Text> 
                <View style={{}}>
                  <View style={{flexDirection:'row', alignItems:'center'}}>
                    <View style={{width:'50%'}}></View>
                    <View style={{width:'25%'}}>
                      <Text style={{color:'#004F97', fontSize:12, fontWeight:'700', textAlign:'center'}}>Normal Üye</Text>                      
                    </View>
                    <View style={{width:'25%'}}>
                      <Text style={{color:'#004F97', fontSize:12, fontWeight:'700', textAlign:'center'}}>Platin Üye</Text>
                    </View>
                  </View>
                  <View style={{flexDirection:'row', alignItems:'center', marginBottom:10}}>
                    <View style={{width:'50%', paddingRight:20}}>
                      <Text style={{color:'#0B1929', fontSize:12}}>
                      CarrefourSA’daki her alışverişinden %5 Cashback kazanımı
                      </Text>
                    </View>
                    <View style={{width:'25%', alignItems:'center', justifyContent:'center'}}>
                      <View style={{width:12, height:2, borderRadius:3, backgroundColor:'#004F97'}}></View>
                    </View>
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
                    <View style={{width:'50%', paddingRight:20}}>
                      <Text style={{color:'#0B1929', fontSize:12}}>
                      İlk 1 ay ücretsiz Gain üyeliği
                      </Text>
                      </View>
                    <View style={{width:'25%', alignItems:'center', justifyContent:'center'}}>
                      <View style={{width:12, height:2, borderRadius:3, backgroundColor:'#004F97'}}></View>
                    </View>
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
                    <View style={{width:'50%', paddingRight:20}}>
                      <Text style={{color:'#0B1929', fontSize:12}}>
                      Her alışverişinden %10 Pegasus Bol Bol Puan kazanımı
                      </Text>
                    </View>
                    <View style={{width:'25%', alignItems:'center', justifyContent:'center'}}>
                      <View style={{width:12, height:2, borderRadius:3, backgroundColor:'#004F97'}}></View>
                    </View>
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
                    <View style={{width:'50%', paddingRight:20}}>
                      <Text style={{color:'#0B1929', fontSize:12}}>
                      Her ay İspark’ın 2 defa ücretsiz kullanımı
                      </Text>
                    </View>
                    <View style={{width:'25%', alignItems:'center', justifyContent:'center'}}>
                      <View style={{width:12, height:2, borderRadius:3, backgroundColor:'#004F97'}}></View>
                    </View>
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
                    <View style={{width:'50%', paddingRight:20}}>
                      <Text style={{color:'#0B1929', fontSize:12}}>
                      TAB Gıda markalarında Platinli menülerden faydalanabilirsin
                      </Text>
                      <Text style={{color:'#909EAA', fontSize:10}}>
                      Burger King, Popeyes, Arby’s, Usta Dönerci, Usta Pideci, Sbarro, Subway
                      </Text>
                    </View>
                    <View style={{width:'25%', alignItems:'center', justifyContent:'center'}}>
                      <View style={{width:12, height:2, borderRadius:3, backgroundColor:'#004F97'}}></View>
                    </View>
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
                    <View style={{width:'50%', paddingRight:20}}>
                      <Text style={{color:'#0B1929', fontSize:12}}>
                      İstediğin zaman üyelik iptali
                      </Text>
                    </View>
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
                    <View style={{width:'50%', paddingRight:20}}>
                      <Text style={{color:'#0B1929', fontSize:12}}>
                      Avantajlı alışveriş
                      </Text>
                    </View>
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
                    <View style={{width:'50%', paddingRight:20}}>
                      <Text style={{color:'#0B1929', fontSize:12}}>
                      Kolay ödeme imkanı
                      </Text>
                    </View>
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
                <View style={{width:'100%', borderRadius:6}}>
                  <ImageBackground
                    style={{flex:1, padding:8, alignItems:'center', justifyContent:'center'}}
                    resizeMode="cover"
                    source={require('../../../assets/img/export/platin_bg.png')}>
                      <Text style={{color:'#fff', fontSize:14, fontWeight:700, marginBottom:4}}>İlk 1 ay Platin Üyeliğin sadece 5 TL</Text>
                      <Text style={{color:'#fff', fontSize:10}}>Şimdi hesabını yükselt, avantajları kaçırma!</Text>
                  </ImageBackground>
                </View>
              </View>
              <View style={{}}>
                <Text style={{color:'#004F97', fontSize:16, fontWeight:'700', marginBottom:16}}>
                Platinli Nasıl Olunur?
                </Text>
                <Text style={{color:'#0B1929', fontSize:12, marginBottom:16}}>
                Payfour Platin üyesi olmak için Platinli ol seçeneğini seçerek üyelik sürecini başlatabilirsin.
                </Text>
                <Text style={{color:'#0B1929', fontSize:12, marginBottom:16}}>
                Dilersen CarrefourSA’larda her ay toplam 2.500 TL harcayarak Platinli olma hakkı kazanabilirsin, dilersen abonelik satın aldıktan sonra hemen Platin avantajlarından faydalanlanmaya başlayabilirsin.
                </Text>
              </View>
              <View style={{}}>
                <Text style = {{fontSize:14, color:'#0B1929', marginBottom:10}}>{`\u2022`} Aylık abonelik ücreti: 29,90 TL</Text>
                <Text style = {{fontSize:14, color:'#0B1929', marginBottom:10}}>{`\u2022`} Yıllık abonelik ücreti: 328 TL (1 ay ücretsiz)</Text>
              </View>
              <View style={{flexDirection:'row'}}>
                <View style={{marginRight:4}}>
                <Image
                  source={require('../../../assets/img/export/information.png')}
                  style={{
                    width: 16,
                    height: 16,
                    resizeMode: 'contain',
                  }}
                />
                </View>
                <Text style={{color:'#0B1929', fontSize:12, marginBottom:10}}>
                Abonelik satın alma işlemi için ilk önce cüzdanına bakiye yüklemen gerekiyor.
                </Text>
              </View>
              <Text style={{color:'#0B1929', fontSize:12, marginBottom:24}}>
              Cüzdanına aşağıdaki yöntemler ile bakiye yükleyebilirsin
                </Text>
                <View style={{                        
                        marginBottom:12,
                      }}>
                        <TouchableOpacity                            
                            onPress={() => {}}>
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
                <View style={{                        
                  marginBottom:12,
                }}>
                  
                  <TouchableOpacity
                      
                      onPress={() => {}}>
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
                <View style={{
                  marginBottom:24
                }}>
                  <TouchableOpacity                            
                    onPress={()=>{                            
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
                <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:24}}>
                  <TouchableOpacity style={{backgroundColor:'#fff', borderRadius:6, padding:16, borderWidth:2, width:'48%', borderColor:premium == 'Annual'?'#004F97':'#fff'}}
                  onPress={()=>{setPremium('Annual')}}>
                     <View style={{flexDirection:'row', marginBottom:10}}>
                        <View style={{width:20, height:20, borderRadius:20, borderWidth:1, borderColor:'#E4E4E8', alignItems:'center', justifyContent:'center'}}>
                          <View style={{display:premium == 'Annual'? 'flex':'none',
                            width:10, height:10, borderRadius:10, backgroundColor:'#004F97'
                          }}></View>
                        </View>
                    </View>     
                    <Text style={{fontSize:14, fontWeight:'700', color:'#004F97'}}>
                      Yıllık Platin Üyelik
                    </Text>
                    <Text style={{fontSize:12, color:'#909EAA'}}>
                    Yıl boyunca üyelik
                    </Text>
                    <Text style={{fontSize:16, fontWeight:'700', color:'#004F97', marginBottom:12}}>
                    27.33 TL / Ay
                    </Text>
                    <Text style={{fontSize:12, color:'#909EAA'}}>
                    Yıllık toplam
                    </Text>
                    <Text style={{fontSize:12, fontWeight:'700', color:'#0B1929', marginBottom:12}}>
                    328,00 TL
                    </Text>
                    <Text style={{fontSize:10, color:'#909EAA'}}>
                    * Toplam tutar tek seferde tahsil edilir.
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{backgroundColor:'#fff', borderRadius:6, padding:16, borderWidth:2, width:'48%', borderColor:premium == 'Monthly'?'#004F97':'#fff'}}
                  onPress={()=>{setPremium('Monthly')}}>
                    <View style={{flexDirection:'row', marginBottom:10}}>
                        <View style={{width:20, height:20, borderRadius:20, borderWidth:1, borderColor:'#E4E4E8', alignItems:'center', justifyContent:'center'}}>
                          <View style={{display:premium == 'Monthly'? 'flex':'none',
                            width:10, height:10, borderRadius:10, backgroundColor:'#004F97'
                          }}></View>
                        </View>
                    </View>    
                    <Text style={{fontSize:14, fontWeight:'700', color:'#004F97'}}>
                    Aylık Platin Üyelik
                    </Text>
                    <Text style={{fontSize:12, color:'#909EAA'}}>
                    İlk Ay Sana Özel
                    </Text>
                    <Text style={{fontSize:16, fontWeight:'700', color:'#004F97', marginBottom:12}}>
                    5 TL
                    </Text>
                    <Text style={{fontSize:12, color:'#909EAA'}}>
                    Daha Sonra
                    </Text>
                    <Text style={{fontSize:12, fontWeight:'700', color:'#0B1929', marginBottom:12}}>
                    29,90 TL/Ay
                    </Text>
                    
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={[styles.buttonStyle, {marginBottom: 60, backgroundColor: '#004F97'}]}
                    
                    activeOpacity={0.5}
                    onPress={handleSubmitPress}>
                      <Text style={styles.buttonTextStyle}>Platinli Ol</Text>
                    </TouchableOpacity>
            </View>

        </ScrollView>
      </SafeAreaView>
  );
};
export default ProfilePlatinum;

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

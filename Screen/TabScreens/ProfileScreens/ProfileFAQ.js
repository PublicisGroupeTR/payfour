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


const ProfileFAQ = ({navigation}) => { 

  const [faqItem, setFaqItem] = useState(1);
  const [loading, setLoading] = useState(false);
  const [campaign, setCampaign] = useState(false);
  const [payment, setPayment] = useState(false);
  const [offers, setOffers] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  
  const handleExit = () => {
    console.log('handleExit');

    setModalVisible(true);
  };
  
  

  return(
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>      
      
    <Loader loading={loading} />
    <SubtabHeader routetarget="ProfileHome" name="Sıkça Sorulanlar" count="0" />
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
                  
                  <View style={{marginBottom:8}}>
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
                        Payfour nedir?
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
                        Payfour, CarrefourSA müşterilerinin bakiye yükleyerek veya kişiye özel çalışılan alışveriş kredisi ile hazır limit özelliklerini kullanarak CarrefourSA alışverişlerini gerçekleştirmelerini sağlayan, mevcut CarrefourSA Kart kampanyalarına ek olarak Payfour’a özel kampanyalar ile nakit iade ve puan kazandıran Dijital Cüzdan uygulamasıdır.
                        </Text>
                    </View>
                          
                    
                  </View>
                  <View style={{marginBottom:8}}>
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
                        Payfour ile nerelerde ödeme yapabilirim?
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
                        Payfour ile CarrefourSA Online Market uygulaması ve CarrefourSA.com’da ödeme yapabilirsiniz. Çok yakında CarrefourSA mağazalarında da ödeme yapılabilecektir. CarrefourSA’lar haricinde Payfour ile ödeme yapılamamaktadır.
                        </Text>
                    </View>
                          
                    
                  </View>
                  <View style={{marginBottom:8}}>
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
                        Payfour ile ödeme yapmanın avantajları nelerdir?
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
                        Payfour’a özel kampanyalar ile bakiye yüklerken ek bakiye, ödeme sonrasında nakit iade ve puanlar kazanabilirsiniz. Ayrıca Platin üye olan müşterilerimize özel alışverişlerde nakit iade, ücretsiz kargo, çağrı merkezinde öncelik gibi ek avantajlardan da yararlanabilirsiniz.
                        </Text>
                    </View>
                          
                    
                  </View>
                  <View style={{marginBottom:8}}>
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
                        Payfour bakiye yükleme limiti ne kadardır?
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
                        Payfour’a bir takvim ayı içerisinde, en fazla 150.000 TL yüklenebilmektedir.
                        </Text>
                    </View>
                          
                    
                  </View>
                  <View style={{marginBottom:8}}>
                    <TouchableOpacity style={{
                      height:50,
                      
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      borderBottomWidth:1,
                      borderBottomColor:'#F2F4F6',
                    }}
                    onPress={()=>setFaqItem(5)}>
                      <Text style={{
                        fontSize:14,
                        fontWeight:700,
                        color:'#0B1929',
                        width:'85%',
                      }}>
                        Payfour bakiye harcama limiti ne kadardır?
                      </Text>
                      <Image
                        source={require('../../../assets/img/export/arrow_down_blue.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          transform: faqItem == 5? [{scaleY:1}] : [{scaleY:-1}]
                        }}
                      />
                    </TouchableOpacity>
                      
                    <View style={{
                      padding:16,
                      display:faqItem == 5? 'flex' : 'none',
                    }}>
                      <Text style={{
                        fontSize:12,
                      color:'#909EAA',}}>
                        Payfour’da bir harcama limiti bulunmamaktadır.
                        </Text>
                    </View>
                          
                    
                  </View>
                  <View style={{marginBottom:8}}>
                    <TouchableOpacity style={{
                      height:50,
                      
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      borderBottomWidth:1,
                      borderBottomColor:'#F2F4F6',
                    }}
                    onPress={()=>setFaqItem(6)}>
                      <Text style={{
                        fontSize:14,
                        fontWeight:700,
                        color:'#0B1929',
                        width:'85%',
                      }}>
                        Payfour ile nasıl ödeme yapabilirim?
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
                      display:faqItem == 6? 'flex' : 'none',
                    }}>
                      <Text style={{
                        fontSize:12,
                      color:'#909EAA',
                      marginBottom:12}}>
                        Öncelikle Payfour uygulamasını indirmeniz ve Payfour hesabınıza bakiye yüklemeniz gerekmektedir.</Text>
                        <Text style={{
                        fontSize:12,
                      color:'#909EAA',
                      marginBottom:12}}>
 
 CarrefourSA Online Market veya CarrefourSA.com’da, Payfour hesabınıza ait telefon numaranız ile kullanıcı girişini yaparak sepetinizi doldurduktan sonra ödeme sayfasına gelindiğinde “Payfour ile öde” seçeneğini seçerek “Siparişi Tamamla” butonuna tıklayıp, ardından Payfour içerisinden gelecek bildirime veya Ödeme Yap butonuna tıklayarak, ödemenizi tamamlayabilirsiniz.
 </Text>
 <Text style={{
                        fontSize:12,
                      color:'#909EAA',}}>
 Mağazalardan yapılacak alışverişlerde, kasalarda Payfour hesabınıza ait telefon numaranızı söylemeniz ve en son ödemeyi Payfour ile yapacağınızı söyledikten sonra Payfour içerisinden gelecek bildirime veya Ödeme Yap butonuna tıklayarak, ödemenizi tamamlayabilirsiniz.</Text>
                 
                     </View>
                          
                    
                  </View>
                  <View style={{marginBottom:8}}>
                    <TouchableOpacity style={{
                      height:50,
                      
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      borderBottomWidth:1,
                      borderBottomColor:'#F2F4F6',
                    }}
                    onPress={()=>setFaqItem(7)}>
                      <Text style={{
                        fontSize:14,
                        fontWeight:700,
                        color:'#0B1929',
                        width:'85%',
                      }}>
                        Cep telefonuma doğrulama mesajı / kodu gelmiyor, ne yapabilirim?
                      </Text>
                      <Image
                        source={require('../../../assets/img/export/arrow_down_blue.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          transform: faqItem == 7? [{scaleY:1}] : [{scaleY:-1}]
                        }}
                      />
                    </TouchableOpacity>
                      
                    <View style={{
                      padding:16,
                      display:faqItem == 7? 'flex' : 'none',
                    }}>
                      <Text style={{
                        fontSize:12,
                      color:'#909EAA',}}>
                        Yakın zamanda operatör değişikliği yapıldığı durumlarda bu sorun yaşanabilmektedir. 444 10 00 numaralı çağrı merkezimizi arayarak, sorununuzu en kısa sürede giderebilirsiniz.
                        </Text>
                    </View>
                          
                    
                  </View>
                  <View style={{marginBottom:8}}>
                    <TouchableOpacity style={{
                      height:50,
                      
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      borderBottomWidth:1,
                      borderBottomColor:'#F2F4F6',
                    }}
                    onPress={()=>setFaqItem(8)}>
                      <Text style={{
                        fontSize:14,
                        fontWeight:700,
                        color:'#0B1929',
                        width:'85%',
                      }}>
                        Şifremi unuttum. Ne yapabilirim?
                      </Text>
                      <Image
                        source={require('../../../assets/img/export/arrow_down_blue.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          transform: faqItem == 8? [{scaleY:1}] : [{scaleY:-1}]
                        }}
                      />
                    </TouchableOpacity>
                      
                    <View style={{
                      padding:16,
                      display:faqItem == 8? 'flex' : 'none',
                    }}>
                      <Text style={{
                        fontSize:12,
                      color:'#909EAA',}}>                       
                       Giriş ekranındaki “Şifremi Unuttum” butonuna tıklayarak, şifrenizi sıfırlayabilirsiniz veya 444 10 00 numaralı çağrı merkezimizi arayarak destek alabilirsiniz.
                       </Text>
                    </View>
                          
                    
                  </View>
                  <View style={{marginBottom:8}}>
                    <TouchableOpacity style={{
                      height:50,
                      
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      borderBottomWidth:1,
                      borderBottomColor:'#F2F4F6',
                    }}
                    onPress={()=>setFaqItem(9)}>
                      <Text style={{
                        fontSize:14,
                        fontWeight:700,
                        color:'#0B1929',
                        width:'85%',
                      }}>
                        Şifremi nasıl değiştirebilirim?
                      </Text>
                      <Image
                        source={require('../../../assets/img/export/arrow_down_blue.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          transform: faqItem == 9? [{scaleY:1}] : [{scaleY:-1}]
                        }}
                      />
                    </TouchableOpacity>
                      
                    <View style={{
                      padding:16,
                      display:faqItem == 9? 'flex' : 'none',
                    }}>
                      <Text style={{
                        fontSize:12,
                      color:'#909EAA',}}>                       
                       Uygulamanın sağ üst bölümünden, profilinizi açtıktan sonra “Güvenlik ve Tercihler” bölümünden “Şifremi Değiştir” alanına tıklayarak, şifrenizi değiştirebilirsiniz.
                       </Text>
                    </View>
                          
                    
                  </View>
                  <View style={{marginBottom:8}}>
                    <TouchableOpacity style={{
                      height:50,
                      
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      borderBottomWidth:1,
                      borderBottomColor:'#F2F4F6',
                    }}
                    onPress={()=>setFaqItem(10)}>
                      <Text style={{
                        fontSize:14,
                        fontWeight:700,
                        color:'#0B1929',
                        width:'85%',
                      }}>
                        Şifremi yanlış girdim, hesabım kilitlendi. Ne yapmalıyım?
                      </Text>
                      <Image
                        source={require('../../../assets/img/export/arrow_down_blue.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          transform: faqItem == 10? [{scaleY:1}] : [{scaleY:-1}]
                        }}
                      />
                    </TouchableOpacity>
                      
                    <View style={{
                      padding:16,
                      display:faqItem == 10? 'flex' : 'none',
                    }}>
                      <Text style={{
                        fontSize:12,
                      color:'#909EAA',}}>                       
                       444 10 00 numaralı çağrı merkezimizi arayarak destek alabilirsiniz.
                       </Text>
                    </View>
                          
                    
                  </View>
                  <View style={{marginBottom:8}}>
                    <TouchableOpacity style={{
                      height:50,
                      
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      borderBottomWidth:1,
                      borderBottomColor:'#F2F4F6',
                    }}
                    onPress={()=>setFaqItem(11)}>
                      <Text style={{
                        fontSize:14,
                        fontWeight:700,
                        color:'#0B1929',
                        width:'85%',
                      }}>
                        Payfour şifremin geçerlilik süresi ne kadardır?
                      </Text>
                      <Image
                        source={require('../../../assets/img/export/arrow_down_blue.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          transform: faqItem == 11? [{scaleY:1}] : [{scaleY:-1}]
                        }}
                      />
                    </TouchableOpacity>
                      
                    <View style={{
                      padding:16,
                      display:faqItem == 11? 'flex' : 'none',
                    }}>
                      <Text style={{
                        fontSize:12,
                      color:'#909EAA',}}>                       
                       Şifrenizin bir geçerlilik süresi bulunmamaktadır. Dilediğiniz zaman şifre değiştirme işlemi yapabilirsiniz. Şifre değiştirmediğiniz takdirde, mevcut şifrenizi süresiz bir şekilde kullanmaya devam edebilirsiniz.
                       </Text>
                    </View>
                          
                    
                  </View>
                  <View style={{marginBottom:8}}>
                    <TouchableOpacity style={{
                      height:50,
                      
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      borderBottomWidth:1,
                      borderBottomColor:'#F2F4F6',
                    }}
                    onPress={()=>setFaqItem(12)}>
                      <Text style={{
                        fontSize:14,
                        fontWeight:700,
                        color:'#0B1929',
                        width:'85%',
                      }}>
                        Kredi / Debit Kart bilgilerim nerede ve nasıl saklanıyor?
                      </Text>
                      <Image
                        source={require('../../../assets/img/export/arrow_down_blue.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          transform: faqItem == 12? [{scaleY:1}] : [{scaleY:-1}]
                        }}
                      />
                    </TouchableOpacity>
                      
                    <View style={{
                      padding:16,
                      display:faqItem == 12? 'flex' : 'none',
                    }}>
                      <Text style={{
                        fontSize:12,
                      color:'#909EAA',}}>                       
                       Kart bilgileriniz Payfour’da tutulmamaktadır. Sadece Masterpass’e kayıtlı kartlar ile işlem yapılabilmektedir ve kart bilgileri Masterpass tarafından saklanmaktadır.
                       </Text>
                    </View>
                          
                    
                  </View>
                  <View style={{marginBottom:8}}>
                    <TouchableOpacity style={{
                      height:50,
                      
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      borderBottomWidth:1,
                      borderBottomColor:'#F2F4F6',
                    }}
                    onPress={()=>setFaqItem(13)}>
                      <Text style={{
                        fontSize:14,
                        fontWeight:700,
                        color:'#0B1929',
                        width:'85%',
                      }}>
                        Kayıtlı Kredi / Debit Kart bilgilerimi nasıl silebilirim?
                      </Text>
                      <Image
                        source={require('../../../assets/img/export/arrow_down_blue.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          transform: faqItem == 13? [{scaleY:1}] : [{scaleY:-1}]
                        }}
                      />
                    </TouchableOpacity>
                      
                    <View style={{
                      padding:16,
                      display:faqItem == 13? 'flex' : 'none',
                    }}>
                      <Text style={{
                        fontSize:12,
                      color:'#909EAA',}}>                       
                       Masterpass’e giriş yaparak, kart bilgileriniz ile ilgili işlemleri yapabilirsiniz.
                       </Text>
                    </View>
                          
                    
                  </View>
                  <View style={{marginBottom:8}}>
                    <TouchableOpacity style={{
                      height:50,
                      
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      borderBottomWidth:1,
                      borderBottomColor:'#F2F4F6',
                    }}
                    onPress={()=>setFaqItem(14)}>
                      <Text style={{
                        fontSize:14,
                        fontWeight:700,
                        color:'#0B1929',
                        width:'85%',
                      }}>
                        Çağrı merkezi ile bilgi paylaşımı
                      </Text>
                      <Image
                        source={require('../../../assets/img/export/arrow_down_blue.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          transform: faqItem == 14? [{scaleY:1}] : [{scaleY:-1}]
                        }}
                      />
                    </TouchableOpacity>
                      
                    <View style={{
                      padding:16,
                      display:faqItem == 14? 'flex' : 'none',
                    }}>
                      <Text style={{
                        fontSize:12,
                      color:'#909EAA',}}>                       
                       Çağrı merkezi ile yapacağınız görüşmelerde, şifreniz sizlere sorulmayacaktır. Payfour şifrenizi kimse ile paylaşmamanızı rica ederiz.
                       </Text>
                    </View>
                          
                    
                  </View>
                  <View style={{marginBottom:8}}>
                    <TouchableOpacity style={{
                      height:50,
                      
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      borderBottomWidth:1,
                      borderBottomColor:'#F2F4F6',
                    }}
                    onPress={()=>setFaqItem(15)}>
                      <Text style={{
                        fontSize:14,
                        fontWeight:700,
                        color:'#0B1929',
                        width:'85%',
                      }}>
                        Payfour No nedir?
                      </Text>
                      <Image
                        source={require('../../../assets/img/export/arrow_down_blue.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          transform: faqItem == 15? [{scaleY:1}] : [{scaleY:-1}]
                        }}
                      />
                    </TouchableOpacity>
                      
                    <View style={{
                      padding:16,
                      display:faqItem == 15? 'flex' : 'none',
                    }}>
                      <Text style={{
                        fontSize:12,
                      color:'#909EAA',}}>                       
                       Payfour No size özel tanımlanan, Payfour dünyası içerisindeki kimlik numaranızdır.
                       </Text>
                    </View>
                          
                    
                  </View>
                  <View style={{marginBottom:8}}>
                    <TouchableOpacity style={{
                      height:50,
                      
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      borderBottomWidth:1,
                      borderBottomColor:'#F2F4F6',
                    }}
                    onPress={()=>setFaqItem(16)}>
                      <Text style={{
                        fontSize:14,
                        fontWeight:700,
                        color:'#0B1929',
                        width:'85%',
                      }}>
                        Telefonum çalındı, ne yapabilirim?
                      </Text>
                      <Image
                        source={require('../../../assets/img/export/arrow_down_blue.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          transform: faqItem == 16? [{scaleY:1}] : [{scaleY:-1}]
                        }}
                      />
                    </TouchableOpacity>
                      
                    <View style={{
                      padding:16,
                      display:faqItem == 16? 'flex' : 'none',
                    }}>
                      <Text style={{
                        fontSize:12,
                      color:'#909EAA',}}>                       
                       444 10 00 numaralı çağrı merkezimizi arayarak destek alabilirsiniz.
                       </Text>
                    </View>
                          
                    
                  </View>
                  <View style={{marginBottom:8}}>
                    <TouchableOpacity style={{
                      height:50,
                      
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      borderBottomWidth:1,
                      borderBottomColor:'#F2F4F6',
                    }}
                    onPress={()=>setFaqItem(17)}>
                      <Text style={{
                        fontSize:14,
                        fontWeight:700,
                        color:'#0B1929',
                        width:'85%',
                      }}>
                        Telefon numaramı değiştirdim, ne yapmalıyım?
                      </Text>
                      <Image
                        source={require('../../../assets/img/export/arrow_down_blue.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          transform: faqItem == 17? [{scaleY:1}] : [{scaleY:-1}]
                        }}
                      />
                    </TouchableOpacity>
                      
                    <View style={{
                      padding:16,
                      display:faqItem == 17? 'flex' : 'none',
                    }}>
                      <Text style={{
                        fontSize:12,
                      color:'#909EAA',}}>                       
                       444 10 00 numaralı çağrı merkezimizi arayarak destek alabilirsiniz.
                       </Text>
                    </View>
                          
                    
                  </View>
                  <View style={{marginBottom:8}}>
                    <TouchableOpacity style={{
                      height:50,
                      
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      borderBottomWidth:1,
                      borderBottomColor:'#F2F4F6',
                    }}
                    onPress={()=>setFaqItem(18)}>
                      <Text style={{
                        fontSize:14,
                        fontWeight:700,
                        color:'#0B1929',
                        width:'85%',
                      }}>
                        Payfour’a nasıl bakiye yükleyebilirim?
                      </Text>
                      <Image
                        source={require('../../../assets/img/export/arrow_down_blue.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          transform: faqItem == 18? [{scaleY:1}] : [{scaleY:-1}]
                        }}
                      />
                    </TouchableOpacity>
                      
                    <View style={{
                      padding:16,
                      display:faqItem == 18? 'flex' : 'none',
                    }}>
                      <Text style={{
                        fontSize:12,
                      color:'#909EAA',}}>                       
                       Payfour’a kredi / debit kartlarınızla, havale / eft yaparak veya CarrefourSA mağazalarından nakit ödeme yaparak, 3 farklı seçenek ile bakiye yükleyebilirsiniz.
                       </Text>
                    </View>
                          
                    
                  </View>
                  <View style={{marginBottom:8}}>
                    <TouchableOpacity style={{
                      height:50,
                      
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      //borderBottomWidth:1,
                      //borderBottomColor:'#F2F4F6',
                    }}
                    onPress={()=>setFaqItem(19)}>
                      <Text style={{
                        fontSize:14,
                        fontWeight:700,
                        color:'#0B1929',
                        width:'85%',
                      }}>
                        Kredi / Debit kartımı Masterpass’e kayıt etmeden, bakiye yükleyebilir miyim?
                      </Text>
                      <Image
                        source={require('../../../assets/img/export/arrow_down_blue.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          transform: faqItem == 19? [{scaleY:1}] : [{scaleY:-1}]
                        }}
                      />
                    </TouchableOpacity>
                      
                    <View style={{
                      padding:16,
                      display:faqItem == 19? 'flex' : 'none',
                    }}>
                      <Text style={{
                        fontSize:12,
                      color:'#909EAA',}}>                       
                       Kredi / Debit kartlar ile bakiye yükleme işlemleri sadece Masterpass üzerinden yapılmaktadır ancak kart bilgilerinizi kaydetme zorunluluğu bulunmamaktadır.
                       </Text>
                    </View>
                          
                    
                  </View>
                  <TouchableOpacity
                    style={[styles.buttonStyle, {marginBottom: 0, backgroundColor: '#fff', borderWidth:1, borderColor: '#004F97', flexDirection:'row', alignItems:'center', justifyContent:'center', marginBottom:80}]}
                    
                    activeOpacity={0.5}
                    onPress={()=>{navigation.navigate("ProfileSupport")}}>
                      <Image
                        source={require('../../../assets/img/export/icon_chat.png')}
                        style={{
                          width: 24,
                          height: 24,
                          marginRight:8,
                          resizeMode: 'contain',
                        }}
                      />
                      <Text style={[styles.buttonTextStyle, {color: '#004F97'}]}>Yardım / Bize Ulaşın</Text>
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
export default ProfileFAQ;

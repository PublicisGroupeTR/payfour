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
                  <Text style={{fontSize:16,
                        fontWeight:700,
                        color:'#004F97',
                        }}>Payfour Hakkında</Text>
                  <View style={{marginBottom:8}}>
                    <TouchableOpacity style={{
                      minHeight:50, paddingBottom:8,
                      
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      borderBottomWidth:1,
                      borderBottomColor:'#F2F4F6',
                    }}
                    onPress={()=>faqItem==1? setFaqItem(0):setFaqItem(1)}>
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
                          transform: faqItem == 1? [{scaleY:-1}] : [{scaleY:1}]
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
                        Payfour, CarrefourSA müşterilerinin bakiye yükleyerek veya kişiye özel çalışılan hazır limitleri ile alışveriş kredisi kullanarak CarrefourSA alışverişlerini gerçekleştirmelerini sağlayan dijital cüzdan uygulamasıdır. Payfour ile mevcut CarrefourSA Kart kampanyalarına ek olarak özel fırsatlardan faydanabilir ve puan kazanabilirsiniz.
                        </Text>
                    </View>
                          
                    
                  </View>
                  <View style={{marginBottom:8}}>
                    <TouchableOpacity style={{
                      minHeight:50, paddingBottom:8,
                      
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      borderBottomWidth:1,
                      borderBottomColor:'#F2F4F6',
                    }}
                    onPress={()=>faqItem==2? setFaqItem(0):setFaqItem(2)}>
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
                          transform: faqItem == 2? [{scaleY:-1}] : [{scaleY:1}]
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
                        Payfour ile tüm CarrefourSA’larda ödeme yapabilirsiniz. CarrefourSA’lar haricinde Payfour ile ödeme yapılamamaktadır.</Text>
                    </View>
                          
                    
                  </View>
                  <View style={{marginBottom:8}}>
                    <TouchableOpacity style={{
                      minHeight:50, paddingBottom:8,
                      
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      borderBottomWidth:1,
                      borderBottomColor:'#F2F4F6',
                    }}
                    onPress={()=>faqItem==3? setFaqItem(0):setFaqItem(3)}>
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
                          transform: faqItem == 3? [{scaleY:-1}] : [{scaleY:1}]
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
                        Payfour’a ve size özel kampanyalar ile puanlar kazanabilirsiniz. Çeşitli markalarda indirim gibi ayrıcalıklardan faydalanabilirsiniz. Ayrıca Platin üye olarak, alışverişlerinde daha fazla puan, ücretsiz kargo, çağrı merkezinde öncelik gibi ek avantajlardan da yararlanabilirsiniz.
                        </Text>
                    </View>
                          
                    
                  </View>
                  <View style={{marginBottom:8}}>
                    <TouchableOpacity style={{
                      minHeight:50, paddingBottom:8,
                      
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      borderBottomWidth:1,
                      borderBottomColor:'#F2F4F6',
                    }}
                    onPress={()=>faqItem==4? setFaqItem(0):setFaqItem(4)}>
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
                          transform: faqItem == 4? [{scaleY:-1}] : [{scaleY:1}]
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
                        Payfour’a en fazla 150.000 TL yüklenebilmektedir. Kasalardan nakit yükleme limiti ise tek seferde en fazla 30.000 TL’dir.
                        </Text>
                    </View>
                          
                    
                  </View>
                  <View style={{marginBottom:8}}>
                    <TouchableOpacity style={{
                      minHeight:50, paddingBottom:8,
                      
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      borderBottomWidth:1,
                      borderBottomColor:'#F2F4F6',
                    }}
                    onPress={()=>faqItem==5? setFaqItem(0):setFaqItem(5)}>
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
                          transform: faqItem == 5? [{scaleY:-1}] : [{scaleY:1}]
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
                      minHeight:50, paddingBottom:8,
                      
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      borderBottomWidth:1,
                      borderBottomColor:'#F2F4F6',
                    }}
                    onPress={()=>faqItem==6? setFaqItem(0):setFaqItem(6)}>
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
                          transform: faqItem == 1? [{scaleY:-1}] : [{scaleY:1}]
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
                        Öncelikle Payfour uygulamasını indirmeniz ve Payfour hesabınıza bakiye yüklemeniz gerekmektedir.
                        </Text>
                        <Text style={{
                        fontSize:12,
                      color:'#909EAA',
                      marginBottom:12}}>
 
 CarrefourSA Online Market veya carrefoursa.com’da, Payfour hesabınıza ait telefon numaranız ile kullanıcı girişini yaparak sepetinizi doldurduktan sonra ödeme sayfasına gelindiğinde “Payfour ile öde” seçeneğini seçerek “Siparişi Tamamla” butonuna tıklayıp, ardından Payfour içerisinden gelecek bildirime veya “Ödeme Yap” butonuna tıklayarak, ödemenizi tamamlayabilirsiniz.
 </Text>
 <Text style={{
                        fontSize:12,
                      color:'#909EAA',}}>
 Mağazalardan yapılacak alışverişlerde, kasalarda Payfour hesabınıza ait telefon numaranızı veya Payfour numaranızı söylemeniz ve en son ödemeyi Payfour ile yapacağınızı söyledikten sonra Payfour içerisinden gelecek bildirime veya “Ödeme Yap” butonuna tıklayarak, ödemenizi tamamlayabilirsiniz.
 </Text>
                 
                     </View>
                          
                    
                  </View>
                  <Text style={{fontSize:16,
                        fontWeight:700,
                        color:'#004F97',
                        marginTop:16,
                        marginBottom:8,
                        }}>Bakiye Yükleme İşlemleri</Text>
                  <View style={{marginBottom:8}}>
                    <TouchableOpacity style={{
                      minHeight:50, paddingBottom:8,
                      
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      borderBottomWidth:1,
                      borderBottomColor:'#F2F4F6',
                    }}
                    onPress={()=>faqItem==7? setFaqItem(0):setFaqItem(7)}>
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
                          transform: faqItem == 7? [{scaleY:-1}] : [{scaleY:1}]
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
                        Payfour’a, Masterpass’e kayıtlı Banka / Kredi kartlarınızla, Havale / EFT yaparak veya CarrefourSA mağazalarından kasadan yükleme ile bakiye yükleyebilirsiniz.
                        </Text>
                    </View>
                          
                    
                  </View>
                  <View style={{marginBottom:8}}>
                    <TouchableOpacity style={{
                      minHeight:50, paddingBottom:8,
                      
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      borderBottomWidth:1,
                      borderBottomColor:'#F2F4F6',
                    }}
                    onPress={()=>faqItem==8? setFaqItem(0):setFaqItem(8)}>
                      <Text style={{
                        fontSize:14,
                        fontWeight:700,
                        color:'#0B1929',
                        width:'85%',
                      }}>
                        Banka/ Kredi kartımı Masterpass’e kayıt etmeden, bakiye yükleyebilir miyim?
                      </Text>
                      <Image
                        source={require('../../../assets/img/export/arrow_down_blue.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          transform: faqItem == 8? [{scaleY:-1}] : [{scaleY:1}]
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
                       Banka / Kredi kartlarınız ile bakiye yükleme işlemleri sadece Masterpass üzerinden yapılmaktadır ancak kart bilgilerinizi kaydetme zorunluluğu bulunmamaktadır.
                       </Text>
                    </View>
                          
                    
                  </View>
                  <View style={{marginBottom:8}}>
                    <TouchableOpacity style={{
                      minHeight:50, paddingBottom:8,
                      
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      borderBottomWidth:1,
                      borderBottomColor:'#F2F4F6',
                    }}
                    onPress={()=>faqItem==9? setFaqItem(0):setFaqItem(9)}>
                      <Text style={{
                        fontSize:14,
                        fontWeight:700,
                        color:'#0B1929',
                        width:'85%',
                      }}>
                        Yabancı Banka /Kredi kartlar ile bakiye yükleyebilir miyim?
                      </Text>
                      <Image
                        source={require('../../../assets/img/export/arrow_down_blue.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          transform: faqItem == 9? [{scaleY:-1}] : [{scaleY:1}]
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
                       Hayır, yapılamamaktadır. Sadece Türk banka ve ödeme kuruluşlarına bağlı kartlar ile bakiye yüklemesi yapılabilmektedir.
                       </Text>
                    </View>
                          
                    
                  </View>
                  <Text style={{fontSize:16,
                        fontWeight:700,
                        color:'#004F97',
                        marginTop:16,
                        marginBottom:8,
                        }}>Ödeme ve Bakiye İşlemleri</Text>
                  <View style={{marginBottom:8}}>
                    <TouchableOpacity style={{
                      minHeight:50, paddingBottom:8,
                      
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      borderBottomWidth:1,
                      borderBottomColor:'#F2F4F6',
                    }}
                    onPress={()=>faqItem==10? setFaqItem(0):setFaqItem(10)}>
                      <Text style={{
                        fontSize:14,
                        fontWeight:700,
                        color:'#0B1929',
                        width:'85%',
                      }}>
                        Bir ödemeyi cüzdan bakiyemle yaparken sorun yaşadım, ne yapmalıyım?
                      </Text>
                      <Image
                        source={require('../../../assets/img/export/arrow_down_blue.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          transform: faqItem == 10? [{scaleY:-1}] : [{scaleY:1}]
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
                       444 10 00 numaralı çağrı merkezimiz üzerinden durumu bizlere bildirdiğiniz takdirde, en kısa sürede probleminiz çözümlenecektir.
                       </Text>
                    </View>
                          
                    
                  </View>
                  <View style={{marginBottom:8}}>
                    <TouchableOpacity style={{
                      minHeight:50, paddingBottom:8,
                      
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      borderBottomWidth:1,
                      borderBottomColor:'#F2F4F6',
                    }}
                    onPress={()=>faqItem==11? setFaqItem(0):setFaqItem(11)}>
                      <Text style={{
                        fontSize:14,
                        fontWeight:700,
                        color:'#0B1929',
                        width:'85%',
                      }}>
                        Yanlış bir ödeme yaptım, iade alabilir miyim?
                      </Text>
                      <Image
                        source={require('../../../assets/img/export/arrow_down_blue.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          transform: faqItem == 11? [{scaleY:-1}] : [{scaleY:1}]
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
                       Payfour ile yapılan ödemelerin iadesi cüzdanınıza yapılabilmektedir.
                       </Text>
                    </View>
                          
                    
                  </View>
                  <View style={{marginBottom:8}}>
                    <TouchableOpacity style={{
                      minHeight:50, paddingBottom:8,
                      
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      borderBottomWidth:1,
                      borderBottomColor:'#F2F4F6',
                    }}
                    onPress={()=>faqItem==12? setFaqItem(0):setFaqItem(12)}>
                      <Text style={{
                        fontSize:14,
                        fontWeight:700,
                        color:'#0B1929',
                        width:'85%',
                      }}>
                        Cüzdanıma yansıyan iademi nereden görebilirim?
                      </Text>
                      <Image
                        source={require('../../../assets/img/export/arrow_down_blue.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          transform: faqItem == 12? [{scaleY:-1}] : [{scaleY:1}]
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
                       Payfour içerisindeki “İşlemler” alanından görüntüleyebilirsiniz.
                       </Text>
                    </View>
                          
                    
                  </View>
                  <View style={{marginBottom:8}}>
                    <TouchableOpacity style={{
                      minHeight:50, paddingBottom:8,
                      
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      borderBottomWidth:1,
                      borderBottomColor:'#F2F4F6',
                    }}
                    onPress={()=>faqItem==13? setFaqItem(0):setFaqItem(13)}>
                      <Text style={{
                        fontSize:14,
                        fontWeight:700,
                        color:'#0B1929',
                        width:'85%',
                      }}>
                        Cüzdan bakiyemin süresi dolacak mı?
                      </Text>
                      <Image
                        source={require('../../../assets/img/export/arrow_down_blue.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          transform: faqItem == 13? [{scaleY:-1}] : [{scaleY:1}]
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
                       Hayır, Payfour cüzdan bakiyesinin herhangi bir süresi bulunmamaktadır. Yükleme yapıldıktan sonra, ilgili bakiye harcanana kadar cüzdan içerisinde saklanacaktır.
                       </Text>
                    </View>
                          
                    
                  </View>
                  <View style={{marginBottom:8}}>
                    <TouchableOpacity style={{
                      minHeight:50, paddingBottom:8,
                      
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      borderBottomWidth:1,
                      borderBottomColor:'#F2F4F6',
                    }}
                    onPress={()=>faqItem==14? setFaqItem(0):setFaqItem(14)}>
                      <Text style={{
                        fontSize:14,
                        fontWeight:700,
                        color:'#0B1929',
                        width:'85%',
                      }}>
                        Cüzdanımdaki puanları nasıl kullanabilirim?
                      </Text>
                      <Image
                        source={require('../../../assets/img/export/arrow_down_blue.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          transform: faqItem == 14? [{scaleY:-1}] : [{scaleY:1}]
                        }}
                      />
                    </TouchableOpacity>
                      
                    <View style={{
                      padding:16,
                      display:faqItem == 14? 'flex' : 'none',
                    }}>
                      <Text style={{
                        fontSize:12,
                      color:'#909EAA',
                      marginBottom:12}}>                       
                       Payfour hesabınıza bağlı CarrefourSA Kart’ınızdaki puanlarınızı online ödemelerde, “Siparişi Tamamla” butonuna basılmadan önce ilgili butonun altındaki “CarrefourSA Kart” butonuna tıklayarak kullanabilirsiniz. Puan kullanıldıktan sonra “Siparişi Tamamla” butonuna tıklayarak Payfour ile ödemenizi tamamlayabilirsiniz.
                       </Text>
                       <Text style={{
                        fontSize:12,
                      color:'#909EAA',}}>
Mağazalardan yapılacak ödemelerde ise Payfour ile ödeme işlemine başlanmadan önce, kasiyerlerimize puan kullanmak istediğiniz bilgisini verebilirsiniz ve ardından ödeme yapabilirsiniz.</Text>
                    </View>
                          
                    
                  </View>
                  <View style={{marginBottom:8}}>
                    <TouchableOpacity style={{
                      minHeight:50, paddingBottom:8,
                      
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      borderBottomWidth:1,
                      borderBottomColor:'#F2F4F6',
                    }}
                    onPress={()=>faqItem==15? setFaqItem(0):setFaqItem(15)}>
                      <Text style={{
                        fontSize:14,
                        fontWeight:700,
                        color:'#0B1929',
                        width:'85%',
                      }}>
                        Bakiyemi başka bir hesaba aktarabilir miyim?
                      </Text>
                      <Image
                        source={require('../../../assets/img/export/arrow_down_blue.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          transform: faqItem == 15? [{scaleY:-1}] : [{scaleY:1}]
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
                       Hayır, Payfour hesapları içerisinde bakiye transferi yapılamamaktadır.
                       </Text>
                    </View>
                          
                    
                  </View>
                  <Text style={{fontSize:16,
                        fontWeight:700,
                        color:'#004F97',
                        marginTop:16,
                        marginBottom:8,
                        }}>Giriş & Şifre & Güvenlik İşlemleri</Text>
                  <View style={{marginBottom:8}}>
                    <TouchableOpacity style={{
                      minHeight:50, paddingBottom:8,
                      
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      borderBottomWidth:1,
                      borderBottomColor:'#F2F4F6',
                    }}
                    onPress={()=>faqItem==16? setFaqItem(0):setFaqItem(16)}>
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
                          transform: faqItem == 16? [{scaleY:-1}] : [{scaleY:1}]
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
                       Yakın zamanda operatör değişikliği yapıldığı durumlarda bu sorun yaşanabilmektedir. 444 10 00 numaralı çağrı merkezimizi arayarak, sorununuzu en kısa sürede giderebilirsiniz.
                       </Text>
                    </View>
                          
                    
                  </View>
                  <View style={{marginBottom:8}}>
                    <TouchableOpacity style={{
                      minHeight:50, paddingBottom:8,
                      
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      borderBottomWidth:1,
                      borderBottomColor:'#F2F4F6',
                    }}
                    onPress={()=>faqItem==17? setFaqItem(0):setFaqItem(17)}>
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
                          transform: faqItem == 17? [{scaleY:-1}] : [{scaleY:1}]
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
                       Giriş ekranındaki “Şifremi Unuttum” butonuna tıklayarak, şifrenizi sıfırlayabilirsiniz veya 444 10 00 numaralı çağrı merkezimizi arayarak destek alabilirsiniz.
                       </Text>
                    </View>
                          
                    
                  </View>
                  <View style={{marginBottom:8}}>
                    <TouchableOpacity style={{
                      minHeight:50, paddingBottom:8,
                      
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      borderBottomWidth:1,
                      borderBottomColor:'#F2F4F6',
                    }}
                    onPress={()=>faqItem==18? setFaqItem(0):setFaqItem(18)}>
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
                          transform: faqItem == 18? [{scaleY:-1}] : [{scaleY:1}]
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
                       Uygulamanın sağ üst bölümünden, profilinizi açtıktan sonra “Güvenlik ve Tercihler” bölümünden “Şifremi Değiştir” alanına tıklayarak, şifrenizi değiştirebilirsiniz.
                       </Text>
                    </View>
                          
                    
                  </View>
                  <View style={{marginBottom:8}}>
                    <TouchableOpacity style={{
                      minHeight:50, paddingBottom:8,
                      
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      borderBottomWidth:1,
                      borderBottomColor:'#F2F4F6',
                    }}
                    onPress={()=>faqItem==19? setFaqItem(0):setFaqItem(19)}>
                      <Text style={{
                        fontSize:14,
                        fontWeight:700,
                        color:'#0B1929',
                        width:'85%',
                      }}>
                        Hesabım bloke oldu. Ne yapmalıyım?
                      </Text>
                      <Image
                        source={require('../../../assets/img/export/arrow_down_blue.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          transform: faqItem == 19? [{scaleY:-1}] : [{scaleY:1}]
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
                       444 10 00 numaralı çağrı merkezimizi arayarak destek alabilirsiniz.
                       </Text>
                    </View>
                          
                    
                  </View>
                  <View style={{marginBottom:8}}>
                    <TouchableOpacity style={{
                      minHeight:50, paddingBottom:8,
                      
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      borderBottomWidth:1,
                      borderBottomColor:'#F2F4F6',
                    }}
                    onPress={()=>faqItem==20? setFaqItem(0):setFaqItem(20)}>
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
                          transform: faqItem == 20? [{scaleY:-1}] : [{scaleY:1}]
                        }}
                      />
                    </TouchableOpacity>
                      
                    <View style={{
                      padding:16,
                      display:faqItem == 20? 'flex' : 'none',
                    }}>
                      <Text style={{
                        fontSize:12,
                      color:'#909EAA',}}>                       
                       Şifrenizin bir geçerlilik süresi 3 aydır. Dilediğiniz zaman ya da mevcut şifrenizin üzerinden 3 ay geçtiğinde şifre değiştirme işlemi yapabilirsiniz.
                       </Text>
                    </View>
                          
                    
                  </View>
                  <View style={{marginBottom:8}}>
                    <TouchableOpacity style={{
                      minHeight:50, paddingBottom:8,
                      
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      borderBottomWidth:1,
                      borderBottomColor:'#F2F4F6',
                    }}
                    onPress={()=>faqItem==21? setFaqItem(0):setFaqItem(21)}>
                      <Text style={{
                        fontSize:14,
                        fontWeight:700,
                        color:'#0B1929',
                        width:'85%',
                      }}>
                        Payfour’u birden fazla cihazda kullanabilir miyim?
                      </Text>
                      <Image
                        source={require('../../../assets/img/export/arrow_down_blue.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          transform: faqItem == 21? [{scaleY:-1}] : [{scaleY:1}]
                        }}
                      />
                    </TouchableOpacity>
                      
                    <View style={{
                      padding:16,
                      display:faqItem == 21? 'flex' : 'none',
                    }}>
                      <Text style={{
                        fontSize:12,
                      color:'#909EAA',}}>                       
                       Hayır, Payfour hesabınızı sadece tek bir telefonda kullanabilirsiniz.
                       </Text>
                    </View>
                          
                    
                  </View>
                  <View style={{marginBottom:8}}>
                    <TouchableOpacity style={{
                      minHeight:50, paddingBottom:8,
                      
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      borderBottomWidth:1,
                      borderBottomColor:'#F2F4F6',
                    }}
                    onPress={()=>faqItem==22? setFaqItem(0):setFaqItem(22)}>
                      <Text style={{
                        fontSize:14,
                        fontWeight:700,
                        color:'#0B1929',
                        width:'85%',
                      }}>
                        Telefon değişikliği yaparsam, Payfour’u yeni telefonumda da kullanabilir miyim?
                      </Text>
                      <Image
                        source={require('../../../assets/img/export/arrow_down_blue.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          transform: faqItem == 22? [{scaleY:-1}] : [{scaleY:1}]
                        }}
                      />
                    </TouchableOpacity>
                      
                    <View style={{
                      padding:16,
                      display:faqItem == 22? 'flex' : 'none',
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
                      minHeight:50, paddingBottom:8,
                      
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      borderBottomWidth:1,
                      borderBottomColor:'#F2F4F6',
                    }}
                    onPress={()=>faqItem==23? setFaqItem(0):setFaqItem(23)}>
                      <Text style={{
                        fontSize:14,
                        fontWeight:700,
                        color:'#0B1929',
                        width:'85%',
                      }}>
                        Banka / Kredi Kart bilgilerim nerede ve nasıl saklanıyor?
                      </Text>
                      <Image
                        source={require('../../../assets/img/export/arrow_down_blue.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          transform: faqItem == 23? [{scaleY:-1}] : [{scaleY:1}]
                        }}
                      />
                    </TouchableOpacity>
                      
                    <View style={{
                      padding:16,
                      display:faqItem == 23? 'flex' : 'none',
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
                      minHeight:50, paddingBottom:8,
                      
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      borderBottomWidth:1,
                      borderBottomColor:'#F2F4F6',
                    }}
                    onPress={()=>faqItem==24? setFaqItem(0):setFaqItem(24)}>
                      <Text style={{
                        fontSize:14,
                        fontWeight:700,
                        color:'#0B1929',
                        width:'85%',
                      }}>
                        Kayıtlı Banka / Kredi Kart bilgilerimi nasıl silebilirim?
                      </Text>
                      <Image
                        source={require('../../../assets/img/export/arrow_down_blue.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          transform: faqItem == 24? [{scaleY:-1}] : [{scaleY:1}]
                        }}
                      />
                    </TouchableOpacity>
                      
                    <View style={{
                      padding:16,
                      display:faqItem == 24? 'flex' : 'none',
                    }}>
                      <Text style={{
                        fontSize:12,
                      color:'#909EAA',}}>                       
                       Profilinizden “Kartlarım” sekmesi altından kayıtlı kartlarınızı görüntüleyebilir ve silebilirsiniz.
                       </Text>
                    </View>
                          
                    
                  </View>
                  <Text style={{fontSize:16,
                        fontWeight:700,
                        color:'#004F97',
                        marginTop:16,
                        marginBottom:8,
                        }}>Profil & Hesap İşlemleri</Text>
                  <View style={{marginBottom:8}}>
                    <TouchableOpacity style={{
                      minHeight:50, paddingBottom:8,
                      
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      borderBottomWidth:1,
                      borderBottomColor:'#F2F4F6',
                    }}
                    onPress={()=>faqItem==25? setFaqItem(0):setFaqItem(25)}>
                      <Text style={{
                        fontSize:14,
                        fontWeight:700,
                        color:'#0B1929',
                        width:'85%',
                      }}>
                        Profilimdeki bilgileri doldurmak zorunda mıyım?
                      </Text>
                      <Image
                        source={require('../../../assets/img/export/arrow_down_blue.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          transform: faqItem == 25? [{scaleY:-1}] : [{scaleY:1}]
                        }}
                      />
                    </TouchableOpacity>
                      
                    <View style={{
                      padding:16,
                      display:faqItem == 25? 'flex' : 'none',
                    }}>
                      <Text style={{
                        fontSize:12,
                      color:'#909EAA',}}>                       
                       Profiliniz içerisinde yer alan bilgileri doldurmak zorunda değilsiniz. İlgili bilgiler doldurulduğu takdirde, sizlere özel ve size daha uygun kampanyalar yapılabiliyor olacaktır.
                       </Text>
                    </View>
                          
                    
                  </View>
                  <View style={{marginBottom:8}}>
                    <TouchableOpacity style={{
                      minHeight:50, paddingBottom:8,
                      
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      borderBottomWidth:1,
                      borderBottomColor:'#F2F4F6',
                    }}
                    onPress={()=>faqItem==26? setFaqItem(0):setFaqItem(26)}>
                      <Text style={{
                        fontSize:14,
                        fontWeight:700,
                        color:'#0B1929',
                        width:'85%',
                      }}>
                        Payfour ödemelerimde, CarrefourSA Kart kampanyaları ve avantajlarından yararlanabilir miyim?
                      </Text>
                      <Image
                        source={require('../../../assets/img/export/arrow_down_blue.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          transform: faqItem == 26? [{scaleY:-1}] : [{scaleY:1}]
                        }}
                      />
                    </TouchableOpacity>
                      
                    <View style={{
                      padding:16,
                      display:faqItem == 26? 'flex' : 'none',
                    }}>
                      <Text style={{
                        fontSize:12,
                      color:'#909EAA',}}>                       
                       Evet, faydalanabilirsiniz.
                       </Text>
                    </View>
                          
                    
                  </View>
                  <View style={{marginBottom:8}}>
                    <TouchableOpacity style={{
                      minHeight:50, paddingBottom:8,
                      
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      borderBottomWidth:1,
                      borderBottomColor:'#F2F4F6',
                    }}
                    onPress={()=>faqItem==27? setFaqItem(0):setFaqItem(27)}>
                      <Text style={{
                        fontSize:14,
                        fontWeight:700,
                        color:'#0B1929',
                        width:'85%',
                      }}>
                        Payfour Numarası nedir?
                      </Text>
                      <Image
                        source={require('../../../assets/img/export/arrow_down_blue.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          transform: faqItem == 27? [{scaleY:-1}] : [{scaleY:1}]
                        }}
                      />
                    </TouchableOpacity>
                      
                    <View style={{
                      padding:16,
                      display:faqItem == 27? 'flex' : 'none',
                    }}>
                      <Text style={{
                        fontSize:12,
                      color:'#909EAA',}}>                       
                       Payfour numaranız size özel tanımlanan, Payfour dünyası içerisindeki işlemlerinizi yapmanızı sağlayan en az 6 rakamdan oluşan sayıdır.
                       </Text>
                    </View>
                          
                    
                  </View>
                  <View style={{marginBottom:8}}>
                    <TouchableOpacity style={{
                      minHeight:50, paddingBottom:8,
                      
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      borderBottomWidth:1,
                      borderBottomColor:'#F2F4F6',
                    }}
                    onPress={()=>faqItem==28? setFaqItem(0):setFaqItem(28)}>
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
                          transform: faqItem == 28? [{scaleY:-1}] : [{scaleY:1}]
                        }}
                      />
                    </TouchableOpacity>
                      
                    <View style={{
                      padding:16,
                      display:faqItem == 28? 'flex' : 'none',
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
                      minHeight:50, paddingBottom:8,
                      
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      borderBottomWidth:1,
                      borderBottomColor:'#F2F4F6',
                    }}
                    onPress={()=>faqItem==29? setFaqItem(0):setFaqItem(29)}>
                      <Text style={{
                        fontSize:14,
                        fontWeight:700,
                        color:'#0B1929',
                        width:'85%',
                      }}>
                        Birden fazla Payfour hesabı açabilir miyim?
                      </Text>
                      <Image
                        source={require('../../../assets/img/export/arrow_down_blue.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          transform: faqItem == 29? [{scaleY:-1}] : [{scaleY:1}]
                        }}
                      />
                    </TouchableOpacity>
                      
                    <View style={{
                      padding:16,
                      display:faqItem == 29? 'flex' : 'none',
                    }}>
                      <Text style={{
                        fontSize:12,
                      color:'#909EAA',}}>                       
                       Bir telefon numarası ile sadece bir Payfour hesabı açılabilmektedir.
                       </Text>
                    </View>
                          
                    
                  </View>
                  <View style={{marginBottom:8}}>
                    <TouchableOpacity style={{
                      minHeight:50, paddingBottom:8,
                      
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      borderBottomWidth:1,
                      borderBottomColor:'#F2F4F6',
                    }}
                    onPress={()=>faqItem==30? setFaqItem(0):setFaqItem(30)}>
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
                          transform: faqItem == 30? [{scaleY:-1}] : [{scaleY:1}]
                        }}
                      />
                    </TouchableOpacity>
                      
                    <View style={{
                      padding:16,
                      display:faqItem == 30? 'flex' : 'none',
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
                      minHeight:50, paddingBottom:8,
                      
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      borderBottomWidth:1,
                      borderBottomColor:'#F2F4F6',
                    }}
                    onPress={()=>faqItem==31? setFaqItem(0):setFaqItem(31)}>
                      <Text style={{
                        fontSize:14,
                        fontWeight:700,
                        color:'#0B1929',
                        width:'85%',
                      }}>
                        Hesabımı kapatmak istiyorum, ne yapmalıyım?
                      </Text>
                      <Image
                        source={require('../../../assets/img/export/arrow_down_blue.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          transform: faqItem == 31? [{scaleY:-1}] : [{scaleY:1}]
                        }}
                      />
                    </TouchableOpacity>
                      
                    <View style={{
                      padding:16,
                      display:faqItem == 31? 'flex' : 'none',
                    }}>
                      <Text style={{
                        fontSize:12,
                      color:'#909EAA',}}>                       
                       Payfour içerisindeki “Hesabımı Sil” butonuna tıklayarak, hesabınızı kapatma işleminizi gerçekleştirebilirsiniz.
                       </Text>
                    </View>                        
                  </View>
                  <Text style={{fontSize:16,
                        fontWeight:700,
                        color:'#004F97',
                        marginTop:16,
                        marginBottom:8,
                        }}>Hazır Limit / Şimdi Al Sonra Öde</Text>
                  <View style={{marginBottom:8}}>
                    <TouchableOpacity style={{
                      minHeight:50, paddingBottom:8,
                      
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      borderBottomWidth:1,
                      borderBottomColor:'#F2F4F6',
                    }}
                    onPress={()=>faqItem==32? setFaqItem(0):setFaqItem(32)}>
                      <Text style={{
                        fontSize:14,
                        fontWeight:700,
                        color:'#0B1929',
                        width:'85%',
                      }}>
                        Hazır Limit ve Şimdi Al Sonra Öde nedir?
                      </Text>
                      <Image
                        source={require('../../../assets/img/export/arrow_down_blue.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          transform: faqItem == 32? [{scaleY:-1}] : [{scaleY:1}]
                        }}
                      />
                    </TouchableOpacity>
                      
                    <View style={{
                      padding:16,
                      display:faqItem == 32? 'flex' : 'none',
                    }}>
                      <Text style={{
                        fontSize:12,
                      color:'#909EAA',}}>                       
                       Hazır Limit veya Şimdi Al Sonra Öde, kredi kartına ihtiyaç duymadan ya da kart limitinizi doldurmadan ihtiyaçlarınızı finanse edebileceğiniz, çeşitli taksit imkanlarıyla harcamalarınızı gerçekleştirebileceğiniz ya da erteleyebileceğiniz Dgfin Finansman A.Ş tarafından sunulan alışveriş kredisidir.
                       </Text>
                    </View>                        
                  </View>
                  <View style={{marginBottom:8}}>
                    <TouchableOpacity style={{
                      minHeight:50, paddingBottom:8,
                      
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      borderBottomWidth:1,
                      borderBottomColor:'#F2F4F6',
                    }}
                    onPress={()=>faqItem==33? setFaqItem(0):setFaqItem(33)}>
                      <Text style={{
                        fontSize:14,
                        fontWeight:700,
                        color:'#0B1929',
                        width:'85%',
                      }}>
                        Hazır Limit ve Şimdi Al Sonra Öde hizmetlerini nasıl kullanabilirim?
                      </Text>
                      <Image
                        source={require('../../../assets/img/export/arrow_down_blue.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          transform: faqItem == 33? [{scaleY:-1}] : [{scaleY:1}]
                        }}
                      />
                    </TouchableOpacity>
                      
                    <View style={{
                      padding:16,
                      display:faqItem == 33? 'flex' : 'none',
                    }}>
                      <Text style={{
                        fontSize:12,
                      color:'#909EAA',}}>                       
                       Payfour içerisindeki Hazır Limit ve Şimdi Al Sonra Öde butonları aracılığı ile limitlerinizi görüntüleyebilir, başvuru sürecinizi başlatabilirsiniz.
                       </Text>
                    </View>                        
                  </View>
                  <View style={{marginBottom:8}}>
                    <TouchableOpacity style={{
                      minHeight:50, paddingBottom:8,
                      
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      borderBottomWidth:1,
                      borderBottomColor:'#F2F4F6',
                    }}
                    onPress={()=>faqItem==34? setFaqItem(0):setFaqItem(34)}>
                      <Text style={{
                        fontSize:14,
                        fontWeight:700,
                        color:'#0B1929',
                        width:'85%',
                      }}>
                        Hazır Limit ve Alışveriş Kredisi limitleri ortak mıdır? Bir hizmeti kullanarak harcama yaptığımda, diğer taraftaki limitim de azalacak mıdır?
                      </Text>
                      <Image
                        source={require('../../../assets/img/export/arrow_down_blue.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          transform: faqItem == 34? [{scaleY:-1}] : [{scaleY:1}]
                        }}
                      />
                    </TouchableOpacity>
                      
                    <View style={{
                      padding:16,
                      display:faqItem == 34? 'flex' : 'none',
                    }}>
                      <Text style={{
                        fontSize:12,
                      color:'#909EAA',}}>                       
                       Hazır limitiniz, alışveriş kredisi kullanmak istediğinizde size özel belirlenen tutarı ifade eder. Hazır limitinizi öğrenerek alışveriş kredisi başvurusu yaptığınızda kullanabileceğiniz alışveriş kredisi tutarınızı öğrenmiş olursunuz.
                       </Text>
                    </View>                        
                  </View>
                  <View style={{marginBottom:8}}>
                    <TouchableOpacity style={{
                      minHeight:50, paddingBottom:8,
                      
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      borderBottomWidth:1,
                      borderBottomColor:'#F2F4F6',
                    }}
                    onPress={()=>faqItem==35? setFaqItem(0):setFaqItem(35)}>
                      <Text style={{
                        fontSize:14,
                        fontWeight:700,
                        color:'#0B1929',
                        width:'85%',
                      }}>
                        Hazır Limit başvurum reddedildi, limit verilmiyor. Ne yapabilirim?
                      </Text>
                      <Image
                        source={require('../../../assets/img/export/arrow_down_blue.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          transform: faqItem == 35? [{scaleY:-1}] : [{scaleY:1}]
                        }}
                      />
                    </TouchableOpacity>
                      
                    <View style={{
                      padding:16,
                      display:faqItem == 35? 'flex' : 'none',
                    }}>
                      <Text style={{
                        fontSize:12,
                      color:'#909EAA',}}>                       
                       Hazır Limit ve başvurunuz, Dgfin Finansman A.Ş. tarafından BDDK’nın belirlediği kriterler doğrultusunda değerlendirilmektedir. Kriterlere uygunluk sağlanamadığı zaman olumsuz dönüş alabilirsiniz. Fakat belirli süre sonra tekrar deneyebilirsiniz.
                       </Text>
                    </View>                        
                  </View>
                  <View style={{marginBottom:8}}>
                    <TouchableOpacity style={{
                      minHeight:50, paddingBottom:8,
                      
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      borderBottomWidth:1,
                      borderBottomColor:'#F2F4F6',
                    }}
                    onPress={()=>faqItem==36? setFaqItem(0):setFaqItem(36)}>
                      <Text style={{
                        fontSize:14,
                        fontWeight:700,
                        color:'#0B1929',
                        width:'85%',
                      }}>
                        Kullandığım alışveriş kredimin ödemesini nasıl yapabilirim?
                      </Text>
                      <Image
                        source={require('../../../assets/img/export/arrow_down_blue.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          transform: faqItem == 36? [{scaleY:-1}] : [{scaleY:1}]
                        }}
                      />
                    </TouchableOpacity>
                      
                    <View style={{
                      padding:16,
                      display:faqItem == 36? 'flex' : 'none',
                    }}>
                      <Text style={{
                        fontSize:12,
                      color:'#909EAA',}}>                       
                       Kullandığınız finansmanlara ait ödemelerinizi size iletilen IBAN’a para transferi yaparak gerçekleştirebilirsiniz.
                       </Text>
                    </View>                        
                  </View>
                  <View style={{marginBottom:8}}>
                    <TouchableOpacity style={{
                      minHeight:50, paddingBottom:8,
                      
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      borderBottomWidth:1,
                      borderBottomColor:'#F2F4F6',
                    }}
                    onPress={()=>faqItem==37? setFaqItem(0):setFaqItem(37)}>
                      <Text style={{
                        fontSize:14,
                        fontWeight:700,
                        color:'#0B1929',
                        width:'85%',
                      }}>
                        Alışveriş kredisi ile yaptığım alışverişlerin ödeme planına, ödeme geçmişime nasıl ulaşabilirim?
                      </Text>
                      <Image
                        source={require('../../../assets/img/export/arrow_down_blue.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          transform: faqItem == 37? [{scaleY:-1}] : [{scaleY:1}]
                        }}
                      />
                    </TouchableOpacity>
                      
                    <View style={{
                      padding:16,
                      display:faqItem == 37? 'flex' : 'none',
                    }}>
                      <Text style={{
                        fontSize:12,
                      color:'#909EAA',}}>                       
                       Kullandığınız kredilere ait detayları Payfour uygulamasında yer alan Ödeme Planından ulaşabilirsiniz.
                       </Text>
                    </View>                        
                  </View>
                  <View style={{marginBottom:8}}>
                    <TouchableOpacity style={{
                      minHeight:50, paddingBottom:8,
                      
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      borderBottomWidth:1,
                      borderBottomColor:'#F2F4F6',
                    }}
                    onPress={()=>faqItem==38? setFaqItem(0):setFaqItem(38)}>
                      <Text style={{
                        fontSize:14,
                        fontWeight:700,
                        color:'#0B1929',
                        width:'85%',
                      }}>
                        Hazır Limit / Şimdi Al Sonra Öde ile yaptığım alışverişi iptal / iade edebilir miyim?
                      </Text>
                      <Image
                        source={require('../../../assets/img/export/arrow_down_blue.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          transform: faqItem == 38? [{scaleY:-1}] : [{scaleY:1}]
                        }}
                      />
                    </TouchableOpacity>
                      
                    <View style={{
                      padding:16,
                      display:faqItem == 38? 'flex' : 'none',
                    }}>
                      <Text style={{
                        fontSize:12,
                      color:'#909EAA',}}>                       
                       Kullandığınız kredilere ait iptal/iade işlemlerinizi alışverişi yaptığınız kanal üzerinden gerçekleştirebilirsiniz. Talebiniz bize ulaştığında kullandığınız kredinin iptal ve iade süreçleri gerçekleştirilecektir.
                       </Text>
                    </View>                        
                  </View>
                  <View style={{marginBottom:8}}>
                    <TouchableOpacity style={{
                      minHeight:50, paddingBottom:8,
                      
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      borderBottomWidth:1,
                      borderBottomColor:'#F2F4F6',
                    }}
                    onPress={()=>faqItem==39? setFaqItem(0):setFaqItem(39)}>
                      <Text style={{
                        fontSize:14,
                        fontWeight:700,
                        color:'#0B1929',
                        width:'85%',
                      }}>
                        Hazır Limit / Şimdi Al Sonra Öde ile yaptığım alışverişin taksidini ödedim ancak iptal / iade etmek istiyorum. Ödediğim tutarı nasıl geri alabilirim?
                      </Text>
                      <Image
                        source={require('../../../assets/img/export/arrow_down_blue.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          transform: faqItem == 39? [{scaleY:-1}] : [{scaleY:1}]
                        }}
                      />
                    </TouchableOpacity>
                      
                    <View style={{
                      padding:16,
                      display:faqItem == 39? 'flex' : 'none',
                    }}>
                      <Text style={{
                        fontSize:12,
                      color:'#909EAA',}}>                       
                       Kullandığınız finansmanlara ait ödemeleriniz iptal yada iade olduğunda kullanım yaptığınız kanal üzerinden süreç başlatılacaktır. Varsa alacaklarınız için 0850 222 34 36 telefon numarası üzerinden DgFin çağrı merkezi ile iletişime geçebilirsiniz.
                       </Text>
                    </View>                        
                  </View>
                  <View style={{marginBottom:8}}>
                    <TouchableOpacity style={{
                      minHeight:50, paddingBottom:8,
                      
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      borderBottomWidth:1,
                      borderBottomColor:'#F2F4F6',
                    }}
                    onPress={()=>faqItem==40? setFaqItem(0):setFaqItem(40)}>
                      <Text style={{
                        fontSize:14,
                        fontWeight:700,
                        color:'#0B1929',
                        width:'85%',
                      }}>
                        Hazır Limit / Şimdi Al Sonra Öde ile yaptığım alışverişin ödeme planını değiştirebilir miyim?
                       </Text>
                      <Image
                        source={require('../../../assets/img/export/arrow_down_blue.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          transform: faqItem == 40? [{scaleY:-1}] : [{scaleY:1}]
                        }}
                      />
                    </TouchableOpacity>
                      
                    <View style={{
                      padding:16,
                      display:faqItem == 40? 'flex' : 'none',
                    }}>
                      <Text style={{
                        fontSize:12,
                      color:'#909EAA',}}>                       
                       Kullandığınız finansmanlara ait ödeme planı değişikliği maalesef yapılamamaktadır. Ancak dilerseniz kullanacağınız yeni finansmanlarda ödeme gününüzü planlayabilirsiniz.
                       </Text>
                    </View>                        
                  </View>
                  <View style={{marginBottom:8}}>
                    <TouchableOpacity style={{
                      minHeight:50, paddingBottom:8,
                      
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      borderBottomWidth:1,
                      borderBottomColor:'#F2F4F6',
                    }}
                    onPress={()=>faqItem==41? setFaqItem(0):setFaqItem(41)}>
                      <Text style={{
                        fontSize:14,
                        fontWeight:700,
                        color:'#0B1929',
                        width:'85%',
                      }}>
                        Hazır Limit / Şimdi Al Sonra limitlerimi, bakiye olarak hesabıma yansıtabilir miyim?
                       </Text>
                      <Image
                        source={require('../../../assets/img/export/arrow_down_blue.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          transform: faqItem == 41? [{scaleY:-1}] : [{scaleY:1}]
                        }}
                      />
                    </TouchableOpacity>
                      
                    <View style={{
                      padding:16,
                      display:faqItem == 41? 'flex' : 'none',
                    }}>
                      <Text style={{
                        fontSize:12,
                      color:'#909EAA',}}>                       
                       Size özel belirlenen hazır limitinizi uygulama içerisinde ana sayfanızda görüntüleyebilir ve alışveriş anında alış
                       </Text>
                    </View>                        
                  </View>
                  <View style={{marginBottom:8}}>
                    <TouchableOpacity style={{
                      minHeight:50, paddingBottom:8,
                      
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      borderBottomWidth:1,
                      borderBottomColor:'#F2F4F6',
                    }}
                    onPress={()=>faqItem==42? setFaqItem(0):setFaqItem(42)}>
                      <Text style={{
                        fontSize:14,
                        fontWeight:700,
                        color:'#0B1929',
                        width:'85%',
                      }}>
                        Hazır Limit / Şimdi Al Sonra hizmetleri ile ilgili sorumun cevabını ilgili sorular içerisinde bulamadım, ne yapmalıyım?
                       </Text>
                      <Image
                        source={require('../../../assets/img/export/arrow_down_blue.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          transform: faqItem == 42? [{scaleY:-1}] : [{scaleY:1}]
                        }}
                      />
                    </TouchableOpacity>
                      
                    <View style={{
                      padding:16,
                      display:faqItem == 42? 'flex' : 'none',
                    }}>
                      <Text style={{
                        fontSize:12,
                      color:'#909EAA',}}>                       
                       0850 222 34 36 numaralı Dgfin çağrı merkezini arayarak detaylı bilgi alabilirsiniz.
                       </Text>
                    </View>                        
                  </View>
                  <Text style={{fontSize:16,
                        fontWeight:700,
                        color:'#004F97',
                        marginTop:16,
                        marginBottom:8,
                        }}>Kampanyalar / Davet Kodu / Kupon Kodu</Text>
                  <View style={{marginBottom:8}}>
                    <TouchableOpacity style={{
                      minHeight:50, paddingBottom:8,
                      
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      borderBottomWidth:1,
                      borderBottomColor:'#F2F4F6',
                    }}
                    onPress={()=>faqItem==43? setFaqItem(0):setFaqItem(43)}>
                      <Text style={{
                        fontSize:14,
                        fontWeight:700,
                        color:'#0B1929',
                        width:'85%',
                      }}>
                        Kampanyalardan nasıl faydalanabilirim?
                       </Text>
                      <Image
                        source={require('../../../assets/img/export/arrow_down_blue.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          transform: faqItem == 43? [{scaleY:-1}] : [{scaleY:1}]
                        }}
                      />
                    </TouchableOpacity>
                      
                    <View style={{
                      padding:16,
                      display:faqItem == 43? 'flex' : 'none',
                    }}>
                      <Text style={{
                        fontSize:12,
                      color:'#909EAA',}}>                       
                       Kampanyaların kendi özel mekanikleri bulunmaktadır. Kampanyalardan faydalanma konusunda bir problem yaşanmaması adına, kampanyaların yasal metinlerinin detaylı bir şekilde okunması gerekmektedir. Kampanyaların yasal metinlerinde katılım, kazanım ve tüm şartlar detaylı bir şekilde açıklanmaktadır.
                       </Text>
                    </View>                        
                  </View>
                  <View style={{marginBottom:8}}>
                    <TouchableOpacity style={{
                      minHeight:50, paddingBottom:8,
                      
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      borderBottomWidth:1,
                      borderBottomColor:'#F2F4F6',
                    }}
                    onPress={()=>faqItem==44? setFaqItem(0):setFaqItem(44)}>
                      <Text style={{
                        fontSize:14,
                        fontWeight:700,
                        color:'#0B1929',
                        width:'85%',
                      }}>
                        Davet kodu nedir?
                       </Text>
                      <Image
                        source={require('../../../assets/img/export/arrow_down_blue.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          transform: faqItem == 44? [{scaleY:-1}] : [{scaleY:1}]
                        }}
                      />
                    </TouchableOpacity>
                      
                    <View style={{
                      padding:16,
                      display:faqItem == 44? 'flex' : 'none',
                    }}>
                      <Text style={{
                        fontSize:12,
                      color:'#909EAA',}}>                       
                       Davet kodu, sadece Payfour üyelik oluşturma adımlarında, her hesap için yalnızca bir kere girişi yapılabilen ve ilgili koda bağlı bir fayda olduğu takdirde oluşturulan Payfour hesabının bu faydadan yararlanmasını sağlamaktadır. Kampanyalar / faydalar ile ilgili detaylı bilgiler, kodun bağlı olduğu kampanya yasal metinlerinde paylaşılmış olacaktır.
                       </Text>
                    </View>                        
                  </View>
                  <View style={{marginBottom:8}}>
                    <TouchableOpacity style={{
                      minHeight:50, paddingBottom:8,
                      
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      borderBottomWidth:1,
                      borderBottomColor:'#F2F4F6',
                    }}
                    onPress={()=>faqItem==45? setFaqItem(0):setFaqItem(45)}>
                      <Text style={{
                        fontSize:14,
                        fontWeight:700,
                        color:'#0B1929',
                        width:'85%',
                      }}>
                        Kupon kodu nedir?
                       </Text>
                      <Image
                        source={require('../../../assets/img/export/arrow_down_blue.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          transform: faqItem == 45? [{scaleY:-1}] : [{scaleY:1}]
                        }}
                      />
                    </TouchableOpacity>
                      
                    <View style={{
                      padding:16,
                      display:faqItem == 45? 'flex' : 'none',
                    }}>
                      <Text style={{
                        fontSize:12,
                      color:'#909EAA',}}>                       
                       Kupon kodu, Payfour içerisinden giriş yapılabilmektedir ve ilgili koda bağlı kampanyadan / faydadan yararlanılmasını sağlamaktadır. Kampanyalar / faydalar ile ilgili detaylı bilgiler, kodun bağlı olduğu kampanya yasal metinlerinde paylaşılmış olacaktır.
                       </Text>
                    </View>                        
                  </View>
                  <View style={{marginBottom:8}}>
                    <TouchableOpacity style={{
                      minHeight:50, paddingBottom:8,
                      
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      borderBottomWidth:1,
                      borderBottomColor:'#F2F4F6',
                    }}
                    onPress={()=>faqItem==46? setFaqItem(0):setFaqItem(46)}>
                      <Text style={{
                        fontSize:14,
                        fontWeight:700,
                        color:'#0B1929',
                        width:'85%',
                      }}>
                        Kampanyadan yararlandım ancak kazanım sağlayamadım, ne yapabilirim?
                       </Text>
                      <Image
                        source={require('../../../assets/img/export/arrow_down_blue.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          transform: faqItem == 46? [{scaleY:-1}] : [{scaleY:1}]
                        }}
                      />
                    </TouchableOpacity>
                      
                    <View style={{
                      padding:16,
                      display:faqItem == 46? 'flex' : 'none',
                    }}>
                      <Text style={{
                        fontSize:12,
                      color:'#909EAA',}}>                       
                       Kampanya koşullarının detaylı bir şekilde okunmasını ve tüm koşullara uyulmasına rağmen bir kazanım sağlanamadığı durumda 444 10 00 telefon numarası üzerinden Çağrı Merkezimiz ile iletişime geçilmesini rica ederiz.
                       </Text>
                    </View>                        
                  </View>
                  <Text style={{fontSize:16,
                        fontWeight:700,
                        color:'#004F97',
                        marginTop:16,
                        marginBottom:8,
                        }}>Payfour Platin</Text>
                  <View style={{marginBottom:8}}>
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
                  <View style={{marginBottom:8}}>
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
                  <View style={{marginBottom:8}}>
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
                  <View style={{marginBottom:8}}>
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
                  <View style={{marginBottom:8}}>
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
                  <Text style={{fontSize:16,
                        fontWeight:700,
                        color:'#004F97',
                        marginTop:16,
                        marginBottom:8,
                        }}>CarrefourSA Kartlarım</Text>
                  <View style={{marginBottom:8}}>
                    <TouchableOpacity style={{
                      minHeight:50, paddingBottom:8,
                      
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      borderBottomWidth:1,
                      borderBottomColor:'#F2F4F6',
                    }}
                    onPress={()=>faqItem==52? setFaqItem(0):setFaqItem(52)}>
                      <Text style={{
                        fontSize:14,
                        fontWeight:700,
                        color:'#0B1929',
                        width:'85%',
                      }}>
                        Bireysel CarrefourSA Kart sahibi olmadan Payfour kullanabilir miyim?
                       </Text>
                      <Image
                        source={require('../../../assets/img/export/arrow_down_blue.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          transform: faqItem == 52? [{scaleY:-1}] : [{scaleY:1}]
                        }}
                      />
                    </TouchableOpacity>
                      
                    <View style={{
                      padding:16,
                      display:faqItem == 52? 'flex' : 'none',
                    }}>
                      <Text style={{
                        fontSize:12,
                      color:'#909EAA',}}>                       
                       Payfour hesapları CarrefourSA Kart ile bağlıdır. Payfour’a üye olurken CarrefourSA Kart sahibiyseniz, ilgili kartınız ile Payfour hesabınız eşleştirilecektir. CarrefourSA Kart sahibi olmayan müşteriler için de yeni CarrefourSA Kart oluşturulacaktır.
                       </Text>
                    </View>                        
                  </View>
                  <View style={{marginBottom:8}}>
                    <TouchableOpacity style={{
                      minHeight:50, paddingBottom:8,
                      
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      borderBottomWidth:1,
                      borderBottomColor:'#F2F4F6',
                    }}
                    onPress={()=>faqItem==53? setFaqItem(0):setFaqItem(53)}>
                      <Text style={{
                        fontSize:14,
                        fontWeight:700,
                        color:'#0B1929',
                        width:'85%',
                      }}>
                        Bireysel CarrefourSA Kart haricindeki diğer CarrefourSA Kartlarımı Payfour’da nasıl konumlandırabilirim? Kartlarıma ait bilgileri görüntüleyebilir miyim?
                       </Text>
                      <Image
                        source={require('../../../assets/img/export/arrow_down_blue.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          transform: faqItem == 53? [{scaleY:-1}] : [{scaleY:1}]
                        }}
                      />
                    </TouchableOpacity>
                      
                    <View style={{
                      padding:16,
                      display:faqItem == 53? 'flex' : 'none',
                    }}>
                      <Text style={{
                        fontSize:12,
                      color:'#909EAA',}}>                       
                       Payfour hesabınıza ait telefon numarasına bağlı tüm CarrefourSA Kartlarınız, otomatik olarak uygulama içerisinde konumlandırılacaktır. İlgili kartlara ait bilgiler de görüntülenebiliyor olacaktır.
                       </Text>
                    </View>                        
                  </View>
                  <View style={{marginBottom:8}}>
                    <TouchableOpacity style={{
                      minHeight:50, paddingBottom:8,
                      
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      borderBottomWidth:1,
                      borderBottomColor:'#F2F4F6',
                    }}
                    onPress={()=>faqItem==54? setFaqItem(0):setFaqItem(54)}>
                      <Text style={{
                        fontSize:14,
                        fontWeight:700,
                        color:'#0B1929',
                        width:'85%',
                      }}>
                        CarrefourSA Kartlarımdaki puanları nasıl kullanabilirim?
                        </Text>
                      <Image
                        source={require('../../../assets/img/export/arrow_down_blue.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          transform: faqItem == 54? [{scaleY:-1}] : [{scaleY:1}]
                        }}
                      />
                    </TouchableOpacity>
                      
                    <View style={{
                      padding:16,
                      display:faqItem == 54? 'flex' : 'none',
                    }}>
                      <Text style={{
                        fontSize:12,
                      color:'#909EAA',}}>                       
                       Payfour ödemelerinde, Payfour içerisinden puan kullanımı henüz bulunmamaktadır. Online ödemelerde, “Siparişi Tamamla” butonuna basılmadan önce ilgili butonun altındaki “CarrefourSA Kart” butonuna tıklayarak, puan kullanabilirsiniz. Puan kullanıldıktan sonra “Siparişi Tamamla” butonuna tıklayarak Payfour ile ödemenizi tamamlayabilirsiniz. Mağazalardan yapılacak ödemelerde ise Payfour ile ödeme işlemine başlanmadan önce, kasiyerlerimize puan kullanmak istediğiniz bilgisini verebilirsiniz ve ardından ödeme yapabilirsiniz.
                       </Text>
                    </View>                        
                  </View>
                  <Text style={{fontSize:16,
                        fontWeight:700,
                        color:'#004F97',
                        marginTop:16,
                        marginBottom:8,
                        }}>Diğer</Text>
                  <View style={{marginBottom:8}}>
                    <TouchableOpacity style={{
                      minHeight:50, paddingBottom:8,
                      
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      borderBottomWidth:1,
                      borderBottomColor:'#F2F4F6',
                    }}
                    onPress={()=>faqItem==55? setFaqItem(0):setFaqItem(55)}>
                      <Text style={{
                        fontSize:14,
                        fontWeight:700,
                        color:'#0B1929',
                        width:'85%',
                      }}>
                        Ödeme esnasında telefonuma bildirim gelmediği için ödeme yapamamaktayım. Ne yapmalıyım?
                        </Text>
                      <Image
                        source={require('../../../assets/img/export/arrow_down_blue.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          transform: faqItem == 55? [{scaleY:-1}] : [{scaleY:1}]
                        }}
                      />
                    </TouchableOpacity>
                      
                    <View style={{
                      padding:16,
                      display:faqItem == 55? 'flex' : 'none',
                    }}>
                      <Text style={{
                        fontSize:12,
                      color:'#909EAA',}}>                       
                       Telefonunuza bildirim gelmediği takdirde “Ödeme Yap” butonuna tıklayarak, ödeme işleminizi gerçekleştirebilirsiniz. Ancak daha iyi bir ödeme deneyimi için, uygulamanın bildirimlerini açmanızı öneririz.
                       </Text>
                    </View>                        
                  </View>
                  <View style={{marginBottom:8}}>
                    <TouchableOpacity style={{
                      minHeight:50, paddingBottom:8,
                      
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      borderBottomWidth:1,
                      borderBottomColor:'#F2F4F6',
                    }}
                    onPress={()=>faqItem==55? setFaqItem(0):setFaqItem(55)}>
                      <Text style={{
                        fontSize:14,
                        fontWeight:700,
                        color:'#0B1929',
                        width:'85%',
                      }}>
                        Uygulamayı kullanırken hata alıyorum, ne yapmalıyım?
                        </Text>
                      <Image
                        source={require('../../../assets/img/export/arrow_down_blue.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          transform: faqItem == 55? [{scaleY:-1}] : [{scaleY:1}]
                        }}
                      />
                    </TouchableOpacity>
                      
                    <View style={{
                      padding:16,
                      display:faqItem == 55? 'flex' : 'none',
                    }}>
                      <Text style={{
                        fontSize:12,
                      color:'#909EAA',}}>                       
                       Uygulamanızın Google Play Store veya App Store üzerinde güncel olup, olmadığını kontrol etmenizi rica ederiz. Uygulamanız güncel olmasına rağmen hatalar alındığı takdirde 444 10 00 numaraları Çağrı Merkezimiz üzerinden bizimle iletişime geçebilirsiniz.
                       </Text>
                    </View>                        
                  </View>
                  <View style={{marginBottom:8}}>
                    <TouchableOpacity style={{
                      minHeight:50, paddingBottom:8,
                      
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      //borderBottomWidth:1,
                      //borderBottomColor:'#F2F4F6',
                    }}
                    onPress={()=>faqItem==56? setFaqItem(0):setFaqItem(56)}>
                      <Text style={{
                        fontSize:14,
                        fontWeight:700,
                        color:'#0B1929',
                        width:'85%',
                      }}>
                        Kasada telefon numaramı söylediğimde Payfour’lu olduğum gözükmediği için ödeme yapamıyorum, ne yapmalıyım?
                        </Text>
                      <Image
                        source={require('../../../assets/img/export/arrow_down_blue.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                          transform: faqItem == 56? [{scaleY:-1}] : [{scaleY:1}]
                        }}
                      />
                    </TouchableOpacity>
                      
                    <View style={{
                      padding:16,
                      display:faqItem == 56? 'flex' : 'none',
                    }}>
                      <Text style={{
                        fontSize:12,
                      color:'#909EAA',}}>                       
                       444 10 00 numaralı çağrı merkezimiz üzerinden durumu bizlere bildirdiğiniz takdirde, en kısa sürede probleminiz çözümlenecektir.
                       </Text>
                    </View>                        
                  </View>
                  <TouchableOpacity
                    style={[styles.buttonStyle, {height:50, marginBottom: 0, backgroundColor: '#fff', borderWidth:1, borderColor: '#004F97', flexDirection:'row', alignItems:'center', justifyContent:'center', marginBottom:80}]}
                    
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

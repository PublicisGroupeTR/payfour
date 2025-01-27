/* eslint-disable react-native/no-inline-styles */
// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Linking,
  Modal,
  Dimensions,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createStackNavigator} from '@react-navigation/stack';
import {SelectList} from 'react-native-dropdown-select-list';

import ProfileInfo from './ProfileScreens/ProfileInfo.js';
import ProfileCards from './ProfileScreens/ProfileCards.js';
import ProfileCoupon from './ProfileScreens/ProfileCoupon.js';
import ProfileInvite from './ProfileScreens/ProfileInvite.js';
import ProfileNotificationSettings from './ProfileScreens/ProfileNotificationSettings.js';
import ProfileAccessSettings from './ProfileScreens/ProfileAccessSettings.js';
import ProfileCampaigns from './ProfileScreens/ProfileCampaigns.js';
import ProfileChangePassword from './ProfileScreens/ProfileChangePassword.js';
import ProfilePlatinum from './ProfileScreens/ProfilePlatinum.js';
import ProfilePlatinumSuccess from './ProfileScreens/ProfilePlatinumSuccess.js';
import ProfileFAQ from './ProfileScreens/ProfileFAQ.js';
import ProfileSupport from './ProfileScreens/ProfileSupport.js';
import ProfileLegal from './ProfileScreens/ProfileLegal.js';

import {styles} from '../Components/Styles.js';
import Loader from '../Components/Loader';
import TabHeader from '../Components/TabHeader';

import axios from 'react-native-axios';
import LinearGradient from 'react-native-linear-gradient';
import Clipboard from '@react-native-clipboard/clipboard';

const Stack = createStackNavigator();

const Profile = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [userDate, setUserDate] = useState('');
  const [userData, setUserData] = useState({});
  const [initials, setInitials] = useState('');

  const [isPremium, setIsPremium] = useState(false);

  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const getProfile = ()=> {
    navigation.navigate('ProfileInfo');    
  };
  const getCards = ()=> {
    navigation.navigate('ProfileCards');    
  };
  const getCoupons = ()=> {
    navigation.navigate('ProfileCoupon');    
  };
  const getInvite = ()=> {
    navigation.navigate('ProfileInvite');    
  };
  const getNotificationSettings = ()=> {
    navigation.navigate('ProfileNotificationSettings');    
  };
  const getAccessSettings = ()=> {
    navigation.navigate('ProfileAccessSettings');    
  };
  const getProfileCampaigns = ()=> {
    navigation.navigate('ProfileCampaigns');    
  };
  const getChangePassword = ()=> {
    navigation.navigate('ProfileChangePassword');    
  };
  const getPlatinum = ()=> {
    navigation.navigate('ProfilePlatinum');    
  };
  const getPlatinumSuccess = ()=> {
    navigation.navigate('ProfilePlatinumSuccess');    
  };
  const getFAQ = ()=> {
    navigation.navigate('ProfileFAQ');    
  };
  const getSupport = ()=> {
    navigation.navigate('ProfileSupport');    
  };
  const getLegal = ()=> {
    navigation.navigate('ProfileLegal');    
  };
  const handleExit = () => {
    console.log('handleExit');

    setModalVisible(true);
  };
  const logout = () => {
    console.log(navigation.getParent());
    setModalVisible(false);
    AsyncStorage.removeItem('uniqueMPANumber').then(()=>{
      AsyncStorage.removeItem('phone').then(()=>{
          AsyncStorage.removeItem('deviceId').then(()=>{
            AsyncStorage.removeItem('biometricsKey').then(()=>{
          //passwordInputRef.current.clear();
          setLoading(false);
          navigation.navigate('LoginScreen');
          //const rnBiometrics = new ReactNativeBiometrics();
          /*rnBiometrics.deleteKeys()
          .then((resultObject) => {
            const { keysDeleted } = resultObject

            if (keysDeleted) {
              console.log('Successful deletion')
            } else {
              console.log('Unsuccessful deletion because there were no keys to delete')
            }
            
          })*/
          
        })
      })
      })
    })
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // do something
      //console.log('Hello World!');
      var obj = {};
      AsyncStorage.getItem('token').then(value =>{
        const config = {
          headers: { Authorization: `Bearer ${value}` }
        };
        console.log("getuser");
        axios.get('https://api-app.payfour.com/api/account/getuser', config).then(response => {
          console.log(response.data);
          console.log(response.data.data);
          console.log(response.data.data.tckn);
          setUserData(response.data.data);
          let u = response.data.data;
          if(u.firstName != null && u.firstName != "" && u.lastName != null && u.lastName != ""){
            let ch = u.firstName.charAt(0)+u.lastName.charAt(0);
            console.log("initials");
            console.log(ch);
            setInitials(ch);
          }
          if(response.data.data.segment == 2) setIsPremium(true);
          //setIban(response.data.data.defaultBankAccountNumber);
          
          setLoading(false);      
          
        })
        .catch(error => {
          setLoading(false);
          console.error("Error sending data: ", error);
          let msg="";
          (error.response.data.errors.message) ? msg += error.response.data.errors.message+"\n" : msg += "Ödeme hatası \n"; (error.response.data.errors.paymentError) ? msg += error.response.data.errors.paymentError+"\n" : msg += ""; Alert.alert(msg);
        });

      });
    });
    return unsubscribe;
  }, [navigation]);
  const copyCode = ()=>{
    Clipboard.setString(userData.payfourId.toString());
    setSuccessModalVisible(true);
  }
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#e2eaf3'}}>
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
        
        <View>
        <Text style={{fontSize:16, color:'#004F97', textAlign:'center', fontWeight:'500', marginBottom:48}}>
        Payfour ID'niz başarıyla kopyalandı.
        </Text>        
        </View>
        <TouchableOpacity
          style={[regstyles.buttonStyle, {padding:0, marginLeft:0,marginRight:0, marginBottom: 10, backgroundColor: '#004F97', flex:1}]}              
          activeOpacity={0.5}
          onPress={()=>{
            console.log("close success");
            setSuccessModalVisible(false);
            navigation.navigate('ProfileHome');
            }}>
          <Text style={regstyles.buttonTextStyle}>Kapat</Text>
        </TouchableOpacity>
      </View>
      </View>
      </Modal>
      <Loader loading={loading} />
      {/* <TabHeader routetarget="" name="Profilim" count="0" /> */}

      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={[styles.scrollView, {width: '100%'}]}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingTop: 27,
            paddingLeft: 16,
            paddingRight: 16,
            width: '100%',
            paddingBottom: 100,
          }}>
          
          <View style={{           
            flexDirection:'row',
            justifyContent:'space-between',
            width: '100%',
          }}>
            <View style={{flexDirection:'row',}}>
            <View style={{backgroundColor:'#004F97', width:30, height:30, borderRadius:30, alignItems:'center', justifyContent:'center', marginRight:12}}>
              {initials != '' ? <Text style={{color:'#fff', fontSize:16}}>{initials}</Text> :
                <Image
                    source={require('../../assets/img/export/avatar.png')}
                    style={{
                      width: 30,
                      height: 30,
                    }}
                  />}
              </View>
              <View style={{marginBottom:16}}>
                <Text style={{color:'#0B1929', fontSize:16, fontWeight:'700', marginBottom:16}}>{userData.firstName} {userData.lastName}</Text>
                <TouchableOpacity 
                style={{flexDirection:'row'}}
                onPress={()=>{copyCode();}}>
                  <Text style={{color:'#909EAA', fontSize:14}}>Payfour ID: </Text>
                  <Text style={{color:'#004F97', fontSize:14, fontWeight:'700'}}>{userData.payfourId}</Text>
                  <Image
                    source={require('../../assets/img/export/copytoclipboard.png')}
                    style={{
                      width: 16,
                      height: 16,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{}}>
              <TouchableOpacity style={{}}
              onPress={() => {navigation.navigate('Discover')}}>
                  <Image
                    source={require('../../assets/img/export/close_black.png')}
                    style={{
                      width: 32,
                      height: 32,
                    }}
                  />
              </TouchableOpacity>
            </View>
          </View>
          <View style={[profileStyles.profileHolder, {paddingTop:16, paddingBottom:16}]}>
            <View style={{}}>
              <View style={{flexDirection:'row',marginBottom:8,}}>
                <Text style={{color:'#0B1929', fontSize:12, fontWeight:'700', marginRight:8}}>Profil Statüs</Text>
                <Image
                    source={require('../../assets/img/export/information.png')}
                    style={{
                      width: 16,
                      height: 16,
                      resizeMode:'contain'
                    }}
                  />
              </View>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:8,}}>
                <Text style={{color:'#909EAA', fontSize:10}}>Başlangıç</Text>
                <Text style={{color:'#909EAA', fontSize:10}}>Platin</Text>
            </View>
            <View style={{backgroundColor:'#E4E4E8', borderRadius:8, height:8, width:'100%', marginBottom:8,}}>
              <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#067FC4', '#431836']} style={{width: isPremium? '100%':'50%', height:8, borderRadius:8}}></LinearGradient>
            </View>
            <TouchableOpacity style={{}}
            onPress={()=> getPlatinum()}>
              <View style={{width: Dimensions.get('window').width*0.865,
                        height: Dimensions.get('window').width*0.128,}}>
              <Image
                      source={require('../../assets/img/export/item.png')}
                      style={{
                        width: Dimensions.get('window').width*0.865,
                        height: Dimensions.get('window').width*0.128,
                      }}
                    />
              </View>
            </TouchableOpacity>
          </View>
          

          <View style={profileStyles.profileHolder}>
            <TouchableOpacity style={[profileStyles.profileBtn, {borderBottomWidth:0}]}>
              <View style={profileStyles.profileLeft}>
                <View style={profileStyles.profileIconHolder}>
                  <Image
                    source={require('../../assets/img/export/carrefour_logo.png')}
                    style={profileStyles.profileIcon}
                  />
                </View>
                <Text style={profileStyles.profileText}>En Yakın CarrefourSA Mağazaları</Text>
              </View>
              <View>
              <Image
                    source={require('../../assets/img/export/right_arrow_blue.png')}
                    style={profileStyles.profileArrow}
                  />
              </View>
            </TouchableOpacity>
          </View>

          <View style={profileStyles.profileTitleHolder}>
            <Text style={profileStyles.profileTitle}>Hesap</Text>
          </View>

          <View style={profileStyles.profileHolder}>
            <TouchableOpacity style={profileStyles.profileBtn}
            onPress={()=> getProfile()}>
              <View style={profileStyles.profileLeft}>
                <View style={profileStyles.profileIconHolder}>
                  <Image
                    source={require('../../assets/img/export/icon_user.png')}
                    style={profileStyles.profileIcon}
                  />
                </View>
                <Text style={profileStyles.profileText}>Profil Bilgilerim</Text>
              </View>
              <View>
              <Image
                    source={require('../../assets/img/export/right_arrow_blue.png')}
                    style={profileStyles.profileArrow}
                  />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={profileStyles.profileBtn}
            onPress={()=> getCards()}>
              <View style={profileStyles.profileLeft}>
                <View style={profileStyles.profileIconHolder}>
                  <Image
                    source={require('../../assets/img/export/icon_card.png')}
                    style={profileStyles.profileIcon}
                  />
                </View>
                <Text style={profileStyles.profileText}>Kartlarım</Text>
              </View>
              <View>
              <Image
                    source={require('../../assets/img/export/right_arrow_blue.png')}
                    style={profileStyles.profileArrow}
                  />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={profileStyles.profileBtn}
            onPress={()=> getLegal()}>
              <View style={profileStyles.profileLeft}>
                <View style={profileStyles.profileIconHolder}>
                  <Image
                    source={require('../../assets/img/export/icon_bill.png')}
                    style={profileStyles.profileIcon}
                  />
                </View>
                <Text style={profileStyles.profileText}>Sözleşmelerim</Text>
              </View>
              <View>
              <Image
                    source={require('../../assets/img/export/right_arrow_blue.png')}
                    style={profileStyles.profileArrow}
                  />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={profileStyles.profileBtn}
            onPress={()=> getCoupons()}>
              <View style={profileStyles.profileLeft}>
                <View style={profileStyles.profileIconHolder}>
                  <Image
                    source={require('../../assets/img/export/icon_ticket.png')}
                    style={profileStyles.profileIcon}
                  />
                </View>
                <Text style={profileStyles.profileText}>Kupon Kodu / Davet Kodu</Text>
              </View>
              <View>
              <Image
                    source={require('../../assets/img/export/right_arrow_blue.png')}
                    style={profileStyles.profileArrow}
                  />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={profileStyles.profileBtn}
            onPress={()=> getProfileCampaigns()}>
              <View style={profileStyles.profileLeft}>
                <View style={profileStyles.profileIconHolder}>
                  <Image
                    source={require('../../assets/img/export/icon_badge-percent.png')}
                    style={profileStyles.profileIcon}
                  />
                </View>
                <Text style={profileStyles.profileText}>Katıldığım Kampanyalar</Text>
              </View>
              <View>
              <Image
                    source={require('../../assets/img/export/right_arrow_blue.png')}
                    style={profileStyles.profileArrow}
                  />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={[profileStyles.profileBtn, {borderBottomWidth:0}]}
            onPress={()=> getInvite()}>
              <View style={profileStyles.profileLeft}>
                <View style={profileStyles.profileIconHolder}>
                  <Image
                    source={require('../../assets/img/export/icon_users.png')}
                    style={profileStyles.profileIcon}
                  />
                </View>
                <Text style={profileStyles.profileText}>Arkadaşını Davet Et</Text>
              </View>
              <View>
              <Image
                    source={require('../../assets/img/export/right_arrow_blue.png')}
                    style={profileStyles.profileArrow}
                  />
              </View>
            </TouchableOpacity>
          </View>

          <View style={profileStyles.profileTitleHolder}>
            <Text style={profileStyles.profileTitle}>Güvenlik ve Tercihler</Text>
          </View>

          <View style={profileStyles.profileHolder}>
            <TouchableOpacity style={profileStyles.profileBtn}
            onPress={()=> getNotificationSettings()}>
              <View style={profileStyles.profileLeft}>
                <View style={profileStyles.profileIconHolder}>
                  <Image
                    source={require('../../assets/img/export/icon_setting.png')}
                    style={profileStyles.profileIcon}
                  />
                </View>
                <Text style={profileStyles.profileText}>Bildirim Ayarları</Text>
              </View>
              <View>
              <Image
                    source={require('../../assets/img/export/right_arrow_blue.png')}
                    style={profileStyles.profileArrow}
                  />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={profileStyles.profileBtn}
            onPress={()=> getChangePassword()}>
              <View style={profileStyles.profileLeft}>
                <View style={profileStyles.profileIconHolder}>
                  <Image
                    source={require('../../assets/img/export/icon_lock.png')}
                    style={profileStyles.profileIcon}
                  />
                </View>
                <Text style={profileStyles.profileText}>Şifremi Değiştir</Text>
              </View>
              <View>
              <Image
                    source={require('../../assets/img/export/right_arrow_blue.png')}
                    style={profileStyles.profileArrow}
                  />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={profileStyles.profileBtn}
            onPress={()=> getFAQ()}>
              <View style={profileStyles.profileLeft}>
                <View style={profileStyles.profileIconHolder}>
                  <Image
                    source={require('../../assets/img/export/icon_quiz.png')}
                    style={profileStyles.profileIcon}
                  />
                </View>
                <Text style={profileStyles.profileText}>Sıkça Sorulan Sorular</Text>
              </View>
              <View>
              <Image
                    source={require('../../assets/img/export/right_arrow_blue.png')}
                    style={profileStyles.profileArrow}
                  />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={profileStyles.profileBtn}
            onPress={()=> getSupport()}>
              <View style={profileStyles.profileLeft}>
                <View style={profileStyles.profileIconHolder}>
                  <Image
                    source={require('../../assets/img/export/icon_chatting.png')}
                    style={profileStyles.profileIcon}
                  />
                </View>
                <Text style={profileStyles.profileText}>Yardım / Bize Ulaşın</Text>
              </View>
              <View>
              <Image
                    source={require('../../assets/img/export/right_arrow_blue.png')}
                    style={profileStyles.profileArrow}
                  />
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={[profileStyles.profileBtn, {borderBottomWidth:0}]}
            onPress={()=> getAccessSettings()}>
              <View style={profileStyles.profileLeft}>
                <View style={profileStyles.profileIconHolder}>
                  <Image
                    source={require('../../assets/img/export/icon_interactive.png')}
                    style={profileStyles.profileIcon}
                  />
                </View>
                <Text style={profileStyles.profileText}>Erişim Ayarları</Text>
              </View>
              <View>
              <Image
                    source={require('../../assets/img/export/right_arrow_blue.png')}
                    style={profileStyles.profileArrow}
                  />
              </View>
            </TouchableOpacity>
          </View>
          
          <View style={profileStyles.profileHolder}>
            <TouchableOpacity style={[profileStyles.profileBtn, {borderBottomWidth:0}]}
            onPress={()=> logout()}>
              <View style={profileStyles.profileLeft}>
                <View style={profileStyles.profileIconHolder}>
                  <Image
                    source={require('../../assets/img/export/icon_logout.png')}
                    style={profileStyles.profileIcon}
                  />
                </View>
                <Text style={profileStyles.profileText}>Güvenli Çıkış</Text>
              </View>
              <View>
              <Image
                    source={require('../../assets/img/export/right_arrow_blue.png')}
                    style={profileStyles.profileArrow}
                  />
              </View>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const EditProfile = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState('');
  const [userSurname, setUserSurname] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');

  const handleUpdate = () => {
    var obj = {};
    AsyncStorage.getItem('auth_token').then(token =>
      //navigation.replace(value === null ? 'Auth' : 'TabNavigationRoutes'),
      {
        obj.token = token;
        AsyncStorage.getItem('userId').then(id => {
          obj.id = id;
          updateProfile(obj);
        });
      },
    );
  };
  const updateProfile = async obj => {
    console.log(obj);
    console.log(userPhone);
    console.log(parseInt(userPhone, 10));
    
  };
  const getProfile = async obj => {
    console.log(obj);
    setLoading(true);
    const response = await fetch(
      'https://gelirortaklari.api.hasoffers.com/Apiv3/json?api_key=' +
        obj.token +
        '&Target=Affiliate_AffiliateUser&Method=findById&id=' +
        obj.id,
    );
    const json = await response.json();
    //console.log(json);
    console.log(json.response.data.AffiliateUser);
    setUserName(json.response.data.AffiliateUser.first_name);
    setUserSurname(json.response.data.AffiliateUser.last_name);
    setUserEmail(json.response.data.AffiliateUser.email);
    setUserPhone(json.response.data.AffiliateUser.cell_phone);
    setLoading(false);
  };
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
        axios.get('https://api-app.payfour.com/api/account/getuser', config).then(response => {
          console.log(response.data);
          console.log(response.data.data);
          console.log(response.data.data.tckn);
          setUserData(response.data.data);
          //setIban(response.data.data.defaultBankAccountNumber);
          
          setLoading(false);      
          
        })
        .catch(error => {
          setLoading(false);
          console.error("Error sending data: ", error);
          let msg="";
          (error.response.data.errors.message) ? msg += error.response.data.errors.message+"\n" : msg += "Ödeme hatası \n"; (error.response.data.errors.paymentError) ? msg += error.response.data.errors.paymentError+"\n" : msg += ""; Alert.alert(msg);
        });

      });
    });
    return unsubscribe;
  }, [navigation]);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <Loader loading={loading} />
      {/* <View style={styles.topStyle}>
        <TouchableOpacity
          style={styles.buttonClose}
          onPress={() => navigation.navigate('Profile')}>
          <Image
            source={require('../../assets/img/back_btn.png')}
            style={{
              width: 13,
              height: 23,
            }}
          />
        </TouchableOpacity>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.headerTextStyle}>Profili Düzenle</Text>
        </View>
        <View style={styles.notificationIcon}>
          <View style={styles.notificationImg}>
            <Image
              source={require('../../assets/img/bildirim.png')}
              style={{
                width: 18,
                height: 21,
              }}
            />
          </View>
          <View style={styles.notificationNumber}>
            <Text style={styles.notificationText}>1</Text>
          </View>
        </View>
      </View> */}
      <TabHeader routetarget="Profile" name="Profili Düzenle" count="0" />

      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={[styles.scrollView, {width: '100%', paddingBottom: 100}]}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            paddingTop: 27,
            paddingLeft: 35,
            paddingRight: 35,
            width: '100%',
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{width: '45%', marginRight: '10%'}}>
              <Text
                style={[
                  styles.inputTitleStyle,
                  {
                    fontSize: 14,
                    fontWeight: '700',
                    marginBottom: 14,
                    color: '#1D1D25',
                  },
                ]}>
                Ad
              </Text>
              <TextInput
                style={{
                  borderColor: '#EBEBEB',
                  borderWidth: 1,
                  padding: 20,
                  fontSize: 12,
                  borderRadius: 10,
                  height: 54,
                  color: '#1D1D25',
                  marginBottom: 18,
                }}
                onChangeText={UserName => setUserName(UserName)}
                autoCapitalize="none"
                placeholder={userName}
                value={userName}
                placeholderTextColor="#7E797F"
                returnKeyType="next"
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>
            <View style={{width: '45%'}}>
              <Text
                style={[
                  styles.inputTitleStyle,
                  {
                    fontSize: 14,
                    fontWeight: '700',
                    marginBottom: 14,
                    color: '#1D1D25',
                  },
                ]}>
                Soyad
              </Text>
              <TextInput
                style={{
                  borderColor: '#EBEBEB',
                  borderWidth: 1,
                  padding: 20,
                  fontSize: 12,
                  borderRadius: 10,
                  height: 54,
                  color: '#1D1D25',
                  marginBottom: 18,
                }}
                onChangeText={UserSurname => setUserSurname(UserSurname)}
                autoCapitalize="none"
                placeholder={userSurname}
                value={userSurname}
                placeholderTextColor="#7E797F"
                returnKeyType="next"
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>
          </View>
          <Text
            style={[
              styles.inputTitleStyle,
              {
                fontSize: 14,
                fontWeight: '700',
                marginBottom: 14,
                color: '#1D1D25',
              },
            ]}>
            E-posta Adresi
          </Text>
          <TextInput
            style={{
              borderColor: '#EBEBEB',
              borderWidth: 1,
              padding: 20,
              fontSize: 12,
              borderRadius: 10,
              height: 54,
              color: '#1D1D25',
              marginBottom: 18,
              width: '100%',
            }}
            onChangeText={UserEmail => setUserEmail(UserEmail)}
            autoCapitalize="none"
            placeholder={userEmail}
            value={userEmail}
            placeholderTextColor="#7E797F"
            keyboardType="email-address"
            returnKeyType="next"
            underlineColorAndroid="#f000"
            blurOnSubmit={false}
          />
          <Text
            style={[
              styles.inputTitleStyle,
              {
                fontSize: 14,
                fontWeight: '700',
                marginBottom: 14,
                color: '#1D1D25',
              },
            ]}>
            Telefon
          </Text>
          <TextInput
            style={{
              borderColor: '#EBEBEB',
              borderWidth: 1,
              padding: 20,
              fontSize: 12,
              borderRadius: 10,
              height: 54,
              color: '#1D1D25',
              marginBottom: 50,
              width: '100%',
            }}
            onChangeText={UserPhone => setUserPhone(UserPhone)}
            autoCapitalize="none"
            placeholder={userPhone}
            value={userPhone}
            placeholderTextColor="#7E797F"
            keyboardType="email-address"
            returnKeyType="next"
            underlineColorAndroid="#f000"
            blurOnSubmit={false}
          />
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleUpdate}>
            <Text style={styles.buttonTextStyle}>GÜNCELLE</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const EditNotifications = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [userNotifications, setUserNotifications] = useState('');
  const [selected, setSelected] = React.useState('');

  const [promo, setPromo] = React.useState(true);
  const [popularProduct, setPopularProduct] = React.useState(true);
  const [coupon, setCoupon] = React.useState(true);
  const [newOffer, setNewOffer] = React.useState(true);
  const [termUpdate, setTermUpdate] = React.useState(true);
  const [earnings, setEarnings] = React.useState(true);
  const handleUpdate = () => {
    var obj = {};
    AsyncStorage.getItem('auth_token').then(token =>
      //navigation.replace(value === null ? 'Auth' : 'TabNavigationRoutes'),
      {
        obj.token = token;
        AsyncStorage.getItem('userId').then(id => {
          obj.id = id;
          updateProfile(obj);
        });
      },
    );
  };
  const updateProfile = async obj => {
    const response = await fetch(
      'https://gelirortaklari.api.hasoffers.com/Apiv3/json?api_key=' +
        obj.token +
        '&Target=Affiliate_AffiliateUser&Method=update&id=' +
        obj.id +
        '&data[wants_alerts]=' +
        userNotifications,
    );
    const json = await response.json();
    console.log(json);
  };
  const getProfile = async obj => {
    console.log(obj);
    setLoading(true);
    const response = await fetch(
      'https://gelirortaklari.api.hasoffers.com/Apiv3/json?api_key=' +
        obj.token +
        '&Target=Affiliate_AffiliateUser&Method=findById&id=' +
        obj.id,
    );
    const json = await response.json();
    //console.log(json);
    console.log(json.response.data.AffiliateUser);
    setUserNotifications(json.response.data.AffiliateUser.wants_alerts);
    setSelected(json.response.data.AffiliateUser.wants_alerts);
    setLoading(false);
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // do something
      console.log('Hello World!');
      var obj = {};
      AsyncStorage.getItem('auth_token').then(token =>
        //navigation.replace(value === null ? 'Auth' : 'TabNavigationRoutes'),
        {
          obj.token = token;
          AsyncStorage.getItem('userId').then(id => {
            obj.id = id;
            getProfile(obj);
          });
        },
      );
    });
    return unsubscribe;
  }, [navigation]);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <Loader loading={loading} />
      {/* <View style={styles.topStyle}>
        <TouchableOpacity
          style={styles.buttonClose}
          onPress={() => navigation.navigate('Profile')}>
          <Image
            source={require('../../assets/img/back_btn.png')}
            style={{
              width: 13,
              height: 23,
            }}
          />
        </TouchableOpacity>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.headerTextStyle}>Bildirimleri Düzenle</Text>
        </View>
        <View style={styles.notificationIcon}>
          <View style={styles.notificationImg}>
            <Image
              source={require('../../assets/img/bildirim.png')}
              style={{
                width: 18,
                height: 21,
              }}
            />
          </View>
          <View style={styles.notificationNumber}>
            <Text style={styles.notificationText}>1</Text>
          </View>
        </View>
      </View> */}
      <TabHeader routetarget="Profile" name="Bildirimleri Düzenle" count="0" />

      <ScrollView keyboardShouldPersistTaps="handled" style={styles.scrollView}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            paddingTop: 56,
            paddingLeft: 35,
            paddingRight: 35,
            width: '100%',
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              paddingBottom: 14,
              // borderBottomWidth: 1,
              // borderBottomColor: '#ebebeb',
              marginBottom: 21,
            }}>
            <View style={{width: '74%', marginRight: '13%'}}>
              {/* <Text
                style={{
                  fontSize: 14,
                  fontWeight: '700',
                  marginBottom: 8,
                  color: '#1D1D25',
                }}>
                Öne Çıkan Kampanya
              </Text>
              <Text style={{fontSize: 10, color: '#7E797F'}}>
                Kupon kodu, özel indirimler, bonus kurgusu ve benzeri yeni bir
                marka promosyonu eklendiğinde bildirim gönder
              </Text> */}
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '700',
                  marginBottom: 8,
                  color: '#1D1D25',
                }}>
                Tüm Bildirimler
              </Text>
              <Text style={{fontSize: 10, color: '#7E797F'}}>
                Uygulamanın bildirim göndermesine izin ver
              </Text>
            </View>
            <View style={{width: '13%'}}>
              <TouchableOpacity
                style={{width: '100%'}}
                onPress={() => setPromo(!promo)}>
                <View
                  style={{
                    width: '100%',
                    height: 26,
                    borderRadius: 30,
                    backgroundColor: promo ? '#1D1D25' : '#C9C9C9',
                  }}>
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 20,
                      backgroundColor: '#fff',
                      position: 'absolute',
                      top: 3,
                      left: promo ? 'initial' : 4,
                      right: promo ? 4 : 'initial',
                    }}></View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          {/* <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              paddingBottom: 14,
              borderBottomWidth: 1,
              borderBottomColor: '#ebebeb',
              marginBottom: 21,
            }}>
            <View style={{width: '74%', marginRight: '13%'}}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '700',
                  marginBottom: 8,
                  color: '#1D1D25',
                }}>
                Popüler Ürün
              </Text>
              <Text style={{fontSize: 10, color: '#7E797F'}}>
                Yeni popüler bir ürün eklediğinde bildirim gönder
              </Text>
            </View>
            <View style={{width: '13%'}}>
              <TouchableOpacity
                style={{width: '100%'}}
                onPress={() => setPopularProduct(!popularProduct)}>
                <View
                  style={{
                    width: '100%',
                    height: 26,
                    borderRadius: 30,
                    backgroundColor: popularProduct ? '#1D1D25' : '#C9C9C9',
                  }}>
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 20,
                      backgroundColor: '#fff',
                      position: 'absolute',
                      top: 3,
                      left: popularProduct ? 'initial' : 4,
                      right: popularProduct ? 4 : 'initial',
                    }}></View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              paddingBottom: 14,
              borderBottomWidth: 1,
              borderBottomColor: '#ebebeb',
              marginBottom: 21,
            }}>
            <View style={{width: '74%', marginRight: '13%'}}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '700',
                  marginBottom: 8,
                  color: '#1D1D25',
                }}>
                Kupon Kodu
              </Text>
              <Text style={{fontSize: 10, color: '#7E797F'}}>
                İndirim sağlayan kupon kodları eklendiğinde bildirim gönder
              </Text>
            </View>
            <View style={{width: '13%'}}>
              <TouchableOpacity
                style={{width: '100%'}}
                onPress={() => setCoupon(!coupon)}>
                <View
                  style={{
                    width: '100%',
                    height: 26,
                    borderRadius: 30,
                    backgroundColor: coupon ? '#1D1D25' : '#C9C9C9',
                  }}>
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 20,
                      backgroundColor: '#fff',
                      position: 'absolute',
                      top: 3,
                      left: coupon ? 'initial' : 4,
                      right: coupon ? 4 : 'initial',
                    }}></View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              paddingBottom: 14,
              borderBottomWidth: 1,
              borderBottomColor: '#ebebeb',
              marginBottom: 21,
            }}>
            <View style={{width: '74%', marginRight: '13%'}}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '700',
                  marginBottom: 8,
                  color: '#1D1D25',
                }}>
                Yeni Teklif Açılması
              </Text>
              <Text style={{fontSize: 10, color: '#7E797F'}}>
                Teklif menüsüne yeni bir affiliate program eklendiğinde bildirim
                gönder
              </Text>
            </View>
            <View style={{width: '13%'}}>
              <TouchableOpacity
                style={{width: '100%'}}
                onPress={() => setNewOffer(!newOffer)}>
                <View
                  style={{
                    width: '100%',
                    height: 26,
                    borderRadius: 30,
                    backgroundColor: newOffer ? '#1D1D25' : '#C9C9C9',
                  }}>
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 20,
                      backgroundColor: '#fff',
                      position: 'absolute',
                      top: 3,
                      left: newOffer ? 'initial' : 4,
                      right: newOffer ? 4 : 'initial',
                    }}></View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              paddingBottom: 14,
              borderBottomWidth: 1,
              borderBottomColor: '#ebebeb',
              marginBottom: 21,
            }}>
            <View style={{width: '74%', marginRight: '13%'}}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '700',
                  marginBottom: 8,
                  color: '#1D1D25',
                }}>
                Teklif Koşul Değişikliği
              </Text>
              <Text style={{fontSize: 10, color: '#7E797F'}}>
                Markaların affiliate programlarının koşulları değiştiğinde veya
                program durduğunda bildirim gönder
              </Text>
            </View>
            <View style={{width: '13%'}}>
              <TouchableOpacity
                style={{width: '100%'}}
                onPress={() => setTermUpdate(!termUpdate)}>
                <View
                  style={{
                    width: '100%',
                    height: 26,
                    borderRadius: 30,
                    backgroundColor: termUpdate ? '#1D1D25' : '#C9C9C9',
                  }}>
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 20,
                      backgroundColor: '#fff',
                      position: 'absolute',
                      top: 3,
                      left: termUpdate ? 'initial' : 4,
                      right: termUpdate ? 4 : 'initial',
                    }}></View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              paddingBottom: 14,
              borderBottomWidth: 1,
              borderBottomColor: '#ebebeb',
              marginBottom: 21,
            }}>
            <View style={{width: '74%', marginRight: '13%'}}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '700',
                  marginBottom: 8,
                  color: '#1D1D25',
                }}>
                Hakediş
              </Text>
              <Text style={{fontSize: 10, color: '#7E797F'}}>
                Onaylanan bakiye netleştiğinde bildirim gönder
              </Text>
            </View>
            <View style={{width: '13%'}}>
              <TouchableOpacity
                style={{width: '100%'}}
                onPress={() => setEarnings(!earnings)}>
                <View
                  style={{
                    width: '100%',
                    height: 26,
                    borderRadius: 30,
                    backgroundColor: earnings ? '#1D1D25' : '#C9C9C9',
                  }}>
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 20,
                      backgroundColor: '#fff',
                      position: 'absolute',
                      top: 3,
                      left: earnings ? 'initial' : 4,
                      right: earnings ? 4 : 'initial',
                    }}></View>
                </View>
              </TouchableOpacity>
            </View>
          </View> */}
          {/* <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleUpdate}>
            <Text style={styles.buttonTextStyle}>GÜNCELLE</Text>
          </TouchableOpacity> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const BankInfo = ({navigation}) => {
  const [loading, setLoading] = useState(false);

  const sendMail = () => {
    console.log('sendMail');
    Linking.openURL('mailto:go@publicisgroupe.com');
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <Loader loading={loading} />
      {/* <View style={styles.topStyle}>
        <TouchableOpacity
          style={styles.buttonClose}
          onPress={() => navigation.navigate('Profile')}>
          <Image
            source={require('../../assets/img/back_btn.png')}
            style={{
              width: 13,
              height: 23,
            }}
          />
        </TouchableOpacity>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.headerTextStyle}>Banka Bilgilerim</Text>
        </View>
        <View style={styles.notificationIcon}>
          <View style={styles.notificationImg}>
            <Image
              source={require('../../assets/img/bildirim.png')}
              style={{
                width: 18,
                height: 21,
              }}
            />
          </View>
          <View style={styles.notificationNumber}>
            <Text style={styles.notificationText}>1</Text>
          </View>
        </View>
      </View> */}
      <TabHeader routetarget="Profile" name="Banka Bilgilerim" count="0" />

      <View
        style={[
          styles.centeredView,
          {
            backgroundColor: '#fff',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: 30,
            paddingRight: 30,
            flex: 1,
          },
        ]}>
        <Bilgi width={33} height={33} style={{marginBottom: 40}} />
        {/* <Image
          source={require('../../assets/img/info.png')}
          style={{
            width: 33,
            height: 33,
            marginBottom: 40,
          }}
        /> */}
        <Text style={styles.modalTitle}>Önemli Bilgilendirme</Text>
        <Text style={styles.modalDesc}>
          Banka bilgilerinizi güncellemek için, güncel banka hesap bilgilerinizi
          (bankanızdan temin edeceğiniz resmi bir belge ile)
          go@publicisgroupe.com e-posta adresine göndermenizi rica ederiz.
        </Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={sendMail}>
          <Text style={styles.buttonTextStyle}>E-POSTA GÖNDER</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const Contact = ({navigation}) => {
  const [loading, setLoading] = useState(false);

  const sendMail = () => {
    console.log('sendMail');
    Linking.openURL('mailto:go@publicisgroupe.com');
  };
  const sendMsg = () => {
    console.log('sendMsg');
    Linking.openURL('https://wa.me/905425763055');
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <Loader loading={loading} />
      {/* <View style={styles.topStyle}>
        <TouchableOpacity
          style={styles.buttonClose}
          onPress={() => navigation.navigate('Profile')}>
          <Image
            source={require('../../assets/img/back_btn.png')}
            style={{
              width: 13,
              height: 23,
            }}
          />
        </TouchableOpacity>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.headerTextStyle}>İletişim</Text>
        </View>
        <View style={styles.notificationIcon}>
          <View style={styles.notificationImg}>
            <Image
              source={require('../../assets/img/bildirim.png')}
              style={{
                width: 18,
                height: 21,
              }}
            />
          </View>
          <View style={styles.notificationNumber}>
            <Text style={styles.notificationText}>1</Text>
          </View>
        </View>
      </View> */}
      <TabHeader routetarget="Profile" name="İletişim" count="0" />

      <View
        style={[
          styles.centeredView,
          {
            backgroundColor: '#fff',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            paddingLeft: 30,
            paddingRight: 30,
            paddingTop: 58,
            paddingBottom: 58,
            flex: 1,
          },
        ]}>
        <View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 28,
            }}>
            <Email width={42} height={42} style={{marginRight: 14}} />
            {/* <Image
              source={require('../../assets/img/email.png')}
              style={{
                width: 42,
                height: 42,
                marginRight: 14,
              }}
            /> */}
            <Text style={{fontSize: 24, fontWeight: '700', color: '#1D1D25'}}>
              E-Posta
            </Text>
          </View>
          <View style={{marginBottom: 30}}>
            <Text style={{fontSize: 14, color: '#1D1D25'}}>
              Finansal, teknolojik ve operasyonel kapsamda Tüm sorularınızı bize
              e-posta üzerinden sorabilirsiniz.
            </Text>
          </View>
          <TouchableOpacity
            style={[
              styles.buttonStyle,
              {
                fontSize: 12,
                width: 184,
                height: 39,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              },
            ]}
            activeOpacity={0.5}
            onPress={sendMail}>
            <Text style={{fontSize: 12, fontWeight: '700', color: '#ffffff'}}>
              E-POSTA GÖNDER
            </Text>
          </TouchableOpacity>
        </View>
        {/* <View
          style={{
            width: '100%',
            height: 1,
            backgroundColor: '#1D1D25',
            marginTop: 50,
            marginBottom: 50,
            opacity: 0.1,
          }}></View> */}
        {/* <View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 28,
            }}>
            <Whatsapp width={42} height={42} style={{marginRight: 14}} />

            
            <Text style={{fontSize: 24, fontWeight: '700', color: '#1D1D25'}}>
              WhatsApp
            </Text>
          </View>
          <View style={{marginBottom: 30}}>
            <Text style={{fontSize: 14, color: '#1D1D25'}}>
              İhtiyacınız olan herhangi bir konuda WhatsApp Business kanalımız
              üzerinden de bize ulaşabilirsiniz.
            </Text>
          </View>
          <TouchableOpacity
            style={[
              styles.buttonStyle,
              {
                fontSize: 12,
                width: 184,
                height: 39,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              },
            ]}
            activeOpacity={0.5}
            onPress={sendMsg}>
            <Text style={{fontSize: 12, fontWeight: '700', color: '#ffffff'}}>
              MESAJ GÖNDER
            </Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </SafeAreaView>
  );
};
const Info = ({navigation}) => {
  const [loading, setLoading] = useState(false);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <Loader loading={loading} />
      {/* <View style={styles.topStyle}>
        <TouchableOpacity
          style={styles.buttonClose}
          onPress={() => navigation.navigate('Profile')}>
          <Image
            source={require('../../assets/img/back_btn.png')}
            style={{
              width: 13,
              height: 23,
            }}
          />
        </TouchableOpacity>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.headerTextStyle}>Uygulama Hakkında</Text>
        </View>
        <View style={styles.notificationIcon}>
          <View style={styles.notificationImg}>
            <Image
              source={require('../../assets/img/bildirim.png')}
              style={{
                width: 18,
                height: 21,
              }}
            />
          </View>
          <View style={styles.notificationNumber}>
            <Text style={styles.notificationText}>1</Text>
          </View>
        </View>
      </View> */}
      <TabHeader routetarget="Profile" name="Uygulama Hakkında" count="0" />

      <View
        style={[
          styles.centeredView,
          {
            backgroundColor: '#fff',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            paddingLeft: 30,
            paddingRight: 30,
            paddingTop: 40,
            paddingBottom: 40,
            flex: 1,
          },
        ]}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: '700',
            color: '#1D1D25',
            marginBottom: 30,
          }}>
          Payfour
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: '#1D1D25',
            marginBottom: 20,
            lineHeight: 25,
          }}>
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don’t look even slightly believable.
          If you are going to use a passage of Lorem Ipsum, you need to be sure
          there isn’t anything embarrassing hidden in the middle of text.
        </Text>
        <Text style={{fontSize: 14, color: '#1D1D25', lineHeight: 25}}>
          All the Lorem Ipsum generators on the Internet tend to repeat
          predefined chunks as necessary, making this the first true generator
          on the Internet. It uses a dictionary of over 200 Latin words,
          combined with a handful of model sentence structures, to generate
          Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is
          therefore always free from repetition, injected humour, or
          non-characteristic words etc.
        </Text>
      </View>
    </SafeAreaView>
  );
};
const Terms = ({navigation}) => {
  const [loading, setLoading] = useState(false);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <Loader loading={loading} />
      {/* <View style={styles.topStyle}>
        <TouchableOpacity
          style={styles.buttonClose}
          onPress={() => navigation.navigate('Profile')}>
          <Image
            source={require('../../assets/img/back_btn.png')}
            style={{
              width: 13,
              height: 23,
            }}
          />
        </TouchableOpacity>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.headerTextStyle}>Şartlar ve Koşullar</Text>
        </View>
        <View style={styles.notificationIcon}>
          <View style={styles.notificationImg}>
            <Image
              source={require('../../assets/img/bildirim.png')}
              style={{
                width: 18,
                height: 21,
              }}
            />
          </View>
          <View style={styles.notificationNumber}>
            <Text style={styles.notificationText}>1</Text>
          </View>
        </View>
      </View> */}
      <TabHeader routetarget="Profile" name="Şartlar ve Koşullar" count="0" />

      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={[styles.scrollView, {width: '100%'}]}>
        <View
          style={[
            styles.centeredView,
            {
              backgroundColor: '#fff',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              paddingLeft: 30,
              paddingRight: 30,
              paddingTop: 40,
              paddingBottom: 40,
              flex: 1,
            },
          ]}>
          <Text
            style={{
              fontSize: 14,
              color: '#1D1D25',
              marginBottom: 20,
              lineHeight: 25,
            }}>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don’t look even slightly
            believable. If you are going to use a passage of Lorem Ipsum, you
            need to be sure there isn’t anything embarrassing hidden in the
            middle of text.
          </Text>
          <Text style={{fontSize: 14, color: '#1D1D25', lineHeight: 25}}>
            All the Lorem Ipsum generators on the Internet tend to repeat
            predefined chunks as necessary, making this the first true generator
            on the Internet. It uses a dictionary of over 200 Latin words,
            combined with a handful of model sentence structures, to generate
            Lorem Ipsum which looks reasonable.
          </Text>
          <Text style={{fontSize: 14, color: '#1D1D25', lineHeight: 25}}>
            The generated Lorem Ipsum is therefore always free from repetition,
            injected humour, or non-characteristic words etc.
          </Text>
          <Text style={{fontSize: 14, color: '#1D1D25', lineHeight: 25}}>
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old. Richard McClintock, a Latin professor
            at Hampden-Sydney College in Virginia, looked up one of the more
            obscure Latin words, consectetur, from a Lorem Ipsum passage, and
            going through the cites of the word in classical literature,
            discovered the undoubtable source.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const ProfileScreen = () => {
  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen
        name="ProfileHome"
        component={Profile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProfileInfo"
        component={ProfileInfo}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProfileCards"
        component={ProfileCards}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProfileCoupon"
        component={ProfileCoupon}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProfileInvite"
        component={ProfileInvite}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProfileNotificationSettings"
        component={ProfileNotificationSettings}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProfileAccessSettings"
        component={ProfileAccessSettings}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProfileCampaigns"
        component={ProfileCampaigns}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProfileChangePassword"
        component={ProfileChangePassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProfilePlatinum"
        component={ProfilePlatinum}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProfilePlatinumSuccess"
        component={ProfilePlatinumSuccess}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProfileFAQ"
        component={ProfileFAQ}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProfileSupport"
        component={ProfileSupport}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProfileLegal"
        component={ProfileLegal}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
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
    borderColor:'#E4E4E8'
  },
  profileLeft:{
    flexDirection:'row',
    alignItems:'center'
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
    height:48,
    lineHeight:48,
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
export default ProfileScreen;

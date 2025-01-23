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
  Alert,
  Platform
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createStackNavigator} from '@react-navigation/stack';
import {SelectList} from 'react-native-dropdown-select-list';

import {styles} from '../../Components/Styles.js';
import Loader from '../../Components/Loader';
import SubtabHeader from '../../Components/SubtabHeader.js';

import axios from 'react-native-axios';
import MaskInput from 'react-native-mask-input';
import LinearGradient from 'react-native-linear-gradient';
import {Dropdown} from 'react-native-element-dropdown';

import { apiGet, apiPost } from '../../utils/api.js';
const ProfileInfo = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [userDate, setUserDate] = useState('');
  const [userData, setUserData] = useState({});
  const [initials, setInitials] = useState('');

  const [cityData, setCityData] = useState([]);
  const [selectedCity, setSelectedCity] = useState([]);

  const [countyData, setCountyData] = useState('');
  const [selectedCounty, setSelectedCounty] = useState('');

  const [userSurname, setUserSurname] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userBirth, setUserBirth] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [gender, setGender] = useState('');

  const [userBirthError, setUserBirthError] = useState(false);
  const [userEmailError, setUserEmailError] = useState(false);

  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [callcenterModalVisible, setCallcenterModalVisible] = useState(false);


  const cityRef = useRef();
  const countyRef = useRef();
  
  const handleExit = () => {
    console.log('handleExit');

    setModalVisible(true);
  };
  const logOut = () => {
    console.log(navigation.getParent());
    setModalVisible(false);
    navigation.navigate('Auth', {
      screen: 'LoginScreen',
    });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // do something
      console.log('ProfileInfo');
      var obj = {};
      setLoading(true);
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
  const onGetUser = (response) => {
    console.log(response);
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
          //setIban(response.data.data.defaultBankAccountNumber);
          /*{"birthDate": "1977-06-03T00:00:00", 
          "commercialElectronic": true, 
          "crmCustomerId": "15628644", 
          "defaultBankAccountNumber": 
          "TR240089301011149329480101", 
          "firstName": "Kagan", 
          "gender": "Male", "isStudent": false, 
          "lastName": "Cam", "payfourId": 3531, 
          "phone": "+905337745616", 
          "referralCode": "PYF2jZXTg41TotR", "registrationCompleted": true, "segment": 1, "tckn": "59815284990"}*/
          let d= response.data.data;
          if(d.birthDate){
            let dt = new Date(d.birthDate);
            console.log("birthDate");
            console.log(dt.getDate());
            console.log(dt.getMonth());
            console.log(dt.getFullYear());
            let day = dt.getDate()<10?"0"+dt.getDate() : dt.getDate();
            let mo = (dt.getMonth()+1)<10?"0"+(dt.getMonth()+1) : (dt.getMonth()+1);
            setUserBirth(day+""+mo+""+dt.getFullYear())
          }
          

          if(d.firstName) setUserName(d.firstName);
          if(d.lastName)setUserSurname(d.lastName);
          if(d.gender)setGender(d.gender);
          if(d.phone)setUserPhone(d.phone);
          if(d.email)setUserEmail(d.email);

          /*if(d.cityCode) setSelectedCity(d.cityCode);
          if(d.districtCode) setSelectedCounty(d.districtCode);*/

          setLoading(false);      
          getCities(d);
  };
  const getCities = (d) => {
    AsyncStorage.getItem('token').then(value =>{
      const config = {
        headers: { Authorization: `Bearer ${value}` }
      };
      console.log("getuser");
      apiGet('address/getcities',onGetCities, d);
      

    });
  }
  const onGetCities = (response, d) => {
    console.log(response.data);
        console.log(response.data.data);
        setCityData(response.data.data)
        //setUserData(response.data.data);
        //setIban(response.data.data.defaultBankAccountNumber);
        
        if(d.cityCode) {
          setSelectedCity(d.cityCode);
          console.log("selectedCity");
          getCounties(d.cityCode, d);
        }
        setLoading(false);      
        //getCities();
  }
  const getCounties = (cityId, d) => {
    console.log("getcounties "+cityId)
    AsyncStorage.getItem('token').then(value =>{
      const config = {
        headers: { Authorization: `Bearer ${value}` }
      };
      console.log("getuser");
      apiGet('address/getdistricts/'+cityId, onGetDistricts, d);
      

    });
  }
  const onGetDistricts = (response, d) => {
    console.log(response.data);
        console.log(response.data.data);
        setCountyData(response.data.data)
        //setUserData(response.data.data);
        //setIban(response.data.data.defaultBankAccountNumber);
        console.log("data?");
        console.log(d);
        if(d){
          if(d.districtCode){
             setTimeout(function(){
              setSelectedCounty(d.districtCode);
             console.log("selectedCounty");
             console.log(d.districtCode);
             },500);
          }
        }
        setLoading(false);      
        //getCities();
  }
  const handleUpdate = () => {
    var obj = {};
    /*{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "gender": "Male",
  "birthDate": "2024-10-12T17:08:58.692Z",
  "districtCode": 0,
  "cityCode": 0
}*/
AsyncStorage.getItem('token').then(value =>{
  const config = {
    headers: { Authorization: `Bearer ${value}` }
  };
console.log("selectedCity");
  console.log(selectedCity);
  console.log("selectedCounty");
  console.log(selectedCounty);
  let err = false;

  let fd;
  if(userBirth != ''){
  console.log(userBirth);
  let fb = userBirth.replace(/\//g, "");
      let a = fb;
      console.log(a);
      let y = a.substring(4, 8);
      let m = a.substring(2, 4);
      let day = a.substring(0, 2);
    console.log("birthDate");
    console.log(y);
    console.log(m);
    console.log(day);
    let today = new Date();
    
    setUserBirthError(false);
    if(parseInt(y) < 1900 || today.getFullYear()-parseInt(y) < 10){
      console.log("y error");
      setUserBirthError(true);
      err = true;
    }
    if(parseInt(m) < 1 || parseInt(m) > 12){
      console.log("m error");
      setUserBirthError(true);
      err = true;
    }
    if(parseInt(day) < 1 || parseInt(day) > 31){
      console.log("day error");
      setUserBirthError(true);
      err = true;
    }
      let dt = y+"-"+m+"-"+day;
      console.log(dt);
      let d = new Date(dt);
      fd = d.toISOString();
  }else{
    fd = "";
  }
  if(userEmail != ''){
    console.log("userEmail");
    console.log(userEmail);
    console.log(validMail(userEmail));
    if(!validMail(userEmail)){
      err = true;
      setUserEmailError(true);
    }
  }

//setLoading(true);
console.log("address");
console.log(selectedCity);
console.log(selectedCounty);
    
    let dataToSend = {
      firstName: userName, 
      lastName: userSurname,
      email: userEmail,
      gender: gender,
      birthDate: fd,
      districtCode: selectedCounty,
      cityCode: selectedCity.length<1 ? "":selectedCity,
    };    

    console.log("err > "+err);
    console.log(dataToSend);
    //https://api-app.payfour.com/api/auth/addcustomerbasic
    if(!err){
      apiPost('account/updateuser', dataToSend, onUpdateUser);
    
    }
    });
  
  };
  const onUpdateUser = (response) =>{
    console.log(response.data);
    console.log(response.data.data);
    setLoading(false);
    if(response.data.success){
      setSuccessModalVisible(true);
    }
  }
  const validMail = (mail) =>
  {
      return  /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/ .test(mail);
  }
  
  

  const renderItem = item => {
    return (
      <View
      key={item.id}
        style={{
          padding: 18,
          height: 54,
          color: '#1D1D25',
        }}>
        <Text
          style={{
            fontSize: 12,
            color: '#1D1D25',
          }}>
          {item.name}
        </Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <Modal
          animationType="slide"
          transparent={true}
          visible={callcenterModalVisible}
          onRequestClose={() => {
            setCallcenterModalVisible(!callcenterModalVisible);
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
              onPress={()=>{
                console.log("close success");
                setCallcenterModalVisible(false);
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
        {/* Telefon numaranızı 444 1 000 numaralı çağrı merkezimizi arayarak güncelleyebilirsiniz. */}
        Telefon numaranızı güncellemek için lütfen çağrı merkezimiz ile iletişime geçin.
        </Text>        
        </View>
        <TouchableOpacity
          style={[regstyles.buttonStyle, {padding:0, marginLeft:0,marginRight:0, marginBottom: 10, backgroundColor: '#004F97', flex:1}]}              
          activeOpacity={0.5}
          onPress={()=>{
            console.log("close success");
            setCallcenterModalVisible(false);
            Linking.openURL(`tel:4441000`);
            }}>
          <Text style={regstyles.buttonTextStyle}>444 1 000</Text>
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
        Bilgileriniz başarıyla güncellendi.
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

      <SubtabHeader routetarget="ProfileHome" name="Profil Bilgilerim" count="0" />
      <KeyboardAvoidingView enabled  behavior="padding" style={{ flex: 1, minHeight:Dimensions.get('window').height }}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={[styles.scrollView, {width: '100%', paddingBottom: 100, backgroundColor: '#EAEAEA'}]}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            paddingTop: 27,
            paddingLeft: 16,
            paddingRight: 16,
            width: '100%',
            paddingBottom: Platform.OS == 'ios'? 220 : 190
          }}>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems:'center',
              textAlign:'center',
              marginBottom:12,
              width:'100%',
            }}>
              <View style={{
                width:80,
                height:80,
                borderRadius:80,
                borderWidth:2,
                borderColor:'#004785',
                backgroundColor:'#005BAA',
                justifyContent: 'center',
                alignItems:'center',
              }}>
                
              {initials != '' ? <Text style={{color:'#fff', fontSize:38}}>{initials}</Text> :
                <Image
                    source={require('../../../assets/img/export/avatar2.png')}
                    style={{
                      width: 64,
                      height: 64,
                    }}
                  />}
              {/* <Image
                    source={require('../../../assets/img/export/user.png')}
                    style={{
                      width: 64,
                      height: 64,
                    }}
                  /> */}
                  </View>
            </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
              <View style={[regstyles.registerInputStyle, {borderColor: '#EBEBEB',paddingBottom:0,width: '48%', marginRight: '4%'}]}>  
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
                        Ad
                      </Text>          
                    <TextInput                      
                      onChangeText={UserName => {
                        let isValid = /^[A-Za-z]+[A-Za-z ]*$/.test(UserName);
                        console.log(UserName);
                        console.log(isValid);
                        if(UserName.length == 0 ||isValid)setUserName(UserName)}}
                      placeholder={userName}
                      value={userName}
                      placeholderTextColor="#7E797F"
                      onSubmitEditing={Keyboard.dismiss}
                      blurOnSubmit={false}
                      underlineColorAndroid="#f000"
                      returnKeyType="next"
                      maxLength={255}
                    />
                  </View>
                  <View style={[regstyles.registerInputStyle, {borderColor: '#EBEBEB',paddingBottom:0,width: '48%'}]}>  
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
                        Soyad
                      </Text>          
                    <TextInput  
                                        
                      onChangeText={UserSurname => {
                        let isValid = /^[A-Za-z]+[A-Za-z ]*$/.test(UserSurname);
                        console.log(UserSurname);
                        console.log(isValid);
                        if(UserSurname.length == 0 || isValid)setUserSurname(UserSurname)}}
                      placeholder={userSurname}
                      value={userSurname}
                      placeholderTextColor="#7E797F"
                      onSubmitEditing={Keyboard.dismiss}
                      blurOnSubmit={false}
                      underlineColorAndroid="#f000"
                      returnKeyType="next"
                      maxLength={255}
                    />
                  </View>
            
          </View>
          <View style={[regstyles.registerInputStyle, {borderColor: '#EBEBEB',paddingBottom:0, width:'100%'}]}>  
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
                        Cep Telefonu
                      </Text>          
                    <TextInput                      
                      onChangeText={UserPhone => setUserPhone(UserPhone)}
                      autoCapitalize="none"
                      placeholder={userPhone}
                      value={userPhone}
                      placeholderTextColor="#7E797F"
                      onSubmitEditing={Keyboard.dismiss}
                      blurOnSubmit={false}
                      underlineColorAndroid="#f000"
                      returnKeyType="next"
                      editable={false}
                    />
                    <TouchableOpacity
                     style={{width:80,
                      height:30,
                      borderRadius:6,
                      borderWidth:1,
                      borderColor:'#004F97',
                      alignItems:'center',
                      justifyContent:'center',
                      position:'absolute',
                      right:16,
                      top:18,
                     }}
                     onPress={()=>{console.log('callcenter');
                      setCallcenterModalVisible(true);
                     }}
                     >
                      <Text style={{fontSize:12, fontWeight:'700', color:'#004F97'}}>
                        Güncelle
                      </Text>
                     </TouchableOpacity>
                  </View>
                  <View style={[regstyles.registerInputStyle, {borderColor: userEmailError?'#ff0000':'#EBEBEB',paddingBottom:0, width:'100%'}]}>  
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
                        E-posta Adresi
                      </Text>          
                    <TextInput                      
                      onChangeText={UserEmail => setUserEmail(UserEmail)}
                      autoCapitalize="none"
                      placeholder={userEmail}
                      value={userEmail}
                      placeholderTextColor="#7E797F"
                      onSubmitEditing={Keyboard.dismiss}
                      blurOnSubmit={false}
                      underlineColorAndroid="#f000"
                      returnKeyType="next"
                      maxLength={255}
                    />
                  </View>
                  <View style={[regstyles.registerInputStyle, {borderColor: userBirthError?'#ff0000':'#EBEBEB',paddingBottom:0}]}>                      
                    
                    <Text style={{                                           
                        fontSize: 12,
                        lineHeight:12, 
                        padding:0,
                        color: '#909EAA', 
                        position:'absolute',
                        top:14,                     
                        left:16
                    }}>
                      Doğum Tarihi (GG/AA/YYYY)
                    </Text>
                    <MaskInput
                        value={userBirth}
                        keyboardType="numeric"
                        onChangeText={(masked, unmasked) => {
                          //setUserPhone(masked); // you can use the unmasked value as well
                          setUserBirth(masked);
                          console.log(masked.length);
                          if(masked.length > 9) Keyboard.dismiss();
                          // assuming you typed "9" all the way:
                          //console.log(masked); // (99) 99999-9999
                          //console.log(unmasked); // 99999999999
                          //checkPhone();
                        }}
                        mask={[/\d/, /\d/,'/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                      />
                  </View>
          
          <View style={{
            width:'100%',

          }}>
            <Text style={{fontSize:12, color:'#909EAA', marginBottom:12}}>Cinsiyet</Text>
            <View style={{flexDirection:'row', marginBottom:12}}>
              <TouchableOpacity style={{width:80, marginRight:8}}
              onPress={()=>{
                setGender('Female');
              }}>
                <View style={{
                  flexDirection:'row', alignItems:'center'
                }}>
                  <View style={{width:24, height:24, borderRadius:24, borderWidth:1, backgroundColor:'#fff',borderColor:'#E4E4E8', alignItems:'center', justifyContent:'center', marginRight:4}}>
                    <View style={{width:12, height:12, borderRadius:12, backgroundColor:'#004F97', display: gender == 'Female' ? 'flex':'none'}}></View>
                  </View>
                  <Text style={{fontSize:12, color:'#909EAA'}}>Kadın</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={{width:80, marginRight:8}}
              onPress={()=>{
                setGender('Male');
              }}>
                <View style={{
                  flexDirection:'row', alignItems:'center'
                }}>
                  <View style={{width:24, height:24, borderRadius:24, borderWidth:1, backgroundColor:'#fff', borderColor:'#E4E4E8', alignItems:'center', justifyContent:'center', marginRight:4}}>
                    <View style={{width:12, height:12, borderRadius:12, backgroundColor:'#004F97', display: gender == 'Male' ? 'flex':'none'}}></View>
                  </View>
                  <Text style={{fontSize:12, color:'#909EAA'}}>Erkek</Text>
                </View>
              </TouchableOpacity>
              
            </View>
            <View style={{flexDirection:'row', marginBottom:24}}>
              <TouchableOpacity style={{ marginRight:8}}
              onPress={()=>{
                setGender('Other');
              }}>
                <View style={{
                  flexDirection:'row', alignItems:'center'
                }}>
                  <View style={{width:24, height:24, borderRadius:24, borderWidth:1, backgroundColor:'#fff', borderColor:'#E4E4E8', alignItems:'center', justifyContent:'center', marginRight:4}}>
                    <View style={{width:12, height:12, borderRadius:12, backgroundColor:'#004F97', display: gender == 'Other' ? 'flex':'none'}}></View>
                  </View>
                  <Text style={{fontSize:12, color:'#909EAA'}}>Belirtmek İstemiyorum</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{
            
            }}>
            <Text style={{fontSize:12, color:'#909EAA', marginBottom:12}}>Adres</Text>
            </View>
            <View style={{width:'100%',}}>
            <Dropdown
                    style={{
                      borderColor: '#EBEBEB',
                      borderWidth: 1,
                      padding: 16,
                      fontSize: 14,
                      borderRadius: 10,
                      height: 54,
                      color: '#1D1D25',
                      marginBottom: 18,                      
                      backgroundColor:'#fff',
                      width:Dimensions.get('window').width - 32,
                    }}
                    placeholderStyle={{
                      fontSize: 14,
                      color: '#909EAA',
                    }}
                    selectedTextStyle={{
                      fontSize: 14,
                      color: '#1D1D25',
                    }}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={cityData}
                    maxHeight={300}
                    labelField="name"
                    valueField="id"
                    placeholder={'İl'}
                    searchPlaceholder="Search..."
                    value={selectedCity}
                    ref={cityRef}
                    onChange={item => {
                      console.log('selected');
                      console.log(item);
                      setSelectedCity(item.id);
                      getCounties(item.id);
                    }}
                    renderItem={renderItem}
                  />
                <Dropdown
                    style={{
                      borderColor: '#EBEBEB',
                      borderWidth: 1,
                      padding: 16,
                      fontSize: 14,
                      borderRadius: 10,
                      height: 54,
                      color: '#1D1D25',
                      marginBottom: 18,                      
                      backgroundColor:'#fff',
                      width:Dimensions.get('window').width - 32,
                    }}
                    placeholderStyle={{
                      fontSize: 14,
                      color: '#909EAA',
                    }}
                    selectedTextStyle={{
                      fontSize: 14,
                      color: '#1D1D25',
                    }}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={countyData.length > 0 ? countyData : []}
                    maxHeight={300}
                    labelField="name"
                    valueField="id"
                    placeholder={'İlçe'}
                    searchPlaceholder="Search..."
                    value={selectedCounty}
                    ref={countyRef}
                    onChange={item => {
                      console.log('selected');
                      console.log(item);
                      setSelectedCounty(item.id);
                    }}
                    renderItem={renderItem}
                  />
            </View>
            {/* <Text style={{fontSize:12, color:'#909EAA', marginBottom:12}}>Açık Adres</Text> */}
            {/* <View style={[regstyles.registerInputStyle, {borderColor: '#EBEBEB',paddingBottom:0, width:'100%'}]}> 
              <TextInput                      
                onChangeText={UserAddress => setUserAddress(UserAddress)}
                autoCapitalize="none"
                placeholder={userAddress}
                value={userAddress}
                placeholderTextColor="#7E797F"
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                underlineColorAndroid="#f000"
                returnKeyType="next"
                editable
                multiline
                numberOfLines={4}
              />
            </View> */}
          </View>
          {/* <TouchableOpacity
            style={[styles.buttonStyle, {backgroundColor:'#005BAA', justifyContent:'center'}]}
            activeOpacity={0.5}
            onPress={handleUpdate}>
            <Text style={[styles.buttonTextStyle, {paddingVertical:0}]}>Güncelle</Text>
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
          onPress={handleUpdate}>
            <Text style={{color:'#fff', fontSize:14}}>
            Güncelle
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
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
export default ProfileInfo;

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
import AsyncStorage from '@react-native-async-storage/async-storage';
import Clipboard from '@react-native-clipboard/clipboard';

const ProfileInvite = ({navigation}) => { 

  const [referral, setReferral] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  
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
        axios.get('http://payfourapp.test.kodegon.com/api/account/getuser', config).then(response => {
          console.log(response.data);
          console.log(response.data.data);
          console.log(response.data.data.tckn);
          setReferral(response.data.data.referralCode)
          //setUserData(response.data.data);
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
    Clipboard.setString(referral);
    setSuccessModalVisible(true);
  }

  

  return(
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>      
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
        Kodunuz başarıyla kopyalandı.
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
    <SubtabHeader routetarget="ProfileHome" name="Arkadaşını Davet Et" count="0" />
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
                  <TouchableOpacity style={{}}>
                    <Text style={{color:'#004F97', fontSize:12, fontWeight:700, textDecorationLine:'underline'}}>
                    Nasıl Davet Edeceğim?
                    </Text>
                  </TouchableOpacity>
                
                
               
              </View>
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
              }}>
                  

                  <Text style={{color:'#004F97', fontSize:12, fontWeight:700, marginBottom:8}}>
                  Arkadaşını Davet Et Her Ay 300TL’ye Kadar Kazan!
                  </Text>
                  <Text style={{color:'#909EAA', fontSize:12, marginBottom:16}}>
                  QR Kodunu davet edeceğin kişi cep telefonu kamerasıyla okutabilir veya kodunu ve linkini onunla paylaşabilirsin.
                  </Text>
                  <TouchableOpacity style={{}}>
                    <Text style={{color:'#004F97', fontSize:12, fontWeight:700, textDecorationLine:'underline'}}>
                    Nasıl Kazanacağım ?
                    </Text>
                  </TouchableOpacity>
                
                
               
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
                  //onPress={() => sendCode(code)}
                  >
                  <Text
                    style={{fontSize: 14, color: '#ffffff'}}>
                    Ödülü Yükle
                  </Text>
                </TouchableOpacity>
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
    minHeight:60,
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
